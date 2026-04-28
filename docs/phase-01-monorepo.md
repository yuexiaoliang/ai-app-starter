# Phase 1：Monorepo 骨架搭建

> **前置条件**：无，此为第一阶段。 **输出**：可正常安装、构建、测试的 monorepo 项目骨架。

---

## 执行提示词

```
我要搭建一个 monorepo 项目骨架，请使用以下技术栈：

## 技术栈

- pnpm (&gt;= 10) + workspaces + catalogs
- turborepo 作为任务运行器
- TypeScript strict mode（最新版）
- vitest（单测）+ eslint flat config + prettier
- 通用依赖（通过 pnpm-workspace.yaml catalogs 统一版本，各包按需声明）：axios, zod, date-fns

## Workspace 结构

目录组织：

- `apps/`：可独立运行的应用（部署目标）
- `packages/`：可被其他包引用的库（工具、配置、共享代码）

创建以下 4 个包：

| 包名 | 目录 | 说明 |
| --- | --- | --- |
| @repo/web | apps/web | Web 前端应用（React 19） |
| @repo/server | packages/server | 服务端应用（Hono + DB）。Phase 1 起作为独立应用存在；仅导出 schema/类型/工具，不导出已实例化的服务 |
| @repo/config | packages/config | 全端共享配置（zod schema + TypeScript 类型 + 常量） |
| @repo/eslint-config | packages/eslint-config | 共享 eslint 配置 |

`@repo/eslint-config` 需导出以下规则集（供不同消费方按需继承）：

| 规则集 | 导出名 | 适用包 | 依赖 |
| --- | --- | --- | --- |
| base | `eslintConfigBase` | 所有包 | typescript-eslint (v8 以上, flat config)、eslint |
| node | `eslintConfigNode` | `@repo/server` | 继承 base + eslint-plugin-n (可选) |
| react | `eslintConfigReact` | `@repo/web` | 继承 base + eslint-plugin-react (flat) + eslint-plugin-react-hooks (flat) |
| vitest | `eslintConfigVitest` | 含单测的包 | vitest 相关 rules |

根目录 `eslint.config.js` 直接 `import('@repo/eslint-config').then(...)` 或按包类型动态组合。

## 任务要求

1. 创建 pnpm-workspace.yaml，配置 catalogs 统一管理跨包依赖版本
2. 创建 turbo.json，配置 dev/build/test/lint 任务的依赖图和缓存策略
3. 每个有业务代码的包包含：package.json, tsconfig.json, vitest.config.ts, src/index.ts（@repo/eslint-config 可豁免 vitest.config.ts）
4. 根目录包含：eslint.config.js, .prettierrc, .editorconfig, .gitignore, tsconfig.base.json、README.md
   - `.gitignore` 必须包含：`.env*`（`.env.example` 除外）、`*.db`、`data/`、`dist/`、`node_modules/`，防止敏感信息和构建产物误提交
   - **README.md** 至少包含：项目定位、技术栈一览、目录结构图、快速启动命令（install / dev / build / test / lint）、环境变量列表、扩展指南（如何替换 tasks 为业务实体、如何修改 APP_NAME）
5. 根 package.json：
   - `"engines": { "node": ">=20" }`
   - `"packageManager": "pnpm@<具体版本>"`
   - scripts：dev/build/test/lint 一键运行全部包（通过 turbo）
6. 库类包（@repo/server、@repo/config、@repo/eslint-config）使用 **tsup** 作为构建工具，输出 ESM + d.ts；@repo/web 在 Phase 1 先用 tsc 或 tsup 编译一个空的 `src/index.ts` 占位（仅确保 `pnpm build` 通过），**Phase 3 再切换为 Vite + React**
   - 开发期 `@repo/config` / `@repo/server` 通过 tsconfig `paths` 直接指向 `src`，不依赖 `dist`，保证热更新不断链
7. 配置 Git 提交规范工具链：
   - **husky** v10：`pnpm add -D husky`，然后 `pnpm exec husky init` 初始化 `.husky/` 目录
   - **lint-staged** 在 `.husky/pre-commit` 跑 `pnpm exec lint-staged`
   - **@commitlint/cli + config-conventional** 在 `.husky/commit-msg` 跑 `pnpm exec commitlint --edit $1`
   - 根目录需有 `commitlint.config.js`：

         export default { extends: ['@commitlint/config-conventional'] };

   - lint-staged 通过根目录 `lint-staged.config.js` 配置（或写进 `package.json`），覆盖 eslint + prettier
8. 确保 `pnpm install && pnpm build && pnpm test && pnpm lint` 全部通过

## @repo/config 包的内容约定

该包只存放**两端共享**的内容：

- zod schema（如表单校验规则、API 参数校验规则）
- TypeScript 类型定义（如 API 响应类型、共享数据结构）
- 常量配置（如分页默认值、枚举值列表）

禁止存放：

- 任何前端/后端专属的逻辑
- UI 组件或服务端中间件

### Phase 1 必须落地的最小契约

为了让 Phase 2/3 直接消费而不是各自重复造轮子，本阶段必须在 `@repo/config` 中沉淀以下内容：

**1. API 响应包络（envelope）**

统一服务端响应格式，前端拦截器与服务端中间件围绕同一形状工作：

    // 成功
    type ApiSuccess<T> = { ok: true; data: T };
    // 失败
    type ApiError = { ok: false; error: { code: string; message: string; details?: unknown } };
    type ApiResponse<T> = ApiSuccess<T> | ApiError;

并提供配套构造工具：`ok(data)` / `fail(code, message, details?)`。

**2. 错误码常量**

集中维护错误码字符串字面量联合，例如：

    export const ErrorCode = {
      VALIDATION_FAILED: 'VALIDATION_FAILED',
      NOT_FOUND: 'NOT_FOUND',
      UNAUTHORIZED: 'UNAUTHORIZED',
      RATE_LIMITED: 'RATE_LIMITED',
      INTERNAL_ERROR: 'INTERNAL_ERROR',
    } as const;
    export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

**3. tasks 领域 schema 与类型**

Phase 2 的 `tasks` 表对应的 zod schema 与衍生类型（`TaskSchema`、`CreateTaskInput`、`UpdateTaskInput`、`TaskStatus`、`TaskPriority`、`TaskListQuery`）放在此处，**前后端共用同一份定义**。Phase 2 的请求校验和 Phase 3 的表单校验必须 import 自 `@repo/config`。

**`TaskSchema` 字段表**（字段类型覆盖示例，确保与 Phase 2 的 Drizzle 表一一对应）：

| 字段 | zod 类型 | 说明 |
| --- | --- | --- |
| id | string (cuid2 / nanoid) | 主键 |
| title | string (min(1)) | 任务标题，非空 |
| description | string().nullable() | 任务描述 |
| status | enum("todo" \| "in_progress" \| "done") | 状态，默认 "todo" |
| priority | enum("low" \| "medium" \| "high") | 优先级，默认 "medium" |
| tags | string[].nullable() | 标签数组 |
| dueDate | date().nullable() | 截止日期 |
| createdAt | date() | 创建时间 |
| updatedAt | date() | 更新时间 |

> 变更 schema 时，需同步检查 Phase 2 的 Drizzle 表字段是否一致。推荐在 `@repo/server` 中加一份"字段对照"单测（遍历 `TaskSchema.shape` keys 与 `sqliteTable` columns 比对）。

**4. 健康检查响应类型**

    type HealthStatus = { status: 'ok'; timestamp: string; version: string };

**5. 端口与默认值常量**

    export const DEFAULT_SERVER_PORT = 13001;
    export const DEFAULT_WEB_PORT = 13002;
    export const DEFAULT_API_BASE_URL = 'http://localhost:13001';

**6. URL 校验 schema**

    export const ServerUrlSchema = z.string().url();
    export type ServerUrl = z.infer<typeof ServerUrlSchema>;

**7. 应用名称与版本号**

    export const APP_NAME = 'ai-app-starter';      // 用户 fork 后唯一需要改的地方
    export const APP_VERSION = '1.0.0';            // Phase 2/3 共用

    > 数据库默认路径、日志目录等依赖 `APP_NAME`，修改此处即可全局生效。

> 上述内容是 Phase 2/3 的硬依赖。Phase 1 验收时这些导出必须存在并被一份基础单测覆盖（schema parse 成功/失败用例 + envelope 构造工具）。

## 开发规则

- 优先使用最新稳定版技术
- 核心工具函数使用 TDD 开发
- 完成后运行 pnpm -r test 确保所有包测试通过
```

