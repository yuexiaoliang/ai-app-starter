# Remediation Plan

Generated from the full project evaluation on 2026-05-09.

## Executive Summary

This document tracks all identified issues ranked by severity. Each item includes the problem description, affected files, concrete fix steps, and verification method. Work through items in priority order (P0 first).

---

## Priority Legend

- **P0 — Critical**: Security vulnerabilities that can lead to data loss, RCE, or unauthorized access. Fix immediately.
- **P1 — High**: Security or stability issues that degrade production safety. Fix within one sprint.
- **P2 — Medium**: Performance, maintainability, or reliability issues. Fix within two sprints.
- **P3 — Low**: Nice-to-have improvements. Address when convenient.

---

## P0 — Critical

### P0.1 Upgrade `drizzle-orm` to fix SQL injection vulnerability

- **CVE**: GHSA-gpj5-g38j-94v9
- **Current version**: `^0.43.0` (catalog)
- **Patched version**: `>=0.45.2`
- **Affected packages**: `packages/core`, `apps/desktop`
- **Affected files**:
  - `pnpm-workspace.yaml` (catalog version)
  - `packages/core/package.json`
  - `apps/desktop/package.json`
- **Impact**: SQL identifiers are not properly escaped, allowing injection via crafted identifiers.
- **Fix steps**:
  1. Update `drizzle-orm` version in `pnpm-workspace.yaml` catalog from `^0.43.0` to `^0.45.2` (or latest).
  2. Run `pnpm install` to update the lockfile.
  3. Review the `drizzle-orm` changelog for breaking changes between 0.43 and 0.45.
  4. Run `pnpm test` and `pnpm typecheck` to verify compatibility.
- **Verification**:
  - `pnpm audit --audit-level high` should no longer report the `drizzle-orm` vulnerability.
  - All tests pass.

### P0.2 Upgrade `electron` to fix multiple use-after-free vulnerabilities

- **CVEs**: GHSA-532v-xpq5-8h95, GHSA-8337-3p73-46f4, GHSA-jjp3-mq3x-295m, GHSA-9wfr-w7mm-pc7f, GHSA-5rqw-r77c-jp79, GHSA-xj5x-m3f3-5x3h, GHSA-r5p7-gp4j-qhrx, GHSA-3c8v-cfp5-9885, GHSA-xwr5-m59h-vwqr, GHSA-mwmh-mq4g-g6gr, GHSA-9w97-2464-8783, GHSA-4p4r-m79c-wq3v, GHSA-f3pv-wv63-48x8
- **Current version**: `^35.0.0`
- **Patched version**: `>=35.2.0` (prefer latest stable `35.x` or migrate to `36.x`)
- **Affected package**: `apps/desktop`
- **Affected files**:
  - `apps/desktop/package.json`
- **Impact**: Multiple use-after-free and memory corruption bugs in renderer, permission callbacks, download dialogs, and protocol handlers. Some may allow sandbox escape or RCE.
- **Fix steps**:
  1. Update `electron` version in `apps/desktop/package.json` to the latest stable release (e.g. `^35.2.0` or `^36.0.0`).
  2. Run `pnpm install`.
  3. Run `pnpm --filter @repo/desktop lint` and `pnpm --filter @repo/desktop typecheck`.
  4. Run `pnpm --filter @repo/desktop package` to ensure native modules rebuild.
  5. Run the desktop smoke test: `pnpm --filter @repo/desktop test:e2e`.
- **Verification**:
  - `pnpm audit` no longer reports `electron` vulnerabilities.
  - Desktop app packages and launches successfully.

### P0.3 Upgrade `hono` to fix bodyLimit bypass and cache leakage

- **CVEs**: GHSA-9vqf-7f2p-gf9v, GHSA-69xw-7hcm-h432, GHSA-qp7p-654g-cw7p, GHSA-p77w-8qqv-26rm
- **Current version**: `^4.7.8`
- **Patched version**: `>=4.12.18`
- **Affected packages**: `packages/contracts`, `packages/server`, `packages/core` (via `drizzle-kit`)
- **Affected files**:
  - `pnpm-workspace.yaml` (catalog version)
