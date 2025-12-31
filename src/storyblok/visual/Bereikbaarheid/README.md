# Bereikbaarheid Components

Comprehensive component library for displaying accessibility and arrival information on the Aaltjesdagen website.

**Voor volledige design system documentatie, zie**: [`docs/DESIGN_SYSTEM.md`](../../../../docs/DESIGN_SYSTEM.md)

---

## Component Index

| Component | Design Pattern | File |
|-----------|----------------|------|
| **BereikbaarHero** | Glassmorphism card with accent bar | [`BereikbaarHero.astro`](./BereikbaarHero.astro) |
| **EhboPosten** | Medical theme with pulsing badge | [`EhboPosten.astro`](./EhboPosten.astro) |
| **InEnRondomDeBinnenstad** | Split layout with sticky title | [`InEnRondomDeBinnenstad.astro`](./InEnRondomDeBinnenstad.astro) |
| **OpenbaarVervoer** | Gradient split design | [`OpenbaarVervoer.astro`](./OpenbaarVervoer.astro) |
| **Parkeersectie** | Centered card with icon badge | [`Parkeersectie.astro`](./Parkeersectie.astro) |
| **ParkerenAutos** | Glassmorphism card with icon | [`ParkerenAutos.astro`](./ParkerenAutos.astro) |
| **StallenFietsen** | Sidebar accent design | [`StallenFietsen.astro`](./StallenFietsen.astro) |
| **Toegankelijkheid** | Corner decorations design | [`Toegankelijkheid.astro`](./Toegankelijkheid.astro) |

---

## Color Themes

Each component uses a specific theme color:

- **Primary** (Teal): General parking (ParkerenAutos, InEnRondomDeBinnenstad, Parkeersectie)
- **Accent** (Coral): Cycling & accessibility (StallenFietsen, Toegankelijkheid, OpenbaarVervoer)
- **Error** (Red): Emergency services (EhboPosten)

---

## Storyblok Integration

### Field Convention

**Standard fields** (meeste componenten):
- `title` (text) - Component heading
- `tekst` (richtext) - Main content

**Exceptions**:
- **BereikbaarHero**: Uses `tekst` (textarea) for plain text
- **Parkeersectie**: Uses `tekst` (text) + `foto` and `link` fields

### Component Registration

Registered in `astro.config.mjs`:

```javascript
components: {
  'BereikbaarHero': 'storyblok/visual/Bereikbaarheid/BereikbaarHero',
  'Parkeren Auto': 'storyblok/visual/Bereikbaarheid/ParkerenAutos',
  'Stallen fietsen': 'storyblok/visual/Bereikbaarheid/StallenFietsen',
  // etc.
}
```

---

## Design Patterns

### Glassmorphism
```css
background: color-mix(in srgb, var(--bg-elevated), transparent 10%);
backdrop-filter: blur(12px);
border: 1px solid var(--border-primary);
```

### Icon Badges
- Size: 4.5-5rem square
- Border-radius: 1-1.25rem
- Gradient backgrounds (theme-colored)

### Prose Variants
- `.prose-primary` - Teal links
- `.prose-accent` - Coral links  
- `.prose-error` - Red links

---

## Documentation

**Voor uitgebreide documentatie**:
- **[Component Library](../../../../docs/COMPONENTS.md)** - Complete component reference
- **[Design System](../../../../docs/DESIGN_SYSTEM.md)** - Design tokens & patterns
- **[Development Guide](../../../../docs/DEVELOPMENT.md)** - Workflows & best practices

---

**Last Updated**: 31 december 2024  
**Maintainer**: Aaltjesdagen Development Team


## Component Index

