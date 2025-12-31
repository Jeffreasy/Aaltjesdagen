# Bereikbaarheid Refactoring Plan - Part 2

**Continuation from [bereikbaarheid-refactor-plan.md](./bereikbaarheid-refactor-plan.md)**

This document continues the comprehensive architectural design plan, covering the remaining priorities and implementation details.

---

## Priority 2: Medium Impact Changes (Continued)

### 2.3 TypeScript Interface Architecture

**Objective**: Add type safety for all 8 Bereikbaarheid components through TypeScript interfaces.

#### File Structure

Create new TypeScript definition file:

```
src/storyblok/visual/Bereikbaarheid/
├── types.ts                  (new) - TypeScript interfaces
└── [component].astro files...
```

#### Interface Design

**File**: `src/storyblok/visual/Bereikbaarheid/types.ts`

```typescript
/**
 * TypeScript Interfaces for Bereikbaarheid Components
 * 
 * These interfaces define the shape of Storyblok props for all
 * Bereikbaarheid (Accessibility/Arrival) components.
 * 
 * @module BereikbaarheidTypes
 */

import type { ISbStoryData, ISbRichtext } from '@storyblok/astro';

/**
 * Base interface shared by all Bereikbaarheid components
 */
export interface BereikbaarheidBaseBlok {
  /** Component name from Storyblok */
  component: string;
  /** Unique identifier */
  _uid: string;
  /** Editable flag for Storyblok visual editor */
  _editable?: string;
}

/**
 * Standard field interface for components with title + richtext
 */
export interface StandardBereikbaarheidBlok extends Bereikbaar heidBaseBlok {
  /** Main heading text */
  title?: string;
  /** Richtext content from Storyblok */
  tekst?: ISbRichtext;
}

/**
 * BereikbaarHero component props
 * 
 * Hero banner for the Bereikbaarheid page.
 * Uses plain text instead of richtext for content.
 * 
 * @example
 * ```astro
 * ---
 * import type { BereikbaarHeroBlok } from './types';
 * const blok: BereikbaarHeroBlok = {
 *   component: 'bereikbaar_hero',
 *   _uid: 'unique-id',
 *   title: 'Bereikbaarheid',
 *   tekst: 'Plan je reis naar Aaltjesdagen'
 * };
 * ---
 * <BereikbaarHero {blok} />
 * ```
 */
export interface BereikbaarHeroBlok extends BereikbaarheidBaseBlok {
  component: 'bereikbaar_hero';
  /** Hero title */
  title?: string;
  /** Plain text content (not richtext) */
  tekst?: string;
}

/**
 * EhboPosten component props
 * 
 * First aid station information with medical theme.
 */
export interface EhboPostenBlok extends StandardBereikbaarheidBlok {
  component: 'ehbo_posten';
}

/**
 * InEnRondomDeBinnenstad component props
 * 
 * City center accessibility information.
 */
export interface InEnRondomDeBinnenstadBlok extends StandardBereikbaarheidBlok {
  component: 'in_en_rondom_de_binnenstad';
}

/**
 * OpenbaarVervoer component props
 * 
 * Public transport information.
 */
export interface OpenbaarVervoerBlok extends StandardBereikbaarheidBlok {
  component: 'openbaar_vervoer';
}

/**
 * Parkeersectie component props
 * 
 * Parking section with image and link support.
 */
export interface ParkeersectieBlok extends BereikbaarheidBaseBlok {
  component: 'parkeersectie';
  /** Section title */
  title?: string;
  /** Content text */
  tekst?: string;
  /** Optional parking image */
  foto?: {
    filename: string;
    alt?: string;
    title?: string;
  };
  /** Optional CTA link */
  link?: {
    cached_url: string;
    linktype?: string;
    url?: string;
    story?: ISbStoryData;
  };
}

/**
 * ParkerenAutos component props
 * 
 * Car parking details.
 */
export interface ParkerenAutosBlok extends StandardBereikbaarheidBlok {
  component: 'parkeren_autos';
}

/**
 * StallenFietsen component props
 * 
 * Bicycle parking information.
 */
export interface StallenFietsenBlok extends StandardBereikbaarheidBlok {
  component: 'stallen_fietsen';
}

/**
 * Toegankelijkheid component props
 * 
 * Accessibility and inclusion information.
 */
export interface ToeankelijkBlok extends StandardBereikbaarheidBlok {
  component: 'toegankelijkheid';
}

/**
 * Union type of all Bereikbaarheid component bloks
 * 
 * Useful for discriminated unions and type guards.
 * 
 * @example
 * ```typescript
 * function renderBereikbaarheid(blok: BereikbaarheidBlok) {
 *   switch (blok.component) {
 *     case 'bereikbaar_hero':
 *       return <BereikbaarHero {blok} />;
 *     case 'ehbo_posten':
 *       return <EhboPosten {blok} />;
 *     // ... etc
 *   }
 * }
 * ```
 */
export type BereikbaarheidBlok =
  | BereikbaarHeroBlok
  | EhboPostenBlok
  | InEnRondomDeBinnenstadBlok
  | OpenbaarVervoerBlok
  | ParkeersectieBlok
  | ParkerenAutosBlok
  | StallenFietsenBlok
  | ToeankelijkBlok;

/**
 * Component props interface
 * 
 * Standard props structure for all Bereikbaarheid Astro components.
 * 
 * @example
 * ```astro
 * ---
 * import type { BereikbaarheidProps } from './types';
 * 
 * interface Props extends BereikbaarheidProps<BereikbaarHeroBlok> {}
 * 
 * const { blok } = Astro.props;
 * ---
 * ```
 */
export interface BereikbaarheidProps<T extends BereikbaarheidBaseBlok = BereikbaarheidBaseBlok> {
  blok: T;
}

/**
 * Type guard to check if a blok is a Bereikbaarheid component
 * 
 * @param blok - Any Storyblok blok
 * @returns True if the blok is a Bereikbaarheid component
 */
export function isBereikbaarheidBlok(blok: any): blok is BereikbaarheidBlok {
  const validComponents = [
    'bereikbaar_hero',
    'ehbo_posten',
    'in_en_rondom_de_binnenstad',
    'openbaar_vervoer',
    'parkeersectie',
    'parkeren_autos',
    'stallen_fietsen',
    'toegankelijkheid'
  ];
  
  return typeof blok === 'object' && 
         blok !== null && 
         validComponents.includes(blok.component);
}
```

