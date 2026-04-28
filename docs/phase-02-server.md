# Phase 2：服务端开发

> **前置条件**：Phase 1（Monorepo 骨架）已完成。 **输出**：可独立启动的 Hono 服务。

---

## 执行提示词

```
在当前 monorepo 的 @repo/server 包中开发服务端，前置条件：Phase 1 已完成。

## 技术栈
- Node.js >= 20
- Hono（最新版）作为 HTTP 框架
- Drizzle ORM + better-sqlite3 作为数据库层
- Pino 作为日志库
- dotenv（环境变量管理）
- @hono/zod-validator 做请求校验，schema 来自 `@repo/config`
- tsup 作为库构建工具（输出 ESM + d.ts），dev 用 tsx watch

## 功能要求

### 1. 基础服务
- Hono 应用启动，端口读取自环境变量 `PORT`，默认值引用 `@repo/config` 中的 `DEFAULT_SERVER_PORT`
- 健康检查接口 `GET /api/health`，返回 `@repo/config` 的 `ApiResponse<HealthStatus>` 包络：
  { "ok": true, "data": { "status": "ok", "timestamp": "...", "version": APP_VERSION } }

- **CORS 中间件**：允许 Web 前端跨域访问
  - 开发模式（`NODE_ENV !== 'production'`）：允许 `http://localhost:*`
  - 生产模式：通过环境变量 `CORS_ORIGINS` 配置允许的 origin（逗号分隔）；**未设置时默认空数组（拒绝所有跨域请求）**
- 全局错误处理中间件：捕获异常 → 构造 `@repo/config` 的 `ApiResponse` 失败包络
- 全局请求日志中间件（pino，包含 method/path/duration/status）；开发环境使用 `pino-pretty` 格式化输出，生产环境输出结构化 JSON；日志级别通过 `LOG_LEVEL` 环境变量配置（默认 `info`）
- **优雅关闭**：监听 `SIGINT`/`SIGTERM`，完成当前请求后再退出进程，防止热更新或容器停止时丢请求

### 2. 环境变量管理

- 使用 dotenv 加载 .env 文件
- **使用 zod 定义环境变量 schema**（`PORT`, `NODE_ENV`, `DATABASE_URL`, `API_KEY`, `CORS_ORIGINS`, `RATE_LIMIT_ENABLED`, `LOG_LEVEL` 等），应用启动时校验，缺失或非法时立即报错退出
  - `DATABASE_URL`：SQLite 数据库文件路径，**默认基于 `APP_NAME` 动态生成**（`file:~/.${APP_NAME}/data/app.db`，与启动目录无关）
- 提供 `.env.example` 模板，列出所有可配置的环境变量：

  | 变量名 | 必填 | 默认值 | 用途 |
  | --- | --- | --- | --- |
  | `PORT` | 否 | `13001` | 服务端监听端口 |
  | `NODE_ENV` | 否 | `development` | 运行模式（`development` / `production`） |
  | `DATABASE_URL` | 否 | `file:~/.ai-app-starter/data/app.db` | SQLite 文件路径 |
  | `API_KEY` | 否 | — | 开启 API Key 认证；不设置则关闭 |
  | `CORS_ORIGINS` | 否 | — | 生产模式允许的 origin（逗号分隔）；未设置时默认空数组 |
  | `RATE_LIMIT_ENABLED` | 否 | `false` | 设为 `true` 开启内存限流 |
  | `LOG_LEVEL` | 否 | `info` | pino 日志级别 |

- 区分 `.env.development` 和 `.env.production`（可选）

### 3. 数据库

- 使用 Drizzle ORM + better-sqlite3
- 数据库路径由 `DATABASE_URL` 环境变量控制（zod 校验），**默认基于 `@repo/config` 的 `APP_NAME` 动态生成**（`file:~/.${APP_NAME}/data/app.db`，位于用户家目录下，与启动目录无关。用户修改 `APP_NAME` 即可自动更新所有路径）
- 提供 `drizzle.config.ts`，数据库连接读取 `process.env.DATABASE_URL`
- 开发阶段使用 `drizzle-kit push` 手动同步 schema（**不**在应用启动时自动同步，避免意外变更生产数据库）
  - **生产部署建议**：开发完成后转为 `drizzle-kit generate` + `drizzle-kit migrate` 流程，生成 migration 文件并纳入版本控制，部署时自动 apply
