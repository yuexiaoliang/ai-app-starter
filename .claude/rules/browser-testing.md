---
paths:
  - 'apps/web/**/*.{tsx,ts,jsx,js,css,scss,less}'
---

# Browser Testing Policy

This rule defines when to use chrome-devtools MCP for visual and interaction testing, and when to skip it. The goal is to catch rendering bugs, animation glitches, and responsive layout issues that unit tests and static analysis cannot detect — without wasting tokens on trivial changes.

## Core Principle

**Test in the browser only when the code change affects something that can break visually or interactively in ways TypeScript and unit tests cannot catch.**

If a change is fully covered by type checking, unit tests, or E2E tests, do not open the browser.

---

## Decision Matrix

For each frontend change, evaluate both the **module** and the **change type**.

### Modules Requiring Browser Tests

| Module                                              | Always Test When                                                                                | Skip When                                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `components/ui/dialog.tsx` (`AnimatedDialog`)       | Modifying animation variants (`scale`, `fade`, `transition`), overlay behavior, or portal logic | Renaming props, refactoring types, extracting sub-components without logic change |
| `components/ui/sheet.tsx`                           | Modifying animation durations, side variants, overlay styles, or scroll lock behavior           | Same as above                                                                     |
| `components/infinite-list.tsx`                      | Changing scroll thresholds, container vs window scroll logic, or load-more trigger conditions   | Changing text labels, adding CSS classes                                          |
| `components/layout.tsx`                             | Modifying `AnimatePresence` config or page transition animation parameters                      | Changing wrapper className                                                        |
| `store/use-theme.ts`, `components/theme-toggle.tsx` | Any change to theme resolution, class toggling, or `matchMedia` handling                        | None — always test                                                                |
| `pages/playground.tsx`                              | Adding or modifying component group variants                                                    | Removing entries after selection                                                  |
| `pages/providers.tsx`                               | Modifying search/sort/filter interaction, `ModelDetailDialog` behavior, or provider card layout | Changing static text, updating API endpoints                                      |
| `pages/settings.tsx`                                | Modifying form validation UX, connection test flow, or status indicator behavior                | Changing field labels, reordering sections                                        |
| `components/mobile-nav.tsx`                         | Any change to Sheet trigger, navigation links, or close behavior                                | None — always test                                                                |
| `components/navbar.tsx`                             | Modifying layout, responsive hiding logic, or nav link rendering                                | Changing link labels                                                              |

### Change Types That Always Trigger Browser Tests

Regardless of module, open the browser if the change involves:

1. **New animations or transitions** — CSS animations, Motion variants, Radix state transitions
2. **Scroll behavior changes** — custom scroll containers, infinite scroll, scroll-linked effects
3. **Responsive layout modifications** — new breakpoints, `hidden`/`block` toggles, mobile-specific rendering
4. **Theme or color system changes** — new CSS variables, theme token usage, dark mode logic
5. **Overlay or modal behavior** — z-index changes, focus trapping, body scroll lock, nested portals
6. **New pages or major component refactors** — anything where the Playground Design Pipeline was invoked

### Change Types That Never Require Browser Tests

Do not open the browser for:

- Pure type changes (interfaces, Zod schemas, prop types)
- Logic-only refactoring with no visual output change
- Text content updates (labels, descriptions, error messages)
- API endpoint URL changes
- Adding or updating unit/E2E tests
- Dependency version bumps with no API change
- Removing dead code

---

## Required Test Actions

When the decision matrix says "test", perform the following:

1. **Start the dev server** inside the `ai-app-starter` tmux session if not already running
2. **Navigate to the affected page** via chrome-devtools MCP
3. **Take a screenshot** of the initial state
4. **Exercise the affected interaction** (open dialog, toggle theme, scroll, resize window)
5. **Take a screenshot after interaction**
6. **Run Lighthouse snapshot audit** if the change could affect a11y or best practices (theme changes, new interactive elements)

If any visual anomaly, animation glitch, layout breakage, or a11y warning is found, fix it before considering the task complete.

---

## When to Update This Rule

Update this file when any of the following occurs:

1. **A new module type is introduced** that has visual or interactive complexity (e.g., a new charting library, canvas-based renderer, drag-and-drop system)
2. **A testing gap is discovered** — a bug ships to production that would have been caught by browser testing but was not covered by this rule's decision matrix
3. **A module is removed or refactored beyond recognition** — remove stale entries and adjust change type triggers accordingly
4. **The project adds a new testing layer** (e.g., visual regression with Chromatic, component testing with Storybook test runner) that changes the value proposition of manual browser tests
5. **After 3 months of project activity** — review the rule against actual bug patterns and tighten or loosen thresholds as needed

When updating, follow the existing format: preserve the decision matrix structure, keep entries specific and actionable, and justify the change in the commit message.