| Component | Purpose | Design Pattern | File |
|-----------|---------|----------------|------|
| **BereikbaarHero** | Hero banner for the Bereikbaarheid page | Glassmorphism card with accent bar | [`BereikbaarHero.astro`](./BereikbaarHero.astro) |
| **EhboPosten** | First aid station information | Medical theme with pulsing badge | [`EhboPosten.astro`](./EhboPosten.astro) |
| **InEnRondomDeBinnenstad** | City center navigation info | Split layout with sticky title | [`InEnRondomDeBinnenstad.astro`](./InEnRondomDeBinnenstad.astro) |
| **OpenbaarVervoer** | Public transport information | Gradient split design | [`OpenbaarVervoer.astro`](./OpenbaarVervoer.astro) |
| **Parkeersectie** | Parking section with image/link | Centered card with icon badge | [`Parkeersectie.astro`](./Parkeersectie.astro) |
| **ParkerenAutos** | Car parking details | Glassmorphism card with icon | [`ParkerenAutos.astro`](./ParkerenAutos.astro) |
| **StallenFietsen** | Bicycle parking information | Sidebar accent design | [`StallenFietsen.astro`](./StallenFietsen.astro) |
| **Toegankelijkheid** | Accessibility information | Corner decorations design | [`Toegankelijkheid.astro`](./Toegankelijkheid.astro) |

## Design System

### Color Themes

Each component uses a specific theme color to differentiate content types:

- **Primary** (🔵 Blue): General parking (ParkerenAutos, InEnRondomDeBinnenstad, Parkeersectie)
- **Secondary** (🟣 Purple): Public transport (OpenbaarVervoer)
- **Accent** (🟡 Yellow): Cycling & accessibility (StallenFietsen, Toegankelijkheid)
- **Error** (🔴 Red): Emergency services (EhboPosten)

### Design Patterns

#### 1. Glassmorphism
**Used in**: BereikbaarHero, ParkerenAutos, most card backgrounds

```css
background: color-mix(in srgb, var(--bg-elevated), transparent 10%);
backdrop-filter: blur(12px);
border: 1px solid var(--border-primary);
```

**Purpose**: Creates depth and modern aesthetic while maintaining readability

#### 2. Split Layouts
**Used in**: InEnRondomDeBinnenstad, OpenbaarVervoer

Left/right or top/bottom content division with distinct backgrounds. Creates visual separation between title and content areas.

#### 3. Icon Badges
**Used in**: All components

Gradient-filled rounded squares with emoji icons. Common characteristics:
- Size: 4.5-5rem square
- Border-radius: 1-1.25rem
- Gradient backgrounds (theme-colored)
- Drop shadow for depth
- Optional rotation (-3deg) with hover animation

#### 4. Decorative Elements
Multiple approaches used:
- **Accent bars**: Top/side gradient strips (BereikbaarHero, StallenFietsen)
- **Underlines**: Small gradient bars below titles (ParkerenAutos, InEnRondomDeBinnenstad)
- **Corner decorations**: L-shaped elements (Toegankelijkheid)
- **Medical strip**: Patterned accent (EhboPosten)

### Z-Index Hierarchy

All components follow the global z-index token system:

```css
--z-base: 1;        /* Background decorations, patterns */
--z-background: 5;  /* Background layers */
--z-content: 10;    /* Main content */
```

Exceptions:
- Alert indicators: `calc(var(--z-content) + 1)`
- Decorative overlays within components: `var(--z-base)`

### Prose System Integration

All richtext content uses the prose utility system (Priority 1.3 implementation):

```astro
<div class="prose-base prose-{variant}">
  <Fragment set:html={renderedText} />
</div>
```

**Prose Variants**:
- `.prose-primary` - Blue link accents (InEnRondomDeBinnenstad, ParkerenAutos)
- `.prose-secondary` - Purple link accents (OpenbaarVervoer)
- `.prose-accent` - Yellow link accents (StallenFietsen, Toegankelijkheid)
- `.prose-error` - Red link accents (EhboPosten)

See [`src/styles/prose/README.md`](../../../styles/prose/README.md) for more details.

## Storyblok Integration

### Field Naming Convention

As of Priority 1.2 standardization, all components use **`tekst`** for content (except BereikbaarHero and Parkeersectie which use plain text).

**Standard fields** (7 of 8 components):
- `title` (text) - Component heading
- `tekst` (richtext) - Main content

**Exceptions**:
- **BereikbaarHero**: Uses `tekst` (textarea) for plain text, not richtext
- **Parkeersectie**: Uses `tekst` (text) for plain text + additional `foto` and `link` fields

### Component Registration

All components are registered in Storyblok with snake_case names:

