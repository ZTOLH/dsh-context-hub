# Context hub

A standalone DSH plugin combining the Resource library and Prompt manager in one panel, opened from **Sidebar → More → Context hub**. It keeps the two feature APIs and data files separate so an existing installation can be switched without data conversion.

## Features / 功能

- **Resource library / 资料库**: select files or folders, configure file filters and choose between reading on every AI request or when keywords match. Text files are bounded per resource and in total.
- **Prompt manager / 提示词**: enter a prompt manually or import UTF-8 `.txt` / `.md`; the maximum is 1 MiB (1,048,576 UTF-8 bytes). Importing updates a draft; save applies it. The prompt can be enabled or disabled.
- **One entry / 统一入口**: one More-menu action and one main panel with two tabs. Each tab remains mounted while switching so an unfinished draft is retained.
- **Separate data / 数据分离**: both existing JSON files remain in place; no import, rename, or deletion is performed by this package.

## Prompt security / 提示词安全

An enabled prompt is registered as a system prompt section for subsequent requests in the current profile. Its contents have system-prompt authority: enable only trusted instructions. The 1 MiB limit is a storage limit; how much of a prompt a model can use depends on its context window.

启用的提示词会作为系统提示词区段应用于当前配置档的后续请求。它具有系统提示词权限，只启用可信指令。1 MiB 是存储上限，模型能实际使用多少还取决于上下文窗口。

## Data files / 数据文件

- Resource library: `${DSH_HOME}/resource-library/config.json`
- Prompt manager: `${DSH_HOME}/prompt-manager/config.json`
- If `DSH_HOME` is unset, both paths are under `~/.dsh/`.

The routes remain `resource-library/api/*` and `prompt-manager/api/*`. These independent storage/API contracts allow the old bundles to be disabled without migrating or overwriting user data.

## Install / 安装

Install this workspace bundle through the DSH plugin manager. Its bundle row id is `context-hub`; the client registers the More action and main panel under the same key. When switching from the two separate bundles, disable those old rows so each system prompt contribution is registered only once. Do not delete the old packages or their data directories as part of the switch.

## Verify / 验证

```sh
node --check lib/index.js
node --check lib/resource-library.js
node --check lib/prompt-manager.js
node --check lib/client.js
node --test test/host.test.mjs
```
