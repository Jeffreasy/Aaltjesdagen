# Bereikbaarheid Design System Refactoring Plan

**Version:** 1.0  
**Created:** December 31, 2024  
**Project:** Aaltjesdagen Frontend - Design System Standardization  
**Status:** Architecture Phase - Implementation Ready

---

## Table of Contents

- [Bereikbaarheid Design System Refactoring Plan](#bereikbaarheid-design-system-refactoring-plan)
  - [Table of Contents](#table-of-contents)
  - [Executive Summary](#executive-summary)
    - [Scope](#scope)
    - [Component Inventory](#component-inventory)
    - [Goals](#goals)
  - [Current State Analysis](#current-state-analysis)
    - [Identified Inconsistencies](#identified-inconsistencies)
      - [1. Styling Approach](#1-styling-approach)
      - [2. Field Naming Inconsistencies](#2-field-naming-inconsistencies)
      - [3. Prose Style Duplication](#3-prose-style-duplication)
      - [4. Z-Index Usage](#4-z-index-usage)
      - [5. Missing TypeScript Interfaces](#5-missing-typescript-interfaces)
      - [6. No Component Documentation](#6-no-component-documentation)
      - [7. Backdrop-Filter Performance](#7-backdrop-filter-performance)
  - [Priority 1: High Impact Changes](#priority-1-high-impact-changes)
    - [1.1 Parkeersectie Tailwind → Scoped CSS Refactoring](#11-parkeersectie-tailwind--scoped-css-refactoring)
      - [Current State Analysis](#current-state-analysis-1)
      - [Refactoring Strategy](#refactoring-strategy)
    - [](#)

---

## Executive Summary

This document provides a comprehensive architectural design plan for refactoring the 8 Bereikbaarheid components to align with design system standards. The refactoring addresses inconsistencies in styling approaches, field naming, code duplication, and missing infrastructure (TypeScript interfaces, documentation, token systems).

### Scope

This plan covers **architectural design only**. No code implementation is included. All designs are implementation-ready for handoff to Code mode.

### Component Inventory

All components located in [`src/storyblok/visual/Bereikbaarheid/`](../src/storyblok/visual/Bereikbaarheid/):

1. [`BereikbaarHero.astro`](../src/storyblok/visual/Bereikbaarheid/BereikbaarHero.astro) - Uses scoped CSS ✅
2. [`EhboPosten.astro`](../src/storyblok/visual/Bereikbaarheid/EhboPosten.astro) - Uses scoped CSS ✅
3. [`InEnRondomDeBinnenstad.astro`](../src/storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro) - Uses scoped CSS ✅
4. [`OpenbaarVervoer.astro`](../src/storyblok/visual/Bereikbaarheid/OpenbaarVervoer.astro) - Uses scoped CSS ✅
5. [`Parkeersectie.astro`](../src/storyblok/visual/Bereikbaarheid/Parkeersectie.astro) - Uses Tailwind utilities ❌
6. [`ParkerenAutos.astro`](../src/storyblok/visual/Bereikbaarheid/ParkerenAutos.astro) - Uses scoped CSS ✅
7. [`StallenFietsen.astro`](../src/storyblok/visual/Bereikbaarheid/StallenFietsen.astro) - Uses scoped CSS ✅
8. [`Toegankelijkheid.astro`](../src/storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro) - Uses scoped CSS ✅

### Goals

- **Consistency**: Standardize styling approach, field naming, and patterns across all 8 components
- **Maintainability**: Extract shared code, create reusable utilities, establish clear patterns
- **Type Safety**: Add TypeScript interfaces for all Storyblok prop types
- **Documentation**: Create comprehensive component documentation
- **Performance**: Assess and optimize backdrop-filter usage
- **Scalability**: Establish token systems for animations and z-index values

---

## Current State Analysis

### Identified Inconsistencies

#### 1. Styling Approach
- **Issue**: 7/8 components use scoped CSS; [`Parkeersectie.astro`](../src/storyblok/visual/Bereikbaarheid/Parkeersectie.astro) uses Tailwind utilities
- **Impact**: Mixed approach complicates maintenance and team onboarding
- **Lines**: Parkeersectie uses inline classes like `class="card-base"`, `class="btn-accent"` instead of scoped styles

#### 2. Field Naming Inconsistencies

| Component | Title Field | Content Field | Notes |
|-----------|------------|---------------|-------|
| BereikbaarHero | `blok.title` | `blok.text` | Plain textarea |
| EhboPosten | `blok.title` | `blok.tekst` | Richtext ❌ |
| InEnRondomDeBinnenstad | `blok.title` | `blok.tekst` | Richtext ❌ |
| OpenbaarVervoer | `blok.title` | `blok.tekst` | Richtext ❌ |
| Parkeersectie | `blok.title` | `blok.content` | Plain text ❌ |
| ParkerenAutos | `blok.title` | `blok.tekst` | Richtext ❌ |
| StallenFietsen | `blok.title` | `blok.tekst` | Richtext ❌ |
| Toegankelijkheid | `blok.title` | `blok.tekst` | Richtext ❌ |

**Issue**: Three different naming patterns: `text`, `tekst`, and `content`  
**Recommendation**: Standardize on `tekst` (matches 6/8 components and Dutch locale)

#### 3. Prose Style Duplication

Each component contains ~100-120 lines of duplicated prose styling:
- Paragraph styles (`p`, `strong`)
- List styles (`ul`, `ol`, `li`)
- Link styles (`a`, `a:hover`)
- Heading styles (`h1`-`h6`, `h3` with special decorations)

**Duplication Example**:
```css
/* Found in ALL 7 scoped CSS components */
.prose-[variant] :global(p) { /* 15-20 lines */ }
.prose-[variant] :global(strong) { /* 3-5 lines */ }
.prose-[variant] :global(ul), :global(ol) { /* 10-12 lines */ }
.prose-[variant] :global(li) { /* 8-10 lines */ }
.prose-[variant] :global(a) { /* 10-15 lines */ }
.prose-[variant] :global(h1-h6) { /* 8-10 lines */ }
.prose-[variant] :global(h3) { /* 15-20 lines with decorations */ }
```

**Total Duplication**: Approximately **700-840 lines** across 7 components

#### 4. Z-Index Usage

Current z-index values used in components:
- Background layers: `z-index: -1`, `z-index: 0`
- Content layers: `z-index: 1`, `z-10`
- UI elements: `z-20`, `z-30`, `z-40`, `z-50`

**Issue**: Hardcoded values instead of using design system tokens  
**Available but unused**: CSS variables in [`global.css:164-174`](../src/styles/global.css) define `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-fixed`, `--z-modal-backdrop`, `--z-modal`, `--z-popover`, `--z-tooltip`

#### 5. Missing TypeScript Interfaces

**Issue**: No TypeScript interfaces defined for Storyblok component props  
**Impact**: No type safety, autocomplete, or validation for component data

#### 6. No Component Documentation

**Issue**: Zero documentation for component usage, props, variants, or examples  
**Impact**: Difficult for team members to understand component APIs and usage patterns

#### 7. Backdrop-Filter Performance

**Usage Count**: 8 occurrences across components
- `backdrop-filter: blur(16px)` - ParkerenAutos (line 66)
- `backdrop-filter: blur(12px)` - StallenFietsen (line 69), Toegankelijkheid (line 74), InEnRondomDeBinnenstad (line 86), BereikbaarHero (line 62), EhboPosten (line 77)
- `backdrop-filter: blur(8px)` - EhboPosten alert indicator (line 212)

**Issue**: No performance assessment documented; potential paint performance issues on lower-end devices

---

## Priority 1: High Impact Changes

### 1.1 Parkeersectie Tailwind → Scoped CSS Refactoring

**Objective**: Convert [`Parkeersectie.astro`](../src/storyblok/visual/Bereikbaarheid/Parkeersectie.astro) from Tailwind utility classes to scoped CSS to match other 7 components.

#### Current State Analysis

**Tailwind Classes Used** (lines 34-164):
```typescript
// Layout & Spacing
"section-spacing", "px-6", "relative", "overflow-hidden"
"max-w-5xl", "mx-auto", "z-10", "mb-8", "mb-10", "mt-10", "mt-12"

// Display & Flexbox
"flex", "justify-center", "items-center", "gap-4"

// Sizing
"w-20", "h-20", "w-96", "h-96", "w-72", "h-72", "h-11", "w-11", "h-5", "w-5", "h-6", "w-6", "h-px", "w-20"

// Background & Borders
"bg-gradient-to-br", "from-accent/5", "via-white", "dark:via-gray-900", "to-blue-50/20"
"bg-accent/5", "dark:bg-accent/10", "bg-blue-100/30", "dark:bg-blue-900/20"
"bg-gradient-to-br from-accent to-accent-dark", "bg-gradient-to-r from-transparent to-accent/30"
"rounded-2xl", "rounded-full", "border", "border-gray-200/50", "dark:border-gray-700/50"

// Typography
"text-3xl", "md:text-5xl", "font-black", "text-[var(--color-accent)]", "dark:text-gray-100"
"text-lg", "md:text-2xl", "text-gray-700", "dark:text-gray-300", "text-center"

// Shadows & Effects
"shadow-xl", "shadow-2xl", "hover:shadow-3xl", "drop-shadow-lg"

// Transforms & Transitions
"hover:scale-110", "hover:scale-105", "rotate-3", "transition-transform", "duration-300", "duration-500"

// Animations
"animate-pulse", "blur-3xl"

// State
"hover:*" (various hover states)

// Utilities from global.css
"card-base" (uses design system utility), "btn-accent" (uses design system utility)
```

#### Refactoring Strategy

**Phase 1: Create Scoped Style Block**

Add `<style>` block at end of component (after closing `</section>`):

```astro
<style>
  /* Convert all Tailwind classes to scoped CSS using design system tokens */
  .parking-section {
    /* Equivalent to: section-spacing px-6 relative overflow-hidden */
    position: relative;
    overflow: hidden;
    padding: var(--space-xl) var(--space-md);
  }
  
  @media (min-width: 768px) {
    .parking-section {
      padding: var(--space-3xl) var(--space-md);
    }
  }
  
  /* Continue for all styles... */
</style>
```

**Phase 2: Update HTML Classes**

Replace all Tailwind utility chains with semantic scoped class names:

```astro
<!-- Before -->
<div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-white dark:via-gray-900">

<!-- After -->
<div class="animated-background">

<!-- Scoped CSS -->
<style>
  .animated-background {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-accent), transparent 95%) 0%,
      var(--bg-base) 50%,
      color-mix(in srgb, var(--color-primary), transparent 97%) 100%
    );
  }
</style>
```

**Phase 3: Preserve Design System Utilities**

Keep references to global utilities that should remain:
- `.card-base` (from [`global.css`](../src/styles/global.css))
- `.btn-accent` (from [`global.css`](../src/styles/global.css))
- `section-spacing` (from [`global.css`](../src/styles/global.css))

**Phase 4: Map Responsive Patterns**

Convert responsive Tailwind modifiers to CSS media queries:

```css
/* Before: class="text-3xl md:text-5xl" */
.parking-title {
  font-size: 1.875rem; /* 3xl */
}

@media (min-width: 768px) {
  .parking-title {
    font-size: 3rem; /* 5xl */
  }
}
```

###