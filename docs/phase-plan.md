# 全栈 AI 项目快速启动模板 — 分阶段执行计划

> **目标**：构建一个可运行的全栈应用基础模板，包含 Monorepo 骨架、服务端 API、Web 前端三大部分。 **执行规则**：Phase 1→2→3 按顺序执行，每个阶段完成后运行 `pnpm build && pnpm test && pnpm lint` 全量验证。
>
> **范围说明**：本计划聚焦"通用全栈底座"——Phase 1/2/3 完成后即可作为任意全栈应用的起点。AI 相关能力（Provider/Model 管理、MCP Server、Skill、AI Chat、Electron 桌面端等）作为**后续增量阶段**补充，不阻塞当前 v1 验收。

---

## 全局技术栈

| 类别 | 技术 |
| --- | --- |
| 包管理 | pnpm (&gt;= 10) + workspaces + catalogs |
| 任务运行器 | turborepo |
| 构建工具 | 库类包：tsup；前端应用：Vite |
| 语言 | TypeScript (strict mode, 最新版) |
| 测试 | vitest + @testing-library（仅用于核心逻辑单测，UI 组件以 MCP 抽查为主） |
| Lint | eslint (flat config) + prettier |
| 提交规范 | husky + lint-staged + @commitlint/cli + config-conventional |
| 依赖版本 | pnpm catalogs 统一管理：axios, zod, date-fns（各包按需声明，根目录不安装业务依赖） |

---

## 阶段索引

| 阶段 | 文档 | 内容 | 依赖 |
| --- | --- | --- | --- |
| 1 | [phase-01-monorepo.md](phase-01-monorepo.md) | Monorepo 骨架 + 最小契约 | 无 |
| 2 | [phase-02-server.md](phase-02-server.md) | 服务端基础（Hono + DB + 单表 CRUD） | Phase 1 |
| 3a | [phase-03-web.md](phase-03-web.md) | Web 前端基础架构 + 首页 | Phase 1, 2 |
| 3b | [phase-03-web.md](phase-03-web.md) | Web 设置页 + 响应式 + 表单 | Phase 1, 2, 3a |

---

## 各阶段详细范围

详细实现要求、执行提示词与验收清单参见各阶段独立文档。

| 阶段 | 核心交付物 |
| --- | --- |
| [Phase 1](phase-01-monorepo.md) | 可安装、构建、测试的 monorepo 骨架；`@repo/config` 沉淀前后端共享契约（API 包络、错误码、tasks schema、端口常量等） |
| [Phase 2](phase-02-server.md) | Hono 服务 + CORS / 错误处理 / pino 日志 / 优雅关闭；Drizzle + SQLite tasks CRUD（Repository 模式）；环境变量 zod 校验；API Key 与 Rate Limit 安全扩展点 |
| [Phase 3a](phase-03-web.md) | Vite + React 19 + React Router v7 基础架构；shadcn/ui Zinc 主题；首页健康状态面板；TanStack Query + Zustand 初始化 |
| [Phase 3b](phase-03-web.md) | 设置页表单（URL 校验 + 测试连接）；移动端抽屉导航；响应式布局 |

---

## 全局开发约定

### 技术版本

- 所有依赖使用最新稳定版
- Node.js &gt;= 20（LTS）
- TypeScript 在 `pnpm-workspace.yaml` catalogs 中锁定具体版本（如 `typescript: "^5.9.0"`），避免子包 TS 版本不一致导致 d.ts 不兼容
- 根 `package.json` 声明 `"engines.node": ">=20"` 和 `"packageManager": "pnpm@&lt;具体版本&gt;"`

### 开发流程

1. **TDD 策略**：核心逻辑（工具函数、API handler、store）先写测试再实现；UI 组件后置，以 chrome-devtools MCP 抽查关键路径为主
2. **提交规范**：使用 conventional commits，husky + lint-staged + commitlint 在提交时自动校验
3. **每个阶段完成后**：运行 `pnpm build && pnpm test && pnpm lint` 全量验证
4. **目录约定**：应用放 `apps/`，库放 `packages/`

### 前端测试

- 核心逻辑（API Client、Store、表单校验）用 vitest 单测
- UI 交互用 chrome-devtools MCP 抽查关键路径
- 不追求组件级全覆盖

### 非范围（明确不在 v1 内）

以下事项当前不在 Phase 1–3 范围内，将作为后续阶段或 backlog 处理：

- 部署与 CI/CD（Docker、Vercel、GitHub Actions 等）
- Electron 桌面端
- AI 能力（Provider/Model 管理、MCP Server、Skill、AI Chat、流式响应等）
- 国际化（i18n）
- 错误监控（Sentry 等）

---

## 端到端联调验收（贯穿阶段）

骨架的终极目标是"前后端联调一次通过"。以下验收项不归属某个单一阶段，而是在全部阶段完成后一次性验证：

- [ ] `pnpm --filter @repo/server dev` 启动服务端，`pnpm --filter @repo/web dev` 启动前端，两者同时运行无端口冲突
- [ ] 前端首页（`http://localhost:13002`）成功调用 `GET /api/health`，状态圆点显示"已连接"，版本号与 `@repo/config` 的 `APP_VERSION` 一致
- [ ] 前端设置页输入任意服务端地址后"测试连接"成功/失败状态正确切换
- [ ] 前后端版本号一致（均来自 `@repo/config` 的 `APP_VERSION`）
- [ ] 移动端视口（≤768px）下，抽屉导航正常展开/收起
- [ ] 切换明暗主题后刷新页面，主题选择保持
- [ ] `API_KEY=xxx` 设置后，前端请求自动附加 `x-api-key` header，服务端正确校验
- [ ] `RATE_LIMIT_ENABLED=true` 后高频请求触发 429，前端拦截器正确处理并展示提示
- [ ] 运行 `pnpm build && pnpm test && pnpm lint`（根目录）零报错