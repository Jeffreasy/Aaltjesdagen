# Layout Components

Comprehensive layout components for the Aaltjesdagen website. These components provide the structural foundation for consistent, responsive layouts across all pages.

## Overview

The layout system provides three core components that handle site-wide navigation, footer, and scroll-to-top functionality:

- **[Navigation](./Navigation.astro)** - Responsive header navigation with mobile menu
- **[Footer](./Footer.astro)** - Rich footer with contact, links, and newsletter
- **[BackToTop](./BackToTop.astro)** - Floating scroll-to-top button

### Design System Compliance

All layout components adhere to the Aaltjesdagen design system:
- Adaptive light/dark theme support via CSS custom properties
- Design tokens from [`site.ts`](../../constants/site.ts)
- TypeScript type safety via [`navigation.ts`](../../types/navigation.ts)
- Accessibility-first implementation (ARIA labels, keyboard navigation)
- Responsive breakpoints (mobile-first approach)

### Dependencies

- **Alpine.js** - Client-side interactivity and state management
- **Base Components** - [`SocialLink`](../common/SocialLink.astro), [`NewsletterForm`](../common/NewsletterForm.astro)
- **UI Components** - [`Link`](../ui/Link.astro), [`ThemeToggle`](../ui/ThemeToggle.astro)
- **Constants** - [`SITE`](../../constants/site.ts), [`NAVIGATION_ITEMS`](../../constants/site.ts), [`SOCIAL_LINKS`](../../constants/site.ts)
- **Types** - [`NavItem`](../../types/navigation.ts), [`LinkProps`](../../types/navigation.ts)

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

**File:** [`Navigation.astro`](./Navigation.astro)

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
  - Integrated [`ThemeToggle`](../ui/ThemeToggle.astro) in both desktop and mobile views

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

### Dependencies

| Dependency | Purpose |
|------------|---------|
| [`NAVIGATION_ITEMS`](../../constants/site.ts) | Navigation link data |
| [`Link`](../ui/Link.astro) | Desktop navigation links (variant="nav") |
| [`ThemeToggle`](../ui/ThemeToggle.astro) | Light/dark theme switcher |
| Alpine.js | Mobile menu state & interactions |
| CSS Custom Properties | Theme-aware colors & transitions |

### Usage in BaseLayout

```astro
---
import Navigation from '@/components/layout/Navigation.astro';
---

<header class="sticky top-0 z-50">
  <div class="container-custom">
    <div class="flex items-center justify-between py-6">
      <a href="/" class="logo">
        <img src="/assets/logo.png" alt="Aaltjesdagen" />
      </a>
      <Navigation />
    </div>
  </div>
</header>
```

### Active State Logic

```javascript
// Desktop: Handled by Link component
<Link href={item.href} variant="nav">
  {item.name}
</Link>

// Mobile: Custom implementation
const isActive = currentPath === item.href || 
                 (item.href !== "/" && currentPath.startsWith(item.href));
```

---

## Footer Component

**File:** [`Footer.astro`](./Footer.astro)

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
  - [`SocialLink`](../common/SocialLink.astro) for social media icons
  - [`NewsletterForm`](../common/NewsletterForm.astro) for email signup
  - [`Link`](../ui/Link.astro) for navigation and legal links

### Section Breakdown

#### Column 1: Logo + Description
```astro
<img src="/assets/logo.png" alt={`${SITE.name} Logo`} />
<p>{SITE.description}</p>
```
- Logo with theme-aware inversion (dark mode)
- Site tagline from [`SITE`](../../constants/site.ts)

#### Column 2: Quick Links (Snelle Links)
```astro
{NAVIGATION_ITEMS.map((item) => (
  <li>
    <Link href={item.href} variant="footer">{item.name}</Link>
  </li>
))}
```
- Navigation links repeated in footer
- Uses [`Link`](../ui/Link.astro) component with `variant="footer"`
- Active state detection matches current page

#### Column 3: Contact Information
```astro
<a href={`mailto:${SITE.email}`} class="footer-link">
  {SITE.email}
</a>
<span>{SITE.phone}</span>
<address>
  {SITE.location.city}, {SITE.location.region}, {SITE.location.country}
</address>
```
- Email (clickable mailto link)
- Phone number
- Location address
- Each with corresponding icon

#### Column 4: Social Media + Newsletter
```astro
{SOCIAL_LINKS.map((social) => (
  <SocialLink {...social} variant="footer" size="md" />
))}
<NewsletterForm />
```
- Social media links from [`SOCIAL_LINKS`](../../constants/site.ts)
- Newsletter subscription form with validation

