/**
 * Tailwind Theme Presets
 * 
 * Brand-specific color palettes for Tailwind CSS configuration.
 * Use these to quickly apply brand colors in your Tailwind config.
 * 
 * @example
 * ```javascript
 * // tailwind.config.mjs
 * import themes from '@jjalaa/astro-ui/themes';
 * 
 * export default {
 *   theme: {
 *     extend: {
 *       colors: {
 *         ...themes.aaltjesdagen,  // Apply Aaltjesdagen brand
 *       },
 *     },
 *   },
 * };
 * ```
 */

module.exports = {
    // Default: Universal neutral theme
    default: {
        primary: {
            DEFAULT: '#2563eb',  // Blue 600
            dark: '#1d4ed8',      // Blue 700
            light: '#60a5fa',     // Blue 400
        },
        accent: {
            DEFAULT: '#dc2626',   // Red 600
            dark: '#b91c1c',      // Red 700
            light: '#f87171',     // Red 400
        },
    },

    // Aaltjesdagen Brand (Original)
    aaltjesdagen: {
        primary: {
            DEFAULT: '#267270',   // Teal
            dark: '#257370',      // Teal dark
            light: '#50b0ae',     // Teal light
        },
        accent: {
            DEFAULT: '#C0392B',   // Coral
            dark: '#A93226',      // Coral dark
            light: '#ff7e67',     // Coral light
        },
    },

    // Modern Blue Theme
    modernBlue: {
        primary: {
            DEFAULT: '#3b82f6',   // Blue 500
            dark: '#2563eb',      // Blue 600
            light: '#60a5fa',     // Blue 400
        },
        accent: {
            DEFAULT: '#8b5cf6',   // Purple 500
            dark: '#7c3aed',      // Purple 600
            light: '#a78bfa',     // Purple 400
        },
    },

    // Forest Theme
    forest: {
        primary: {
            DEFAULT: '#059669',   // Emerald 600
            dark: '#047857',      // Emerald 700
            light: '#10b981',     // Emerald 500
        },
        accent: {
            DEFAULT: '#d97706',   // Amber 600
            dark: '#b45309',      // Amber 700
            light: '#f59e0b',     // Amber 500
        },
    },
};
