# Phase 3: Web Frontend Development

> **Prerequisites**: Phase 1 (Monorepo skeleton) completed, Phase 2 (Server-side) completed. **Output**: Independently runnable Web frontend application, including homepage and settings page.

---

## Execution Prompt

```
Develop the Web frontend application in the @repo/web package. Prerequisites: Phase 1/2 completed.

## Tech Stack
- React 19 + Vite (latest, build tool)
- TanStack Query v5 (server state management, API caching)
- Zustand (client-side global state, UI state)
- shadcn/ui (UI component library)
- Tailwind CSS v4 (styling)
- React Router v7 (declarative mode, only uses <BrowserRouter> + <Routes>, does not enable framework features like file-based routing or SSR)
- react-hook-form + @hookform/resolvers (form validation)
- zod (validation schema imported from `@repo/config`)

## State Management Division (Important)
- **TanStack Query**: Responsible for all server-side data (API requests, caching, invalidation, optimistic updates)
- **Zustand**: Responsible for client-side UI state (theme toggle, sidebar switch)
- Prohibited: caching server-side data in Zustand; managing UI state in TanStack Query

## Feature Requirements

### 1. Foundation Architecture
- Vite dev server (port 13002, using `DEFAULT_WEB_PORT` from `@repo/config`; Vite config `strictPort: false`, automatically finds an available port if occupied)
- React Router v7 library mode routing configuration
- TanStack Query Provider + QueryClient configuration (global `staleTime: 30_000`; for real-time data, set shorter staleTime or refetchInterval individually)
  - Homepage health check recommendation: `staleTime: 5_000, refetchInterval: 30_000` (no duplicate requests within 5 seconds, auto-refresh every 30 seconds)
- Zustand store initialization (theme mode state + sidebar switch; theme persisted to `localStorage`, sidebar switch **not** persisted)
- shadcn/ui initialization: `pnpm dlx shadcn@latest init --yes --template vite --base-color zinc`; components installed on demand via `pnpm dlx shadcn add <component>` (e.g. button, card, input, sheet, label, switch). If peer dependency conflicts occur, append `--legacy-peer-deps`
- Tailwind CSS v4 configuration (Zinc primary color)
- **API Client encapsulation**:
  - Create axios instance, uniformly configure baseURL (read from `localStorage` `api-base-url`, default value references `DEFAULT_API_BASE_URL` from `@repo/config`)
  - **API Key auto-acquisition**: on page load, check URL parameter `?api-key=xxx`
    - Has value -> store in `localStorage` (key is `api-key`), then use `history.replaceState` to remove the parameter from URL (avoid leaking when sharing)
    - No value -> keep the existing key in `localStorage`
  - Request interceptor: read from `localStorage.getItem('api-key')`, if present automatically attach `x-api-key` header
    - **Security Note**: This method is only suitable for development / single-machine / trusted network environments. `localStorage` storage of key poses XSS theft risks for public internet deployments; production public deployments should replace with Cookie or OAuth based solutions
  - Response interceptor: unified error handling. When server returns `ApiResponse` failure envelope, extract `error.code` (e.g. `UNAUTHORIZED`, `RATE_LIMITED`, `VALIDATION_FAILED`) for targeted prompts; network errors get a unified prompt
  - Wrap API calls via TanStack Query's `queryFn`, direct axios usage is prohibited (implementation: `fetchHealth` / `fetchTasks` etc. API functions -> called inside `queryFn`)

### 2. Theme System
- Light/dark theme toggle (localStorage persistence)
- Follow system theme (prefers-color-scheme)

### 3. Pages (Phase 3a: Homepage + Basic Skeleton)

#### Homepage (/)
- Welcome copy + quick start guide area
- **Server health status panel**: calls `GET /api/health`, wrapped via TanStack Query `queryFn`
  - Shows status dot (connected / not connected / connection failed)
  - Version number, server timestamp
  - Manual refresh button

### 4. Pages (Phase 3b: Settings Page + Responsive)

#### Settings Page (/settings)
- **Server Configuration**:
  - Server address input (zod URL validation, schema imported from `@repo/config`)
  - Test connection button (calls `/api/health` to verify connectivity)
  - Connection status display (connected / not connected / connection failed)
- **Authentication Status**:
  - Shows current API Key authentication status (authenticated / not authenticated)
  - When not authenticated, prompts "Please copy the access URL from the server startup log, or manually enter the API Key"
  - Provides manual API Key input entry (optional, for re-authentication after localStorage is cleared)
- **About Section** (settings page bottom footer, not a separate page):
  - App name and version both read from `@repo/config` (`APP_NAME` + `APP_VERSION`), ensuring single source of truth for frontend-backend version
  - Repository address link

### 5. Layout (Phased Implementation)

**Phase 3a**:
- Top navigation bar (Logo + nav links + theme toggle button)
- Page content area centered, max width 1200px

**Phase 3b**:
- Mobile responsive: below md breakpoint switches to drawer-style side navigation (using shadcn/ui Sheet)
- **Responsive breakpoints**: Tailwind CSS standard breakpoints
  - `sm:` (>= 640px) — small screen adaptation
  - `md:` (>= 768px) — mobile drawer navigation switch
  - `lg:` (>= 1024px) — desktop layout
  - `xl:` (>= 1280px) — large screen adaptation

## Development Rules
- All API calls must go through TanStack Query; bare axios usage is prohibited
- Forms use zod + react-hook-form validation; zod schema imported from `@repo/config`
- Core logic (API Client, Store) covered by vitest unit tests
- UI page paths covered by Playwright E2E tests
- Complex interactions and visual verification use chrome-devtools MCP as needed (see `mcp-testing-guide.md`)

## Extension Guide: How to Add New Pages

Standard workflow for adding new frontend functionality after forking:

1. **Route**: Add new path and lazy-loaded component in React Router `routes.tsx` (or route config)
2. **Navigation**: Add corresponding link in navigation component (top bar / drawer)
3. **API Function**: Create `fetchXxx` function in API Client directory, using axios instance + `@repo/config` zod schema for response validation
4. **Query Hook**: Create `useXxxQuery` / `useXxxMutation` TanStack Query hook, encapsulating API function, handling loading / error / refetch states
5. **Page Component**: Create page component, internally consuming server data via Query hook, consuming UI state via Zustand
6. **Form (if needed)**: Use `react-hook-form` + `@repo/config` zod schema (`zodResolver`), do not define validation rules independently
7. **Tests**: API function unit tests, Store unit tests; page-level interactions covered by Playwright E2E; complex scenarios spot-checked with MCP as needed

> Schema for new pages must be placed in `@repo/config` first, then shared by frontend and backend; defining API validation rules independently in `@repo/web` is prohibited.

## Phase 3a Acceptance Requirements
- `pnpm --filter @repo/web dev` starts and is accessible
- Routing normal: homepage `/` loads, settings page `/settings` can switch
- Homepage displays server connection status (calls `/api/health`, goes through envelope)
- Top navigation bar + theme toggle button present
- Light/dark theme toggle + localStorage persistence + follows system (prefers-color-scheme)

## Phase 3b Acceptance Requirements
- Settings page form: URL input zod validation, test connection button calls `/api/health`
- Form validation schema imported from `@repo/config`, not defined independently
- Mobile drawer navigation appears below md breakpoint, desktop shows top navigation
- Settings page footer: app name and version both read from `@repo/config` (`APP_NAME` + `APP_VERSION`), repository link correct
- Playwright E2E: settings page form submission, mobile navigation (viewport switch), theme toggle persistence
- (Optional) chrome-devtools MCP spot-check for complex interactions or visual details (see `mcp-testing-guide.md`)
```

