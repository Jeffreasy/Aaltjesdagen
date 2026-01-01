/**
 * Simple Logger for Design System
 * Lightweight replacement for the main app logger to avoid dependencies.
 * Only logs in development mode.
 */

export function logDateFormatting(date: string, locale: string) {
    if (import.meta.env.DEV) {
        console.debug(`[Date] Formatting: ${date}`, { locale });
    }
}

export function logImageOptimization(filename: string, format: string, quality: number) {
    if (import.meta.env.DEV) {
        console.debug(`[Image] Optimizing: ${filename}`, { format, quality });
    }
}