- **Impact**: bodyLimit bypass, JSX HTML injection, CSS declaration injection in JSX SSR, cross-user cache leakage via `Vary` header handling.
- **Fix steps**:
  1. Update `hono` version in `pnpm-workspace.yaml` catalog from `^4.7.8` to `^4.12.18` (or latest).
  2. Run `pnpm install`.
  3. Check for breaking changes in `hono` changelog (4.7 -> 4.12).
  4. Run `pnpm test`, `pnpm lint`, `pnpm typecheck`.
- **Verification**:
  - `pnpm audit` no longer reports `hono` vulnerabilities.
  - All server and contract tests pass.

---

## P1 — High

### P1.1 Harden API key storage with restricted file permissions

- **Affected files**:
  - `packages/server/src/env.ts`
- **Current behavior**: API key is written to `~/.app-name/.api-key` with default file permissions (world-readable on many systems).
- **Impact**: Any local user can read the API key file and impersonate the service.
- **Fix steps**:
  1. In `getResolvedApiKey()`, after creating the directory and writing the file, set file permissions to `0o600` (owner read/write only).
  2. Use `fs.chmodSync(apiKeyFile, 0o600)` after `writeFileSync`.
  3. Optionally, encrypt the key at rest using a machine-specific secret (e.g., Node.js `crypto` with OS-level entropy).
- **Verification**:
  - Start the server with a fresh environment (no existing key).
  - Verify `~/.app-name/.api-key` has permissions `-rw-------` (600).

### P1.2 Add production-safe fallback for missing API_KEY

- **Affected files**:
  - `packages/server/src/middleware/api-key.ts`
- **Current behavior**: When `API_KEY` is not set, the middleware skips authentication entirely (`await next()`).
- **Impact**: A production deployment that forgets to set `API_KEY` will be completely open.
- **Fix steps**:
  1. In `apiKeyAuth`, reject requests when `NODE_ENV === 'production'` and `API_KEY` is not configured.
  2. Return `401` with a clear message: "API_KEY is required in production".
  3. Alternatively, generate a key on first startup and log it (current behavior), but still enforce authentication.
- **Verification**:
  - Run server with `NODE_ENV=production` and no `API_KEY`.
  - Any request to a protected endpoint should return `401`.

### P1.3 Replace in-memory rate limiter with Redis-backed or documented limitation

- **Affected files**:
  - `packages/server/src/middleware/rate-limit.ts`
- **Current behavior**: Uses a process-local `Map<string, RateLimitEntry>`. Expired entries are cleaned up every 5 minutes.
- **Impact**: Rate limits are per-process. Multi-instance deployments (load balancer + multiple server processes) allow clients to bypass limits by round-robinning across instances. The cleanup interval also leaks if the process crashes.
- **Fix steps**:
  1. **Short term**: Document in `README.md` that rate limiting is single-instance only.
  2. **Long term**: Replace the `Map` with a Redis-backed store (e.g., `ioredis` + sliding window) or use an external gateway (nginx, cloudflare) for rate limiting.
- **Verification**:
  - Start two server processes on different ports behind a load balancer.
  - Send requests up to the limit on one instance, then switch to the other.
  - With the fix, the second instance should also reject the client.

### P1.4 Harden IP extraction for rate limiting

- **Affected files**:
  - `packages/server/src/middleware/rate-limit.ts:42`
- **Current behavior**: `const ip = c.req.header('x-forwarded-for') || 'unknown';`
- **Impact**: `x-forwarded-for` is client-supplied when no reverse proxy is in front of the server. Attackers can spoof it or set it to `unknown` to share the same rate-limit bucket.
- **Fix steps**:
  1. If the server is behind a trusted proxy, read `x-forwarded-for` but take the **rightmost** IP (closest to the server) or use the connection remote address as fallback.
  2. If no proxy is used, use Hono's `c.req.header('x-real-ip')` or the underlying connection IP.
  3. Add a `TRUSTED_PROXIES` env var to control whether `x-forwarded-for` is trusted.
- **Verification**:
  - Send a request with a spoofed `x-forwarded-for: 1.2.3.4` directly to the server.
  - The rate limiter should use the real connection IP, not `1.2.3.4`.

### P1.5 Upgrade `esbuild` (indirect dependency)

- **CVE**: GHSA-67mh-4wv8-2f99
- **Current version**: `<=0.24.2` (via `drizzle-kit` -> `@esbuild-kit`)
- **Patched version**: `>=0.25.0`
- **Impact**: Dev server CORS misconfiguration allows any website to send requests and read responses.
- **Fix steps**:
  1. Add a `pnpm.overrides` or `resolutions` entry in root `package.json` to force `esbuild >=0.25.0`.
  2. Run `pnpm install`.
