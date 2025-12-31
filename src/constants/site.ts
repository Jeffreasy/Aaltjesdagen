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
