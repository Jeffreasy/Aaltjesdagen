/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Door de variabelen zo te mappen, blijven ze sync met je CSS
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
        // Mappen van functionele kleuren voor gebruik in utilities
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',

        // Achtergronden en tekst voor makkelijk gebruik: bg-base of text-secondary
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
        // Optioneel: map je custom CSS shadows naar Tailwind
        'soft-sm': 'var(--shadow-sm)',
        'soft-md': 'var(--shadow-md)',
        'soft-lg': 'var(--shadow-lg)',
        'soft-xl': 'var(--shadow-xl)',
      },
      animation: {
        // Als je de float-animatie ook via Tailwind wilt kunnen aanroepen
        'float': 'float 20s infinite ease-in-out alternate',
      }
    },
  },
  plugins: [],
}