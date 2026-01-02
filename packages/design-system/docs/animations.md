# Animation System

The Aaltjesdagen animation system provides a complete toolkit for creating **breathable**, **sophisticated** motion design. Built on performance-optimized keyframes and semantic timing tokens, the system ensures consistent, accessible animations across your application.

## Table of Contents

- [Animation Philosophy](#animation-philosophy)
- [Duration Tokens](#duration-tokens)
- [Easing Functions](#easing-functions)
- [Keyframe Animations](#keyframe-animations)
- [Utility Classes](#utility-classes)
- [Scroll Reveal System](#scroll-reveal-system)
- [Performance Guidelines](#performance-guidelines)
- [Accessibility](#accessibility)
- [Migration Guide](#migration-guide)

---

## Animation Philosophy

The Aaltjesdagen animation system follows three core principles:

### 1. Purposeful Motion
Every animation should **enhance understanding** or **guide attention**, never distract.

### 2. Natural Timing
Animations use **ease-out** curves (decelerating) for elements entering the viewport, creating a natural, comfortable feel.

### 3. Performance First
All animations use GPU-accelerated properties (`transform`, `opacity`) and respect user motion preferences.

---

## Duration Tokens

Semantic duration tokens ensure consistent timing across your application.

| Token | Value | Usage | Examples |
|-------|-------|-------|----------|
| `--duration-instant` | `150ms` | Micro-interactions | Hover states, active clicks |
| `--duration-fast` | `250ms` | Quick transitions | Tooltips, badges |
| `--duration-base` | `350ms` | **Standard (default)** | Cards, buttons, most animations |
| `--duration-slow` | `500ms` | Deliberate motion | Important transitions |
| `--duration-slower` | `750ms` | Page transitions | Section reveals |
| `--duration-slowest` | `1000ms` | Dramatic effects | Hero animations |

### Usage

```css
.custom-element {
  transition: transform var(--duration-base);
}

.hero-title {
  animation: fadeIn var(--duration-slow) ease-out;
}
```

### Choosing Duration

**Quick Reference:**
- Hover effects → `--duration-instant` (150ms)
- Button clicks → `--duration-fast` (250ms)
- Card animations → `--duration-base` (350ms) ⭐ Most common
- Modal open/close → `--duration-slow` (500ms)
- Hero reveals → `--duration-slower` (750ms)

---

## Easing Functions

Easing curves control **how** an animation progresses over time.

### Available Easings

| Token | Curve | Visual | Usage |
|-------|-------|--------|-------|
| `--ease-linear` | `linear` | Constant speed | Continuous rotations, progress bars |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerates | Elements leaving viewport |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | **Decelerates** ⭐ | **Most common** (entrances) |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth both ends | General transitions |
| `--ease-smooth` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Very gradual | Elegant, sophisticated |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Overshoots | Playful, attention-grabbing |

### Recommended Easing by Use Case

```css
/* Elements entering viewport (MOST COMMON) */
.card {
  animation: slideUp var(--duration-base) var(--ease-out);
}

/* Elements leaving viewport */
.modal-close {
  animation: fadeOut var(--duration-fast) var(--ease-in);
}

/* Smooth, elegant transitions */
.decorative-element {
  animation: float 6s var(--ease-smooth) infinite;
}

/* Playful interactions */
.notification {
  animation: slideInRight var(--duration-base) var(--ease-bounce);
}
```

### Default Recommendation

> **Use `var(--ease-out)` for 90% of animations**. It feels natural for elements appearing on screen.

---

## Keyframe Animations

Pre-defined, reusable animations for common patterns.

### Fade Animations

#### Fade In

Simple opacity transition.

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Usage:**
```css
.element {
  animation: fadeIn var(--duration-base) var(--ease-out);
}
```

#### Fade In with Scale

Opacity + subtle zoom effect.

```css
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Usage:**
```html
<div class="card" style="animation: fadeInScale 0.35s ease-out;">
  Card content
</div>
```

---

### Slide Animations

#### Slide Up

Most common entrance animation (from bottom).

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage:**
```html
<div class="animate-slide-up">
  Content slides in from bottom
</div>
```

#### Slide In Right

```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

#### Slide In Left

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**When to Use:**
- `slideUp` → Cards, content blocks (most common)
- `slideInRight` → Notifications, toasts
- `slideInLeft` → Sidebar panels

---

### Pulse Animations

#### Subtle Pulse

Gentle opacity + scale change for ambient elements.

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.02);
  }
}
```

**Usage:**
```html
<div class="animate-pulse">
  Badge or indicator
</div>
```

#### Pulse Badge

Special pulse with **shadow effect** for medical/emergency indicators.

```css
@keyframes pulse-badge {
  0%, 100% {
    box-shadow: 
      0 10px 20px -5px color-mix(in srgb, var(--color-error), transparent 60%),
      0 0 0 4px color-mix(in srgb, var(--color-error), transparent 90%);
  }
  50% {
    box-shadow: 
      0 10px 20px -5px color-mix(in srgb, var(--color-error), transparent 40%),
      0 0 0 6px color-mix(in srgb, var(--color-error), transparent 85%);
  }
}
```

**Usage:**
```html
<div class="bg-error text-white rounded-full px-4 py-2" 
     style="animation: pulse-badge 3s ease-in-out infinite;">
  🚑 EHBO Post
</div>
```

#### Pulse Dot

More pronounced pulse for status indicators.

```css
@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}
```

**Usage:**
```html
<span class="inline-block w-3 h-3 bg-success rounded-full"
      style="animation: pulse-dot 2s ease-in-out infinite;">
</span>
Online
```

---

### Float Animations

#### Simple Float

Gentle up-and-down motion.

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

**Usage:**
```html
<div class="animate-float">
  Floating icon or decorative element
</div>
```

#### Complex Float

Multi-directional floating with scale (for background blobs).

```css
@keyframes floatComplex {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.95);
  }
}
```

**Usage:**
```css
.decorative-blob {
  animation: floatComplex 20s var(--ease-smooth) infinite;
}
```

---

### Shimmer Animation

Creates a sweeping highlight effect (loading shimmer).

```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}
```

**Usage:**
```html
<div class="animate-shimmer w-full h-4 rounded-lg"></div>
```

**Requires Background:**
```css
.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--color-primary), transparent 90%) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
}
```

---

### Rotate Animations

#### Full Rotation

Continuous 360° spin.

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Usage:**
```html
<!-- Loading spinner -->
<svg class="w-6 h-6" style="animation: rotate 1s linear infinite;">
  ...
