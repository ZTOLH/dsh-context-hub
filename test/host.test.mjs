import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { apply, inject, name } from '../lib/index.js';

// Contract fixture for the inspected Cordis context, event and effect APIs.
class Scope {
  constructor() {
    this.listeners = new Map(); this.cleanups = []; this.contexts = new Set(); this.sections = new Set(); this.children = []; this.disposed = false;
    this.systemPrompt = {
      context: spec => { this.contexts.add(spec); return () => this.contexts.delete(spec); },
      section: spec => { this.sections.add(spec); return () => this.sections.delete(spec); },
    };
  }
  effect(setup) { const off = setup(); if (typeof off === 'function') this.cleanups.push(off); return off; }
  on(event, fn) { const list = this.listeners.get(event) || new Set(); this.listeners.set(event, list); list.add(fn); return this.effect(() => () => list.delete(fn)); }
  emit(event, payload) { for (const fn of this.listeners.get(event) || []) fn(payload); }
  inject(dependencies, setup) { assert.deepEqual(dependencies, ['systemPrompt']); const child = new Scope(); this.children.push(child); setup(child); return { dispose: () => child.dispose() }; }
  async dispose() { if (this.disposed) return; this.disposed = true; for (const off of this.cleanups.reverse()) await off(); }
}
function runtime(agents = []) {
  const ctx = new Scope();
  const routes = new Map();
  ctx.webServer = { host: '127.0.0.1', protocol: 'http:', register(route) {
    assert.equal(routes.has(route.path), false, `duplicate route ${route.path}`);
    routes.set(route.path, route); return () => routes.delete(route.path);
  } };
  ctx.logger = { info() {} };
  ctx.get = key => key === 'agents' ? { list: () => agents } : undefined;
  const call = async (feature, action, body = {}, headers = {}, raw) => {
    const req = Readable.from(raw || [Buffer.from(JSON.stringify(body))]);
    Object.assign(req, { method: 'POST', url: `/${feature}/api/${action}`, headers: { host: '127.0.0.1:14389', ...headers } });
    let result;
    const res = { statusCode: 200, writeHead(status) { this.statusCode = status; }, end(text) { result = JSON.parse(text); } };
    await routes.get(`/${feature}/api`).handler(req, res);
    return { status: res.statusCode, ...result };
  };
  return { ctx, routes, call };
}