#### Component Integration

**Before** (no types):
```astro
---
import { storyblokEditable, renderRichText } from "@storyblok/astro";

const { blok } = Astro.props;
const title = blok.title || "";
const tekst = blok.tekst;
---
```

**After** (with types):
```astro
---
import { storyblokEditable, renderRichText } from "@storyblok/astro";
import type { BereikbaarheidProps, OpenbaarVervoerBlok } from './types';

interface Props extends BereikbaarheidProps<OpenbaarVervoerBlok> {}

const { blok } = Astro.props;
const title = blok.title || "";
const tekst = blok.tekst; // TypeScript knows this is ISbRichtext

const renderedText = tekst ? renderRichText(tekst) : "";
---
```

#### Benefits

1. **Type Safety**: Compile-time validation of prop usage
2. **Autocomplete**: IDE suggestions for available fields
3. **Documentation**: Inline JSDoc provides context
4. **Refactoring**: Easier to update field names (TypeScript errors guide you)
5. **Validation**: Type guards prevent runtime errors

#### Files to Create

1. **`src/storyblok/visual/Bereikbaarheid/types.ts`** (~250 lines with documentation)

#### Files to Modify

All 8 component files to import and use types:
1. [`BereikbaarHero.astro`](../src/storyblok/visual/Bereikbaarheid/BereikbaarHero.astro) - Add type imports
2. [`EhboPosten.astro`](../src/storyblok/visual/Bereikbaarheid/EhboPosten.astro)
3. [`InEnRondomDeBinnenstad.astro`](../src/storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro)
4. [`OpenbaarVervoer.astro`](../src/storyblok/visual/Bereikbaarheid/OpenbaarVervoer.astro)
5. [`Parkeersectie.astro`](../src/storyblok/visual/Bereikbaarheid/Parkeersectie.astro)
6. [`ParkerenAutos.astro`](../src/storyblok/visual/Bereikbaarheid/ParkerenAutos.astro)
7. [`StallenFietsen.astro`](../src/storyblok/visual/Bereikbaarheid/StallenFietsen.astro)
8. [`Toegankelijkheid.astro`](../src/storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro)

**Testing Checklist**:
- [ ] TypeScript compiles without errors
- [ ] Autocomplete works in IDE
- [ ] Type guards function correctly
- [ ] Props match Storyblok schema
- [ ] JSDoc documentation displays in IDE tooltips
- [ ] No runtime errors from type mismatches

---

## Priority 3: Nice to Have Enhancements

### 3.1 Base Component Pattern Extraction

**Objective**: Identify and extract shared UI patterns into reusable base components.

#### Identified Patterns

After analyzing all 8 components, the following patterns appear repeatedly:

##### Pattern 1: Icon Badge

**Occurrences**: 6 of 8 components
- Parkeersectie (lines 52-82) - Location pin icon
- ParkerenAutos (lines 22-32, 97-127) - Car icon with badge
- EhboPosten (lines 28-34, 146-184) - Medical icon with pulse
- Toegankelijkheid (lines 29-33, 130-150) - Accessibility icon
- InEnRondomDeBinnenstad (line 25) - City icon (simplified)
- StallenFietsen (line 30) - Bike icon (simplified)

**Shared Characteristics**:
- Emoji or SVG icon
- Gradient background (primary/accent/error)
- Rounded corners (border-radius: 1-1.25rem)
- Box shadow with hover effects
- Size: 4-5rem square
- Optional animation (pulse, rotate)

**Proposed Base Component**: `IconBadge.astro`

