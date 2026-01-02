import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PerformanceMonitor } from '../../utils/performance-monitor';

describe('Utility: PerformanceMonitor', () => {
    let monitor: PerformanceMonitor;

    beforeEach(() => {
        monitor = new PerformanceMonitor();
    });

    describe('start() and end()', () => {
        it('should track timing duration', () => {
            monitor.start('test-operation');

            // Simulate some work
            const start = Date.now();
            while (Date.now() - start < 10) { } // Wait ~10ms

            const duration = monitor.end('test-operation');

            expect(duration).toBeGreaterThanOrEqual(10);
            expect(duration).toBeLessThan(100); // Sanity check
        });

        it('should return undefined for non-existent marks', () => {
            const duration = monitor.end('non-existent');
            expect(duration).toBeUndefined();
        });

        it('should clean up mark after end()', () => {
            monitor.start('cleanup-test');
            monitor.end('cleanup-test');

            // Calling end again should return undefined
            const secondCall = monitor.end('cleanup-test');
            expect(secondCall).toBeUndefined();
        });
    });

    describe('measure() - async', () => {
        it('should measure async function execution time', async () => {
            const asyncFn = async () => {
                await new Promise(resolve => setTimeout(resolve, 20));
                return 'result';
            };

            const result = await monitor.measure('async-test', asyncFn);

            expect(result).toBe('result');
        });

        it('should handle errors in async functions', async () => {
            const errorFn = async () => {
                throw new Error('Test error');
            };

            await expect(monitor.measure('error-test', errorFn))
                .rejects.toThrow('Test error');
        });
    });

    describe('measureSync() - sync', () => {
        it('should measure sync function execution time', () => {
            const syncFn = () => {
                let sum = 0;
                for (let i = 0; i < 1000; i++) sum += i;
                return sum;
            };

            const result = monitor.measureSync('sync-test', syncFn);

            expect(result).toBe(499500); // Sum of 0 to 999
        });

        it('should handle errors in sync functions', () => {
            const errorFn = () => {
                throw new Error('Sync error');
            };

            expect(() => monitor.measureSync('sync-error', errorFn))
                .toThrow('Sync error');
        });
    });
});
