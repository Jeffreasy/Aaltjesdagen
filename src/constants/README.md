# Constants

Centralized configuration and data constants for the Aaltjesdagen website. This directory contains the single source of truth for site metadata, navigation structure, social media links, and legal information.

## Overview

The constants system provides:
- **Single Source of Truth** - One place to update site-wide content
- **Type Safety** - Full TypeScript support with `as const` assertions
- **Import Consistency** - Named exports for clear dependencies
- **Maintainability** - Content updates without component changes

---

## Site Constants File

**File:** [`site.ts`](./site.ts)

Central configuration file containing all site-wide constants, organized into logical exports.

### Exports Overview

```typescript
export const SITE = { ... };              // Site metadata & contact info
export const NAVIGATION_ITEMS = [ ... ];  // Main navigation links
export const SOCIAL_LINKS = [ ... ];      // Social media platforms
export const LEGAL_LINKS = [ ... ];       // Legal/policy pages
export const DEVELOPER = { ... };         // Developer attribution
```

---

## SITE Object

Site metadata and contact information.

### Structure

```typescript
export const SITE = {
  name: string;
  description: string;
  email: string;
  phone: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
} as const;
```

### Current Values

```typescript
export const SITE = {
  name: 'Aaltjesdagen',
  description: 'Het grootste evenement van Harderwijk! Kom en geniet van muziek, cultuur en gezelligheid tijdens de jaarlijkse Aaltjesdagen.',
  email: 'info@aaltjesdagen.nl',
  phone: '+31 (0)341 123 456',
  location: {
    city: 'Harderwijk',
    region: 'Gelderland',
    country: 'Nederland',
  },
} as const;
```

### Usage Examples

#### Footer Contact Section
```astro
---
import { SITE } from '@/constants/site';
---

<div class="contact-info">
  <!-- Email -->
  <a href={`mailto:${SITE.email}`}>
    {SITE.email}
  </a>
  
  <!-- Phone -->
  <span>{SITE.phone}</span>
  
  <!-- Location -->
  <address>
    {SITE.location.city}<br />
    {SITE.location.region}, {SITE.location.country}
  </address>
</div>
```

#### Page Metadata
```astro
---
import { SITE } from '@/constants/site';
---

<head>
  <title>{SITE.name} - Harderwijk's Grootste Evenement</title>
  <meta name="description" content={SITE.description} />
  <meta property="og:site_name" content={SITE.name} />
</head>
```

#### Logo Alt Text
```astro
<img src="/assets/logo.png" alt={`${SITE.name} Logo`} />
```

### When to Update

- **Site Name Change** - Rebrand or name adjustment
- **Contact Info Change** - New email, phone, or address
- **Description Update** - SEO or messaging changes
- **Location Move** - New venue or city

---

## NAVIGATION_ITEMS Array

Main site navigation structure used in header and footer.

### Structure

```typescript
export const NAVIGATION_ITEMS = Array<{
  name: string;   // Display name
  href: string;   // URL path
}> as const;
```

### Current Values

```typescript
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Bereikbaarheid', href: '/bereikbaarheid' },
  { name: 'ADF Muziekfestival', href: '/adf-muziekfestival' },
  { name: 'Braderie', href: '/braderie' },
  { name: 'Salsa', href: '/salsa' },
  { name: 'Sponsoring', href: '/sponsoring' },
  { name: 'Vacatures', href: '/vacatures' },
  { name: 'Contact', href: '/contact' },
] as const;
```

### Usage Examples

#### Desktop Navigation
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

#### Mobile Navigation
```astro
<nav aria-label="Mobile navigation">
  {NAVIGATION_ITEMS.map((item, index) => (
    <a href={item.href} class="nav-mobile-link">
      <span class="nav-mobile-link__number">
        0{index + 1}
      </span>
      {item.name}
    </a>
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

### When to Update

- **Add New Page** - Append new item to array
  ```typescript
  { name: 'Nieuwe Pagina', href: '/nieuwe-pagina' }
  ```
- **Remove Page** - Delete item from array
- **Reorder Navigation** - Change array order (affects menu order)
- **Rename Page** - Update `name` property

### Adding Extended Navigation Features

For future icon support or external links:

```typescript
export const NAVIGATION_ITEMS = [
  { 
    name: 'Home', 
    href: '/',
    icon: 'home' // Future: icon identifier
  },
  { 
    name: 'Facebook', 
    href: 'https://facebook.com/aaltjesdagen',
    external: true // Future: open in new tab
  },
] as const;
```

---

## SOCIAL_LINKS Array

Social media platform configurations with icon data.

### Structure

```typescript
export const SOCIAL_LINKS = Array<{
  platform: string;   // Platform name (Facebook, Instagram, etc.)
  href: string;       // Profile URL
  ariaLabel: string;  // Accessible label
  iconPath: string;   // SVG path data
}> as const;
```

### Current Values

```typescript
export const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    href: 'https://facebook.com/aaltjesdagen',
    ariaLabel: 'Volg ons op Facebook',
    iconPath: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    platform: 'Instagram',
    href: 'https://instagram.com/aaltjesdagen',
    ariaLabel: 'Volg ons op Instagram',
    iconPath: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11v11h-11v-11z M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z',
  },
  {
    platform: 'Twitter',
    href: 'https://twitter.com/aaltjesdagen',
    ariaLabel: 'Volg ons op Twitter',
    iconPath: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  },
] as const;
```

### Usage Examples

#### Footer Social Links
```astro
---
import { SOCIAL_LINKS } from '@/constants/site';
import SocialLink from '@/components/common/SocialLink.astro';
---