- **Verification**:
  - `pnpm audit` no longer reports the `esbuild` vulnerability.

---

## P2 — Medium

### P2.1 Add route-level code splitting to reduce frontend bundle size

- **Affected files**:
  - `apps/web/src/routes.tsx`
  - `apps/web/vite.config.ts`
- **Current behavior**: All pages are statically imported. Vite builds a single `index.js` of **691KB** (214KB gzipped), exceeding the 500KB warning threshold.
- **Impact**: Slower initial page load, especially on mobile networks.
- **Fix steps**:
  1. Convert static imports in `routes.tsx` to dynamic imports:
     ```tsx
     import { lazy, Suspense } from 'react';
     const HomePage = lazy(() => import('@/pages/home.js'));
     const SettingsPage = lazy(() => import('@/pages/settings.js'));
     // ... etc
     ```
  2. Wrap routes in `<Suspense fallback={<Loading />}>`.
  3. Configure `manualChunks` in `vite.config.ts` to separate vendor libraries:
     ```ts
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom', 'react-router'],
             ui: ['@radix-ui/react-dialog', '@radix-ui/react-label', 'lucide-react'],
           },
         },
       },
     }
     ```
- **Verification**:
  - Run `pnpm --filter @repo/web build`.
  - Vite should no longer warn about chunk size.
  - The `dist/assets/` folder should contain multiple `.js` chunks.

### P2.2 Replace `drizzle-kit push` with proper migrations

- **Affected files**:
  - `packages/server/package.json` (`db:push` script)
  - `packages/core/drizzle.config.ts`
- **Current behavior**: `drizzle-kit push` modifies the database schema in place without tracking history.
- **Impact**: No rollback capability. Production schema changes are irreversible and risky.
- **Fix steps**:
  1. Initialize Drizzle migrations: create a `migrations/` directory.
  2. Replace the `db:push` script with `drizzle-kit generate` (to create migration files) and `drizzle-kit migrate` (to apply them).
  3. In production startup, run migrations before starting the server.
  4. Document the workflow in `README.md`.
- **Verification**:
  - Run `pnpm --filter @repo/server db:generate`.
  - A migration file should be created in the migrations directory.
  - Applying it with `db:migrate` updates the database and records the migration in `_drizzle_migrations`.

### P2.3 Change models.dev sync from full wipe to incremental upsert

- **Affected files**:
  - `packages/core/src/services/models-sync.ts`
- **Current behavior**: Every sync deletes all rows in `models` and `providers`, then re-inserts everything.
- **Impact**: Temporary data unavailability during sync. Foreign key constraints (if added later) will break. Higher write load than necessary.
- **Fix steps**:
  1. Use `INSERT ... ON CONFLICT DO UPDATE` (SQLite `upsert`) for providers and models.
  2. Track IDs that exist in the API response.
  3. After upsert, delete rows whose IDs are **not** in the API response (orphan cleanup).
  4. Wrap the entire operation in a transaction.
- **Verification**:
  - Trigger a sync while querying the database.
  - Row count should never drop to zero.
  - Only changed/new rows should be modified.

### P2.4 Sanitize or replace `console.error` in production error handlers

- **Affected files**:
  - `packages/server/src/middleware/error.ts:16`
  - `packages/contracts/src/ipc-adapter.ts:59`
  - `packages/contracts/src/hono-adapter.ts:62`
- **Current behavior**: Unexpected errors are logged with `console.error`, which may leak stack traces or sensitive data in production.
- **Fix steps**:
  1. Use a structured logger (the project already depends on `pino`) instead of `console.error`.
  2. In production, log only error codes and sanitized messages. Include stack traces only in development.
- **Verification**:
  - Trigger a 500 error in production mode.
  - Logs should contain a traceable error ID, not raw stack traces or request bodies.

### P2.5 Restrict CORS in development to explicit origins

- **Affected files**:
  - `packages/server/src/middleware/cors.ts`
