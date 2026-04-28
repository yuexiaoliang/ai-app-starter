# Full-Stack AI Project Quick Start Template — Phased Execution Plan

> **Goal**: Build a runnable full-stack application foundation template, including Monorepo skeleton, server-side API, and Web frontend. **Execution Rule**: Phase 1→2→3 executed sequentially; after each phase, run `pnpm build && pnpm test && pnpm lint` for full validation. **Scope Note**: This plan focuses on a "generic full-stack foundation" — after Phase 1/2/3, it can serve as a starting point for any full-stack application.

---

## Global Tech Stack

| Category | Tech |
| --- | --- |
| Package Manager | pnpm (>= 10) + workspaces + catalogs |
| Task Runner | turborepo |
| Build Tool | Libraries: tsup; Frontend App: Vite |
| Language | TypeScript (strict mode, latest) |
| Testing | vitest (unit tests) + playwright (E2E tests) |
| Lint | eslint (flat config) + prettier |
| Commit Convention | husky + lint-staged + @commitlint/cli + config-conventional |
| Dependency Versions | pnpm catalogs unified management: axios, zod, date-fns (each package declares as needed; root does not install business dependencies) |

---

## Phase Index

| Phase | Document | Content | Dependencies |
| --- | --- | --- | --- |
| 1 | [phase-01-monorepo.md](phase-01-monorepo.md) | Monorepo skeleton + minimal contracts | None |
| 2 | [phase-02-server.md](phase-02-server.md) | Server-side foundation (Hono + DB + single-table CRUD) | Phase 1 |
| 3a | [phase-03-web.md](phase-03-web.md) | Web frontend foundation + homepage | Phase 1, 2 |
| 3b | [phase-03-web.md](phase-03-web.md) | Web settings page + responsive + forms | Phase 1, 2, 3a |

---

## Detailed Phase Scope

For detailed implementation requirements, execution prompts, and acceptance checklists, see the individual phase documents.

| Phase | Core Deliverables |
| --- | --- |
| [Phase 1](phase-01-monorepo.md) | Installable, buildable, testable monorepo skeleton; `@repo/config` establishes shared contracts between frontend and backend (API envelope, error codes, tasks schema, port constants, etc.) |
| [Phase 2](phase-02-server.md) | Hono service + CORS / error handling / pino logging / graceful shutdown; Drizzle + SQLite tasks CRUD (Repository pattern); environment variable zod validation; API Key and Rate Limit security extension points |
| [Phase 3a](phase-03-web.md) | Vite + React 19 + React Router v7 foundation; shadcn/ui Zinc theme; homepage health status panel; TanStack Query + Zustand initialization |
| [Phase 3b](phase-03-web.md) | Settings page form (URL validation + test connection); mobile drawer navigation; responsive layout |

---

## Global Development Conventions

### Tech Versions

- All dependencies use the latest stable version
- Node.js >= 20 (LTS)
- TypeScript locks to a specific version in `pnpm-workspace.yaml` catalogs (e.g. `typescript: "^5.9.0"`), to prevent d.ts incompatibility caused by inconsistent TS versions across sub-packages
- Root `package.json` declares `"engines.node": ">=20"` and `"packageManager": "pnpm@10.32.1"`

### Development Workflow

1. **TDD Strategy**: Core logic (utility functions, API handlers, stores) — write tests first, then implement; UI pages come later, covered by Playwright E2E for critical paths
2. **Commit Convention**: Use conventional commits; husky + lint-staged + commitlint automatically validate on commit
3. **After Each Phase**: Run `pnpm build && pnpm test && pnpm lint` for full validation
4. **Directory Convention**: Apps go in `apps/`, libraries go in `packages/`

### Testing Layers

| Layer | Tool | Coverage |
| --- | --- | --- |
| Unit Tests | vitest | Pure logic: utility functions, API Client, Store, Repository, Schema validation, field mapping |
| E2E Tests | playwright | Critical page paths: homepage loading, health status, settings form, theme toggle, mobile navigation, frontend-backend integration |
| MCP Spot Checks | chrome-devtools MCP | Agent-assisted validation: complex interactions, visual regression, network request inspection (use as needed; see `mcp-testing-guide.md`) |

- Unit tests aim for full coverage of core logic
- E2E tests cover critical user paths, not exhaustive
- MCP spot checks serve as an auxiliary validation method for agents, not part of CI

---

## End-to-End Integration Acceptance (Spans All Phases)

The ultimate goal of the skeleton is "frontend-backend integration passes in one go". The following acceptance items do not belong to a single phase; they are verified once after all phases complete:

- [ ] `pnpm --filter @repo/server dev` starts the server, `pnpm --filter @repo/web dev` starts the frontend; both run simultaneously without port conflicts

- [ ] Frontend homepage (`http://localhost:13002`) successfully calls `GET /api/health`, status dot shows "Connected", version matches `@repo/config`'s `APP_VERSION`

- [ ] Frontend settings page: after entering any server address, "Test Connection" correctly toggles between success/failure states

- [ ] Frontend and backend versions are consistent (both from `@repo/config`'s `APP_VERSION`)

- [ ] Mobile viewport (<=768px): drawer navigation expands/collapses normally

- [ ] After switching light/dark theme and refreshing the page, the theme selection persists

- [ ] Without setting `API_KEY`, the server auto-generates a key and outputs a frontend URL with the key; after visiting that URL, the frontend automatically completes authentication and sends `x-api-key` header with requests

- [ ] With `RATE_LIMIT_ENABLED=true`, high-frequency requests trigger 429; the frontend interceptor correctly handles it and shows a prompt

- [ ] Running `pnpm build && pnpm test && pnpm lint` (from root) completes with zero errors
