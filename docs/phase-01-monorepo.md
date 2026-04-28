# Phase 1: Monorepo Skeleton Setup

> **Prerequisites**: None; this is Phase 1. **Output**: An installable, buildable, testable monorepo project skeleton.

---

## Execution Prompt

```
I want to set up a monorepo project skeleton using the following tech stack:

## Tech Stack

- pnpm (>= 10) + workspaces + catalogs
- turborepo as the task runner
- TypeScript strict mode (latest)
- vitest (unit tests) + eslint flat config + prettier
- Common dependencies (unified versions via pnpm-workspace.yaml catalogs; each package declares as needed): axios, zod, date-fns

## Workspace Structure

Directory layout:

- `apps/`: Independently runnable applications (deployment targets)
- `packages/`: Libraries that can be consumed by other packages (utilities, configs, shared code)

Create the following 4 packages:

| Package Name | Directory | Description |
| --- | --- | --- |
| @repo/web | apps/web | Web frontend application (React 19) |
| @repo/server | packages/server | Server-side application (Hono + DB). Exists as a standalone app from Phase 1; only exports schema/types/utilities, does not export instantiated services |
| @repo/config | packages/config | Shared configuration across all platforms (zod schema + TypeScript types + constants) |
| @repo/eslint-config | packages/eslint-config | Shared eslint configuration |

`@repo/eslint-config` must export the following rule sets (for consumers to inherit as needed):

| Rule Set | Export Name | Target Package | Dependencies |
| --- | --- | --- | --- |
| base | `eslintConfigBase` | All packages | typescript-eslint (v8+, flat config), eslint |
| node | `eslintConfigNode` | `@repo/server` | Extends base + eslint-plugin-n (optional) |
| react | `eslintConfigReact` | `@repo/web` | Extends base + eslint-plugin-react (flat) + eslint-plugin-react-hooks (flat) |
| vitest | `eslintConfigVitest` | Packages with unit tests | vitest-related rules |

Root `eslint.config.js` dynamically composes via `import('@repo/eslint-config').then(...)` or by package type.

## Task Requirements

1. Create pnpm-workspace.yaml, configure catalogs to unify cross-package dependency versions
2. Create turbo.json, configure dev/build/test/lint task dependency graph and caching strategy
3. Each package with business code includes: package.json, tsconfig.json, vitest.config.ts, src/index.ts (@repo/eslint-config may omit vitest.config.ts)
4. Root directory includes: eslint.config.js, .prettierrc, .editorconfig, .gitignore, tsconfig.base.json, README.md
   - `.gitignore` must include: `.env*` (except `.env.example`), `*.db`, `data/`, `dist/`, `node_modules/`, to prevent accidental commits of sensitive info and build artifacts
   - **README.md** must include at minimum: project positioning, tech stack overview, directory structure diagram, quick start commands (install / dev / build / test / lint), environment variable list, extension guide (how to replace tasks with business entities, how to modify APP_NAME)
5. Root package.json:
   - `"engines": { "node": ">=20" }`
   - `"packageManager": "pnpm@<specific version>"`
   - scripts: dev/build/test/lint to run all packages in one command (via turbo)
6. Library packages (@repo/server, @repo/config, @repo/eslint-config) use **tsup** as build tool, outputting ESM + d.ts; @repo/web in Phase 1 first uses tsc or tsup to compile an empty `src/index.ts` placeholder (just to ensure `pnpm build` passes), **Phase 3 will switch to Vite + React**
   - During development, `@repo/config` / `@repo/server` are resolved via tsconfig `paths` pointing directly to `src`, not relying on `dist`, ensuring hot reload does not break
7. Configure Git commit convention toolchain:
   - **husky** v10: `pnpm add -D husky`, then `pnpm exec husky init` to initialize `.husky/` directory
   - **lint-staged** runs `pnpm exec lint-staged` in `.husky/pre-commit`
   - **@commitlint/cli + config-conventional** runs `pnpm exec commitlint --edit $1` in `.husky/commit-msg`
   - Root directory needs `commitlint.config.js`:

         export default { extends: ['@commitlint/config-conventional'] };

   - lint-staged is configured via root `lint-staged.config.js` (or in `package.json`), covering eslint + prettier
8. Ensure `pnpm install && pnpm build && pnpm test && pnpm lint` all pass

## @repo/config Package Conventions

This package only stores content **shared across frontend and backend**:

- zod schema (e.g. form validation rules, API parameter validation rules)
- TypeScript type definitions (e.g. API response types, shared data structures)
- Constant configuration (e.g. pagination defaults, enum value lists)

Prohibited content:

- Any frontend/backend-specific logic
- UI components or server-side middleware

### Minimal Contracts Required in Phase 1

To ensure Phases 2/3 consume directly instead of reinventing, this phase must establish the following in `@repo/config`:

**1. API Response Envelope**

Unified server response format; frontend interceptors and server middleware work around the same shape:

    // Success
    type ApiSuccess<T> = { ok: true; data: T };
    // Failure
    type ApiError = { ok: false; error: { code: string; message: string; details?: unknown } };
    type ApiResponse<T> = ApiSuccess<T> | ApiError;

And provide companion constructors: `ok(data)` / `fail(code, message, details?)`.

**2. Error Code Constants**

Centrally maintain error code string literal unions, e.g.:

    export const ErrorCode = {
      VALIDATION_FAILED: 'VALIDATION_FAILED',
      NOT_FOUND: 'NOT_FOUND',
      UNAUTHORIZED: 'UNAUTHORIZED',
      RATE_LIMITED: 'RATE_LIMITED',
      INTERNAL_ERROR: 'INTERNAL_ERROR',
    } as const;
    export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

**3. Tasks Domain Schema and Types**

Phase 2's `tasks` table corresponding zod schema and derived types (`TaskSchema`, `CreateTaskInput`, `UpdateTaskInput`, `TaskStatus`, `TaskPriority`, `TaskListQuery`) live here, **shared by frontend and backend from the same definition**. Phase 2 request validation and Phase 3 form validation must import from `@repo/config`.

**`TaskSchema` Field Table** (field types cover examples, ensuring one-to-one mapping with Phase 2 Drizzle table):

| Field | zod Type | Description |
| --- | --- | --- |
| id | string (cuid2 / nanoid) | Primary key |
| title | string (min(1)) | Task title, non-empty |
| description | string().nullable() | Task description |
| status | enum("todo" \| "in_progress" \| "done") | Status, default "todo" |
| priority | enum("low" \| "medium" \| "high") | Priority, default "medium" |
| tags | string[].nullable() | Tag array |
| dueDate | date().nullable() | Due date |
| createdAt | date() | Creation time |
| updatedAt | date() | Update time |

> When modifying schema, check if Phase 2 Drizzle table fields stay in sync. Recommended: add a "field mapping" unit test in `@repo/server` (iterate `TaskSchema.shape` keys against `sqliteTable` columns).

**4. Health Check Response Type**

    type HealthStatus = { status: 'ok'; timestamp: string; version: string };

**5. Port and Default Value Constants**

    export const DEFAULT_SERVER_PORT = 13001;
    export const DEFAULT_WEB_PORT = 13002;
    export const DEFAULT_API_BASE_URL = 'http://localhost:13001';

**6. URL Validation Schema**

    export const ServerUrlSchema = z.string().url();
    export type ServerUrl = z.infer<typeof ServerUrlSchema>;

**7. Application Name and Version**

    export const APP_NAME = 'ai-app-starter';      // The only place to change after forking
    export const APP_VERSION = '1.0.0';            // Shared by Phase 2/3

    > Database default path, log directory, etc. depend on `APP_NAME`; modify here for global effect.

> The above are hard dependencies for Phase 2/3. During Phase 1 acceptance, these exports must exist and be covered by a basic unit test (schema parse success/failure cases + envelope constructor tools).

## Development Rules

- Prefer latest stable versions of technology
- Core utility functions developed using TDD
- After completion, run `pnpm -r test` to ensure all package tests pass
```