```astro
---
/**
 * IconBadge Component
 * 
 * Reusable icon badge with gradient background and optional animations.
 * 
 * @prop icon - Emoji or SVG icon content
 * @prop variant - Color theme: 'primary' | 'accent' | 'secondary' | 'error'
 * @prop size - Badge size: 'sm' | 'md' | 'lg'
 * @prop animation - Optional animation: 'none' | 'pulse' | 'rotate'
 */

interface Props {
  icon: string | HTMLElement;
  variant?: 'primary' | 'accent' | 'secondary' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animation?: 'none' | 'pulse' | 'rotate';
  class?: string;
}

const {
  icon,
  variant = 'primary',
  size = 'md',
  animation = 'none',
  class: className = ''
} = Astro.props;
---

<div 
  class={`icon-badge icon-badge--${variant} icon-badge--${size} icon-badge--${animation} ${className}`}
>
  <span class="icon-content">{icon}</span>
  <div class="badge-glow"></div>
</div>

<style>
  /* Base badge styling */
  .icon-badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 1.25rem;
    transition: transform var(--transition-base);
  }
  
  /* Size variants */
  .icon-badge--sm {
    width: 3rem;
    height: 3rem;
  }
  
  .icon-badge--md {
    width: 4.5rem;
    height: 4.5rem;
  }
  
  .icon-badge--lg {
    width: 5rem;
    height: 5rem;
  }
  
  /* Color variants */
  .icon-badge--primary {
    background: linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary), black 10%) 100%);
    box-shadow: 0 10px 20px -5px color-mix(in srgb, var(--color-primary), transparent 60%);
  }
  
  .icon-badge--accent {
    background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
    box-shadow: 0 10px 20px -5px color-mix(in srgb, var(--color-accent), transparent 60%);
  }
  
  .icon-badge--secondary {
    background: linear-gradient(135deg, var(--color-secondary) 0%, color-mix(in srgb, var(--color-secondary), black 10%) 100%);
    box-shadow: 0 10px 20px -5px color-mix(in srgb, var(--color-secondary), transparent 60%);
  }
  
  .icon-badge--error {
    background: linear-gradient(135deg, var(--color-error) 0%, color-mix(in srgb, var(--color-error), black 10%) 100%);
    box-shadow: 0 10px 20px -5px color-mix(in srgb, var(--color-error), transparent 60%);
  }
  
  /* Animation variants */
  .icon-badge--pulse {
    animation: pulse-badge 3s ease-in-out infinite;
  }
  
  .icon-badge--rotate {
    transform: rotate(-3deg);
  }
  
  .icon-badge--rotate:hover {
    transform: rotate(0deg) scale(1.05);
  }
  
  /* Icon content */
  .icon-content {
    font-size: 2.25rem;
    filter: drop-shadow(0 2px 4px var(--shadow-sm));
    z-index: 1;
  }
  
  .icon-badge--lg .icon-content {
    font-size: 2.5rem;
  }
  
  .icon-badge--sm .icon-content {
    font-size: 1.75rem;
  }
  
  /* Badge glow effect */
  .badge-glow {
    position: absolute;
    inset: -0.5rem;
    border-radius: 1.5rem;
    background: inherit;
    filter: blur(1rem);
    opacity: 0.3;
    z-index: 0;
  }
  
  @keyframes pulse-badge {
    0%, 100% {
      box-shadow: 0 10px 20px -5px color-mix(in srgb, var(--color-error), transparent 60%);
    }
    50% {
      box-shadow: 0 10px 20px -5px color-mix(in srgb, var(--color-error), transparent 40%);
    }
  }
</style>
```

**Usage Example**:
```astro
<IconBadge 
  icon="🚗" 
  variant="primary" 
  size="lg" 
  animation="rotate" 
/>
```

##### Pattern 2: Decorative Underline

**Occurrences**: 5 of 8 components
- ParkerenAutos (lines 144-156) - Gradient underline
- InEnRondomDeBinnenstad (lines 182-194) - Gradient bar
- BereikbaarHero (lines 18) - Accent bar
- EhboPosten (lines 95-119) - Medical strip with pattern

**Shared Characteristics**:
- Gradient background (usually horizontal)
- Small height (0.25-0.5rem)
- Width: 4rem or full-width
- Border radius on ends
- Box shadow for depth

**Proposed Base Component**: `DecorativeUnderline.astro`

```astro
---
interface Props {
  variant?: 'gradient' | 'solid';
  colors?: string[];
  width?: 'sm' | 'md' | 'full';
  height?: 'thin' | 'medium' | 'thick';
  class?: string;
}

const {
  variant = 'gradient',
  colors = ['var(--color-primary)', 'var(--color-accent)'],
  width = 'sm',
  height = 'medium',
  class: className = ''
} = Astro.props;

const widthMap = {
  sm: '4rem',
  md: '8rem',
  full: '100%'
};

const heightMap = {
  thin: '0.25rem',
  medium: '0.375rem',
  thick: '0.5rem'
};

const gradientValue = variant === 'gradient' 
  ? `linear-gradient(90deg, ${colors.join(', ')})`
  : colors[0] || 'var(--color-primary)';
---

<div 
  class={`decorative-underline ${className}`}
  style={`
    background: ${gradientValue};
    width: ${widthMap[width]};
    height: ${heightMap[height]};
  `}
></div>

<style>
  .decorative-underline {
    border-radius: 0.25rem;
    box-shadow: 0 2px 8px color-mix(in srgb, currentColor, transparent 70%);
  }
</style>
```

##### Pattern 3: ContentCard Wrapper

**Occurrences**: All 8 components have similar card wrapper structure

**Shared Characteristics**:
- `background: color-mix(in srgb, var(--bg-elevated), transparent 10%)`
- `backdrop-filter: blur(12px)`
- Border-radius: 1.25-1.5rem
- Border: 1px solid `var(--border-primary)`
- Box shadow: `var(--shadow-lg)`
- Hover state: Enhanced shadow + border color change
- Padding: Responsive (2-3rem mobile, 3-4rem desktop)