---

## Acceptance Criteria

### Phase 3a

- [ ] `pnpm --filter @repo/web dev` starts normally, homepage `/` is accessible

- [ ] Homepage displays server health status (including version number, timestamp), manual refresh works

- [ ] Light/dark theme toggle works (localStorage persistence + follows system preference)

- [ ] Top navigation bar + nav links work normally

- [ ] All API calls go through TanStack Query, axios is encapsulated inside queryFn

- [ ] vitest unit tests: API Client construction, Store state

- [ ] Playwright E2E: homepage loading, health status display, theme toggle

### Phase 3b

- [ ] Settings page route `/settings` works normally

- [ ] Settings page server address input + URL validation + test connection works

- [ ] Form validation uses `@repo/config`'s zod schema

- [ ] Mobile drawer navigation appears below md breakpoint, hidden on desktop

- [ ] Settings page footer: app name and version both read from `@repo/config` (`APP_NAME` + `APP_VERSION`), repository link correct

- [ ] Playwright E2E: settings page form submission, mobile navigation (viewport switch), theme toggle persistence

- [ ] (Optional) chrome-devtools MCP spot-check for complex interactions or visual details (see `mcp-testing-guide.md`)

- [ ] `pnpm build && pnpm test && pnpm lint` passes in full

### Minimal Test Case Suite

#### vitest Unit Test Cases

- **API Client Unit Tests**:
  - axios instance baseURL is correct at construction time (default `DEFAULT_API_BASE_URL`, reads from localStorage when present)
  - On page load, URL parameter `?api-key=xxx` is automatically stored in localStorage and removed from URL
  - Request interceptor correctly attaches `x-api-key` header (attaches when localStorage has value, does not attach when empty)
  - Response interceptor correctly handles `ApiResponse` failure envelope (dispatches different error prompts by `error.code`) and network errors
- **Zustand Store Unit Tests**:
  - Theme toggle state change + localStorage persistence
  - Sidebar switch state change (not persisted to localStorage)
  - System theme preference listening (`matchMedia('(prefers-color-scheme: dark)')`)

#### Playwright E2E Cases

The following page paths must be covered at minimum in Phase 3:

- **Homepage (**`/`**)**:
  - Page loads normally, health status panel displays server version number and timestamp
  - After server stops, manual refresh shows "Not connected" status
  - Manual refresh button triggers a new request
- **Theme Toggle**:
  - Click theme toggle button, page light/dark mode switches
  - After refreshing the page, theme persists (localStorage persistence)
- **Settings Page (**`/settings`**)**:
  - Form submit button is disabled or shows error when invalid URL is entered
  - After entering a valid URL and clicking "Test Connection", status shows "Connected"
  - Footer displays correct `APP_NAME` and `APP_VERSION`
- **Mobile Navigation**:
  - Viewport switched to `375x667`, drawer navigation button appears
  - Click button to expand drawer, nav links are clickable and navigate
