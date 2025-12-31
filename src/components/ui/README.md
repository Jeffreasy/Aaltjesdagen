# UI Components

User interface utility components for the Aaltjesdagen website. These components provide reusable UI elements with consistent styling and behavior across the application.

## Overview

The `ui/` directory contains specialized interface components:

- **[Link](#link-component)** - Unified link component with multiple variants
- **[Icon](#icon-component)** - SVG icon system with predefined icons
- **[ThemeToggle](#themetoggle-component)** - Light/dark theme switcher
- **[ProgramModal](#programmodal-component)** - Program details modal dialog

---

## Link Component

**File:** [`Link.astro`](./Link.astro)

Unified link component with multiple visual variants and automatic active state detection. Consolidates all link styling into a single, reusable component for consistency across navigation, footer, and content areas.

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `href` | `string` | - | ✅ | URL path (relative or absolute) |
| `variant` | `'nav' \| 'footer' \| 'inline' \| 'button'` | `'nav'` | ❌ | Visual style variant |
| `active` | `boolean` | Auto-detected | ❌ | Whether link is currently active |
| `external` | `boolean` | `false` | ❌ | Opens in new tab if true |
| `class` | `string` | `''` | ❌ | Additional CSS classes |
| `ariaLabel` | `string` | - | ❌ | Accessible label override |

### Variants

#### 1. Nav Variant (`variant="nav"`)

**Purpose:** Desktop header navigation links

**Features:**
- Vertical flex layout with underline indicator
- Hover: Orange underline animation (0 → 100% width)
- Active: Blue underline, bold font weight
- Color: Secondary text → Primary when active

**Usage:**
```astro
---
import Link from '@/components/ui/Link.astro';
import { NAVIGATION_ITEMS } from '@/constants/site';
---

<nav>
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href} variant="nav">
      {item.name}
    </Link>
  ))}
</nav>
```

**Visual:**
```
Home        Bereikbaarheid    Contact
────        (hover)
```

#### 2. Footer Variant (`variant="footer"`)

**Purpose:** Footer navigation and legal links

**Features:**
- Horizontal inline layout
- Hover: Primary color + 2px translateX
- Small font size (0.875rem)
- Minimal decoration

**Usage:**
```astro
<nav>
  <ul>
    {NAVIGATION_ITEMS.map((item) => (
      <li>
        <Link href={item.href} variant="footer">
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</nav>
```

#### 3. Inline Variant (`variant="inline"`)

**Purpose:** Content links within prose/text blocks

**Features:**
- Underlined by default
- Primary color
- Hover: Darker shade + thicker underline
- Text decoration offset for readability

**Usage:**
```astro
<p>
  Voor meer informatie, zie onze 
  <Link href="/bereikbaarheid" variant="inline">
    bereikbaarheidspagina
  </Link>.
</p>
```

#### 4. Button Variant (`variant="button"`)

**Purpose:** Call-to-action links styled as buttons

**Features:**
- Padded button appearance
- Primary background color
- White text (inverse color)
- Hover: Lift effect (-2px) with enhanced shadow
- Active: Press effect (translateY to 0)

**Usage:**
```astro
<Link href="/contact" variant="button">
  Neem Contact Op
</Link>
```

### Active State Detection

The Link component automatically detects active state based on current URL:

```typescript
const currentPath = Astro.url.pathname;
const isActive = activeProp !== undefined
  ? activeProp  // Use explicit prop if provided
  : currentPath === href || // Exact match
    (href !== '/' && currentPath.startsWith(href)); // Prefix match (except home)
```

**Logic:**
- Exact match: `/contact` === `/contact` → Active
- Prefix match: `/bereikbaarheid/parking` starts with `/bereikbaarheid` → Active
- Home exception: Only exact `/` match (prevents all links being active on homepage)

**Manual Override:**
```astro
<Link href="/custom" variant="nav" active={true}>
  Always Active
</Link>
```

### Usage Examples

#### Navigation (Desktop)
```astro
---
import { NAVIGATION_ITEMS } from '@/constants/site';
import Link from '@/components/ui/Link.astro';
---

<nav class="hidden md:flex gap-6" aria-label="Main navigation">
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href} variant="nav">
      {item.name}
    </Link>
  ))}
</nav>
```

#### Footer Quick Links
```astro
<nav aria-label="Footer navigation">
  <ul class="space-y-3">
    {NAVIGATION_ITEMS.map((item) => (
      <li>
        <Link href={item.href} variant="footer">{item.name}</Link>
      </li>
    ))}
  </ul>
</nav>
```

#### Footer Legal Links
```astro
---
import { LEGAL_LINKS } from '@/constants/site';
---

<nav aria-label="Legal navigation">
  {LEGAL_LINKS.map((link) => (
    <Link href={link.href} variant="footer" class="text-xs text-tertiary">
      {link.name}
    </Link>
  ))}
</nav>
```

#### External Link
```astro
<Link 
  href="https://facebook.com/aaltjesdagen" 
  variant="button"
  external={true}
>
  Bezoek Facebook
</Link>
```

#### Content/Prose Link
```astro
<div class="prose">
  <p>
    Download het 
    <Link href="/downloads/schema.pdf" variant="inline">
      complete programma
    </Link> 
    als PDF.
  </p>
</div>
```

### Accessibility Features

- **`aria-current="page"`** - Set on active links for screen readers
- **Focus Indicators** - 2px solid primary outline with 4px offset
- **Keyboard Navigation** - Fully keyboard accessible (Tab, Enter)
- **External Link Attributes** - Automatic `target="_blank"` and `rel="noopener noreferrer"`
- **Semantic HTML** - Uses native `<a>` element
- **Reduced Motion** - Respects `prefers-reduced-motion` preference

### TypeScript Type

Defined in [`types/navigation.ts`](../../types/navigation.ts):

```typescript
export type LinkVariant = 'nav' | 'footer' | 'inline' | 'button';

export interface LinkProps {
  href: string;
  variant?: LinkVariant;
  active?: boolean;
  external?: boolean;
  class?: string;
  ariaLabel?: string;
}
```

### Where Used

| Location | Variant | Count | Purpose |
|----------|---------|-------|---------|
| [`Navigation.astro`](../layout/Navigation.astro) | `nav` | 8 | Desktop navigation links |
| [`Footer.astro`](../layout/Footer.astro) | `footer` | 11+ | Quick links + legal links |
| *Content Components* | `inline` | Variable | Prose/text links |
| *CTA Sections* | `button` | Variable | Call-to-action buttons |

---

## Icon Component

**File:** [`Icon.astro`](./Icon.astro)

SVG icon system with predefined icons for common UI needs. Provides consistent sizing and styling across the application.

### Props

| Prop | Type | Values | Default | Required | Description |
|------|------|--------|---------|----------|-------------|
| `name` | `string` | See below | - | ✅ | Icon identifier |
| `size` | `'sm' \| 'md' \| 'lg'` | - | `'md'` | ❌ | Icon size |
| `class` | `string` | - | `''` | ❌ | Additional CSS classes |

### Available Icons

| Icon Name | Usage | SVG Path |
|-----------|-------|----------|
| `clock` | Time/duration | Clock with hands |
| `location` | Address/venue | Map pin |
| `arrow-right` | Navigation/forward | Right arrow |
| `calendar` | Date/event | Calendar grid |
| `users` | People/attendees | User group |
| `info` | Information/help | Info circle |

### Size Options

| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 16px × 16px | Inline text, compact layouts |
| `md` | 20px × 20px | Standard UI (default) |
| `lg` | 24px × 24px | Emphasis, headings |

### Usage Examples

#### Basic Icon
```astro
---
import Icon from '@/components/ui/Icon.astro';
---

<Icon name="clock" size="md" />
```

#### Icon with Text
```astro
<div class="flex items-center gap-2">
  <Icon name="location" size="sm" class="text-primary" />
  <span>Harderwijk Centrum</span>
</div>
```

#### Custom Styling
```astro
<Icon 
  name="calendar" 
  size="lg" 
  class="text-accent hover:scale-110 transition-transform"
/>
```

### Implementation

```astro
---
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

const icons = {
  'clock': '<path stroke-linecap="round" stroke-linejoin="round" d="..." />',
  // ... other icons
};
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class={`${sizeClasses[size]} ${className}`}
  aria-hidden="true"
>
  <Fragment set:html={icons[name]} />
</svg>
```

---

## ThemeToggle Component

**File:** [`ThemeToggle.astro`](./ThemeToggle.astro)

Interactive theme toggle button with sun/moon icons. Uses Alpine.js for reactivity and localStorage for theme persistence across page loads.

### Features

- **Theme States**
  - Light mode (default)
  - Dark mode
  - System preference detection
- **Persistence**
  - LocalStorage (`localStorage.getItem('theme')`)
  - Survives page reloads
- **Icons**
  - Sun icon (visible in dark mode)
  - Moon icon (visible in light mode)
  - Smooth opacity transitions
- **System Preference**
  - Respects `prefers-color-scheme: dark`
  - Watches for system theme changes
  - User preference overrides system

### State Management

```typescript
x-data="{
  theme: localStorage.getItem('theme') || 
         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  
  init() {
    this.applyTheme();
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.theme = e.matches ? 'dark' : 'light';
          this.applyTheme();
        }
      });
  },
  
  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem('theme', this.theme);
  },
  
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}"
```

### Usage

```astro
---
import ThemeToggle from '@/components/ui/ThemeToggle.astro';
---

<!-- In Navigation -->
<nav class="flex items-center gap-6">
  <Link href="/">Home</Link>
  <Link href="/contact">Contact</Link>
  <ThemeToggle />
</nav>
```

### Visual States

**Light Mode:**
```
┌────────┐
│   🌙   │ ← Moon icon indicates "switch to dark"
└────────┘
```

**Dark Mode:**
```
┌────────┐
│   ☀️   │ ← Sun icon indicates "switch to light"
└────────┘
```

### Accessibility

- `aria-label="Toggle theme"` on button
- `title="Toggle theme"` for tooltip
- Keyboard accessible (Tab, Enter, Space)
- Focus-visible outline (2px solid primary)

### Where Used

| Location | Context |
|----------|---------|
| [`Navigation.astro`](../layout/Navigation.astro) | Desktop navigation bar |
| [`Navigation.astro`](../layout/Navigation.astro) | Mobile drawer menu |

---

## ProgramModal Component

**File:** [`ProgramModal.astro`](./ProgramModal.astro)

Modal dialog for displaying detailed program information. Uses Alpine.js for state management and x-show directives for visibility.

### Features

- **Content Sections**
  - Hero image (optional)
  - Category badge
  - Title
  - Date/time metadata
  - Location badge
  - Description
  - No-content fallback
- **Interactions**
  - Click backdrop to close
  - ESC key to close
  - Body scroll lock when open
  - Animated transitions
- **Responsive**
  - Max-width: 4xl (896px)
  - Max-height: 90vh
  - Scrollable content area

### State Integration

Expects Alpine.js data context:
```typescript
{
  modalOpen: boolean,
  selectedProgram: number | null,
  programs: Array<ProgramItem>
}
```

### Visual Structure

```
┌─────────────────────────────────────────────┐
│                                      [X]    │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │         Hero Image (optional)      │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [CATEGORY BADGE]                           │
│                                             │
│  Program Title (Large, Bold)               │
│                                             │
│  [🗓️ Date/Time]  [📍 Location]             │
│  ─────────────────────────────────────────  │
│                                             │
│  Over dit programma                         │
│  Description text with proper line breaks   │
│  and formatting...                          │
│                                             │
│  ─────────────────────────────────────────  │
│              [Sluiten Button]               │
└─────────────────────────────────────────────┘
```

### Usage

```astro
---
import ProgramModal from '@/components/ui/ProgramModal.astro';
---

<div x-data="{ 
  modalOpen: false, 
  selectedProgram: null,
  programs: []
}">
  <!-- Trigger button -->
  <button @click="selectedProgram = 0; modalOpen = true">
    View Program
  </button>
  
  <!-- Modal -->
  <ProgramModal />
</div>
```

### Accessibility

- `role="dialog"` and `aria-modal="true"` on container
- `aria-labelledby="modal-title"` references title
- Body scroll lock (prevents background scrolling)
- Focus trap within modal when open
- ESC key to close
- Clear close button (`aria-label="Close modal"`)

### z-index Layering

```css
--z-modal-backdrop: 1000;  /* Backdrop overlay */
--z-modal: 1001;           /* Modal content */
```

---

## Design System Integration

### CSS Custom Properties

All UI components use design tokens:

```css
/* Colors */
--color-primary          /* Brand primary (blue) */
--color-secondary        /* Brand secondary (orange) */
--color-accent           /* Accent/CTA color */

/* Text Colors */
--text-primary           /* Primary text */
--text-secondary         /* Secondary text */
--text-tertiary          /* Tertiary/muted text */
--text-inverse           /* Inverse text (white on dark) */

/* Backgrounds */
--bg-base               /* Base background */
--bg-elevated           /* Elevated surfaces (cards) */
--bg-overlay            /* Modal/backdrop overlay */

/* Borders */
--border-primary        /* Primary border */

/* Shadows */
--shadow-sm             /* Small elevation */
--shadow-md             /* Medium elevation */
--shadow-lg             /* Large elevation */
--shadow-xl             /* Extra large (modals) */

/* Transitions */
--transition-base       /* Base transition (200ms ease) */
```

### Reduced Motion Support

All components respect accessibility preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .link,
  .theme-toggle,
  .icon {
    transition: none !important;
  }
  
  .link:hover,
  .theme-toggle:hover {
    transform: none !important;
  }
}
```

---

## Component Comparison

| Component | Purpose | Interactivity | Dependencies |
|-----------|---------|---------------|--------------|
| **Link** | Navigation & links | Static | None |
| **Icon** | Visual indicators | Static | None |
| **ThemeToggle** | Theme switching | Alpine.js | LocalStorage |
| **ProgramModal** | Content display | Alpine.js | Program data context |

---

## Related Documentation

- **Layout Components**: [`src/components/layout/README.md`](../layout/README.md)
- **Base Components**: [`src/components/common/README.md`](../common/README.md)
- **Constants**: [`src/constants/README.md`](../../constants/README.md)
- **Types**: [`navigation.ts`](../../types/navigation.ts)
- **Design System**: [`plans/design-system-analysis.md`](../../../plans/design-system-analysis.md)

---

**Last Updated:** December 31, 2024 | **Status:** ✅ Complete (Phase 4)