**Proposed Base Component**: `ContentCard.astro`

```astro
---
interface Props {
  variant?: 'default' | 'glass' | 'elevated';
  hoverEffect?: boolean;
  class?: string;
}

const {
  variant = 'default',
  hoverEffect = true,
  class: className = ''
} = Astro.props;
---

<div class={`content-card content-card--${variant} ${hoverEffect ? 'content-card--hover' : ''} ${className}`}>
  <slot />
</div>

<style>
  .content-card {
    position: relative;
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-slow);
  }
  
  @media (min-width: 768px) {
    .content-card {
      padding: 3.5rem 3rem;
    }
  }
  
  /* Variant styles */
  .content-card--default {
    background: var(--bg-elevated);
  }
  
  .content-card--glass {
    background: color-mix(in srgb, var(--bg-elevated), transparent 10%);
    backdrop-filter: blur(12px);
  }
  
  .content-card--elevated {
    background: var(--bg-elevated);
    box-shadow: var(--shadow-xl);
  }
  
  /* Hover effect */
  .content-card--hover:hover {
    box-shadow: var(--shadow-xl);
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
</style>
```

#### Implementation Impact

**Benefits**:
- Reduced code duplication
- Consistent UI patterns
- Easier maintenance 
- Faster component development

**Complexity**:
- Need to ensure flexibility for component-specific variations
- May require additional props for edge cases
- Testing required to ensure no visual regression

#### Files to Create

1. [`src/components/bereikbaarheid/IconBadge.astro`](../src/components/bereikbaarheid/IconBadge.astro)
2. [`src/components/bereikbaarheid/DecorativeUnderline.astro`](../src/components/bereikbaarheid/DecorativeUnderline.astro)
3. [`src/components/bereikbaarheid/ContentCard.astro`](../src/components/bereikbaarheid/ContentCard.astro)
4. [`src/components/bereikbaarheid/README.md`](../src/components/bereikbaarheid/README.md) - Usage documentation

#### Files to Modify

All 8 Bereikbaarheid components to use base components where applicable.

**Testing Checklist**:
- [ ] Visual parity with original components
- [ ] All variants render correctly
- [ ] Props provide sufficient flexibility
- [ ] No performance regression
- [ ] Dark mode support maintained
- [ ] Responsive behavior preserved

---

### 3.2 Animation Token System

**Objective**: Centralize animation keyframes and timing functions into a reusable token system.

#### Current State

**Animation Usage in Components**:
- EhboPosten: `pulse-badge`, `pulse-dot` keyframes (lines 166-244)
- Parkeersectie: Uses `.animate-pulse` from Tailwind
- InEnRondomDeBinnenstad: No custom animations
- Others: Rely on CSS transitions only

**Animations in Global**: [`global.css:385-441`](../src/styles/global.css)
- `float-1`, `float-2`, `float-3` - Background blob animations
- `gradientShift` - Gradient animation
- Transition timing functions already defined

#### Proposed Animation Token System

**File**: [`src/styles/animations.css`](../src/styles/animations.css) (new file)

```css
/**
 * Animation Token System
 * 
 * Centralized animation keyframes and tokens for consistent
 * motion design across the application.
 * 
 * Import this file  in components that need custom animations.
 */

/* === TIMING FUNCTION TOKENS === */
:root {
  /* Easing curves */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  
  /* Duration tokens */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  --duration-slowest: 1200ms;
  
  /* Delay tokens */
  --delay-none: 0ms;
  --delay-short: 100ms;
  --delay-medium: 200ms;
  --delay-long: 400ms;
}

/* === PULSE ANIMATIONS === */

/**
 * Subtle pulse for badges and notifications
 * Usage: animation: pulse-subtle 3s var(--ease-smooth) infinite;
 */
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.02);
  }
}

/**
 * Pronounced pulse for attention-grabbing elements
 * Usage: animation: pulse-strong 2s var(--ease-in-out) infinite;
 */
@keyframes pulse-strong {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.08);
  }
}

/**
 * Dot pulse (for indicators)
 * Usage: animation: pulse-dot 2s var(--ease-in-out) infinite;
 */
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

/**
 * Badge pulse with shadow (medical/emergency theme)
 * Usage: animation: pulse-badge 3s var(--ease-in-out) infinite;
 */
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

/* === FLOAT ANIMATIONS === */

/**
 * Gentle float for decorative elements
 * Usage: animation: float-gentle 6s var(--ease-in-out) infinite;
 */
@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0) translateZ(0);
  }
  50% {
    transform: translateY(-10px) translateZ(0);
  }
}

/**
 * Complex float with scale (for background blobs)
 * Usage: animation: float-complex 20s var(--ease-smooth) infinite;
 */
@keyframes float-complex {
  0%, 100% {
    transform: translate(0, 0) scale(1) translateZ(0);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1) translateZ(0);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.95) translateZ(0);
  }
}

/* === SLIDE ANIMATIONS === */

/**
 * Slide in from right
 * Usage: animation: slide-in-right var(--duration-normal) var(--ease-out);
 */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/**
 * Slide in from left
 * Usage: animation: slide-in-left var(--duration-normal) var(--ease-out);
 */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/**
 * Slide in from bottom
 * Usage: animation: slide-in-up var(--duration-normal) var(--ease-out);
 */
@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === FADE ANIMATIONS === */

/**
 * Simple fade in
 * Usage: animation: fade-in var(--duration-normal) var(--ease-in-out);
 */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/**
 * Fade in with scale
 * Usage: animation: fade-in-scale var(--duration-normal) var(--ease-out);
 */
@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* === ROTATE ANIMATIONS === */

/**
 * Continuous slow rotation
 * Usage: animation: rotate-slow 20s linear infinite;
 */
@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/**
 * Subtle back-and-forth rotation
 * Usage: animation: rotate-subtle 4s var(--ease-in-out) infinite;
 */
@keyframes rotate-subtle {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

/* === UTILITY CLASSES === */

/**
 * Apply animations directly via utility classes
 */
.animate-pulse-subtle {
  animation: pulse-subtle 3s var(--ease-smooth) infinite;
}

.animate-pulse-strong {
  animation: pulse-strong 2s var(--ease-in-out) infinite;
}

.animate-float {
  animation: float-gentle 6s var(--ease-in-out) infinite;
}

.animate-float-delay {
  animation: float-gentle 6s var(--ease-in-out) infinite;
  animation-delay: var(--delay-long);
}

.animate-fade-in {
  animation: fade-in var(--duration-normal) var(--ease-in-out);
}

.animate-slide-in-up {
  animation: slide-in-up var(--duration-normal) var(--ease-out);
}

/* === ACCESSIBILITY === */

/**
 * Respect user's motion preferences
 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .animate-pulse-subtle,
  .animate-pulse-strong,
  .animate-float,
  .animate-float-delay {
    animation: none !important;
  }
}
```

