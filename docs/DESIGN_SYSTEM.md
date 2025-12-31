# Design System 2.0

**Theme**: "Breathable & Sophisticated"  
**Based on**: `src/styles/global.css` (source of truth)

---

## 🎨 Brand Colors

### Primary: Teal
```css
--color-primary: #50b0ae       /* Main teal */
--color-primary-dark: #3a8e8c  /* Hover state */
--color-primary-light: #6bcbc9 /* Light variant */
--color-primary-text: #3e8e8c  /* WCAG AA compliant */
```

**Gebruik**: Links, buttons, highlights, brand elementen

### Accent: Coral
```css
--color-accent: #ff7e67        /* Main coral */
--color-accent-dark: #e66048   /* Hover state */
--color-accent-light: #ff9d8b  /* Light variant */
```

**Gebruik**: CTA buttons, attention-grabbing elementen, warnings

### Functional Colors
```css
--color-success: #4caf50
--color-error: #e57373
--color-warning: #ffa726
--focus-ring: rgba(80, 176, 174, 0.4)
```

---

## 🌓 Theme System

### Light Mode (Default)
```css
/* Backgrounds */
--bg-base: #f8fbfb          /* Very light teal-tinted */
--bg-elevated: #ffffff      /* Pure white for cards */
--bg-overlay: rgba(255, 255, 255, 0.9)

/* Typography */
--text-primary: #2c3e50     /* Deep dark blue - headings */
--text-secondary: #546e7a   /* Blue-grey - body text */
--text-tertiary: #78909c    /* Muted - metadata */

/* Borders & Shadows */
--border-primary: #dae4e4
--shadow-lg: 0 10px 15px -3px rgba(44, 62, 80, 0.08), ...
```

### Dark Mode
```css
/* Backgrounds */
--bg-base: #0f1717          /* Deep teal-black */
--bg-elevated: #1a2626      /* Slightly lighter */
--bg-overlay: rgba(26, 38, 38, 0.95)

/* Typography */
--text-primary: #f8fbfb     /* Off-white */
--text-secondary: #a0b2b2   /* Muted teal-grey */

/* Shadows - more intense */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), ...
```

**Activatie**:
- Automatisch via `prefers-color-scheme: dark`
- Manual via `data-theme="dark"` of `.dark` class

---

## ✍️ Typography

### Font Families
```css
--font-heading: 'Outfit', sans-serif    /* Voor headings */
--font-body: 'Inter', sans-serif        /* Voor body text */
```

Fonts worden geladen via Google Fonts in `global.css`.

### Heading Utilities

```css
/* Hero Heading - grootste impact */
.heading-hero {
  @apply text-4xl md:text-6xl lg:text-7xl tracking-tight;
}

/* Section Heading - major sections */
.heading-section {
  @apply text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6;
}

/* Text Highlight - accent kleur */
.text-highlight {
  color: var(--color-primary-text); /* Light mode */
  color: var(--color-primary);       /* Dark mode */
}
```

---

## 📦 Component Patterns

### Card System

```css
.card-base {
  background-color: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.card-base:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}
```

**Gebruik**: Feature cards, content containers, elevated UI

### Glassmorphism

```css
.glass {
  background: var(--bg-overlay);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-primary);
}
```

**Gebruik**: Headers, overlays, floating elements

### Button System

```css
/* Primary Button (Teal) */
.btn-primary {
  @apply btn text-white shadow-lg shadow-teal-500/20;
  background: var(--color-primary);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  @apply shadow-xl shadow-teal-500/30 -translate-y-0.5;
}

/* Accent Button (Coral CTA) */
.btn-accent {
  @apply btn text-white shadow-lg shadow-orange-500/20;
  background: var(--color-accent);
}

/* Secondary/Outline Button */
.btn-secondary {
  @apply btn border-2;
  border-color: var(--border-primary);
  color: var(--text-primary);
  background: transparent;
}
```

**Base button class**:
```css
.btn {
  @apply inline-flex items-center justify-center gap-2 
         px-6 py-3 rounded-xl font-semibold 
         transition-all duration-300 transform active:scale-95;
}
```

---

## 📏 Spacing System

