/**
 * Performance Monitoring Utility
 * Track and measure operation performance with high precision
 * 
 * @module utils/performance-monitor
 */
import { logger } from './logger';

export class PerformanceMonitor {
    private marks: Map<string, number> = new Map();

    /**
     * Start timing an operation
     */
    start(label: string) {
        this.marks.set(label, Date.now());
    }

    /**
     * End timing and log the duration
     */
    end(label: string, metadata?: Record<string, any>): number | undefined {
        const start = this.marks.get(label);
        if (!start) {
            logger.warn(`Performance mark "${label}" not found`);
            return undefined;
        }

        const duration = Date.now() - start;
        this.marks.delete(label);

        logger.info(`⏱️  ${label}`, {
            duration: `${duration}ms`,
            ...metadata,
        });

        return duration;
    }

    /**
     * Measure the execution time of an async function
     */
    async measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
        this.start(label);
        try {
            const result = await fn();
            this.end(label);
            return result;
        } catch (error) {
            this.end(label, { error: 'Failed' });
            throw error;
        }
    }

    /**
     * Measure the execution time of a sync function
     */
    measureSync<T>(label: string, fn: () => T): T {
        this.start(label);
        try {
            const result = fn();
            this.end(label);
            return result;
        } catch (error) {
            this.end(label, { error: 'Failed' });
            throw error;
        }
    }
}

export const perfMonitor = new PerformanceMonitor();
