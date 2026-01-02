import { defineConfig } from 'tsup';

export default defineConfig({
    // Utils (core + Storyblok plugin as separate entry)
    entry: [
        'src/utils/index.ts',
        'src/utils/plugins/storyblok/index.ts',
        'src/types/index.ts',
    ],

    // Output formats
    format: ['esm', 'cjs'],

    // Type definitions
    dts: true,

    // Splitting for tree-shaking
    splitting: true,

    // Sourcemaps for debugging
    sourcemap: true,

    // Minify production builds
    minify: process.env.NODE_ENV === 'production',

    // Clean dist for each build
    clean: true,

    // External dependencies (don't bundle)
    external: [
        'astro',
        '@storyblok/astro',
        'alpinejs',
        'tailwindcss',
        'swiper',
    ],

    // Output directory
    outDir: 'dist',
});
