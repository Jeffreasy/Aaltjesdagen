# Constants System

> **Context**: Data Layer (Site Info, Navigation, Links).
> **Source**: [`src/constants/`](../../src/constants/)

Centralized configuration and data constants for the Aaltjesdagen website. This directory contains the single source of truth for site metadata, navigation structure, social media links, and legal information.

## Overview

The constants system provides:
- **Single Source of Truth** - One place to update site-wide content
- **Type Safety** - Full TypeScript support with `as const` assertions
- **Import Consistency** - Named exports for clear dependencies

---

## Site Constants

**File:** [`site.ts`](../../src/constants/site.ts)

Central configuration file containing all site-wide constants, organized into logical exports.

### Exports Overview

```typescript
export const SITE = { ... };              // Site metadata & contact info
export const NAVIGATION_ITEMS = [ ... ];  // Main navigation links
export const SOCIAL_LINKS = [ ... ];      // Social media platforms
export const LEGAL_LINKS = [ ... ];       // Legal/policy pages
export const DEVELOPER = { ... };         // Developer attribution
```

### SITE Object

Site metadata and contact information.

```typescript
export const SITE = {
  name: 'Aaltjesdagen',
  description: '...',
  email: 'info@aaltjesdagen.nl',
  phone: '+31 (0)341 123 456',
  location: { ... },
} as const;
```

### NAVIGATION_ITEMS Array

Main site navigation structure used in header and footer.

```typescript
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Bereikbaarheid', href: '/bereikbaarheid' },
  // ...
] as const;
```

### SOCIAL_LINKS Array

Social media platform configurations with icon data.

```typescript
export const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    href: '...',
    ariaLabel: 'Volg ons op Facebook',
    iconPath: '...',
  },
  // ...
] as const;
```

### Finding SVG Icon Paths

1. **Heroicons** - https://heroicons.com (recommended, consistent style)
2. **Lucide Icons** - https://lucide.dev
3. **Custom SVG** - Extract `<path d="...">` content from your SVG

### Validation Checklist

After updating constants:

- [ ] All URLs start with `/` for relative paths or `https://` for external
- [ ] No trailing slashes on internal URLs
- [ ] All `ariaLabel` values are descriptive and in Dutch
- [ ] SVG `iconPath` values are valid path data strings

---

## Usage Guidelines

### Importing Constants

Always use named imports for clarity:

```typescript
// ✅ Good: Named imports
import { SITE, NAVIGATION_ITEMS } from '@/constants/site';
```

### TypeScript Benefits

Constants use `as const` for maximum type safety. TypeScript catches typos immediately.

---

## Future Enhancements

1. **Multi-Language Support**
   - Structure `SITE` to support `nl` / `en` keys.
2. **Environment-Specific Config**
   - Distinguish API endpoints for dev/prod.

---

**Original Doc Updated:** January 1, 2026
