/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    dark: 'var(--color-primary-dark)',
                    light: 'var(--color-primary-light)',
                    text: 'var(--color-primary-text)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    dark: 'var(--color-accent-dark)',
                    light: 'var(--color-accent-light)',
                },
                secondary: 'var(--color-secondary)',
                success: 'var(--color-success)',
                error: 'var(--color-error)',
                warning: 'var(--color-warning)',
                base: 'var(--bg-base)',
                elevated: 'var(--bg-elevated)',
                'text-main': 'var(--text-primary)',
                'text-sub': 'var(--text-secondary)',
            },
            zIndex: {
                background: 'var(--z-background)',
                base: 'var(--z-base)',
                content: 'var(--z-content)',
                elevated: 'var(--z-elevated)',
                sticky: 'var(--z-sticky)',
                header: 'var(--z-header)',
                dropdown: 'var(--z-dropdown)',
                tooltip: 'var(--z-tooltip)',
                'modal-backdrop': 'var(--z-modal-backdrop)',
                modal: 'var(--z-modal)',
                toast: 'var(--z-toast)',
                max: 'var(--z-max)',
            },
            fontFamily: {
                heading: ['var(--font-heading)', 'sans-serif'],
                body: ['var(--font-body)', 'sans-serif'],
            },
            boxShadow: {
                'soft-sm': 'var(--shadow-sm)',
                'soft-md': 'var(--shadow-md)',
                'soft-lg': 'var(--shadow-lg)',
                'soft-xl': 'var(--shadow-xl)',
            },
            animation: {
                'float': 'float 20s infinite ease-in-out alternate',
            }
        },
    },
    plugins: [
        require('./tailwind-plugin.js') // Automatically include the plugin in this preset
    ],
}