- **Current behavior**: Development CORS allows `http://localhost:*` and `http://10.0.0.*`.
- **Impact**: On shared networks (e.g., corporate Wi-Fi on `10.0.0.0/8`), other machines can make authenticated requests to the dev server.
- **Fix steps**:
  1. Replace the broad `10.0.0.*` pattern with explicit `VITE_DEV_SERVER_URL` matching.
  2. Or read allowed origins from an environment variable even in development.
- **Verification**:
  - Start the dev server.
  - A request from `http://10.0.0.50:9999` should be rejected unless explicitly allowed.

---

## P3 — Low

### P3.1 Increase frontend test coverage

- **Affected files**:
  - `apps/web/tests/` (only `store.test.ts` exists)
- **Current behavior**: Only Zustand store has unit tests. React components, hooks, and API client are untested.
- **Fix steps**:
  1. Add tests for `use-theme.ts` hook (theme switching, persistence).
  2. Add tests for `api.ts` / `http.ts` (mock axios, test error handling).
  3. Add component tests for `SettingsPage` form validation using `@testing-library/react`.
  4. Consider adding coverage reporting to CI (`vitest --coverage`).
- **Verification**:
  - `pnpm --filter @repo/web test` should run more than 10 tests.

### P3.2 Expand CI test matrix

- **Affected files**:
  - `.github/workflows/ci.yml`
- **Current behavior**: CI runs only on `ubuntu-latest`.
- **Impact**: Platform-specific bugs (e.g., path separators, native module loading) in desktop packaging are not caught before release.
- **Fix steps**:
  1. Add `macos-latest` and `windows-latest` to the CI `os` matrix (at least for the `package` and `test:e2e` steps).
  2. Keep lint and unit tests on Ubuntu only to save CI minutes, or run them everywhere.
- **Verification**:
  - A PR should trigger CI on all three platforms.

### P3.3 Centralize hardcoded URLs into config

- **Affected files**:
  - `packages/core/src/services/models-sync.ts:5` (`https://models.dev/api.json`)
  - `packages/config/src/constants.ts` (add new constant)
  - `apps/web/src/lib/api.ts` (uses `DEFAULT_API_BASE_URL`)
- **Current behavior**: External API URLs are scattered in source files.
- **Fix steps**:
  1. Move `https://models.dev/api.json` to `@repo/config` as `MODELS_DEV_API_URL`.
  2. Reference it from `models-sync.ts`.
- **Verification**:
  - `grep -r "models.dev" packages/ apps/` should return no hardcoded strings outside config.

### P3.4 Add health check for database connectivity

- **Affected files**:
  - `packages/server/src/routes/health.ts`
- **Current behavior**: Health endpoint likely returns a static response.
- **Fix steps**:
  1. Execute a lightweight query (e.g., `SELECT 1`) against the database in the health handler.
  2. Return `503` if the database is unreachable.
- **Verification**:
  - Stop the database (or corrupt the file path).
  - `GET /api/health` should return `503` with a database error message.

### P3.5 Clean up rate limit `cleanupInterval` on process exit

- **Affected files**:
  - `packages/server/src/middleware/rate-limit.ts:29`
- **Current behavior**: `setInterval` is created at module load time and never cleared.
- **Impact**: Prevents Node.js process from exiting cleanly in some contexts (e.g., tests, serverless).
- **Fix steps**:
  1. Export `cleanupInterval` so it can be stopped by callers.
  2. In the server entry (`src/index.ts`), add a `process.on('SIGTERM', ...)` handler that calls `clearInterval(cleanupInterval)`.
- **Verification**:
  - Import the rate limit module in a script.
  - After the script finishes, Node.js should exit without `--exit` or hanging.

---

## Dependency Upgrade Tracking

| Package              | Current    | Target                   | Status      |
| -------------------- | ---------- | ------------------------ | ----------- |
| `drizzle-orm`        | `^0.43.0`  | `^0.45.2`                | Not started |
| `electron`           | `^35.0.0`  | `^35.2.0` (or `^36.0.0`) | Not started |
| `hono`               | `^4.7.8`   | `^4.12.18`               | Not started |
| `esbuild` (override) | `<=0.24.2` | `>=0.25.0`               | Not started |

After each upgrade, run:

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
pnpm typecheck
pnpm audit
```

---

## Audit Trail

| Date       | Action                                              | By          |
| ---------- | --------------------------------------------------- | ----------- |
| 2026-05-09 | Full evaluation completed; remediation plan created | Claude Code |