#### Animation Documentation

**File**: [`src/styles/animations/README.md`](../src/styles/animations/README.md)

```markdown
# Animation Token System

Centralized animation keyframes and timing tokens for consistent motion design.

## Usage

### Import in Component

\`\`\`astro
<style>
  @import '../../styles/animations.css';
  
  .my-element {
    animation: pulse-subtle 3s var(--ease-smooth) infinite;
  }
</style>
\`\`\`

### Using Utility Classes

\`\`\`html
<div class="animate-pulse-subtle">
  Content pulses gently
</div>
\`\`\`

## Available Animations

### Pulse Animations

| Keyframe | Duration | Use Case | Example |
|----------|----------|----------|---------|
| `pulse-subtle` | 3s | Subtle attention | Status badges |
| `pulse-strong` | 2s | High emphasis | Alert indicators |
| `pulse-dot` | 2s | Dot indicators | Live status dots |
| `pulse-badge` | 3s | Medical/urgent | Emergency notifications |

### Float Animations

| Keyframe | Duration | Use Case |
|----------|----------|----------|
| `float-gentle` | 6s | Decorative elements |
| `float-complex` | 20s | Background blobs |

### Slide Animations

| Keyframe | Duration | Direction |
|----------|----------|-----------|
| `slide-in-right` | 300ms | ← |
| `slide-in-left` | 300ms | → |
| `slide-in-up` | 300ms | ↑ |

### Fade Animations

| Keyframe | Duration | Effect |
|----------|----------|--------|
| `fade-in` | 300ms | Opacity only |
| `fade-in-scale` | 300ms | Opacity + scale |

### Rotate Animations

| Keyframe | Duration | Pattern |
|----------|----------|---------|
| `rotate-slow` | 20s | Full 360° rotation |
| `rotate-subtle` | 4s | Back-and-forth (-3° to 3°) |

## Timing Tokens

### Easing Curves

\`\`\`css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);  /* Default smooth */
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);      /* Decelerate */
--ease-in: cubic-bezier(0.4, 0, 1, 1);          /* Accelerate */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce effect */
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1); /* Ultra smooth */
\`\`\`

### Duration Tokens

\`\`\`css
--duration-instant: 100ms;   /* Micro-interactions */
--duration-fast: 200ms;      /* Quick transitions */
--duration-normal: 300ms;    /* Standard animations */
--duration-slow: 500ms;      /* Deliberate motion */
--duration-slower: 800ms;    /* Slow reveals */
--duration-slowest: 1200ms;  /* Very slow transitions */
\`\`\`

### Delay Tokens

\`\`\`css
--delay-none: 0ms;
--delay-short: 100ms;
--delay-medium: 200ms;
--delay-long: 400ms;
\`\`\`

## Examples

### Pulsing Badge

\`\`\`astro
<div class="medical-badge">
  🏥
</div>

<style>
  @import '../../styles/animations.css';
  
  .medical-badge {
    animation: pulse-badge 3s var(--ease-in-out) infinite;
  }
</style>
\`\`\`

### Staggered Slide-In

\`\`\`astro
<div class="card card-1 animate-slide-in-up"></div>
<div class="card card-2"></div>
<div class="card card-3"></div>

<style>
  .card-2 {
    animation: slide-in-up var(--duration-normal) var(--ease-out);
    animation-delay: var(--delay-short);
  }
  
  .card-3 {
    animation: slide-in-up var(--duration-normal) var(--ease-out);
    animation-delay: var(--delay-medium);
  }
</style>
\`\`\`

## Accessibility

All animations respect `prefers-reduced-motion` settings. Users who prefer reduced motion will see instant transitions instead of animations.
\`\`\`

#### Migration Path

**Update EhboPosten.astro**:
```diff
<style>
+ @import '../../../styles/animations.css';
+
  /* Remove local keyframe definitions */
