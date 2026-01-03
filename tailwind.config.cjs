/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@laventecare/astro-ui/preset')],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    // Scan design system components from NPM
    './node_modules/@laventecare/astro-ui/src/**/*.{astro,js,ts}',
  ],
  darkMode: 'class',
  theme: {
    // Local overrides if needed (currently none, utilizing preset)
    extend: {},
  },
  plugins: [],
}