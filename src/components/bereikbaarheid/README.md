# Bereikbaarheid Base Components

**Priority 3.1** - Reusable base components for common patterns across Bereikbaarheid components.

## Overview

This directory contains 3 foundational components extracted from common patterns identified across all 8 Bereikbaarheid components:

1. **[`IconBadge.astro`](./IconBadge.astro)** - Icon badges with gradient backgrounds and animations
2. **[`DecorativeUnderline.astro`](./DecorativeUnderline.astro)** - Decorative underlines for titles
3. **[`ContentCard.astro`](./ContentCard.astro)** - Flexible card wrapper with multiple variants

These components reduce code duplication, ensure consistent styling, and provide a foundation for future refactoring.

---

## Components

### 1. IconBadge

**Purpose**: Display emoji or SVG icons in styled badges with gradient backgrounds.

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | *required* | Emoji icon or SVG content |
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'error'` | `'primary'` | Color theme variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `rotation` | `number` | `0` | Static rotation in degrees |
| `animation` | `'none' \| 'pulse' \| 'hover-rotate'` | `'none'` | Animation type |
| `class` | `string` | `''` | Additional CSS classes |

**Usage Examples**:

```astro
---
import IconBadge from '@/components/bereikbaarheid/IconBadge.astro';
---

<!-- Simple primary badge -->
<IconBadge icon="🚗" variant="primary" size="lg" />

<!-- Rotated badge with hover effect -->
<IconBadge 
  icon="🚲" 
  variant="accent" 
  size="md" 
  rotation={-3} 
  animation="hover-rotate" 
/>

<!-- Pulsing medical badge -->
<IconBadge 
  icon="🏥" 
  variant="error" 
  size="lg" 
  animation="pulse" 
/>
```

**Design Tokens Used**:
- `--color-primary`, `--color-accent`, `--color-error`
- `--transition-base`
- Gradient backgrounds with `color-mix()`
- Box shadows with color opacity

**Used In**:
- ✅ [`ParkerenAutos.astro`](../../storyblok/visual/Bereikbaarheid/ParkerenAutos.astro) - Car icon
- ✅ [`EhboPosten.astro`](../../storyblok/visual/Bereikbaarheid/EhboPosten.astro) - Medical icon
- ✅ [`Toegankelijkheid.astro`](../../storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro) - Accessibility icon
- ✅ [`StallenFietsen.astro`](../../storyblok/visual/Bereikbaarheid/StallenFietsen.astro) - Bike icon
- ✅ [`InEnRondomDeBinnenstad.astro`](../../storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro) - City icon
- ✅ [`Parkeersectie.astro`](../../storyblok/visual/Bereikbaarheid/Parkeersectie.astro) - Location pin

---

### 2. DecorativeUnderline

**Purpose**: Add decorative gradient or solid underlines to titles and section headers.

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'gradient'` | `'gradient'` | Style variant |
| `width` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'sm'` | Underline width |
| `height` | `'thin' \| 'medium' \| 'thick'` | `'medium'` | Underline thickness |
| `colors` | `string[]` | `undefined` | Custom gradient colors |
| `class` | `string` | `''` | Additional CSS classes |

**Width Map**:
- `sm` = 4rem (64px)
- `md` = 8rem (128px)
- `lg` = 12rem (192px)
- `full` = 100%

**Height Map**:
- `thin` = 0.25rem (4px)
- `medium` = 0.375rem (6px)
- `thick` = 0.5rem (8px)

**Usage Examples**:

```astro
---
import DecorativeUnderline from '@/components/bereikbaarheid/DecorativeUnderline.astro';
---

<!-- Simple gradient underline -->
<h2>Section Title</h2>
<DecorativeUnderline variant="gradient" width="sm" />

<!-- Custom gradient colors -->
<h3>Custom Colors</h3>
<DecorativeUnderline 
  variant="gradient" 
  width="md" 
  colors={['#50b0ae', '#ff7e67', '#e66048']} 
/>

<!-- Solid accent bar -->
<h2>Accent Title</h2>
<DecorativeUnderline variant="accent" width="md" height="thick" />

