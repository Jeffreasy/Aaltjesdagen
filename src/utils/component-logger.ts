/**
 * Component Logging Utility
 * Specialized logger for component rendering and lifecycle
 * 
 * @module utils/component-logger
 */
import { logger } from './logger';

/**
 * Create a scoped logger for a specific component
 */
export function createComponentLogger(componentName: string) {
    return logger.withTag(componentName);
}

/**
 * Log component rendering with props info
 */
export function logComponentRender(componentName: string, props: any) {
    if (import.meta.env.DEV) {
        const componentLogger = createComponentLogger(componentName);
        componentLogger.debug('Rendering', {
            props: Object.keys(props),
            propsCount: Object.keys(props).length,
        });
    }
}

/**
 * Log component errors with full context
 */
export function logComponentError(componentName: string, error: Error, context?: Record<string, any>) {
    const componentLogger = createComponentLogger(componentName);
    componentLogger.error('Render error', {
        error: error.message,
        stack: import.meta.env.DEV ? error.stack : undefined,
        ...context,
    });
}

/**
 * Log component data fetching
 */
export function logComponentDataFetch(componentName: string, dataSource: string, duration?: number) {
    if (import.meta.env.DEV) {
        const componentLogger = createComponentLogger(componentName);
        const metadata: Record<string, any> = { source: dataSource };
        if (duration) metadata.duration = `${duration}ms`;

        componentLogger.debug('Fetching data', metadata);
    }
}
