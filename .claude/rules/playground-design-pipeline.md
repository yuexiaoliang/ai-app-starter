---
paths:
  - 'apps/web/**/*.{tsx,ts,jsx,js,css,scss,less}'
---

# Playground Design Pipeline

For any **new feature** or **UI refactor** request that affects the frontend, the design must go through the Playground before landing in production pages.

## Workflow

```
User request (new UI / refactor UI)
        |
        v
  [Playground Phase]
  - Build 4 candidate variants
  - Each variant uses only frontend code (no backend changes)
  - Each variant keeps the project's existing visual language
  - Differentiate through layout, sizing, spacing, hierarchy
        |
        v
  [User Review Phase]
  - Notify user that candidates are ready in /playground
  - Wait for explicit selection
        |
        v
  [Apply Phase]
  - Implement the chosen variant in the target page/component
  - Remove temporary playground entries
```

## Candidate Requirements

**Exactly 4 variants.** No more, no less. If the design space is narrow, vary:

- **Layout density** — compact vs. airy spacing
- **Information hierarchy** — prominence of primary vs. secondary actions
- **Container structure** — cards, lists, tables, or inline layouts
- **Interaction surface** — button placement, tap targets, form grouping

**Constraints on all variants:**

- Colors must use the existing shadcn/ui theme tokens (`bg-primary`, `text-muted-foreground`, etc.)
- Typography must use the existing Tailwind scale (`text-sm`, `text-lg`, `font-semibold`, etc.)
- Components must reuse existing shadcn/ui primitives (`Button`, `Card`, `Input`, `Badge`, etc.)
- No new dependencies, no new CSS variables, no new design tokens

## Playground Integration

Add candidates as a new group in `apps/web/src/pages/playground.tsx` under `componentGroups`:

```ts
{
  id: '<feature-name>',
  label: '<Feature Label>',
  components: [
    {
      name: 'Variant A — Compact',
      description: 'Dense layout with minimal whitespace.',
      variants: [{ name: 'Preview', render: <YourComponent /> }],
    },
    {
      name: 'Variant B — Spacious',
      description: 'Generous padding and clear visual separation.',
      variants: [{ name: 'Preview', render: <YourComponent /> }],
    },
    // ... 4 total
  ],
}
```

Each variant is a self-contained `ComponentDemo` with a single `ComponentVariant` named `"Preview"`.

## User Selection

After building the 4 candidates:

1. Ensure the dev server is running (`pnpm --filter @repo/web dev`)
2. Notify the user that candidates are live at `/playground`
3. **Do not proceed to the target page until the user explicitly picks one**

The user reviews the variants directly in the Playground and selects one.

## Post-Selection Cleanup

Once a variant is chosen and applied to the production page:

- Remove the temporary group from `playground.tsx`
- Run `pnpm --filter @repo/web typecheck && pnpm --filter @repo/web lint`
