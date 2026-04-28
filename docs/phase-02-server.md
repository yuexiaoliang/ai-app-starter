# Phase 2: Server-Side Development

> **Prerequisites**: Phase 1 (Monorepo skeleton) completed. **Output**: Independently runnable Hono service.

---

## Execution Prompt

```
Develop the server-side in the @repo/server package within the current monorepo. Prerequisites: Phase 1 completed.

## Tech Stack
- Node.js >= 20
- Hono (latest) as the HTTP framework
- Drizzle ORM + better-sqlite3 as the database layer
- Pino as the logging library
- dotenv (environment variable management)
- @hono/zod-validator for request validation; schema imported from `@repo/config`
- tsup as the library build tool (output ESM + d.ts); dev uses tsx watch

## Feature Requirements

### 1. Basic Service
- Hono app startup; port read from environment variable `PORT`, default value references `DEFAULT_SERVER_PORT` from `@repo/config`
- Health check endpoint `GET /api/health`, returns `@repo/config`'s `ApiResponse<HealthStatus>` envelope:
  { "ok": true, "data": { "status": "ok", "timestamp": "...", "version": APP_VERSION } }

- **CORS middleware**: Allows Web frontend cross-origin access
  - Development mode (`NODE_ENV !== 'production'`): allows `http://localhost:*`
  - Production mode: configures allowed origins via environment variable `CORS_ORIGINS` (comma-separated); **defaults to empty array when not set (denies all cross-origin requests)**
- Global error handling middleware: catches exceptions -> constructs `@repo/config`'s `ApiResponse` failure envelope
- Global request logging middleware (pino, includes method/path/duration/status); development uses `pino-pretty` for formatted output, production outputs structured JSON; log level configured via `LOG_LEVEL` environment variable (default `info`)
- **Graceful shutdown**: listens for `SIGINT`/`SIGTERM`, finishes current requests before exiting the process, preventing dropped requests during hot reload or container stop

### 2. Environment Variable Management

- Use dotenv to load .env files
- **Define environment variable schema with zod** (`PORT`, `NODE_ENV`, `DATABASE_URL`, `API_KEY`, `CORS_ORIGINS`, `RATE_LIMIT_ENABLED`, `LOG_LEVEL`, etc.); validates on app startup, immediately throws and exits on missing or invalid values
  - `DATABASE_URL`: SQLite database file path, **default dynamically generated based on `APP_NAME`** (`file:~/.${APP_NAME}/data/app.db`, independent of startup directory)
- Provide `.env.example` template listing all configurable environment variables:

  | Variable | Required | Default | Purpose |
  | --- | --- | --- | --- |
  | `PORT` | No | `13001` | Server listening port |
  | `NODE_ENV` | No | `development` | Runtime mode (`development` / `production`) |
  | `DATABASE_URL` | No | `file:~/.ai-app-starter/data/app.db` | SQLite file path |
  | `API_KEY` | No | — | Custom API Key; when not set, auto-generates and persists to `~/.${APP_NAME}/.api-key` |
  | `CORS_ORIGINS` | No | — | Production mode allowed origins (comma-separated); defaults to empty array when not set |
  | `RATE_LIMIT_ENABLED` | No | `false` | Set to `true` to enable in-memory rate limiting |
  | `LOG_LEVEL` | No | `info` | pino log level |

- Distinguish `.env.development` and `.env.production` (optional)

### 3. Database

- Use Drizzle ORM + better-sqlite3
- Database path controlled by `DATABASE_URL` environment variable (zod validated), **default dynamically generated based on `@repo/config`'s `APP_NAME`** (`file:~/.${APP_NAME}/data/app.db`, located under user's home directory, independent of startup directory. Changing `APP_NAME` automatically updates all paths)
- Provide `drizzle.config.ts`, database connection reads `process.env.DATABASE_URL`
- Development phase uses `drizzle-kit push` to manually sync schema (**does not** auto-sync on app startup, to avoid accidentally changing production databases)
  - **Production deployment recommendation**: After development, switch to `drizzle-kit generate` + `drizzle-kit migrate` workflow, generate migration files and commit to version control, apply automatically during deployment