</svg>
```

#### Subtle Rotation

Gentle back-and-forth sway.

```css
@keyframes rotateSubtle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
```

---

## Utility Classes

Quick-apply animation classes for common scenarios.

### Available Utilities

| Class | Animation | Duration | Iterations | Usage |
|-------|-----------|----------|------------|-------|
| `.animate-fade-in` | fadeIn | 350ms | once | Simple entrance |
| `.animate-slide-up` | slideUp | 350ms | once | Card/content entrance |
| `.animate-pulse` | pulse | 3s | infinite | Badges, indicators |
| `.animate-float` | float | 6s | infinite | Decorative elements |
| `.animate-float-delay` | float (delayed) | 6s | infinite | Staggered floats |
| `.animate-shimmer` | shimmer | 2s | infinite | Loading states |
| `.animate-rotate` | rotate | 20s | infinite | Slow decorative spin |

### Usage Examples

```html
<!-- Simple entrance -->
<div class="animate-fade-in card-base">
  Fades in on load
</div>

<!-- Slide up entrance -->
<div class="animate-slide-up">
  Slides up from bottom
</div>

<!-- Pulsing badge -->
<span class="animate-pulse bg-accent text-white px-3 py-1 rounded-full">
  New
</span>

<!-- Floating icon -->
<div class="animate-float">
  🎵
</div>

<!-- Loading shimmer -->
<div class="animate-shimmer h-4 rounded-lg"></div>
```

---

## Scroll Reveal System

Automatically animate elements as they scroll into view using Alpine.js.

### Setup

The scroll reveal plugin is automatically available when using `@aaltjesdagen/ui`.

### Basic Usage

```html
<!-- Fade in on scroll -->
<div data-reveal="fade">
  Content fades in when scrolled into view
</div>

<!-- Slide up on scroll -->
<div data-reveal="slide">
  Content slides up when visible
</div>

<!-- Fade + scale -->
<div data-reveal="scale">
  Grows and fades in
</div>
```

### Delay Staggering

Create cascading animations:

```html
<div data-reveal="slide" data-reveal-delay="0">
  First item (no delay)
</div>
<div data-reveal="slide" data-reveal-delay="100">
  Second item (100ms delay)
</div>
<div data-reveal="slide" data-reveal-delay="200">
  Third item (200ms delay)