- @keyframes pulse-badge { ... }
- @keyframes pulse-dot { ... }
  
  /* Use token-based animations */
  .medical-badge {
-   animation: pulse-badge 3s ease-in-out infinite;
+   animation: pulse-badge 3s var(--ease-in-out) infinite;
  }
</style>
```

#### Files to Create

1. **[`src/styles/animations.css`](../src/styles/animations.css)** (~300 lines)
2. **[`src/styles/animations/README.md`](../src/styles/animations/README.md)** (~150 lines)

#### Files to Modify

1. [`src/styles/global.css`](../src/styles/global.css) - Import animations.css
2. [`EhboPosten.astro`](../src/storyblok/visual/Bereikbaarheid/EhboPosten.astro) - Use animation tokens
3. (Future components can reference animation tokens)

**Testing Checklist**:
- [ ] All animations function identically to before
- [ ] Timing and easing curves match original
- [ ] Reduced motion preference respected
- [ ] Animation utility classes work
- [ ] No performance regression
- [ ] Easy to use in new components

---

### 3.3 Performance Audit Methodology

**Objective**: Establish methodology and recommendations for assessing backdrop-filter performance.

#### Current Backdrop-Filter Usage

**Locations** (8 occurrences):
1. ParkerenAutos - `blur(16px)` (line 66)
2. StallenFietsen - `blur(12px)` (line 69)
3. Toegankelijkheid - `blur(12px)` (line 74)
4. InEnRondomDeBinnenstad - `blur(86)` (line 86) ← **Typo! Should be 12px**
5. BereikbaarHero - `blur(12px)` (line 62)
6. EhboPosten - `blur(12px)` (line 77), `blur(8px)` (line 212)
7. (Parkeersectie will have backdrop-filter after Tailwind conversion)

#### Performance Assessment Methodology

**Step 1: Metrics to Track**

Use browser DevTools Performance tab to measure:

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Paint time | < 16ms | 16-32ms | > 32ms |
| Composite time | < 8ms | 8-16ms | > 16ms |
| FPS during scroll | 60fps | 45-59fps | < 45fps |
| Will-change usage | Minimal | Moderate | Excessive |

**Step 2: Testing Scenarios**

Test under various conditions:

1. **Device Classes**:
   - High-end (M1 Mac, high-end Windows)
   - Mid-range (3-year-old laptop)
   - Low-end (budget Chromebook, old tablet)

2. **Page States**:
   - Initial page load
   - Scroll performance
   - Simultaneous animations
   - Multiple components visible

3. **Content Density**:
   - Single component
   - 4-6 components (typical page)
   - Worst-case (all 8 components)

**Step 3: Tools and Commands**

```javascript
// Performance timing
performance.mark('blur-start');
// ... render components ...
performance.mark('blur-end');
performance.measure('blur-duration', 'blur-start', 'blur-end');
console.table(performance.getEntriesByType('measure'));

// Paint flashing (Chrome DevTools)
// 1. Open DevTools
// 2. Cmd/Ctrl + Shift + P
// 3. Type "Show Rendering"
// 4. Enable "Paint flashing"
// 5. Scroll page - green flashing indicates repaints

// Layer visualization
// 1. DevTools > More tools > Layers
// 2. Identify composited layers
// 3. Check layer count (< 20 ideal)
```

#### Performance Optimization Strategies

**Strategy 1: Conditional Blur**

Only apply backdrop-filter on capable devices:

```css
/* Default: No blur */
.glass-card {
  background: color-mix(in srgb, var(--bg-elevated), transparent 10%);
}

/* Progressive enhancement for capable browsers */
@supports (backdrop-filter: blur(12px)) {
  .glass-card {
    backdrop-filter: blur(12px);
  }
}

/* Further optimization: Disable on low-end devices */
@media (prefers-reduced-motion: reduce) {
  .glass-card {
    backdrop-filter: none;
    background: var(--bg-elevated); /* Fallback to solid */
  }
}
```

**Strategy 2: Reduce Blur Intensity**

Lower blur amounts where possible:

| Current | Optimized | Savings |
|---------|-----------|---------|
| 16px | 8px | ~50% paint cost |
| 12px | 8px | ~30% paint cost |
| 8px | 4px | ~50% paint cost |

**Strategy 3: Limit Blur Scope**

Apply backdrop-filter only to small areas:

```css
/* Bad: Large blurred area */
.large-section {
  backdrop-filter: blur(12px);
  /* Entire section repaints on scroll */
}

/* Good: Small blurred header */
.large-section {
  background: var(--bg-elevated);
}

.large-section__header {
  backdrop-filter: blur(8px);
  /* Only header repaints */
}
```

**Strategy 4: Use Will-Change Sparingly**

```css
/* Only add will-change during animation */
.glass-card {
  backdrop-filter: blur(12px);
  transition: transform 300ms;
}

.glass-card:hover {
  will-change: transform;
  transform: translateY(-2px);
}