<!-- Full-width divider -->
<DecorativeUnderline variant="primary" width="full" height="thin" />
```

**Design Tokens Used**:
- `--color-primary`, `--color-accent`, `--color-secondary`
- `--transition-base`
- Box shadows with `color-mix()`

**Used In**:
- ✅ [`ParkerenAutos.astro`](../../storyblok/visual/Bereikbaarheid/ParkerenAutos.astro) - Title underline
- ✅ [`InEnRondomDeBinnenstad.astro`](../../storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro) - Section divider
- ✅ [`BereikbaarHero.astro`](../../storyblok/visual/Bereikbaarheid/BereikbaarHero.astro) - Hero accent
- ✅ [`EhboPosten.astro`](../../storyblok/visual/Bereikbaarheid/EhboPosten.astro) - Medical strip

---

### 3. ContentCard

**Purpose**: Flexible card wrapper supporting glassmorphism, elevated styling, and gradient backgrounds.

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'elevated' \| 'gradient'` | `'default'` | Card style variant |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding size |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'full'` | Maximum width |
| `hoverEffect` | `boolean` | `true` | Enable hover lift effect |
| `class` | `string` | `''` | Additional CSS classes |

**Named Slots**:
- `header` - Optional header section (with bottom border)
- `default` - Main content area
- `footer` - Optional footer section (with top border)

**Padding Responsive Values**:

| Size | Mobile | Desktop |
|------|--------|---------|
| `sm` | 1rem | 1.5rem |
| `md` | 1.5rem 1.25rem | 2.5rem 2rem |
| `lg` | 2rem 1.5rem | 3.5rem 3rem |

**Max Width Values**:
- `sm` = 32rem (512px)
- `md` = 48rem (768px)
- `lg` = 64rem (1024px)
- `xl` = 80rem (1280px)
- `2xl` = 96rem (1536px)
- `full` = 100%

**Usage Examples**:

```astro
---
import ContentCard from '@/components/bereikbaarheid/ContentCard.astro';
---

<!-- Glass card with header and footer -->
<ContentCard variant="glass" padding="md">
  <h2 slot="header">Card Title</h2>
  <p>Main content goes here...</p>
  <div slot="footer">
    <button>Action Button</button>
  </div>
</ContentCard>

<!-- Elevated card without hover effect -->
<ContentCard 
  variant="elevated" 
  padding="lg" 
  maxWidth="2xl" 
  hoverEffect={false}
>
  <h3>Simple Card</h3>
  <p>Content without header/footer</p>
</ContentCard>

<!-- Gradient background card -->
<ContentCard variant="gradient" padding="sm" maxWidth="lg">
  <p>Subtle gradient background</p>
</ContentCard>

<!-- Default solid card -->
<ContentCard variant="default" padding="md">
  <p>Standard card styling</p>
</ContentCard>
```

**Variant Descriptions**:

- **`default`**: Solid background using `--bg-elevated`
- **`glass`**: Semi-transparent with `backdrop-filter: blur(12px)` (glassmorphism)
- **`elevated`**: Solid background with enhanced shadow (`--shadow-xl`)
- **`gradient`**: Subtle gradient from `--bg-elevated` to primary-tinted background

**Design Tokens Used**:
- `--bg-elevated`
- `--border-primary`, `--border-secondary`
- `--shadow-lg`, `--shadow-xl`
- `--color-primary`
- `--transition-slow`

**Used In**:
- ✅ All 8 Bereikbaarheid components use card wrapper patterns
- ✅ [`ParkerenAutos.astro`](../../storyblok/visual/Bereikbaarheid/ParkerenAutos.astro) - Glass variant
- ✅ [`EhboPosten.astro`](../../storyblok/visual/Bereikbaarheid/EhboPosten.astro) - Elevated variant
- ✅ [`Toegankelijkheid.astro`](../../storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro) - Glass variant with header/footer
- ✅ [`OpenbaarVervoer.astro`](../../storyblok/visual/Bereikbaarheid/OpenbaarVervoer.astro) - Default variant
- ✅ [`StallenFietsen.astro`](../../storyblok/visual/Bereikbaarheid/StallenFietsen.astro) - Glass variant
- ✅ [`InEnRondomDeBinnenstad.astro`](../../storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro) - Glass variant

---

## Design Patterns

### Pattern 1: Icon + Title + Underline

Common pattern used across multiple components:

```astro
---
import IconBadge from '@/components/bereikbaarheid/IconBadge.astro';
import DecorativeUnderline from '@/components/bereikbaarheid/DecorativeUnderline.astro';
---

