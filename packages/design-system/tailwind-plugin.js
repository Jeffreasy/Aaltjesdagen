const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents, theme }) {
    addComponents({
        /* === CONTAINER === */
        '.container-custom': {
            '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
        },

        /* === SECTION SPACING === */
        '.section-spacing': {
            '@apply py-12 md:py-20 lg:py-24': {},
        },
        '.section-spacing-sm': {
            '@apply py-8 md:py-12 lg:py-16': {},
        },
        '.section-spacing-xs': {
            '@apply py-6 md:py-8 lg:py-12': {},
        },

        /* === CARD SYSTEM === */
        '.card-base': {
            'background-color': 'var(--bg-elevated)',
            'border': '1px solid var(--border-primary)',
            'border-radius': '1rem',
            'padding': '1.5rem',
            'box-shadow': 'var(--shadow-md)',
            'transition': 'all var(--transition-base)',
            '&:hover': {
                'transform': 'translateY(-4px)',
                'box-shadow': 'var(--shadow-lg)',
                'border-color': 'var(--color-primary)',
            }
        },
        '.glass': {
            'background': 'var(--bg-overlay)',
            'backdrop-filter': 'blur(12px)',
            'border': '1px solid var(--border-primary)',
        },

        /* === BUTTONS === */
        '.btn': {
            '@apply inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95': {},
        },
        '.btn-primary': {
            '@apply btn text-white shadow-lg shadow-teal-500/20': {},
            'background': 'var(--color-primary)',
            '&:hover': {
                'background': 'var(--color-primary-dark)',
                '@apply shadow-xl shadow-teal-500/30 -translate-y-0.5': {},
            }
        },
        '.btn-accent': {
            '@apply btn text-white shadow-lg shadow-orange-500/20': {},
            'background': 'var(--color-accent)',
            '&:hover': {
                'background': 'var(--color-accent-dark)',
                '@apply shadow-xl shadow-orange-500/30 -translate-y-0.5': {},
            }
        },
        '.btn-secondary': {
            '@apply btn border-2': {},
            'border-color': 'var(--border-primary)',
            'color': 'var(--text-primary)',
            'background': 'transparent',
            '&:hover': {
                'border-color': 'var(--color-primary)',
                'color': 'var(--color-primary)',
                'background': 'var(--bg-elevated)',
            }
        },

        /* === TYPOGRAPHY === */
        '.heading-hero': {
            '@apply text-4xl md:text-6xl lg:text-7xl tracking-tight': {},
        },
        '.heading-section': {
            '@apply text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6': {},
        },
        '.text-highlight': {
            'color': 'var(--color-primary-text)',
        },
        '.dark .text-highlight': {
            'color': 'var(--color-primary)',
        },
    });
});