/* Remove after animation completes */
.glass-card:not(:hover) {
  will-change: auto;
}
```

#### Recommended Audit Process

**Phase 1: Baseline Measurement** (1 hour)
1. Record current paint/composite times
2. Test on 3 device classes
3. Document FPS during interactions
4. Note any jank or stuttering

**Phase 2: Identify Bottlenecks** (2 hours)
1. Use Chrome DevTools Performance tab
2. Identify components causing slowdowns
3. Check layer count and sizes
4. Profile animation performance

**Phase 3: Optimize** (3-5 hours per component)
1. Reduce blur intensity where acceptable
2. Add `@supports` feature detection
3. Implement fallbacks for low-end devices
4. Test optimizations on target devices

**Phase 4: Validate** (1 hour)
1. Re-measure metrics after optimizations
2. Confirm visual quality acceptable
3. Test on all device classes
4. Document results

#### Deliverables

Create performance audit report document:

**File**: `plans/bereikbaarheid-performance-audit.md`

```markdown
# Bereikbaarheid Backdrop-Filter Performance Audit

## Executive Summary

[Results of performance testing]

## Methodology

[Testing approach used]

## Findings

### Component Performance

| Component | Blur Amount | Paint Time | Composite Time | FPS | Status |
|-----------|-------------|------------|----------------|-----|--------|
| ParkerenAutos | 16px → 8px | 18ms → 12ms | 10ms → 6ms | 58 → 60 | ✅ Optimized |
| ... | ... | ... | ... | ... | ... |

### Device Class Results

- **High-end**: No issues detected
- **Mid-range**: Minor jank on scroll (< 1% of time)
- **Low-end**: Significant performance impact (fallback recommended)

## Recommendations

1. Reduce ParkerenAutos blur from 16px to 8px
2. Fix InEnRondomDeBinnenstad typo (blur(86) → blur(12px))
3. Add `@supports` feature detection for all blur usage
4. Implement reduced-motion fallbacks
5. Consider removing backdrop-filter on mobile (< 768px)

## Implementation Priority

### High Priority
- Fix typo in InEnRondomDeBinnenstad
- Add `@supports` detection

### Medium Priority
- Reduce blur intensity across components
- Test on additional devices

### Low Priority
- Implement per-component optimization
- Add performance monitoring

## Next Steps

[Action items for Code mode]
\`\`\`

#### Files to Create

1. **`plans/bereikbaarheid-performance-audit.md`** - Audit report (after testing)
2. **`src/styles/performance/README.md`** - Performance best practices guide

#### Files to Modify

All components with backdrop-filter (after audit results):
1-7. All Bereikbaarheid components with backdrop-filter optimizations

**Testing Checklist**:
- [ ] Baseline performance captured
- [ ] Tested on 3+ device classes
- [ ] FPS measured during scroll
- [ ] Paint times documented
- [ ] Optimizations implemented
- [ ] Visual quality maintained after optimization
- [ ] Reduced motion fallbacks work
- [ ] Documentation created

---

## Implementation Timeline

### Phase 1: Foundation (Priority 1) - 5-8 hours

**Tasks**:
1. Convert Parkeersectie Tailwind → Scoped CSS (2-3 hours)
2. Standardize field naming (1 hour + Storyblok updates)
3. Extract prose styles to utilities (2-3 hours)
4. Create prose system documentation (1 hour)

**Deliverables**:
- Parkersectie refactored
- All components use `tekst` field
- Prose utility files created
- ~535 lines of duplication removed

### Phase 2: Infrastructure (Priority 2) - 4-6 hours

**Tasks**:
1. Enhance z-index token system (1 hour)
2. Update components to use z-index tokens (1 hour)
3. Create TypeScript interfaces (2 hours)
4. Write component documentation (2-3 hours)

**Deliverables**:
- Z-index tokens in use
- TypeScript types for all components
- README and component docs

### Phase 3: Enhancements (Priority 3) - 6-10 hours

**Tasks**:
1. Extract base component patterns (3-4 hours)
2. Create animation token system (2 hours)
3. Performance audit and optimization (3-5 hours)

**Deliverables**:
- IconBadge, DecorativeUnderline, ContentCard components
- Animation tokens and documentation
- Performance audit report

**Total Estimated Time**: 15-24 hours

---

## Migration Strategies

### Strategy 1: Gradual Migration

**Approach**: Refactor components one at a time, testing each before moving to next.

**Pros**:
- Lower risk of breaking changes
- Easier to test and validate
- Can pause/resume work flexibly

**Cons**:
- Longer overall timeline
- Temporary inconsistency in codebase

**Recommended For**: Priority 1 and 2 changes

### Strategy 2: Big Bang Migration

**Approach**: Refactor all components simultaneously in a feature branch.

**Pros**:
- Faster overall completion
- Immediate consistency across all components
- Easier to see full impact

**Cons**:
- Higher risk of bugs
- Harder to test thoroughly
- Requires dedicated time block

**Recommended For**: Priority 3 enhancements (optional)

### Strategy 3: Hybrid Approach

**Approach**: Complete Priority 1 gradually, then batch Priority 2 and 3.

**Workflow**:
1. Week 1: Parkeersectie refactor + field naming
2. Week 2: Prose style extraction
3. Week 3: Priority 2 (batch: z-index, types, docs)
4. Week 4: Priority 3 (optional: base components, animations, performance)

**Pros**:
- Balanced risk and speed
- High-impact changes rolled out first
- Lower-risk enhancements batched

**Cons**:
- Requires careful planning
- May need multiple testing cycles

**Recommended For**: Full refactoring project

---

## File Structure Changes

### New Files Created

```
src/
├── components/
│   └── bereikbaarheid/       (new directory)
│       ├── README.md
│       ├── IconBadge.astro
│       ├── Decorative Underline.astro
│       └── ContentCard.astro
├── storyblok/visual/Bereikbaarheid/
│   ├── README.md              (new)
│   ├── types.ts               (new)
│   ├── BereikbaarHero.md      (new)
│   ├── EhboPosten.md          (new)
│   ├── InEnRondomDeBinnenstad.md (new)
│   ├── OpenbaarVervoer.md     (new)
│   ├── Parkeersectie.md       (new)
│   ├── ParkerenAutos.md       (new)
│   ├── StallenFietsen.md      (new)
│   └── Toegankelijkheid.md    (new)
└── styles/
    ├── animations.css         (new)
    ├── prose/                 (new directory)
    │   ├── README.md
    │   ├── prose-base.css
    │   └── prose-variants.css
    └── performance/           (new directory)
        └── README.md