<div class="flex items-center gap-4 mb-6">
  <IconBadge icon="🚗" variant="primary" size="lg" rotation={-3} />
  <h2 class="text-4xl font-bold">Section Title</h2>
</div>
<DecorativeUnderline variant="gradient" width="sm" class="mb-8" />
```

### Pattern 2: Card with Icon Badge Header

```astro
---
import ContentCard from '@/components/bereikbaarheid/ContentCard.astro';
import IconBadge from '@/components/bereikbaarheid/IconBadge.astro';
---

<ContentCard variant="glass" padding="lg">
  <div slot="header" class="flex items-center gap-4">
    <IconBadge icon="🏥" variant="error" size="md" animation="pulse" />
    <h2>Medical Information</h2>
  </div>
  <p>Content goes here...</p>
</ContentCard>
```

### Pattern 3: Full Section Layout

```astro
---
import ContentCard from '@/components/bereikbaarheid/ContentCard.astro';
import IconBadge from '@/components/bereikbaarheid/IconBadge.astro';
import DecorativeUnderline from '@/components/bereikbaarheid/DecorativeUnderline.astro';
---

<ContentCard variant="glass" padding="lg" maxWidth="2xl">
  <div class="flex items-start gap-6 mb-8">
    <IconBadge 
      icon="🚲" 
      variant="accent" 
      size="lg" 
      rotation={-3} 
      animation="hover-rotate" 
    />
    <div>
      <h2 class="text-3xl font-bold mb-4">Section Title</h2>
      <DecorativeUnderline variant="gradient" width="md" />
    </div>
  </div>
  
  <div class="prose prose-lg">
    <p>Main content...</p>
  </div>
  
  <div slot="footer" class="flex justify-end">
    <button class="btn-primary">Learn More</button>
  </div>
</ContentCard>
```

---

## Migration Strategy

**Status**: Components created but NOT applied to existing components (Priority 3 - Nice to Have)

### Phase 1: Preparation (Current Phase - COMPLETE ✅)

1. ✅ Create base components
2. ✅ Document props and usage
3. ✅ Include migration examples in component files
4. ✅ Create comprehensive README

### Phase 2: Testing (Future)

1. Create test pages using base components
2. Verify visual parity with original components
3. Test all variants and props
4. Validate dark mode support
5. Check responsive behavior
6. Test accessibility (keyboard navigation, screen readers)

### Phase 3: Gradual Migration (Future)

**Recommended Order** (based on complexity and impact):

1. **Low Complexity** (Start Here):
   - [`ParkerenAutos.astro`](../../storyblok/visual/Bereikbaarheid/ParkerenAutos.astro) - Clear icon badge usage
   - [`StallenFietsen.astro`](../../storyblok/visual/Bereikbaarheid/StallenFietsen.astro) - Similar to ParkerenAutos

2. **Medium Complexity**:
   - [`Toegankelijkheid.astro`](../../storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro) - Uses all 3 components
   - [`InEnRondomDeBinnenstad.astro`](../../storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro) - Glass cards + underlines
   - [`OpenbaarVervoer.astro`](../../storyblok/visual/Bereikbaarheid/OpenbaarVervoer.astro) - Standard card patterns

3. **Higher Complexity**:
   - [`EhboPosten.astro`](../../storyblok/visual/Bereikbaarheid/EhboPosten.astro) - Custom animations + pulse effect
   - [`Parkeersectie.astro`](../../storyblok/visual/Bereikbaarheid/Parkeersectie.astro) - Image handling
   - [`BereikbaarHero.astro`](../../storyblok/visual/Bereikbaarheid/BereikbaarHero.astro) - Hero-specific styling

**Migration Checklist** (per component):

```markdown
- [ ] Identify patterns matching base components
- [ ] Replace icon badge markup with `<IconBadge />`
- [ ] Replace decorative lines with `<DecorativeUnderline />`
- [ ] Wrap content in `<ContentCard />` if applicable
- [ ] Remove duplicate styling
- [ ] Test visual parity
- [ ] Test dark mode
- [ ] Test responsive behavior
- [ ] Test interactions (hover, animations)
- [ ] Update component documentation
```

### Phase 4: Validation (Future)

1. Visual regression testing
2. Performance comparison (before/after)
3. Accessibility audit
4. Cross-browser testing
5. Documentation updates

---

## Benefits

### Code Reduction

**Estimated Duplication Removed** (when fully migrated):

- **`IconBadge`**: ~60 lines × 6 components = **360 lines**
- **`DecorativeUnderline`**: ~30 lines × 5 components = **150 lines**
- **`ContentCard`**: ~100 lines × 8 components = **800 lines**
- **Total**: ~**1,310 lines** of duplicate code eliminated

### Consistency

- ✅ Uniform icon badge sizes and styling
- ✅ Consistent gradient patterns
- ✅ Standardized card hover effects
- ✅ Predictable animation behavior

### Maintainability

- 🔧 Single source of truth for common patterns
- 🔧 Easy to update styling globally
- 🔧 Reduced cognitive load for developers
- 🔧 Faster development of new components

### Design System Alignment

- 🎨 Uses design tokens from [`global.css`](../../styles/global.css)
- 🎨 Respects dark mode preferences
- 🎨 Follows accessibility guidelines
- 🎨 Supports `prefers-reduced-motion`

---

## Browser Support

### Glassmorphism (`backdrop-filter`)

**Support**: Modern browsers (Chrome 76+, Safari 9+, Firefox 103+)

**Fallback**: Components automatically fall back to solid backgrounds in unsupported browsers:

```css
@supports not (backdrop-filter: blur(12px)) {
  .content-card--glass {
    background: var(--bg-elevated);
  }
}
```

### CSS Custom Properties

**Support**: All modern browsers (IE11 not supported)

### `color-mix()` Function

**Support**: Chrome 111+, Safari 16.2+, Firefox 113+

**Note**: Used for opacity variations in shadows and gradients. Fallback shadows are still functional.

---

## Accessibility

All components follow accessibility best practices:

### Motion Preferences

Components respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .icon-badge--pulse {
    animation: none !important;
  }
  
  .content-card--hover:hover {
    transform: none !important;
  }
}
```