---

## Acceptance Criteria

- [ ] `pnpm install` completes without warnings

- [ ] `pnpm build` all packages compile successfully

- [ ] `pnpm test` all basic tests pass

- [ ] `pnpm lint` zero errors

- [ ] Workspace structure correct (`apps/web`, `packages/{server,config,eslint-config}`), each package can independently run `pnpm --filter @repo/xxx build`

- [ ] `@repo/config` can be referenced by `@repo/server` and `@repo/web` normally

- [ ] `@repo/config` has established minimal contracts: `ApiResponse` envelope, `ErrorCode` constants, `tasks` domain schema/types, `HealthStatus`, port and default URL constants, `ServerUrlSchema`, `APP_NAME`, `APP_VERSION`, and includes basic unit tests

- [ ] Root directory contains `README.md` (basic usage instructions: how to install/build/test)

- [ ] Root `package.json` declares `engines.node >= 20` and `packageManager`

- [ ] husky + lint-staged + commitlint configured: a commit with a non-conventional commit message is rejected

### Minimal Test Case Suite

The following cases must be covered at minimum in Phase 1:

- `@repo/config`: `TaskSchema` parse success and failure (validate illegal title, illegal status value, etc.)
- `@repo/config`: `ApiResponse` envelope constructor tools `ok(data)` / `fail(code, message)` correctly generate envelope objects
- `@repo/config`: `ErrorCode` enum value assertions (prevent accidental deletion or renaming during refactoring)
- `@repo/config`: `ServerUrlSchema` valid/invalid URL parse
- `@repo/server` / `@repo/web`: Can normally import types and schema from `@repo/config` without TS errors
- `@repo/eslint-config`: Different rule sets (base / node / react) can be inherited by `eslint.config.js` without flat config conflicts
