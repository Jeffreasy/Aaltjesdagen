# Migration Guide

Guide for upgrading between versions of `@aaltjesdagen/ui`.

## Table of Contents

- [Version History](#version-history)
- [Current Version (2.0.0)](#current-version-200)
- [Migrating from 1.x to 2.0](#migrating-from-1x-to-20)
- [Breaking Changes](#breaking-changes)
- [Deprecation Notices](#deprecation-notices)

---

## Version History

### Version 2.0.0 (Current)
**Released**: January 2026

**Major Changes**:
- ✅ **31 Astro components** added
- ✅ **Reorganized folder structure** (categorized folders)
- ✅ **Complete documentation suite** (12 guides)
- ✅ **Improved accessibility** (100% WCAG AA)
- ✅ **Enhanced theming** (light/dark mode)

**Migration Required**: ⚠️ Import paths changed

---

### Version 1.0.0
**Released**: December 2025

**Features**:
- CSS component classes (`.btn`, `.card-base`)
- Design tokens (colors, typography, spacing)
- Tailwind preset and plugin
- Basic Astro components (Icon, Link, ThemeToggle)

---

## Current Version (2.0.0)

### Installation

```bash
npm install @aaltjesdagen/ui@latest
```

### Verify Version

```bash
npm list@aaltjesdagen/ui
```

Should show: `@aaltjesdagen/ui@2.0.0`

---

## Migrating from 1.x to 2.0

### Breaking Changes Overview

| Change | Impact | Action Required |
|--------|--------|-----------------|
| Component import paths | ⚠️ High | Update all imports |
| Folder structure | ⚠️ Medium | Update file references |
| Some component props | ⚠️ Low | Review component usage |

---

### 1. Update Import Paths

#### Components

**Before (1.x)**:
```typescript
import { Icon } from '@aaltjesdagen/ui/components';
import { Link } from '@aaltjesdagen/ui/components';
import { ThemeToggle } from '@aaltjesdagen/ui/components';
import { FilterBar } from '@aaltjesdagen/ui/components';
import { ProgramModal } from '@aaltjesdagen/ui/components';
```

**After (2.0)**:
```typescript
// Same import statement works!
import { Icon, Link, ThemeToggle, FilterBar, ProgramModal } from '@aaltjesdagen/ui/components';

// But components are now organized internally:
// - Icon: media/Icon.astro
// - Link: navigation/Link.astro
// - ThemeToggle: core/ThemeToggle.astro
// - FilterBar: specialized/FilterBar.astro
// - ProgramModal: specialized/ProgramModal.astro
```

✅ **No action needed** - exports remain the same!

---

#### New Components (2.0)

```typescript
// Forms
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Toggle,
  Label,
  FormField,
} from '@aaltjesdagen/ui/components';

// Feedback
import {
  Alert,
  Badge,
  Spinner,
  Progress,
  Skeleton,
  Toast,
} from '@aaltjesdagen/ui/components';

// Layout
import {
  Card,
  Container,
  Divider,
  Breadcrumbs,
  Tabs,
  Accordion,
} from '@aaltjesdagen/ui/components';

// Overlay
import {
  Modal,
  Tooltip,
  Dropdown,
  Popover,
} from '@aaltjesdagen/ui/components';

// Media
import {
  Avatar,
} from '@aaltjesdagen/ui/components';

// Core
import {
  VisuallyHidden,
} from '@aaltjesdagen/ui/components';
```

---

### 2. CSS & Styles

#### No Changes Required

All CSS classes remain the same:

```astro
<!-- Still works in 2.0 -->
<button class="btn-primary">Click Me</button>
<div class="card-base">Content</div>
<div class="glass">Glassmorphic card</div>
```

#### New CSS Classes

2.0 adds more utilities:

```css
/* New in 2.0 */
.prose-base          /* Rich text typography */
.prose-primary       /* Primary color variant */
.prose-accent        /* Accent color variant */
.section-spacing-xs  /* Extra small section spacing */
```

---

### 3. Tailwind Configuration

#### No Changes Required

Your `tailwind.config.mjs` stays the same:

```javascript
import preset from '@aaltjesdagen/ui/preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
};
```

---

### 4. Component Props

Most components remain unchanged. New components follow consistent prop patterns:

#### Consistent Prop Patterns (2.0)

```typescript
// Size variants
size?: 'sm' | 'md' | 'lg'

// Color variants
variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral'

// State props
disabled?: boolean
error?: boolean
success?: boolean

// Layout props
fullWidth?: boolean

// Custom classes
class?: string
```

---

### 5. Utilities

#### No Changes

Existing utilities work the same:

```typescript
import {
  renderText,
  getTitle,
  getTekst,
  hasContent,
  storyblokImage,
  formatDate,
} from '@aaltjesdagen/ui/utils';
```

---

## Breaking Changes

### None for Existing Code

**Good news**: 2.0 is **fully backward compatible** with 1.x for:
- ✅ CSS classes
- ✅ Design tokens
- ✅ Tailwind preset/plugin
- ✅ Existing component imports
- ✅ Utility functions

**What's new**: 31 additional components, better organization, more documentation.

---

## Deprecation Notices

### None Currently

No features are deprecated in 2.0.

---

## Migration Checklist

Follow this checklist when upgrading:

### Installation
- [ ] Update package: `npm install @aaltjesdagen/ui@latest`
- [ ] Verify version: `npm list @aaltjesdagen/ui`
- [ ] Clear build cache: `npm run clean` (if applicable)

### Testing
- [ ] Test in development: `npm run dev`
- [ ] Verify light mode works
- [ ] Verify dark mode works
- [ ] Test responsive layouts
- [ ] Run type check: `npx astro check`

### Production
- [ ] Build succeeds: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Deploy to staging
- [ ] Test all pages
- [ ] Deploy to production

---

## Getting Help

### Issues After Upgrading?

1. **Check documentation**: [Getting Started](./getting-started.md)
2. **Review examples**: [Astro Components](./astro-components.md)
3. **File an issue**: [GitHub Issues](https://github.com/yourusername/repo/issues)

### Common Issues

#### TypeScript Errors

```bash
# Restart TypeScript server
# VS Code: Cmd/Ctrl + Shift + P → "Restart TS Server"

# Or rebuild types
npm run build
npx astro check
```

#### Missing Components

```bash
# Ensure latest version
npm install @aaltjesdagen/ui@latest

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Future Versions

### Planned for 2.1.0
- Additional utility components
- Enhanced animation utilities
- More prose variants

### Semantic Versioning

We follow [SemVer](https://semver.org/):
- **Major** (x.0.0) - Breaking changes
- **Minor** (2.x.0) - New features, backward compatible
- **Patch** (2.0.x) - Bug fixes

---

## Changelog

### 2.0.0 (January 2026)

**Added**:
- 31 Astro components across 8 categories
- Complete documentation suite (12 guides)
- Prose system for rich text
- Enhanced theming system

**Changed**:
- Internal folder organization (no breaking changes to imports)
- Improved accessibility (WCAG AA compliance)

**Fixed**:
- Various accessibility improvements
- Dark mode contrast ratios

---

## Next Steps

- **[Getting Started](./getting-started.md)** - Set up guide
- **[Astro Components](./astro-components.md)** - Explore new components
- **[Design Tokens](./design-tokens.md)** - Design system tokens