- **tasks 表**：数据库层使用 Drizzle ORM 的 `sqliteTable()` 定义 schema，字段与 `@repo/config` 的 `TaskSchema` 保持一一对应；请求校验从 `@repo/config` import zod schema，通过 `@hono/zod-validator` 使用

**tasks 表字段**（与 `@repo/config` 共享）：

- id: string (primary key，使用 cuid 或 nanoid)
- title: string (任务标题，非空)
- description: string | null (任务描述)
- status: "todo" | "in_progress" | "done" (任务状态，默认 "todo")
- priority: "low" | "medium" | "high" (优先级，默认 "medium")
- tags: JSON | null (标签数组，如 \["frontend", "bug"\])
- dueDate: Date | null (截止日期)
- createdAt: Date (创建时间)
- updatedAt: Date (更新时间)

> **zod ↔ Drizzle 同步机制**：Drizzle 表字段必须与 `@repo/config` 的 `TaskSchema` 一一对应。推荐方式二选一：
> 1. 在 `@repo/server` 加"字段对照"单测——遍历 `TaskSchema.shape` 的 keys，断言 Drizzle `sqliteTable` 的 columns 包含同名同类型字段；
> 2. 使用 `drizzle-zod` 从 Drizzle schema 自动生成 zod schema，再 re-export 到 `@repo/config`（减少手工维护，但需额外依赖）。

**数据库操作使用 Repository 模式封装**，每个表对应一个 repository 类，包含 CRUD 方法。

- 提供 CRUD 示例 API：GET/POST/PUT/DELETE /api/tasks
- 查询列表支持可选过滤：`?status=todo`
- 所有请求参数校验（body 与 query）必须使用 `@hono/zod-validator`，schema 从 `@repo/config` import

### 4. 安全扩展点

两个扩展点均为**最小可用版（内存实现，默认关闭，环境变量开关）**，目标是"骨架自带能力，无需从零造轮子"。

- **API Key 认证中间件**：

  - 若环境变量 `API_KEY` 已设置 → 启用，校验请求头 `x-api-key`
  - 若未设置 → 完全跳过，零开销
  - `/api/health` 及其子路径豁免认证（路径前缀匹配，如 `/api/health`、`/api/health/detailed` 均豁免）
  - 校验失败返回 `ApiResponse` 失败包络：`{ ok: false, error: { code: 'UNAUTHORIZED', message: '...' } }`

  > **安全说明**：此 API Key 设计仅适用于开发、单机或受信网络环境。前端 `localStorage` 存储 key 并在请求头中透传，对公网部署存在 XSS 窃取风险；正式公网部署应替换为 OAuth / Cookie+Session / JWT 方案。

- **Rate Limiting**：

  - 若环境变量 `RATE_LIMIT_ENABLED=true` → 启用基于内存的滑动窗口限流
  - 若未设置或 `false` → 完全跳过
  - 每个 IP 默认窗口 1 分钟 / 最大 100 次请求，超出返回 HTTP 429 + `ApiResponse` 失败包络（`code: 'RATE_LIMITED'`）
  - **内存清理机制**：每 5 分钟定时清除过期的窗口记录，防止内存无限增长。定时器使用 `.unref()` 避免阻止进程退出，或在 `SIGINT`/`SIGTERM` 处理器中 `clearInterval`

  > 注：内存实现适用于单实例/开发阶段。高并发多节点场景需换为 Redis 方案，但接口保持不变。

## 开发规则

- TDD 开发：先写路由测试，再实现逻辑
- 使用 zod 校验所有请求参数和响应
- 数据库操作使用 repository 模式封装
- 构建脚本：`build` 用 tsup 输出 ESM + d.ts；`dev` 用 tsx watch（或 tsup --watch）
- 所有响应必须走 `@repo/config` 的 `ApiResponse` 包络，禁止使用裸 JSON 格式

