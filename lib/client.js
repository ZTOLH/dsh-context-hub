/** Unified resource-library and prompt-manager client for dsh-context-hub. */
window.__ModuleLoader__.load({
  id: 'dsh-context-hub',
  factory: function (require) {
    const React = require('react');
    const h = React.createElement;
    const PACKAGE_ID = 'dsh-context-hub';

    // Keep the loader's plain-JavaScript dictionaries aligned with locale/*.json.
    const LOCALES = {
  "en": {
    "meta": {
      "title": "Resources & prompts",
      "description": "Manage your resource library and saved prompt in one place."
    },
    "context-hub": {
      "title": "Resources & prompts",
      "resources": "Resource library",
      "prompts": "Prompts"
    },
    "resource-library": {
      "title": "Resource library",
      "add": "Add",
      "edit": "Edit resource",
      "addNew": "Add resource",
      "name": "Resource name",
      "namePlaceholder": "e.g. API documentation",
      "path": "Path",
      "pathPlaceholder": "Enter a file or folder path",
      "type": "Type",
      "file": "File",
      "folder": "Folder",
      "mode": "Read mode",
      "auto": "Every AI request",
      "trigger": "Keyword trigger",
      "autoDescription": "Auto read (every AI request)",
      "triggerDescription": "Keyword trigger (matching questions only)",
      "keywords": "Trigger keywords (commas or new lines)",
      "keywordsPlaceholder": "API, interface, documentation",
      "keywordsLabel": "Keywords",
      "include": "Include patterns (one per line)",
      "includePlaceholder": "*.md\n*.txt",
      "exclude": "Excluded names (one per line)",
      "excludePlaceholder": "node_modules\n.git",
      "recursive": "Read subfolders recursively",
      "maxChars": "Maximum characters per resource",
      "note": "Note (optional)",
      "notePlaceholder": "What this resource is used for",
      "save": "Save",
      "saving": "Saving…",
      "cancel": "Cancel",
      "delete": "Delete",
      "deleteConfirm": "Delete this resource?",
      "empty": "No resources yet. Add a file or folder to get started.",
      "pathRequired": "Enter a resource path.",
      "nameRequired": "Enter a resource name.",
      "maxCharsInvalid": "Enter a whole number from 200 to 200000.",
      "loading": "Loading…",
      "retry": "Retry",
      "saved": "Saved.",
      "loadFailed": "Could not load the library.",
      "saveFailed": "Could not save. Your draft has been kept.",
      "operationError": "{action} {message}",
      "invalidResponse": "The server returned an invalid response (HTTP {status}).",
      "requestFailed": "Request failed (HTTP {status}).",
      "checking": "Checking…",
      "check": "Check files",
      "checkFailed": "Could not check files.",
      "fileSummary": "Files: {count} · Mode: {mode}",
      "enabledResource": "Enable {name}",
      "basic": "Basic information",
      "choosePath": "Choose path",
      "preview": "Preview",
      "browse": "Browse",
      "browsing": "Browsing…",
      "browsePlaceholder": "Enter a path and press Enter",
      "browseFailed": "Could not browse this path.",
      "parent": "Up one folder",
      "roots": "Drives and home folder",
      "useFolder": "Use this folder",
      "useFile": "Use this file",
      "selectedPath": "Selected {kind}: {path}",
      "noEntries": "This folder is empty.",
      "generatePreview": "Generate preview",
      "generating": "Generating…",
      "previewFailed": "Could not generate a preview.",
      "previewSummary": "{chars} characters",
      "truncated": "Content was truncated to its character limit.",
      "noPreview": "No readable content.",
      "settings": "Library settings",
      "enabled": "Enable the library",
      "maxTotalChars": "Maximum total characters per AI request",
      "totalInvalid": "Enter a whole number from 500 to 400000.",
      "saveSettings": "Save settings",
      "testTitle": "Test a question",
      "testHelp": "Tests the saved library settings and resources. Save changes before testing.",
      "question": "Question",
      "questionPlaceholder": "Enter a question to check which resources would be read",
      "test": "Test injection",
      "testing": "Testing…",
      "testFailed": "Could not test this question.",
      "testResult": "Injection preview ({chars} characters)",
      "noInjection": "No resources would be injected.",
      "reasonAlways": "Every AI request",
      "reasonKeyword": "Keyword matched",
      "reasonSkip": "No keyword matched",
      "reasonDisabled": "Disabled",
      "reasonEmpty": "No matching files",
      "reasonBudget": "Character budget exhausted",
      "reasonNoText": "No readable text",
      "reasonOk": "Ready",
      "reasonUnknown": "Unavailable"
    },
    "prompt-manager": {
      "title": "Prompt manager",
      "description": "Manage one prompt for this profile. Saved changes apply to all subsequent AI requests in this profile.",
      "enabled": "Enable this prompt",
      "enableHelp": "Turning this off keeps the saved text. Save to apply changes.",
      "editor": "Prompt text",
      "placeholder": "Enter your prompt here, or import a UTF-8 TXT or Markdown file.",
      "import": "Import TXT or MD",
      "importHelp": "UTF-8 .txt or .md only, up to 1 MiB. Import replaces the draft; save to apply it. 1 MiB is the storage limit; using the full prompt depends on the model’s context window.",
      "importing": "Importing…",
      "manual": "Manual input",
      "source": "Source: {name}",
      "bytes": "{bytes} / {limit} bytes (UTF-8)",
      "limit": "The prompt exceeds 1 MiB. Shorten it before saving.",
      "invalidType": "Choose a .txt or .md file.",
      "invalidName": "The file must have a simple file name without path separators.",
      "fileTooLarge": "This file exceeds 1 MiB. Choose a smaller file.",
      "invalidUtf8": "This file is not valid UTF-8. Save it as UTF-8 and import it again.",
      "importFailed": "Could not read this file. Your draft has been kept.",
      "imported": "File imported into the draft. Save to apply it.",
      "save": "Save",
      "saving": "Saving…",
      "saved": "Saved.",
      "unchanged": "No unsaved changes",
      "unsaved": "Unsaved changes",
      "reload": "Reload saved prompt",
      "reloading": "Reloading…",
      "retry": "Retry",
      "loading": "Loading…",
      "loadFailed": "Could not load the saved prompt.",
      "saveFailed": "Could not save. Your draft has been kept.",
      "conflict": "The saved prompt changed in another window. Your draft has been kept. Copy any text you want to keep, then reload the saved prompt and apply your changes again.",
      "reloadConfirm": "Replace the current draft with the saved prompt? Unsaved changes will be lost.",
      "importConfirm": "Replace the current unsaved draft with this file?",
      "reloaded": "Saved prompt reloaded.",
      "invalidResponse": "The server returned an invalid response.",
      "requestFailed": "Request failed (HTTP {status}).",
      "networkFailed": "Could not connect to the server.",
      "details": "{action} {message}",
      "empty": "The prompt is empty. No prompt text will be added until you enter and save some text.",
      "snapshotsTitle": "Prompt snapshots",
      "snapshotHelp": "Create a named snapshot of the saved prompt, including its enabled setting. Save changes above first to include them.",
      "snapshotDraftHelp": "You have unsaved changes. Creating a snapshot keeps this draft and captures only the previously saved prompt.",
      "snapshotName": "Snapshot name",
      "snapshotNamePlaceholder": "e.g. Writing assistant",
      "snapshotNameHelp": "Use 1–80 characters; control characters are not allowed.",
      "snapshotNameInvalid": "Enter a name with 1–80 characters and no control characters.",
      "snapshotCreate": "Snapshot saved prompt",
      "snapshotCreating": "Creating snapshot…",
      "snapshotCreated": "Snapshot created from the saved prompt. Your draft is unchanged.",
      "snapshotCreateFailed": "Could not create the snapshot. Your draft has been kept.",
      "snapshotCount": "{count} / {max} snapshots",
      "snapshotLimit": "The snapshot limit has been reached. Existing snapshots can still be previewed and restored.",
      "snapshotsRefresh": "Refresh snapshots",
      "snapshotsLoading": "Loading snapshots…",
      "snapshotsLoadFailed": "Could not load snapshots.",
      "snapshotsEmpty": "No snapshots yet. Name the saved prompt to keep a version you can restore later.",
      "snapshotSelect": "Historical snapshot",
      "snapshotSelectPlaceholder": "Select a snapshot to preview",
      "snapshotOption": "{name} · {date}",
      "snapshotPreview": "Snapshot preview (read-only)",
      "snapshotPreviewLoading": "Loading snapshot preview…",
      "snapshotPreviewFailed": "Could not preview this snapshot.",
      "snapshotNotFound": "This snapshot is no longer available. Refresh the snapshot list.",
      "snapshotSummary": "{state} · {bytes} bytes (UTF-8)",
      "snapshotEnabled": "Enabled",
      "snapshotDisabled": "Disabled",
      "snapshotEmptyText": "(Empty prompt)",
      "snapshotRestore": "Restore this snapshot",
      "snapshotRestoring": "Restoring snapshot…",
      "snapshotRestoreHelp": "Restoring replaces the saved prompt and its enabled setting, and takes effect for subsequent AI requests.",
      "snapshotRestoreConfirm": "Restore “{name}”? This replaces the saved prompt and its enabled setting immediately.",
      "snapshotRestoreDirtyConfirm": "Restore “{name}”? Your unsaved changes will be discarded, and the saved prompt and its enabled setting will be replaced immediately.",
      "snapshotRestored": "Snapshot restored and saved. The editor now shows the restored prompt.",
      "snapshotRestoreFailed": "Could not restore the snapshot. Your draft has been kept."
    }
  },
  "zh": {
    "meta": {
      "title": "资料与提示词",
      "description": "在一个面板中管理资料库和已保存的提示词。"
    },
    "context-hub": {
      "title": "资料与提示词",
      "resources": "资料库",
      "prompts": "提示词"
    },
    "resource-library": {
      "title": "资料库",
      "add": "添加",
      "edit": "编辑资源",
      "addNew": "添加资源",
      "name": "资料名称",
      "namePlaceholder": "例如：API 文档",
      "path": "路径",
      "pathPlaceholder": "输入文件或文件夹路径",
      "type": "类型",
      "file": "文件",
      "folder": "文件夹",
      "mode": "读取模式",
      "auto": "每次 AI 调用",
      "trigger": "关键词触发",
      "autoDescription": "自动读取（每次 AI 调用）",
      "triggerDescription": "关键词触发（匹配问题时读取）",
      "keywords": "触发关键词（逗号或换行分隔）",
      "keywordsPlaceholder": "API, 接口, 文档",
      "keywordsLabel": "关键词",
      "include": "包含文件格式（每行一个）",
      "includePlaceholder": "*.md\n*.txt",
      "exclude": "排除名称（每行一个）",
      "excludePlaceholder": "node_modules\n.git",
      "recursive": "递归读取子文件夹",
      "maxChars": "每个资源最多读取字符数",
      "note": "备注（可选）",
      "notePlaceholder": "这个资料用来做什么",
      "save": "保存",
      "saving": "保存中…",
      "cancel": "取消",
      "delete": "删除",
      "deleteConfirm": "确定要删除这个资源吗？",
      "empty": "暂无资源，请添加文件或文件夹。",
      "pathRequired": "请填写资源路径。",
      "nameRequired": "请输入资料名称。",
      "maxCharsInvalid": "请输入 200 到 200000 之间的整数。",
      "loading": "加载中…",
      "retry": "重试",
      "saved": "已保存。",
      "loadFailed": "无法加载资料库。",
      "saveFailed": "保存失败，草稿已保留。",
      "operationError": "{action} {message}",
      "invalidResponse": "服务器响应格式错误（HTTP {status}）。",
      "requestFailed": "请求失败（HTTP {status}）。",
      "checking": "检查中…",
      "check": "检查文件",
      "checkFailed": "无法检查文件。",
      "fileSummary": "文件：{count} · 模式：{mode}",
      "enabledResource": "启用 {name}",
      "basic": "基本信息",
      "choosePath": "选择路径",
      "preview": "预览",
      "browse": "浏览",
      "browsing": "浏览中…",
      "browsePlaceholder": "输入路径后按 Enter",
      "browseFailed": "无法浏览此路径。",
      "parent": "返回上级",
      "roots": "磁盘与主目录",
      "useFolder": "使用此文件夹",
      "useFile": "使用此文件",
      "selectedPath": "已选{kind}：{path}",
      "noEntries": "此文件夹为空。",
      "generatePreview": "生成预览",
      "generating": "生成中…",
      "previewFailed": "无法生成预览。",
      "previewSummary": "{chars} 个字符",
      "truncated": "内容已按字符上限截断。",
      "noPreview": "没有可读取的文本。",
      "settings": "资料库设置",
      "enabled": "启用资料库",
      "maxTotalChars": "每次 AI 调用最多读取的总字符数",
      "totalInvalid": "请输入 500 到 400000 之间的整数。",
      "saveSettings": "保存设置",
      "testTitle": "测试问题",
      "testHelp": "使用已保存的资料和设置测试，请先保存修改。",
      "question": "问题",
      "questionPlaceholder": "输入问题，检查将读取哪些资料",
      "test": "测试注入",
      "testing": "测试中…",
      "testFailed": "无法测试此问题。",
      "testResult": "注入预览（{chars} 个字符）",
      "noInjection": "没有资料将被注入。",
      "reasonAlways": "每次 AI 调用",
      "reasonKeyword": "关键词匹配",
      "reasonSkip": "未匹配关键词",
      "reasonDisabled": "已禁用",
      "reasonEmpty": "没有匹配文件",
      "reasonBudget": "字符预算已用完",
      "reasonNoText": "没有可读文本",
      "reasonOk": "可用",
      "reasonUnknown": "不可用"
    },
    "prompt-manager": {
      "title": "提示词管理",
      "description": "管理当前配置档的一份提示词。保存后的修改将应用到此配置档所有后续的 AI 请求。",
      "enabled": "启用这份提示词",
      "enableHelp": "关闭后仍会保留已保存的文本。修改需要保存后生效。",
      "editor": "提示词内容",
      "placeholder": "在此输入提示词，或导入 UTF-8 编码的 TXT、Markdown 文件。",
      "import": "导入 TXT 或 MD",
      "importHelp": "仅支持 UTF-8 编码的 .txt 或 .md 文件，最大 1 MiB。导入会替换草稿，保存后才生效。1 MiB 是保存上限，能否完整使用取决于模型的上下文窗口。",
      "importing": "导入中…",
      "manual": "手动输入",
      "source": "来源：{name}",
      "bytes": "{bytes} / {limit} 字节（UTF-8）",
      "limit": "提示词超过 1 MiB，请缩短后再保存。",
      "invalidType": "请选择 .txt 或 .md 文件。",
      "invalidName": "文件名不能包含路径分隔符。",
      "fileTooLarge": "文件超过 1 MiB，请选择更小的文件。",
      "invalidUtf8": "文件不是有效的 UTF-8 编码，请另存为 UTF-8 后重新导入。",
      "importFailed": "无法读取文件，草稿已保留。",
      "imported": "文件已导入草稿，保存后生效。",
      "save": "保存",
      "saving": "保存中…",
      "saved": "已保存。",
      "unchanged": "没有未保存的修改",
      "unsaved": "有未保存的修改",
      "reload": "重新载入已保存的提示词",
      "reloading": "重新载入中…",
      "retry": "重试",
      "loading": "加载中…",
      "loadFailed": "无法加载已保存的提示词。",
      "saveFailed": "保存失败，草稿已保留。",
      "conflict": "其他窗口已修改这份提示词，当前草稿已保留。请先复制需要保留的文本，再重新载入已保存的提示词并重新应用修改。",
      "reloadConfirm": "用已保存的提示词替换当前草稿？尚未保存的修改会丢失。",
      "importConfirm": "用这个文件替换当前未保存的草稿？",
      "reloaded": "已重新载入保存的提示词。",
      "invalidResponse": "服务器响应格式错误。",
      "requestFailed": "请求失败（HTTP {status}）。",
      "networkFailed": "无法连接到服务器。",
      "details": "{action} {message}",
      "empty": "提示词为空，输入并保存文本后才会添加提示词内容。",
      "snapshotsTitle": "提示词快照",
      "snapshotHelp": "为已保存的提示词创建命名快照，包含启用状态。要将当前修改存入快照，请先在上方保存。",
      "snapshotDraftHelp": "当前有未保存的修改。创建快照会保留当前草稿，仅记录之前已保存的提示词。",
      "snapshotName": "快照名称",
      "snapshotNamePlaceholder": "例如：写作助手",
      "snapshotNameHelp": "名称须为 1–80 个字符，不能包含控制字符。",
      "snapshotNameInvalid": "请输入 1–80 个字符的名称，不能包含控制字符。",
      "snapshotCreate": "为已保存的提示词创建快照",
      "snapshotCreating": "创建快照中…",
      "snapshotCreated": "已为保存的提示词创建快照，当前草稿未改变。",
      "snapshotCreateFailed": "无法创建快照，当前草稿已保留。",
      "snapshotCount": "{count} / {max} 个快照",
      "snapshotLimit": "快照数量已达到上限，仍可预览和恢复已有快照。",
      "snapshotsRefresh": "刷新快照列表",
      "snapshotsLoading": "加载快照中…",
      "snapshotsLoadFailed": "无法加载快照列表。",
      "snapshotsEmpty": "暂无快照。为已保存的提示词命名，保留一个可随时恢复的版本。",
      "snapshotSelect": "历史快照",
      "snapshotSelectPlaceholder": "选择要预览的快照",
      "snapshotOption": "{name} · {date}",
      "snapshotPreview": "快照预览（只读）",
      "snapshotPreviewLoading": "加载快照预览中…",
      "snapshotPreviewFailed": "无法预览此快照。",
      "snapshotNotFound": "此快照已不可用，请刷新快照列表。",
      "snapshotSummary": "{state} · {bytes} 字节（UTF-8）",
      "snapshotEnabled": "已启用",
      "snapshotDisabled": "已停用",
      "snapshotEmptyText": "（空提示词）",
      "snapshotRestore": "恢复此快照",
      "snapshotRestoring": "恢复快照中…",
      "snapshotRestoreHelp": "恢复会替换已保存的提示词和启用状态，并应用到后续的 AI 请求。",
      "snapshotRestoreConfirm": "恢复“{name}”？这会立即替换已保存的提示词及其启用状态。",
      "snapshotRestoreDirtyConfirm": "恢复“{name}”？当前未保存的修改将被丢弃，已保存的提示词及其启用状态也会立即被替换。",
      "snapshotRestored": "快照已恢复并保存，编辑框已显示恢复后的提示词。",
      "snapshotRestoreFailed": "无法恢复快照，当前草稿已保留。"
    }
  }
};

    const resourceFeature = (() => {
      // Inlined for the plain-JavaScript module loader; keep in sync with locale/*.json.
      const CSS = `
  [data-resource-library] { display:flex; flex-direction:column; height:100%; min-height:0; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); font:13px/1.5 system-ui,-apple-system,sans-serif; }
  [data-resource-library] * { box-sizing:border-box; }
  [data-resource-library] button, [data-resource-library] input, [data-resource-library] textarea, [data-resource-library] select { font:inherit; color:inherit; background:var(--dsw-alias-bg-layer-1); border:1px solid var(--dsw-alias-border-l1); border-radius:6px; padding:6px 10px; }
  [data-resource-library] button { cursor:pointer; }
  [data-resource-library] button:hover:not(:disabled) { background:var(--dsw-alias-bg-layer-2); }
  [data-resource-library] button:disabled { opacity:.55; cursor:wait; }
  [data-resource-library] button:focus-visible, [data-resource-library] input:focus-visible, [data-resource-library] textarea:focus-visible, [data-resource-library] select:focus-visible { outline:2px solid var(--dsw-alias-brand-primary); outline-offset:2px; }
  [data-resource-library] .header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px; border-bottom:1px solid var(--dsw-alias-border-l1); }
  [data-resource-library] h1 { font-size:16px; margin:0; }
  [data-resource-library] h2 { font-size:14px; margin:0 0 10px; }
  [data-resource-library] p { margin:8px 0; }
  [data-resource-library] .body { flex:1; min-height:0; overflow:auto; padding:16px; }
  [data-resource-library] .section, [data-resource-library] .resource-item { padding:12px; border:1px solid var(--dsw-alias-border-l1); border-radius:8px; margin-bottom:12px; }
  [data-resource-library] .resource-item { background:var(--dsw-alias-bg-layer-2); }
  [data-resource-library] .resource-item.disabled { opacity:.65; }
  [data-resource-library] .row, [data-resource-library] .resource-actions, [data-resource-library] .form-actions, [data-resource-library] .tabs { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  [data-resource-library] .tabs { margin-bottom:16px; }
  [data-resource-library] .tab-btn.active { border-color:var(--dsw-alias-brand-primary); }
  [data-resource-library] .resource-title { display:flex; align-items:center; gap:8px; overflow-wrap:anywhere; }
  [data-resource-library] .badge { margin-left:auto; font-size:11px; color:var(--dsw-alias-label-secondary); }
  [data-resource-library] .resource-path, [data-resource-library] .muted { color:var(--dsw-alias-label-secondary); font-size:12px; overflow-wrap:anywhere; }
  [data-resource-library] .resource-path { font-family:monospace; margin:6px 0; }
  [data-resource-library] .resource-actions { margin-top:8px; }
  [data-resource-library] .form-group { display:block; margin-bottom:12px; }
  [data-resource-library] .form-group > span { display:block; margin-bottom:4px; }
  [data-resource-library] .form-group input:not([type=checkbox]), [data-resource-library] textarea, [data-resource-library] select { width:100%; }
  [data-resource-library] textarea { resize:vertical; min-height:70px; }
  [data-resource-library] input[type=checkbox] { width:auto; margin:0 6px 0 0; }
  [data-resource-library] fieldset { min-width:0; border:0; padding:0; margin:0; }
  [data-resource-library] .form-actions { margin-top:16px; }
  [data-resource-library] .browser-header { display:flex; gap:8px; margin-bottom:8px; }
  [data-resource-library] .browser-header input { flex:1; min-width:0; }
  [data-resource-library] .browser-entries { max-height:320px; overflow:auto; margin-top:8px; }
  [data-resource-library] .browser-entry { display:block; width:100%; text-align:left; overflow-wrap:anywhere; margin:2px 0; }
  [data-resource-library] .error, [data-resource-library] .success { padding:10px; margin-bottom:12px; border:1px solid; border-radius:6px; overflow-wrap:anywhere; }
  [data-resource-library] .error { color:var(--dsw-alias-state-error-primary); }
  [data-resource-library] .success { color:var(--dsw-alias-brand-primary); }
  [data-resource-library] .loading { padding:16px; color:var(--dsw-alias-label-secondary); }
  [data-resource-library] pre { white-space:pre-wrap; overflow-wrap:anywhere; max-height:400px; overflow:auto; font:12px/1.5 monospace; padding:10px; background:var(--dsw-alias-bg-layer-2); border-radius:6px; }
  `;

      function installStyles() {
        if (typeof document === 'undefined' || !document.head) return;
        const style = document.createElement('style');
        style.setAttribute('data-plugin-css', PACKAGE_ID);
        style.textContent = CSS;
        document.head.appendChild(style);
        return () => style.remove();
      }

      function translator(ctx) {
        const bound = ctx.locale.bind(PACKAGE_ID);
        return (key, values = {}) => {
          const translated = bound(`resource-library.${key}`);
          const text = typeof translated === 'string' ? translated : LOCALES.en['resource-library'][key] || key;
          return text.replace(/\{(\w+)\}/g, (match, name) => Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match);
        };
      }

      function useLocale(ctx) {
        const subscribe = React.useCallback((listener) => ctx.locale.subscribe(listener), [ctx]);
        const snapshot = React.useCallback(() => {
          const current = ctx.locale.getSnapshot();
          return `${current.active}:${current.revision}`;
        }, [ctx]);
        React.useSyncExternalStore(subscribe, snapshot, snapshot);
        return React.useMemo(() => translator(ctx), [ctx]);
      }

      async function api(method, data) {
        try {
          const response = await fetch(`resource-library/api/${method}`, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data || {}),
          });
          let result;
          try { result = await response.json(); } catch {
            return { ok: false, error: { code: 'invalid_response', status: response.status } };
          }
          if (!response.ok) return { ok: false, error: result?.error || { code: 'http', status: response.status } };
          if (!result || typeof result.ok !== 'boolean') return { ok: false, error: { code: 'invalid_response', status: response.status } };
          return result;
        } catch (error) {
          return { ok: false, error: { message: error instanceof Error ? error.message : String(error) } };
        }
      }

      function errorText(t, action, result) {
        const error = result?.error;
        const message = error?.code === 'invalid_response'
          ? t('invalidResponse', { status: error.status })
          : error?.code === 'http' ? t('requestFailed', { status: error.status }) : error?.message || '';
        return t('operationError', { action: t(action), message }).trim();
      }

      function newId() {
        return globalThis.crypto?.randomUUID?.() || `resource-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      }
      function defaultConfig() { return { version: 1, enabled: true, maxTotalChars: 16000, resources: [] }; }
      function configWithDefaults(value) { return { ...defaultConfig(), ...value, resources: Array.isArray(value?.resources) ? value.resources : [] }; }
      function lines(value) { return String(value || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean); }
      function toDraft(resource) {
        const base = { id: newId(), name: '', path: '', kind: 'dir', include: [], exclude: [], recursive: true, mode: 'always', keywords: [], maxChars: 8000, enabled: true, note: '', ...resource };
        return { ...base, include: Array.isArray(base.include) ? base.include.join('\n') : base.include || '', exclude: Array.isArray(base.exclude) ? base.exclude.join('\n') : base.exclude || '', keywords: Array.isArray(base.keywords) ? base.keywords.join(', ') : base.keywords || '' };
      }
      function fromDraft(form) {
        return { ...form, name: form.name.trim(), path: form.path.trim(), maxChars: Number(form.maxChars), include: lines(form.include), exclude: lines(form.exclude), keywords: form.keywords.split(/[,，\n]/).map((keyword) => keyword.trim()).filter(Boolean) };
      }
      function reasonText(t, reason) {
        const keys = { always: 'reasonAlways', keyword: 'reasonKeyword', skip: 'reasonSkip', disabled: 'reasonDisabled', empty: 'reasonEmpty', budget: 'reasonBudget', 'no-text': 'reasonNoText', ok: 'reasonOk' };
        return t(keys[reason] || 'reasonUnknown');
      }
      function field(label, input) { return h('label', { className: 'form-group' }, h('span', null, label), input); }
      function errorView(message) { return message ? h('div', { className: 'error', role: 'alert' }, message) : null; }

      function ResourceListView(props) {
        const { resources, t } = props;
        const [counts, setCounts] = React.useState({});
        const [checking, setChecking] = React.useState(false);
        const [error, setError] = React.useState('');
        const request = React.useRef(0);
        const refreshStatus = React.useCallback(async () => {
          const ticket = ++request.current;
          setChecking(true);
          setError('');
          const result = await api('check');
          if (ticket !== request.current) return;
          if (result.ok && result.value) {
            setCounts(Object.fromEntries((result.value.resources || []).map((item) => [item.id, item.files])));
          } else setError(result);
          setChecking(false);
        }, []);
        React.useEffect(() => {
          setCounts({});
          void refreshStatus();
          return () => { request.current += 1; };
        }, [resources, refreshStatus]);
        return h('section', null,
          errorView(error && errorText(t, 'checkFailed', error)),
          h('button', { onClick: refreshStatus, disabled: checking || props.saving }, t(checking ? 'checking' : 'check')),
          h('div', { style: { marginTop: 12 } }, resources.length === 0 ? h('p', { className: 'muted' }, t('empty')) : resources.map((resource) =>
            h('div', { key: resource.id, className: `resource-item${resource.enabled !== false ? '' : ' disabled'}` },
              h('div', { className: 'resource-title' },
                h('input', { type: 'checkbox', checked: resource.enabled !== false, disabled: props.saving, 'aria-label': t('enabledResource', { name: resource.name }), onChange: () => props.onToggle(resource.id) }),
                h('strong', null, resource.name), resource.mode === 'trigger' && h('span', { className: 'badge' }, t('trigger'))),
              h('div', { className: 'resource-path' }, resource.path),
              h('div', { className: 'muted' }, t('fileSummary', { count: counts[resource.id] ?? '—', mode: t(resource.mode === 'trigger' ? 'trigger' : 'auto') })),
              h('div', { className: 'resource-actions' },
                h('button', { onClick: () => props.onEdit(resource.id), disabled: props.saving }, t('edit')),
                h('button', { onClick: () => { if (window.confirm(t('deleteConfirm'))) props.onDelete(resource.id); }, disabled: props.saving }, t('delete')))))));
      }

      function GlobalSettings(props) {
        const { config, t } = props;
        const [enabled, setEnabled] = React.useState(config.enabled !== false);
        const [maxTotalChars, setMaxTotalChars] = React.useState(config.maxTotalChars);
        const [invalid, setInvalid] = React.useState(false);
        React.useEffect(() => { setEnabled(config.enabled !== false); setMaxTotalChars(config.maxTotalChars); }, [config.enabled, config.maxTotalChars]);
        const save = () => {
          const total = Number(maxTotalChars);
          if (!Number.isInteger(total) || total < 500 || total > 400000) { setInvalid(true); return; }
          setInvalid(false);
          return props.onSave({ enabled, maxTotalChars: total });
        };
        return h('section', { className: 'section' }, h('h2', null, t('settings')),
          h('fieldset', { disabled: props.saving },
            h('label', { className: 'form-group' }, h('input', { type: 'checkbox', checked: enabled, onChange: (e) => setEnabled(e.target.checked) }), t('enabled')),
            field(t('maxTotalChars'), h('input', { type: 'number', min: 500, max: 400000, step: 1, value: maxTotalChars, onChange: (e) => setMaxTotalChars(e.target.value) })),
            errorView(invalid && t('totalInvalid')),
            h('button', { onClick: save }, t('saveSettings'))));
      }

      function InjectionTest(props) {
        const { t } = props;
        const [question, setQuestion] = React.useState('');
        const [result, setResult] = React.useState(null);
        const [testing, setTesting] = React.useState(false);
        const request = React.useRef(0);
        React.useEffect(() => { request.current += 1; setResult(null); setTesting(false); return () => { request.current += 1; }; }, [props.config]);
        const test = async () => {
          const ticket = ++request.current;
          setTesting(true);
          setResult(null);
          const response = await api('test', { question });
          if (ticket !== request.current) return;
          setResult(response);
          setTesting(false);
        };
        return h('section', { className: 'section' }, h('h2', null, t('testTitle')),
          h('p', { className: 'muted' }, t('testHelp')),
          field(t('question'), h('textarea', { value: question, disabled: testing, onChange: (e) => setQuestion(e.target.value), placeholder: t('questionPlaceholder') })),
          h('button', { onClick: test, disabled: testing || props.saving }, t(testing ? 'testing' : 'test')),
          result && !result.ok && errorView(errorText(t, 'testFailed', result)),
          result?.ok && h('div', null,
            h('p', null, t('testResult', { chars: result.value?.chars ?? 0 })),
            h('ul', null, (result.value?.picked || []).map((item) => h('li', { key: item.id }, `${item.name}: ${reasonText(t, item.reason)}`))),
            result.value?.text ? h('pre', null, result.value.text) : h('p', { className: 'muted' }, t('noInjection'))));
      }

      function EditForm(props) {
        const { t } = props;
        const [form, setForm] = React.useState(() => toDraft(props.resource));
        const [tab, setTab] = React.useState('basic');
        const [validation, setValidation] = React.useState('');
        const [browserPath, setBrowserPath] = React.useState(props.resource?.path || '');
        const [browserData, setBrowserData] = React.useState(null);
        const [browserLoading, setBrowserLoading] = React.useState(false);
        const [browserError, setBrowserError] = React.useState(null);
        const [preview, setPreview] = React.useState(null);
        const browseRequest = React.useRef(0);
        const previewRequest = React.useRef(0);
        React.useEffect(() => () => { browseRequest.current += 1; previewRequest.current += 1; }, []);
        const updateForm = (key, value) => { setForm((current) => ({ ...current, [key]: value })); setValidation(''); };
        const browse = async (path) => {
          const target = typeof path === 'string' ? path : '';
          const ticket = ++browseRequest.current;
          setBrowserPath(target);
          setBrowserLoading(true);
          setBrowserError(null);
          const result = await api('browse', { path: target });
          if (ticket !== browseRequest.current) return;
          if (result.ok && result.value) { setBrowserData(result.value); setBrowserPath(result.value.path ?? target); }
          else setBrowserError(result);
          setBrowserLoading(false);
        };
        const selectPath = (entry) => {
          setForm((current) => ({ ...current, path: entry.path, kind: entry.type === 'file' ? 'file' : 'dir' }));
          setValidation('');
          void browse(entry.path);
        };
        const doPreview = async () => {
          if (!form.path.trim()) { setValidation('pathRequired'); return; }
          const ticket = ++previewRequest.current;
          setPreview({ loading: true });
          const result = await api('preview', { resource: fromDraft(form) });
          if (ticket === previewRequest.current) setPreview(result);
        };
        const save = () => {
          if (!form.path.trim()) { setValidation('pathRequired'); return; }
          if (!form.name.trim()) { setValidation('nameRequired'); return; }
          const maxChars = Number(form.maxChars);
          if (!Number.isInteger(maxChars) || maxChars < 200 || maxChars > 200000) { setValidation('maxCharsInvalid'); return; }
          setValidation('');
          return props.onSave(fromDraft(form));
        };
        const setCurrentTab = (next) => { setTab(next); if (next === 'browse' && !browserData) void browse(browserPath); };
        return h('div', null,
          h('h2', null, t(props.resource ? 'edit' : 'addNew')),
          errorView(validation && t(validation)),
          h('fieldset', { disabled: props.saving },
            h('div', { className: 'tabs' }, [['basic', 'basic'], ['browse', 'choosePath'], ['preview', 'preview']].map(([value, label]) =>
              h('button', { key: value, className: `tab-btn${tab === value ? ' active' : ''}`, onClick: () => setCurrentTab(value), 'aria-pressed': tab === value }, t(label)))),
            tab === 'basic' && h('div', null,
              field(t('name'), h('input', { value: form.name, onChange: (e) => updateForm('name', e.target.value), placeholder: t('namePlaceholder') })),
              field(t('path'), h('input', { value: form.path, onChange: (e) => updateForm('path', e.target.value), placeholder: t('pathPlaceholder') })),
              field(t('type'), h('select', { value: form.kind, onChange: (e) => updateForm('kind', e.target.value) }, h('option', { value: 'dir' }, t('folder')), h('option', { value: 'file' }, t('file')))),
              form.kind === 'dir' && h('div', null,
                field(t('include'), h('textarea', { value: form.include, onChange: (e) => updateForm('include', e.target.value), placeholder: t('includePlaceholder') })),
                field(t('exclude'), h('textarea', { value: form.exclude, onChange: (e) => updateForm('exclude', e.target.value), placeholder: t('excludePlaceholder') })),
                h('label', { className: 'form-group' }, h('input', { type: 'checkbox', checked: form.recursive !== false, onChange: (e) => updateForm('recursive', e.target.checked) }), t('recursive'))),
              field(t('mode'), h('select', { value: form.mode, onChange: (e) => updateForm('mode', e.target.value) }, h('option', { value: 'always' }, t('autoDescription')), h('option', { value: 'trigger' }, t('triggerDescription')))),
              form.mode === 'trigger' && field(t('keywords'), h('textarea', { value: form.keywords, onChange: (e) => updateForm('keywords', e.target.value), placeholder: t('keywordsPlaceholder') })),
              field(t('maxChars'), h('input', { type: 'number', value: form.maxChars, min: 200, max: 200000, step: 1, onChange: (e) => updateForm('maxChars', e.target.value) })),
              field(t('note'), h('textarea', { value: form.note, onChange: (e) => updateForm('note', e.target.value), placeholder: t('notePlaceholder') }))),
            tab === 'browse' && h('div', null,
              h('div', { className: 'browser-header' },
                h('input', { value: browserPath, onChange: (e) => setBrowserPath(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') { e.preventDefault(); void browse(browserPath); } }, placeholder: t('browsePlaceholder'), 'aria-label': t('path') }),
                h('button', { onClick: () => browse(browserPath), disabled: browserLoading }, t(browserLoading ? 'browsing' : 'browse'))),
              errorView(browserError && errorText(t, 'browseFailed', browserError)),
              errorView(browserData?.error),
              form.path && h('p', { className: 'muted' }, t('selectedPath', { kind: t(form.kind === 'file' ? 'file' : 'folder'), path: form.path })),
              browserData && h('div', null,
                h('div', { className: 'row' },
                  h('button', { onClick: () => browse(''), disabled: browserLoading }, t('roots')),
                  browserData.parent && h('button', { onClick: () => browse(browserData.parent), disabled: browserLoading }, t('parent')),
                  browserData.path && !browserData.error && h('button', { onClick: () => selectPath({ path: browserData.path, type: browserData.isFile ? 'file' : 'dir' }), disabled: browserLoading }, t(browserData.isFile ? 'useFile' : 'useFolder'))),
                h('div', { className: 'browser-entries' }, (browserData.entries || []).map((entry) => h('button', { key: entry.path, className: 'browser-entry', disabled: browserLoading, onClick: () => selectPath(entry) }, entry.type === 'dir' ? '📁 ' : '📄 ', entry.name))),
                browserData.path && !browserData.error && !browserData.isFile && !browserData.entries?.length && h('p', { className: 'muted' }, t('noEntries')))),
            tab === 'preview' && h('div', null,
              h('button', { onClick: doPreview, disabled: preview?.loading }, t(preview?.loading ? 'generating' : 'generatePreview')),
              preview && !preview.loading && !preview.ok && errorView(errorText(t, 'previewFailed', preview)),
              preview?.ok && h('div', null,
                h('p', { className: 'muted' }, t('previewSummary', { chars: preview.value?.chars ?? 0 })),
                preview.value?.truncated && h('p', { className: 'muted' }, t('truncated')),
                preview.value?.text ? h('pre', null, preview.value.text) : h('p', { className: 'muted' }, `${t('noPreview')} ${reasonText(t, preview.value?.reason)}`))),
            h('div', { className: 'form-actions' },
              h('button', { onClick: save }, t(props.saving ? 'saving' : props.resource ? 'save' : 'add')),
              h('button', { onClick: props.onCancel }, t('cancel')))));
      }

      function PanelPage(props) {
        const t = useLocale(props.__ctx);
        const [config, setConfig] = React.useState(defaultConfig);
        const configRef = React.useRef(config);
        const [mode, setMode] = React.useState('list');
        const [editId, setEditId] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [ready, setReady] = React.useState(false);
        const [reload, setReload] = React.useState(0);
        const [saving, setSaving] = React.useState(false);
        const savingRef = React.useRef(false);
        const saveRequest = React.useRef(0);
        React.useEffect(() => () => { saveRequest.current += 1; savingRef.current = false; }, []);
        const [error, setError] = React.useState(null);
        const [saved, setSaved] = React.useState(false);
        React.useEffect(() => {
          let active = true;
          setLoading(true);
          setError(null);
          api('state').then((result) => {
            if (!active) return;
            if (result.ok && result.value?.config && Array.isArray(result.value.config.resources)) {
              const next = configWithDefaults(result.value.config);
              configRef.current = next;
              setConfig(next);
              setReady(true);
            } else setError({ action: 'loadFailed', result });
            setLoading(false);
          });
          return () => { active = false; };
        }, [reload]);

        // Every mutation sends the complete config. A failed save leaves both the
        // authoritative list and the mounted editor/settings drafts untouched.
        const saveConfig = async (nextConfig, closeEditor = false) => {
          if (savingRef.current || !ready) return false;
          savingRef.current = true;
          const ticket = ++saveRequest.current;
          setSaving(true);
          setError(null);
          setSaved(false);
          try {
            const result = await api('save', { config: nextConfig });
            if (ticket !== saveRequest.current) return false;
            if (!result.ok) { setError({ action: 'saveFailed', result }); return false; }
            const next = configWithDefaults(result.value?.config || nextConfig);
            configRef.current = next;
            setConfig(next);
            setSaved(true);
            if (closeEditor) { setMode('list'); setEditId(null); }
            return true;
          } finally {
            if (ticket === saveRequest.current) { savingRef.current = false; setSaving(false); }
          }
        };
        const upsertResource = (draft) => {
          const current = configRef.current;
          const id = editId || draft.id || newId();
          const resource = { ...draft, id };
          const exists = current.resources.some((item) => item.id === id);
          const resources = exists ? current.resources.map((item) => item.id === id ? resource : item) : [...current.resources, resource];
          return saveConfig({ ...current, resources }, true);
        };
        const removeResource = (id) => {
          const current = configRef.current;
          return saveConfig({ ...current, resources: current.resources.filter((item) => item.id !== id) });
        };
        const toggleResource = (id) => {
          const current = configRef.current;
          return saveConfig({ ...current, resources: current.resources.map((item) => item.id === id ? { ...item, enabled: item.enabled === false } : item) });
        };
        const editResource = (id) => { setEditId(id); setMode('edit'); setError(null); setSaved(false); };
        const cancelEdit = () => { setMode('list'); setEditId(null); setError(null); };
        return h('div', { 'data-resource-library': true },
          h('div', { className: 'header' }, h('h1', null, `📚 ${t('title')}`),
            mode === 'list' && h('button', { onClick: () => editResource(null), disabled: loading || !ready || saving }, `+ ${t('add')}`)),
          h('div', { className: 'body' },
            errorView(error && errorText(t, error.action, error.result)),
            saved && h('div', { className: 'success', role: 'status' }, t('saved')),
            loading ? h('div', { className: 'loading' }, t('loading')) : !ready
              ? h('button', { onClick: () => setReload((value) => value + 1) }, t('retry'))
              : mode === 'list' ? h('div', null,
                h(GlobalSettings, { config, t, saving, onSave: (settings) => saveConfig({ ...configRef.current, ...settings }) }),
                h(ResourceListView, { resources: config.resources, t, saving, onEdit: editResource, onDelete: removeResource, onToggle: toggleResource }),
                h(InjectionTest, { config, t, saving }))
              : h(EditForm, { key: editId || 'new', resource: editId ? config.resources.find((item) => item.id === editId) : null, t, saving, onSave: upsertResource, onCancel: cancelEdit })));
      }

      return { PanelPage, installStyles };
    })();

    const promptFeature = (() => {
      const MAX_BYTES = 1048576;
      // The plain JavaScript loader cannot import JSON; keep these dictionaries in sync.
      const CSS = `
  [data-prompt-manager] { display:flex; flex-direction:column; height:100%; min-height:0; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); font:14px/1.5 system-ui,-apple-system,sans-serif; }
  [data-prompt-manager] * { box-sizing:border-box; }
  [data-prompt-manager] .pm-header { display:flex; flex-wrap:wrap; align-items:center; gap:12px; padding:14px 20px; border-bottom:1px solid var(--dsw-alias-border-l1); }
  [data-prompt-manager] h1 { margin:0; font-size:16px; font-weight:600; }
  [data-prompt-manager] .pm-body { flex:1; min-height:0; overflow:auto; padding:20px; }
  [data-prompt-manager] .pm-content { max-width:1000px; margin:0 auto; }
  [data-prompt-manager] p { margin:0 0 12px; }
  [data-prompt-manager] .pm-muted { color:var(--dsw-alias-label-secondary); font-size:12px; overflow-wrap:anywhere; }
  [data-prompt-manager] button, [data-prompt-manager] textarea, [data-prompt-manager] input[type=text], [data-prompt-manager] select { font:inherit; color:inherit; background:var(--dsw-alias-bg-layer-1); border:1px solid var(--dsw-alias-border-l1); border-radius:8px; padding:8px 12px; }
  [data-prompt-manager] button { cursor:pointer; }
  [data-prompt-manager] button:hover:not(:disabled) { background:var(--dsw-alias-bg-layer-2); }
  [data-prompt-manager] button:disabled { opacity:.55; cursor:default; }
  [data-prompt-manager] button:focus-visible, [data-prompt-manager] textarea:focus-visible, [data-prompt-manager] input:focus-visible, [data-prompt-manager] select:focus-visible { outline:2px solid var(--dsw-alias-brand-primary); outline-offset:2px; }
  [data-prompt-manager] fieldset { margin:0; padding:0; border:0; min-width:0; }
  [data-prompt-manager] .pm-setting { padding:14px 0; border-bottom:1px solid var(--dsw-alias-border-l1); margin-bottom:16px; }
  [data-prompt-manager] .pm-switch { display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:6px; }
  [data-prompt-manager] .pm-switch input { accent-color:var(--dsw-alias-brand-primary); width:16px; height:16px; margin:0; }
  [data-prompt-manager] .pm-toolbar, [data-prompt-manager] .pm-actions, [data-prompt-manager] .pm-count { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin:12px 0; }
  [data-prompt-manager] .pm-editor-label { display:block; font-weight:600; margin:16px 0 8px; }
  [data-prompt-manager] textarea { display:block; width:100%; min-height:300px; height:40vh; resize:vertical; font:13px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace; tab-size:2; }
  [data-prompt-manager] .pm-alert, [data-prompt-manager] .pm-status { padding:10px 12px; margin-bottom:12px; border:1px solid currentColor; border-radius:8px; overflow-wrap:anywhere; }
  [data-prompt-manager] .pm-alert, [data-prompt-manager] .pm-over { color:var(--dsw-alias-state-error-primary); }
  [data-prompt-manager] .pm-status { color:var(--dsw-alias-brand-primary); }
  [data-prompt-manager] .pm-primary { border-color:var(--dsw-alias-brand-primary); }
  [data-prompt-manager] .pm-snapshots { margin-top:24px; padding-top:20px; border-top:1px solid var(--dsw-alias-border-l1); }
  [data-prompt-manager] .pm-snapshots h2 { margin:0 0 8px; font-size:15px; }
  [data-prompt-manager] .pm-snapshot-row { display:flex; align-items:flex-end; flex-wrap:wrap; gap:12px; margin:12px 0; }
  [data-prompt-manager] .pm-snapshot-field { display:flex; flex:1 1 220px; flex-direction:column; gap:6px; min-width:0; }
  [data-prompt-manager] .pm-snapshot-field input, [data-prompt-manager] .pm-snapshot-field select { width:100%; min-width:0; }
  [data-prompt-manager] .pm-snapshot-preview { white-space:pre-wrap; overflow-wrap:anywhere; overflow:auto; max-height:320px; padding:12px; border:1px solid var(--dsw-alias-border-l1); border-radius:8px; background:var(--dsw-alias-bg-layer-2); font:13px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace; }
  `;

      function installStyles() {
        if (typeof document === 'undefined' || !document.head) return;
        const style = document.createElement('style');
        style.setAttribute('data-plugin-css', PACKAGE_ID);
        style.textContent = CSS;
        document.head.appendChild(style);
        return () => style.remove();
      }
      function translator(ctx) {
        const bound = ctx.locale.bind(PACKAGE_ID);
        return (key, params) => bound(`prompt-manager.${key}`, params);
      }
      function useLocale(ctx) {
        const subscribe = React.useCallback((listener) => ctx.locale.subscribe(listener), [ctx]);
        const snapshot = React.useCallback(() => {
          const current = ctx.locale.getSnapshot();
          return `${current.active}:${current.revision}`;
        }, [ctx]);
        React.useSyncExternalStore(subscribe, snapshot, snapshot);
        return React.useMemo(() => translator(ctx), [ctx]);
      }
      function emptyDraft() { return { enabled: false, text: '', format: 'manual', fileName: '' }; }
      function toDraft(config) { return { enabled: config.enabled, text: config.text, format: config.format, fileName: config.fileName }; }
      function sameDraft(a, b) { return a.enabled === b.enabled && a.text === b.text && a.format === b.format && a.fileName === b.fileName; }
      function byteLength(text) { return new TextEncoder().encode(text).byteLength; }
      function validPrompt(config) {
        return config && Number.isSafeInteger(config.revision) && config.revision >= 0
          && typeof config.enabled === 'boolean' && typeof config.text === 'string'
          && ['manual', 'txt', 'md'].includes(config.format) && typeof config.fileName === 'string';
      }
      function validState(value) { return validPrompt(value?.config) && value.config.version === 1; }
      function validSnapshot(item) {
        return item && typeof item.id === 'string' && item.id.length > 0 && typeof item.name === 'string'
          && typeof item.enabled === 'boolean' && ['manual', 'txt', 'md'].includes(item.format)
          && typeof item.fileName === 'string' && Number.isSafeInteger(item.bytes) && item.bytes >= 0 && item.bytes <= MAX_BYTES
          && typeof item.createdAt === 'string' && Number.isFinite(Date.parse(item.createdAt));
      }
      function validResponse(method, value) {
        if (method === 'snapshots') return Array.isArray(value?.snapshots) && value.snapshots.every(validSnapshot)
          && Number.isSafeInteger(value.maxSnapshots) && value.maxSnapshots > 0 && value.snapshots.length <= value.maxSnapshots;
        if (method === 'snapshot') return validSnapshot(value?.snapshot) && Number.isSafeInteger(value.count) && value.count > 0;
        if (method === 'snapshot-read') return validSnapshot(value?.snapshot) && validPrompt(value?.config)
          && sameDraft(value.config, { ...value.snapshot, text: value.config.text }) && byteLength(value.config.text) === value.snapshot.bytes;
        return validState(value);
      }
      function isConflict(response) { return response.code === 'revision_conflict'; }
      function validSnapshotName(name) { return name.trim().length > 0 && name.trim().length <= 80 && !/[\u0000-\u001f\u007f]/.test(name); }
      async function api(method, body) {
        try {
          const response = await fetch(`prompt-manager/api/${method}`, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {})
          });
          let result;
          try { result = await response.json(); } catch { return { ok: false, code: 'invalid_response', status: response.status }; }
          if (!response.ok || !result || result.ok !== true) {
            return { ok: false, code: typeof result?.code === 'string' ? result.code : 'http', error: typeof result?.error === 'string' ? result.error : '', status: response.status };
          }
          if (!validResponse(method, result.value)) return { ok: false, code: 'invalid_response', status: response.status };
          return result;
        } catch { return { ok: false, code: 'network' }; }
      }
      function errorMessage(t, error) {
        if (!error) return '';
        if (error.key) return t(error.key);
        const response = error.response;
        if (isConflict(response)) return t('conflict');
        const message = response.code === 'invalid_response' ? t('invalidResponse')
          : response.code === 'network' ? t('networkFailed')
            : response.code === 'prompt_too_large' ? t('limit')
              : response.code === 'snapshot_limit' ? t('snapshotLimit')
                : response.code === 'invalid_snapshot_name' ? t('snapshotNameInvalid')
                  : response.code === 'snapshot_not_found' || response.code === 'invalid_snapshot_id' ? t('snapshotNotFound')
                    : t('requestFailed', { status: response.status });
        return t('details', { action: t(error.action), message });
      }
      function PromptPanel(props) {
        const ctx = props.__ctx;
        const t = useLocale(ctx);
        const [draft, setDraft] = React.useState(emptyDraft);
        const [savedConfig, setSavedConfig] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [saving, setSaving] = React.useState(false);
        const [importing, setImporting] = React.useState(false);
        const [error, setError] = React.useState(null);
        const [status, setStatus] = React.useState('');
        const [conflict, setConflict] = React.useState(false);
        const [snapshotName, setSnapshotName] = React.useState('');
        const [snapshotList, setSnapshotList] = React.useState(null);
        const [snapshotsLoading, setSnapshotsLoading] = React.useState(true);
        const [snapshotsError, setSnapshotsError] = React.useState(null);
        const [selectedSnapshotId, setSelectedSnapshotId] = React.useState('');
        const [preview, setPreview] = React.useState(null);
        const [previewLoading, setPreviewLoading] = React.useState(false);
        const [previewError, setPreviewError] = React.useState(null);
        const [previewReload, setPreviewReload] = React.useState(0);
        const [creatingSnapshot, setCreatingSnapshot] = React.useState(false);
        const [restoringSnapshot, setRestoringSnapshot] = React.useState(false);
        const id = React.useId();
        const fileInput = React.useRef(null);
        const request = React.useRef(0);
        const snapshotsRequest = React.useRef(0);
        const previewRequest = React.useRef(0);
        const busyRef = React.useRef(false);
        const savedRef = React.useRef(null);
        const dirty = savedConfig !== null && !sameDraft(draft, savedConfig);
        const bytes = React.useMemo(() => byteLength(draft.text), [draft.text]);
        const tooLarge = bytes > MAX_BYTES;
        const busy = loading || saving || importing || creatingSnapshot || restoringSnapshot;
        const snapshotsFull = snapshotList !== null && snapshotList.snapshots.length >= snapshotList.maxSnapshots;
        const selectedPreview = preview?.snapshot.id === selectedSnapshotId ? preview : null;
        const snapshotNameInvalid = snapshotName.length > 0 && !validSnapshotName(snapshotName);
        const snapshotDate = (value) => new Date(value).toLocaleString(ctx.locale.getSnapshot().active);

        const loadSnapshots = React.useCallback(async () => {
          const ticket = ++snapshotsRequest.current;
          setSnapshotsLoading(true); setSnapshotsError(null);
          try {
            const result = await api('snapshots');
            if (ticket !== snapshotsRequest.current) return;
            if (!result.ok) { setSnapshotsError({ action: 'snapshotsLoadFailed', response: result }); return; }
            setSnapshotList(result.value);
            setSelectedSnapshotId((current) => result.value.snapshots.some((item) => item.id === current) ? current : '');
          } finally { if (ticket === snapshotsRequest.current) setSnapshotsLoading(false); }
        }, []);
        React.useEffect(() => {
          void loadSnapshots();
          return () => { snapshotsRequest.current += 1; };
        }, [loadSnapshots]);
        React.useEffect(() => {
          const ticket = ++previewRequest.current;
          setPreview(null); setPreviewError(null); setPreviewLoading(Boolean(selectedSnapshotId));
          if (selectedSnapshotId) void (async () => {
            const result = await api('snapshot-read', { id: selectedSnapshotId });
            if (ticket !== previewRequest.current) return;
            setPreviewLoading(false);
            if (!result.ok) { setPreviewError({ action: 'snapshotPreviewFailed', response: result }); return; }
            if (result.value.snapshot.id !== selectedSnapshotId) { setPreviewError({ action: 'snapshotPreviewFailed', response: { code: 'invalid_response' } }); return; }
            setPreview(result.value);
          })();
          return () => { previewRequest.current += 1; };
        }, [selectedSnapshotId, previewReload]);

        const load = React.useCallback(async (isReload = false) => {
          if (busyRef.current) return;
          busyRef.current = true;
          const ticket = ++request.current;
          setLoading(true); setError(null); setStatus('');
          try {
            const result = await api('state');
            if (ticket !== request.current) return;
            if (!result.ok) { setError({ action: 'loadFailed', response: result }); return; }
            const config = result.value.config;
            savedRef.current = config;
            setSavedConfig(config); setDraft(toDraft(config)); setConflict(false);
            if (isReload) setStatus('reloaded');
          } finally {
            if (ticket === request.current) { busyRef.current = false; setLoading(false); }
          }
        }, []);
        React.useEffect(() => {
          void load();
          return () => { request.current += 1; busyRef.current = false; };
        }, [load]);
        const editDraft = (change) => {
          setDraft((current) => ({ ...current, ...change }));
          setStatus('');
          if (!conflict) setError(null);
        };
        const reload = () => {
          if (busyRef.current || (dirty && !window.confirm(t('reloadConfirm')))) return;
          void load(true);
        };
        const save = async () => {
          if (busyRef.current || !savedRef.current || conflict || tooLarge) return;
          const config = toDraft(draft);
          const revision = savedRef.current.revision;
          busyRef.current = true;
          const ticket = ++request.current;
          setSaving(true); setError(null); setStatus('');
          try {
            const result = await api('save', { config, revision });
            if (ticket !== request.current) return;
            if (!result.ok) {
              setError({ action: 'saveFailed', response: result });
              if (isConflict(result)) setConflict(true);
              return;
            }
            savedRef.current = result.value.config;
            setSavedConfig(result.value.config); setDraft(toDraft(result.value.config));
            setConflict(false); setStatus('saved');
          } finally {
            if (ticket === request.current) { busyRef.current = false; setSaving(false); }
          }
        };
        const createSnapshot = async () => {
          if (busyRef.current || !savedRef.current || conflict || !snapshotList || snapshotsFull) return;
          if (!validSnapshotName(snapshotName)) { setError({ key: 'snapshotNameInvalid' }); return; }
          const name = snapshotName.trim();
          const revision = savedRef.current.revision;
          busyRef.current = true;
          const ticket = ++request.current;
          setCreatingSnapshot(true); setError(null); setStatus('');
          try {
            // The Host snapshots persisted configuration; the unsaved draft never leaves this panel.
            const result = await api('snapshot', { name, revision });
            if (ticket !== request.current) return;
            if (!result.ok) {
              setError({ action: 'snapshotCreateFailed', response: result });
              if (isConflict(result)) setConflict(true);
              if (result.code === 'snapshot_limit') void loadSnapshots();
              return;
            }
            snapshotsRequest.current += 1;
            setSnapshotsLoading(false); setSnapshotsError(null);
            setSnapshotList((current) => ({ ...current, snapshots: [result.value.snapshot, ...current.snapshots.filter((item) => item.id !== result.value.snapshot.id)] }));
            setSelectedSnapshotId(result.value.snapshot.id); setSnapshotName(''); setStatus('snapshotCreated');
            void loadSnapshots();
          } finally {
            if (ticket === request.current) { busyRef.current = false; setCreatingSnapshot(false); }
          }
        };
        const restoreSnapshot = async () => {
          if (busyRef.current || !savedRef.current || conflict || !selectedPreview) return;
          const snapshot = selectedPreview.snapshot;
          if (!window.confirm(t(dirty ? 'snapshotRestoreDirtyConfirm' : 'snapshotRestoreConfirm', { name: snapshot.name }))) return;
          const revision = savedRef.current.revision;
          busyRef.current = true;
          const ticket = ++request.current;
          setRestoringSnapshot(true); setError(null); setStatus('');
          try {
            const result = await api('restore', { id: snapshot.id, revision });
            if (ticket !== request.current) return;
            if (!result.ok) {
              setError({ action: 'snapshotRestoreFailed', response: result });
              if (isConflict(result)) setConflict(true);
              return;
            }
            savedRef.current = result.value.config;
            setSavedConfig(result.value.config); setDraft(toDraft(result.value.config));
            setConflict(false); setStatus('snapshotRestored');
          } finally {
            if (ticket === request.current) { busyRef.current = false; setRestoringSnapshot(false); }
          }
        };
        const importFile = async (event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file || busyRef.current || !savedRef.current) return;
          const extension = file.name.match(/\.(txt|md)$/i)?.[1].toLowerCase();
          if (!extension) { setError({ key: 'invalidType' }); return; }
          if (!file.name || /[\\/\x00-\x1f\x7f]/.test(file.name)) { setError({ key: 'invalidName' }); return; }
          if (file.size > MAX_BYTES) { setError({ key: 'fileTooLarge' }); return; }
          if (dirty && !window.confirm(t('importConfirm'))) return;
          busyRef.current = true;
          const ticket = ++request.current;
          setImporting(true); setError(null); setStatus('');
          try {
            const buffer = await file.arrayBuffer();
            if (ticket !== request.current) return;
            if (buffer.byteLength > MAX_BYTES) { setError({ key: 'fileTooLarge' }); return; }
            let text;
            try { text = new TextDecoder('utf-8', { fatal: true }).decode(buffer); }
            catch { setError({ key: 'invalidUtf8' }); return; }
            if (byteLength(text) > MAX_BYTES) { setError({ key: 'fileTooLarge' }); return; }
            setDraft((current) => ({ ...current, text, format: extension, fileName: file.name }));
            setStatus('imported');
          } catch { if (ticket === request.current) setError({ key: 'importFailed' }); }
          finally { if (ticket === request.current) { busyRef.current = false; setImporting(false); } }
        };
        const message = errorMessage(t, error) || (conflict ? t('conflict') : '');
        return h('div', { 'data-prompt-manager': true },
          h('header', { className: 'pm-header' }, h('h1', null, t('title'))),
          h('div', { className: 'pm-body' }, h('div', { className: 'pm-content' },
            h('p', { className: 'pm-muted' }, t('description')),
            message && h('div', { className: 'pm-alert', role: 'alert' }, message),
            status && h('div', { className: 'pm-status', role: 'status' }, t(status)),
            !savedConfig ? loading ? h('p', { role: 'status' }, t('loading')) : h('button', { type: 'button', onClick: () => load() }, t('retry'))
              : h(React.Fragment, null,
                h('fieldset', { disabled: busy },
                  h('div', { className: 'pm-setting' },
                    h('label', { className: 'pm-switch' }, h('input', { type: 'checkbox', role: 'switch', checked: draft.enabled, 'aria-checked': draft.enabled, onChange: (event) => editDraft({ enabled: event.target.checked }) }), t('enabled')),
                    h('p', { className: 'pm-muted' }, t('enableHelp'))),
                  h('div', { className: 'pm-toolbar' },
                    h('button', { type: 'button', onClick: () => fileInput.current?.click() }, t(importing ? 'importing' : 'import')),
                    h('span', { className: 'pm-muted' }, t('source', { name: draft.format === 'manual' ? t('manual') : draft.fileName }))),
                  h('input', { ref: fileInput, type: 'file', accept: '.txt,.md', hidden: true, onChange: importFile }),
                  h('p', { className: 'pm-muted', id: `${id}-import-help` }, t('importHelp')),
                  h('label', { className: 'pm-editor-label', htmlFor: `${id}-editor` }, t('editor')),
                  h('textarea', { id: `${id}-editor`, value: draft.text, placeholder: t('placeholder'), spellCheck: false, 'aria-describedby': `${id}-byte-count ${id}-import-help`, 'aria-invalid': tooLarge, onChange: (event) => editDraft({ text: event.target.value, format: 'manual', fileName: '' }) }),
                  h('div', { className: 'pm-count pm-muted' }, h('span', { id: `${id}-byte-count`, className: tooLarge ? 'pm-over' : undefined }, t('bytes', { bytes, limit: MAX_BYTES })), h('span', null, t(dirty ? 'unsaved' : 'unchanged'))),
                  tooLarge && h('p', { className: 'pm-over', role: 'alert' }, t('limit')),
                  draft.text.length === 0 && h('p', { className: 'pm-muted' }, t('empty'))),
                h('div', { className: 'pm-actions' },
                  h('button', { type: 'button', className: 'pm-primary', onClick: save, disabled: busy || !dirty || tooLarge || conflict }, t(saving ? 'saving' : 'save')),
                  h('button', { type: 'button', onClick: reload, disabled: busy }, t(loading ? 'reloading' : 'reload'))),
                h('section', { className: 'pm-snapshots', 'aria-labelledby': `${id}-snapshots-title` },
                  h('h2', { id: `${id}-snapshots-title` }, t('snapshotsTitle')),
                  h('p', { className: 'pm-muted', id: `${id}-snapshot-help` }, t('snapshotHelp')),
                  dirty && h('p', { className: 'pm-muted' }, t('snapshotDraftHelp')),
                  h('fieldset', { disabled: busy },
                    h('form', { onSubmit: (event) => { event.preventDefault(); void createSnapshot(); } },
                      h('div', { className: 'pm-snapshot-row' },
                        h('label', { className: 'pm-snapshot-field', htmlFor: `${id}-snapshot-name` }, t('snapshotName'),
                          h('input', { id: `${id}-snapshot-name`, type: 'text', value: snapshotName, maxLength: 80, placeholder: t('snapshotNamePlaceholder'), 'aria-describedby': `${id}-snapshot-help ${id}-snapshot-name-help`, 'aria-invalid': snapshotNameInvalid, onChange: (event) => setSnapshotName(event.target.value) })),
                        h('button', { type: 'submit', disabled: !snapshotList || snapshotsFull || conflict || !validSnapshotName(snapshotName) }, t(creatingSnapshot ? 'snapshotCreating' : 'snapshotCreate'))),
                      h('p', { id: `${id}-snapshot-name-help`, className: snapshotNameInvalid ? 'pm-over' : 'pm-muted' }, t(snapshotNameInvalid ? 'snapshotNameInvalid' : 'snapshotNameHelp'))),
                    h('div', { className: 'pm-actions' },
                      snapshotList && h('span', { className: 'pm-muted' }, t('snapshotCount', { count: snapshotList.snapshots.length, max: snapshotList.maxSnapshots })),
                      h('button', { type: 'button', disabled: snapshotsLoading, onClick: () => { void loadSnapshots(); } }, t(snapshotsLoading ? 'snapshotsLoading' : 'snapshotsRefresh'))),
                    snapshotsFull && h('p', { className: 'pm-muted' }, t('snapshotLimit')),
                    snapshotsError && h('div', { className: 'pm-alert', role: 'alert' }, errorMessage(t, snapshotsError)),
                    snapshotList?.snapshots.length === 0 && h('p', { className: 'pm-muted' }, t('snapshotsEmpty')),
                    snapshotList && snapshotList.snapshots.length > 0 && h('label', { className: 'pm-snapshot-field', htmlFor: `${id}-snapshot-select` }, t('snapshotSelect'),
                      h('select', { id: `${id}-snapshot-select`, value: selectedSnapshotId, onChange: (event) => setSelectedSnapshotId(event.target.value) },
                        h('option', { value: '' }, t('snapshotSelectPlaceholder')),
                        snapshotList.snapshots.map((item) => h('option', { key: item.id, value: item.id }, t('snapshotOption', { name: item.name, date: snapshotDate(item.createdAt) }))))),
                    selectedSnapshotId && h('div', { 'aria-busy': previewLoading },
                      h('p', { className: 'pm-editor-label' }, t('snapshotPreview')),
                      previewLoading && h('p', { className: 'pm-muted', role: 'status' }, t('snapshotPreviewLoading')),
                      previewError && h('div', null,
                        h('div', { className: 'pm-alert', role: 'alert' }, errorMessage(t, previewError)),
                        h('button', { type: 'button', onClick: () => setPreviewReload((value) => value + 1) }, t('retry'))),
                      selectedPreview && h(React.Fragment, null,
                        h('p', { className: 'pm-muted' }, t('snapshotSummary', { state: t(selectedPreview.config.enabled ? 'snapshotEnabled' : 'snapshotDisabled'), bytes: selectedPreview.snapshot.bytes }), ' · ', t('source', { name: selectedPreview.config.format === 'manual' ? t('manual') : selectedPreview.config.fileName })),
                        h('pre', { className: 'pm-snapshot-preview', tabIndex: 0, 'aria-label': t('snapshotPreview') }, selectedPreview.config.text || t('snapshotEmptyText'))),
                      h('div', { className: 'pm-actions' }, h('button', { type: 'button', className: 'pm-primary', disabled: !selectedPreview || conflict || previewLoading, onClick: restoreSnapshot }, t(restoringSnapshot ? 'snapshotRestoring' : 'snapshotRestore'))),
                      h('p', { className: 'pm-muted' }, t('snapshotRestoreHelp')))))))));

      }
      return { PanelPage: PromptPanel, installStyles };
    })();

    const HUB_CSS = `
[data-context-hub] { display:flex; flex-direction:column; height:100%; min-height:0; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); font:14px/1.5 system-ui,-apple-system,sans-serif; }
[data-context-hub] * { box-sizing:border-box; }
[data-context-hub] .hub-tabs { display:flex; align-items:center; gap:8px; flex:none; padding:10px 16px; border-bottom:1px solid var(--dsw-alias-border-l1); background:var(--dsw-alias-bg-layer-1); }
[data-context-hub] .hub-tab { cursor:pointer; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); border:1px solid var(--dsw-alias-border-l1); border-radius:6px; padding:6px 12px; font:inherit; }
[data-context-hub] .hub-tab:hover:not(:disabled) { background:var(--dsw-alias-bg-layer-2); }
[data-context-hub] .hub-tab:focus-visible { outline:2px solid var(--dsw-alias-brand-primary); outline-offset:2px; }
[data-context-hub] .hub-tab.active { border-color:var(--dsw-alias-brand-primary); }
[data-context-hub] .hub-pane { flex:1; min-height:0; height:100%; }
[data-context-hub-menu] { display:flex; align-items:center; gap:10px; width:100%; border:0; border-radius:6px; padding:8px 12px; color:var(--dsw-alias-label-primary); background:transparent; font:14px/20px system-ui,-apple-system,sans-serif; text-align:left; cursor:pointer; }
[data-context-hub-menu]:hover { background:var(--dsw-alias-bg-layer-2); }
[data-context-hub-menu]:focus-visible { outline:2px solid var(--dsw-alias-brand-primary); outline-offset:2px; }
[data-context-hub-menu] svg { flex:none; }
`;

    function installHubStyles() {
      if (typeof document === 'undefined' || !document.head) return;
      const style = document.createElement('style');
      style.setAttribute('data-plugin-css', PACKAGE_ID);
      style.textContent = HUB_CSS;
      document.head.appendChild(style);
      return () => style.remove();
    }

    function hubTranslator(ctx) {
      const bound = ctx.locale.bind(PACKAGE_ID);
      return (key) => bound(`context-hub.${key}`);
    }

    function useHubLocale(ctx) {
      const subscribe = React.useCallback((listener) => ctx.locale.subscribe(listener), [ctx]);
      const snapshot = React.useCallback(() => {
        const current = ctx.locale.getSnapshot();
        return `${current.active}:${current.revision}`;
      }, [ctx]);
      React.useSyncExternalStore(subscribe, snapshot, snapshot);
      return React.useMemo(() => hubTranslator(ctx), [ctx]);
    }

    function HubIcon() {
      return h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, 'aria-hidden': true },
        h('rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }),
        h('path', { d: 'M7 8h10M7 12h10M7 16h6' }));
    }

    function HubMenu(props) {
      const ctx = props.__ctx;
      const t = useHubLocale(ctx);
      const open = () => { ctx.layout.selectPanel('context-hub'); props.onDismiss?.(); };
      return h('button', { type: 'button', role: 'menuitem', 'data-context-hub-menu': true, onClick: open }, h(HubIcon), h('span', null, t('title')));
    }

    function ContextHubPanel(props) {
      const ctx = props.__ctx;
      const t = useHubLocale(ctx);
      const [tab, setTab] = React.useState('resources');
      const id = React.useId();
      const resourcesButton = React.useRef(null);
      const promptsButton = React.useRef(null);
      const resourcesActive = tab === 'resources';
      const onTabKeyDown = (event) => {
        let next;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = resourcesActive ? 'prompts' : 'resources';
        else if (event.key === 'Home') next = 'resources';
        else if (event.key === 'End') next = 'prompts';
        else return;
        event.preventDefault();
        setTab(next);
        (next === 'resources' ? resourcesButton : promptsButton).current?.focus();
      };
      return h('div', { 'data-context-hub': true },
        h('div', { className: 'hub-tabs', role: 'tablist', 'aria-label': t('title'), onKeyDown: onTabKeyDown },
          h('button', { ref: resourcesButton, id: `${id}-resources-tab`, type: 'button', role: 'tab', className: `hub-tab${resourcesActive ? ' active' : ''}`, 'aria-selected': resourcesActive, 'aria-controls': `${id}-resources-panel`, tabIndex: resourcesActive ? 0 : -1, onClick: () => setTab('resources') }, t('resources')),
          h('button', { ref: promptsButton, id: `${id}-prompts-tab`, type: 'button', role: 'tab', className: `hub-tab${resourcesActive ? '' : ' active'}`, 'aria-selected': !resourcesActive, 'aria-controls': `${id}-prompts-panel`, tabIndex: resourcesActive ? -1 : 0, onClick: () => setTab('prompts') }, t('prompts'))),
        // Both children stay mounted: tab switches must preserve drafts and requests.
        h('div', { id: `${id}-resources-panel`, className: 'hub-pane', role: 'tabpanel', 'aria-labelledby': `${id}-resources-tab`, hidden: !resourcesActive, style: { display: resourcesActive ? 'block' : 'none' } },
          h(resourceFeature.PanelPage, { ...props, __ctx: ctx })),
        h('div', { id: `${id}-prompts-panel`, className: 'hub-pane', role: 'tabpanel', 'aria-labelledby': `${id}-prompts-tab`, hidden: resourcesActive, style: { display: resourcesActive ? 'none' : 'block' } },
          h(promptFeature.PanelPage, { ...props, __ctx: ctx })));
    }

    return {
      inject: ['slots', 'layout', 'locale'],
      apply(ctx) {
        for (const [locale, dictionary] of Object.entries(LOCALES)) {
          const entries = Object.fromEntries(Object.entries(dictionary).flatMap(([section, values]) =>
            Object.entries(values).map(([key, value]) => [`${section}.${key}`, value])));
          ctx.effect(() => ctx.locale.register(PACKAGE_ID, locale, entries), `${PACKAGE_ID}: locale ${locale}`);
        }
        ctx.effect(installHubStyles, `${PACKAGE_ID}: hub styles`);
        ctx.effect(() => resourceFeature.installStyles(), `${PACKAGE_ID}: resource styles`);
        ctx.effect(() => promptFeature.installStyles(), `${PACKAGE_ID}: prompt styles`);
        ctx.slots.inject('main', () => ctx.slots.register(
          { name: 'main', key: 'context-hub', locale: PACKAGE_ID },
          function ContextHubMainSlot(props) { return h(ContextHubPanel, { ...props, __ctx: ctx }); }
        ));
        const t = hubTranslator(ctx);
        ctx.slots.inject('sidebar.panellist.actions', () => ctx.slots.register(
          { name: 'sidebar.panellist.actions', id: 'context-hub', order: 45, label: () => t('title'), locale: PACKAGE_ID },
          function ContextHubMenuSlot(props) { return h(HubMenu, { ...props, __ctx: ctx }); }
        ));
      }
    };
  }
});