```javascript
{
  "bereikbaar_hero": BereikbaarHero,
  "ehbo_posten": EhboPosten,
  "in_en_rondom_de_binnenstad": InEnRondomDeBinnenstad,
  "openbaar_vervoer": OpenbaarVervoer,
  "parkeersectie": Parkeersectie,
  "parkeren_autos": ParkerenAutos,
  "stallen_fietsen": StallenFietsen,
  "toegankelijkheid": Toegankelijkheid
}
```

### Usage in Storyblok

1. **Create a new block** in the Storyblok visual editor
2. **Select component** from the Bereikbaarheid category
3. **Fill in fields**:
   - `title`: Component heading
   - `tekst`: Rich text content (or plain text for exceptions)
4. **Preview changes** in real-time with Storyblok's visual editor

### Rendering in Astro

```astro
---
import { storyblokEditable, renderRichText } from "@storyblok/astro";

const { blok } = Astro.props;
const title = blok.title || "";
const tekst = blok.tekst;
const renderedText = tekst ? renderRichText(tekst) : "";
---

<section {...storyblokEditable(blok)}>
  {title && <h2>{title}</h2>}
  {renderedText && (
    <div class="prose-base prose-primary">
      <Fragment set:html={renderedText} />
    </div>
  )}
</section>
```

## Responsive Behavior

All components follow a mobile-first responsive design:

### Breakpoints
- **Mobile**: < 768px - Single column, reduced padding, centered text
- **Tablet**: 768px-1023px - Moderate padding, some split layouts
- **Desktop**: ≥ 1024px - Full layouts, split columns, sticky positioning

### Common Responsive Patterns

**Padding**:
```css
padding: 2rem;          /* Mobile */
padding: 3rem 2.5rem;   /* Tablet (768px+) */
padding: 4rem 3.5rem;   /* Desktop (768px+) */
```

**Grid Layouts**:
```css
grid-template-columns: 1fr;        /* Mobile */
grid-template-columns: 1fr 2fr;    /* Desktop (1024px+) */
```

**Typography Scaling**:
```css
font-size: 2rem;      /* Mobile */
font-size: 2.5rem;    /* Tablet (768px+) */
font-size: 3rem;      /* Desktop (768px+) */
```

## Accessibility Features

All components implement comprehensive accessibility:

### Semantic HTML
- Proper heading hierarchy (`<h1>`, `<h2>`)
- Semantic sectioning (`<section>`)
- Meaningful alt text for images

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators visible (via CSS custom properties)
- Logical tab order maintained

### Screen Reader Support
- Storyblok editable attributes preserved
- ARIA labels where appropriate
- Content structure logical for screen readers

### Color Contrast
- Text meets WCAG 2.1 AA standards (4.5:1 for body text)
- UI elements meet 3:1 contrast ratio
- Dark mode maintains accessibility

### Motion Preferences
Components respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance Considerations

### Backdrop-Filter Usage

6 of 8 components use `backdrop-filter: blur()`:

| Component | Blur Amount | Performance Impact |
|-----------|-------------|-------------------|
| ParkerenAutos | 16px | ⚠️ High - consider reducing |
| BereikbaarHero | 12px | ✅ Moderate |
| EhboPosten | 12px, 8px | ✅ Moderate |
| InEnRondomDeBinnenstad | 12px | ✅ Moderate |
| StallenFietsen | 12px | ✅ Moderate |
| Toegankelijkheid | 12px | ✅ Moderate |

**Optimization Strategy**: Use `@supports` query for progressive enhancement:

```css
@supports (backdrop-filter: blur(12px)) {
  .card {
    backdrop-filter: blur(12px);
  }
}
```

### Image Optimization

Parkeersectie includes image optimization:

```javascript
const optimizedImageUrl = imageUrl
  ? `${imageUrl}/m/800x600/filters:quality(80):format(webp)`
  : null;
```

## Migration Notes

### Field Renaming (Priority 1.2)

**Action Required in Storyblok CMS**:

1. **BereikbaarHero**: Rename field `text` → `tekst`
2. **Parkeersectie**: Rename field `content` → `tekst`

These changes standardize field naming across all Bereikbaarheid components.