- **tasks table**: Database layer uses Drizzle ORM's `sqliteTable()` to define schema; fields map one-to-one with `@repo/config`'s `TaskSchema`; request validation imports zod schema from `@repo/config`, used via `@hono/zod-validator`

**tasks table fields** (shared with `@repo/config`):

- id: string (primary key, uses cuid or nanoid)
- title: string (task title, non-empty)
- description: string | null (task description)
- status: "todo" | "in_progress" | "done" (task status, default "todo")
- priority: "low" | "medium" | "high" (priority, default "medium")
- tags: JSON | null (tag array, e.g. \["frontend", "bug"\])
- dueDate: Date | null (due date)
- createdAt: Date (creation time)
- updatedAt: Date (update time)

> **zod ↔ Drizzle sync mechanism**: Drizzle table fields must map one-to-one with `@repo/config`'s `TaskSchema`. Recommended approaches (choose one):
> 1. Add a "field mapping" unit test in `@repo/server` — iterate `TaskSchema.shape` keys, assert Drizzle `sqliteTable` columns contain matching fields;
> 2. Use `drizzle-zod` to auto-generate zod schema from Drizzle schema, then re-export to `@repo/config` (reduces manual maintenance but adds an extra dependency).

**Database operations use Repository pattern encapsulation**, each table corresponds to a repository class containing CRUD methods.

- Provide CRUD example API: GET/POST/PUT/DELETE /api/tasks
- List query supports optional filtering: `?status=todo`
- All request parameter validation (body and query) must use `@hono/zod-validator`, schema imported from `@repo/config`

### Test Environment Configuration

Tests use in-memory SQLite (`file::memory:`), each test file has an independent database instance:

- vitest's `setupFiles` creates Drizzle connection and pushes schema
- Between each `test`, `afterEach` cleans table data to ensure isolation
- Route integration tests also use in-memory database, directly called via Hono's `app.request()`

### 4. Security Extension Points

Both extension points are **minimal viable versions (in-memory implementation, disabled by default, environment variable toggle)**, with the goal of "skeleton comes with capabilities, no need to build from scratch".

- **API Key Authentication Middleware**:

  - If environment variable `API_KEY` is set -> uses the environment variable value as the key
  - If not set -> reads `~/.${APP_NAME}/.api-key` file:
    - File exists -> reuses the key from the file
    - File does not exist -> generates a random string (e.g. nanoid 12 chars), writes to file, reused on subsequent startups
  - Regardless of key source, on service startup, output the frontend access URL with the key to the console:
    ```
    API Key: sk-a1b2c3d4e5f6
    Frontend access: http://localhost:13002/?api-key=sk-a1b2c3d4e5f6
    ```
  - Validate request header `x-api-key`, compare with the above key
  - `/api/health` and its sub-paths are exempt from authentication (path prefix matching)
  - Validation failure returns `ApiResponse` failure envelope: `{ ok: false, error: { code: 'UNAUTHORIZED', message: '...' } }`

  > **Security Note**: This API Key design is only suitable for development, single-machine, or trusted network environments. The frontend obtains the key via URL parameter and stores it in `localStorage`; this poses XSS theft risks for public internet deployments. Production public deployments should replace with OAuth / Cookie+Session / JWT solutions.

- **Rate Limiting**:

  - If environment variable `RATE_LIMIT_ENABLED=true` -> enables in-memory sliding window rate limiting
  - If not set or `false` -> completely skipped
  - Default window per IP: 1 minute / max 100 requests; exceeding returns HTTP 429 + `ApiResponse` failure envelope (`code: 'RATE_LIMITED'`)
  - **Memory cleanup mechanism**: cleans expired window records every 5 minutes to prevent unlimited memory growth. Timer uses `.unref()` to avoid blocking process exit, or `clearInterval` in the `SIGINT`/`SIGTERM` handler

  > Note: In-memory implementation is suitable for single-instance/development phase. High-concurrency multi-node scenarios need to switch to Redis, but the interface remains unchanged.

## Development Rules

