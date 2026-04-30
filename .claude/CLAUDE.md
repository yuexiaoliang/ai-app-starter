# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
pnpm install

# Development (runs all packages in parallel via Turborepo)
pnpm dev                    # Frontend: http://localhost:13002, Server: http://localhost:13001

# Build / test / lint (all packages)
pnpm build
pnpm test
pnpm lint
pnpm typecheck

# Run a single package
pnpm --filter @repo/server dev
pnpm --filter @repo/web dev
pnpm --filter @repo/config test

# Database (server package)
pnpm --filter @repo/server db:push     # Push Drizzle schema to SQLite

# E2E tests (web package)
pnpm --filter @repo/web test:e2e       # Playwright; auto-starts server + dev server
```

## Architecture

### Monorepo Structure

pnpm workspaces + Turborepo. Four packages:

- `@repo/web` — React 19 frontend (Vite, port 13002)
- `@repo/server` — Hono API server (port 13001)
- `@repo/config` — Shared Zod schemas, types, constants, API response helpers
- `@repo/eslint-config` — Shared ESLint flat configs

### Backend (`@repo/server`)

**Factory pattern for testability.** `createApp(db)` in `src/app.ts` accepts a `DB` instance, making it trivial to inject an in-memory SQLite database in tests. The production entry (`src/index.ts`) wires together `createDb()` + `createApp()` + `@hono/node-server`.

**Middleware chain order matters:** `cors` -> `requestLogger` -> `apiKeyAuth` -> `rateLimit` -> routes -> `errorHandler` (last). `/api/health` is exempt from API key checks.

**Environment & auto-generated API key.** `src/env.ts` validates env vars with Zod. If `API_KEY` is not set, a key is auto-generated via `nanoid()` and persisted to `~/.<APP_NAME>/.api-key`. The server startup log prints the full frontend access URL with the key embedded as a query param.

**Repository pattern.** All Drizzle queries live in `src/repositories/`. `TaskRepository` maps raw DB rows to the shared `Task` type via a private `toTask()` method. Field-mapping unit tests exist to catch schema mismatches between `@repo/config` Zod schemas and Drizzle column definitions.

**Unified API response format.** All routes return `ok(data)` or `fail(code, message, details)` from `@repo/config`. The `api-client.ts` in the frontend has an axios interceptor that turns `{ok: false}` responses into thrown `ApiClientError`s.

**Dev hot reload without rebuild.** During development, `@repo/server` and `@repo/config` are resolved via tsconfig `paths` pointing directly to `src/`. Changes are reflected immediately without a package rebuild. In production, they resolve to `dist/`.

### Frontend (`@repo/web`)

**State split by concern.** TanStack Query handles server state (data fetching, caching, mutations). Zustand handles client state (theme, sidebar open/close). Zustand state is partially persisted to `localStorage` (only `theme`).

**API key auto-acquisition.** On module load, `api-client.ts` reads `?api-key=xxx` from the URL, saves it to `localStorage`, and strips the param from the URL via `history.replaceState`. The axios request interceptor injects the `x-api-key` header on every request.

**Theme system.** Three modes: light, dark, system. The `useThemeEffect` hook toggles a `.dark` class on `document.documentElement`. System mode listens to `prefers-color-scheme` changes. Theme is stored in Zustand + `localStorage`.

**shadcn/ui components live in `src/components/ui/`.** They are built on Radix UI primitives + `class-variance-authority` + `tailwind-merge` (via the `cn()` utility). Tailwind CSS v4 is used with `@import "tailwindcss"` and `@theme inline` for CSS variable mapping.

### Shared Contracts (`@repo/config`)

This is the source of truth for cross-package types:

- Zod schemas (`TaskSchema`, `CreateTaskInput`, `UpdateTaskInput`) — used by backend validators and frontend form resolvers
- `ok()` / `fail()` response helpers — used by all API routes
- `ErrorCode` constants — shared error codes across server and client
- `APP_NAME`, `APP_VERSION`, port constants — single source, consumed by both frontend and backend

### Dependency Versioning

Cross-package dependency versions are centralized in `pnpm-workspace.yaml` catalogs. When adding/upgrading a dependency used by multiple packages, update the version in the catalog rather than individual `package.json` files.

## Rules

Additional rules live in `.claude/rules/` and are loaded automatically by Claude Code.

## Testing

- **Unit tests:** Vitest with `globals: true`. `@repo/server` and `@repo/config` use `node` environment. `@repo/web` uses `jsdom` with a setup file that mocks `matchMedia`, `localStorage`, and `history`.
- **E2E tests:** Playwright tests both Desktop Chrome and Mobile Chrome. The Playwright config auto-starts the server (`pnpm --filter @repo/server dev`) and dev server (`pnpm dev`) before running tests.

## Commit Convention

All commits must follow Conventional Commits format. Enforced by Husky + commitlint. Pre-commit hook runs `lint-staged`: ESLint --fix + Prettier --write for staged source files.
