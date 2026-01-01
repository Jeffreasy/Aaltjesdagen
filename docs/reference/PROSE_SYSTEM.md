# Prose Styling System

> **Context**: Typography for RichText (Storyblok).
> **Source**: [`packages/design-system/src/styles/prose/`](../../packages/design-system/src/styles/prose/)

A three-tier reusable prose styling system used primarily for Bereikbaarheid components and Richtext rendering.

## Architecture

1. **`prose-base.css`** - Common typography foundation (Size, Line-height).
2. **`prose-variants.css`** - Color-themed variants (Primary, Accent, Error).
3. **`prose-decorations.css`** - Visual enhancements (Bullet points, Link styles).

## Usage

Apply the base class and a variant class:

```astro
<div class="prose-base prose-primary">
  <Fragment set:html={renderedText} />
</div>
```

### Variants

| Class | Theme | Usage |
|-------|-------|-------|
| `.prose-primary` | Teal | General Information |
| `.prose-secondary` | Purple | Transport |
| `.prose-accent` | Coral | Highlights / Features |
| `.prose-error` | Red | Medical / Warnings |

### Special Decorations

Styled lists (`<ul>`) get custom markers based on the variant:
- **Primary**: Arrow (▸)
- **Secondary**: Dot (●)
- **Accent**: Star (★)
- **Error**: Cross (✚)

---

**Original Doc Updated:** January 1, 2026
