/**
 * Date Utility Functions
 * Helpers for formatting dates and times with Dutch locale
 * 
 * @module utils/dates
 */

/**
 * Format date to Dutch locale string
 * 
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'nl-NL')
 * @returns Formatted date string (e.g., "zaterdag 15 juni")
 * 
 * @example
 * ```typescript
 * const formatted = formatDate('2024-06-15');
 * // Returns: "zaterdag 15 juni"
 * ```
 */
export function formatDate(
    date: string | Date,
    locale: string = 'nl-NL'
): string {
    if (!date) return '';

    return new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
}

/**
 * Format date with year to Dutch locale string
 * 
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'nl-NL')
 * @returns Formatted date string with year (e.g., "zaterdag 15 juni 2024")
 * 
 * @example
 * ```typescript
 * const formatted = formatDateWithYear('2024-06-15');
 * // Returns: "zaterdag 15 juni 2024"
 * ```
 */
export function formatDateWithYear(
    date: string | Date,
    locale: string = 'nl-NL'
): string {
    if (!date) return '';

    return new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Format time to Dutch locale string
 * 
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'nl-NL')
 * @returns Formatted time string (e.g., "14:30")
 * 
 * @example
 * ```typescript
 * const time = formatTime('2024-06-15T14:30:00');
 * // Returns: "14:30"
 * ```
 */
export function formatTime(
    date: string | Date,
    locale: string = 'nl-NL'
): string {
    if (!date) return '';

    return new Date(date).toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit'
    });
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
