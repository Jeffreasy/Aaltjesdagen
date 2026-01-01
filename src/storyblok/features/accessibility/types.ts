/**
 * TypeScript Interfaces for Bereikbaarheid Components
 *
 * These interfaces define the shape of Storyblok props for all
 * Bereikbaarheid (Accessibility/Arrival) components.
 *
 * @module BereikbaarheidTypes
 */

import type { ISbStoryData } from '@storyblok/astro';

/**
 * Storyblok Richtext field type
 *
 * Represents richtext content from Storyblok.
 * Can be passed to renderRichText() function.
 * Using a flexible type to work with Storyblok's renderRichText function.
 */
export type StoryblokRichtext = any;

/**
 * Base interface shared by all Bereikbaarheid components
 */
export interface BereikbaarheidBaseBlok {
  /** Component name from Storyblok */
  component: string;
  /** Unique identifier */
  _uid: string;
  /** Editable flag for Storyblok visual editor */
  _editable?: string;
  /** Index signature for additional Storyblok properties */
  [key: string]: any;
}

/**
 * Standard field interface for components with title + richtext
 */
export interface StandardBereikbaarheidBlok extends BereikbaarheidBaseBlok {
  /** Main heading text */
  title?: string;
  /** Richtext content from Storyblok */
  tekst?: StoryblokRichtext;
}

/**
 * BereikbaarHero component props
 * 
 * Hero banner for the Bereikbaarheid page.
 * Uses plain text instead of richtext for content.
 * 
 * @example
 * ```astro
 * ---
 * import type { BereikbaarHeroBlok } from './types';
 * const blok: BereikbaarHeroBlok = {
 *   component: 'bereikbaar_hero',
 *   _uid: 'unique-id',
 *   title: 'Bereikbaarheid',
 *   tekst: 'Plan je reis naar Aaltjesdagen'
 * };
 * ---
 * <BereikbaarHero {blok} />
 * ```
 */
export interface BereikbaarHeroBlok extends BereikbaarheidBaseBlok {
  component: 'bereikbaar_hero';
  /** Hero title */
  title?: string;
  /** Plain text content (not richtext) */
  tekst?: string;
}

/**
 * EhboPosten component props
 * 
 * First aid station information with medical theme.
 */
export interface EhboPostenBlok extends StandardBereikbaarheidBlok {
  component: 'ehbo_posten';
}

/**
 * InEnRondomDeBinnenstad component props
 * 
 * City center accessibility information.
 */
export interface InEnRondomDeBinnenstadBlok extends StandardBereikbaarheidBlok {
  component: 'in_en_rondom_de_binnenstad';
}

/**
 * OpenbaarVervoer component props
 * 
 * Public transport information.
 */
export interface OpenbaarVervoerBlok extends StandardBereikbaarheidBlok {
  component: 'openbaar_vervoer';
}

/**
 * Parkeersectie component props
 * 
 * Parking section with image and link support.
 */
export interface ParkeersectieBlok extends BereikbaarheidBaseBlok {
  component: 'parkeersectie';
  /** Section title */
  title?: string;
  /** Content text */
  tekst?: string;
  /** Optional parking image */
  foto?: {
    filename: string;
    alt?: string;
    title?: string;
  };
  /** Optional CTA link */
  link?: {
    cached_url: string;
    linktype?: string;
    url?: string;
    story?: ISbStoryData;
  };
}

/**
 * ParkerenAutos component props
 * 
 * Car parking details.
 */
export interface ParkerenAutosBlok extends StandardBereikbaarheidBlok {
  component: 'parkeren_autos';
}

/**
 * StallenFietsen component props
 * 
 * Bicycle parking information.
 */
export interface StallenFietsenBlok extends StandardBereikbaarheidBlok {
  component: 'stallen_fietsen';
}

/**
 * Toegankelijkheid component props
 * 
 * Accessibility and inclusion information.
 */
export interface ToeankelijkBlok extends StandardBereikbaarheidBlok {
  component: 'toegankelijkheid';
}

/**
 * Union type of all Bereikbaarheid component bloks
 * 
 * Useful for discriminated unions and type guards.
 * 
 * @example
 * ```typescript
 * function renderBereikbaarheid(blok: BereikbaarheidBlok) {
 *   switch (blok.component) {
 *     case 'bereikbaar_hero':
 *       return <BereikbaarHero {blok} />;
 *     case 'ehbo_posten':
 *       return <EhboPosten {blok} />;
 *     // ... etc
 *   }
 * }
 * ```
 */
export type BereikbaarheidBlok =
  | BereikbaarHeroBlok
  | EhboPostenBlok
  | InEnRondomDeBinnenstadBlok
  | OpenbaarVervoerBlok
  | ParkeersectieBlok
  | ParkerenAutosBlok
  | StallenFietsenBlok
  | ToeankelijkBlok;

/**
 * Component props interface
 * 
 * Standard props structure for all Bereikbaarheid Astro components.
 * 
 * @example
 * ```astro
 * ---
 * import type { BereikbaarheidProps } from './types';
 * 
 * interface Props extends BereikbaarheidProps<BereikbaarHeroBlok> {}
 * 
 * const { blok } = Astro.props;
 * ---
 * ```
 */
export interface BereikbaarheidProps<T extends BereikbaarheidBaseBlok = BereikbaarheidBaseBlok> {
  blok: T;
}

/**
 * Type guard to check if a blok is a Bereikbaarheid component
 * 
 * @param blok - Any Storyblok blok
 * @returns True if the blok is a Bereikbaarheid component
 */
export function isBereikbaarheidBlok(blok: any): blok is BereikbaarheidBlok {
  const validComponents = [
    'bereikbaar_hero',
    'ehbo_posten',
    'in_en_rondom_de_binnenstad',
    'openbaar_vervoer',
    'parkeersectie',
    'parkeren_autos',
    'stallen_fietsen',
    'toegankelijkheid'
  ];
  
  return typeof blok === 'object' && 
         blok !== null && 
         validComponents.includes(blok.component);
}
