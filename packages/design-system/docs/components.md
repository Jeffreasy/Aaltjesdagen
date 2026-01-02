# Components Reference

Complete reference for all component classes in the Aaltjesdagen Design System. These atomic component classes are provided by the Tailwind plugin and can be combined with utility classes for maximum flexibility.

## Table of Contents

- [Layout Components](#layout-components)
- [Card System](#card-system)
- [Button System](#button-system)
- [Typography Components](#typography-components)
- [Background Utilities](#background-utilities)
- [Gradient Utilities](#gradient-utilities)
- [Best Practices](#best-practices)

---

## Layout Components

### Container Custom

The standard container with max-width and responsive padding.

**Class**: `.container-custom`

**CSS**:
```css
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

**Specifications**:
- **Max Width**: `80rem` (1280px)
- **Horizontal Margins**: Auto (for centering)
- **Padding**: 
  - Mobile: `1rem` (16px)
  - Tablet: `1.5rem` (24px)
  - Desktop: `2rem` (32px)

**Usage**:
```html
<div class="container-custom">
  <h1>Centered, responsive content</h1>
  <p>With comfortable padding on all screen sizes</p>
</div>
```

**When to Use**:
- ✅ Main content areas
- ✅ Sections that need consistent horizontal boundaries
- ✅ Combining with custom vertical spacing

**When NOT to Use**:
- ❌ Full-width backgrounds (use wrapper div instead)
- ❌ When you need edge-to-edge content

---

### Section Containers

Combines container + vertical spacing for complete section layout.

#### Section Container (Small)

**Class**: `.section-container`

**CSS**:
```css
.section-container {
  @apply relative container-custom section-spacing-sm;
  z-index: var(--z-content);
}
```

**Spacing**:
- Mobile: `py-8`
- Tablet: `py-12`
- Desktop: `py-16`

**Usage**:
```html
<section class="section-container">
  <h2>Section Title</h2>
  <p>Section content with appropriate spacing</p>
</section>
```

#### Section Container (Large)

**Class**: `.section-container-lg`

**CSS**:
```css
.section-container-lg {
  @apply relative container-custom section-spacing;
  z-index: var(--z-content);
}
```

**Spacing**:
- Mobile: `py-12`
- Tablet: `py-20`
- Desktop: `py-24`

**Usage**:
```html
<section class="section-container-lg">
  <h1 class="heading-hero">Major Section</h1>
  <p>Important content with generous spacing</p>
</section>
```

**When to Use**:
- ✅ `.section-container-lg` for hero sections, major page sections
- ✅ `.section-container` for sub-sections, nested content

---

### Section Spacing

Standalone vertical rhythm utilities (without container).

| Class | Mobile | Tablet | Desktop | Usage |
|-------|--------|--------|---------|-------|
| `.section-spacing` | `py-12` | `py-20` | `py-24` | Major sections |
| `.section-spacing-sm` | `py-8` | `py-12` | `py-16` | Sub-sections |
| `.section-spacing-xs` | `py-6` | `py-8` | `py-12` | Tight spacing |

**Usage**:
```html
<!-- Custom width with standard spacing -->
<div class="max-w-4xl mx-auto section-spacing">
  Custom content area
</div>
```

---

## Card System

Premium card components with hover effects and theme-aware styling.

### Card Base

Solid card with elevation, borders, and hover animation.

**Class**: `.card-base`

**CSS**:
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

**Features**:
- ✅ Theme-aware background (`white` in light, `#1a2626` in dark)
- ✅ Subtle shadow elevation
- ✅ Smooth hover lift (`-4px`)
- ✅ Border color changes to primary on hover
- ✅ `1rem` border radius (16px)
- ✅ `1.5rem` padding (24px)

**Usage**:
```html
<div class="card-base">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-text-sub">Card description with automatic theme support</p>
</div>
```

**Customization**:
```html
<!-- Larger padding -->
<div class="card-base p-8">
  Spacious card
</div>

<!-- Custom hover effect -->
<div class="card-base hover:border-accent">
  Card with accent hover
</div>
```

---

### Glass

Glassmorphism effect with backdrop blur and transparency.

**Class**: `.glass`

**CSS**:
```css
.glass {
  background: var(--bg-overlay);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-primary);
}
```

**Features**:
- ✅ Translucent background (`rgba` with 0.9/0.95 alpha)
- ✅ `12px` backdrop blur for glassmorphism
- ✅ Theme-aware: lighter in light mode, darker in dark mode
- ✅ Subtle border

**Usage**:
```html
<!-- Glass card -->
<div class="glass rounded-xl p-6">
  <h3>Glassmorphic Card</h3>
  <p>Background elements visible through blur</p>
</div>

<!-- Glass navigation -->
<nav class="glass sticky top-0 z-header px-6 py-4">
  <ul>...</ul>
</nav>
```

**Performance Note**: 
⚠️ Backdrop blur is GPU-intensive. Limit usage on mobile or complex layouts.

**Best Used For**:
- ✅ Overlays on busy backgrounds
- ✅ Floating navigation bars
- ✅ Modal dialogs
- ✅ "Special" highlighted cards

**Avoid Using For**:
- ❌ Every card on a page (performance)
- ❌ Solid backgrounds (defeats the purpose)

---

### Card Comparison

| Feature | `.card-base` | `.glass` |
|---------|-------------|----------|
| Background | Solid `--bg-elevated` | Translucent `--bg-overlay` |
| Blur | None | `12px` backdrop blur |
| Shadow | Yes (`--shadow-md`) | Optional |
| Hover | Lift + shadow increase | Optional |
| Performance | ⚡ Fast | ⚠️ Moderate (blur cost) |
| Use Case | Standard cards | Special emphasis, overlays |

---

## Button System

### Base Button

**Class**: `.btn`

**CSS**:
```css
.btn {
  @apply inline-flex items-center justify-center gap-2 
         px-6 py-3 rounded-xl font-semibold 
         transition-all duration-300 transform active:scale-95;
}
```

**Features**:
- Flexbox layout for icons + text
- `0.5rem` gap between children
- Horizontal padding: `1.5rem` (24px)
- Vertical padding: `0.75rem` (12px)
- Semi-bold font weight
- `12px` border radius
- Active press effect (scales to `95%`)

**Note**: `.btn` is a **base class**. Always combine with a variant (primary, accent, secondary).

---

### Primary Button

**Class**: `.btn-primary`

**CSS**:
```css
.btn-primary {
  @apply btn text-white shadow-lg shadow-teal-500/20;
  background: var(--color-primary);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  @apply shadow-xl shadow-teal-500/30 -translate-y-0.5;
}
```

**Visual**:
- Background: Teal (`#267270`)
- Text: White
- Shadow: Teal-tinted soft shadow
- Hover: Darker teal, lifts `2px`, stronger shadow

**Usage**:
```html
<button class="btn-primary">
  Koop Tickets
</button>

<!-- With icon -->
<a href="/tickets" class="btn-primary">
  <svg class="w-5 h-5">...</svg>
  Koop Nu
</a>
```

**When to Use**:
- ✅ Primary call-to-action
- ✅ Form submit buttons
- ✅ Main navigation links

---

### Accent Button

**Class**: `.btn-accent`

**CSS**:
```css
.btn-accent {
  @apply btn text-white shadow-lg shadow-orange-500/20;
  background: var(--color-accent);
}

.btn-accent:hover {
  background: var(--color-accent-dark);
  @apply shadow-xl shadow-orange-500/30 -translate-y-0.5;
}
```

**Visual**:
- Background: Coral/Red (`#C0392B`)
- Text: White
- Shadow: Orange-tinted soft shadow
- Hover: Darker coral, lifts `2px`, stronger shadow

**Usage**:
```html
<button class="btn-accent">
  Meld Je Aan
</button>
```

**When to Use**:
- ✅ High-priority CTAs (limited use)
- ✅ Urgency actions ("Buy Now", "Register")
- ✅ Complementing primary button in dual-CTA layouts

**Best Practices**:
- ⚠️ Use sparingly (1-2 per page max)
- ⚠️ Should be the **most important** action on page

---

### Secondary Button

**Class**: `.btn-secondary`

**CSS**:
```css
.btn-secondary {
  @apply btn border-2;
  border-color: var(--border-primary);
  color: var(--text-primary);
  background: transparent;
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--bg-elevated);
}
```

**Visual**:
- Background: Transparent
- Border: `2px` theme-aware border
- Text: Primary text color
- Hover: Primary border + text, elevated background

**Usage**:
```html
<button class="btn-secondary">
  Meer Info
</button>
```

**When to Use**:
- ✅ Secondary actions
- ✅ Cancel/dismiss buttons
- ✅ Alternative options in dual-CTA scenarios

---

### Button Combinations

```html
<!-- Dual CTA (common pattern) -->
<div class="flex gap-4">
  <a href="/tickets" class="btn-primary">
    Koop Tickets
  </a>
  <a href="/info" class="btn-secondary">
    Meer Informatie
  </a>
</div>

<!-- With icon -->
<button class="btn-primary">
  <svg class="w-5 h-5" fill="none" stroke="currentColor">
    <path d="..." />
  </svg>
  Download Plattegrond
</button>

<!-- Loading state -->
<button class="btn-primary opacity-75 cursor-not-allowed" disabled>
  <svg class="animate-spin w-5 h-5">...</svg>
  Laden...
</button>
```

---

## Typography Components

### Heading Hero

**Class**: `.heading-hero`

**CSS**:
```css
.heading-hero {
  @apply text-4xl md:text-6xl lg:text-7xl tracking-tight;
}
```

**Responsive Sizes**:
- Mobile: `2.25rem` (36px)
- Tablet: `3.75rem` (60px)
- Desktop: `4.5rem` (72px)

**Usage**:
```html
<h1 class="heading-hero font-heading text-primary">
  Aaltjesdagen 2024
</h1>

<!-- With gradient -->
<h1 class="heading-hero gradient-primary-accent bg-clip-text text-transparent">
  Festival Line-up
</h1>
```

---

### Heading Section

**Class**: `.heading-section`

**CSS**:
```css
.heading-section {
  @apply text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6;
}
```

**Responsive Sizes**:
- Mobile: `1.875rem` (30px)
- Tablet: `2.25rem` (36px)
- Desktop: `3rem` (48px)

**Features**:
- Includes bottom margin (`mb-6`)
- Tight letter spacing for visual impact

**Usage**:
```html
<h2 class="heading-section">
  Over Het Festival
</h2>
```

---

### Text Highlight

**Class**: `.text-highlight`

**CSS**:
```css
.text-highlight {
  color: var(--color-primary-text); /* Light mode: #267270 */
}

.dark .text-highlight {
  color: var(--color-primary); /* Dark mode: #267270 */
}
```

**Usage**:
```html
<p class="text-lg">
  Mis <span class="text-highlight font-semibold">deze kans</span> niet!
</p>
```

---

## Background Utilities

### Animated Background

The signature Aaltjesdagen animated blob background.

**Class**: `.bg-animated`

**Structure**:
```html
<div class="bg-animated">
  <div class="orb"></div>
</div>
```

**CSS**:
```css
.bg-animated {
  position: fixed;
  inset: 0;
  z-index: var(--z-background); /* -1 */
  background: var(--bg-base);
  min-height: 100vh;
}

.bg-animated::before,
.bg-animated::after {
  /* Floating blobs with radial gradients */
  animation: float 20s infinite ease-in-out alternate;
}

.orb {
  /* Center floating orb */
  animation: float-3 30s ease-in-out infinite;
}
```

**Features**:
- ✅ Fixed positioning (stays during scroll)
- ✅ Three animated blobs (pseudo-elements + `.orb`)
- ✅ Theme-aware gradients
- ✅ Respects `prefers-reduced-motion`
- ✅ GPU-accelerated transforms

**Usage**:
```html
<body>
  <!-- Add as first element in body -->
  <div class="bg-animated">
    <div class="orb"></div>
  </div>

  <!-- Rest of your content -->
  <main>...</main>
</body>
```

**Customization**:
```css
/* Faster animation */
.bg-animated::before {
  animation-duration: 15s;
}

/* Different colors (override CSS variables) */
:root {
  --bg-gradient-animated-1: radial-gradient(...);
}
```

---

### Decorative Orbs

Static decorative blobs for section backgrounds.

**Classes**: `.decorative-orb-primary`, `.decorative-orb-accent`

**CSS**:
```css
.decorative-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.decorative-orb-primary {
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
  opacity: 0.05;
  filter: blur(60px);
}

.decorative-orb-accent {
  width: 18rem;
  height: 18rem;
  background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
  opacity: 0.05;
  filter: blur(60px);
}
```

**Usage**:
```html
<section class="relative section-container">
  <!-- Decorative background orb -->
  <div class="decorative-orb-primary absolute top-0 right-0 -translate-y-1/2"></div>
  
  <h2>Section Content</h2>
  <p>Content appears above the decorative background</p>
</section>
```

---

### Pattern Backgrounds

#### Grid Pattern

**Class**: `.bg-pattern-grid`

```css
.bg-pattern-grid {
  background-image: 
    linear-gradient(var(--border-primary) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-primary) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}
```

**Usage**:
```html
<div class="bg-pattern-grid h-64">
  Content with grid background
</div>
```

#### Dot Pattern

**Class**: `.dot-pattern`

```css
.dot-pattern {
  background-image: radial-gradient(circle,
    color-mix(in srgb, var(--color-primary), transparent 95%) 1px,
    transparent 1px);
  background-size: 24px 24px;
}
```

**Usage**:
```html
<div class="dot-pattern p-12">
  Subtle dot pattern background
</div>
```

#### Modern Gradient Background

**Class**: `.bg-gradient-modern`

```css
.bg-gradient-modern {
  background: linear-gradient(180deg,
    var(--bg-base) 0%,
    color-mix(in srgb, var(--bg-base), var(--color-primary) 8%) 50%,
    var(--bg-base) 100%);
}
```

**Usage**:
```html
<section class="bg-gradient-modern py-24">
  Content with subtle gradient
</section>
```

---

## Gradient Utilities

### Primary to Accent

**Class**: `.gradient-primary-accent`

**CSS**:
```css
.gradient-primary-accent {
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}
```

**Common Usage**:
```html
<!-- Gradient text -->
<h1 class="gradient-primary-accent bg-clip-text text-transparent">
  Aaltjesdagen
</h1>

<!-- Gradient background -->
<div class="gradient-primary-accent p-8 text-white rounded-xl">
  Content
</div>

<!-- Gradient border (advanced) -->
<div class="relative">
  <div class="gradient-primary-accent absolute inset-0 rounded-xl opacity-50"></div>
  <div class="relative bg-base rounded-xl p-6">
    Content
  </div>
</div>
```

### Accent to Primary

**Class**: `.gradient-accent-primary`

Reverse of above (starts with coral, ends with teal).

### Tri-Color Gradient

**Class**: `.gradient-tri-color`

**CSS**:
```css
.gradient-tri-color {
  background: linear-gradient(90deg,
    var(--color-primary) 0%,
    var(--color-accent) 50%,
    var(--color-secondary) 100%);
}
```

**Usage**:
```html
<div class="gradient-tri-color h-2 w-full rounded-full"></div>
```

---

## Best Practices

### DO ✅

**Use Semantic Classes**
```html
<button class="btn-primary">Submit</button>
<!-- NOT: <button class="bg-primary text-white px-6 py-3 ...">Submit</button> -->
```

**Combine with Utilities**
```html
<div class="card-base max-w-md">
  <!-- Component class + utility -->
</div>
```

**Respect the Spacing System**
```html
<section class="section-container-lg">
  <!-- Use provided spacing -->
</section>
```

**Layer Z-Index Properly**
```html
<nav class="z-header">
  <div class="z-dropdown">...</div>
</nav>
```

### DON'T ❌

**Override Core Styles**
```html
<!-- BAD -->
<button class="btn-primary !bg-blue-500">
  <!-- Breaks design consistency -->
</button>
```

**Mix Card Styles**
```html
<!-- BAD -->
<div class="card-base glass">
  <!-- Conflicting backgrounds -->
</div>
```

**Skip Containers**
```html
<!-- BAD: Text hits edges on mobile -->
<section class="py-12">
  <h2>Title</h2>
  <p>Long paragraph without container...</p>
</section>

<!-- GOOD -->
<section class="section-container">
  <h2>Title</h2>
  <p>Properly contained</p>
</section>
```

**Use Arbitrary Z-Index**
```html
<!-- BAD -->
<div class="z-[9999]">

<!-- GOOD -->
<div class="z-modal">
```

---

## Next Steps

- **[Animations](./animations.md)** - Add motion to components
- **[Design Tokens](./design-tokens.md)** - Understand the token system
- **[Astro Components](./astro-components.md)** - Use pre-built Astro components
