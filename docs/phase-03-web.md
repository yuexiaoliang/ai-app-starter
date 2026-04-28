# Phase 3：Web 前端开发

> **前置条件**：Phase 1（Monorepo 骨架）已完成，Phase 2（服务端）已完成。 **输出**：可独立启动的 Web 前端应用，包含首页、设置页。

---

## 执行提示词

```
在 @repo/web 包中开发 Web 前端应用，前置条件：Phase 1/2 已完成。

## 技术栈
- React 19 + Vite（最新版，构建工具）
- TanStack Query v5（服务端状态管理、API 缓存）
- Zustand（客户端全局状态、UI 状态）
- shadcn/ui（UI 组件库）
- Tailwind CSS v4（样式）
- React Router v7（declarative mode，仅使用 `\u003cBrowserRouter\u003e` + `\u003cRoutes\u003e`，不启用 framework 特性如 file-based routing 或 SSR）
- react-hook-form + @hookform/resolvers（表单校验）
- zod（校验 schema 从 `@repo/config` import）

## 状态管理分工（重要）
- **TanStack Query**：负责所有服务端数据（API 请求、缓存、失效、乐观更新）
- **Zustand**：负责客户端 UI 状态（主题切换、侧边栏开关）
- 禁止在 Zustand 中缓存服务端数据，禁止在 TanStack Query 中管理 UI 状态

## 功能要求

### 1. 基础架构
- Vite 开发服务器（端口 13002，使用 `@repo/config` 中的 `DEFAULT_WEB_PORT`；Vite 配置 `strictPort: false`，端口被占用时自动寻找可用端口）
- React Router v7 库模式路由配置
- TanStack Query Provider + QueryClient 配置（全局 `staleTime: 30_000`，对实时性要求高的数据单独设置更短的 staleTime 或 refetchInterval）
  - 首页健康检查推荐：`staleTime: 5_000, refetchInterval: 30_000`（5 秒内数据不重复请求，每 30 秒自动刷新）
- Zustand store 初始化（主题模式 state + 侧边栏开关；主题持久化到 `localStorage`，侧边栏开关**不**持久化）
- shadcn/ui 初始化：`pnpm dlx shadcn@latest init --yes --template vite --base-color zinc`；组件通过 `pnpm dlx shadcn add <component>` 按需安装（如 button, card, input, sheet, label, switch）。如遇到 peer dependency 冲突，追加 `--legacy-peer-deps`
- Tailwind CSS v4 配置（Zinc 主色调）
- **API Client 封装**：
  - 创建 axios 实例，统一配置 baseURL（从 `localStorage` 读取 `api-base-url`，默认值引用 `@repo/config` 的 `DEFAULT_API_BASE_URL`）
  - 请求拦截器：从 `localStorage.getItem('api-key')` 读取 API_KEY，如有则自动附加 `x-api-key` header
    - **安全说明**：此方式仅适用于开发/单机/受信网络环境。`localStorage` 存储 key 对公网部署存在 XSS 窃取风险；正式公网部署应替换为基于 Cookie 或 OAuth 的方案
  - 响应拦截器：统一错误处理。服务端返回 `ApiResponse` 失败包络时，提取 `error.code`（如 `UNAUTHORIZED`、`RATE_LIMITED`、`VALIDATION_FAILED`）做针对性提示；网络错误统一提示
  - 通过 TanStack Query 的 `queryFn` 包装 API 调用，禁止直接使用 axios（实现：`fetchHealth` / `fetchTasks` 等 API 函数 → 在 `queryFn` 中调用）

### 2. 主题系统
- 明暗主题切换（localStorage 持久化）
- 跟随系统主题（prefers-color-scheme）
- 使用 **shadcn/ui Zinc（锌灰）** 色系，直接在 `globals.css` 中通过 `@theme inline` 配置 CSS 变量：

/* 使用 shadcn/ui Zinc 色系（Tailwind CSS v4） */
@theme inline {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.141 0.005 285.823);
  --color-card: oklch(1 0 0);
  --color-card-foreground: oklch(0.141 0.005 285.823);
  --color-popover: oklch(1 0 0);
  --color-popover-foreground: oklch(0.141 0.005 285.823);
  --color-primary: oklch(0.141 0.005 285.823);
  --color-primary-foreground: oklch(0.985 0 0);
  --color-secondary: oklch(0.967 0.001 286.375);
  --color-secondary-foreground: oklch(0.205 0.001 286.375);
  --color-muted: oklch(0.967 0.001 286.375);
  --color-muted-foreground: oklch(0.552 0.016 285.938);
  --color-accent: oklch(0.967 0.001 286.375);
  --color-accent-foreground: oklch(0.205 0.001 286.375);
  --color-destructive: oklch(0.577 0.245 27.325);
  --color-border: oklch(0.92 0.004 286.32);
  --color-input: oklch(0.92 0.004 286.32);
  --color-ring: oklch(0.705 0.015 286.067);
  --radius: 0.5rem;
}

.dark {
  --color-background: oklch(0.141 0.005 285.823);
  --color-foreground: oklch(0.985 0 0);
  --color-primary: oklch(0.985 0 0);
  --color-primary-foreground: oklch(0.205 0.001 286.375);
  --color-secondary: oklch(0.274 0.006 286.033);
  --color-secondary-foreground: oklch(0.985 0 0);
  --color-muted: oklch(0.274 0.006 286.033);
  --color-muted-foreground: oklch(0.705 0.015 286.067);
  --color-accent: oklch(0.274 0.006 286.033);
  --color-accent-foreground: oklch(0.985 0 0);
  --color-destructive: oklch(0.704 0.191 22.216);
  --color-border: oklch(1 0 0 / 10%);
  --color-input: oklch(1 0 0 / 15%);
  --color-ring: oklch(0.552 0.016 285.938);
}

- 风格参考：Vercel / Linear 等开发者工具产品，冷色调中性灰，专业冷静

### 3. 页面（Phase 3a：首页 + 基础骨架）

#### 首页 (/)
- 欢迎文案 + 快速开始引导区域
- **服务端健康状态面板**：调用 `GET /api/health`，通过 TanStack Query `queryFn` 包装
  - 展示状态圆点（已连接/未连接/连接失败）
  - 版本号、服务端时间戳
  - 手动刷新按钮

### 4. 页面（Phase 3b：设置页 + 响应式）

#### 设置页 (/settings)
- **服务端配置**：
  - 服务端地址输入框（zod URL 校验，schema 从 `@repo/config` import）
  - 测试连接按钮（调用 `/api/health` 验证连通性）
  - 连接状态显示（已连接 / 未连接 / 连接失败）
- **关于区域**（设置页底部 footer，非独立页面）：
  - 应用名称和版本号均从 `@repo/config` 读取（`APP_NAME` + `APP_VERSION`），保证前后端版本单一来源
  - 仓库地址链接

### 5. 布局（分阶段实施）

**Phase 3a**：
- 顶部导航栏（Logo + 导航链接 + 主题切换按钮）
- 页面内容区域居中，最大宽度 1200px

**Phase 3b**：
- 移动端响应式：md 以下切换为抽屉式侧边导航（使用 shadcn/ui Sheet）
- **响应式断点**：Tailwind CSS 标准断点
  - `sm:` (>= 640px) — 小屏适配
  - `md:` (>= 768px) — 移动端抽屉导航切换
  - `lg:` (>= 1024px) — 桌面布局
  - `xl:` (>= 1280px) — 大屏适配

## 开发规则
- 所有 API 调用必须通过 TanStack Query，禁止裸用 axios
- 表单使用 zod + react-hook-form 校验，zod schema 从 `@repo/config` import
- 核心逻辑（API Client、Store、表单校验）用 vitest 单测
- UI 交互以 chrome-devtools MCP 抽查关键路径为主，不追求组件级全覆盖

## 扩展指南：如何添加新页面

fork 后新增前端功能的标准流程：

1. **路由**：在 React Router `routes.tsx`（或路由配置）中新增路径与懒加载组件
2. **导航**：在导航组件（顶部栏 / 抽屉）中添加对应链接
3. **API 函数**：在 API Client 目录新建 `fetchXxx` 函数，使用 axios 实例 + `@repo/config` zod schema 做响应校验
4. **Query Hook**：新建 `useXxxQuery` / `useXxxMutation` TanStack Query hook，封装 API 函数，处理 loading / error / refetch 状态
5. **页面组件**：新建页面组件，内部通过 Query hook 消费服务端数据，通过 Zustand 消费 UI 状态
6. **表单（如需）**：用 `react-hook-form` + `@repo/config` zod schema（`zodResolver`），不独立定义校验规则
7. **测试**：API 函数单测（含拦截器行为）、Query hook 单测（mock API Client）、表单校验单测；UI 路径用 chrome-devtools MCP 抽查

> 新增页面涉及的 schema 必须先放到 `@repo/config`，再被前后端共用；禁止在 `@repo/web` 中独立定义 API 校验规则。

## Phase 3a 验收要求
- `pnpm --filter @repo/web dev` 启动后可访问
- 路由正常：首页 `/` 可加载，设置页 `/settings` 可切换
- 首页显示服务端连接状态（调用 `/api/health`，走 envelope）
- 顶部导航栏 + 主题切换按钮存在
- 明暗主题切换 + localStorage 持久化 + 跟随系统（prefers-color-scheme）

## Phase 3b 验收要求
- 设置页表单：URL 输入框 zod 校验、测试连接按钮调用 `/api/health`
- 表单校验 schema 从 `@repo/config` import，不独立定义
- 移动端抽屉导航在 `md` 以下出现，桌面端显示顶部导航
- 设置页底部：应用名称和版本号均从 `@repo/config` 读取（`APP_NAME` + `APP_VERSION`），仓库链接正确
- 使用 chrome-devtools MCP 抽查：
  - 移动端抽屉展开/收起
  - 主题切换后页面无闪烁
  - 设置页 URL 输入无效时表单禁用提交
  - 首页健康检查状态与实服务端状态一致
```

