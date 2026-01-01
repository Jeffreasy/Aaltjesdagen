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
