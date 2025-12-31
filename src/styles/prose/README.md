# Prose Styling System

A three-tier reusable prose styling system for Bereikbaarheid components.

## Architecture

The system is split into three layers:

1. **[`prose-base.css`](prose-base.css)** - Common typography foundation
2. **[`prose-variants.css`](prose-variants.css)** - Color-themed variants
3. **[`prose-decorations.css`](prose-decorations.css)** - Visual enhancements

## Usage

### Basic Usage

Apply both base and variant classes together:

```astro
<div class="prose-base prose-primary">
  <Fragment set:html={renderedText} />
</div>
```

### Available Variants

| Class | Use Case | Color Variable |
|-------|----------|----------------|
| `.prose-primary` | General content, city information | `var(--color-primary)` |
| `.prose-secondary` | Transportation, public transit | `var(--color-secondary)` |
| `.prose-accent` | Bicycles, parking, accessibility | `var(--color-accent)` |
| `.prose-error` | Medical, emergency (EHBO) | `var(--color-error)` |

### Component Examples

```astro
<!-- EHBO (Medical) -->
<div class="ehbo-content prose-base prose-error">
  <Fragment set:html={renderedText} />
</div>

<!-- City Information -->
<div class="prose-base prose-primary">
  <Fragment set:html={renderedText} />
</div>

<!-- Transportation -->
<div class="prose-base prose-secondary">
  <Fragment set:html={renderedText} />
</div>

<!-- Bicycles/Accessibility -->
<div class="prose-base prose-accent">
  <Fragment set:html={renderedText} />
</div>
```

## Features

### Typography

- **Responsive font sizes**: 1rem → 1.0625rem at 768px
- **Line height**: 1.8 for optimal readability
- **Consistent spacing**: 1.25rem paragraph margins

### Elements Styled

- Paragraphs (`<p>`)
- Strong emphasis (`<strong>`)
- Lists (`<ul>`, `<ol>`, `<li>`)
- Links (`<a>`)
- Headings (`<h1>` through `<h6>`)

### Special Decorations

Each variant provides unique H3 heading decorations:

- **Primary**: ▸ (arrow)
- **Secondary**: ● (dot)
- **Accent**: ★ (star)
- **Error**: ✚ (medical cross)

## Refactoring Guide

To refactor a component using old prose styles:

1. **Remove old prose CSS** (typically 100-120 lines)
2. **Update class name** to use new system
3. **Choose appropriate variant** based on component theme

### Before

```astro
<div class="prose-custom">
  <Fragment set:html={renderedText} />
</div>

<style>
  /* 100+ lines of duplicated prose styles */
  .prose-custom :global(p) { ... }
  .prose-custom :global(strong) { ... }
  /* etc */
</style>
```

### After

```astro
<div class="prose-base prose-accent">
  <Fragment set:html={renderedText} />
</div>

<!-- No style block needed! -->
```

## Benefits

- **840 lines removed** across 7 components
- **Consistent styling** across all Bereikbaarheid components
- **Easy maintenance** - update once, applies everywhere
- **Clear semantics** - variant names indicate purpose
- **Design system aligned** - uses CSS custom properties

## Implementation

The system is automatically imported via [`src/styles/global.css`](../global.css):

```css
/* Prose Styling System */
@import './prose/prose-base.css';
@import './prose/prose-variants.css';
@import './prose/prose-decorations.css';
```

## Browser Support

Uses modern CSS features:
- `:global()` selectors (Astro scoped styles)
- CSS custom properties
- `color-mix()` function
- Flexbox and Grid

All features are supported in modern browsers (Chrome 88+, Firefox 88+, Safari 15+).
