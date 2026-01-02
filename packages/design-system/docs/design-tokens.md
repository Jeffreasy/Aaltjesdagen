# Design Tokens Reference

Complete reference for all design tokens in the Aaltjesdagen Design System. These tokens ensure visual consistency and enable easy theming throughout your application.

## Table of Contents

- [Color System](#color-system)
- [Typography](#typography)
- [Spacing](#spacing)
- [Shadows](#shadows)
- [Z-Index Hierarchy](#z-index-hierarchy)
- [Borders & Radius](#borders--radius)
- [Transitions & Timing](#transitions--timing)

---

## Color System

The Aaltjesdagen color system is designed to be **breathable** and **sophisticated**, with full WCAG AA accessibility compliance.

### Brand Colors

#### Primary (Teal)

The primary color conveys **trust**, **calm**, and **sophistication**.

| Token | Value | Contrast Ratio | Usage |
|-------|-------|----------------|-------|
| `--color-primary` | `#267270` | 4.52:1 ✅ | Main brand color, links, primary actions |
| `--color-primary-dark` | `#257370` | 4.6:1 ✅ | Hover states, pressed buttons |
| `--color-primary-light` | `#50b0ae` | 2.56:1 ⚠️ | Decorative only (not for text) |
| `--color-primary-text` | `#267270` | 4.52:1 ✅ | Text highlights in light mode |

**Tailwind Classes:**
```css
bg-primary          /* Background: primary color */
text-primary        /* Text: primary color */
border-primary      /* Border: primary color */
text-primary-light  /* Text: light variant */
```

**Usage Examples:**

```html
<!-- Primary button -->
<button class="bg-primary hover:bg-primary-dark text-white">
  Click Me
</button>

<!-- Primary text highlight -->
<p class="text-primary">
  Important information
</p>

<!-- Gradient with primary -->
<h1 class="gradient-primary-accent bg-clip-text text-transparent">
  Hero Heading
</h1>
```

#### Accent (Coral/Red)

The accent color is used for **calls-to-action** and **important highlights**.

| Token | Value | Contrast Ratio | Usage |
|-------|-------|----------------|-------|
| `--color-accent` | `#C0392B` | 5.8:1 ✅ | CTAs, alerts, emphasis |
| `--color-accent-dark` | `#A93226` | 6.5:1 ✅ | Hover states for accent buttons |
| `--color-accent-light` | `#ff7e67` | 2.4:1 ⚠️ | Decorative only |

**Tailwind Classes:**
```css
bg-accent           /* Background: accent color */
text-accent         /* Text: accent color */
border-accent       /* Border: accent color */
```

**Usage Examples:**

```html
<!-- Accent CTA button -->
<button class="btn-accent">
  Tickets Kopen
</button>

<!-- Accent badge -->
<span class="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
  Nieuw
</span>
```

### Semantic Colors

#### Success

| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#4caf50` | Success messages, confirmations |

```html
<div class="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-xl">
  ✅ Je ticket is succesvol geboekt!
</div>
```

#### Error

| Token | Value | Usage |
|-------|-------|-------|
| `--color-error` | `#e57373` | Error messages, warnings, medical indicators |

```html
<div class="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl">
  ❌ Er ging iets mis. Probeer het opnieuw.
</div>
```

#### Warning

| Token | Value | Usage |
|-------|-------|-------|
| `--color-warning` | `#ffa726` | Warnings, notices |

```html
<div class="bg-warning/10 border border-warning/20 text-warning px-4 py-3 rounded-xl">
  ⚠️ Let op: beperkte beschikbaarheid
</div>
```

### Background Colors

#### Light Mode (Default)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#f5fafa` | Page background (teal-tinted white) |
| `--bg-elevated` | `#ffffff` | Cards, modals, elevated surfaces |
| `--bg-overlay` | `rgba(255, 255, 255, 0.9)` | Glass effects, overlays |

**Design Note**: Light mode uses a subtle teal tint (`#f5fafa`) instead of pure white to avoid a "clinical" feel and maintain brand cohesion.

#### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#0f1717` | Page background (dark teal) |
| `--bg-elevated` | `#1a2626` | Cards, modals, elevated surfaces |
| `--bg-overlay` | `rgba(26, 38, 38, 0.95)` | Glass effects, overlays |

**Tailwind Classes:**
```css
bg-base        /* Responsive to theme */
bg-elevated    /* Responsive to theme */
```

**Usage:**

```html
<!-- Card with elevated background -->
<div class="bg-elevated rounded-xl p-6">
  Content
</div>

<!-- Glass overlay -->
<div class="glass p-6">
  Glassmorphic content
</div>
```

### Text Colors

#### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#2c3e50` | Headings, primary content |
| `--text-secondary` | `#546e7a` | Body text, descriptions |
| `--text-tertiary` | `#78909c` | Captions, metadata |
| `--text-inverse` | `#ffffff` | Text on dark backgrounds |

#### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#f8fbfb` | Headings, primary content |
| `--text-secondary` | `#a0b2b2` | Body text, descriptions |
| `--text-tertiary` | `#607d8b` | Captions, metadata |
| `--text-inverse` | `#0f1717` | Text on light backgrounds |

**Tailwind Classes:**
```css
text-text-main   /* Maps to --text-primary */
text-text-sub    /* Maps to --text-secondary */
```

### Gradients

Pre-defined gradient utilities for consistent brand application:

#### Primary → Accent Gradient

```css
.gradient-primary-accent {
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}
```

**Usage:**
```html
<h1 class="gradient-primary-accent bg-clip-text text-transparent">
  Gradient Text
</h1>
```

#### Accent → Primary Gradient

```css
.gradient-accent-primary {
  background: linear-gradient(90deg, var(--color-accent), var(--color-primary));
}
```

#### Tri-Color Gradient

```css
.gradient-tri-color {
  background: linear-gradient(90deg,
    var(--color-primary) 0%,
    var(--color-accent) 50%,
    var(--color-secondary) 100%);
}
```

### Animated Background Gradients

These are used by the `.bg-animated` system:

```css
/* Light Mode */
--bg-gradient-animated-1: radial-gradient(circle at 20% 50%, rgba(80, 176, 174, 0.55), transparent 50%);
--bg-gradient-animated-2: radial-gradient(circle at 80% 50%, rgba(255, 126, 103, 0.48), transparent 50%);
--bg-gradient-animated-3: radial-gradient(circle at 50% 80%, rgba(62, 142, 140, 0.45), transparent 50%);

/* Dark Mode */
--bg-gradient-animated-1: radial-gradient(circle at 20% 50%, rgba(80, 176, 174, 0.20), transparent 50%);
--bg-gradient-animated-2: radial-gradient(circle at 80% 50%, rgba(255, 126, 103, 0.15), transparent 50%);
--bg-gradient-animated-3: radial-gradient(circle at 50% 80%, rgba(62, 142, 140, 0.15), transparent 50%);
```

---

## Typography

### Font Families

```css
--font-heading: 'Outfit', sans-serif;
--font-body: 'Inter', sans-serif;
```

Both fonts are **self-hosted** as variable fonts (`.woff2`) for optimal performance.

**Tailwind Classes:**
```css
font-heading    /* Outfit for headings */
font-body       /* Inter for body text */
```

### Heading Utilities

Pre-configured responsive heading sizes:

#### Hero Heading

```css
.heading-hero {
  @apply text-4xl md:text-6xl lg:text-7xl tracking-tight;
}
```

**Usage:**
```html
<h1 class="heading-hero font-heading text-primary">
  Festival Line-up 2024
</h1>
```

#### Section Heading

```css
.heading-section {
  @apply text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6;
}
```

**Usage:**
```html
<h2 class="heading-section">
  Over Aaltjesdagen
</h2>
```

### Text Highlight

Theme-aware text highlighting:

```css
.text-highlight {
  color: var(--color-primary-text); /* Light mode */
}

.dark .text-highlight {
  color: var(--color-primary); /* Dark mode */
}
```

**Usage:**
```html
<p>
  Dit is <span class="text-highlight font-semibold">belangrijk</span> om te weten.
</p>
```

### Font Weights

| Value | Tailwind Class | Usage |
|-------|----------------|-------|
| 400 | `font-normal` | Body text |
| 500 | `font-medium` | Subtle emphasis |
| 600 | `font-semibold` | Buttons, labels |
| 700 | `font-bold` | Headings, strong emphasis |

### Line Height

Default line heights are optimized for readability:

- **Headings**: `1.1` (tight, for visual impact)
- **Body**: `1.6` (comfortable reading)

---

## Spacing

### Section Spacing

Vertical rhythm utilities ensure consistent spacing throughout the application:

#### Large Section Spacing

```css
.section-spacing {
  @apply py-12 md:py-20 lg:py-24;
}
```

**Usage**: Major page sections (Hero, Features, Footer)

#### Small Section Spacing

```css
.section-spacing-sm {
  @apply py-8 md:py-12 lg:py-16;
}
```

**Usage**: Sub-sections, nested content

#### Extra Small Section Spacing

```css
.section-spacing-xs {
  @apply py-6 md:py-8 lg:py-12;
}
```

**Usage**: Tight sections, compact layouts

### Container Utilities

#### Standard Container

```css
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

- **Max Width**: `80rem` (1280px)
- **Responsive Padding**: Mobile → Tablet → Desktop
- **Centering**: `mx-auto`

**Usage:**
```html
<div class="container-custom">
  <h1>Centered Content</h1>
</div>
```

#### Section Containers

Combines container + spacing:

```css
.section-container {
  @apply relative container-custom section-spacing-sm;
  z-index: var(--z-content);
}

.section-container-lg {
  @apply relative container-custom section-spacing;
  z-index: var(--z-content);
}
```

**Usage:**
```html
<section class="section-container-lg">
  <!-- Section content with proper spacing and centering -->
</section>
```

---

## Shadows

Theme-aware shadow system with four elevation levels:

### Shadow Scale

| Token | Value (Light) | Value (Dark) | Usage |
|-------|---------------|--------------|-------|
| `--shadow-sm` | `0 1px 2px rgba(44,62,80,0.05)` | `0 1px 2px rgba(0,0,0,0.5)` | Subtle depth |
| `--shadow-md` | `0 4px 6px` + `0 2px 4px` | Higher opacity | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px` + `0 4px 6px` | Higher opacity | Hover states, modals |
| `--shadow-xl` | `0 20px 25px` + `0 10px 10px` | Higher opacity | Floating elements |

**Tailwind Classes:**
```css
shadow-soft-sm
shadow-soft-md
shadow-soft-lg
shadow-soft-xl
```

### Colored Shadows

For brand-colored shadow effects:

```css
--shadow-color-primary: color-mix(in srgb, var(--color-accent), transparent 70%);
--shadow-color-accent: color-mix(in srgb, var(--color-accent), transparent 80%);
```

**Usage:**
```html
<!-- Button with colored shadow -->
<button class="btn-primary shadow-lg shadow-teal-500/20">
  Call to Action
</button>
```

---

## Z-Index Hierarchy

Centralized z-index scale prevents stacking context conflicts:

| Token | Variable | Value | Usage |
|-------|----------|-------|-------|
| Background | `--z-background` | `-1` | Animated blobs, patterns |
| Base | `--z-base` | `0` | Normal document flow |
| Content | `--z-content` | `1` | Main content sections |
| Elevated | `--z-elevated` | `10` | Cards with shadow, floating elements |
| Sticky | `--z-sticky` | `100` | Sticky headers, sidebars |
| Header | `--z-header` | `200` | Global navigation |
| Dropdown | `--z-dropdown` | `300` | Dropdown menus |
| Tooltip | `--z-tooltip` | `400` | Tooltips, popovers |
| Modal Backdrop | `--z-modal-backdrop` | `500` | Modal overlay backgrounds |
| Modal | `--z-modal` | `600` | Modal dialogs, mobile panels |
| Toast | `--z-toast` | `700` | Notifications, toasts |
| Max | `--z-max` | `999` | Critical alerts, emergency UI |

**Tailwind Classes:**
```css
z-background
z-base
z-content
z-elevated
z-sticky
z-header
z-dropdown
z-tooltip
z-modal-backdrop
z-modal
z-toast
z-max
```

**Usage:**
```html
<!-- Modal structure -->
<div class="fixed inset-0 z-modal-backdrop bg-black/50">
  <div class="z-modal bg-elevated rounded-xl p-6">
    Modal Content
  </div>
</div>
```

### Best Practices

✅ **DO**: Use semantic z-index tokens
```html
<header class="z-header">Navigation</header>
```

❌ **DON'T**: Use arbitrary z-index values
```html
<header class="z-[9999]">Navigation</header>
```

---

## Borders & Radius

### Border Colors

Theme-aware border colors:

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--border-primary` | `#dae4e4` | `#2d3d3d` | Primary borders, dividers |
| `--border-secondary` | `#edf2f2` | `#1a2626` | Subtle borders, secondary elements |

**Usage:**
```html
<div class="border border-primary rounded-xl">
  Card with border
</div>
```

### Border Radius

Standard Tailwind radius utilities are used:

| Class | Radius | Usage |
|-------|--------|-------|
| `rounded` | `0.25rem` (4px) | Small elements |
| `rounded-lg` | `0.5rem` (8px) | Buttons, badges |
| `rounded-xl` | `0.75rem` (12px) | Cards (most common) |
| `rounded-2xl` | `1rem` (16px) | Large cards, modals |
| `rounded-full` | `9999px` | Circular elements, pills |

---

## Transitions & Timing

### Duration Tokens

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Additional Duration Values:**
```css
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
```

### Easing Functions

```css
--ease-linear: linear;                          /* Constant speed */
--ease-in: cubic-bezier(0.4, 0, 1, 1);         /* Accelerating */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);      /* Decelerating (most common) */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);   /* Smooth both ends */
```

**Usage:**
```css
.custom-transition {
  transition: all var(--transition-base);
}

.custom-hover:hover {
  transform: translateY(-4px);
  transition-duration: var(--duration-200);
  transition-timing-function: var(--ease-out);
}
```

### Focus Rings

Accessible focus indication:

```css
--focus-ring: rgba(80, 176, 174, 0.4);
```

**Applied automatically:**
```css
*:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

## Quick Reference

### Most Common Tokens

```css
/* Colors */
--color-primary: #267270;
--color-accent: #C0392B;

/* Backgrounds */
--bg-base: #f5fafa;            /* Light */
--bg-elevated: #ffffff;        /* Light */

/* Text */
--text-primary: #2c3e50;       /* Light */
--text-secondary: #546e7a;     /* Light */

/* Spacing */
.section-spacing               /* py-12 md:py-20 lg:py-24 */
.container-custom              /* max-w-7xl mx-auto px-4... */

/* Shadows */
--shadow-md                    /* Standard card shadow */

/* Z-Index */
--z-header: 200;
--z-modal: 600;
```

---

## Next Steps

- **[Components](./components.md)** - See how tokens are used in components
- **[Theming](./theming.md)** - Customize and extend the token system
- **[Accessibility](./accessibility.md)** - Contrast ratios and compliance details