test('combined host preserves legacy data, both injection modes, boundaries and lifecycle', async () => {
  const home = mkdtempSync(join(tmpdir(), 'dsh-context-hub-'));
  const previousHome = process.env.DSH_HOME;
  process.env.DSH_HOME = home;
  const first = { ctx: new Scope() }, second = { ctx: new Scope() };
  const { ctx, routes, call } = runtime([first, second]);
  let restarted;
  try {
    const folder = join(home, 'docs');
    mkdirSync(join(folder, 'sub'), { recursive: true });
    const doc = join(folder, 'root.md'), keyword = join(home, 'keyword.txt');
    writeFileSync(doc, 'ROOT {{customer}}');
    writeFileSync(join(folder, 'sub', 'nested.md'), 'NESTED');
    writeFileSync(join(folder, 'binary.txt'), Buffer.from([0, 1, 2]));
    writeFileSync(keyword, 'DATABASE DOCUMENT');
    const resourceConfig = { version: 1, enabled: true, maxTotalChars: 16000, resources: [
      { id: 'always', name: 'Docs', path: folder, kind: 'dir', recursive: false, include: ['*.md', '*.txt'], mode: 'always', maxChars: 8000, enabled: true },
      { id: 'keyword', name: 'Database', path: keyword, kind: 'file', mode: 'trigger', keywords: ['database'], maxChars: 8000, enabled: true },
    ] };
    const promptConfig = { version: 1, revision: 7, enabled: true, text: 'Existing prompt {{literal}}', format: 'md', fileName: 'existing.md', updatedAt: '2026-01-01T00:00:00.000Z' };
    for (const [feature, config] of [['resource-library', resourceConfig], ['prompt-manager', promptConfig]]) {
      mkdirSync(join(home, feature), { recursive: true });
      writeFileSync(join(home, feature, 'config.json'), JSON.stringify(config));
    }
    const originalResourceBytes = readFileSync(join(home, 'resource-library', 'config.json'));
    const originalPromptBytes = readFileSync(join(home, 'prompt-manager', 'config.json'));
    apply(ctx, {});
    assert.equal(name, 'dsh-context-hub');
    assert.deepEqual(inject, ['webServer', 'systemPrompt']);
    assert.equal(routes.size, 2);
    assert.equal(ctx.sections.size, 1);
    const section = [...ctx.sections][0];
    assert.equal(section.name, 'prompt-manager:user-prompt');
    assert.equal(section.interpolate, false);
    assert.equal(section.text(), promptConfig.text);
    assert.deepEqual((await call('prompt-manager', 'state')).value.config, promptConfig);
    assert.equal((await call('resource-library', 'state')).value.config.resources.length, 2);
    assert.deepEqual(readFileSync(join(home, 'resource-library', 'config.json')), originalResourceBytes, 'mount does not rewrite existing resource data');
    assert.deepEqual(readFileSync(join(home, 'prompt-manager', 'config.json')), originalPromptBytes, 'mount does not rewrite existing prompt data');
    const a = first.ctx.children[0], b = second.ctx.children[0];
    assert.equal(a.contexts.size, 1);
    const context = [...a.contexts][0];
    assert.equal(context.interpolate, false);
    assert.match(context.text(), /ROOT \{\{customer\}\}/);
    assert.doesNotMatch(context.text(), /NESTED|DATABASE DOCUMENT/);
    a.emit('agent/inbox/inserted', { message: { source: { kind: 'user' }, content: [{ type: 'text', text: 'DATABASE design' }] } });
    assert.match(context.text(), /DATABASE DOCUMENT/);
    assert.doesNotMatch([...b.contexts][0].text(), /DATABASE DOCUMENT/);
    a.emit('agent/inbox/inserted', { message: { source: { kind: 'tool' }, content: 'unrelated notification' } });
    assert.match(context.text(), /DATABASE DOCUMENT/);
    writeFileSync(doc, 'UPDATED DOCUMENT');
    assert.match(context.text(), /UPDATED DOCUMENT/);
    a.emit('agent/inbox/inserted', { message: { source: { kind: 'user' }, content: 'unrelated question' } });
    assert.doesNotMatch(context.text(), /DATABASE DOCUMENT/);
    assert.equal((await call('resource-library', 'save', { config: { name: 'malformed' } })).status, 400);
    assert.equal((await call('resource-library', 'state')).value.config.resources.length, 2);
    const preview = await call('resource-library', 'preview', { resource: { ...resourceConfig.resources[0], recursive: true } });
    assert.match(preview.value.text, /NESTED/);
    assert.ok(!preview.value.files.includes('binary.txt'));
    assert.ok((await call('resource-library', 'browse', { path: folder })).value.entries.some(entry => entry.name === 'sub'));
    writeFileSync(doc, 'x'.repeat(5000));
    const bounded = await call('resource-library', 'preview', { resource: { ...resourceConfig.resources[0], maxChars: 300 } });
    assert.ok(bounded.value.chars <= 300); assert.equal(bounded.value.truncated, true);
    await call('resource-library', 'save', { config: { ...resourceConfig, maxTotalChars: 500 } });
    assert.ok((await call('resource-library', 'test', { question: 'database' })).value.chars <= 500);
    assert.deepEqual(readFileSync(join(home, 'prompt-manager', 'config.json')), originalPromptBytes, 'resource saves do not affect prompt data');

    const max = '😀'.repeat(262144);
    const boundary = await call('prompt-manager', 'save', { revision: 7, config: { enabled: true, text: max, format: 'txt', fileName: 'prompt.txt' } });
    assert.equal(boundary.status, 200); assert.equal(boundary.value.bytes, 1048576);
    assert.equal((await call('prompt-manager', 'save', { revision: 8, config: { enabled: true, text: max + 'x', format: 'md', fileName: 'prompt.md' } })).status, 413);
    assert.equal((await call('prompt-manager', 'save', { revision: 7, config: { enabled: true, text: 'stale', format: 'manual', fileName: '' } })).status, 409);
    assert.equal((await call('prompt-manager', 'save', { revision: 8, config: { enabled: true, text: 'bad', format: 'md', fileName: 'prompt.txt' } })).status, 400);
    await call('prompt-manager', 'save', { revision: 8, config: { enabled: false, text: 'retained', format: 'manual', fileName: '' } });
    assert.equal(section.text(), '');
    await call('prompt-manager', 'save', { revision: 9, config: { enabled: true, text: 'RESTORED {{literal}}', format: 'manual', fileName: '' } });
    assert.equal(section.text(), 'RESTORED {{literal}}');
    await call('resource-library', 'save', { config: { ...resourceConfig, enabled: false } });
    assert.equal(context.text(), '');
    assert.equal(section.text(), 'RESTORED {{literal}}', 'resource disable leaves prompts enabled');
    for (const feature of ['resource-library', 'prompt-manager']) {
      assert.equal((await call(feature, 'state', {}, { 'sec-fetch-site': 'cross-site' })).status, 403);
      assert.equal((await call(feature, 'state', {}, { origin: 'https://other.example' })).status, 403);
      assert.equal((await call(feature, 'state', {}, { origin: 'https://127.0.0.1:14389' })).status, 403);
      assert.equal((await call(feature, 'unknown')).status, 404);
    }
    const unicodeBody = Buffer.from(JSON.stringify({ config: { ...resourceConfig, resources: [{ ...resourceConfig.resources[0], name: '中文😀资料' }] } }));
    assert.equal((await call('resource-library', 'save', {}, {}, [...unicodeBody].map(byte => Buffer.from([byte])))).status, 200);
    assert.equal((await call('resource-library', 'state')).value.config.resources[0].name, '中文😀资料', 'UTF-8 characters may cross HTTP chunk boundaries');
    const third = { ctx: new Scope() };
    ctx.emit('agent/created', { agent: third }); assert.equal(third.ctx.children[0].contexts.size, 1);
    ctx.emit('agent/disposed', { agent: third }); await Promise.resolve(); assert.equal(third.ctx.children[0].contexts.size, 0);
    await ctx.dispose();
    assert.equal(routes.size, 0); assert.equal(ctx.sections.size, 0); assert.equal(a.contexts.size, 0); assert.equal(b.contexts.size, 0);
    assert.equal(a.listeners.get('agent/inbox/inserted').size, 0);
    restarted = runtime([{ ctx: new Scope() }]); apply(restarted.ctx);
    assert.equal([...restarted.ctx.sections][0].text(), 'RESTORED {{literal}}');
    assert.equal((await restarted.call('resource-library', 'state')).value.config.resources[0].name, '中文😀资料');
    assert.equal((await restarted.call('prompt-manager', 'state')).value.config.revision, 10);
  } finally {
    await ctx.dispose(); await restarted?.ctx.dispose();
    if (previousHome === undefined) delete process.env.DSH_HOME; else process.env.DSH_HOME = previousHome;
    rmSync(home, { recursive: true, force: true });
  }
});