---

## 验收标准

### Phase 3a

- [ ] `pnpm --filter @repo/web dev` 启动正常，首页 `/` 可访问

- [ ] 首页显示服务端健康状态（含版本号、时间戳），手动刷新正常

- [ ] 明暗主题切换正常（localStorage 持久化 + 跟随系统偏好）

- [ ] 顶部导航栏 + 导航链接正常

- [ ] 所有 API 调用通过 TanStack Query，axios 封装在 queryFn 内部

- [ ] vitest 单测：API Client 构造、Store 状态、首页健康检查 hook

### Phase 3b

- [ ] 设置页路由 `/settings` 正常

- [ ] 设置页服务端地址输入 + URL 校验 + 测试连接正常

- [ ] 表单校验使用 `@repo/config` 的 zod schema

- [ ] 移动端抽屉导航在 `md` 以下出现，桌面端隐藏

- [ ] 设置页底部：应用名称和版本号均从 `@repo/config` 读取（`APP_NAME` + `APP_VERSION`），仓库链接正确

- [ ] 使用 chrome-devtools MCP 抽查移动端导航、主题切换、表单交互

- [ ] `pnpm build && pnpm test && pnpm lint` 全量通过

### 最小测试用例集

以下用例必须在 Phase 3 至少覆盖：

- **API Client 单测**：
  - axios 实例构造时 baseURL 正确（默认 `DEFAULT_API_BASE_URL`，localStorage 有值时读取覆盖）
  - 请求拦截器正确附加 `x-api-key` header（localStorage 有值时附加，无值时不附加）
  - 响应拦截器正确处理 `ApiResponse` 失败包络（按 `error.code` 分发不同错误提示）与网络错误
- **Zustand Store 单测**：
  - 主题切换 state 变更 + localStorage 持久化
  - 侧边栏开关 state 变更（不持久化到 localStorage）
  - 系统主题偏好监听（`matchMedia('(prefers-color-scheme: dark)')`）
- **表单校验单测**：
  - `ServerUrlSchema`（来自 `@repo/config`）有效/无效 URL 校验
  - react-hook-form + zodResolver 集成时错误提示正确绑定到对应字段
- **首页健康检查 hook 单测**：
  - `useQuery` 包装 `fetchHealth`，loading / success / error 状态切换正确
  - 手动刷新触发 refetch