</div>
```

### Stagger Utility

For automatic staggering:

```html
<div class="stagger-children">
  <div>Item 1</div> <!-- 0ms delay -->
  <div>Item 2</div> <!-- 100ms delay -->
  <div>Item 3</div> <!-- 200ms delay -->
  <div>Item 4</div> <!-- 300ms delay -->
  <div>Item 5</div> <!-- 400ms delay -->
  <div>Item 6</div> <!-- 500ms delay -->
</div>
```

**CSS:**
```css
.stagger-children > * {
  animation: slideUp var(--duration-base) var(--ease-out);
}

.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 100ms; }
.stagger-children > *:nth-child(3) { animation-delay: 200ms; }
/* ... up to 6 children */
```

---

## Performance Guidelines

### ✅ DO: Use GPU-Accelerated Properties

Animate these (hardware-accelerated):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (use sparingly)

```css
/* GOOD */
.card:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}
```

### ❌ DON'T: Animate Layout Properties

Avoid animating these (causes reflow):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `padding`, `margin`

```css
/* BAD - causes layout recalculation */
.card:hover {
  width: 320px;
  margin-top: -10px;
}

/* GOOD - use transform instead */
.card:hover {
  transform: scale(1.05) translateY(-10px);
}
```

### Use `will-change` Sparingly

Only add `will-change` during the animation, not permanently:

```css
/* BAD */
.card {
  will-change: transform; /* Always on = memory waste */
}

/* GOOD */
.card:hover {
  will-change: transform; /* Only during interaction */
  animation: bounce 0.5s;
}
```

### Limit Backdrop Blur

`backdrop-filter: blur()` is expensive. Use judiciously:

```html
<!-- OK: Single glassmorphic navigation -->
<nav class="glass">...</nav>

<!-- BAD: Many blurred cards -->
<div class="grid grid-cols-4">
  <div class="glass">...</div>
  <div class="glass">...</div>
  <div class="glass">...</div>
  <div class="glass">...</div> <!-- 😱 Too much blur! -->
</div>
```

---

## Accessibility

### Respecting Motion Preferences

The design system **automatically** respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Disable infinite animations completely */
  .animate-pulse,
  .animate-float,
  .animate-shimmer,
  .animate-rotate,
  .stagger-children > * {
    animation: none !important;
  }
}
```

**This means:**
- ✅ Users who prefer reduced motion get instant transitions
- ✅ Infinite animations (pulse, float) are completely disabled
- ✅ Entrance animations still happen, just instantly
- ✅ No need to handle this manually

### Testing Reduced Motion

**Chrome DevTools:**
1. Open DevTools (F12)
2. `Cmd/Ctrl + Shift + P` → "Rendering"
3. Check "Emulate CSS prefers-reduced-motion: reduce"

**System Settings:**
- **macOS**: System Preferences → Accessibility → Display → Reduce Motion
- **Windows**: Settings → Ease of Access → Display → Show animations

---

## Migration Guide

### From Inline Animations to Tokens

#### Before (Inline)

```css
.my-card {
  transition: all 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.my-element {
  animation: slideIn 0.35s cubic-bezier(0, 0, 0.2, 1);
}
```

#### After (Using Tokens)

```css
.my-card {
  transition: all var(--transition-base);
}

/* No need to define keyframes - already available! */
.my-element {
  animation: slideUp var(--duration-base) var(--ease-out);
}
```

**Or use utility class:**
```html
<div class="animate-slide-up">
  Element
</div>
```

---

### Real Component Migrations

#### Example: Hover Effect

**Before:**
```css
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.card:hover {
  transform: translateY(-5px);
}
```

**After:**
```css
.card {
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
}
```

**Or use `.card-base` (already includes this):**
```html
<div class="card-base">
  ...
</div>
```

---

## Quick Reference

### Most Common Patterns

```css
/* 1. Simple fade entrance */
animation: fadeIn var(--duration-base) var(--ease-out);

/* 2. Slide up entrance (cards, content) */
animation: slideUp var(--duration-base) var(--ease-out);

/* 3. Hover lift */
transition: transform var(--transition-base);
&:hover {
  transform: translateY(-4px);
}

/* 4. Pulsing badge (infinite) */
animation: pulse 3s var(--ease-smooth) infinite;

/* 5. Loading spinner */
animation: rotate 1s linear infinite;

/* 6. Smooth all transitions */
transition: all var(--transition-base);
```

---

## Next Steps

- **[Components](./components.md)** - See animations in context
- **[Design Tokens](./design-tokens.md)** - All timing and easing tokens
- **[Accessibility](./accessibility.md)** - Motion accessibility guidelines