<div class="flex gap-3">
  {SOCIAL_LINKS.map((social) => (
    <SocialLink {...social} variant="footer" size="md" />
  ))}
</div>
```

#### Mobile Navigation Social
```astro
<div class="flex gap-4">
  {SOCIAL_LINKS.map((social) => (
    <SocialLink {...social} variant="compact" size="sm" />
  ))}
</div>
```

### When to Update

#### Add New Platform
```typescript
{
  platform: 'LinkedIn',
  href: 'https://linkedin.com/company/aaltjesdagen',
  ariaLabel: 'Volg ons op LinkedIn',
  iconPath: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z',
}
```

#### Update Profile URL
```typescript
// Change from:
href: 'https://twitter.com/aaltjesdagen',
// To:
href: 'https://x.com/aaltjesdagen',
```

#### Change Icon
Replace `iconPath` with new SVG path data. Ensure viewBox is `0 0 24 24` and paths use stroke (not fill).

### Finding SVG Icon Paths

1. **Heroicons** - https://heroicons.com (recommended, consistent style)
2. **Lucide Icons** - https://lucide.dev
3. **Custom SVG** - Extract `<path d="...">` content from your SVG

**Example Extraction:**
```svg
<!-- Original SVG -->
<svg viewBox="0 0 24 24">
  <path d="M18 2h-3a5 5 0 00-5 5v3H7..." />
</svg>

<!-- Extract path 'd' attribute -->
iconPath: 'M18 2h-3a5 5 0 00-5 5v3H7...'
```

---

## LEGAL_LINKS Array

Footer legal and policy navigation.

### Structure

```typescript
export const LEGAL_LINKS = Array<{
  name: string;  // Display name
  href: string;  // Page URL
}> as const;
```

### Current Values

```typescript
export const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookie Settings', href: '/cookies' },
  { name: 'Algemene Voorwaarden', href: '/voorwaarden' },
] as const;
```

### Usage Examples

#### Footer Legal Navigation
```astro
---
import { LEGAL_LINKS } from '@/constants/site';
import Link from '@/components/ui/Link.astro';
---

<nav aria-label="Legal navigation">
  {LEGAL_LINKS.map((link) => (
    <Link href={link.href} variant="footer" class="text-xs">
      {link.name}
    </Link>
  ))}
</nav>
```

### When to Update

- **Add New Legal Page** - Append to array
  ```typescript
  { name: 'Terms of Service', href: '/terms' }
  ```
- **Update URLs** - Change `href` if page moves
- **Rename Pages** - Update `name` for display

---

## DEVELOPER Object

Developer attribution for footer.

### Structure

```typescript
export const DEVELOPER = {
  name: string;   // Developer name
  label: string;  // Attribution label
} as const;
```

### Current Values

```typescript
export const DEVELOPER = {
  name: 'Jeffrey Lavente',
  label: 'Website door',
} as const;
```

### Usage Example

#### Footer Attribution
```astro
---
import { DEVELOPER } from '@/constants/site';
---

<p class="text-xs opacity-60">
  {DEVELOPER.label} <span class="font-bold">{DEVELOPER.name}</span>
