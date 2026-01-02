/**
 * Date Utility Functions
 * Helpers for formatting dates and times with configurable locale
 * 
 * @module utils/dates
 */

import { getConfig } from './config';
import { logDateFormatting } from './logger';

/**
 * Format date using configured locale
 * 
 * @param date - Date string or Date object
 * @returns Formatted date string
 * 
 * @example
 * ```typescript
 * const formatted = formatDate('2024-06-15');
 * // Returns: "Saturday, June 15" (with en-US locale)
 * // Returns: "zaterdag 15 juni" (with nl-NL locale)
 * ```
 */
export function formatDate(date: string | Date): string {
    if (!date) return '';

    const { locale, dateFormat } = getConfig();
    const dateStr = typeof date === 'string' ? date : date.toISOString();
    logDateFormatting(dateStr, locale);

    return new Date(date).toLocaleDateString(locale, dateFormat);
}

/**
 * Format date with year using configured locale
 * 
 * @param date - Date string or Date object
 * @returns Formatted date string with year
 */
export function formatDateWithYear(date: string | Date): string {
    if (!date) return '';

    const { locale } = getConfig();
    return new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Format time using configured locale
 * 
 * @param date - Date string or Date object
 * @returns Formatted time string (e.g., "14:30")
 */
export function formatTime(date: string | Date): string {
    if (!date) return '';

    const { locale, timeFormat } = getConfig();
    return new Date(date).toLocaleTimeString(locale, timeFormat);
}

/**
 * Get year from date
 * 
 * @param date - Date string or Date object
 * @returns Year as number
 * 
 * @example
 * ```typescript
 * const year = getYear('2024-06-15');
 * // Returns: 2024
 * ```
 */
export function getYear(date: string | Date): number {
    if (!date) return new Date().getFullYear();
    return new Date(date).getFullYear();
}
