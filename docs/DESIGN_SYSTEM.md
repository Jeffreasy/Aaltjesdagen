# Design System 2.0

> **Theme**: "Breathable & Sophisticated" (Teal/Coral)  
> **Package**: [`@aaltjesdagen/ui`](../packages/design-system/)

This document outlines the visual language and technical implementation of the Aaltjesdagen Design System. The system is implemented as a shared local package to ensure consistency across the application.

---

## 🎨 Token System

The design system uses a hybrid approach of **CSS Variables** (for runtime flexibility & themes) and **Tailwind Utility Classes**.

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#50b0ae` | **Teal**: Main brand identity, backgrounds, gradients |
| `--color-primary-dark` | `#3a8e8c` | Hover states, focus rings |
| `--color-accent` | `#ff7e67` | **Coral**: Call-to-actions, highlights |
| `--color-accent-dark` | `#e66048` | Hover states for accent elements |

### Theme System (Dark Mode)

The system supports automatic and manual dark mode via the `data-theme` attribute.

**Light Mode (Default)**
- Background: `#f8fbfb` (Ice White)
- Text: `#2c3e50` (Dark Slate)
- Cards: `#ffffff` (Pure White)

**Dark Mode**
- Background: `#0f1717` (Deep Teal Black)
- Text: `#f8fbfb` (Ice White)
- Cards: `#1a2626` (Elevated Teal)

---

## 📦 Usage

### Importing Styles

The design system styles are exposed via the package. In your layout:

```astro
---
import "@aaltjesdagen/ui/css";
---
```

### Using Tailwind Classes

The preset in `packages/design-system/tailwind-preset.js` exposes all design tokens to Tailwind.

```html
<!-- Uses brand color and spacing tokens -->
<div class="bg-primary text-white p-8 rounded-2xl">
  <h1 class="font-heading text-4xl">Hello Aaltjesdagen</h1>
</div>
```

---

## 🧩 Component Patterns

The system includes a dedicated Tailwind Plugin (`tailwind-plugin.js`) that creates standard component classes for rapid development.

### Buttons (`.btn`)

```html
<!-- Primary (Teal) -->
<button class="btn-primary">Lees meer</button>

<!-- Accent (Coral) -->
<button class="btn-accent">Koop tickets</button>

<!-- Secondary (Outline) -->
<button class="btn-secondary">Details</button>
```

### Cards (`.card-base`)

The standard surface for content. Automatically handles light/dark mode borders and shadows.

```html
<div class="card-base">
  <h3>Content Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Glassmorphism (`.glass`)

Used for sticky headers, overlays, and modern UI elements.

```html
<div class="glass p-4 rounded-xl">
  <span>Floating Content</span>
</div>
```

### Container (`.container-custom`)

Standard constraint for page content (max-width `80rem` / `1280px`).

```html
<section class="section-spacing">
  <div class="container-custom">
    <!-- Page Content -->
  </div>
</section>
```

---

## ⌨️ Typography

**Headings**: `Outfit` (Google Font)  
**Body**: `Inter` (Google Font)

| Class | Desktop Szing | Mobile Sizing | Usage |
|-------|---------------|---------------|-------|
| `.heading-hero` | `7xl` | `4xl` | Main Homepage Hero |
| `.heading-section` | `5xl` | `3xl` | Section Titles |
| `.text-highlight` | - | - | Applies brand color to text |

---

## 🕸️ Z-Index Hierarchy

Managed via CSS variables and exposed as Tailwind utilities (e.g., `z-header`).

| Token/Utility | Value (Var) | Usage |
|---------------|-------------|-------|
| `z-background` | -1 | Orbs, Background Effects |
| `z-base` | 0 | Default content |
| `z-elevated` | 10 | Cards, Dropdowns |
| `z-sticky` | 100 | FilterBars, Sticky Headers |
| `z-header` | 200 | Main Navigation |
| `z-modal` | 600 | Dialogs, Popups |
| `z-max` | 999 | Critical Alerts, Toasts |

```html
<!-- Example Usage -->
<div class="fixed top-0 w-full z-header">
  ...
</div>
```

---

**Last Updated**: January 1, 2026