test('combined package exports both modules and matching localized metadata', () => {
  const root = new URL('../', import.meta.url);
  const manifest = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
  assert.equal(manifest.name, 'dsh-context-hub');
  assert.equal(manifest.exports['./locale/*.json'], './locale/*.json');
  assert.equal(manifest.exports['./icon'], './icon.svg');
  const en = JSON.parse(readFileSync(new URL('locale/en.json', root), 'utf8'));
  const zh = JSON.parse(readFileSync(new URL('locale/zh.json', root), 'utf8'));
  for (const section of Object.keys(en)) assert.deepEqual(Object.keys(en[section]).sort(), Object.keys(zh[section]).sort());
  assert.ok(en.meta.title && zh.meta.title && en.meta.description && zh.meta.description);
  assert.ok(en['resource-library'] && en['prompt-manager']);
  for (const file of ['lib/index.js', 'lib/resource-library.js', 'lib/prompt-manager.js', 'lib/client.js', 'cordis.patch.yml', 'icon.svg']) {
    assert.ok(existsSync(new URL(file, root)), file); assert.ok(manifest.files.includes(file), file);
  }
  const icon = readFileSync(new URL('icon.svg', root), 'utf8');
  assert.match(icon, /<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.ok(Buffer.byteLength(icon) <= 256 * 1024);
});
