# Prose System

Typography and formatting system for rich text content. Perfect for blog posts, articles, documentation, and Storyblok rich text rendering.

## Table of Contents

- [Overview](#overview)
- [Prose Base](#prose-base)
- [Prose Variants](#prose-variants)
- [Prose Decorations](#prose-decorations)
- [Storyblok Integration](#storyblok-integration)
- [Usage Examples](#usage-examples)

---

## Overview

The prose system provides **beautiful, accessible typography** for long-form content with:
- ✅ **Responsive font sizes** (scales with viewport)
- ✅ **Consistent spacing** and rhythm
- ✅ **Theme-aware colors** (light/dark mode)
- ✅ **Variant styles** for different content types
- ✅ **Decorative elements** (icons, badges)

**Philosophy**: Apply prose classes to **containers** - child elements (p, h1-h6, ul, ol, a) are automatically styled.

---

## Prose Base

### Basic Usage

Apply `.prose-base` to any container with rich text:

```astro
<div class="prose-base">
  <h1>Article Title</h1>
  <p>This paragraph will be automatically styled with proper spacing, line height, and responsive font sizes.</p>
  <ul>
    <li>Bullet points are styled</li>
    <li>With consistent spacing</li>
  </ul>
</div>
```

### What Gets Styled

`.prose-base` automatically styles:

| Element | Styling |
|---------|---------|
| `<p>` | 1rem → 1.0625rem (responsive), 1.8 line-height, `--text-secondary` |
| `<strong>` | Font-weight 700 |
| `<ul>`, `<ol>` | Grid layout, 2rem margin, 1rem gap |
| `<li>` | Padding, positioned markers |
| `<a>` | No underline, bottom border on hover, font-weight 600 |
| `<h1>`-`<h6>` | Bold, `--text-primary`, consistent margins |

### Features

**Responsive Typography**:
```css
/* Mobile */
font-size: 1rem;

/* Desktop (768px+) */
font-size: 1.0625rem;
```

**Consistent Spacing**:
- Paragraphs: `1.25rem` bottom margin
- Lists: `2rem` vertical margin, `1rem` gap
- Headings: `2rem` top, `1rem` bottom

---

## Prose Variants

Variants control **colors** and **theme** of prose content. Combine with `.prose-base`.

### Available Variants

#### `.prose-primary`

**Primary brand color** (teal) for links, markers, and accents.

```astro
<div class="prose-base prose-primary">
  <p>Links and bullets will be <a href="#">teal</a>.</p>
  <ul>
    <li>Teal bullet markers</li>
  </ul>
</div>
```

**Colors**:
- Links: `--color-primary`
- Markers: `--color-primary`
- Strong: `--color-primary-text`
- Border (hover): `--color-primary`

---

#### `.prose-accent`

**Accent color** (red/orange) for emphasized content.

```astro
<div class="prose-base prose-accent">
  <p>This content uses <strong>accent colors</strong>.</p>
</div>
```

**Colors**:
- Links: `--color-accent`
- Markers: `--color-accent`
- Strong: `--color-accent-dark`

---

#### `.prose-neutral`

**Neutral colors** for subtle, professional content.

```astro
<div class="prose-base prose-neutral">
  <p>Minimal styling with neutral tones.</p>
</div>
```

**Colors**:
- Links: `--text-primary`
- Markers: `--text-tertiary`
- Strong: `--text-primary`

---

### Choosing a Variant

| Use Case | Variant |
|----------|---------|
| Main article content | `.prose-primary` |
| Important callouts, CTAs | `.prose-accent` |
| Subtle text, disclaimers | `.prose-neutral` |
| Storyblok rich text | `.prose-primary` (default) |

---

## Prose Decorations

Add visual enhancements to prose content.

### Icon Decorations

Add icons before list items:

```astro
<div class="prose-base prose-primary prose-icon-check">
  <ul>
    <li>Checkmark before this item</li>
    <li>And this one too</li>
  </ul>
</div>
```

**Available Icons**:
- `.prose-icon-check` - ✓ Checkmark (success, features)
- `.prose-icon-arrow` - → Arrow (steps, directions)
- `.prose-icon-star` - ★ Star (highlights, premium)

**Custom Icons**:
```css
.prose-custom-icon :global(li)::before {
  content: '🎵';
  margin-right: 0.75rem;
}
```

---

### Badge Decorations

Inline badges for status, labels:

```astro
<div class="prose-base">
  <p>
    This feature is <span class="prose-badge prose-badge-new">New</span>
  </p>
</div>
```

**Badge Variants**:
- `.prose-badge-new` - "NEW" badge (blue)
- `.prose-badge-beta` - "BETA" badge (orange)
- `.prose-badge-pro` - "PRO" badge (purple)

---

## Storyblok Integration

### Rendering Storyblok Rich Text

Use the `renderText` utility with prose classes:

```astro
---
import { renderText } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
const html = renderText(blok.content);
---

<div class="prose-base prose-primary" set:html={html} />
```

### Complete Example

```astro
---
import { renderText, getTitle } from '@aaltjesdagen/ui/utils';

const { blok } = Astro.props;
const title = getTitle(blok);
const content = renderText(blok.tekst);
---

<article class="prose-base prose-primary">
  <h1>{title}</h1>
  <div set:html={content} />
</article>
```

---

## Usage Examples

### Blog Post

```astro
<article class="max-w-3xl mx-auto prose-base prose-primary">
  <h1>How to Plan the Perfect Festival</h1>
  
  <p class="text-lg text-text-secondary">
    A comprehensive guide to festival planning.
  </p>
  
  <h2>Step 1: Choose Your Location</h2>
  <p>Location is everything when planning a festival...</p>
  
  <h3>Consider These Factors</h3>
  <ul>
    <li>Accessibility for attendees</li>
    <li>Parking and transport</li>
    <li>Nearby amenities</li>
  </ul>
  
  <p>
    Need help? Check out our <a href="/guide">complete planning guide</a>.
  </p>
</article>
```

---

### Documentation Page

```astro
<div class="prose-base prose-neutral max-w-4xl">
  <h1>API Documentation</h1>
  
  <h2>Authentication</h2>
  <p>All API requests require authentication via API key.</p>
  
  <h3>Example Request</h3>
  <pre><code>
  GET /api/events
  Authorization: Bearer YOUR_API_KEY
  </code></pre>
  
  <h3>Parameters</h3>
  <ul class="prose-icon-check">
    <li><strong>date</strong> (optional) - Filter by date</li>
    <li><strong>category</strong> (optional) - Filter by category</li>
  </ul>
</div>
```

---

### Marketing Content

```astro
<div class="prose-base prose-accent">
  <h2>Why Choose Aaltjesdagen?</h2>
  
  <ul class="prose-icon-star">
    <li>
      <strong>Premium Experience</strong>
      <span class="prose-badge prose-badge-pro">PRO</span>
      <br>
      World-class artists and venues
    </li>
    <li>
      <strong>Family Friendly</strong><br>
      Activities for all ages
    </li>
    <li>
      <strong>Sustainable</strong>
      <span class="prose-badge prose-badge-new">NEW</span>
      <br>
      100% carbon neutral event
    </li>
  </ul>
</div>
```

---

### Mixed Variants

```astro
<div class="max-w-4xl mx-auto">
  <!-- Main content - Primary -->
  <div class="prose-base prose-primary mb-12">
    <h1>Festival Guide</h1>
    <p>Everything you need to know about the festival.</p>
  </div>
  
  <!-- Callout - Accent -->
  <div class="prose-base prose-accent bg-accent/10 p-6 rounded-xl mb-12">
    <h3>Important Notice</h3>
    <p>Tickets are selling fast! <a href="/tickets">Get yours now</a>.</p>
  </div>
  
  <!-- Footer - Neutral -->
  <div class="prose-base prose-neutral">
    <p class="text-sm">Last updated: January 2026</p>
  </div>
</div>
```

---

## Customization

### Override Prose Styles

Create custom prose variants:

```css
/* custom-prose.css */
.prose-custom {
  /* Inherit base styles */
  @apply prose-base;
}

.prose-custom :global(p) {
  font-size: 1.125rem;
  line-height: 2;
}

.prose-custom :global(a) {
  color: #8b5cf6;  /* Purple links */
  border-bottom-color: #8b5cf6;
}

.prose-custom :global(strong) {
  color: #7c3aed;
}
```

---

### Responsive Font Sizes

```css
.prose-large :global(p) {
  font-size: 1.125rem;
}

@media (min-width: 768px) {
  .prose-large :global(p) {
    font-size: 1.25rem;
  }
}
```

---

## Best Practices

### ✅ DO

- **Use `.prose-base`** as the foundation
- **Combine with variants** for color theming
- **Apply to containers**, not individual elements
- **Use with Storyblok** `renderText()` utility
- **Test in light and dark mode**

### ❌ DON'T

- **Mix multiple variants** on same container
- **Apply to buttons or form inputs** (use specific component classes)
- **Override individual element styles** inline (create a custom variant)
- **Forget responsive testing**

---

## Prose Class Reference

### Base Classes

| Class | Purpose |
|-------|---------|
| `.prose-base` | Foundation typography styles |

### Variant Classes

| Class | Theme | Use Case |
|-------|-------|----------|
| `.prose-primary` | Teal (brand) | Main content, articles |
| `.prose-accent` | Red/Orange | Callouts, CTAs |
| `.prose-neutral` | Gray | Subtle content, legal text |

### Decoration Classes

| Class | Effect |
|-------|--------|
| `.prose-icon-check` | ✓ before list items |
| `.prose-icon-arrow` | → before list items |
| `.prose-icon-star` | ★ before list items |
| `.prose-badge-new` | "NEW" badge |
| `.prose-badge-beta` | "BETA" badge |
| `.prose-badge-pro` | "PRO" badge |

---

## Next Steps

- **[Design Tokens](./design-tokens.md)** - Typography tokens
- **[Utilities](./utilities.md)** - Storyblok rendering helpers
- **[Theming](./theming.md)** - Create custom prose themes
