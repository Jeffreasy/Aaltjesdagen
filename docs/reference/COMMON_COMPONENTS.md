# Common & Base Components

> **Context**: Shared Utilities (Social, Newsletter).
> **Source**: [`src/components/common/`](../../src/components/common/)

Reusable, context-independent components that serve as building blocks for the Aaltjesdagen website.

## Overview

- **[SocialLink](../../src/components/common/SocialLink.astro)** - Social media link with platform-specific styling
- **[NewsletterForm](../../src/components/common/NewsletterForm.astro)** - Newsletter subscription with validation

---

## SocialLink Component

**File:** [`SocialLink.astro`](../../src/components/common/SocialLink.astro)

Reusable social media link component with platform-specific icons, hover effects, and accessibility features.

### Props

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `platform` | `string` | - | ✅ |
| `href` | `string` | - | ✅ |
| `variant` | `'default' \| 'compact' \| 'footer'` | `'default'` | ❌ |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ❌ |
| `iconPath` | `string` | - | ✅ |

### Variants

- **Default**: Rounded square, orange gradient hover.
- **Compact**: Circular, smaller padding, scale effect.
- **Footer**: Matches footer design system (Design System 2.0).

---

## NewsletterForm Component

**File:** [`NewsletterForm.astro`](../../src/components/common/NewsletterForm.astro)

Newsletter subscription form with email validation, loading states, and user feedback. Uses Alpine.js for client-side state management.

### Features

1. **Email Validation**: Client-side regex.
2. **State Management**: Idle -> Loading -> Success/Error.
3. **User Feedback**: Spinners, checkmarks, auto-dismiss.
4. **API Integration**: Placeholder ready for backend endpoint.

### State Machine

```
Idle -> Submit -> Loading -> (Success -> Idle) OR (Error -> Idle)
```

### Styling

Uses design tokens:
- `--bg-elevated`
- `--color-accent` (Gradient for buttons)
- `--color-error` / `--color-success` for feedback states.

---
**Original Doc Updated:** January 1, 2026