### Bottom Section: Legal + Copyright

```astro
<!-- Legal Links -->
{LEGAL_LINKS.map((link) => (
  <Link href={link.href} variant="footer">
    {link.name}
  </Link>
))}

<!-- Copyright -->
<p>&copy; {currentYear} {SITE.name}. Alle rechten voorbehouden.</p>
<p>Website door {DEVELOPER.name}</p>
```

### Responsive Grid Layout

```css
/* Mobile: 1 column */
grid-cols-1

/* Tablet: 2 columns */
sm:grid-cols-2

/* Desktop: 4 columns */
lg:grid-cols-4
```

### Dependencies

| Dependency | Purpose |
|------------|---------|
| [`SITE`](../../constants/site.ts) | Site metadata (name, email, phone, location) |
| [`NAVIGATION_ITEMS`](../../constants/site.ts) | Quick links navigation |
| [`SOCIAL_LINKS`](../../constants/site.ts) | Social media platform links |
| [`LEGAL_LINKS`](../../constants/site.ts) | Privacy/legal page links |
| [`DEVELOPER`](../../constants/site.ts) | Developer attribution |
| [`SocialLink`](../common/SocialLink.astro) | Social media link component |
| [`NewsletterForm`](../common/NewsletterForm.astro) | Newsletter subscription |
| [`Link`](../ui/Link.astro) | Footer navigation links |

### Usage in BaseLayout

```astro
---
import Footer from '@/components/layout/Footer.astro';
---

<body>
  <Navigation />
  <main>
    <slot />
  </main>
  <Footer />
  <BackToTop />
</body>
```

---

## BackToTop Component

**File:** [`BackToTop.astro`](./BackToTop.astro)

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
  - Pulse ring effect on hover
- **Positioning**
  - Fixed: bottom-right corner (6rem padding)
  - Elevated z-index to stay above content

### State Management

```typescript
x-data="{ 
  show: false,
  init() { this.checkScroll(); },
  checkScroll() { this.show = window.pageYOffset > 400; },
  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}"
@scroll.window.throttle.100ms="checkScroll()"
```

### Usage

Automatically included in [`BaseLayout.astro`](../../layouts/BaseLayout.astro). No additional setup required.

```astro
<BackToTop />
```

---

## Design System Integration

### Constants Usage

All layout components consume centralized constants from [`site.ts`](../../constants/site.ts):

```typescript
import { 
  SITE,              // Site metadata
  NAVIGATION_ITEMS,  // Main navigation links
  SOCIAL_LINKS,      // Social media platforms
  LEGAL_LINKS,       // Footer legal links
  DEVELOPER          // Developer attribution
} from '@/constants/site.ts';
```

**Benefits:**
- Single source of truth for content
- Easy content updates without component changes
- Type safety via TypeScript
- Consistency across Navigation & Footer

### TypeScript Types

Type definitions from [`navigation.ts`](../../types/navigation.ts) ensure type safety:

```typescript
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
  iconPath: string;
}

export type LinkVariant = 'nav' | 'footer' | 'inline' | 'button';
```

### Base Components

Layout components leverage reusable base components:

- **[`Link.astro`](../ui/Link.astro)** - Unified link component with variants
  - Used in: Navigation (desktop), Footer (quick links, legal)
  - Variants: `nav`, `footer`
  - Automatic active state detection
  
- **[`SocialLink.astro`](../common/SocialLink.astro)** - Social media link component
  - Used in: Footer (social section)
  - Variant: `footer`
  - Size: `md`
  
- **[`NewsletterForm.astro`](../common/NewsletterForm.astro)** - Newsletter subscription
  - Used in: Footer (column 4)
  - Alpine.js form state management
  - Validation & error handling
  
- **[`ThemeToggle.astro`](../ui/ThemeToggle.astro)** - Theme switcher
  - Used in: Navigation (both desktop & mobile)
  - LocalStorage persistence
  - System preference detection

### Design Tokens

All components reference CSS custom properties from the design system:

```css
/* Colors */
--color-primary       /* Brand primary color */
--color-secondary     /* Brand secondary color */
--color-accent        /* Accent/highlight color */

/* Text Colors */
--text-primary        /* Primary text color */
--text-secondary      /* Secondary text color */
--text-tertiary       /* Tertiary/muted text */
--text-inverse        /* Inverse text (for dark backgrounds) */

/* Backgrounds */
--bg-base            /* Base background */
--bg-elevated        /* Elevated surface (cards, modals) */
--bg-overlay         /* Overlay/backdrop */

/* Borders */
--border-primary     /* Primary border color */
--border-secondary   /* Secondary border color */

/* Shadows */
--shadow-sm          /* Small shadow */
--shadow-md          /* Medium shadow */
--shadow-lg          /* Large shadow */
--shadow-xl          /* Extra large shadow */

/* Transitions */
--transition-base    /* Base transition duration/easing */
```

