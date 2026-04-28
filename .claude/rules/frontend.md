---
paths:
  - "apps/web/**/*.{tsx,ts,jsx,js,css,scss,less}"
  - "packages/ui/**/*.{tsx,ts,jsx,js,css,scss,less}"
---

# Frontend Development Rules

## Colors and Theming

All colors must be referenced from the theme configuration or design tokens. Hard-coded color values are not allowed.

**Forbidden:**

- Hex color values: `#000000`, `#ff0000`
- RGB/RGBA values: `rgb(0, 0, 0)`, `rgba(255, 0, 0, 0.5)`
- Named colors: `white`, `black`, `red`, `blue`
- HSL/HSLA values (except in theme config files)
- OKLCH values (except in theme config files)
- Tailwind arbitrary value colors: `text-[#ff0000]`, `bg-[rgb(0,0,0)]`
- Tailwind default color classes: `bg-red-500`, `text-blue-600`

**Correct approach:**

Reference colors through the shadcn/ui theme system. The exact usage is determined by the shadcn/ui theming conventions.

**Exceptions:**

- Theme configuration files (where CSS variable initial values are defined)
- Third-party library style overrides (when no theme variable is available)

## Component Reuse

Prefer existing UI libraries and components. Do not reinvent the wheel.

**Principles:**

- When a new UI element is needed, first check if `packages/ui` or shadcn/ui already has a suitable component
- If an existing component meets the requirement, use it directly or extend it. Do not rewrite from scratch
- If a custom component is truly needed, define it in `packages/ui` for reuse across applications
- Do not inline generic interactive components (modals, dropdowns, form controls, etc.) inside business pages