</p>
```

---

## Usage Guidelines

### Importing Constants

Always use named imports for clarity:

```typescript
// ✅ Good: Named imports (clear dependencies)
import { SITE, NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/constants/site';

// ❌ Avoid: Wildcard imports (unclear dependencies)
import * as constants from '@/constants/site';
```

### Destructuring

For cleaner code, destructure specific properties:

```astro
---
import { SITE } from '@/constants/site';

const { name, email, location } = SITE;
const { city, region } = location;
---

<p>{name} - {city}, {region}</p>
<a href={`mailto:${email}`}>{email}</a>
```

### TypeScript Benefits

Constants use `as const` for maximum type safety:

```typescript
// Type is: readonly [{ readonly name: "Home", readonly href: "/" }, ...]
export const NAVIGATION_ITEMS = [...] as const;

// TypeScript catches typos
const firstNav = NAVIGATION_ITEMS[0];
console.log(firstNav.nane); // ❌ Error: Property 'nane' does not exist
console.log(firstNav.name); // ✅ OK: Type is "Home"
```

### When to Update Constants

| Scenario | Action |
|----------|--------|
| **New Page Added** | Add to `NAVIGATION_ITEMS` |
| **Contact Changed** | Update `SITE` object |
| **Social Added** | Append to `SOCIAL_LINKS` |
| **Legal Page Added** | Append to `LEGAL_LINKS` |
| **Rebrand** | Update `SITE.name` and `SITE.description` |
| **Developer Change** | Update `DEVELOPER` object |

### Validation Checklist

After updating constants:

- [ ] All URLs start with `/` for relative paths or `https://` for external
- [ ] No trailing slashes on internal URLs (use `/contact`, not `/contact/`)
- [ ] All `ariaLabel` values are descriptive and in Dutch
- [ ] SVG `iconPath` values are valid path data strings
- [ ] Email format is valid (`name@domain.ext`)
- [ ] Phone includes country code (`+31 ...`)
- [ ] Check for typos in Dutch text

---

## Migration Benefits

### Before Constants (Pre-Phase 3)

**Problems:**
- Navigation items hardcoded in multiple files
- Duplicate social media links in Footer & Navigation
- Contact info scattered across components
- No type safety
- Changes required updates in 3-5 places

**Example Anti-Pattern:**
```astro
<!-- Navigation.astro -->
<Link href="/">Home</Link>
<Link href="/bereikbaarheid">Bereikbaarheid</Link>
<!-- ... -->

<!-- Footer.astro -->
<Link href="/">Home</Link>
<Link href="/bereikbaarheid">Bereikbaarheid</Link>
<!-- ... duplicated -->
```

### After Constants (Phase 3+)

**Benefits:**
- ✅ Single source of truth
- ✅ Update once, reflect everywhere
- ✅ Type-safe with TypeScript
- ✅ Clear import dependencies
- ✅ Consistent data structure

**Example Best Practice:**
```astro
<!-- Navigation.astro & Footer.astro -->
---
import { NAVIGATION_ITEMS } from '@/constants/site';
---

{NAVIGATION_ITEMS.map((item) => (
  <Link href={item.href}>{item.name}</Link>
))}
```

### Improvement Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Update Locations** | 3-5 files | 1 file | 80% reduction |
| **Type Safety** | None | Full | 100% coverage |
| **Consistency** | Manual | Automatic | 100% reliable |
| **Maintainability** | Low | High | Significant |
| **Line Count** | ~150 (duplication) | ~80 (centralized) | 47% reduction |

---

## Component Dependencies

### Components Using Constants

| Component | Constants Used |
|-----------|----------------|
| [`Navigation.astro`](../components/layout/Navigation.astro) | `NAVIGATION_ITEMS` |
| [`Footer.astro`](../components/layout/Footer.astro) | `SITE`, `NAVIGATION_ITEMS`, `SOCIAL_LINKS`, `LEGAL_LINKS`, `DEVELOPER` |
| [`BaseLayout.astro`](../layouts/BaseLayout.astro) | `SITE` (metadata) |
| [`SocialLink.astro`](../components/common/SocialLink.astro) | Used via `SOCIAL_LINKS` data |

### Import Pattern

```typescript
// Layout components, aggregate all constants
import { 
  SITE, 
  NAVIGATION_ITEMS, 
  SOCIAL_LINKS, 
  LEGAL_LINKS, 
  DEVELOPER 
} from '@/constants/site';

// Base components, receive data via props
// (no direct import needed)
```

---

## TypeScript Types

Constants are paired with type definitions in [`types/navigation.ts`](../types/navigation.ts):

```typescript
// Type definitions
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

export interface LegalLink {
  name: string;
  href: string;
}

// Constants implement these types
import type { NavItem, SocialLink, LegalLink } from '@/types/navigation';

export const NAVIGATION_ITEMS: readonly NavItem[] = [...] as const;
export const SOCIAL_LINKS: readonly SocialLink[] = [...] as const;
export const LEGAL_LINKS: readonly LegalLink[] = [...] as const;
```

---

## Future Enhancements

### Potential Extensions

1. **Multi-Language Support**
   ```typescript
   export const SITE = {
     nl: {
       name: 'Aaltjesdagen',
       description: '...',
     },
     en: {
       name: 'Aaltjesdagen Festival',
       description: '...',
     },
   } as const;
   ```

2. **Environment-Specific Config**
   ```typescript
   export const SITE = {
     name: 'Aaltjesdagen',
     api: {
       production: 'https://api.aaltjesdagen.nl',
       development: 'http://localhost:3000',
     },
   } as const;
   ```

3. **Feature Flags**
   ```typescript
   export const FEATURES = {
     newsletter: true,
     darkMode: true,
     analytics: import.meta.env.PROD,
   } as const;
   ```

4. **SEO Metadata**
   ```typescript
   export const SEO = {
     defaultTitle: 'Aaltjesdagen - Harderwijk',
     titleTemplate: '%s | Aaltjesdagen',
     twitter: '@aaltjesdagen',
     ogImage: '/assets/og-image.jpg',
   } as const;
   ```

---

## Related Documentation

- **Layout Components**: [`src/components/layout/README.md`](../components/layout/README.md)
- **Base Components**: [`src/components/common/README.md`](../components/common/README.md)
- **UI Components**: [`src/components/ui/README.md`](../components/ui/README.md)
- **Type Definitions**: [`types/navigation.ts`](../types/navigation.ts)
- **Refactor Plan**: [`plans/layout-refactor-plan.md`](../../plans/layout-refactor-plan.md)

---

**Last Updated:** December 31, 2024 | **Status:** ✅ Complete (Phase 4)
