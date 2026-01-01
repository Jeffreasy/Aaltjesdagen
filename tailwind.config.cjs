/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./packages/design-system/tailwind-preset.js')],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    // Allow Tailwind to scan the design system components
    './packages/design-system/src/**/*.{astro,js,ts}',
    // Force Tailwind to watch the plugin and preset for changes
    './packages/design-system/tailwind-plugin.js',
    './packages/design-system/tailwind-preset.js'
  ],
  darkMode: 'class',
  theme: {
    // Local overrides if needed (currently none, utilizing preset)
    extend: {},
  },
  plugins: [],
}