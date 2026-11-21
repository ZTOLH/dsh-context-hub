import { mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';

const PACKAGE_ID = 'dsh-prompt-manager';
const API_PREFIX = '/prompt-manager/api';
const SECTION_NAME = 'prompt-manager:user-prompt';
const SECTION_ORDER = 14000;
const MAX_PROMPT_BYTES = 1024 * 1024;
const MAX_JSON_BODY_BYTES = 8 * 1024 * 1024;
const MAX_SNAPSHOTS = 100;
const FORMATS = new Set(['manual', 'txt', 'md']);

export const name = PACKAGE_ID;
export const inject = ['webServer', 'systemPrompt'];

function homeDir() {
  const configured = process.env.DSH_HOME;
  return typeof configured === 'string' && configured.trim() ? configured : join(homedir(), '.dsh');
}

function dataFile() {
  return join(homeDir(), 'prompt-manager', 'config.json');
}

function emptyConfig() {
  return { version: 1, revision: 0, enabled: false, text: '', format: 'manual', fileName: '', updatedAt: null };
}

function utf8Bytes(text) {
  return Buffer.byteLength(text, 'utf8');
}

function normalizeLoadedConfig(value) {
  if (!value || typeof value !== 'object' || value.version !== 1 || !Number.isSafeInteger(value.revision) || value.revision < 0
    || typeof value.enabled !== 'boolean' || typeof value.text !== 'string' || !FORMATS.has(value.format)
    || typeof value.fileName !== 'string' || !(value.updatedAt === null || typeof value.updatedAt === 'string')) {
    throw new Error('提示词配置文件格式无效；为避免覆盖数据，已拒绝加载');
  }
  if ((value.format === 'manual' && value.fileName !== '')
    || (value.format === 'txt' && !value.fileName.toLowerCase().endsWith('.txt'))
    || (value.format === 'md' && !value.fileName.toLowerCase().endsWith('.md'))
    || (value.format !== 'manual' && (value.fileName !== basename(value.fileName) || /[\u0000-\u001f\u007f]/.test(value.fileName)))) {
    throw new Error('提示词配置文件名无效；为避免覆盖数据，已拒绝加载');
  }
  if (utf8Bytes(value.text) > MAX_PROMPT_BYTES) throw new Error('提示词配置超过 1 MiB；为避免覆盖数据，已拒绝加载');
  return { ...value };
}

function readConfig() {
  let raw;
  try { raw = readFileSync(dataFile(), 'utf8'); }
  catch (error) {
    if (error?.code === 'ENOENT') return emptyConfig();
    throw error;
  }
  try { return normalizeLoadedConfig(JSON.parse(raw)); }
  catch (error) { throw new Error(`无法加载 ${dataFile()}: ${error instanceof Error ? error.message : String(error)}`); }
}

function snapshotsFile() {
  return join(homeDir(), 'prompt-manager', 'snapshots.json');
}

function readSnapshots() {
  let raw;
  try { raw = readFileSync(snapshotsFile(), 'utf8'); }
  catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
  let value;
  try { value = JSON.parse(raw); } catch { throw new Error(`无法加载 ${snapshotsFile()}: 快照文件格式无效`); }
  if (!Array.isArray(value) || value.length > MAX_SNAPSHOTS) throw new Error('提示词快照文件格式无效；为避免覆盖数据，已拒绝加载');
  for (const item of value) {
    if (!item || typeof item.id !== 'string' || typeof item.name !== 'string' || typeof item.text !== 'string'
      || !FORMATS.has(item.format) || typeof item.fileName !== 'string' || typeof item.enabled !== 'boolean'
      || typeof item.createdAt !== 'string' || utf8Bytes(item.text) > MAX_PROMPT_BYTES) {
      throw new Error('提示词快照文件格式无效；为避免覆盖数据，已拒绝加载');
    }
  }
  return value;
}

function writeSnapshots(items) {
  const file = snapshotsFile();
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  mkdirSync(dirname(file), { recursive: true });
  try {
    writeFileSync(temporary, `${JSON.stringify(items, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
    renameSync(temporary, file);
  } catch (error) {
    try { unlinkSync(temporary); } catch { /* Keep the original persistence error. */ }
    throw error;
  }
}

function snapshotMetadata(item) {
  return { id: item.id, name: item.name, enabled: item.enabled, format: item.format, fileName: item.fileName,
    bytes: utf8Bytes(item.text), createdAt: item.createdAt };
}

function saveConfig(current, input, expectedRevision) {
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision !== current.revision) {
    const error = new Error('提示词已在其他窗口更新，请重新载入后再保存');
    error.status = 409;
    error.code = 'revision_conflict';
    throw error;
  }
  if (!input || typeof input !== 'object' || typeof input.text !== 'string') {
    const error = new Error('提示词内容格式无效');
    error.status = 400;
    error.code = 'invalid_config';
    throw error;
  }
  if (typeof input.enabled !== 'boolean') {
    const error = new Error('启用状态无效');
    error.status = 400;
    error.code = 'invalid_enabled';
    throw error;
  }
  if (!FORMATS.has(input.format)) {
    const error = new Error('来源格式必须为 manual、txt 或 md');
    error.status = 400;
    error.code = 'invalid_format';
    throw error;
  }
  const fileName = typeof input.fileName === 'string' ? input.fileName : '';
  if (input.format === 'manual' && fileName !== '') {
    const error = new Error('手动输入不应带文件名');
    error.status = 400;
    error.code = 'invalid_filename';
    throw error;
  }
  if (input.format !== 'manual') {
    const extension = input.format === 'md' ? '.md' : '.txt';
    if (fileName !== basename(fileName) || /[\u0000-\u001f\u007f]/.test(fileName) || !fileName.toLowerCase().endsWith(extension)) {
      const error = new Error(`导入文件名必须是有效的 ${extension} 文件名`);
      error.status = 400;
      error.code = 'invalid_filename';
      throw error;
    }
  }
  const bytes = utf8Bytes(input.text);
  if (bytes > MAX_PROMPT_BYTES) {
    const error = new Error(`提示词超过 1 MiB 上限（当前 ${bytes} 字节）`);
    error.status = 413;
    error.code = 'prompt_too_large';
    throw error;
  }
  const next = {
    version: 1,
    revision: current.revision + 1,
    enabled: input.enabled,
    text: input.text,
    format: input.format,
    fileName,
    updatedAt: new Date().toISOString(),
  };
  const file = dataFile();
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  mkdirSync(dirname(file), { recursive: true });
  try {
    writeFileSync(temporary, `${JSON.stringify(next, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
    renameSync(temporary, file);
  } catch (error) {
    try { unlinkSync(temporary); } catch { /* Keep the original persistence error. */ }
    throw error;
  }
  return next;
}

function snapshot(config) {
  return {
    config,
    bytes: utf8Bytes(config.text),
    maxBytes: MAX_PROMPT_BYTES,
    dataFile: dataFile(),
  };
}

function writeJson(res, value, status = 200) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(value));
}

function writeError(res, status, message, code = 'prompt_manager_error') {
  writeJson(res, { ok: false, error: message, code }, status);
}

async function readJsonBody(req) {
  const chunks = [];
  let bytes = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    bytes += buffer.byteLength;
    if (bytes > MAX_JSON_BODY_BYTES) {
      const error = new Error('请求体过大');
      error.status = 413;
      error.code = 'body_too_large';
      throw error;
    }
    chunks.push(buffer);
  }
  const body = Buffer.concat(chunks);
  if (body.byteLength === 0) return {};
  let decoded;
  try {
    decoded = new TextDecoder('utf-8', { fatal: true }).decode(body);
  } catch {
    const error = new Error('请求体必须是有效 UTF-8');
    error.status = 400;
    error.code = 'invalid_utf8';
    throw error;
  }
  try {
    return JSON.parse(decoded);
  } catch {
    const error = new Error('请求体不是合法 JSON');
    error.status = 400;
    error.code = 'invalid_json';
    throw error;
  }
}

function protocolOf(ctx) {
  const value = ctx.webServer.protocol;
  if (typeof value !== 'string' || value === '') return 'http:';
  return value.endsWith(':') ? value : `${value}:`;
}

function isLoopbackHostname(hostname) {
  if (hostname === 'localhost' || hostname === '[::1]') return true;
  const octets = hostname.split('.');
  return octets.length === 4 && Number(octets[0]) === 127 && octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255);
}

