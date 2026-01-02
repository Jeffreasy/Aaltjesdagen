/**
 * Design System Configuration
 * Runtime configuration for locale, date formats, and other settings
 * 
 * @module utils/config
 */

export interface DesignSystemConfig {
    locale: string;
    dateFormat: Intl.DateTimeFormatOptions;
    timeFormat: Intl.DateTimeFormatOptions;
}

const defaultConfig: DesignSystemConfig = {
    locale: 'en-US',
    dateFormat: {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    },
    timeFormat: {
        hour: '2-digit',
        minute: '2-digit'
    }
};

let config: DesignSystemConfig = defaultConfig;

/**
 * Set design system configuration
 * @param newConfig - Partial configuration to merge
 */
export function setConfig(newConfig: Partial<DesignSystemConfig>) {
    config = { ...config, ...newConfig };
}

/**
 * Get current design system configuration
 * Checks globalThis (SSR) then window (client) then defaults
 */
export function getConfig(): DesignSystemConfig {
    // SSR: read from globalThis
    if (typeof globalThis !== 'undefined' && (globalThis as any).__DESIGN_SYSTEM_CONFIG__) {
        return (globalThis as any).__DESIGN_SYSTEM_CONFIG__;
    }

    // Client: read from window
    if (typeof window !== 'undefined' && (window as any).__DESIGN_SYSTEM_CONFIG__) {
        return (window as any).__DESIGN_SYSTEM_CONFIG__;
    }

    // Fallback to runtime config
    return config;
}

// Type augmentation for global config
declare global {
    var __DESIGN_SYSTEM_CONFIG__: DesignSystemConfig | undefined;
}
