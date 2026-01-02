# Getting Started with @aaltjesdagen/ui

Welcome to the Aaltjesdagen Design System! This guide will walk you through installation, setup, and creating your first components.

## Table of Contents

- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [Tailwind Configuration](#tailwind-configuration)
- [Your First Component](#your-first-component)
- [Theme Setup](#theme-setup)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Installation

The `@aaltjesdagen/ui` package is a **local package** within the Aaltjesdagen monorepo. If you're working within the monorepo, it's already available!

### Verify Installation

Check your `package.json`:

```json
{
  "dependencies": {
    "@aaltjesdagen/ui": "file:packages/design-system"
  }
}
```

If it's missing, add it:

```bash
npm install
```

## Basic Setup

### 1. Import Global Styles

In your main Astro layout (typically `src/layouts/BaseLayout.astro`):

```astro
---
// Import the complete design system CSS
import '@aaltjesdagen/ui/css';
---

<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Aaltjesdagen App</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

This single import includes:
- ✅ CSS variables and design tokens
- ✅ Animation keyframes and utilities
- ✅ Component classes (buttons, cards, etc.)
- ✅ Prose/rich text styling
- ✅ Tailwind base, components, and utilities

### 2. Add Animated Background

For the signature "breathable" animated background:

```astro
<body>
  <!-- Animated background layer -->
  <div class="bg-animated">
    <div class="orb"></div>
  </div>

  <!-- Your content -->
  <slot />
</body>
```

The animated background creates subtle floating blobs that adapt to light/dark mode automatically.

## Tailwind Configuration

### Configure Tailwind with the Preset

Update your `tailwind.config.mjs` to use the design system preset:

```js
// tailwind.config.mjs
import { default as preset } from '@aaltjesdagen/ui/preset';

/** @type {import('tailwindcss').Config} */
export default {
  // Use the design system preset
  presets: [preset],
  
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './packages/design-system/src/**/*.{astro,html,js,ts}', // Include DS components
  ],
  
  // You can extend or override preset values here
  theme: {
    extend: {
      // Project-specific customizations
    },
  },
};
```

### What the Preset Includes

The preset automatically configures:

- **Colors**: `primary`, `accent`, `base`, `elevated`, semantic colors
- **Z-Index**: Complete stacking context (`z-header`, `z-modal`, etc.)
- **Fonts**: `font-heading`, `font-body`
- **Shadows**: `shadow-soft-sm` through `shadow-soft-xl`
- **Animations**: `animate-float` and other motion utilities
- **Plugin**: Component classes automatically included

> **Note**: The plugin is automatically included via the preset. You don't need to import it separately unless you're bypassing the preset.

## Your First Component

Let's create a simple page using design system components:

```astro
---
// src/pages/index.astro
import '@aaltjesdagen/ui/css';
---

<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <title>Aaltjesdagen</title>
  </head>
  <body>
    <!-- Animated background -->
    <div class="bg-animated">
      <div class="orb"></div>
    </div>

    <!-- Hero section -->
    <section class="section-container-lg">
      <div class="text-center">
        <!-- Hero heading -->
        <h1 class="heading-hero mb-6">
          <span class="gradient-primary-accent bg-clip-text text-transparent">
            Welkom bij Aaltjesdagen
          </span>
        </h1>

        <!-- Description -->
        <p class="text-xl text-text-sub max-w-2xl mx-auto mb-8">
          Het grootste festival van Nederland, vol muziek, kunst en gezelligheid.
        </p>

        <!-- CTA Buttons -->
        <div class="flex gap-4 justify-center flex-wrap">
          <a href="/programma" class="btn-primary">
            Bekijk Programma
          </a>
          <a href="/tickets" class="btn-secondary">
            Tickets Kopen
          </a>
        </div>
      </div>
    </section>

    <!-- Feature cards -->
    <section class="section-container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card-base">
          <h3 class="text-2xl font-bold mb-3 text-primary">🎵 Muziek</h3>
          <p class="text-text-sub">
            Topartiesten op meerdere podia
          </p>
        </div>

        <div class="card-base">
          <h3 class="text-2xl font-bold mb-3 text-primary">🎨 Kunst</h3>
          <p class="text-text-sub">
            Inspirerende installaties en exposities
          </p>
        </div>

        <div class="glass">
          <h3 class="text-2xl font-bold mb-3 text-accent">✨ Special</h3>
          <p class="text-text-sub">
            Exclusieve VIP ervaring
          </p>
        </div>
      </div>
    </section>
  </body>
</html>
```

### Component Breakdown

Let's examine what we used:

1. **Layout Components**
   - `.section-container-lg` - Full section with generous spacing
   - `.container-custom` (included in section-container) - Centered content with max-width

2. **Typography**
   - `.heading-hero` - Large, responsive hero heading
   - `.gradient-primary-accent` - Brand gradient
   - `.text-text-sub` - Semantic secondary text color

3. **Cards**
   - `.card-base` - Solid card with hover elevation
   - `.glass` - Glassmorphism effect with backdrop blur

4. **Buttons**
   - `.btn-primary` - Primary CTA with teal color
   - `.btn-secondary` - Secondary outline button

## Theme Setup

### Automatic Dark Mode

The design system automatically detects system color scheme preferences:

```html
<!-- Light mode (default) -->
<html lang="nl">

<!-- Dark mode (explicit) -->
<html lang="nl" class="dark">

<!-- Respects system preference -->
<html lang="nl"> <!-- Will auto-detect -->
```

### Add Theme Toggle

To let users manually switch themes:

```astro
---
import { ThemeToggle } from '@aaltjesdagen/ui/components';
---

<header>
  <nav>
    <!-- Your navigation -->
    <ThemeToggle />
  </nav>
</header>
```

The toggle:
- ✅ Persists choice to localStorage
- ✅ Syncs across tabs
- ✅ Shows sun/moon icons
- ✅ Includes keyboard support
- ✅ Accessible with ARIA labels

## Troubleshooting

### Styles Not Loading

**Problem**: No design system styles are applied.

**Solution**: Make sure you import the CSS:

```astro
---
import '@aaltjesdagen/ui/css'; // Add this!
---
```

### Tailwind Classes Not Working

**Problem**: Tailwind utility classes aren't being applied.

**Solution**: Verify your `tailwind.config.mjs`:

```js
import { default as preset } from '@aaltjesdagen/ui/preset';

export default {
  presets: [preset], // Must use the preset
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}', // Include your source files
  ],
};
```

### Component Classes Missing

**Problem**: Classes like `.btn-primary` or `.card-base` have no styling.

**Solution**: These are provided by the Tailwind plugin, which is included in the preset. Make sure:
1. You're using the preset in your Tailwind config
2. You've imported `@aaltjesdagen/ui/css`
3. You've restarted your dev server

### Animated Background Not Showing

**Problem**: The `.bg-animated` background doesn't appear.

**Solution**: Make sure you have **both** elements:

```html
<div class="bg-animated">
  <div class="orb"></div> <!-- Both are required! -->
