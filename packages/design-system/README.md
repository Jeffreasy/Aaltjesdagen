# @aaltjesdagen/ui

> **Breathable & Sophisticated** — The official design system for Aaltjesdagen projects

A modern, production-grade design system built with Astro, Tailwind CSS, and Alpine.js. Featuring a complete token system, glassmorphism components, and 100% WCAG AA accessibility compliance.

## ✨ Features

- 🎨 **Dual-Theme System** - Beautiful light and dark modes with smooth transitions
- ♿ **Accessibility First** - 100% WCAG 2.1 AA compliant with verified contrast ratios
- 🎭 **Glassmorphism** - Premium glass effects optimized for performance
- ⚡ **Performance** - GPU-accelerated animations, optimized for mobile
- 🧩 **44 Components** - Complete UI toolkit from SkipLink to Carousel
- 📐 **Token-Based** - Consistent design through CSS variables and Tailwind tokens
- 🌊 **Animated Backgrounds** - Subtle, breathable blob animations
- 🔧 **Developer-Friendly** - TypeScript support, comprehensive utilities

## 🚀 Quick Start

```bash
# Already installed as a local package in the Aaltjesdagen monorepo
# No additional installation needed
```

### Basic Setup

```astro
---
// In your Astro layout or page
import '@aaltjesdagen/ui/css';
---

<html>
  <head>
    <!-- Your head content -->
  </head>
  <body>
    <div class="bg-animated">
      <div class="orb"></div>
    </div>
    
    <main class="section-container">
      <h1 class="heading-hero gradient-primary-accent">
        Hello, Aaltjesdagen!
      </h1>
      <button class="btn-primary">
        Get Started
      </button>
    </main>
  </body>
</html>
```

### Tailwind Configuration

```js
// tailwind.config.mjs
import { default as preset } from '@aaltjesdagen/ui/preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
};
```

## 📚 Documentation

Comprehensive guides for every aspect of the design system:

### Getting Started
- **[Getting Started Guide](./docs/getting-started.md)** - Installation, setup, and first steps

### Core Concepts
- **[Design Tokens](./docs/design-tokens.md)** - Colors, typography, spacing, shadows, and z-index
- **[Components](./docs/components.md)** - Layout, cards, buttons, and backgrounds
- **[Animations](./docs/animations.md)** - Motion design system and scroll reveals

### Advanced
- **[Utilities](./docs/utilities.md)** - Storyblok, image, and date helpers
- **[Theming](./docs/theming.md)** - Dark mode and customization
- **[Prose System](./docs/prose-system.md)** - Rich text styling
- **[Astro Components](./docs/astro-components.md)** - Ready-to-use Astro components

### Contributing
- **[Contributing Guide](./docs/contributing.md)** - How to extend the design system
- **[Migration Guide](./docs/migration-guide.md)** - Upgrading between versions
- **[Accessibility](./docs/accessibility.md)** - A11y guidelines and compliance

## 🎨 Design Philosophy

The Aaltjesdagen design system follows three core principles:

### 1. Breathable
Generous spacing, subtle animations, and a calm color palette create a relaxed, approachable experience.

### 2. Sophisticated
Premium glassmorphism, refined typography, and elegant transitions convey professionalism and quality.

### 3. Accessible
WCAG AA compliance, keyboard navigation, and reduced motion support ensure everyone can use our products.

## 🎯 Token Overview

### Colors

```css
/* Brand Colors */
--color-primary: #267270;     /* Teal - AA Compliant (4.52:1) */
--color-accent: #C0392B;      /* Coral - AA Compliant (5.8:1) */

/* Semantic */
--color-success: #4caf50;
--color-error: #e57373;
--color-warning: #ffa726;
```

### Typography

```css
--font-heading: 'Outfit', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Spacing

```css
.section-spacing     /* py-12 md:py-20 lg:py-24 */
.section-spacing-sm  /* py-8 md:py-12 lg:py-16 */
.container-custom    /* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */
```

## 🧩 Component Examples

### Cards

```html
<div class="card-base">
  <h3>Premium Card</h3>
  <p>Subtle hover effects included</p>
</div>

<div class="glass">
  <h3>Glassmorphism</h3>
  <p>Translucent with backdrop blur</p>
</div>
```

### Buttons

```html
<button class="btn-primary">Primary Action</button>
<button class="btn-accent">Accent CTA</button>
<button class="btn-secondary">Secondary</button>
```

### Animations

```html
<!-- Scroll reveal -->
<div data-reveal="fade">Fades in on scroll</div>
<div data-reveal="slide" data-reveal-delay="200">Slides up with delay</div>

<!-- Utility classes -->
<div class="animate-float">Floating element</div>
<div class="animate-pulse">Pulsing badge</div>
```

## 📦 Package Exports

```ts
// Styles
import '@aaltjesdagen/ui/css';

// Tailwind configuration
import preset from '@aaltjesdagen/ui/preset';
import plugin from '@aaltjesdagen/ui/plugin';

// Components (Astro)
import { 
  Icon, Link, ThemeToggle,
  Navbar, Footer, Hero, Drawer, Carousel, SkipLink
} from '@aaltjesdagen/ui/components';

// Utilities
import { 
  renderText, 
  getTitle, 
  storyblokImage, 
  formatDate 
} from '@aaltjesdagen/ui/utils';
```

## 🏗️ Architecture

```
packages/design-system/
├── src/
│   ├── styles/
│   │   ├── main.css           # Main entry point
│   │   ├── theme.css          # CSS variables & tokens
│   │   ├── animations.css     # Keyframes & animation system
│   │   └── prose/             # Rich text styling
│   ├── components/            # Astro components
│   │   ├── Icon.astro
│   │   ├── Link.astro
│   │   ├── ThemeToggle.astro
│   │   └── ...
│   └── utils/                 # TypeScript utilities
│       ├── storyblok.ts
│       ├── images.ts
│       ├── dates.ts
│       └── logger.ts
├── tailwind-preset.js         # Tailwind token preset
├── tailwind-plugin.js         # Component class plugin
└── docs/                      # Documentation
```

## 🎭 Theme Support

The design system includes automatic dark mode support:

```html
<!-- Automatic theme detection -->
<html class="dark">  <!-- or omit for light mode -->
```

```js
// Theme toggle available
import { ThemeToggle } from '@aaltjesdagen/ui/components';
```

Themes respect system preferences and persist user choices via localStorage.

## ✅ Accessibility

- **WCAG 2.1 AA** compliant color contrast (verified with axe-core)
- **Keyboard navigation** with visible focus rings
- **Motion preferences** respected (`prefers-reduced-motion`)
- **Screen reader** optimized with semantic HTML and ARIA

All components are tested with automated accessibility audits in CI/CD.

## 📈 Version

**Current Version**: `2.0.0`

This is a local package maintained within the Aaltjesdagen monorepo.

## 🤝 Contributing

See [docs/contributing.md](./docs/contributing.md) for guidelines on:
- Adding new tokens
- Creating components
- Writing documentation
- Testing requirements

## 📄 License

Proprietary - Aaltjesdagen Project

---

**Need Help?** Check out our [comprehensive documentation](./docs/) or open an issue in the main repository.
