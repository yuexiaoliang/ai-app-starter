# Architecture Refactor Plan

This document describes a long-term refactor of the monorepo to make the
Electron desktop app reliable to package, evolve, and ship. The plan is
optimized for **long-term sustainability**, not short-term migration cost.

## Table of Contents

- [Why Refactor](#why-refactor)
- [Design Principles](#design-principles)
- [Target Package Topology](#target-package-topology)
- [Package Responsibilities](#package-responsibilities)
- [End-to-End Data Flow](#end-to-end-data-flow)
- [Electron Build Pipeline](#electron-build-pipeline)
- [Security Model](#security-model)
- [Observability](#observability)
- [Releases and Updates](#releases-and-updates)
- [CI/CD](#cicd)
- [Developer Experience](#developer-experience)
- [Staged Execution Order](#staged-execution-order)
- [Long-Term Payoffs](#long-term-payoffs)

---

## Why Refactor

The current `apps/desktop` is not a desktop application architecturally — it
is the `@repo/web` client and the `@repo/server` HTTP server stuffed inside an
Electron shell with hand-rolled glue. The problems compound:

| Symptom                                                             | Root cause                                                                                                                                          |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `web/dist` is missing from `app.asar` after packaging               | Forge has no knowledge of `apps/web`; no hook copies it                                                                                             |
| `@repo/server/db`, `@repo/server/app` deep imports work in dev only | The package only declares a single `.` export; subpaths rely on Vite aliases                                                                        |
| 19,876-line `main.js` contains the entire Hono server inlined       | Vite re-bundles the server source even though `@repo/server/dist/index.js` already exists                                                           |
| All API calls return 401 from the desktop UI                        | `loadFile()` does not propagate the API key query string                                                                                            |
| `pnpm install` does not provision the Electron binary               | `electron` is in `ignoredBuiltDependencies` instead of `onlyBuiltDependencies`                                                                      |
| Packaging is fragile across upgrades                                | Forge assumes single-package layout; current setup leans on `node-linker=hoisted`, `prune: false`, `dereference: true`, and multi-path search hooks |

The architecture documented in `docs/electron-sqlite-packaging.md`
(Approach B — Direct DB Access via IPC) was never adopted. The real code
ships Approach A (embedded HTTP server) plus enough hand-rolled glue to make
each layer disagree with the next.

The refactor below is not a patch on the current setup. It is a
re-architecture that aligns the code with the recommended Electron pattern,
and decouples business logic from any single transport.

---

## Design Principles

| Principle                                        | What it means in practice                                                                                                                          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Business logic and transport are orthogonal**  | Core code does not know whether it is invoked via HTTP, IPC, or any future transport. Adding a new transport never requires editing business code. |
| **Package contracts are the public API**         | All cross-package imports go through declared `exports`. No Vite aliases, no deep imports into `src/`.                                             |
| **Each artifact is built exactly once**          | The same business module must not be inlined by two different bundlers.                                                                            |
| **End-to-end type safety**                       | Types flow from the database row to the renderer call site through a single source of truth.                                                       |
| **Use Forge's official integration points only** | No reliance on hoisting tricks, manual `node_modules` copies of pure-JS deps, or `__dirname` arithmetic across packages.                           |

---

## Target Package Topology

```
ai-app-starter/
├── packages/
│   ├── config/            Pure types and constants (Zod schemas, error codes, APP_NAME)
│   ├── core/              [NEW] Business core: DB, repositories, services, domain types
│   ├── contracts/         [NEW] Transport-agnostic RPC contracts (channel + input/output schemas)
│   ├── server/            HTTP adapter only: Hono routes, middleware, env, bin
│   └── eslint-config/     Unchanged
├── apps/
│   ├── web/               Renderer for both browser deployments and Electron
│   └── desktop/           Electron shell: main + preload, embeds the web build as renderer
└── tooling/               [Optional] Shared Forge config, version sync scripts
```

---

## Package Responsibilities

### `@repo/config`

- Zod schemas, TypeScript types, constants (`APP_NAME`, port numbers).
- `ok()` / `fail()` response helpers and error codes.
- **Zero runtime dependencies.** Every other package can import it freely.

### `@repo/core` (new)

The only package allowed to import `better-sqlite3` and `drizzle-orm`. It
has no knowledge of HTTP or Electron.

Public surface (subpath exports):

```jsonc
{
  "exports": {
    ".": "./dist/index.js",
    "./db": "./dist/db/index.js",
    "./repositories": "./dist/repositories/index.js",
    "./services": "./dist/services/index.js",
  },
}
```

Contents:

- `db/index.ts`: `createDb(url)`, `DB` type, schema.
- `repositories/`: `TaskRepository`, `ProviderRepository`, etc. Each repo
  takes a `DB` in its constructor; no globals.
- `services/`: long-lived domain services such as `ModelsSyncService`. Side
  effects (timers, network) are started by callers, not on import.
- `index.ts`: re-exports the above.

What `@repo/core` does **not** contain:

- No Hono, no `@hono/node-server`, no Express
- No api-key middleware, no CORS, no rate limit
- No `process.env` reads (configuration is passed in)

### `@repo/contracts` (new)

Single source of truth for the RPC surface. Each contract entry declares a
channel name plus Zod schemas for input and output.

```ts
// packages/contracts/src/tasks.ts
export const taskContract = {
  list: { input: z.void(), output: z.array(TaskSchema) },
  create: { input: CreateTaskInput, output: TaskSchema },
  update: { input: UpdateTaskInput, output: TaskSchema },
  delete: { input: z.object({ id: z.string() }), output: z.void() },
} as const;
```

Consumers:

- `@repo/server` derives Hono routes from contracts.
- `apps/desktop` derives `ipcMain.handle` registrations from contracts.
- `apps/web` derives a typed client from contracts.

Adding a new endpoint becomes a one-file change. HTTP, IPC, and front-end
types update automatically.

### `@repo/server` (slimmed down)

- Hono app, middleware (`cors`, `apiKeyAuth`, `rateLimit`, `requestLogger`,
  `errorHandler`), env validation, and the HTTP entry point in `bin/`.
- Routes are not hand-written; they are produced by
  `bindContractToHono(app, contract, handlers)` where `handlers` are pure
  functions over `@repo/core` repositories.
- No longer exposes `db` / `app` / `env` to other packages — those belong
  in `@repo/core` (or stay private to the server bin).

### `apps/desktop`

```
apps/desktop/
├── src/
│   ├── main/
│   │   ├── index.ts          App lifecycle, window creation
│   │   ├── ipc.ts            Registers handlers via @repo/contracts
│   │   ├── db-bootstrap.ts   userData path, migrations, optional backups
│   │   ├── logger.ts         pino → file transport in app.getPath('logs')
│   │   └── updater.ts        update-electron-app integration
│   ├── preload/
│   │   └── index.ts          contextBridge: typed `window.bridge`
│   └── (no renderer dir — apps/web is reused as the renderer)
├── forge.config.ts
└── package.json              dependencies: @repo/core, @repo/contracts only
```

Hard rules:

- The main process **never** imports `@repo/server`. It imports
  `@repo/core/*` and `@repo/contracts` only.
- No HTTP server is started. Renderer ↔ main communication is IPC only.
- Database lives at `path.join(app.getPath('userData'), 'app.db')`.

### `apps/web`

- The same web build serves both the browser deployment and the Electron
  renderer.
- A small `transport` module decides at runtime whether to use HTTP or IPC:

  ```ts
  export const transport: Transport = window.bridge
    ? createIpcTransport(window.bridge)
    : createHttpTransport(import.meta.env.VITE_API_BASE_URL);
  ```

- Business code (TanStack Query hooks, forms) calls a typed client built
  from `@repo/contracts`. It never touches `axios` or `ipcRenderer`
  directly.

---

## End-to-End Data Flow

### Client side (renderer or browser)

```ts
const tasks = createClient(taskContract, transport);

const list = await tasks.list(); // type: Task[]
await tasks.create({ title: '...' }); // input typed via CreateTaskInput
```

### Transport abstraction

```ts
interface Transport {
  invoke<I, O>(channel: string, input: I): Promise<O>;
}
```

- HTTP transport: `POST /rpc/:channel` with `input` as JSON body.
- IPC transport: `window.bridge.invoke(channel, input)` →
  `ipcMain.handle(channel, ...)` in main.

### Server side

```ts
const taskHandlers = makeTaskHandlers(repos);

// HTTP adapter
bindContractToHono(app, taskContract, taskHandlers);

// IPC adapter
bindContractToIpc(ipcMain, taskContract, taskHandlers);
```

Both adapters validate input through the contract's Zod schema before
calling the handler. Handlers themselves are pure with respect to
transport.

---

## Electron Build Pipeline

### Forge owns the renderer build

`apps/desktop/forge.config.ts`:

```ts
plugins: [
  {
    name: '@electron-forge/plugin-vite',
    config: {
      build: [
        { entry: 'src/main/index.ts',    config: 'vite.main.config.ts',    target: 'main' },
        { entry: 'src/preload/index.ts', config: 'vite.preload.config.ts', target: 'preload' },
      ],
      renderer: [
        { name: 'main_window', config: 'vite.renderer.config.ts' }
      ],
    },
  },
],
```

`vite.renderer.config.ts` reuses the `apps/web` Vite config via
`mergeConfig`. `index.html` and `main.tsx` paths are pointed at the web
package.

Benefits:

- Dev mode: Forge starts the renderer dev server and wires HMR.
- Packaged mode: Forge places renderer output at
  `app.asar/.vite/renderer/main_window/`. The main process loads it via
  `MAIN_WINDOW_VITE_DEV_SERVER_URL` and `MAIN_WINDOW_VITE_NAME` globals
  injected by the plugin — no `__dirname` arithmetic across packages.

### Native modules: minimal surface

`better-sqlite3` is the only native module and lives only in the main
process. The Vite main config externalizes it:

```ts
// vite.main.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['better-sqlite3', /^node:/],
    },
  },
});
```

All pure-JS dependencies (drizzle, zod, pino, hono if used) are inlined
into `main.js`. The packaging hook only needs to copy the native module
and its transitive `bindings` / `file-uri-to-path`.

```ts
// forge.config.ts
packagerConfig: {
  asar: {
    unpack: '**/{*.node,better-sqlite3/**,bindings/**,file-uri-to-path/**}',
  },
  prune: false,
},
rebuildConfig: {
  onlyModules: ['better-sqlite3'],
  force: true,
  buildFromSource: true,
},
hooks: {
  packageAfterCopy: copyNativeModules([
    'better-sqlite3',
    'bindings',
    'file-uri-to-path',
  ]),
},
```

The hook implementation reuses the multi-path search and `dereference: true`
pattern documented in `electron-sqlite-packaging.md`.

### pnpm + Electron postinstall

`pnpm-workspace.yaml`:

```yaml
onlyBuiltDependencies:
  - esbuild
  - better-sqlite3
  - electron # restored: pnpm now runs Electron's postinstall
```

As a fallback for environments that skip workspace-level postinstall
hooks, `apps/desktop/package.json` declares:

```json
"scripts": {
  "postinstall": "node ../../node_modules/electron/install.js || true"
}
```

### Fuses

```ts
new FusesPlugin({
  version: FuseVersion.V1,
  [FuseV1Options.RunAsNode]: false,
  [FuseV1Options.EnableCookieEncryption]: true,
  [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
  [FuseV1Options.EnableNodeCliInspectArguments]: false,
  [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
  [FuseV1Options.OnlyLoadAppFromAsar]: true,
  [FuseV1Options.GrantFileProtocolExtraPrivileges]: false,
});
```

---

## Security Model

### Process isolation

```ts
new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true, // enable
    webSecurity: true,
  },
});
```

The preload script exposes a strict, allow-listed bridge:

```ts
contextBridge.exposeInMainWorld('bridge', {
  invoke: <I, O>(channel: string, input: I): Promise<O> => ipcRenderer.invoke(channel, input),
});
```

### IPC input validation

Every `ipcMain.handle` call validates input with the contract's Zod
schema before invoking the handler:

```ts
ipcMain.handle(channel, async (_event, raw) => {
  const input = contract[channel].input.parse(raw);
  return await handlers[channel](input);
});
```

A compromised renderer cannot bypass schema validation.

### Content Security Policy

`apps/web/index.html` declares a strict CSP that forbids inline scripts
and remote origins outside the configured API:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
/>
```

### Database file permissions

`db-bootstrap.ts` sets `0600` on the database file on first creation
(POSIX). On Windows the default user-scope ACL is sufficient.

---

## Observability

### Main process logs

```ts
const logFile = path.join(app.getPath('logs'), 'main.log');
const logger = pino({
  level: env.LOG_LEVEL,
  transport: { target: 'pino/file', options: { destination: logFile } },
});
```

Add an "Open Logs Folder" menu item that calls `shell.openPath(logsDir)`
so users can attach logs to bug reports.

### Renderer log forwarding

A dedicated `log:write` IPC channel forwards renderer errors and
unhandled rejections to the main process logger. The renderer's error
boundary calls it on caught errors.

### Crash reporting (optional)

`@sentry/electron` integrated in both main and renderer, tied to the
release version from `package.json`. Disabled by default; opt-in via
configuration.

---

## Releases and Updates

### Auto-update

`update-electron-app` in the main process:

```ts
import { updateElectronApp } from 'update-electron-app';
if (app.isPackaged) updateElectronApp({ logger });
```

Publishers:

- macOS / Windows: `@electron-forge/publisher-github` + the
  `update.electronjs.org` proxy.
- Linux: `maker-deb` and `maker-rpm`; auto-update is intentionally
  out of scope (distros own this).

### Database migrations

`@repo/core` exposes Drizzle migrations as a folder of SQL files. The
desktop main process runs them on startup:

```ts
const { db, sqlite } = createDb(dbPath);
migrate(db, { migrationsFolder: path.join(app.getAppPath(), 'migrations') });
```

Migration files are bundled as static resources inside `app.asar`,
guaranteeing they ship in lockstep with the app version.

### Version sourcing

`tooling/sync-version.mjs` propagates the root `package.json` version to
each workspace package on `prepublish`. The installer file name and the
in-app version display always agree.

---

## CI/CD

### Build matrix

```yaml
strategy:
  matrix:
    os: [macos-14, windows-latest, ubuntu-latest]
runs-on: ${{ matrix.os }}
```

Steps per platform:

```bash
pnpm install --frozen-lockfile
pnpm --filter @repo/config build
pnpm --filter @repo/core build
pnpm --filter @repo/contracts build
pnpm --filter @repo/server build
pnpm --filter @repo/web build
pnpm --filter @repo/desktop make
```

### Smoke test

A minimal Playwright + Electron test launches the packaged binary and
asserts the main UI renders:

```ts
const electronApp = await electron.launch({
  args: ['out/.../resources/app.asar'],
});
const window = await electronApp.firstWindow();
await window.waitForSelector('text=Tasks');
```

This catches "the binary itself does not start" regressions that unit
tests cannot.

### Code signing

CI provisions secrets for:

- macOS: `APPLE_ID`, `APPLE_TEAM_ID`, `APPLE_APP_SPECIFIC_PASSWORD`;
  Forge `osxSign` and `osxNotarize`.
- Windows: signing certificate stored in Azure Key Vault or equivalent.

---

## Developer Experience

### Turbo task graph

```jsonc
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "dependsOn": ["^build"], "cache": false, "persistent": true },
    "@repo/desktop#dev": {
      "dependsOn": ["@repo/web#build", "@repo/core#build", "@repo/contracts#build"],
      "cache": false,
      "persistent": true,
    },
    "@repo/desktop#package": {
      "dependsOn": ["@repo/web#build", "@repo/core#build", "@repo/contracts#build"],
    },
  },
}
```

### Top-level commands

| Command                | Effect                                                    |
| ---------------------- | --------------------------------------------------------- |
| `pnpm dev`             | Starts web dev server + HTTP server (browser development) |
| `pnpm dev:desktop`     | Forge dev: web HMR + main reload                          |
| `pnpm package:desktop` | Produces `.dmg` / `.exe` / `.deb` / `.rpm`                |

### Type checking gates

Any change to `@repo/contracts` triggers `tsc` in `web`, `server`, and
`desktop`, because contract type changes propagate along the import
graph. Pull requests fail when contracts and consumers disagree.

---

## Staged Execution Order

Each stage produces a working, testable, packageable state.

| Stage                                      | Goal                                                                                                                                                               | Verification                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| **1. Extract `@repo/core`**                | Move `db`, `repositories`, `services`, `models-sync` from `@repo/server` into `@repo/core`. Add subpath exports. `@repo/server` imports from `@repo/core`.         | `pnpm test` and `pnpm build` green. Browser app behavior unchanged.      |
| **2. Introduce `@repo/contracts`**         | Define `taskContract`, `providerContract`. Implement `bindContractToHono`. Refactor existing routes to use it.                                                     | All existing API tests still pass. `curl` of HTTP endpoints unchanged.   |
| **3. Transport abstraction in `apps/web`** | Add `transport/{http,ipc}.ts` and `createClient(contract, transport)`. Replace hand-written axios calls.                                                           | `apps/web` unit + Playwright tests pass. No regressions in browser mode. |
| **4. Rebuild `apps/desktop` main**         | Delete embedded HTTP server. Import `@repo/core` + `@repo/contracts`. Register IPC via `bindContractToIpc`. Database in `userData`. Drizzle migrations on startup. | Desktop app launches, IPC client works in dev mode. Smoke test passes.   |
| **5. Forge owns the renderer**             | Add `vite.renderer.config.ts` reusing `apps/web` config. Drop the manual `web/dist` copy hook. Use `MAIN_WINDOW_VITE_NAME`.                                        | `pnpm package:desktop` produces a working `.app` / `.exe` / `.deb`.      |
| **6. Hardening**                           | Restore `electron` postinstall. Trim `packageAfterCopy` to native modules only. Enable sandbox + CSP. Add Playwright smoke test in CI matrix.                      | Smoke test green on macOS, Windows, Linux runners.                       |
| **7. Releases**                            | `update-electron-app` integration. macOS notarization. Sentry (optional). Version sync script.                                                                     | Auto-update flow tested end-to-end on a staging release.                 |

---

## Long-Term Payoffs

- **Adding an endpoint**: edit `@repo/contracts` and `@repo/core`. HTTP,
  IPC, types, and validation are derived automatically.
- **Adding a transport** (WebSocket, gRPC, Tauri commands): write one
  adapter; business code is unchanged.
- **Replacing SQLite with Postgres**: change `@repo/core/db`. Server and
  desktop need no edits.
- **Adding a new client** (mobile, CLI): consume `@repo/core` and
  `@repo/contracts` directly.
- **Triaging packaging issues**: failure surface shrinks to a single
  native module, behind an officially-supported Forge integration path.
- **Testing**: business logic gets fast unit tests against in-memory
  SQLite in `@repo/core`. Transports are tested independently. The
  packaged binary is exercised by a Playwright smoke test per platform.

---

## References

- `docs/electron-sqlite-packaging.md` — native module packaging details
  shared by both the current and target architectures.
- [Electron Forge Vite plugin](https://www.electronforge.io/config/plugins/vite)
- [`update-electron-app`](https://github.com/electron/update-electron-app)
- [Drizzle migrations](https://orm.drizzle.team/docs/migrations)
- [`@sentry/electron`](https://docs.sentry.io/platforms/javascript/guides/electron/)