---

## Migration History

### Phase 3 Refactor (December 2024)

The layout components underwent a comprehensive refactor to improve maintainability, consistency, and developer experience.

#### What Changed

**Before Phase 3:**
- Hardcoded navigation items in multiple locations
- Inconsistent link styling across components
- Duplicate social media icons & newsletter forms
- No centralized constants
- Limited TypeScript type safety

**After Phase 3:**
- ✅ Extracted constants to [`site.ts`](../../constants/site.ts)
- ✅ Created unified [`Link`](../ui/Link.astro) component with variants
- ✅ Built reusable [`SocialLink`](../common/SocialLink.astro) component
- ✅ Modularized [`NewsletterForm`](../common/NewsletterForm.astro)
- ✅ Added comprehensive TypeScript types
- ✅ Implemented automatic active state detection
- ✅ Enhanced accessibility features

#### Improvement Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Files** | 2 monolithic components | 8 modular components | +300% modularity |
| **Constants** | 0 (hardcoded) | 1 central file | ∞ consistency |
| **Type Safety** | Minimal | Full TypeScript | 100% coverage |
| **Reusability** | Low | High | Link/SocialLink reused 3x+ |
| **Maintainability** | Hard | Easy | Single update point |
| **Accessibility** | Basic | Comprehensive | ARIA, keyboard nav |

#### Migration Benefits

- **Single Source of Truth** - Content updates in one place ([`site.ts`](../../constants/site.ts))
- **Type Safety** - Compiler catches errors before runtime
- **Consistency** - Shared components ensure uniform behavior
- **Accessibility** - Built-in ARIA labels and keyboard support
- **Performance** - Smaller bundle via component reuse
- **Developer Experience** - Clear component contracts and documentation

---

## Accessibility Features

All layout components prioritize accessibility:

### Navigation
- `aria-label="Main navigation"` on nav elements
- `aria-current="page"` on active links
- `aria-label="Toggle menu"` on hamburger button
- `role="dialog"` and `aria-modal="true"` on mobile drawer
- Keyboard navigation: Tab, Enter, Escape
- Body scroll lock when menu open (prevents scrolljacking)

### Footer
- Semantic HTML5 elements (`<nav>`, `<address>`)
- `aria-label="Footer navigation"` and `"Legal navigation"`
- Proper heading hierarchy
- Clear focus indicators
- Color contrast compliance (4.5:1 minimum)

### BackToTop
- `aria-label="Terug naar boven"` on button
- Visible focus ring (2px solid outline)
- Smooth scroll with reduced-motion respect
- Sufficient tap target size (48x48px minimum)

### Reduced Motion Support

All components respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .link,
  .nav-mobile-link,
  .footer-link {
    transition: none !important;
  }
  
  .link:hover,
  .nav-mobile-link:hover {
    transform: none !important;
  }
}
```

---

## Responsive Behavior

### Breakpoints

All components use consistent Tailwind breakpoints:

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `xs` | 320px | Small mobile |
| `sm` | 640px | Mobile/phablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Navigation Responsive Behavior

```astro
<!-- Desktop: hidden md:flex -->
<nav class="hidden md:flex">
  <!-- Horizontal navigation -->
</nav>

<!-- Mobile: md:hidden -->
<div class="md:hidden">
  <!-- Hamburger + drawer -->
</div>
```

### Footer Responsive Grid

```astro
<!-- Responsive grid: 1 → 2 → 4 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
  <!-- Footer columns -->
</div>
```

---

## Related Documentation

- **Base Components**: [`src/components/common/README.md`](../common/README.md)
- **UI Components**: [`src/components/ui/README.md`](../ui/README.md)
- **Constants**: [`src/constants/README.md`](../../constants/README.md)
- **Types**: [`navigation.ts`](../../types/navigation.ts)
- **Design System**: [`plans/design-system-analysis.md`](../../../plans/design-system-analysis.md)
- **Refactor Plan**: [`plans/layout-refactor-plan.md`](../../../plans/layout-refactor-plan.md)

---

**Last Updated:** December 31, 2024 | **Status:** ✅ Complete (Phase 4)