</div>
```

### Fonts Not Loading

**Problem**: Outfit or Inter fonts aren't displaying.

**Solution**: The fonts are self-hosted in the main project. Make sure your `BaseLayout.astro` includes:

```astro
<link rel="preload" href="/fonts/outfit-variable.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin />
```

### Dark Mode Not Working

**Problem**: Dark mode styles aren't applying.

**Solution**: 
1. Check that the `<html>` element has `class="dark"` attribute
2. Verify CSS variables are being applied (check DevTools)
3. Make sure you imported `@aaltjesdagen/ui/css`

### Build Errors with Tailwind

**Problem**: Build fails with Tailwind errors.

**Solution**: Clear the Tailwind cache:

```bash
rm -rf .astro
npm run build
```

## Next Steps

Now that you have the basics set up, explore:

### Learn the Design Tokens
- **[Design Tokens Guide](./design-tokens.md)** - Master colors, typography, spacing, and more

### Explore Components
- **[Components Reference](./components.md)** - All available component classes
- **[Astro Components](./astro-components.md)** - Ready-to-use Astro components

### Add Motion
- **[Animation System](./animations.md)** - Scroll reveals, transitions, and keyframes

### Use Utilities
- **[Utilities Reference](./utilities.md)** - Helper functions for Storyblok, images, and dates

### Deep Dive
- **[Theming Guide](./theming.md)** - Customize and extend themes
- **[Accessibility](./accessibility.md)** - A11y best practices and testing

### Contribute
- **[Contributing Guide](./contributing.md)** - Help improve the design system

---

**Questions or Issues?** Check the [full documentation](../README.md) or reach out to the design system team.