function trustedRequest(ctx, req) {
  const rawHost = req.headers.host;
  const host = (Array.isArray(rawHost) ? rawHost[0] : rawHost) ?? '';
  if (!host) return false;
  let hostUrl;
  try { hostUrl = new URL(`${protocolOf(ctx)}//${host}`); } catch { return false; }
  const hostname = hostUrl.hostname.toLowerCase();
  const loopback = isLoopbackHostname(hostname);
  if (!loopback) {
    const bind = typeof ctx.webServer.host === 'string' ? ctx.webServer.host.replace(/^\[|\]$/g, '').toLowerCase() : '';
    if (!bind || bind === '0.0.0.0' || bind === '::' || bind === '*' || bind !== hostname) return false;
  }
  const site = req.headers['sec-fetch-site'];
  if ((Array.isArray(site) ? site[0] : site) === 'cross-site') return false;
  const rawOrigin = req.headers.origin;
  const origin = Array.isArray(rawOrigin) ? rawOrigin[0] : rawOrigin;
  if (origin === undefined || origin === '') return true;
  try { const originUrl = new URL(origin); return originUrl.protocol === hostUrl.protocol && originUrl.host === hostUrl.host; } catch { return false; }
}

function buildRoute(ctx, getConfig, replaceConfig, listSnapshots, createSnapshot, readSnapshot, restoreSnapshot) {
  return {
    kind: 'prefix',
    path: API_PREFIX,
    handler: async (req, res) => {
      if (!trustedRequest(ctx, req)) {
        writeError(res, 403, '只接受本机同源请求', 'untrusted_origin');
        return;
      }
      const url = (req.url ?? '').split(/[?#]/, 1)[0];
      const action = url.startsWith(API_PREFIX) ? url.slice(API_PREFIX.length).replace(/^\//, '') : '';
      if (req.method !== 'POST') {
        writeError(res, 405, '仅支持 POST 请求', 'method_not_allowed');
        return;
      }
      try {
        if (action === 'state') {
          writeJson(res, { ok: true, value: snapshot(getConfig()) });
          return;
        }
        if (action === 'snapshots') {
          writeJson(res, { ok: true, value: { snapshots: listSnapshots().map(snapshotMetadata), maxSnapshots: MAX_SNAPSHOTS } });
          return;
        }
        if (action === 'snapshot') {
          const body = await readJsonBody(req);
          const item = createSnapshot(body?.name, body?.revision);
          writeJson(res, { ok: true, value: { snapshot: snapshotMetadata(item), count: listSnapshots().length } }, 201);
          return;
        }
        if (action === 'snapshot-read') {
          const body = await readJsonBody(req);
          const item = readSnapshot(body?.id);
          writeJson(res, { ok: true, value: { snapshot: snapshotMetadata(item), config: {
            enabled: item.enabled, text: item.text, format: item.format, fileName: item.fileName, revision: item.revision,
          } } });
          return;
        }
        if (action === 'restore') {
          const body = await readJsonBody(req);
          const restored = restoreSnapshot(body?.id, body?.revision);
          writeJson(res, { ok: true, value: snapshot(restored) });
          return;
        }
        if (action === 'save') {
          const body = await readJsonBody(req);
          const saved = replaceConfig(body?.config, body?.revision);
          writeJson(res, { ok: true, value: snapshot(saved) });
          return;
        }
        writeError(res, 404, '未知接口', 'not_found');
      } catch (error) {
        writeError(res, Number.isInteger(error?.status) ? error.status : 400, error instanceof Error ? error.message : String(error), error?.code ?? 'invalid_request');
      }
    },
  };
}

export function apply(ctx) {
  let config = readConfig();
  const logger = typeof ctx.logger === 'function' ? ctx.logger(PACKAGE_ID) : ctx.logger;
  const log = (message) => {
    try { logger?.info?.(`[${PACKAGE_ID}] ${message}`); } catch { /* Logging must not affect plugin behavior. */ }
  };
  const webServer = ctx.webServer;
  if (!webServer || typeof webServer.register !== 'function') throw new Error(`${PACKAGE_ID} requires webServer`);
  if (!ctx.systemPrompt || typeof ctx.systemPrompt.section !== 'function') throw new Error(`${PACKAGE_ID} requires systemPrompt`);

  const getConfig = () => config;
  const listSnapshots = () => readSnapshots();
  const replaceConfig = (input, revision) => {
    config = saveConfig(config, input, revision);
    log(`提示词已保存，enabled=${config.enabled}，bytes=${utf8Bytes(config.text)}`);
    return config;
  };
  const createSnapshot = (name, expectedRevision) => {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision !== config.revision) {
      const error = new Error('提示词已在其他窗口更新，请重新载入后再创建快照');
      error.status = 409; error.code = 'revision_conflict'; throw error;
    }
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 80 || /[\u0000-\u001f\u007f]/.test(name)) {
      const error = new Error('快照名称须为 1 到 80 个字符且不含控制字符');
      error.status = 400; error.code = 'invalid_snapshot_name'; throw error;
    }
    const items = listSnapshots();
    if (items.length >= MAX_SNAPSHOTS) {
      const error = new Error(`最多保留 ${MAX_SNAPSHOTS} 个快照，请先删除旧快照`);
      error.status = 409; error.code = 'snapshot_limit'; throw error;
    }
    const item = { id: randomUUID(), name: name.trim(), enabled: config.enabled, text: config.text, format: config.format,
      fileName: config.fileName, revision: config.revision, createdAt: new Date().toISOString() };
    items.unshift(item);
    writeSnapshots(items);
    log(`已创建提示词快照 ${item.id}，bytes=${utf8Bytes(item.text)}`);
    return item;
  };
  const readSnapshot = (id) => {
    if (typeof id !== 'string') { const error = new Error('快照编号无效'); error.status = 400; error.code = 'invalid_snapshot_id'; throw error; }
    const item = listSnapshots().find((entry) => entry.id === id);
    if (!item) { const error = new Error('找不到该提示词快照'); error.status = 404; error.code = 'snapshot_not_found'; throw error; }
    return item;
  };
  const restoreSnapshot = (id, expectedRevision) => {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision !== config.revision) {
      const error = new Error('提示词已在其他窗口更新，请重新载入后再恢复快照');
      error.status = 409; error.code = 'revision_conflict'; throw error;
    }
    const item = readSnapshot(id);
    return replaceConfig({ enabled: item.enabled, text: item.text, format: item.format, fileName: item.fileName }, expectedRevision);
  };

  ctx.effect(() => ctx.systemPrompt.section({
    name: SECTION_NAME,
    order: SECTION_ORDER,
    interpolate: false,
    text: () => config.enabled ? config.text : '',
  }), `${PACKAGE_ID}: system prompt section`);
  ctx.effect(() => webServer.register(buildRoute(ctx, getConfig, replaceConfig, listSnapshots, createSnapshot, readSnapshot, restoreSnapshot)), `${PACKAGE_ID}: api route`);
}