- TDD development: core logic (Repository, utility functions) write tests first then implement; route integration tests written alongside implementation
- Use zod to validate all request parameters and responses
- Database operations use repository pattern encapsulation
- Build script: `build` uses tsup to output ESM + d.ts; `dev` uses tsx watch (or tsup --watch)
- All responses must go through `@repo/config`'s `ApiResponse` envelope; bare JSON format is prohibited

## Extension Guide: How to Replace tasks with Business Entities

The template uses `tasks` as the example entity. Standard workflow for adding new business entities after forking:

1. **Schema**: Define zod schema + TypeScript types + derived types (e.g. `CreateXxxInput` / `UpdateXxxInput`) in `@repo/config`
2. **Database**: Define the corresponding table in `@repo/server`'s Drizzle schema using `sqliteTable()`, fields map one-to-one with zod schema
3. **Validation**: Add or update the "field mapping" unit test, ensuring zod shape keys match Drizzle columns
4. **Repository**: Create `xxx.repository.ts`, inherit or follow existing repository pattern, implement CRUD
5. **Routes**: Create `xxx.routes.ts`, register on the Hono app, all requests/responses validated via `@hono/zod-validator`
6. **Tests**: Add route integration tests (success + validation failure + 404 cases)
7. **Frontend**: In `@repo/web`, add API function -> TanStack Query hook -> page/component

## Acceptance Requirements

- After independent startup, `/api/health` is accessible (with envelope)
- CRUD API passes curl test (includes CORS header)
- `pnpm --filter @repo/server test` all pass
- `.env.example` template completely lists all environment variables
- Graceful shutdown verification: manually start service, send `SIGINT`, confirm in-flight requests complete before process exits (Playwright E2E or manual verification)
- Security extension point verification: when `API_KEY=xxx`, requests without key are rejected with 401; when not set, auto-generates key and outputs frontend URL with key
- Rate limiting verification: when `RATE_LIMIT_ENABLED=true`, high-frequency requests trigger 429; when disabled by default, no limits

```

---

## Acceptance Criteria

- [ ] Service starts independently and runs normally

- [ ] Health check endpoint returns `ApiResponse` envelope

- [ ] Example table (tasks) CRUD interfaces work normally (create -> query -> update -> delete), request body validation uses `@repo/config` schema

- [ ] List query supports filtering by status

- [ ] pino log output format is correct

- [ ] Repository pattern encapsulates database operations

- [ ] CORS middleware allows Web frontend cross-origin requests (development + production mode)

- [ ] `.env.example` template completely lists all environment variables

- [ ] API Key authentication middleware: after setting `API_KEY`, uses the specified key to reject illegal requests; when not set, auto-generates key, persists to file, and outputs frontend URL with key to console

- [ ] Rate Limiting: after setting `RATE_LIMIT_ENABLED=true`, triggers rate limiting; disabled by default; rate limiting returns `RATE_LIMITED` error code

- [ ] Graceful shutdown: after `SIGINT`, process exits normally without dropping requests

- [ ] All responses go through `@repo/config`'s `ApiResponse` envelope (success uses `ok(data)`, failure uses `fail(code, message)`)

### Minimal Test Case Suite

The following cases must be covered at minimum in Phase 2:

- **Repository unit tests** (in-memory SQLite): one basic path each for CRUD + boundaries (empty title validation, querying non-existent id returns null)
- **Field mapping unit test**: iterate `TaskSchema.shape` keys, assert Drizzle table columns contain all fields
- **Route integration tests** (`app.request()` + in-memory DB): `POST /api/tasks` create success and failure (validation error returns `VALIDATION_FAILED`), `GET /api/tasks` list with filtering, single-item `GET / PUT / DELETE` with 404
- **API Key middleware unit tests** (`app.request()`): after setting `API_KEY`, illegal requests get 401; when not set, all requests are allowed; `/api/health` is always exempt
- **Rate Limit middleware unit tests** (`app.request()`): when `RATE_LIMIT_ENABLED=true`, high-frequency requests trigger 429 (returns `RATE_LIMITED`); when not set, passes normally
- **Environment variable validation unit tests**: when required fields are missing, schema parse throws a clear error (does not start the full service)
