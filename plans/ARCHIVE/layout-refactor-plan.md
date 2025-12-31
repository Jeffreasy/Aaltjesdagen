# Footer & Navigation Layout Refactoring Plan

**Version:** 1.0  
**Created:** December 31, 2024  
**Project:** Aaltjesdagen Frontend - Layout Design System Refactoring  
**Status:** Architecture Phase - Implementation Ready

---

## Table of Contents

- [Footer \& Navigation Layout Refactoring Plan](#footer--navigation-layout-refactoring-plan)
  - [Table of Contents](#table-of-contents)
  - [Executive Summary](#executive-summary)
    - [Current State Assessment](#current-state-assessment)
    - [Improvement Opportunities](#improvement-opportunities)
    - [Expected Outcomes](#expected-outcomes)
  - [Phase 1: Foundations (High Priority)](#phase-1-foundations-high-priority)
    - [Task 1.1: Create Site Constants](#task-11-create-site-constants)
    - [Task 1.2: Create Navigation TypeScript Interfaces](#task-12-create-navigation-typescript-interfaces)
    - [Task 1.3: Update Global CSS Design Tokens](#task-13-update-global-css-design-tokens)
  - [Phase 2: Base Component Extraction (Medium Priority)](#phase-2-base-component-extraction-medium-priority)
    - [Task 2.1: Create SocialLink Component](#task-21-create-sociallink-component)
    - [Task 2.2: Create NewsletterForm Component](#task-22-create-newsletterform-component)
    - [Task 2.3: Create Link Component](#task-23-create-link-component)
  - [Phase 3: Component Refactoring (High Priority)](#phase-3-component-refactoring-high-priority)
    - [Task 3.1: Refactor Footer.astro](#task-31-refactor-footerastro)
    - [Task 3.2: Refactor Navigation.astro](#task-32-refactor-navigationastro)
  - [Phase 4: Documentation (Medium Priority)](#phase-4-documentation-medium-priority)
    - [Task 4.1: Create Layout Components README](#task-41-create-layout-components-readme)
    - [Footer](#footer)
    - [BackToTop](#backtotop)
  - [Architecture](#architecture)
    - [Data Flow](#data-flow)
    - [Component Dependencies](#component-dependencies)
  - [Usage](#usage)
    - [Adding to Base Layout](#adding-to-base-layout)
    - [Updating Navigation Items](#updating-navigation-items)
    - [Adding Social Platforms](#adding-social-platforms)
  - [Customization](#customization)
    - [Changing Nav Styles](#changing-nav-styles)
    - [Changing Mobile Menu Behavior](#changing-mobile-menu-behavior)
    - [Changing Footer Layout](#changing-footer-layout)
  - [Best Practices](#best-practices)
  - [Related Documentation](#related-documentation)
  - [Props](#props)
  - [Variants](#variants)
    - [Default](#default)
    - [Compact](#compact)
    - [Footer](#footer-1)
  - [Size Guide](#size-guide)
  - [Examples](#examples)
    - [Footer Social Links](#footer-social-links)
    - [Compact Mobile Menu](#compact-mobile-menu)
  - [Accessibility](#accessibility)
  - [Styling](#styling)
  - [Props](#props-1)
  - [Features](#features)
    - [Client-Side Validation](#client-side-validation)
    - [Loading State](#loading-state)
    - [Success State](#success-state)
    - [Error Handling](#error-handling)
  - [State Management](#state-management)
  - [API Integration](#api-integration)
  - [Examples](#examples-1)
    - [Default Usage](#default-usage)
    - [Custom Placeholder](#custom-placeholder)
    - [With Custom Class](#with-custom-class)
  - [Accessibility](#accessibility-1)
  - [Styling](#styling-1)
  - [Props](#props-2)
  - [Variants](#variants-1)
    - [Nav](#nav)
    - [Footer](#footer-2)
    - [Inline](#inline)
    - [Button](#button)
  - [Active State Detection](#active-state-detection)
  - [Examples](#examples-2)
    - [Navigation Links](#navigation-links)
    - [Footer Links](#footer-links)
    - [Inline Content Link](#inline-content-link)
    - [Button CTA](#button-cta)
    - [External Link](#external-link)
  - [Accessibility](#accessibility-2)
  - [Styling](#styling-2)
    - [Pattern 2: Changing Social Media Platform](#pattern-2-changing-social-media-platform)
    - [Pattern 3: Customizing Newsletter Form Behavior](#pattern-3-customizing-newsletter-form-behavior)
  - [Data Management](#data-management)
    - [Best Practice: Single Source of Truth](#best-practice-single-source-of-truth)
    - [Best Practice: Type Safety](#best-practice-type-safety)
  - [Styling Customization](#styling-customization)
    - [Customizing Link Hover Colors](#customizing-link-hover-colors)
    - [Customizing Footer Background](#customizing-footer-background)
    - [Adding Custom Nav Item Icons](#adding-custom-nav-item-icons)
  - [Testing](#testing)
    - [Manual Testing Checklist](#manual-testing-checklist)
    - [Visual Regression Testing](#visual-regression-testing)
    - [Accessibility Testing](#accessibility-testing)
  - [Performance](#performance)
    - [Optimization: Lazy Load Social Icons](#optimization-lazy-load-social-icons)
    - [Optimization: Defer Alpine.js](#optimization-defer-alpinejs)
    - [Monitoring: Core Web Vitals](#monitoring-core-web-vitals)
  - [Troubleshooting](#troubleshooting)
    - [Issue: Active State Not Detecting](#issue-active-state-not-detecting)
    - [Issue: Mobile Menu Not Closing](#issue-mobile-menu-not-closing)
    - [Issue: Z-Index Conflicts](#issue-z-index-conflicts)
    - [Issue: Newsletter Form Not Submitting](#issue-newsletter-form-not-submitting)
  - [Additional Resources](#additional-resources)
  - [Expected Outcomes](#expected-outcomes-1)
    - [Metrics](#metrics)
    - [Qualitative Improvements](#qualitative-improvements)
  - [Conclusion](#conclusion)

---

## Executive Summary

This document provides a comprehensive architectural design plan for refactoring the [`Footer.astro`](../src/components/layout/Footer.astro) and [`Navigation.astro`](../src/components/layout/Navigation.astro) components. The refactoring applies the same design system principles successfully used in the Bereikbaarheid refactor to eliminate hardcoded data, improve type safety, extract reusable patterns, and standardize design tokens.

### Current State Assessment

**Footer Component Analysis** ([`Footer.astro`](../src/components/layout/Footer.astro) - 436 lines):

✅ **Strengths:**
- Professional 4-column grid layout with responsive behavior
- Comprehensive styling with scoped CSS (styles on lines 307-436)
- Design system compliant with theme support
- Accessibility features (semantic HTML, ARIA labels, focus states)
- Consistent visual hierarchy

❌ **Issues:**
- Hardcoded navigation items (lines 90-103) - duplicate from Navigation
- Hardcoded social links array (lines 18-34) - 16 lines of config data
- Hardcoded legal links array (lines 36-40) - 4 lines of config data
- Hardcoded site description (line 73-75)
- Hardcoded contact info (lines 135, 157, 183-184)
- Hardcoded shadow colors using rgba values (line 347: `rgba(243, 146, 0, 0.3)`)
- Hardcoded shadow colors in focus states (line 387: `rgba(80, 176, 174, 0.2)`)
- Newsletter form inline without reusability (lines 233-268)
- Link hover state duplication across multiple selectors
- No TypeScript interfaces for data structures

**Navigation Component Analysis** ([`Navigation.astro`](../src/components/layout/Navigation.astro) - 269 lines):

✅ **Strengths:**
- Responsive desktop/mobile navigation with Alpine.js state management
- Active page detection logic (lines 36-38, 144-146)
- Keyboard navigation support (Escape key handling on line 69)
- Smooth slide-in mobile drawer with transitions
- Accessibility features (ARIA labels, semantic HTML)

❌ **Issues:**
- Hardcoded navigation items array (lines 14-23) - duplicates Footer data
- Hardcoded z-index values: `z-[60]` (line 79), `z-[50]` (line 101)
- Hardcoded Alpine.js transition durations: `duration-300` (lines 110, 124, 127), `duration-200` (line 113)
- Active state logic duplicated between desktop and mobile (lines 36-38, 144-146)
- Link styling duplicated across nav-link classes
- Social media placeholders in mobile menu (lines 172-193) - duplicates Footer social links
- No TypeScript interfaces for NavItem structure

### Improvement Opportunities

1. **Data Consolidation**: Extract all hardcoded data (nav items, social links, legal links, contact info, site metadata) into a centralized constants file
2. **Type Safety**: Create TypeScript interfaces for all data structures
3. **Design Token Integration**: Replace hardcoded z-index and shadow rgba values with CSS variable tokens
4. **Component Extraction**: Create reusable SocialLink, NewsletterForm, and Link components
5. **Animation Tokens**: Extract Alpine.js durations into CSS variables for consistency
6. **DRY Principle**: Eliminate code duplication in link styles, active states, and data arrays
7. **Documentation**: Add comprehensive component and usage documentation

### Expected Outcomes

- **Maintainability**: Centralized site configuration, single source of truth for navigation
- **Type Safety**: Full TypeScript coverage for component props and data structures
- **Reusability**: Extracted components usable throughout the application
- **Consistency**: Standardized design tokens and animation durations
- **Developer Experience**: Clear documentation and predictable APIs
- **Code Reduction**: Estimated ~150-200 lines removed through extraction and consolidation

---

## Phase 1: Foundations (High Priority)

### Task 1.1: Create Site Constants

**File**: [`src/constants/site.ts`](../src/constants/site.ts)

**Objective**: Centralize all site-wide configuration data into a single source of truth.

**Design Specification**:

```typescript
/**
 * Site-wide Constants & Configuration
 * Central source of truth for navigation, contact info, social links, and site metadata
 */

/**
 * Site Metadata
 */
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

/**
 * Main Navigation Items
 * Used in both Navigation.astro (header) and Footer.astro (footer links)
 */
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

/**
 * Social Media Links
 * Platform configurations with icon paths and accessibility labels
 */
export const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    href: 'https://facebook.com/aaltjesdagen',
    ariaLabel: 'Volg ons op Facebook',
    // SVG path for Facebook icon
    iconPath: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    platform: 'Instagram',
    href: 'https://instagram.com/aaltjesdagen',
    ariaLabel: 'Volg ons op Instagram',
    // SVG paths for Instagram icon (combined)
    iconPath: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11v11h-11v-11z M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z',
  },
  {
    platform: 'Twitter',
    href: 'https://twitter.com/aaltjesdagen',
    ariaLabel: 'Volg ons op Twitter',
    // SVG path for Twitter icon
    iconPath: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  },
] as const;

/**
 * Legal & Policy Links
 * Footer legal navigation items
 */
export const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookie Settings', href: '/cookies' },
  { name: 'Algemene Voorwaarden', href: '/voorwaarden' },
] as const;

/**
 * Developer Attribution
 */
export const DEVELOPER = {
  name: 'Jeffrey Lavente',
  label: 'Website door',
} as const;
```

**Rationale**:
- `as const` assertions provide strict typing and readonly guarantees
- Structured organization with clear JSDoc comments
- Icon paths included to avoid separate icon mapping logic
- Consistent naming following project conventions
- Single source of truth eliminates duplication between Footer and Navigation

**Integration Points**:
- Import in [`Footer.astro`](../src/components/layout/Footer.astro): Replace lines 18-40 with imports
- Import in [`Navigation.astro`](../src/components/layout/Navigation.astro): Replace lines 14-23 with imports
- Import in future components needing site metadata

---

### Task 1.2: Create Navigation TypeScript Interfaces

**File**: [`src/types/navigation.ts`](../src/types/navigation.ts)

**Objective**: Provide full type safety for navigation data structures and component props.

**Design Specification**:

```typescript
/**
 * Navigation Type Definitions
 * TypeScript interfaces for navigation, social, and link components
 */

/**
 * Navigation Item
 * Represents a single navigation link in the main site menu
 */
export interface NavItem {
  /** Display name for the navigation item */
  name: string;
  /** URL path (relative or absolute) */
  href: string;
  /** Optional icon identifier (for future icon support) */
  icon?: string;
  /** Whether link opens in new tab */
  external?: boolean;
}

/**
 * Social Media Link
 * Configuration for social media platform links
 */
export interface SocialLink {
  /** Platform name (Facebook, Instagram, Twitter, etc.) */
  platform: string;
  /** URL to social media profile */
  href: string;
  /** Accessible label for screen readers */
  ariaLabel: string;
  /** SVG path data for the platform icon */
  iconPath: string;
  /** Optional fill-based icon (alternative to stroke-based) */
  iconFill?: boolean;
}

/**
 * Legal/Policy Link
 * Footer legal navigation items
 */
export interface LegalLink {
  /** Display name (e.g., "Privacy Policy") */
  name: string;
  /** URL path to legal page */
  href: string;
}

/**
 * Link Component Variants
 * Visual style variants for the Link component
 */
export type LinkVariant = 'nav' | 'footer' | 'inline' | 'button';

/**
 * Link Component Props
 * Props interface for the reusable Link component
 */
export interface LinkProps {
  /** URL path (relative or absolute) */
  href: string;
  /** Visual variant (determines styling) */
  variant?: LinkVariant;
  /** Whether link is currently active/selected */
  active?: boolean;
  /** Whether link opens in new tab */
  external?: boolean;
  /** Additional CSS classes */
  class?: string;
  /** Accessible label (overrides default) */
  ariaLabel?: string;
}

/**
 * SocialLink Component Props
 * Props interface for the SocialLink component
 */
export interface SocialLinkProps {
  /** Platform name (Facebook, Instagram, etc.) */
  platform: string;
  /** URL to social media profile */
  href: string;
  /** Visual variant for different contexts */
  variant?: 'default' | 'compact' | 'footer';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (optional override) */
  ariaLabel?: string;
  /** SVG icon path */
  iconPath: string;
}

/**
 * Newsletter Form State
 * State management for newsletter subscription form
 */
export interface NewsletterFormState {
  /** Current email input value */
  email: string;
  /** Loading state during submission */
  loading: boolean;
  /** Success state after submission */
  success: boolean;
  /** Error message (null if no error) */
  error: string | null;
}
```

**Rationale**:
- Comprehensive JSDoc comments for IDE autocomplete
- Optional properties for flexibility
- Type unions for variant systems
- Separate interfaces for props vs. data structures
- Future-proof design (icon support, external links, etc.)

**Usage**:
```typescript
// In components
import type { NavItem, SocialLink, LinkProps } from '@/types/navigation';

// Type-safe props
const { href, variant = 'nav', active = false }: LinkProps = Astro.props;
```

---

### Task 1.3: Update Global CSS Design Tokens

**File**: [`src/styles/global.css`](../src/styles/global.css)

**Objective**: Add missing design tokens for z-index navigation layers, dynamic shadow colors, and animation durations used in Alpine.js transitions.

**Current State**:
- Z-index tokens exist (lines 103-128) but Navigation uses hardcoded `z-[60]` and `z-[50]`
- Shadow tokens use hardcoded rgba values: `rgba(243, 146, 0, 0.3)` (Footer line 347), `rgba(80, 176, 174, 0.2)` (Footer line 387)
- Alpine.js transitions use hardcoded `duration-300`, `duration-200` instead of CSS variables
- Missing tokens for overlay/modal layers used in mobile navigation

**Design Specification**:

**Addition 1: Enhanced Z-Index Hierarchy** (insert after line 128):

```css
/* Navigation-specific z-index tokens */
--z-nav-mobile-toggle: 600;  /* Mobile menu toggle button (above backdrop) */
--z-nav-mobile-backdrop: 500; /* Mobile menu backdrop overlay */
--z-nav-mobile-panel: 500;    /* Mobile menu drawer panel */

/* Note: These align with existing modal system:
   - Modal backdrop: 500 (same layer as mobile nav backdrop)
   - Modal content: 600 (same layer as mobile toggle)
   This ensures mobile nav behaves consistently with other overlays */
```

**Addition 2: Dynamic Shadow Color Tokens** (insert after line 79):

```css
/* Dynamic shadow colors using color-mix for theme adaptation */
--shadow-color-primary: color-mix(in srgb, var(--color-accent), transparent 70%);
--shadow-color-accent: color-mix(in srgb, var(--color-accent), transparent 80%);
--shadow-color-focus: color-mix(in srgb, var(--color-accent), transparent 80%);

/* Shadow system with dynamic colors */
--shadow-sm-primary: 0 1px 2px 0 var(--shadow-color-primary);
--shadow-md-primary: 0 4px 6px -1px var(--shadow-color-primary);
--shadow-lg-primary: 0 8px 16px var(--shadow-color-primary);
--shadow-xl-primary: 0 10px 20px var(--shadow-color-primary);
```

**Addition 3: Animation Duration Tokens** (insert after line 97):

```css
/* Animation durations for Alpine.js transitions (matches Tailwind's duration scale) */
--duration-200: 200ms;  /* Fast transitions (Tailwind: duration-200) */
--duration-300: 300ms;  /* Base transitions (Tailwind: duration-300) */
--duration-500: 500ms;  /* Slow transitions (Tailwind: duration-500) */

/* Predefined easing functions */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);  /* Tailwind's ease-out */
--ease-in: cubic-bezier(0.4, 0, 1, 1);     /* Tailwind's ease-in */
```

**Migration Impact**:

**Navigation.astro Changes**:
```astro
<!-- Before: Hardcoded z-index -->
<button class="... z-[60]">

<!-- After: Using token -->
<button class="... z-[var(--z-nav-mobile-toggle)]">

<!-- Before: Hardcoded duration -->
x-transition:enter="transition ease-out duration-300"

<!-- After: Using token (via Tailwind config or inline style) -->
x-transition:enter="transition ease-out"
x-transition:enter-start="opacity-0"
<!-- Note: Alpine doesn't support CSS vars in transition classes,
     so we'll use Tailwind's duration classes which map to our tokens -->
```

**Footer.astro Changes**:
```css
/* Before: Hardcoded rgba shadow */
.social-link:hover {
  box-shadow: 0 8px 16px rgba(243, 146, 0, 0.3);
}

/* After: Using dynamic token */
.social-link:hover {
  box-shadow: var(--shadow-lg-primary);
}

/* Before: Hardcoded rgba focus */
.newsletter-input:focus {
  box-shadow: 0 0 0 3px rgba(80, 176, 174, 0.2);
}

/* After: Using dynamic token */
.newsletter-input:focus {
  box-shadow: 0 0 0 3px var(--shadow-color-focus);
}
```

**Rationale**:
- `color-mix()` creates theme-aware shadows that adapt automatically in dark mode
- Z-index tokens align with existing modal system for predictable layering
- Duration tokens match Tailwind's scale for consistency
- CSS variables enable runtime theme switching without JavaScript

---

## Phase 2: Base Component Extraction (Medium Priority)

### Task 2.1: Create SocialLink Component

**File**: [`src/components/common/SocialLink.astro`](../src/components/common/SocialLink.astro)

**Objective**: Extract social media link pattern into a reusable component with multiple visual variants.

**Current Usage**:
- Footer: Lines 202-229 (social links with hover effects)
- Navigation (mobile): Lines 172-193 (social placeholders in mobile menu)

**Design Specification**:

```astro
---
/**
 * SocialLink Component
 * 
 * Reusable social media link with icon, hover effects, and accessibility features.
 * Supports multiple visual variants for different contexts (default, compact, footer).
 * 
 * @component
 */
import type { SocialLinkProps } from '@/types/navigation';

interface Props extends SocialLinkProps {}

const {
  platform,
  href,
  variant = 'default',
  size = 'md',
  ariaLabel,
  iconPath,
} = Astro.props;

// Generate aria-label if not provided
const accessibleLabel = ariaLabel || `Volg ons op ${platform}`;
---

<a
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  class:list={['social-link', `social-link--${variant}`, `social-link--${size}`]}
  aria-label={accessibleLabel}
  title={platform}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="social-link__icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d={iconPath}
    />
  </svg>
</a>

<style>
  /* Base Social Link Styles */
  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    background: var(--bg-base);
    color: var(--text-secondary);
    border: 1px solid var(--border-secondary);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-sm);
    text-decoration: none;
  }

  .social-link:hover {
    background: var(--color-secondary);
    border-color: var(--color-secondary);
    color: var(--text-inverse);
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg-primary);
  }

  .social-link:active {
    transform: translateY(-1px);
  }

  .social-link:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }

  /* Size Variants */
  .social-link--sm {
    width: 2rem;
    height: 2rem;
  }

  .social-link--sm .social-link__icon {
    width: 1rem;
    height: 1rem;
  }

  .social-link--md {
    width: 2.75rem;
    height: 2.75rem;
  }

  .social-link--md .social-link__icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .social-link--lg {
    width: 3.5rem;
    height: 3.5rem;
  }

  .social-link--lg .social-link__icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  /* Style Variants */
  
  /* Compact variant: Minimal padding, smaller, for tight spaces */
  .social-link--compact {
    border-radius: 50%;
    padding: 0.5rem;
  }

  .social-link--compact:hover {
    transform: scale(1.1);
  }

  /* Footer variant: Matches existing Footer styling */
  .social-link--footer {
    /* Inherits base styles - no additional overrides needed */
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .social-link {
      transition: none !important;
    }

    .social-link:hover,
    .social-link--compact:hover {
      transform: none !important;
    }
  }
</style>
```

**Usage Example**:

```astro
---
import { SOCIAL_LINKS } from '@/constants/site';
import SocialLink from '@/components/common/SocialLink.astro';
---

<!-- Footer usage -->
<div class="flex gap-3 mb-6">
  {SOCIAL_LINKS.map((social) => (
    <SocialLink
      platform={social.platform}
      href={social.href}
      ariaLabel={social.ariaLabel}
      iconPath={social.iconPath}
      variant="footer"
      size="md"
    />
  ))}
</div>

<!-- Mobile nav usage (compact) -->
<div class="flex gap-4">
  {SOCIAL_LINKS.map((social) => (
    <SocialLink
      platform={social.platform}
      href={social.href}
      ariaLabel={social.ariaLabel}
      iconPath={social.iconPath}
      variant="compact"
      size="sm"
    />
  ))}
</div>
```

**Benefits**:
- **DRY**: Eliminates 60+ lines of duplicated social link markup/styles
- **Consistency**: Ensures uniform behavior across Footer and Navigation
- **Flexibility**: Variant system adapts to different contexts
- **Type Safety**: TypeScript props ensure correct usage
- **Accessibility**: Built-in ARIA labels and keyboard navigation

---

### Task 2.2: Create NewsletterForm Component

**File**: [`src/components/common/NewsletterForm.astro`](../src/components/common/NewsletterForm.astro)

**Objective**: Extract newsletter subscription form into a standalone component with proper state management, validation, and user feedback.

**Current Usage**:
- Footer: Lines 233-268 (inline form with placeholder submission)

**Design Specification**:

```astro
---
/**
 * NewsletterForm Component
 * 
 * Newsletter subscription form with validation, loading states, and user feedback.
 * Uses Alpine.js for client-side state management.
 * 
 * @component
 */

interface Props {
  /** Custom placeholder text (optional) */
  placeholder?: string;
  /** Additional CSS classes */
  class?: string;
}

const {
  placeholder = 'Uw email',
  class: className = '',
} = Astro.props;
---

<div
  class:list={['newsletter-form', className]}
  x-data="{
    email: '',
    loading: false,
    success: false,
    error: null,
    async submitNewsletter() {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email || !emailRegex.test(this.email)) {
        this.error = 'Voer een geldig e-mailadres in';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        // TODO: Replace with actual API endpoint
        // await fetch('/api/newsletter', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: this.email }),
        // });

        // Temporary success simulation
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.success = true;
        this.email = '';
        
        // Reset success message after 5 seconds
        setTimeout(() => { this.success = false; }, 5000);
      } catch (err) {
        this.error = 'Er is iets misgegaan. Probeer het later opnieuw.';
      } finally {
        this.loading = false;
      }
    }
  }"
>
  <!-- Newsletter Box -->
  <div class="newsletter-box">
    <p class="newsletter-label">
      Ontvang updates over Aaltjesdagen
    </p>

    <!-- Form -->
    <form
      class="newsletter-form__form"
      @submit.prevent="submitNewsletter()"
      x-show="!success"
    >
      <input
        type="email"
        x-model="email"
        :placeholder="placeholder"
        class="newsletter-input"
        aria-label="Email voor nieuwsbrief"
        required
        :disabled="loading"
      />
      <button
        type="submit"
        class="newsletter-button"
        aria-label="Aanmelden voor nieuwsbrief"
        :disabled="loading"
      >
        <!-- Loading Spinner -->
        <svg
          x-show="loading"
          class="newsletter-spinner"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <!-- Arrow Icon (default state) -->
        <svg
          x-show="!loading"
          xmlns="http://www.w3.org/2000/svg"
          class="newsletter-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          ></path>
        </svg>
      </button>
    </form>

    <!-- Success Message -->
    <div
      x-show="success"
      x-transition
      class="newsletter-success"
      role="status"
      aria-live="polite"
    >
      <svg class="newsletter-success__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Bedankt voor het aanmelden!</span>
    </div>

    <!-- Error Message -->
    <p
      x-show="error"
      x-text="error"
      class="newsletter-error"
      role="alert"
      aria-live="assertive"
    ></p>
  </div>
</div>

<style>
  /* Newsletter Container */
  .newsletter-form {
    width: 100%;
  }

  /* Newsletter Box */
  .newsletter-box {
    padding: 1rem;
    background: var(--bg-base);
    border-radius: 1rem;
    border: 1px solid var(--border-secondary);
  }

  /* Label */
  .newsletter-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  /* Form Layout */
  .newsletter-form__form {
    display: flex;
    gap: 0.5rem;
  }

  /* Input */
  .newsletter-input {
    flex: 1;
    padding: 0.625rem 0.875rem;
    border-radius: 0.5rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border-primary);
    color: var(--text-primary);
    font-size: 0.875rem;
    transition: all var(--transition-base);
  }

  .newsletter-input::placeholder {
    color: var(--text-tertiary);
  }

  .newsletter-input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--shadow-color-focus);
  }

  .newsletter-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Button */
  .newsletter-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem;
    border-radius: 0.5rem;
    background: linear-gradient(
      135deg,
      var(--color-accent),
      var(--color-accent-dark)
    );
    color: var(--text-inverse);
    border: none;
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md-primary);
  }

  .newsletter-button:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg-primary);
  }

  .newsletter-button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .newsletter-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .newsletter-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Icons */
  .newsletter-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .newsletter-spinner {
    width: 1.25rem;
    height: 1.25rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Success Message */
  .newsletter-success {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: color-mix(in srgb, var(--color-success), transparent 90%);
    border: 1px solid var(--color-success);
    border-radius: 0.5rem;
    color: var(--color-success);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .newsletter-success__icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  /* Error Message */
  .newsletter-error {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: color-mix(in srgb, var(--color-error), transparent 90%);
    border: 1px solid var(--color-error);
    border-radius: 0.5rem;
    color: var(--color-error);
    font-size: 0.875rem;
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .newsletter-input,
    .newsletter-button {
      transition: none !important;
    }

    .newsletter-button:hover {
      transform: none !important;
    }

    .newsletter-spinner {
      animation: none !important;
    }
  }
</style>
```

**Usage Example**:

```astro
---
import NewsletterForm from '@/components/common/NewsletterForm.astro';
---

<!-- Footer usage -->
<div>
  <h3>Volg Ons</h3>
  <NewsletterForm />
</div>

<!-- Custom placeholder -->
<NewsletterForm placeholder="Enter your email" />
```

**Benefits**:
- **Complete Feature**: Includes validation, loading, success, and error states
- **User Feedback**: Visual indicators for all interaction states
- **Accessibility**: ARIA live regions for screen reader announcements
- **Maintainability**: Centralized newsletter logic, easy to connect to real API
- **DRY**: Eliminates 35+ lines of form markup from Footer

---

### Task 2.3: Create Link Component

**File**: [`src/components/ui/Link.astro`](../src/components/ui/Link.astro)

**Objective**: Create a unified link component with variants for navigation, footer, inline, and button styles to eliminate hover state duplication.

**Current Duplication**:
- Footer: `.footer-link` styles (lines 309-325)
- Navigation: `.nav-link` styles (lines 204-247)
- Active state detection logic duplicated across components

**Design Specification**:

```astro
---
/**
 * Link Component
 * 
 * Unified link component with multiple visual variants and automatic active state detection.
 * Supports navigation links, footer links, inline content links, and button-style links.
 * 
 * @component
 */
import type { LinkProps } from '@/types/navigation';

interface Props extends LinkProps {
  /** Link content (passed via slot) */
}

const {
  href,
  variant = 'nav',
  active: activeProp,
  external = false,
  class: className = '',
  ariaLabel,
} = Astro.props;

// Determine active state based on current URL
const currentPath = Astro.url.pathname;
const isActive = activeProp !== undefined
  ? activeProp
  : currentPath === href || (href !== '/' && currentPath.startsWith(href));

// External link attributes
const externalAttrs = external
  ? { target: '_blank', rel: 'noopener noreferrer' }
  : {};
---

<a
  href={href}
  class:list={[
    'link',
    `link--${variant}`,
    { 'link--active': isActive },
    className,
  ]}
  aria-current={isActive ? 'page' : undefined}
  aria-label={ariaLabel}
  {...externalAttrs}
>
  <slot />
  
  {variant === 'nav' && (
    <span class="link__underline" aria-hidden="true" />
  )}
</a>

<style>
  /* === BASE LINK STYLES === */
  .link {
    text-decoration: none;
    transition: all var(--transition-base);
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .link:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
    border-radius: 4px;
  }

  /* === NAV VARIANT === */
  /* Used in main navigation (desktop header) */
  .link--nav {
    color: var(--text-secondary);
    padding: 0.5rem 0;
    flex-direction: column;
    font-size: 0.875rem;
    font-weight: 500;
    position: relative;
  }

  .link--nav:hover {
    color: var(--color-secondary);
  }

  .link--nav.link--active {
    color: var(--color-primary);
    font-weight: 600;
  }

  /* Nav Underline Indicator */
  .link__underline {
    display: block;
    height: 2px;
    width: 0;
    background: var(--color-secondary);
    transition: width var(--transition-base);
    border-radius: 1px;
  }

  .link--nav:hover .link__underline {
    width: 100%;
  }

  .link--nav.link--active .link__underline {
    width: 100%;
    background: var(--color-primary);
  }

  /* === FOOTER VARIANT === */
  /* Used in footer navigation */
  .link--footer {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .link--footer:hover {
    color: var(--color-primary);
    transform: translateX(2px);
  }

  .link--footer.link--active {
    color: var(--color-primary);
    font-weight: 500;
  }

  /* === INLINE VARIANT === */
  /* Used within prose/content blocks */
  .link--inline {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
  }

  .link--inline:hover {
    color: var(--color-primary-dark);
    text-decoration-thickness: 2px;
  }

  /* === BUTTON VARIANT === */
  /* Link styled as a button (for CTAs) */
  .link--button {
    padding: 0.625rem 1.5rem;
    border-radius: 0.5rem;
    background: var(--color-primary);
    color: var(--text-inverse);
    font-weight: 600;
    font-size: 0.875rem;
    box-shadow: var(--shadow-md);
  }

  .link--button:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .link--button:active {
    transform: translateY(0);
  }

  /* === REDUCED MOTION === */
  @media (prefers-reduced-motion: reduce) {
    .link,
    .link__underline {
      transition: none !important;
    }

    .link:hover {
      transform: none !important;
    }
  }
</style>
```

**Usage Examples**:

```astro
---
import Link from '@/components/ui/Link.astro';
import { NAVIGATION_ITEMS } from '@/constants/site';
---

<!-- Navigation usage -->
<nav>
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href} variant="nav">
      {item.name}
    </Link>
  ))}
</nav>

<!-- Footer usage -->
<nav>
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href} variant="footer">
      {item.name}
    </Link>
  ))}
</nav>

<!-- Inline content link -->
<p>
  Read our <Link href="/privacy" variant="inline">privacy policy</Link>.
</p>

<!-- Button-style CTA -->
<Link href="/contact" variant="button">
  Contact Us
</Link>
```

**Benefits**:
- **DRY**: Eliminates 80+ lines of duplicated link styles across components
- **Consistency**: Ensures uniform link behavior throughout the app
- **Active State Logic**: Centralized, automatic active detection
- **Flexibility**: Single component covers all link use cases
- **Type Safety**: TypeScript props prevent incorrect usage

---

## Phase 3: Component Refactoring (High Priority)

### Task 3.1: Refactor Footer.astro

**File**: [`src/components/layout/Footer.astro`](../src/components/layout/Footer.astro)

**Objective**: Apply design system principles by importing constants, using extracted components, and replacing hardcoded tokens.

**Refactoring Changes**:

**1. Import Statements** (replace lines 14-40):

```astro
---
/**
 * Footer Component - Aaltjesdagen
 * ... (keep existing JSDoc)
 */
import { SITE, NAVIGATION_ITEMS, SOCIAL_LINKS, LEGAL_LINKS, DEVELOPER } from '@/constants/site';
import SocialLink from '@/components/common/SocialLink.astro';
import NewsletterForm from '@/components/common/NewsletterForm.astro';
import Link from '@/components/ui/Link.astro';

const currentYear = new Date().getFullYear();
---
```

**2. Update Logo & Description Section** (lines 65-77):

```astro
<!-- Kolom 1: Logo + Beschrijving -->
<div class="lg:col-span-1">
  <img
    src="/assets/logo.png"
    alt={`${SITE.name} Logo`}
    width="150"
    height="50"
    class="h-10 w-auto mb-6 brightness-0 dark:invert transition-all duration-300 opacity-90"
  />
  <p class="text-sm leading-relaxed text-[var(--text-secondary)]">
    {SITE.description}
  </p>
</div>
```

**3. Update Navigation Links** (lines 79-106):

```astro
<!-- Kolom 2: Snelle Links -->
<div>
  <h3 class="text-[var(--text-primary)] font-bold text-lg mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-secondary rounded-full" aria-hidden="true"></span>
    Snelle Links
  </h3>
  <nav class="footer-nav" aria-label="Footer navigation">
    <ul class="space-y-3">
      {NAVIGATION_ITEMS.map((item) => (
        <li>
          <Link href={item.href} variant="footer">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</div>
```

**4. Update Contact Section** (lines 109-188):

```astro
<!-- Kolom 3: Contact Info -->
<div>
  <h3 class="text-[var(--text-primary)] font-bold text-lg mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-accent rounded-full" aria-hidden="true"></span>
    Contact
  </h3>
  <div class="space-y-4 text-sm text-[var(--text-secondary)]">
    <!-- Email -->
    <div class="flex items-start gap-3">
      <svg class="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <a href={`mailto:${SITE.email}`} class="footer-link">
        {SITE.email}
      </a>
    </div>

    <!-- Telefoon -->
    <div class="flex items-start gap-3">
      <svg class="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
      </svg>
      <span>{SITE.phone}</span>
    </div>

    <!-- Locatie -->
    <div class="flex items-start gap-3">
      <svg class="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
      <address class="not-italic">
        {SITE.location.city}<br />
        {SITE.location.region}, {SITE.location.country}
      </address>
    </div>
  </div>
</div>
```

**5. Update Social Media & Newsletter Section** (lines 190-270):

```astro
<!-- Kolom 4: Social Media + Newsletter -->
<div>
  <h3 class="text-[var(--text-primary)] font-bold text-lg mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary rounded-full" aria-hidden="true"></span>
    Volg Ons
  </h3>

  <!-- Social Media Links -->
  <div class="flex gap-3 mb-6">
    {SOCIAL_LINKS.map((social) => (
      <SocialLink
        platform={social.platform}
        href={social.href}
        ariaLabel={social.ariaLabel}
        iconPath={social.iconPath}
        variant="footer"
        size="md"
      />
    ))}
  </div>

  <!-- Newsletter Signup -->
  <NewsletterForm />
</div>
```

**6. Update Legal Links** (lines 274-290):

```astro
<!-- Legal Links -->
<nav class="flex flex-wrap justify-center gap-6 mb-4" aria-label="Legal navigation">
  {LEGAL_LINKS.map((link) => (
    <a
      href={link.href}
      class="text-xs text-[var(--text-tertiary)] hover:text-primary transition-colors"
    >
      {link.name}
    </a>
  ))}
</nav>
```

**7. Update Developer Attribution** (lines 293-301):

```astro
<!-- Copyright -->
<div class="text-center text-xs text-[var(--text-tertiary)]">
  <p>&copy; {currentYear} {SITE.name}. Alle rechten voorbehouden.</p>
  <p class="mt-2 text-[var(--text-tertiary)] text-[10px] uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity duration-300">
    {DEVELOPER.label} <span class="font-bold text-[var(--text-secondary)]">{DEVELOPER.name}</span>
  </p>
</div>
```

**8. Update Styles Section** (lines 307-436):

```css
<style>
  /* Footer Links */
  .footer-link {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-base);
    display: inline-block;
  }

  .footer-link:hover {
    color: var(--color-primary);
    transform: translateX(2px);
  }

  .footer-link:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* NOTE: Social link styles moved to SocialLink.astro component */
  /* NOTE: Newsletter styles moved to NewsletterForm.astro component */

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .footer-link {
      transition: none !important;
    }

    .footer-link:hover {
      transform: none !important;
    }
  }
</style>
```

**Line Reduction**:
- Before: 436 lines
- After: ~280 lines
- **Reduction: ~156 lines (36% smaller)**

**Changes Summary**:
- ✅ Imports constants from [`site.ts`](../src/constants/site.ts)
- ✅ Replaces hardcoded data with imported constants
- ✅ Uses [`SocialLink`](../src/components/common/SocialLink.astro) component
- ✅ Uses [`NewsletterForm`](../src/components/common/NewsletterForm.astro) component
- ✅ Uses [`Link`](../src/components/ui/Link.astro) component for footer links
- ✅ Removes ~130 lines of social link and newsletter styling (now in components)
- ✅ All hardcoded strings replaced with dynamic constants

---

### Task 3.2: Refactor Navigation.astro

**File**: [`src/components/layout/Navigation.astro`](../src/components/layout/Navigation.astro)

**Objective**: Import constants, use Link component, replace hardcoded z-index values, and fix Alpine.js transition durations.

**Refactoring Changes**:

**1. Import Statements** (replace lines 12-23):

```astro
---
/**
 * Navigation Component - Aaltjesdagen
 * ... (keep existing JSDoc)
 */
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/constants/site';
import ThemeToggle from '@/components/ui/ThemeToggle.astro';
import Link from '@/components/ui/Link.astro';
import SocialLink from '@/components/common/SocialLink.astro';
---
```

**2. Update Desktop Navigation** (lines 29-63):

```astro
<!-- Desktop Navigation (hidden op mobile) -->
<nav
  class="hidden md:flex flex-wrap items-center gap-6"
  aria-label="Main navigation"
>
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href} variant="nav">
      {item.name}
    </Link>
  ))}
  <ThemeToggle />
</nav>
```

**3. Update Mobile Menu Toggle Button** (replace z-index on line 79):

```astro
<!-- Menu Toggle Button -->
<button
  @click="mobileMenuOpen = !mobileMenuOpen"
  x-effect="mobileMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''"
  type="button"
  class="relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300"
  :class="mobileMenuOpen ? 'fixed top-6 right-6 bg-transparent' : 'bg-elevated border border-primary/10 shadow-sm'"
  style="z-index: var(--z-nav-mobile-toggle);"
  aria-label="Toggle menu"
>
  <!-- Keep existing hamburger icon markup -->
</button>
```

**4. Update Mobile Drawer Container** (replace z-index on line 101):

```astro
<!-- Drawer & Backdrop -->
<template x-teleport="body">
  <div
    class="fixed inset-0"
    style="z-index: var(--z-nav-mobile-backdrop);"
    x-show="mobileMenuOpen"
    role="dialog"
    aria-modal="true"
  >
    <!-- Keep existing backdrop and drawer markup -->
```

**5. Update Mobile Navigation Links** (lines 141-165):

```astro
<nav class="flex flex-col gap-6" aria-label="Mobile navigation">
  {NAVIGATION_ITEMS.map((item, index) => (
    <Link
      href={item.href}
      variant="nav"
      class="text-2xl font-bold tracking-tight transition-all duration-300 flex items-center gap-4 group"
    >
      <span class="text-xs font-bold text-secondary/60 group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-opacity translate-y-1">
        0{index + 1}
      </span>
      {item.name}
    </Link>
  ))}
</nav>
```

**6. Update Social Links in Mobile Menu** (lines 168-195):

```astro
<!-- Footer Info in Menu -->
<div class="mt-auto pt-8 border-t border-[var(--border-secondary)]">
  <div class="flex flex-col gap-4 text-[var(--text-tertiary)]">
    <p class="text-sm font-medium">Volg ons</p>
    <div class="flex gap-4">
      {SOCIAL_LINKS.map((social) => (
        <SocialLink
          platform={social.platform}
          href={social.href}
          ariaLabel={social.ariaLabel}
          iconPath={social.iconPath}
          variant="compact"
          size="sm"
        />
      ))}
    </div>
  </div>
</div>
```

**7. Update Styles Section** (lines 202-269):

```css
<style>
  /* NOTE: Nav link styles moved to Link.astro component */
  /* Keep only utility classes needed */

  /* Utility */
  .bg-elevated {
    background-color: var(--bg-elevated);
  }
  .bg-text-primary {
    background-color: var(--text-primary);
  }

  /* Alpine.js cloak */
  [x-cloak] {
    display: none !important;
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    /* Motion styles handled in Link component */
  }
</style>
```

**Note on Alpine.js Transitions**:

Alpine.js transition classes like `x-transition:enter="transition ease-out duration-300"` cannot directly use CSS variables. However, since we're using Tailwind's duration classes (`duration-200`, `duration-300`), these should be **extended in [`tailwind.config.cjs`](../tailwind.config.cjs)** to reference our CSS tokens:

```javascript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        '200': 'var(--duration-200)',
        '300': 'var(--duration-300)',
        '500': 'var(--duration-500)',
      },
    },
  },
};
```

This ensures Tailwind's `duration-300` classes use our design system tokens.

**Line Reduction**:
- Before: 269 lines
- After: ~150 lines
- **Reduction: ~119 lines (44% smaller)**

**Changes Summary**:
- ✅ Imports constants from [`site.ts`](../src/constants/site.ts)
- ✅ Replaces hardcoded navigation items with imported constants
- ✅ Uses [`Link`](../src/components/ui/Link.astro) component for all links
- ✅ Uses [`SocialLink`](../src/components/common/SocialLink.astro) for mobile menu social icons
- ✅ Replaces hardcoded z-index with CSS variable tokens
- ✅ Removes ~60 lines of nav link styling (now in Link component)
- ✅ Removes duplicate active state logic (handled by Link component)

---

## Phase 4: Documentation (Medium Priority)

### Task 4.1: Create Layout Components README

**File**: [`src/components/layout/README.md`](../src/components/layout/README.md)

**Objective**: Provide comprehensive documentation for the layout component system.

**Content Specification**:

```markdown
# Layout Components

Layout components provide the structural foundation for the Aaltjesdagen website. These components form the persistent UI elements present across all pages.

## Table of Contents

- [Components](#components)
  - [Navigation](#navigation)
  - [Footer](#footer)
  - [BackToTop](#backtotop)
- [Architecture](#architecture)
  - [Data Flow](#data-flow)
  - [Component Dependencies](#component-dependencies)
- [Usage](#usage)
- [Customization](#customization)

---

## Components

### Navigation

**File**: [`Navigation.astro`](./Navigation.astro)

Global site navigation with responsive desktop and mobile views. Features Alpine.js-powered mobile drawer with smooth transitions.

**Features**:
- Responsive horizontal navigation (desktop)
- Slide-in mobile drawer with backdrop overlay
- Automatic active page detection
- Keyboard navigation support (Escape to close)
- Theme toggle integration
- Social media links in mobile menu

**Props**: None (uses imported constants)

**Data Source**: [`NAVIGATION_ITEMS`](../../constants/site.ts)

**Usage**:
```astro
---
import Navigation from '@/components/layout/Navigation.astro';
---

<header>
  <Navigation />
</header>
```

**Behavior**:
- Active state automatically detected based on `Astro.url.pathname`
- Mobile menu locks body scroll when open
- Z-index managed via design system tokens

---

### Footer

**File**: [`Footer.astro`](./Footer.astro)

Professional 4-column footer with site information, navigation, contact details, and newsletter subscription.

**Features**:
- Responsive grid layout (1 → 4 columns)
- Logo + site description
- Quick links navigation
- Contact information with icons
- Social media links
- Newsletter subscription form
- Legal links (Privacy, Cookies, Terms)
- Developer attribution

**Props**: None (uses imported constants)

**Data Sources**:
- [`SITE`](../../constants/site.ts) - Site metadata
- [`NAVIGATION_ITEMS`](../../constants/site.ts) - Quick links
- [`SOCIAL_LINKS`](../../constants/site.ts) - Social platforms
- [`LEGAL_LINKS`](../../constants/site.ts) - Legal pages

**Usage**:
```astro
---
import Footer from '@/components/layout/Footer.astro';
---

<Footer />
```

**Components Used**:
- [`SocialLink`](../common/SocialLink.astro)
- [`NewsletterForm`](../common/NewsletterForm.astro)
- [`Link`](../ui/Link.astro)

---

### BackToTop

**File**: [`BackToTop.astro`](./BackToTop.astro)

Floating "back to top" button that appears when scrolling down the page.

**Features**:
- Smooth scroll to top
- Appears after scrolling threshold
- Fixed positioning with high z-index
- Accessible with keyboard navigation

**Props**: None

**Usage**:
```astro
---
import BackToTop from '@/components/layout/BackToTop.astro';
---

<BackToTop />
```

---

## Architecture

### Data Flow

```
┌─────────────────────────────────────┐
│       constants/site.ts             │
│  (Single Source of Truth)           │
│                                     │
│  • SITE                             │
│  • NAVIGATION_ITEMS                 │
│  • SOCIAL_LINKS                     │
│  • LEGAL_LINKS                      │
│  • DEVELOPER                        │
└─────────────┬───────────────────────┘
              │
              │ import
              ↓
┌─────────────────────────────────────┐
│   Layout Components                 │
│   • Navigation.astro                │
│   • Footer.astro                    │
└─────────────┬───────────────────────┘
              │
              │ use
              ↓
┌─────────────────────────────────────┐
│   Reusable Components               │
│   • Link.astro                      │
│   • SocialLink.astro                │
│   • NewsletterForm.astro            │
└─────────────────────────────────────┘
```

### Component Dependencies

**Navigation.astro** depends on:
- [`Link.astro`](../ui/Link.astro) - Navigation links
- [`SocialLink.astro`](../common/SocialLink.astro) - Mobile menu social icons
- [`ThemeToggle.astro`](../ui/ThemeToggle.astro) - Dark mode toggle
- [`NAVIGATION_ITEMS`](../../constants/site.ts) - Nav data
- [`SOCIAL_LINKS`](../../constants/site.ts) - Social data

**Footer.astro** depends on:
- [`Link.astro`](../ui/Link.astro) - Footer links
- [`SocialLink.astro`](../common/SocialLink.astro) - Social icons
- [`NewsletterForm.astro`](../common/NewsletterForm.astro) - Newsletter subscription
- [`SITE`, `NAVIGATION_ITEMS`, `SOCIAL_LINKS`, `LEGAL_LINKS`, `DEVELOPER`](../../constants/site.ts) - All footer data

---

## Usage

### Adding to Base Layout

```astro
---
// src/layouts/BaseLayout.astro
import Navigation from '@/components/layout/Navigation.astro';
import Footer from '@/components/layout/Footer.astro';
import BackToTop from '@/components/layout/BackToTop.astro';
---

<!DOCTYPE html>
<html lang="nl">
<head>
  <!-- head content -->
</head>
<body>
  <Navigation />
  
  <main>
    <slot />
  </main>
  
  <Footer />
  <BackToTop />
</body>
</html>
```

### Updating Navigation Items

To add, remove, or modify navigation items:

1. Edit [`src/constants/site.ts`](../../constants/site.ts)
2. Update the `NAVIGATION_ITEMS` array
3. Changes automatically reflect in both Navigation and Footer

```typescript
// src/constants/site.ts
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },  // Add new item
  // ...
] as const;
```

### Adding Social Platforms

1. Edit [`src/constants/site.ts`](../../constants/site.ts)
2. Add to `SOCIAL_LINKS` array with platform, href, ariaLabel, and iconPath
3. Changes automatically reflect in Footer and mobile Navigation

```typescript
// src/constants/site.ts
export const SOCIAL_LINKS = [
  // ... existing links
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/aaltjesdagen',
    ariaLabel: 'Volg ons op LinkedIn',
    iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
] as const;
```

---

## Customization

### Changing Nav Styles

Edit [`src/components/ui/Link.astro`](../ui/Link.astro) to modify link styles globally.

### Changing Mobile Menu Behavior

Edit [`src/components/layout/Navigation.astro`](./Navigation.astro):
- Transition durations: Lines using `duration-300`, `duration-200`
- Drawer position: Change `right-0` to `left-0` for left-side drawer
- Backdrop blur: Adjust `backdrop-blur-sm` class

### Changing Footer Layout

Edit [`src/components/layout/Footer.astro`](./Footer.astro):
- Grid columns: Modify `grid-cols-*` classes (line 63)
- Column order: Rearrange `<div>` blocks
- Section visibility: Comment out entire column blocks

---

## Best Practices

1. **Never hardcode navigation data** - Always use [`constants/site.ts`](../../constants/site.ts)
2. **Maintain z-index hierarchy** - Use design system tokens from [`global.css`](../../styles/global.css)
3. **Test mobile navigation** - Verify smooth transitions and scroll locking
4. **Preserve accessibility** - Keep ARIA labels and semantic HTML
5. **Use Link component** - Don't create raw `<a>` tags for internal links

---

## Related Documentation

- [Link Component](../ui/Link.astro) - Unified link component
- [SocialLink Component](../common/SocialLink.astro) - Social media links
- [NewsletterForm Component](../common/NewsletterForm.astro) - Newsletter subscription
- [Site Constants](../../constants/site.ts) - Configuration data
- [Navigation Types](../../types/navigation.ts) - TypeScript interfaces
```

---

### Task 4.2: Individual Component Documentation

**Files**: Create markdown files for each new component.

**4.2.1: SocialLink Documentation**

**File**: [`src/components/common/SocialLink.md`](../src/components/common/SocialLink.md)

```markdown
# SocialLink Component

Reusable social media link component with icon, hover effects, and accessibility features.

## Usage

```astro
---
import SocialLink from '@/components/common/SocialLink.astro';
---

<SocialLink
  platform="Facebook"
  href="https://facebook.com/aaltjesdagen"
  ariaLabel="Volg ons op Facebook"
  iconPath="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
  variant="footer"
  size="md"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `platform` | `string` | Required | Platform name (Facebook, Instagram, etc.) |
| `href` | `string` | Required | URL to social media profile |
| `ariaLabel` | `string` | Optional | Accessible label (auto-generated if not provided) |
| `iconPath` | `string` | Required | SVG path data for icon |
| `variant` | `'default' \| 'compact' \| 'footer'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |

## Variants

### Default
Standard social link with rounded square background.

### Compact
Circular button with minimal padding, ideal for tight spaces.

### Footer
Optimized for footer usage (currently same as default).

## Size Guide

- **sm**: 2rem × 2rem (32px)
- **md**: 2.75rem × 2.75rem (44px)
- **lg**: 3.5rem × 3.5rem (56px)

## Examples

### Footer Social Links
```astro
{SOCIAL_LINKS.map((social) => (
  <SocialLink
    {...social}
    variant="footer"
    size="md"
  />
))}
```

### Compact Mobile Menu
```astro
{SOCIAL_LINKS.map((social) => (
  <SocialLink
    {...social}
    variant="compact"
    size="sm"
  />
))}
```

## Accessibility

- Uses `target="_blank"` with `rel="noopener noreferrer"` for security
- Auto-generates `aria-label` if not provided
- SVG icons marked as `aria-hidden="true"`
- Focus-visible outlines for keyboard navigation

## Styling

All styles defined in scoped CSS within the component. Hover effects use design system tokens:
- `--color-secondary` for hover background
- `--shadow-lg-primary` for hover shadow
- `--transition-base` for smooth transitions
```

---

**4.2.2: NewsletterForm Documentation**

**File**: [`src/components/common/NewsletterForm.md`](../src/components/common/NewsletterForm.md)

```markdown
# NewsletterForm Component

Newsletter subscription form with validation, loading states, and user feedback.

## Usage

```astro
---
import NewsletterForm from '@/components/common/NewsletterForm.astro';
---

<NewsletterForm />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Uw email'` | Input placeholder text |
| `class` | `string` | `''` | Additional CSS classes |

## Features

### Client-Side Validation
- Email format validation using regex
- Shows error message for invalid emails
- Prevents submission of empty/invalid inputs

### Loading State
- Displays spinner during submission
- Disables input and button while loading
- Visual feedback for async operation

### Success State
- Shows success message with checkmark icon
- Auto-hides form during success
- Resets to form view after 5 seconds

### Error Handling
- Displays error messages below form
- Styled with error colors from design system
- ARIA live region for screen reader announcements

## State Management

Uses Alpine.js for reactive state:

```javascript
{
  email: '',           // Current input value
  loading: false,      // Submission in progress
  success: false,      // Successful submission
  error: null,         // Error message (if any)
  submitNewsletter()   // Async submission handler
}
```

## API Integration

Currently uses a placeholder implementation. To connect to real API:

1. Uncomment the fetch call in `submitNewsletter()`
2. Replace `/api/newsletter` with your endpoint
3. Handle API response/errors appropriately

```javascript
// In component script
try {
  await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: this.email }),
  });
  
  this.success = true;
  this.email = '';
} catch (err) {
  this.error = 'Er is iets misgegaan.';
}
```

## Examples

### Default Usage
```astro
<NewsletterForm />
```

### Custom Placeholder
```astro
<NewsletterForm placeholder="Enter your email address" />
```

### With Custom Class
```astro
<NewsletterForm class="mt-6" />
```

## Accessibility

- Form uses semantic HTML (`<form>`, `<input>`, `<button>`)
- Input has `aria-label` for screen readers
- Success/error messages use ARIA live regions
- Keyboard accessible (Tab, Enter to submit, Escape handled by parent)
- Focus states clearly visible

## Styling

All styles scoped to component:
- Uses design system color tokens
- Responsive padding and sizing
- Smooth transitions for state changes
- Reduced motion support for accessibility
```

---

**4.2.3: Link Component Documentation**

**File**: [`src/components/ui/Link.md`](../src/components/ui/Link.md)

```markdown
# Link Component

Unified link component with multiple visual variants and automatic active state detection.

## Usage

```astro
---
import Link from '@/components/ui/Link.astro';
---

<Link href="/about" variant="nav">
  About Us
</Link>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | Required | URL path (relative or absolute) |
| `variant` | `'nav' \| 'footer' \| 'inline' \| 'button'` | `'nav'` | Visual style variant |
| `active` | `boolean` | Auto-detected | Whether link is currently active |
| `external` | `boolean` | `false` | Opens in new tab if true |
| `class` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | Optional | Accessible label override |

## Variants

### Nav
Used in main navigation header. Features:
- Animated underline on hover
- Bold font weight when active
- Secondary color hover state

### Footer
Used in footer navigation. Features:
- Subtle translateX on hover
- Primary color hover state
- Slightly bolder when active

### Inline
Used within prose/content blocks. Features:
- Underlined text
- Primary color with darker hover
- Increased underline thickness on hover

### Button
Link styled as a button (CTA). Features:
- Filled background with padding
- Shadow effects
- Transform on hover

## Active State Detection

The component automatically detects active state based on current URL:

```typescript
const currentPath = Astro.url.pathname;
const isActive =
  currentPath === href ||
  (href !== '/' && currentPath.startsWith(href));
```

Override auto-detection by providing `active` prop:

```astro
<Link href="/about" active={false}>
  About (not active)
</Link>
```

## Examples

### Navigation Links
```astro
{NAVIGATION_ITEMS.map((item) => (
  <Link href={item.href} variant="nav">
    {item.name}
  </Link>
))}
```

### Footer Links
```astro
<Link href="/privacy" variant="footer">
  Privacy Policy
</Link>
```

### Inline Content Link
```astro
<p>
  Read our <Link href="/terms" variant="inline">terms and conditions</Link>.
</p>
```

### Button CTA
```astro
<Link href="/contact" variant="button">
  Get in Touch
</Link>
```

### External Link
```astro
<Link href="https://example.com" external variant="inline">
  External Site
</Link>
```

## Accessibility

- Uses semantic `<a>` element
- `aria-current="page"` when active
- Focus-visible outline for keyboard navigation
- External links get `target="_blank"` and `rel="noopener noreferrer"`
- Optional `ariaLabel` for context-specific labeling

## Styling

All variants use design system tokens:
- Colors: `--text-secondary`, `--color-primary`, `--color-primary-dark`
- Transitions: `--transition-base`
- Shadows: `--shadow-md`, `--shadow-lg`
- Reduced motion support built-in
```

---

### Task 4.3: Usage Examples & Best Practices

**File**: [`src/components/layout/EXAMPLES.md`](../src/components/layout/EXAMPLES.md)

**Objective**: Provide practical examples and best practices for common use cases.

```markdown
# Layout Components - Usage Examples & Best Practices

Practical examples demonstrating common patterns and best practices for working with layout components.

## Table of Contents

- [Common Patterns](#common-patterns)
- [Data Management](#data-management)
- [Styling Customization](#styling-customization)
- [Testing](#testing)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)

---

## Common Patterns

### Pattern 1: Adding a New Navigation Item

**Scenario**: Add a "Blog" page to navigation.

**Steps**:

1. Create the page route:
```astro
// src/pages/blog.astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="Blog">
  <!-- Blog content -->
</BaseLayout>
```

2. Add to constants:
```typescript
// src/constants/site.ts
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },  // Add here
  { name: 'Bereikbaarheid', href: '/bereikbaarheid' },
  // ...
] as const;
```

3. That's it! Link appears in:
   - Desktop navigation
   - Mobile navigation
   - Footer quick links
   - Active state automatically detected on `/blog` page

---

### Pattern 2: Changing Social Media Platform

**Scenario**: Replace Twitter with LinkedIn.

**Steps**:

1. Find LinkedIn icon SVG path (from [Heroicons](https://heroicons.com) or similar)

2. Update constants:
```typescript
// src/constants/site.ts
export const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    href: 'https://facebook.com/aaltjesdagen',
    ariaLabel: 'Volg ons op Facebook',
    iconPath: '...',
  },
  {
    platform: 'LinkedIn',  // Replace Twitter
    href: 'https://linkedin.com/company/aaltjesdagen',
    ariaLabel: 'Volg ons op LinkedIn',
    iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037...',
  },
] as const;
```

3. Changes reflect in:
   - Footer social links
   - Mobile navigation footer
   - Future components using `SOCIAL_LINKS`

---

### Pattern 3: Customizing Newsletter Form Behavior

**Scenario**: Connect newsletter form to Mailchimp API.

**Steps**:

1. Create API route (if using Astro API routes):
```typescript
// src/pages/api/newsletter.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  // Mailchimp API integration
  const response = await fetch('https://usX.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${import.meta.env.MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  });

  if (response.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: 'Subscription failed' }), { status: 400 });
  }
};
```

2. Update NewsletterForm component:
```astro
// src/components/common/NewsletterForm.astro
// In Alpine.js data
async submitNewsletter() {
  // ...validation...

  try {
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

---

## Data Management

### Best Practice: Single Source of Truth

**❌ Don't**: Duplicate nav items in components

```astro
<!-- BAD: Hardcoded in component -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
```

**✅ Do**: Import from constants

```astro
<!-- GOOD: Uses constants -->
---
import { NAVIGATION_ITEMS } from '@/constants/site';
import Link from '@/components/ui/Link.astro';
---

<nav>
  {NAVIGATION_ITEMS.map((item) => (
    <Link href={item.href} variant="nav">{item.name}</Link>
  ))}
</nav>
```

### Best Practice: Type Safety

**❌ Don't**: Use untyped objects

```typescript
// BAD: No type checking
const navItems = [
  { name: 'Home', url: '/' },  // Oops, should be 'href'
];
```

**✅ Do**: Use TypeScript interfaces

```typescript
// GOOD: Type-safe
import type { NavItem } from '@/types/navigation';

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },  // ✓ Correctly typed
];
```

---

## Styling Customization

### Customizing Link Hover Colors

Edit Link component directly:

```astro
<!-- src/components/ui/Link.astro -->
<style>
  .link--nav:hover {
    color: var(--color-accent);  /* Change from --color-secondary */
  }
</style>
```

### Customizing Footer Background

Edit Footer component:

```astro
<!-- src/components/layout/Footer.astro -->
<footer
  class="relative text-[var(--text-primary)] py-16 overflow-hidden"
  style="background: linear-gradient(180deg, var(--bg-base), var(--bg-elevated));"
>
  <!-- ... -->
</footer>
```

### Adding Custom Nav Item Icons

1. Add icon field to type:
```typescript
// src/types/navigation.ts
export interface NavItem {
  name: string;
  href: string;
  icon?: string;  // SVG path or icon identifier
}
```

2. Update constants:
```typescript
// src/constants/site.ts
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  // ...
] as const;
```

3. Update Link component to render icon:
```astro
<!-- src/components/ui/Link.astro -->
<a ...>
  {item.icon && (
    <svg>
      <path d={item.icon} />
    </svg>
  )}
  <slot />
</a>
```

---

## Testing

### Manual Testing Checklist

**Navigation**:
- [ ] Desktop nav shows all items
- [ ] Active state highlights current page
- [ ] Hover effects work smoothly
- [ ] Mobile menu opens/closes smoothly
- [ ] Body scroll locks when mobile menu open
- [ ] Escape key closes mobile menu
- [ ] Theme toggle works in nav

**Footer**:
- [ ] All footer sections render
- [ ] Nav links match header nav
- [ ] Social links open in new tabs
- [ ] Newsletter form validation works
- [ ] Newsletter success/error states display
- [ ] Legal links navigate correctly
- [ ] Responsive layout adapts on mobile

### Visual Regression Testing

Use browser screenshots to compare before/after:

```bash
# Using Playwright or similar
npm run test:visual
```

### Accessibility Testing

```bash
# Using axe-core or similar
npm run test:a11y
```

Check for:
- ARIA labels on all interactive elements
- Keyboard navigability
- Focus-visible states
- Screen reader announcements

---

## Performance

### Optimization: Lazy Load Social Icons

For large icon sets, consider lazy loading:

```astro
---
// Dynamically import icons only when needed
const icons = await import('@/assets/icons/social');
---
```

### Optimization: Defer Alpine.js

Ensure Alpine.js loads efficiently:

```html
<!-- In BaseLayout.astro -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Monitoring: Core Web Vitals

Check navigation performance impact:
- **LCP**: Ensure navigation renders quickly
- **CLS**: Prevent layout shift during nav mounting
- **FID**: Monitor mobile menu interaction delay

---

## Troubleshooting

### Issue: Active State Not Detecting

**Problem**: Link not highlighting on correct page.

**Solution**: Check URL matching logic in Link component:

```typescript
// Debug by logging
const currentPath = Astro.url.pathname;
console.log('Current:', currentPath, 'Link:', href);

// Ensure trailing slashes match
const isActive =
  currentPath === href ||
  (href !== '/' && currentPath.startsWith(href));
```

### Issue: Mobile Menu Not Closing

**Problem**: Mobile drawer stays open after navigation.

**Solution**: Add navigation listener to close menu:

```astro
<!-- Navigation.astro -->
<script>
  // Close mobile menu on navigation
  document.addEventListener('astro:after-swap', () => {
    const menuButton = document.querySelector('[aria-label="Toggle menu"]');
    if (menuButton) {
      Alpine.evaluate(menuButton, 'mobileMenuOpen = false');
    }
  });
</script>
```

### Issue: Z-Index Conflicts

**Problem**: Modal appears behind navigation.

**Solution**: Verify z-index hierarchy in global.css:

```css
/* Ensure proper layering */
--z-header: 200;           /* Navigation */
--z-modal-backdrop: 500;   /* Modal backdrop */
--z-modal: 600;            /* Modal content */
```

### Issue: Newsletter Form Not Submitting

**Problem**: Form shows error immediately.

**Solution**: Check API endpoint and CORS:

```typescript
// Verify endpoint is accessible
try {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: this.email }),
  });

  console.log('Response:', response.status);
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Error:', error);
  }
} catch (err) {
  console.error('Fetch failed:', err);
}
```

---

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Alpine.js Documentation](https://alpinejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design System Tokens](../../styles/global.css)
```

---

## Implementation Details

### File Structure

After refactoring, the project structure will be:

```
src/
├── components/
│   ├── common/
│   │   ├── SocialLink.astro          ← NEW
│   │   ├── SocialLink.md             ← NEW
│   │   ├── NewsletterForm.astro      ← NEW
│   │   └── NewsletterForm.md         ← NEW
│   ├── layout/
│   │   ├── BackToTop.astro
│   │   ├── Footer.astro              ← REFACTORED
│   │   ├── Navigation.astro          ← REFACTORED
│   │   ├── README.md                 ← NEW
│   │   └── EXAMPLES.md               ← NEW
│   └── ui/
│       ├── Icon.astro
│       ├── Link.astro                ← NEW
│       ├── Link.md                   ← NEW
│       ├── ProgramModal.astro
│       └── ThemeToggle.astro
├── constants/
│   └── site.ts                       ← NEW
├── types/
│   └── navigation.ts                 ← NEW
└── styles/
    └── global.css                    ← UPDATED (new tokens)
```

### Migration Strategy

**Step 1: Prepare Foundation (Phase 1)**
1. Create [`constants/site.ts`](../src/constants/site.ts) with all data
2. Create [`types/navigation.ts`](../src/types/navigation.ts) with interfaces
3. Update [`global.css`](../src/styles/global.css) with new tokens
4. **Test**: Verify constants can be imported without errors

**Step 2: Build Components (Phase 2)**
1. Create [`SocialLink.astro`](../src/components/common/SocialLink.astro)
2. Create [`NewsletterForm.astro`](../src/components/common/NewsletterForm.astro)
3. Create [`Link.astro`](../src/components/ui/Link.astro)
4. **Test**: Verify each component renders in isolation

**Step 3: Refactor Footer (Phase 3.1)**
1. Create backup: `cp Footer.astro Footer.astro.backup`
2. Apply Footer refactoring changes
3. **Test**: Visual comparison against backup
4. **Test**: All footer links work
5. **Test**: Newsletter form functions
6. **Test**: Social links open correctly

**Step 4: Refactor Navigation (Phase 3.2)**
1. Create backup: `cp Navigation.astro Navigation.astro.backup`
2. Apply Navigation refactoring changes
3. **Test**: Desktop nav renders correctly
4. **Test**: Mobile menu opens/closes
5. **Test**: Active states detect correctly
6. **Test**: Z-index layers work properly

**Step 5: Add Documentation (Phase 4)**
1. Create all README and example files
2. **Test**: Verify markdown renders correctly
3. **Test**: All internal links work

**Step 6: Final Validation**
1. Run full build: `npm run build`
2. Test production preview: `npm run preview`
3. Perform accessibility audit
4. Visual regression testing
5. Performance testing (Lighthouse)

### Testing Approach

**Unit Testing** (Component Level):
- Test each extracted component in isolation
- Verify props are correctly typed and handled
- Test all variant combinations
- Verify accessibility attributes

**Integration Testing** (System Level):
- Test Footer + extracted components together
- Test Navigation + extracted components together
- Verify data flows from constants to components
- Test active state detection logic

**Visual Testing**:
- Screenshot comparison before/after refactor
- Test responsive breakpoints (mobile, tablet, desktop)
- Test dark mode rendering
- Test hover/focus states

**Accessibility Testing**:
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing
- ARIA attribute validation
- Color contrast checking

**Performance Testing**:
- Lighthouse audit before/after
- Bundle size comparison
- Time to Interactive (TTI) measurement
- First Contentful Paint (FCP) measurement

### Rollback Plan

**Scenario 1: Component Extraction Issues**

If extracted components have bugs:

1. Revert specific component file
2. Restore inline implementation in parent component
3. Keep constants/types for future attempt

**Scenario 2: Footer Refactor Issues**

If Footer breaks after refactoring:

```bash
# Restore backup
cp src/components/layout/Footer.astro.backup src/components/layout/Footer.astro

# Keep new components for future use
# Keep constants/types for future use
```

**Scenario 3: Navigation Refactor Issues**

If Navigation breaks after refactoring:

```bash
# Restore backup
cp src/components/layout/Navigation.astro.backup src/components/layout/Navigation.astro

# Keep new components for future use
# Keep constants/types for future use
```

**Scenario 4: Complete Rollback**

If multiple issues occur:

```bash
# Restore from Git
git checkout HEAD -- src/components/layout/Footer.astro
git checkout HEAD -- src/components/layout/Navigation.astro

# Remove new files
rm src/constants/site.ts
rm src/types/navigation.ts
rm src/components/common/SocialLink.astro
rm src/components/common/NewsletterForm.astro
rm src/components/ui/Link.astro

# Revert global.css changes
git checkout HEAD -- src/styles/global.css
```

**Prevention**:
- Create Git branch before starting: `git checkout -b refactor/layout-components`
- Commit after each phase completion
- Tag stable points: `git tag -a phase-1-complete -m "Foundation complete"`

---

## Expected Outcomes

### Metrics

**Code Reduction**:
- Footer: ~436 lines → ~280 lines (**-156 lines, 36% reduction**)
- Navigation: ~269 lines → ~150 lines (**-119 lines, 44% reduction**)
- **Total Reduction: ~275 lines across layout components**

**New Code Created**:
- SocialLink component: ~150 lines
- NewsletterForm component: ~180 lines
- Link component: ~150 lines
- Constants file: ~80 lines
- Types file: ~120 lines
- **Total New Code: ~680 lines**

**Net Change**: +405 lines, but with significantly improved:
- Maintainability (centralized data)
- Reusability (extracted components)
- Type safety (full TypeScript coverage)
- Documentation (comprehensive guides)

**Type Safety Coverage**:
- Before: 0% (no TypeScript interfaces)
- After: 100% (all data structures typed)

**Documentation Completeness**:
- Before: 0 docs
- After: 6 documentation files (README, 3 component docs, examples, usage guide)

### Qualitative Improvements

**Maintainability**:
- ✅ Single source of truth for all site data
- ✅ Changes to nav items propagate automatically
- ✅ Social links managed in one place
- ✅ No duplicate hover styles across components
- ✅ Consistent active state logic

**Developer Experience**:
- ✅ TypeScript autocomplete for all props
- ✅ Clear component APIs with documentation
- ✅ Easy to understand data flow
- ✅ Consistent patterns across codebase
- ✅ Self-documenting code structure

**Design System Compliance**:
- ✅ Z-index values use design tokens
- ✅ Shadow colors use dynamic CSS variables
- ✅ Animation durations standardized
- ✅ No hardcoded colors or values
- ✅ Theme-aware styling throughout

**Scalability**:
- ✅ Easy to add new navigation items
- ✅ Easy to add new social platforms
- ✅ Components reusable in other contexts
- ✅ Type system prevents errors at compile time
- ✅ Future-proof architecture

**Accessibility**:
- ✅ Consistent ARIA labeling
- ✅ Semantic HTML throughout
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus states clearly visible

---

## Conclusion

This refactoring plan transforms the Footer and Navigation components from functional but hardcoded implementations into a scalable, maintainable, and type-safe system. By following the same design system principles successfully applied in the Bereikbaarheid refactor, we achieve:

1. **Centralized Data Management**: All site configuration in one place
2. **Component Reusability**: SocialLink, NewsletterForm, and Link components usable across the app
3. **Type Safety**: Full TypeScript coverage prevents runtime errors
4. **Design System Compliance**: Uses tokens instead of hardcoded values
5. **Comprehensive Documentation**: Clear guides for current and future developers

The implementation is broken down into clear, sequential phases with testing checkpoints and rollback strategies. Each phase builds upon the previous, allowing for incremental validation and risk mitigation.

**Next Steps**: Handoff to Code mode for implementation following this architectural design.

---

**Document Metadata**:
- Lines: 1,500+
- Sections: 9 major sections
- Code Examples: 30+
- Diagrams: 1 (data flow)
- Implementation Tasks: 11 detailed tasks across 4 phases
