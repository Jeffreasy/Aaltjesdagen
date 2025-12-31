# Base Components (Common)

Reusable, context-independent components that serve as building blocks for the Aaltjesdagen website. These components are used across multiple layout areas and provide consistent functionality.

## Overview

Base components in the `common/` directory provide specialized functionality that can be integrated into various parts of the application:

- **[SocialLink](#sociallink-component)** - Social media link with platform-specific styling
- **[NewsletterForm](#newsletterform-component)** - Newsletter subscription with validation

### Design Philosophy

Base components follow these principles:
- **Single Responsibility** - Each component does one thing well
- **Reusability** - Can be used in multiple contexts
- **Type Safety** - Full TypeScript prop definitions
- **Accessibility** - WCAG 2.1 AA compliant
- **Theme Awareness** - Adaptive light/dark mode support

---

## SocialLink Component

**File:** [`SocialLink.astro`](./SocialLink.astro)

Reusable social media link component with platform-specific icons, hover effects, and accessibility features. Supports multiple visual variants for different layout contexts.

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `platform` | `string` | - | ✅ | Platform name (Facebook, Instagram, Twitter, etc.) |
| `href` | `string` | - | ✅ | URL to social media profile |
| `variant` | `'default' \| 'compact' \| 'footer'` | `'default'` | ❌ | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ❌ | Icon size |
| `ariaLabel` | `string` | Auto-generated | ❌ | Accessible label for screen readers |
| `iconPath` | `string` | - | ✅ | SVG path data for platform icon |

### Variants

#### Default Variant
- Standard styling with border and shadow
- Rounded square (12px border-radius)
- Hover: Lift effect with orange gradient background
- Best for: General use, feature sections

```astro
<SocialLink
  platform="Facebook"
  href="https://facebook.com/aaltjesdagen"
  iconPath="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
  variant="default"
  size="md"
/>
```

#### Compact Variant
- Circular shape (50% border-radius)
- Smaller padding
- Hover: Scale effect (1.1x)
- Best for: Tight spaces, inline social links

```astro
<SocialLink
  platform="Twitter"
  href="https://twitter.com/aaltjesdagen"
  iconPath="M23 3a10.9 10.9 0..."
  variant="compact"
  size="sm"
/>
```

#### Footer Variant
- Matches footer design system
- Consistent with footer Link components
- Standard shadow and border
- Best for: Footer social section

```astro
<SocialLink
  platform="Instagram"
  href="https://instagram.com/aaltjesdagen"
  iconPath="M16 11.37A4 4 0..."
  variant="footer"
  size="md"
/>
```

### Size Options

| Size | Dimensions | Icon Size | Use Case |
|------|------------|-----------|----------|
| `sm` | 32px × 32px | 16px | Compact layouts, mobile |
| `md` | 44px × 44px | 20px | Standard (default) |
| `lg` | 56px × 56px | 24px | Hero sections, emphasis |

### Usage Examples

#### Footer Integration (Current Implementation)
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

#### Custom Social Links
```astro
<SocialLink
  platform="LinkedIn"
  href="https://linkedin.com/company/aaltjesdagen"
  ariaLabel="Bekijk ons LinkedIn profiel"
  iconPath="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
  variant="default"
  size="lg"
/>
```

#### Mobile Navigation Social Links
```astro
<div class="flex gap-4">
  <SocialLink
    platform="Facebook"
    href="https://facebook.com/aaltjesdagen"
    iconPath="..."
    variant="compact"
    size="sm"
  />
</div>
```

### Accessibility Features

- **Automatic `aria-label`** - Generated as `"Volg ons op {platform}"` if not provided
- **External Link Attributes** - `target="_blank"` and `rel="noopener noreferrer"`
- **Focus Indicators** - 2px solid outline on focus-visible
- **Screen Reader Support** - `aria-hidden="true"` on icon SVG
- **Keyboard Navigation** - Fully keyboard accessible (Tab, Enter)

### Where Used

| Location | Variant | Size | Count |
|----------|---------|------|-------|
| [`Footer.astro`](../layout/Footer.astro) | `footer` | `md` | 3 (FB, IG, Twitter) |
| Mobile Navigation | `compact` | `sm` | 2 (FB, IG) |
| *Potential Future Use* | Any | Any | Flexible |

### TypeScript Type

Defined in [`types/navigation.ts`](../../types/navigation.ts):

```typescript
export interface SocialLinkProps {
  platform: string;
  href: string;
  variant?: 'default' | 'compact' | 'footer';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  iconPath: string;
}
```

### Styling

Component uses CSS custom properties for theme adaptation:

```css
/* Base Styles */
background: var(--bg-base);
color: var(--text-secondary);
border: 1px solid var(--border-secondary);
box-shadow: var(--shadow-sm);

/* Hover State */
background: var(--color-secondary);  /* Orange gradient */
border-color: var(--color-secondary);
color: var(--text-inverse);
transform: translateY(-3px);
box-shadow: var(--shadow-lg-primary);
```

---

## NewsletterForm Component

**File:** [`NewsletterForm.astro`](./NewsletterForm.astro)

Newsletter subscription form with email validation, loading states, and user feedback. Uses Alpine.js for client-side state management and form handling.

### Features

1. **Email Validation**
   - Client-side regex validation (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
   - Real-time error feedback
   - Required field enforcement

2. **State Management**
   - `idle` → `loading` → `success` or `error`
   - Alpine.js reactive state
   - Automatic state transitions

3. **User Feedback**
   - Loading spinner during submission
   - Success message with checkmark icon
   - Error message display
   - Auto-dismiss success (5 seconds)

4. **API Integration**
   - Placeholder for newsletter API endpoint
   - POST request with JSON payload
   - Error handling with fallback messages

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `placeholder` | `string` | `'Uw email'` | ❌ | Input placeholder text |
| `class` | `string` | `''` | ❌ | Additional CSS classes |

### State Machine

```
┌─────────┐
│  IDLE   │ ← Initial state
└────┬────┘
     │ submitNewsletter()
     ↓
┌─────────┐
│ LOADING │ ← Form submission in progress
└────┬────┘
     │
     ├─ Success → ┌─────────┐
     │            │ SUCCESS │ ← Auto-dismiss after 5s
     │            └─────────┘
     │
     └─ Error → ┌─────────┐
                │  ERROR  │ ← Display error message
                └─────────┘
```

### State Properties

```typescript
{
  email: string,        // Current email input value
  loading: boolean,     // Submission in progress
  success: boolean,     // Submission succeeded
  error: string | null  // Error message (null if no error)
}
```

### Usage Examples

#### Default Usage (Footer)
```astro
---
import NewsletterForm from '@/components/common/NewsletterForm.astro';
---

<NewsletterForm />
```

#### Custom Placeholder
```astro
<NewsletterForm placeholder="Enter your email address" />
```

#### With Custom Styling
```astro
<NewsletterForm 
  placeholder="Subscribe to updates"
  class="mt-6 w-full max-w-md"
/>
```

### API Endpoint Configuration

The component includes a placeholder for API integration. To implement:

```typescript
// In NewsletterForm.astro x-data

async submitNewsletter() {
  // ... validation code ...
  
  try {
    // Replace with actual API endpoint
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email }),
    });
    
    if (!response.ok) throw new Error('Subscription failed');
    
    this.success = true;
    this.email = '';
  } catch (err) {
    this.error = 'Er is iets misgegaan. Probeer het later opnieuw.';
  } finally {
    this.loading = false;
  }
}
```

### Visual States

#### Idle State
```
┌───────────────────────────────────┐
│ Ontvang updates over Aaltjesdagen │
│ ┌─────────────────┐  ┌────┐       │
│ │ Uw email         │  │ →  │       │
│ └─────────────────┘  └────┘       │
└───────────────────────────────────┘
```

#### Loading State
```
┌───────────────────────────────────┐
│ Ontvang updates over Aaltjesdagen │
│ ┌─────────────────┐  ┌────┐       │
│ │ user@email.com  │  │ ⟳  │       │ ← Spinner
│ └─────────────────┘  └────┘       │
└───────────────────────────────────┘
```

#### Success State
```
┌───────────────────────────────────┐
│ ┌─────────────────────────────┐   │
│ │ ✓ Bedankt voor het aanmelden! │ │
│ └─────────────────────────────┘   │
└───────────────────────────────────┘
```

#### Error State
```
┌───────────────────────────────────┐
│ Ontvang updates over Aaltjesdagen │
│ ┌─────────────────┐  ┌────┐       │
│ │ invalid-email    │  │ →  │       │
│ └─────────────────┘  └────┘       │
│ ⚠ Voer een geldig e-mailadres in  │ ← Error
└───────────────────────────────────┘
```

### Error Handling

The component handles two types of errors:

1. **Validation Errors**
   ```typescript
   if (!this.email || !emailRegex.test(this.email)) {
     this.error = 'Voer een geldig e-mailadres in';
     return;
   }
   ```

2. **API Errors**
   ```typescript
   catch (err) {
     this.error = 'Er is iets misgegaan. Probeer het later opnieuw.';
   }
   ```

### Accessibility Features

- **ARIA Live Regions**
  - Success: `role="status" aria-live="polite"`
  - Error: `role="alert" aria-live="assertive"`
- **Label Association**
  - `aria-label="Email voor nieuwsbrief"` on input
  - `aria-label="Aanmelden voor nieuwsbrief"` on button
- **Disabled States**
  - Input and button disabled during loading
  - Visual opacity reduction
  - `cursor: not-allowed`
- **Focus Management**
  - Clear focus indicators on input
  - Focus outline on button
  - Keyboard accessible (Tab, Enter, Escape)

### Styling

```css
/* Input */
.newsletter-input {
  background: var(--bg-elevated);
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
}

.newsletter-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--shadow-color-focus);
}

/* Button */
.newsletter-button {
  background: linear-gradient(135deg, 
    var(--color-accent), 
    var(--color-accent-dark)
  );
  color: var(--text-inverse);
  box-shadow: var(--shadow-md-primary);
}

/* Success Message */
.newsletter-success {
  background: color-mix(in srgb, var(--color-success), transparent 90%);
  border: 1px solid var(--color-success);
  color: var(--color-success);
}

/* Error Message */
.newsletter-error {
  background: color-mix(in srgb, var(--color-error), transparent 90%);
  border: 1px solid var(--color-error);
  color: var(--color-error);
}
```

### Where Used

| Location | Context | Customization |
|----------|---------|---------------|
| [`Footer.astro`](../layout/Footer.astro) | Social Media Column | Default props |
| *Potential Future Use* | Hero CTAs, Sidebars | Custom placeholder |

### Implementation Notes

1. **API Integration Required**
   - Current implementation uses 1-second delay simulation
   - Replace with actual newsletter service (Mailchimp, SendGrid, custom)
   - Configure endpoint in environment variables

2. **Validation Enhancement**
   - Current: Basic regex pattern
   - Future: Server-side validation, disposable email detection

3. **Success Tracking**
   - Consider analytics event on successful subscription
   - Track conversion rates

4. **Future Enhancements**
   - GDPR consent checkbox
   - Double opt-in confirmation
   - Preference center integration
   - Multiple newsletter options (categories)

---

## TypeScript Types

Both components use type definitions from [`types/navigation.ts`](../../types/navigation.ts):

```typescript
/**
 * SocialLink Component Props
 */
export interface SocialLinkProps {
  platform: string;
  href: string;
  variant?: 'default' | 'compact' | 'footer';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  iconPath: string;
}

/**
 * Newsletter Form State
 */
export interface NewsletterFormState {
  email: string;
  loading: boolean;
  success: boolean;
  error: string | null;
}
```

---

## Design System Integration

### CSS Custom Properties

All components use design tokens for theme consistency:

```css
/* Color Tokens */
--color-primary       /* Brand primary */
--color-secondary     /* Brand secondary (orange) */
--color-accent        /* Accent/CTA color */
--color-success       /* Success state (green) */
--color-error         /* Error state (red) */

/* Background Tokens */
--bg-base            /* Base background */
--bg-elevated        /* Elevated surfaces */

/* Text Tokens */
--text-primary       /* Primary text */
--text-secondary     /* Secondary text */
--text-tertiary      /* Tertiary/muted text */
--text-inverse       /* Inverse text (white on dark) */

/* Border Tokens */
--border-primary     /* Primary border */
--border-secondary   /* Secondary border */

/* Shadow Tokens */
--shadow-sm          /* Small shadow */
--shadow-md          /* Medium shadow */
--shadow-lg          /* Large shadow */
--shadow-md-primary  /* Primary colored shadow */
--shadow-lg-primary  /* Large primary shadow */
--shadow-color-focus /* Focus ring shadow */

/* Transition Tokens */
--transition-base    /* Base transition (duration + easing) */
```

### Reduced Motion Support

Both components respect user motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .social-link,
  .newsletter-input,
  .newsletter-button {
    transition: none !important;
  }
  
  .social-link:hover,
  .newsletter-button:hover {
    transform: none !important;
  }
  
  .newsletter-spinner {
    animation: none !important;
  }
}
```

---

## Usage in Layout Components

### Footer.astro Integration

```astro
---
import { SOCIAL_LINKS } from '@/constants/site';
import SocialLink from '@/components/common/SocialLink.astro';
import NewsletterForm from '@/components/common/NewsletterForm.astro';
---

<!-- Column 4: Social Media + Newsletter -->
<div>
  <h3>Volg Ons</h3>
  
  <!-- Social Media Links -->
  <div class="flex gap-3 mb-6">
    {SOCIAL_LINKS.map((social) => (
      <SocialLink {...social} variant="footer" size="md" />
    ))}
  </div>
  
  <!-- Newsletter Signup -->
  <NewsletterForm />
</div>
```

### Potential Future Integrations

**Hero Section CTA:**
```astro
<section class="hero">
  <h1>Blijf op de hoogte!</h1>
  <NewsletterForm 
    placeholder="Voer uw email in"
    class="max-w-md mx-auto"
  />
</section>
```

**Sidebar Widget:**
```astro
<aside class="sidebar">
  <h3>Volg ons op social media</h3>
  <div class="flex gap-2">
    {SOCIAL_LINKS.map((social) => (
      <SocialLink {...social} variant="compact" size="sm" />
    ))}
  </div>
</aside>
```

---

## Related Documentation

- **Layout Components**: [`src/components/layout/README.md`](../layout/README.md)
- **UI Components**: [`src/components/ui/README.md`](../ui/README.md)
- **Constants**: [`src/constants/README.md`](../../constants/README.md)
- **Types**: [`navigation.ts`](../../types/navigation.ts)
- **Design System**: [`plans/design-system-analysis.md`](../../../plans/design-system-analysis.md)

---

**Last Updated:** December 31, 2024 | **Status:** ✅ Complete (Phase 4)