## 扩展指南：如何替换 tasks 为业务实体

模板以 `tasks` 作为示例实体。fork 后添加新业务实体的标准流程：

1. **Schema**：在 `@repo/config` 中定义 zod schema + TypeScript 类型 + 衍生类型（如 `CreateXxxInput` / `UpdateXxxInput`）
2. **数据库**：在 `@repo/server` 的 Drizzle schema 中用 `sqliteTable()` 定义对应表，字段与 zod schema 一一对应
3. **验证**：新增或更新"字段对照"单测，确保 zod shape keys 与 Drizzle columns 一致
4. **Repository**：新建 `xxx.repository.ts`，继承或参照已有的 repository 模式，实现 CRUD
5. **路由**：新建 `xxx.routes.ts`，注册到 Hono app 上，所有请求/响应通过 `@hono/zod-validator` 校验
6. **测试**：新增路由集成测试（成功 + 校验失败 + 404 用例）
7. **前端**：在 `@repo/web` 中新增 API 函数 → TanStack Query hook → 页面/组件

## 验收要求

- 独立启动后可访问 `/api/health`（含 envelope）
- CRUD API 通过 curl 测试（包含 CORS header）
- `pnpm --filter @repo/server test` 全部通过
- `.env.example` 模板完整列出所有环境变量
- 优雅关闭测试：发送 `SIGINT` 后，未完成请求继续执行、进程正确退出
- 安全扩展点验证：`API_KEY=xxx` 时未带 key 请求被 401；不设置时请求正常放行
- 限流验证：`RATE_LIMIT_ENABLED=true` 时高频请求触发 429；默认不启用时无限制

```

---

## 验收标准

- [ ] 独立启动服务正常

- [ ] 健康检查接口返回 `ApiResponse` 包络

- [ ] 示例表（tasks）CRUD 接口正常工作（创建→查询→更新→删除），请求体校验用 `@repo/config` schema

- [ ] 列表查询支持按 status 过滤

- [ ] pino 日志输出格式正确

- [ ] Repository 模式封装数据库操作

- [ ] CORS 中间件允许 Web 前端跨域请求（开发+生产模式）

- [ ] `.env.example` 模板完整列出所有环境变量

- [ ] API Key 认证中间件：设置 `API_KEY` 后启用并正确拒绝非法请求；不设置时不影响任何请求

- [ ] Rate Limiting：设置 `RATE_LIMIT_ENABLED=true` 后触发限流，默认不启用，限流返回 `RATE_LIMITED` 错误码

- [ ] 优雅关闭：`SIGINT` 后进程正常退出，不丢请求

- [ ] 所有响应通过 `@repo/config` 的 `ApiResponse` 包络（成功用 `ok(data)`，失败用 `fail(code, message)`）

### 最小测试用例集

以下用例必须在 Phase 2 至少覆盖：

- **路由集成测试**：`POST /api/tasks` 创建成功与失败（校验错误时返回 `VALIDATION_FAILED`）、`GET /api/tasks` 列表含过滤、单条 `GET / PUT / DELETE` 含 404
- **Repository 单测**：CRUD 各一条基础路径 + 边界（空 title 校验、不存在的 id 查询返回 null）
- **字段对照单测**：遍历 `TaskSchema.shape` keys，断言 Drizzle 表 columns 包含所有字段
- **API Key 中间件单测**：设置 `API_KEY` 后非法请求 401；不设置时任何请求均放行；`/api/health` 始终豁免
- **Rate Limit 中间件单测**：`RATE_LIMIT_ENABLED=true` 时高频请求触发 429（返回 `RATE_LIMITED`）；未设置时正常通过
- **优雅关闭单测**：模拟 SIGINT 时，进行中请求继续完成，进程随后退出
- **环境变量校验单测**：缺失必填项时应用启动失败并输出明确错误