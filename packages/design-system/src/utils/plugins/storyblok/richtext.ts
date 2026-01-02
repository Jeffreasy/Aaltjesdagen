/**
 * Storyblok Rich Text Utilities
 * Centralized helpers for working with Storyblok richtext data
 * 
 * @module utils/plugins/storyblok/richtext
 */

import { renderRichText } from "@storyblok/astro";

/**
 * Safely renders Storyblok richtext content
 * Handles undefined/null gracefully
 * 
 * @param content - Storyblok richtext field
 * @returns Rendered HTML string or empty string
 */
export function renderText(content: any): string {
    return content ? (renderRichText(content) as string) || "" : "";
}

/**
 * Extract title field with fallback to empty string
 * 
 * @param blok - Storyblok blok object
 * @param field - Field name (default: 'title')
 * @returns Title string or empty string
 */
export function getTitle(blok: any, field: string = 'title'): string {
    return blok[field] || "";
}

/**
 * Extract richtext field (tekst/text/content)
 * 
 * @param blok - Storyblok blok object
 * @param field - Field name (default: 'tekst')
 * @returns Richtext content or undefined
 */
export function getTekst(blok: any, field: string = 'tekst'): any {
    return blok[field];
}

/**
 * Check if richtext field has content
 * 
 * @param content - Storyblok richtext field
 * @returns True if content exists and is not empty
 */
export function hasContent(content: any): boolean {
    if (!content) return false;
    if (typeof content === 'string') return content.trim().length > 0;
    return true;
}
