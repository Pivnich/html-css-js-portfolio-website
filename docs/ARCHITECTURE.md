# Project Architecture

This document describes the modular structure of the portfolio website.

## Styles (SCSS)

All styles are organized in the `src/styles/` directory with a modular approach:

### Main entry point

- **`bundle.scss`** — imports all style modules using `@use` directive

### Style modules

- **`_variables.scss`** — CSS custom properties (colors, sizing, theme variables)
- **`_global.scss`** — global resets, typography, and general styles
- **`_buttons.scss`** — button and theme toggle styles
- **`_navigation.scss`** — desktop nav, hamburger menu, and menu links
- **`_modal.scss`** — modal dialog and overlay styles
- **`_back-to-top.scss`** — back-to-top floating button styles
- **`_accordion.scss`** — accordion/collapsible section styles
- **`globals.scss`** — remaining layout, sections, and page-specific styles

### Why modular?

- **Maintainability**: Easy to locate and modify specific component styles
- **Reusability**: Components can be imported independently
- **Scalability**: Simple to add new components or themes
- **Performance**: Only necessary styles are compiled

## Scripts (TypeScript)

All JavaScript functionality is organized in the `src/scripts/` directory:

### Main entry point

- **`main.ts`** — imports and initializes all modules

### Script modules (in `src/scripts/modules/`)

- **`accordion.ts`** 
  - Accordion item expand/collapse logic
  - Smooth scrolling with hamburger menu offset
  - Video pause functionality
  - Exports: `openAccordion()`, `closeAccordion()`

- **`back-to-top.ts`**
  - Back-to-top button visibility toggle
  - Throttled scroll listener (100ms)
  - Smooth scroll-to-top functionality
  - Exports: `backToTopBtn`

- **`modal.ts`**
  - Modal dialog toggle
  - Content injection
  - Click handlers for modal triggers
  - Exports: `toggleModal()`, `setModalContent()`

- **`menu.ts`**
  - Hamburger menu toggle
  - Icon animation (hamburger to X)
  - Propagates to all menu toggle triggers
  - Exports: `toggleMenu()`

### Why modular?

- **Separation of concerns**: Each module handles one feature
- **Type safety**: Full TypeScript with strict typing
- **Tree-shaking**: Unused functions can be removed during bundling
- **Testability**: Easy to unit test individual modules
- **Readability**: Smaller files are easier to understand

## AOS (Animate On Scroll)

Initialized globally in `main.ts`:

```typescript
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()
```

## Adding new features

### New style component

1. Create `src/styles/_component-name.scss`
2. Import in `bundle.scss`: `@use './component-name' as *;`

### New interactive feature

1. Create `src/scripts/modules/feature-name.ts`
2. Import and initialize in `main.ts`: `import './modules/feature-name'`
3. Export functions if needed for external use

## Build process

```bash
npm run build      # Production build
npm run dev        # Development with hot reload
npm run type-check # TypeScript type checking
npm run preview    # Preview production build locally
```

## Key improvements over monolithic approach

| Aspect | Before | After |
|--------|--------|-------|
| **File size** | 1160 lines (SCSS) | ~80-150 lines each |
| **Code location** | Single large file | Organized modules |
| **Changes impact** | Entire file in editor | Specific module |
| **Dependency tracking** | Implicit | Explicit imports |
| **Type safety** | No (JS) | Full (TS modules) |
| **Maintainability** | Complex | Simple |