plans/
└── bereikbaarheid-performance-audit.md (new, after audit)
```

### Modified Files

```
src/
├── styles/
│   └── global.css            (z-index tokens, imports)
└── storyblok/visual/Bereikbaarheid/
    ├── BereikbaarHero.astro  (field naming, types)
    ├── EhboPosten.astro      (prose system, types, animations)
    ├── InEnRondomDeBinnenstad.astro (prose system, types, typo fix)
    ├── OpenbaarVervoer.astro (prose system, types)
    ├── Parkeersectie.astro   (Tailwind → scoped, field naming, types)
    ├── ParkerenAutos.astro   (prose system, types)
    ├── StallenFietsen.astro  (prose system, types)
    └── Toegankelijkheid.astro (prose system, types)
```

---

## Testing & Validation

### Visual Regression Testing

**Approach**: Screenshot comparison before/after refactoring

**Tools**:
- Manual screenshots (quick)
- Percy.io or Chromatic (automated, requires setup)

**Critical Pages to Test**:
- Bereikbaarheid landing page (all 8 components)
- Individual component views in Storyblok

**Breakpoints to Test**:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px (laptop)
- Large: 1920px (desktop monitor)

### Functional Testing

**Test Cases**:

| Feature | Test | Expected Result |
|---------|------|-----------------|
| Storyblok integration | Edit content in visual editor | Updates reflect in real-time |
| Richtext rendering | Add lists, links, headings | Prose styles apply correctly |
| Dark mode | Toggle theme | Colors update appropriately |
| Responsive layout | Resize viewport | Layout adapts at breakpoints |
| Hover effects | Mouse over cards/links | Animations trigger smoothly |
| TypeScript | Build project | No type errors |

### Performance Testing

**Metrics to Validate**:
- Lighthouse score: > 90 (performance)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

### Accessibility Testing

**Checklist**:
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly
- [ ] Focus indicators visible
- [ ] Color contrast ratios meet standards (4.5:1 text, 3:1 UI)
- [ ] Reduced motion preference respected

### Browser Compatibility

**Target Browsers**:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

---

## References

### Design System Documents

- [Design System Analysis](./design-system-analysis.md)
- [Z-Index Hierarchy Analysis](./z-index-hierarchy-analysis.md)
- [Global Styles](../src/styles/global.css)

### Component Files

**Bereikbaarheid Components**:
- [BereikbaarHero.astro](../src/storyblok/visual/Bereikbaarheid/BereikbaarHero.astro)
- [EhboPosten.astro](../src/storyblok/visual/Bereikbaarheid/EhboPosten.astro)
- [InEnRondomDeBinnenstad.astro](../src/storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro)
- [OpenbaarVervoer.astro](../src/storyblok/visual/Bereikbaarheid/OpenbaarVervoer.astro)
- [Parkeersectie.astro](../src/storyblok/visual/Bereikbaarheid/Parkeersectie.astro)
- [ParkerenAutos.astro](../src/storyblok/visual/Bereikbaarheid/ParkerenAutos.astro)
- [StallenFietsen.astro](../src/storyblok/visual/Bereikbaarheid/StallenFietsen.astro)
- [Toegankelijkheid.astro](../src/storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro)

### External Resources

- [Astro Documentation](https://docs.astro.build)
- [Storyblok Astro SDK](https://github.com/storyblok/storyblok-astro)
- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [CSS Tricks: Easing Functions](https://easings.net/)

---

## Conclusion

This architectural plan provides a comprehensive roadmap for refactoring all 8 Bereikbaarheid components to align with design system standards. The refactoring addresses:

✅ **Consistency**: Standardized styling approach, field naming, and patterns  
✅ **Maintainability**: Extracted shared code and reusable utilities  
✅ **Type Safety**: TypeScript interfaces for all component props  
✅ **Documentation**: Comprehensive docs for components and utilities  
✅ **Performance**: Assessment methodology and optimization strategies  
✅ **Scalability**: Token systems for animations and z-index values

**Total Impact**:
- ~535 lines of duplicate code removed
- 8 components fully typed
- Comprehensive documentation created
- Performance optimizations identified
- Future-proof architecture established

**Next Step**: Hand off to Code mode for implementation following this architectural design.

---

**Document Status**: ✅ Complete - Ready for Implementation  
**Last Updated**: December 31, 2024  
**Architect**: Claude (Architect Mode)