---

## 验收标准

- [ ] `pnpm install` 无警告

- [ ] `pnpm build` 全部包编译成功

- [ ] `pnpm test` 所有基础测试通过

- [ ] `pnpm lint` 零报错

- [ ] workspace 结构正确（`apps/web`、`packages/{server,config,eslint-config}`），各包可独立 `pnpm --filter @repo/xxx build`

- [ ] `@repo/config` 可被 `@repo/server` 和 `@repo/web` 正常引用

- [ ] `@repo/config` 已沉淀最小契约：`ApiResponse` 包络、`ErrorCode` 常量、`tasks` 领域 schema/类型、`HealthStatus`、端口与默认 URL 常量、`ServerUrlSchema`、`APP_NAME`、`APP_VERSION`，且包含基础单测

- [ ] 根目录包含 `README.md`（基础使用说明：如何 install/build/test）

- [ ] 根 `package.json` 声明 `engines.node >= 20` 和 `packageManager`

- [ ] husky + lint-staged + commitlint 已配置：随便提交一个不符合 conventional commits 的消息会被拒绝

### 最小测试用例集

以下用例必须在 Phase 1 至少覆盖：

- `@repo/config`：`TaskSchema` parse 成功与失败（校验非法 title、非法 status 值等）
- `@repo/config`：`ApiResponse` 包络构造工具 `ok(data)` / `fail(code, message)` 正确生成包络对象
- `@repo/config`：`ErrorCode` 枚举值断言（防止重构时意外删除或改名）
- `@repo/config`：`ServerUrlSchema` 有效/无效 URL parse
- `@repo/server` / `@repo/web`：能正常 import `@repo/config` 中的类型和 schema，无 TS 报错
- `@repo/eslint-config`：不同规则集（base / node / react）可被 `eslint.config.js` 正常继承，无 flat config 冲突