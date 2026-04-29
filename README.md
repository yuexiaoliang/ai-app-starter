# ai-app-starter

A full-stack AI project quick-start template with a modern monorepo architecture, ready for rapid prototyping and production deployment.

## Tech Stack

| Category           | Technology                                |
| ------------------ | ----------------------------------------- |
| Package Manager    | pnpm (>= 10) + workspaces + catalogs      |
| Task Runner        | Turborepo                                 |
| Build Tool         | Libraries: tsup; Frontend: Vite (Phase 3) |
| Language           | TypeScript 5.9+ (strict mode)             |
| Testing            | Vitest (unit), Playwright (E2E, Phase 3+) |
| Lint               | ESLint 9 (flat config) + Prettier         |
| Commit Convention  | Husky + lint-staged + commitlint          |
| Backend (Phase 2)  | Hono + Drizzle ORM + SQLite               |
| Frontend (Phase 3) | React 19 + Vite + shadcn/ui               |

## Directory Structure

```
.
├── apps/
│   └── web/                    # @repo/web — React frontend (Phase 3)
├── packages/
│   ├── server/                 # @repo/server — Hono API + DB (Phase 2)
│   ├── config/                 # @repo/config — Shared schemas, types, constants
│   └── eslint-config/          # @repo/eslint-config — Shared ESLint flat configs
├── package.json
├── pnpm-workspace.yaml         # Workspace + catalog definitions
├── turbo.json                  # Task pipeline + caching
├── tsconfig.base.json          # Shared TypeScript strict settings
├── eslint.config.js            # Root ESLint composition
├── commitlint.config.js        # Conventional commit rules
└── lint-staged.config.js       # Pre-commit lint + format
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development (all packages)
pnpm dev

# Build all packages
pnpm build

# Run all tests
pnpm test

# Run all lint checks
pnpm lint

# Type-check all packages
pnpm typecheck
```

### Individual Package Commands

```bash
# Build specific package
pnpm --filter @repo/config build
pnpm --filter @repo/server build
pnpm --filter @repo/eslint-config build

# Run tests for specific package
pnpm --filter @repo/config test
```

## Environment Variables

| Variable             | Default                  | Description                         |
| -------------------- | ------------------------ | ----------------------------------- |
| `PORT`               | `13001`                  | Server port                         |
| `NODE_ENV`           | `development`            | Runtime environment                 |
| `DATABASE_URL`       | —                        | SQLite database file path (Phase 2) |
| `API_KEY`            | auto-generated           | API authentication key (Phase 2)    |
| `CORS_ORIGINS`       | `http://localhost:13002` | Allowed CORS origins (Phase 2)      |
| `RATE_LIMIT_ENABLED` | `false`                  | Enable rate limiting (Phase 2)      |
| `LOG_LEVEL`          | `info`                   | Pino log level (Phase 2)            |

## Extension Guide

### Replacing "Tasks" with Your Business Domain

The `@repo/config` package defines a `tasks` domain schema as a starting point. To replace it with your own domain:

1. **Schema** — Modify `packages/config/src/task-schema.ts` (or create new schema files)
2. **Database** — Update `packages/server/src/db/schema.ts` with Drizzle table definitions matching your schema (Phase 2)
3. **Repository** — Implement CRUD operations in `packages/server/src/repositories/` (Phase 2)
4. **Routes** — Add API endpoints in `packages/server/src/routes/` (Phase 2)
5. **Frontend** — Build pages and forms consuming the new API in `apps/web/src/` (Phase 3)

> Tip: Keep schema field types in `@repo/config` and Drizzle columns in sync. Add a field-mapping unit test in `@repo/server` to catch mismatches.

### Changing the Application Name

`APP_NAME` is defined once in `packages/config/src/constants.ts`. Changing it there updates:

- Log output identifiers
- Default database file paths
- Health check responses
- Frontend page titles

## Development Conventions

- **TDD** — Core logic is written test-first
- **Conventional Commits** — All commits must follow the conventional commit format (enforced by husky + commitlint)
- **Catalog Dependencies** — Cross-package dependency versions are unified via `pnpm-workspace.yaml` catalogs. Edit versions in one place.
- **Dev Hot Reload** — `@repo/config` and `@repo/server` are resolved via tsconfig `paths` pointing to `src/` during development, ensuring changes are reflected without rebuild.

## Phase Roadmap

| Phase    | Status  | Description                                 |
| -------- | ------- | ------------------------------------------- |
| Phase 1  | Done    | Monorepo skeleton + shared contracts        |
| Phase 2  | Planned | Hono server + Drizzle ORM + tasks CRUD      |
| Phase 3a | Planned | Vite + React 19 + homepage + TanStack Query |
| Phase 3b | Planned | Settings page + responsive layout + forms   |
