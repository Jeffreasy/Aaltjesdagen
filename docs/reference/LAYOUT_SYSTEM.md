# Layout Components

> **Context**: Core structure (Navigation, Footer, Shell).
> **Source**: [`src/components/layout/`](../../src/components/layout/)

Comprehensive layout components for the Aaltjesdagen website. These components provide the structural foundation for consistent, responsive layouts across all pages.

## Overview

The layout system provides three core components that handle site-wide navigation, footer, and scroll-to-top functionality:

- **[Navigation](../../src/components/layout/Navigation.astro)** - Responsive header navigation with mobile menu
- **[Footer](../../src/components/layout/Footer.astro)** - Rich footer with contact, links, and newsletter
- **[BackToTop](../../src/components/layout/BackToTop.astro)** - Floating scroll-to-top button

### Design System Compliance

All layout components adhere to the Aaltjesdagen design system:
- Adaptive light/dark theme support via CSS custom properties
- Design tokens from [`site.ts`](../../src/constants/site.ts)
- TypeScript type safety via [`navigation.ts`](../../src/types/navigation.ts)
- Accessibility-first implementation (ARIA labels, keyboard navigation)
- Responsive breakpoints (mobile-first approach)

### Dependencies

- **Alpine.js** - Client-side interactivity and state management
- **Base Components** - [`SocialLink`](../../src/components/common/SocialLink.astro), [`NewsletterForm`](../../src/components/common/NewsletterForm.astro)
- **UI Components** - [`Link`](../../packages/design-system/src/components/Link.astro), [`ThemeToggle`](../../packages/design-system/src/components/ThemeToggle.astro)
- **Constants** - [`SITE`](../../src/constants/site.ts), [`NAVIGATION_ITEMS`](../../src/constants/site.ts), [`SOCIAL_LINKS`](../../src/constants/site.ts)
- **Types** - [`NavItem`](../../src/types/navigation.ts), [`LinkProps`](../../src/types/navigation.ts)

---

## Architecture

```
Layout Components
├── Navigation.astro          # Header navigation (desktop & mobile)
├── Footer.astro              # Site footer with 4-column grid
└── BackToTop.astro          # Scroll-to-top FAB

Shared Dependencies
├── constants/site.ts         # Navigation items, social links, site metadata
├── types/navigation.ts       # TypeScript type definitions
├── components/common/        # Reusable base components
│   ├── SocialLink.astro     
│   └── NewsletterForm.astro
└── components/ui/            # UI utility components
    ├── Link.astro           
    └── ThemeToggle.astro
```

### Component Hierarchy

```
BaseLayout.astro
├── Navigation.astro
│   ├── Link.astro (navigation links)
│   └── ThemeToggle.astro
├── <slot /> (page content)
├── Footer.astro
│   ├── Link.astro (footer links)
│   ├── SocialLink.astro (social media)
│   └── NewsletterForm.astro
└── BackToTop.astro
```

---

## Navigation Component

**File:** [`Navigation.astro`](../../src/components/layout/Navigation.astro)

### Purpose

Responsive navigation system with desktop horizontal menu and mobile slide-in drawer. Provides primary site navigation with active state indicators and keyboard accessibility.

### Features

- **Responsive Design**
  - Desktop: Horizontal navigation bar with Link components
  - Mobile: Hamburger menu with right-side slide-in drawer
- **Active State Detection**
  - Automatic highlighting of current page
  - Path-based matching (exact and prefix matching)
- **Keyboard Navigation**
  - `Tab` - Focus navigation items
  - `Enter` - Activate link
  - `Escape` - Close mobile menu
- **Alpine.js State Management**
  - `mobileMenuOpen` state for drawer visibility
  - Body scroll lock when menu open
  - Backdrop click to close
- **Theme Toggle Integration**
  - Integrated [`ThemeToggle`](../../packages/design-system/src/components/ThemeToggle.astro) in both desktop and mobile views

### Mobile Behavior

```typescript
// State Management
x-data="{ mobileMenuOpen: false }"
@keydown.escape.window="mobileMenuOpen = false"

// Body Scroll Lock
x-effect="mobileMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''"
```

**Visual Structure:**
1. Animated hamburger icon (3 lines → X transition)
2. Backdrop overlay with blur effect
3. Right-side drawer panel with smooth slide-in
4. Navigation links with numbered indicators (01, 02, etc.)
5. Social media icons in footer section

---

## Footer Component

**File:** [`Footer.astro`](../../src/components/layout/Footer.astro)

### Purpose

Comprehensive site footer with contact information, quick links, social media, newsletter signup, and legal navigation. Uses a responsive 4-column grid that adapts to different screen sizes.

### Features

- **4-Column Grid Layout**
  - Responsive: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
  - Equal-width columns with automatic reflow
- **Decorative Elements**
  - Background dot pattern for visual interest
  - Gradient top border (secondary → accent → primary)
  - Theme-aware styling
- **Base Component Integration**
  - [`SocialLink`](../../src/components/common/SocialLink.astro) for social media icons
  - [`NewsletterForm`](../../src/components/common/NewsletterForm.astro) for email signup
  - [`Link`](../../packages/design-system/src/components/Link.astro) for navigation and legal links

---

## BackToTop Component

**File:** [`BackToTop.astro`](../../src/components/layout/BackToTop.astro)

### Purpose

Floating action button (FAB) that appears when user scrolls down, providing quick navigation back to top of page.

### Features

- **Scroll Detection**
  - Appears after scrolling 400px down
  - Alpine.js throttled scroll listener (100ms)
- **Smooth Scrolling**
  - Native `window.scrollTo({ behavior: 'smooth' })`
  - Respects `prefers-reduced-motion`
- **Visual Effects**
  - Animated entrance/exit (opacity + transform)
  - Hover lift effect with enhanced shadow
- **Positioning**
  - Fixed: bottom-right corner (6rem padding)
  - Elevated z-index to stay above content

---

## Design System Integration

### Constants Usage

All layout components consume centralized constants from [`site.ts`](../../src/constants/site.ts):

```typescript
import { 
  SITE,              // Site metadata
  NAVIGATION_ITEMS,  // Main navigation links
  SOCIAL_LINKS,      // Social media platforms
  LEGAL_LINKS,       // Footer legal links
  DEVELOPER          // Developer attribution
} from '@/constants/site.ts';
```

### TypeScript Types

Type definitions from [`navigation.ts`](../../src/types/navigation.ts) ensure type safety.

---

**Original Doc Updated:** January 1, 2026
