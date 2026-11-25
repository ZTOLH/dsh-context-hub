# Changelog

## 1.2.0

- 优化新手引导：资料库和提示词页提供清晰的起步步骤与默认建议，并说明提示词需保存后才应用。
- 将筛选、字数预算、测试问题和快照历史放入可展开的高级/历史区域，保留全部原有功能。
- 明确资料库暂停状态、提示词保存/启用状态及快照恢复会替换当前提示词。

## 1.1.0

- 新增提示词快照：可为已保存提示词创建命名快照、预览历史内容，并按当前 revision 校验后恢复。
- 快照与活动提示词配置分开保存在 `${DSH_HOME||~/.dsh}/prompt-manager/snapshots.json`，最多 100 个；创建快照不修改活动提示词。

## 1.0.0

- 首个版本：合并 `dsh-resource-library` 与 `dsh-prompt-manager` 为单一插件 `dsh-context-hub`。
- 侧边栏「更多」新增统一入口「资料与提示词」，主面板提供「资料库」「提示词」两个标签页（同时挂载、切换保留草稿）。
- 资料库：指定文件/文件夹在每次 AI 调用前注入（always），或按关键词触发（trigger）；保留原数据文件 `${DSH_HOME||~/.dsh}/resource-library/config.json` 与 API `/resource-library/api/*`。
- 提示词：手动输入或导入 TXT/Markdown（UTF-8，上限 1 MiB = 1,048,576 字节），启用后作为 system prompt section 注入；保留原数据文件 `${DSH_HOME||~/.dsh}/prompt-manager/config.json` 与 API `/prompt-manager/api/*`。
- 安全：请求体统一先缓冲再按 UTF-8 严格解码（修复跨分块多字节字符损坏）；Origin 校验对齐为协议+主机双重比较。