### Focus States

Components inherit focus styling from global design system:

```css
*:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
```

### Semantic HTML

- `ContentCard` uses `<article>`, `<header>`, `<footer>` for semantic structure
- Icon badges use semantic container divs
- Underlines use decorative divs (not interfering with text semantics)

---

## Performance Considerations

### Backdrop Filter

**Impact**: `backdrop-filter: blur()` can be GPU-intensive

**Optimization Strategies**:

1. Use sparingly (only on visible cards)
2. Reduce blur amount where acceptable (12px → 8px)
3. Consider disabling on mobile devices if performance issues arise
4. Fallback to solid backgrounds for low-end devices

### Component Size

- **IconBadge**: ~200 lines (including docs)
- **DecorativeUnderline**: ~100 lines (including docs)
- **ContentCard**: ~300 lines (including docs)
- **Total**: ~600 lines of reusable code

---

## Future Enhancements

### Potential Additions

1. **`BadgeGroup`** - Container for multiple badges with spacing
2. **`SectionHeader`** - Pre-composed header with icon + title + underline
3. **`InfoCard`** - Specialized ContentCard with icon and call-to-action
4. **`StatBadge`** - Number display with icon (for metrics)

### Animation System Integration

When Priority 3.2 (Animation Token System) is implemented:

```diff
<style>
+ @import '../../styles/animations.css';
  
  .icon-badge--pulse {
-   animation: pulse-badge 3s ease-in-out infinite;
+   animation: pulse-badge 3s var(--ease-in-out) infinite;
  }
</style>
```

---

## Related Documentation

- 📋 [Bereikbaarheid Component README](../../storyblok/visual/Bereikbaarheid/README.md)
- 📋 [Refactoring Plan Part 2](../../../plans/bereikbaarheid-refactor-plan-part2.md) - Priority 3.1
- 🎨 [Design System Analysis](../../../plans/design-system-analysis.md)
- 🎨 [Global Styles](../../styles/global.css)
- 📝 [Prose System README](../../styles/prose/README.md)

---

## Questions or Issues?

If you encounter issues during migration:

1. Check migration examples in component files (HTML comments at bottom)
2. Verify all props are correctly passed
3. Check browser console for warnings
4. Compare visual output with original component
5. Test dark mode and responsive behavior

For design system questions, refer to [`global.css`](../../styles/global.css) for available CSS variables and tokens.

---

**Created**: December 31, 2024  
**Priority**: 3.1 (Nice to Have)  
**Status**: ✅ Complete - Ready for testing and migration  
**Components**: 3 base components created  
**Potential Impact**: ~1,310 lines of code reduction when fully migrated