### Section Spacing

```css
/* Standard section spacing */
.section-spacing {
  @apply py-12 md:py-20 lg:py-24;
}

/* Smaller sections */
.section-spacing-sm {
  @apply py-8 md:py-12 lg:py-16;
}

/* Extra small */
.section-spacing-xs {
  @apply py-6 md:py-8 lg:py-12;
}
```

### Container

```css
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

Max width: `80rem` (1280px)

---

## 🎭 Z-Index Hierarchy

```css
--z-background: -1     /* Animated backgrounds */
--z-base: 0            /* Default layer */
--z-content: 1         /* Main content */
--z-elevated: 10       /* Cards, elevated UI */
--z-sticky: 100        /* Sticky filters */
--z-header: 200        /* Site navigation */
--z-dropdown: 300      /* Dropdown menus */
--z-tooltip: 400       /* Tooltips */
--z-modal-backdrop: 500 /* Modal backdrop */
--z-modal: 600         /* Modal content */
--z-toast: 700         /* Toast notifications */
--z-max: 999           /* Critical UI */
```

**Navigation specific**:
```css
--z-nav-mobile-toggle: 600   /* Mobile toggle button */
--z-nav-mobile-backdrop: 500 /* Mobile backdrop */
--z-nav-mobile-panel: 500    /* Mobile drawer */
```

---

## ⏱️ Transitions & Animations

### Timing Functions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Duration Tokens (voor Alpine.js)

```css
--duration-200: 200ms;  /* Fast */
--duration-300: 300ms;  /* Base */
--duration-500: 500ms;  /* Slow */
```

### Easing Functions

```css
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

---

## 🌊 Background Utilities

### Modern Gradient

```css
.bg-gradient-modern {
  background: linear-gradient(180deg,
    var(--bg-base) 0%,
    color-mix(in srgb, var(--bg-base), var(--color-primary) 8%) 50%,
    var(--bg-base) 100%);
}
```

### Dot Pattern

```css
.dot-pattern {
  background-image: radial-gradient(circle,
    color-mix(in srgb, var(--color-primary), transparent 95%) 1px,
    transparent 1px);
  background-size: 24px 24px;
}
```

### Grid Pattern

```css
.bg-pattern-grid {
  background-image: 
    linear-gradient(var(--border-primary) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-primary) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}
```

---

## 🎨 Animated Background

Decoratieve animated blobs op de achtergrond:

```css
.bg-animated {
  position: fixed;
  inset: 0;
  z-index: var(--z-background);
  background: var(--bg-base);
}
```

**Blob gradients**:
```css
--bg-gradient-animated-1: radial-gradient(...); /* Teal */
--bg-gradient-animated-2: radial-gradient(...); /* Coral */
--bg-gradient-animated-3: radial-gradient(...); /* Dark Teal */
```

Blobs floaten met 20-30s animaties voor subtiele beweging.

---

## 📱 Responsive Breakpoints

| Breakpoint | Size | Tailwind Class |
|------------|------|----------------|
| Mobile | < 640px | (default) |
| Tablet | ≥ 640px | `sm:` |
| Small Desktop | ≥ 768px | `md:` |
| Desktop | ≥ 1024px | `lg:` |
| Large Desktop | ≥ 1280px | `xl:` |
| Extra Large | ≥ 1536px | `2xl:` |

---

## ♿ Accessibility

### Focus States

```css
*:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .bg-animated::before,
  .bg-animated::after {
    animation: none;
  }
  
  body {
    transition: none !important;
  }
}
```

---

## 📝 Prose System

Voor richtext content styling, zie:
- `src/styles/prose/prose-base.css` - Base styling
- `src/styles/prose/prose-variants.css` - Color variants
- `src/styles/prose/prose-decorations.css` - Decorative elements

---

## 🔗 Related Files

- **Source**: [`src/styles/global.css`](../src/styles/global.css)
- **Tailwind Config**: [`tailwind.config.cjs`](../tailwind.config.cjs)
- **Animations**: [`src/styles/animations.css`](../src/styles/animations.css)

---

**Based on**: Design System 2.0 in global.css  
**Last Updated**: 31 december 2024
