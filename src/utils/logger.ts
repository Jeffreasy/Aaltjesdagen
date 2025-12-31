/**
 * Advanced Professional Logging Utility
 * Centralized logger with scoped loggers, analytics, and performance tracking
 * 
 * @module utils/logger
 */
import consola from 'consola';

// ============================================
// Base Logger & Scoped Loggers
// ============================================

export const logger = consola;

// Create scoped loggers for different modules
export const storyblokLogger = logger.withTag('storyblok');
export const imagesLogger = logger.withTag('images');
export const datesLogger = logger.withTag('dates');
export const buildLogger = logger.withTag('build');

// ============================================
// Build Analytics Tracker
// ============================================

export class BuildAnalytics {
    private metrics: Map<string, { duration: number; count?: number }> = new Map();
    private startTime: number = Date.now();

    track(operation: string, duration: number, count?: number) {
        this.metrics.set(operation, { duration, count });
    }

    summarize() {
        const totalTime = Date.now() - this.startTime;

        const metricsLines = Array.from(this.metrics.entries())
            .map(([op, { duration, count }]) =>
                `  ${op}: ${duration}ms${count ? ` (${count} items)` : ''}`
            )
            .join('\n');

        logger.box({
            title: '📊 Build Performance Summary',
            message: metricsLines + `\n\n  Total build time: ${totalTime}ms`,
            style: {
                borderColor: 'green',
                borderStyle: 'round',
            },
        });
    }

    getTotalTime(): number {
        return Date.now() - this.startTime;
    }

    getMetrics() {
        return Array.from(this.metrics.entries());
    }
}

export const analytics = new BuildAnalytics();

// ============================================
// Error Tracker
// ============================================

class ErrorTracker {
    private errors: Array<{ message: string; context: any; timestamp: number }> = [];

    track(message: string, error: Error, context?: Record<string, any>) {
        this.errors.push({
            message,
            context: { error: error.message, ...context },
            timestamp: Date.now(),
        });
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    summarize() {
        if (this.errors.length === 0) {
            logger.success('✨ No errors during build!');
            return;
        }

        const errorLines = this.errors
            .map((err, idx) => `  ${idx + 1}. ${err.message}\n     Context: ${JSON.stringify(err.context)}`)
            .join('\n\n');

        logger.box({
            title: '❌ Build Errors Summary',
            message: errorLines,
            style: {
                borderColor: 'red',
                borderStyle: 'double',
            },
        });
    }
}

export const errorTracker = new ErrorTracker();

// ============================================
// Log Grouping Helpers (SSG-Compatible)
// ============================================

/**
 * Start a visual log group (SSG-compatible)
 * Uses visual separators instead of console.group() for SSG compatibility
 */
export function startGroup(label: string) {
    logger.log(''); // Add spacing
    logger.info(`┌─ ${label} ──────────────────────────`);
}

/**
 * End a visual log group (SSG-compatible)
 */
export function endGroup() {
    logger.info(`└────────────────────────────────────────`);
    logger.log(''); // Add spacing
}

// ============================================
// Enhanced Helper Functions
// ============================================

/**
 * Log Storyblok API fetch with metadata
 */
export function logStoryblokFetch(slug: string, version: string, duration?: number) {
    const metadata: Record<string, any> = { version };
    if (duration !== undefined) {
        metadata.duration = `${duration}ms`;
        analytics.track(`fetch:${slug}`, duration);
    }

    storyblokLogger.info(`Fetching story: ${slug}`, metadata);
}

/**
 * Log build performance metrics
 */
export function logBuildMetric(operation: string, duration: number, count?: number) {
    analytics.track(operation, duration, count);

    buildLogger.success(operation, {
        duration: `${duration}ms`,
        ...(count && { items: count })
    });
}

/**
 * Log errors with context and tracking
 */
export function logError(message: string, error: Error, context?: Record<string, any>) {
    errorTracker.track(message, error, context);

    logger.error(message, {
        error: error.message,
        stack: import.meta.env.DEV ? error.stack : undefined,
        ...context,
    });
}

/**
 * Log debug information (only in development)
 */
export function logDebug(message: string, data?: any) {
    if (import.meta.env.DEV) {
        logger.debug(message, data);
    }
}

/**
 * Log image optimization operations
 */
export function logImageOptimization(filename: string, format: string, quality: number) {
    if (import.meta.env.DEV) {
        imagesLogger.debug(`Optimizing: ${filename}`, { format, quality });
    }
}

/**
 * Log date formatting operations
 */
export function logDateFormatting(date: string, locale: string) {
    if (import.meta.env.DEV) {
        datesLogger.debug(`Formatting: ${date}`, { locale });
    }
}

// ============================================
// Build Completion Summary
// ============================================

export function logBuildSummary() {
    console.log('\n'); // Add spacing
    analytics.summarize();
    errorTracker.summarize();
    console.log('\n'); // Add spacing
}