### Tailwind to Scoped CSS (Priority 1.1)

**Parkeersectie** has been refactored from Tailwind utility classes to scoped CSS. This aligns with the design system used by the other 7 components.

**Before**: `class="flex items-center justify-center ..."`  
**After**: Scoped CSS with design tokens

## Development Guide

### Adding a New Component

1. **Create component file**: `ComponentName.astro`
2. **Follow naming convention**: Use PascalCase for file, snake_case for Storyblok
3. **Implement standard structure**:
   - Import Storyblok utilities
   - Define field mapping
   - Add responsive glassmorphism card
   - Include icon badge
   - Apply appropriate prose variant
   - Add z-index layer management
4. **Register in Storyblok**: Add to component schema
5. **Document**: Create `ComponentName.md` file

### Code Style Guidelines

- **CSS Custom Properties**: Use design tokens from `global.css`
- **Spacing**: Use `--space-*` tokens or rem units
- **Colors**: Use semantic color variables (`--text-primary`, `--bg-elevated`)
- **Transitions**: Use `var(--transition-base)` or `var(--transition-slow)`
- **Shadows**: Use `var(--shadow-lg)`, `var(--shadow-xl)`

### Testing Checklist

- [ ] Visual consistency across breakpoints
- [ ] Dark mode support
- [ ] Storyblok visual editor integration
- [ ] Richtext content renders correctly
- [ ] Hover effects work smoothly
- [ ] Keyboard navigation functional
- [ ] Screen reader announces content properly
- [ ] Performance acceptable (< 32ms paint time)

## Related Documentation

### Component-Specific Docs
- [`BereikbaarHero.md`](./BereikbaarHero.md)
- [`EhboPosten.md`](./EhboPosten.md)
- [`InEnRondomDeBinnenstad.md`](./InEnRondomDeBinnenstad.md)
- [`OpenbaarVervoer.md`](./OpenbaarVervoer.md)
- [`Parkeersectie.md`](./Parkeersectie.md)
- [`ParkerenAutos.md`](./ParkerenAutos.md)
- [`StallenFietsen.md`](./StallenFietsen.md)
- [`Toegankelijkheid.md`](./Toegankelijkheid.md)

### Design System Docs
- [`src/styles/prose/README.md`](../../../styles/prose/README.md) - Prose system documentation
- [`src/styles/global.css`](../../../styles/global.css) - Design tokens and utilities
- [`plans/design-system-analysis.md`](../../../../plans/design-system-analysis.md) - Design system overview
- [`plans/z-index-hierarchy-analysis.md`](../../../../plans/z-index-hierarchy-analysis.md) - Z-index management

### Refactoring Docs
- [`plans/bereikbaarheid-refactor-plan.md`](../../../../plans/bereikbaarheid-refactor-plan.md) - Part 1: Analysis & Priority 1
- [`plans/bereikbaarheid-refactor-plan-part2.md`](../../../../plans/bereikbaarheid-refactor-plan-part2.md) - Part 2: Priorities 2 & 3

## Future Enhancements (Priority 3)

### Planned Improvements

1. **Base Component Extraction** (Priority 3.1):
   - `IconBadge.astro` - Reusable icon badge component
   - `DecorativeUnderline.astro` - Gradient underline component
   - `ContentCard.astro` - Glassmorphism card wrapper

2. **TypeScript Integration** (Priority 2.3):
   - `types.ts` - Type definitions for all components
   - Props interfaces with JSDoc documentation
   - Type guards and utility types

3. **Animation Token System** (Priority 3.2):
   - Centralized keyframes in `animations.css`
   - Timing function tokens
   - Unified pulse/float animations

4. **Performance Optimizations** (Priority 3.3):
   - Backdrop-filter audit and reduction
   - `@supports` feature detection
   - Reduced motion fallbacks

See [`bereikbaarheid-refactor-plan-part2.md`](../../../../plans/bereikbaarheid-refactor-plan-part2.md) for detailed implementation plans.

---

**Last Updated**: December 31, 2024  
**Status**: ✅ Components Complete - Documentation In Progress  
**Maintainer**: Aaltjesdagen Development Team
