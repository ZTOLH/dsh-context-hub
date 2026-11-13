# Changelog

## 1.0.0

- 首个版本：合并 `dsh-resource-library` 与 `dsh-prompt-manager` 为单一插件 `dsh-context-hub`。
- 侧边栏「更多」新增统一入口「资料与提示词」，主面板提供「资料库」「提示词」两个标签页（同时挂载、切换保留草稿）。
- 资料库：指定文件/文件夹在每次 AI 调用前注入（always），或按关键词触发（trigger）；保留原数据文件 `${DSH_HOME||~/.dsh}/resource-library/config.json` 与 API `/resource-library/api/*`。
- 提示词：手动输入或导入 TXT/Markdown（UTF-8，上限 1 MiB = 1,048,576 字节），启用后作为 system prompt section 注入；保留原数据文件 `${DSH_HOME||~/.dsh}/prompt-manager/config.json` 与 API `/prompt-manager/api/*`。
- 安全：请求体统一先缓冲再按 UTF-8 严格解码（修复跨分块多字节字符损坏）；Origin 校验对齐为协议+主机双重比较。
