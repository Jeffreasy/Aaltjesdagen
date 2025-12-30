# Aaltjesdagen Design System Documentation

**Version:** 1.0  
**Last Updated:** December 29, 2024  
**Purpose:** Complete design system analysis for Navigation and Footer component development

---

## Table of Contents

1. [Design Tokens Overview](#design-tokens-overview)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Layout System](#layout-system)
6. [Component Patterns](#component-patterns)
7. [Animation & Transitions](#animation--transitions)
8. [Z-Index Hierarchy](#z-index-hierarchy)
9. [Glassmorphism Effects](#glassmorphism-effects)
10. [Responsive Design](#responsive-design)
11. [Dark Mode Implementation](#dark-mode-implementation)
12. [Usage Guidelines](#usage-guidelines)

---

## Design Tokens Overview

All design tokens are defined as CSS Custom Properties in [`src/styles/global.css`](src/styles/global.css). This ensures consistency across the application and enables theming capabilities.

**Access Pattern:**
```css
/* Use var() to access design tokens */
background-color: var(--color-primary);
color: var(--text-primary);
```

---

## Color System

### 1. Brand Colors

The Aaltjesdagen brand is built on three primary colors:

```css
--color-primary: #004b91;      /* Royal Blue - Main brand color */
--color-secondary: #f39200;    /* Vibrant Orange - Accent actions */
--color-accent: #50b0ae;       /* Teal - Supporting accent */
--color-accent-dark: #409190;  /* Dark Teal - Accent variant */
```

**Usage Examples:**
- **Primary:** Main CTAs, links, key UI elements
- **Secondary:** Attention-grabbing elements, warning badges
- **Accent:** Highlights, decorative elements, teaser sections

### 2. Theme System (Light Mode)

```css
/* Backgrounds */
--bg-base: #ffffff;                    /* Main background */
--bg-elevated: #fafbfc;                /* Card backgrounds */
--bg-overlay: rgba(255, 255, 255, 0.9); /* Glassmorphism overlays */

/* Text Colors */
--text-primary: #1a1a1a;    /* Primary text (body, headings) */
--text-secondary: #4b5563;  /* Secondary text (descriptions) */
--text-tertiary: #6b7280;   /* Tertiary text (captions, metadata) */
--text-inverse: #ffffff;    /* Text on dark backgrounds */

/* Borders */
--border-primary: rgba(0, 0, 0, 0.1);   /* Standard borders */
--border-secondary: rgba(0, 0, 0, 0.05); /* Subtle borders */

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

### 3. Theme System (Dark Mode)

```css
/* Backgrounds */
--bg-base: #0f172a;                     /* Slate-900 base */
--bg-elevated: #1e293b;                 /* Slate-800 elevated */
--bg-overlay: rgba(30, 41, 59, 0.95);   /* Dark overlay */

/* Text Colors */
--text-primary: #e5e7eb;    /* Light gray text */
--text-secondary: #9ca3af;  /* Medium gray text */
--text-tertiary: #6b7280;   /* Darker gray text */
--text-inverse: #1a1a1a;    /* Dark text on light backgrounds */

/* Borders */
--border-primary: rgba(255, 255, 255, 0.1);   /* Lighter borders */
--border-secondary: rgba(255, 255, 255, 0.05); /* Very subtle borders */

/* Shadows (more intense for depth) */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
```

### 4. Semantic Colors

Used for feedback and status indicators:

```css
--color-success: #10b981;  /* Green (Emerald-500) */
--color-error: #ef4444;    /* Red (Red-500) */
--color-warning: #f59e0b;  /* Amber (Amber-500) */
--color-info: #3b82f6;     /* Blue (Blue-500) */
```

### 5. Gray Scale

Branded neutral palette:

```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### 6. Text Contrast Colors

Accessible text colors for colored backgrounds:

```css
--text-on-primary: #ffffff;   /* White on primary blue */
--text-on-secondary: #ffffff; /* White on secondary orange */
--text-on-accent: #ffffff;    /* White on accent teal */
--text-on-success: #ffffff;
--text-on-error: #ffffff;
--text-on-warning: #111827;   /* Dark text on warning yellow */
```

### 7. Gradient System

#### Animated Background Gradients

**Light Mode:**
```css
--bg-gradient-base: linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #fff5f5 100%);
--bg-gradient-animated-1: radial-gradient(circle at 20% 50%, rgba(0, 75, 145, 0.12), transparent 50%);
--bg-gradient-animated-2: radial-gradient(circle at 80% 50%, rgba(199, 52, 47, 0.08), transparent 50%);
--bg-gradient-animated-3: radial-gradient(circle at 50% 80%, rgba(80, 176, 174, 0.1), transparent 50%);
```

**Dark Mode:**
```css
--bg-gradient-base: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1a1625 100%);
--bg-gradient-animated-1: radial-gradient(circle at 20% 50%, rgba(0, 75, 145, 0.25), transparent 50%);
--bg-gradient-animated-2: radial-gradient(circle at 80% 50%, rgba(199, 52, 47, 0.15), transparent 50%);
--bg-gradient-animated-3: radial-gradient(circle at 50% 80%, rgba(80, 176, 174, 0.2), transparent 50%);
```

#### Professional Background Gradients

```css
/* Subtle gradient for sections */
--bg-gradient-subtle: linear-gradient(135deg,
  rgba(249, 250, 251, 1) 0%,
  rgba(255, 255, 255, 1) 40%,
  rgba(248, 249, 250, 1) 100%);

/* Brand overlays (very subtle) */
--bg-brand-overlay-primary: linear-gradient(135deg,
  rgba(0, 75, 145, 0.015) 0%,
  transparent 50%,
  rgba(0, 75, 145, 0.01) 100%);

--bg-brand-overlay-accent: linear-gradient(135deg,
  transparent 0%,
  rgba(80, 176, 174, 0.02) 50%,
  transparent 100%);
```

---

## Typography System

### 1. Font Families

```css
--font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
```

**Usage:** System font stack ensures native feel and optimal performance.

### 2. Font Sizes

```css
/* Body Text Sizes */
--text-body-large: 1.125rem;    /* 18px - Large paragraphs */
--text-body-regular: 1rem;      /* 16px - Default body text */
--text-body-small: 0.875rem;    /* 14px - Small text */
--text-caption: 0.75rem;        /* 12px - Captions, metadata */
```

### 3. Heading Utilities

Pre-defined utility classes for consistent heading styles:

```css
/* Hero Heading - Maximum impact */
.heading-hero {
  @apply text-4xl md:text-7xl font-black tracking-tighter text-primary;
}

/* Section Heading - Major sections */
.heading-section {
  @apply text-3xl md:text-5xl font-extrabold tracking-tight;
}

/* Card Heading - Component titles */
.heading-card {
  @apply text-lg font-extrabold;
}
```

**Examples from codebase:**
- Hero: `text-4xl md:text-6xl lg:text-7xl font-bold` (lines 52 in Hero.astro)
- Section: `text-3xl md:text-5xl font-extrabold tracking-tight` (heading-section)
- Teaser: `text-3xl md:text-6xl font-black tracking-tight` (line 35 in Teaser.astro)

### 4. Line Heights

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;    /* Default for body text */
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### 5. Letter Spacing

```css
--tracking-tighter: -0.05em;  /* Tight headlines */
--tracking-tight: -0.025em;
--tracking-normal: 0;         /* Default */
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;     /* Badge text, labels */
```

### 6. Font Weight Patterns

Based on Tailwind classes observed:
- `font-medium` (500) - Secondary text, subtle emphasis
- `font-semibold` (600) - Metadata, info badges
- `font-bold` (700) - Strong emphasis, buttons
- `font-extrabold` (800) - Card titles, section headlines
- `font-black` (900) - Hero text, maximum impact

---

## Spacing System

### 1. CSS Custom Properties

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
```

### 2. Section Spacing Utilities

```css
/* Standard section spacing */
.section-spacing {
  @apply py-20 md:py-32;
}

/* Smaller section spacing */
.section-spacing-sm {
  @apply py-12 md:py-20;
}
```

**Usage in codebase:**
- Grid sections: `section-spacing` (Grid.astro line 14)
- Teaser sections: `section-spacing` (Teaser.astro line 21)
- Tussentekst: `section-spacing-sm` (Tussentekst.astro line 25)

### 3. Gap Patterns

Consistent gap usage across components:
- Navigation items: `gap-6` (24px)
- Flex containers: `gap-2` to `gap-4` (8-16px)
- Grid layouts: `gap-8 lg:gap-10` (32-40px)
- Meta info rows: `gap-3` to `gap-4` (12-16px)

---

## Layout System

### 1. Container Pattern

```css
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

**Usage:** Primary content container with responsive padding  
**Max Width:** 80rem (1280px)  
**Found in:** BaseLayout.astro (line 393)

### 2. Content Width Constraints

```css
--content-narrow: 42rem;   /* 672px - Blog posts */
--content-medium: 56rem;   /* 896px - Articles */
--content-wide: 64rem;     /* 1024px - Standard content */
--content-full: 80rem;     /* 1280px - Full layout */
```

**Usage Examples:**
- Centered text blocks: `max-w-4xl mx-auto` (Hero, Teaser)
- Content sections: `max-w-5xl mx-auto` (Teaser line 26)
- Modal content: `max-w-4xl` (ProgramModal line 29)

### 3. Grid Layouts

**Standard 3-Column Grid:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
```

Observed in: Grid.astro (line 78), Footer section

### 4. Flex Patterns

**Navigation Layout:**
```html
<div class="flex flex-col md:flex-row justify-between items-center gap-4">
```

**Centered Content:**
```html
<div class="flex items-center justify-center">
```

---

## Component Patterns

### 1. Card System

#### Base Card (.card-base)

```css
.card-base {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  overflow: hidden;
  transition: all var(--transition-slow);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(8px);
}

.card-base:hover {
  transform: translateY(-0.5rem);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}
```

**Usage Examples:**
- Feature cards (Feature.astro line 9)
- Tussentekst content (Tussentekst.astro line 28)
- Content containers

**Key Characteristics:**
- Elevated background for depth
- Hover lift animation (-0.5rem)
- Border color changes to primary on hover
- 16px border radius for modern feel
- Backdrop blur for glassmorphism

### 2. Button System

#### Primary Button (.btn-primary)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), #0066cc);
  color: var(--text-inverse);
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all var(--transition-base);
  box-shadow: 0 4px 14px 0 rgba(0, 75, 145, 0.25);
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px 0 rgba(0, 75, 145, 0.35);
}

.btn-primary:active {
  transform: scale(0.95);
}
```

**Usage:** Primary CTAs, main actions  
**Found in:** Tussentekst (line 48), ProgramModal (line 131)

#### Secondary Button (.btn-secondary)

```css
.btn-secondary {
  /* Same structure as primary */
  background: linear-gradient(135deg, var(--color-secondary), #d97f00);
  box-shadow: 0 4px 14px 0 rgba(243, 146, 0, 0.25);
}
```

#### Accent Button (.btn-accent)

```css
.btn-accent {
  /* Same structure as primary */
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  box-shadow: 0 4px 14px 0 rgba(80, 176, 174, 0.25);
}
```

**Button Characteristics:**
- Gradient backgrounds for depth
- Scale transform on hover (1.05×)
- Press effect on active (0.95×)
- Icon support with 0.5rem gap
- 12px border radius

### 3. Badge Components

#### Category Badge Pattern

```html
<span class="inline-block text-secondary font-bold text-sm uppercase tracking-widest px-4 py-2 bg-secondary/10 rounded-full">
  Category Name
</span>
```

**Observed in:**
- Feature cards (line 31-33 Feature.astro)
- ProgramModal (line 68-72)

#### Animated Badge (Featured/Live)

```html
<div class="inline-flex items-center gap-3 bg-gradient-to-r from-accent/10 to-accent/5 px-6 py-2 rounded-full border border-accent/20">
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
  </span>
  <span class="text-accent font-bold text-sm uppercase tracking-wider">Uitgelicht</span>
</div>
```

**Found in:** Teaser.astro (lines 27-33), Grid.astro (lines 19-28)

### 4. Meta Info Pills

**DateTime Display:**
```html
<div class="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs font-semibold bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
  <svg><!-- Clock icon --></svg>
  <span>{date}</span>
</div>
```

**Location Badge:**
```html
<div class="flex items-center gap-2 text-xs font-semibold bg-secondary/10 px-3 py-1.5 rounded-lg">
  <svg class="h-4 w-4 text-secondary"><!-- Location pin icon --></svg>
  <span>{location}</span>
</div>
```

**Pattern:** Icon + Text, rounded-lg (8px), small padding, semantic backgrounds

---

## Glassmorphism Effects

### 1. Base Glass Effect (.glass)

```css
.glass {
  background: var(--bg-overlay);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-secondary);
  box-shadow: var(--shadow-lg);
}
```

**Usage:**
- Navigation header (BaseLayout line 46)
- Filter bar (Grid.astro line 57)
- Floating UI elements

**Key Properties:**
- Semi-transparent background (`var(--bg-overlay)`)
- 12px backdrop blur for frosted glass effect
- Subtle border for definition
- Large shadow for elevation

### 2. Glass Dark Variant

```css
.glass-dark {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  /* Used for dark overlays on images */
}
```

**Found in:** Feature.astro (line 31) for category badges over images

---

## Animation & Transitions

### 1. Transition Timing

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Easing:** Custom cubic-bezier for smooth, natural motion

### 2. Common Transforms

**Hover Lift (Cards):**
```css
transform: translateY(-0.5rem);
```

**Scale Hover (Buttons):**
```css
transform: scale(1.05);
```

**Active Press:**
```css
transform: scale(0.95);
```

**Image Zoom:**
```css
transform: scale(1.1); /* On parent hover */
```

### 3. Animated Background Keyframes

**Float Animations:**
```css
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) scale(1) translateZ(0); }
  33% { transform: translate(50px, -50px) scale(1.1) translateZ(0); }
  66% { transform: translate(-30px, 30px) scale(0.95) translateZ(0); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) scale(1) translateZ(0); }
  33% { transform: translate(-60px, 40px) scale(1.05) translateZ(0); }
  66% { transform: translate(40px, -50px) scale(0.9) translateZ(0); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) scale(1) translateZ(0); }
  50% { transform: translate(30px, -40px) scale(1.08) translateZ(0); }
}
```

**Gradient Shift:**
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### 4. Alpine.js Transitions

**Modal Enter/Exit:**
```html
x-transition:enter="transition ease-out duration-300"
x-transition:enter-start="opacity-0"
x-transition:enter-end="opacity-100"
x-transition:leave="transition ease-in duration-200"
x-transition:leave-start="opacity-100"
x-transition:leave-end="opacity-0"
```

**Filter Animation:**
```html
x-transition:enter="transition ease-out duration-300"
x-transition:enter-start="opacity-0 scale-95"
x-transition:enter-end="opacity-100 scale-100"
```

### 5. Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Usage:** Automatically disables animations for accessibility

---

## Z-Index Hierarchy

### Complete Stacking Order

```css
--z-base: 0;           /* Default layer */
--z-dropdown: 10;      /* Dropdown menus */
--z-sticky: 20;        /* Sticky elements */
--z-fixed: 30;         /* Fixed navigation, header */
--z-modal-backdrop: 40; /* Modal backdrop/overlay */
--z-modal: 50;         /* Modal content */
--z-popover: 60;       /* Popovers, tooltips */
--z-tooltip: 70;       /* Highest priority UI */
```

### Usage in Codebase

- **Navigation Header:** `z-index: var(--z-fixed)` (BaseLayout line 46)
- **Filter Bar:** `z-30` (Grid.astro line 56)
- **Main Content:** `z-10` relative positioning (BaseLayout line 55)
- **Modal:** `z-[9999]` (ProgramModal lines 8, 27, 29)
- **Animated Background:** `z-index: -1` (global.css line 296)

**Note:** Modal uses z-[9999] for maximum priority; consider aligning with design system z-modal value.

---

## Responsive Design

### 1. Breakpoints

Based on Tailwind defaults:
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

### 2. Common Patterns

**Typography Scaling:**
```html
<h1 class="text-4xl md:text-6xl lg:text-7xl">
```

**Layout Changes:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

**Spacing Adjustments:**
```html
<section class="py-12 md:py-20">
```

**Flex to Stack:**
```html
<div class="flex flex-col md:flex-row items-center gap-4">
```

### 3. Mobile-First Approach

All base styles are mobile-first, with larger breakpoints adding complexity:
- Base: Mobile styles
- md: Tablet adjustments
- lg: Desktop enhancements

---

## Dark Mode Implementation

### 1. Activation Methods

**Manual Toggle:**
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.classList.add('dark');
```

**System Preference:**
```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
```

### 2. CSS Selectors

```css
:root[data-theme="dark"],
:root.dark {
  /* Dark mode variables */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Auto dark mode */
  }
}
```

### 3. Theme Toggle Component

**Location:** [`src/components/ui/ThemeToggle.astro`](src/components/ui/ThemeToggle.astro)

**Features:**
- Alpine.js reactivity
- localStorage persistence
- System preference detection
- Smooth icon transitions
- Accessible ARIA labels

**Styling:**
```css
.theme-toggle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  transition: all var(--transition-base);
}

.theme-toggle:hover {
  background: var(--bg-overlay);
  border-color: var(--color-primary);
  transform: scale(1.05);
}
```

### 4. Theme-Aware Utilities

Classes that respond to dark mode:
- `dark:text-gray-300` - Conditional text colors
- `dark:bg-gray-800` - Background adjustments
- `dark:border-gray-700/30` - Border opacity changes

---

## Geometric Patterns

### 1. Pattern Variables

```css
/* Grid Pattern */
--pattern-grid-size: 32px;
--pattern-grid-color: rgba(0, 75, 145, 0.04); /* Light mode */
--pattern-grid-color: rgba(255, 255, 255, 0.03); /* Dark mode */
--pattern-grid-width: 1px;

/* Dot Pattern */
--pattern-dot-size: 2px;
--pattern-dot-spacing: 24px;
--pattern-dot-color: rgba(0, 75, 145, 0.05); /* Light mode */
--pattern-dot-color: rgba(255, 255, 255, 0.04); /* Dark mode */

/* Diagonal Pattern */
--pattern-diagonal-size: 40px;
--pattern-diagonal-color: rgba(0, 75, 145, 0.03); /* Light mode */
--pattern-diagonal-color: rgba(255, 255, 255, 0.02); /* Dark mode */
--pattern-diagonal-width: 1px;
```

### 2. Pattern Utilities

**Grid Pattern (.pattern-grid):**
```css
.pattern-grid {
  background-image:
    linear-gradient(var(--pattern-grid-color) var(--pattern-grid-width), transparent var(--pattern-grid-width)),
    linear-gradient(90deg, var(--pattern-grid-color) var(--pattern-grid-width), transparent var(--pattern-grid-width));
  background-size: var(--pattern-grid-size) var(--pattern-grid-size);
}
```

**Dot Pattern (.pattern-dots):**
```css
.pattern-dots {
  background-image: radial-gradient(
    circle,
    var(--pattern-dot-color) var(--pattern-dot-size),
    transparent var(--pattern-dot-size)
  );
  background-size: var(--pattern-dot-spacing) var(--pattern-dot-spacing);
}
```

**Diagonal Pattern (.pattern-diagonal):**
```css
.pattern-diagonal {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent calc(var(--pattern-diagonal-size) - var(--pattern-diagonal-width)),
    var(--pattern-diagonal-color) calc(var(--pattern-diagonal-size) - var(--pattern-diagonal-width)),
    var(--pattern-diagonal-color) var(--pattern-diagonal-size)
  );
}
```

**Legacy Dot Pattern (.dot-pattern):**
```css
.dot-pattern {
  background-image: radial-gradient(circle, rgba(0, 75, 145, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

**Usage:** Footer (BaseLayout line 61), Grid sections (Grid.astro line 14)

### 3. Combined Professional Backgrounds

**Grid + Brand Overlay:**
```css
.bg-professional-grid {
  position: relative;
  background: var(--bg-gradient-subtle);
}
.bg-professional-grid::before { /* Brand overlay */ }
.bg-professional-grid::after { /* Grid pattern */ }
```

**Dots + Brand Overlay:**
```css
.bg-professional-dots { /* Same pattern with dots */ }
```

**Diagonal + Brand Overlay:**
```css
.bg-professional-diagonal { /* Same pattern with diagonal lines */ }
```

---

## Usage Guidelines

### 1. Navigation Component Requirements

Based on analysis of existing Navigation (lines 1-38 in Navigation.astro):

**Structure:**
```html
<nav class="flex flex-wrap items-center gap-6">
  <!-- Navigation items -->
  <ThemeToggle />
</nav>
```

**Link Styling:**
```css
.nav-link {
  color: var(--text-secondary);
  font-size: 0.875rem;  /* text-sm */
  font-weight: 500;     /* font-medium */
  transition: colors var(--transition-base);
}

.nav-link:hover {
  color: var(--color-secondary);
}
```

**Key Patterns:**
- Horizontal flex layout with wrapping
- 24px gap between items
- Theme toggle integrated at end
- Hover transitions to secondary color
- Small font size for compact layout

### 2. Footer Component Requirements

Based on analysis of existing Footer (lines 59-93 in BaseLayout.astro):

**Structure:**
```html
<footer class="relative bg-gradient-primary text-gray-100 py-16 overflow-hidden">
  <!-- Decorative pattern -->
  <div class="absolute inset-0 dot-pattern opacity-30"></div>
  
  <!-- Decorative top border (gradient stripe) -->
  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-primary"></div>
  
  <!-- Content -->
  <div class="container-custom relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <!-- Logo and description -->
      <!-- Quick links -->
      <!-- Contact info -->
    </div>
    
    <!-- Copyright -->
    <div class="border-t border-white/10 pt-8 text-center text-xs">
      <!-- Copyright text -->
    </div>
  </div>
</footer>
```

**Key Characteristics:**
- Dark gradient background (.bg-gradient-primary)
- Subtle dot pattern overlay (30% opacity)
- Decorative gradient top border
- 3-column grid layout
- Logo with brightness-0 invert for white version
- White/light gray text
- Navigation component reused in footer
- Centered copyright section

### 3. Component Composition Patterns

**Card with Image:**
```html
<div class="card-base group">
  <!-- Image with overlay -->
  <div class="relative h-48 overflow-hidden">
    <img class="group-hover:scale-110 transition-transform duration-700" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 opacity-0 group-hover:opacity-100"></div>
  </div>
  
  <!-- Content -->
  <div class="p-5">
    <!-- Title, meta, description, action -->
  </div>
</div>
```

**Section with Badge:**
```html
<section class="section-spacing">
  <div class="container-custom">
    <!-- Animated badge -->
    <div class="inline-flex items-center gap-3 bg-gradient-to-r from-accent/10 to-accent/5 px-6 py-2 rounded-full">
      <!-- Ping animation -->
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
      </span>
      <span class="text-accent font-bold text-sm uppercase">Label</span>
    </div>
    
    <!-- Section content -->
  </div>
</section>
```

### 4. Accessibility Patterns

**Focus States:**
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

**ARIA Labels:**
```html
<button aria-label="Toggle theme">
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
```

**Semantic HTML:**
- Use `<nav>` for navigation
- Use `<button>` for interactive elements
- Use proper heading hierarchy
- Include alt text for images

### 5. Performance Best Practices

**GPU Acceleration:**
```css
will-change: transform;
transform: translateZ(0);
```

**Backdrop Filter:**
```css
backdrop-filter: blur(12px);
/* Used sparingly for performance */
```

**Image Optimization:**
```html
<!-- Storyblok transformations -->
<img src="{url}/m/1600x900/filters:quality(80):format(webp)" />
```

---

## Component Development Checklist

When creating new Navigation or Footer components:

### Navigation
- [ ] Use `.glass` effect for sticky header behavior
- [ ] Implement responsive flex layout with wrapping
- [ ] Include `ThemeToggle` component
- [ ] Use `var(--text-secondary)` for default link color
- [ ] Hover transitions to `var(--color-secondary)`
- [ ] Set z-index to `var(--z-fixed)` for sticky positioning
- [ ] Ensure gap of 24px (gap-6) between items
- [ ] Support mobile menu collapse if needed
- [ ] Test with all viewport sizes

### Footer
- [ ] Use `.bg-gradient-primary` background
- [ ] Add `.dot-pattern` overlay at 30% opacity
- [ ] Include decorative top gradient border
- [ ] Implement 3-column grid (1 col mobile, 3 desktop)
- [ ] Invert logo colors for dark background
- [ ] Reuse Navigation component for quick links
- [ ] Add copyright section with border-top
- [ ] Use `text-gray-100` and `text-gray-200` for content
- [ ] Ensure proper spacing (py-16, gap-12)

### General
- [ ] Use CSS custom properties exclusively
- [ ] Test light and dark mode
- [ ] Verify reduced motion support
- [ ] Ensure keyboard navigation
- [ ] Add proper ARIA labels
- [ ] Check responsive breakpoints
- [ ] Validate accessibility with screen readers
- [ ] Optimize for performance

---

## Storyblok Integration Notes

The project integrates with Storyblok CMS for content management:

**Environment Check:**
```javascript
const isStoryblokEnabled = import.meta.env.DEV
```

**Visual Editor Support:**
```html
{isStoryblokEnabled && (
  <script is:inline src="https://app.storyblok.com/f/storyblok-v2-latest.js"></script>
)}
```

**Editable Blocks:**
```javascript
{...storyblokEditable(blok)}
```

**Image Transformations:**
```
{url}/m/{width}x{height}/filters:quality({quality}):format(webp)
```

---

## Alpine.js Integration

**CDN Link:**
```html
<script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
```

**Common Patterns:**

**Reactive State:**
```html
x-data="{ activeFilter: 'all', modalOpen: false }"
```

**Event Handling:**
```html
@click="toggle()"
@click.stop  <!-- Prevent bubbling -->
```

**Conditional Rendering:**
```html
x-show="modalOpen"
x-cloak  <!-- Hide until Alpine loads -->
```

**Transitions:**
```html
x-transition:enter="transition ease-out duration-300"
x-transition:enter-start="opacity-0"
x-transition:enter-end="opacity-100"
```

---

## File Organization

```
src/
├── styles/
│   └── global.css           ← Design tokens, utilities, animations
├── layouts/
│   └── BaseLayout.astro     ← Base layout with header/footer
├── components/
│   ├── layout/
│   │   └── Navigation.astro ← Navigation component
│   └── ui/
│       ├── ThemeToggle.astro ← Theme switcher
│       ├── ProgramModal.astro ← Modal component
│       └── Icon.astro       ← Icon component
├── storyblok/
│   ├── structural/
│   │   ├── Grid.astro       ← Grid layouts
│   │   └── Page.astro       ← Page components
│   └── visual/
│       ├── Hero.astro       ← Hero sections
│       ├── Feature.astro    ← Feature cards
│       ├── Teaser.astro     ← Teaser sections
│       └── Tussentekst.astro ← Text sections
└── pages/
    └── [...slug].astro      ← Dynamic routing
```

---

## Additional Resources

- **Tailwind Config:** [`tailwind.config.cjs`](tailwind.config.cjs) - Extends Tailwind with CSS variables
- **Global Styles:** [`src/styles/global.css`](src/styles/global.css) - Complete design token definitions
- **Base Layout:** [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) - Layout structure reference

---

## Version History

**v1.0** - December 29, 2024
- Initial comprehensive design system analysis
- Documented all design tokens and patterns
- Component usage guidelines established
- Navigation and Footer requirements defined

---

**End of Design System Documentation**

This documentation provides a complete reference for building Navigation and Footer components that align perfectly with the Aaltjesdagen design system. All color values, spacing, animations, and patterns are derived from the existing codebase analysis.