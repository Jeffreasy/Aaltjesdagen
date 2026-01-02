# Theming System

Complete guide to the Aaltjesdagen design system's theme system, including light/dark mode, customization, and creating custom themes.

## Table of Contents

- [Theme Overview](#theme-overview)
- [Light and Dark Mode](#light-and-dark-mode)
- [Theme Toggle Component](#theme-toggle-component)
- [CSS Variables](#css-variables)
- [Creating Custom Themes](#creating-custom-themes)
- [Theme-Aware Components](#theme-aware-components)
- [Advanced Customization](#advanced-customization)

---

## Theme Overview

The Aaltjesdagen design system uses **CSS custom properties (variables)** for theming, enabling:
- ✅ **Runtime theme switching** (no rebuild needed)
- ✅ **Automatic dark mode** based on system preferences
- ✅ **Smooth transitions** between themes
- ✅ **Full customization** without touching component code

**Key Philosophy**: **One source of truth** - all colors, spacing, and design tokens are defined in `theme.css` and referenced via CSS variables.

---

## Light and Dark Mode

### Automatic Dark Mode

The design system automatically switches to dark mode based on:
1. **System preference** (`prefers-color-scheme: dark`)
2. **Manual toggle** via `ThemeToggle` component

### Theme Detection

```css
/* Light mode (default) */
:root {
  color-scheme: light dark;
  --bg-base: #f5fafa;
  --text-primary: #2c3e50;
}

/* Dark mode (automatic) */
.dark {
  --bg-base: #0f1419;
  --text-primary: #e4e7eb;
}

/* System preference override */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Dark mode variables */
  }
}
```

### Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--bg-base` | `#f5fafa` | `#0f1419` | Page background |
| `--bg-elevated` | `#ffffff` | `#1a202c` | Cards, modals |
| `--text-primary` | `#2c3e50` | `#e4e7eb` | Main text |
| `--text-secondary` | `#546e7a` | `#94a3b8` | Secondary text |
| `--border-primary` | `#dae4e4` | `#2d3748` | Borders |

---

## Theme Toggle Component

### Basic Usage

```astro
---
import { ThemeToggle } from '@aaltjesdagen/ui/components';
---

<nav>
  <ThemeToggle />
</nav>
```

### How It Works

The `ThemeToggle` component:
1. **Detects** current theme on load
2. **Toggles** `.dark` class on `<html>`
3. **Saves** preference to `localStorage`
4. **Smooth transitions** between themes

### Manual Implementation

If you need custom toggle UI:

```astro
<script>
  // Get theme preference
  const getTheme = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  // Apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Initialize on load
  applyTheme(getTheme());
</script>

<button onclick="toggleTheme()">
  Toggle Theme
</button>
```

---

## CSS Variables

### Complete Variable Reference

#### Brand Colors

```css
:root {
  --color-primary: #267270;        /* Teal */
  --color-primary-dark: #257370;
  --color-primary-light: #50b0ae;
  
  --color-accent: #C0392B;         /* Red */
  --color-accent-dark: #A93226;
  --color-accent-light: #ff7e67;
  
  --color-secondary: var(--color-accent);
}
```

#### Functional Colors

```css
:root {
  --color-success: #4caf50;
  --color-error: #e57373;
  --color-warning: #ffa726;
  --focus-ring: rgba(80, 176, 174, 0.4);
}
```

#### Background & Text

```css
/* Light Mode */
:root {
  --bg-base: #f5fafa;
  --bg-elevated: #ffffff;
  --bg-overlay: rgba(255, 255, 255, 0.9);
  
  --text-primary: #2c3e50;
  --text-secondary: #546e7a;
  --text-tertiary: #78909c;
  --text-inverse: #ffffff;
  
  --border-primary: #dae4e4;
  --border-secondary: #edf2f2;
}

/* Dark Mode */
.dark {
  --bg-base: #0f1419;
  --bg-elevated: #1a202c;
  --bg-overlay: rgba(26, 32, 44, 0.9);
  
  --text-primary: #e4e7eb;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --text-inverse: #0f1419;
  
  --border-primary: #2d3748;
  --border-secondary: #1e2531;
}
```

#### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(44, 62, 80, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(44, 62, 80, 0.06), 0 2px 4px -1px rgba(44, 62, 80, 0.03);
  --shadow-lg: 0 10px 15px -3px rgba(44, 62, 80, 0.08), 0 4px 6px -2px rgba(44, 62, 80, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(44, 62, 80, 0.08), 0 10px 10px -5px rgba(44, 62, 80, 0.03);
}

/* Dark mode shadows are lighter */
.dark {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5);
}
```

---

## Creating Custom Themes

### Method 1: Override Default Theme

Create a custom CSS file overriding specific variables:

```css
/* custom-theme.css */
:root {
  /* Custom primary color */
  --color-primary: #6366f1;  /* Indigo */
  --color-primary-dark: #4f46e5;
  --color-primary-light: #818cf8;
  
  /* Custom accent */
  --color-accent: #f59e0b;  /* Amber */
  --color-accent-dark: #d97706;
  --color-accent-light: #fbbf24;
}
```

Import after the default theme:

```astro
---
import '@aaltjesdagen/ui/css';
import './custom-theme.css';
---
```

---

### Method 2: Create New Theme Class

Define a new theme class:

```css
/* custom-theme.css */
.theme-ocean {
  --color-primary: #0ea5e9;  /* Sky blue */
  --color-accent: #06b6d4;   /* Cyan */
  --bg-base: #f0f9ff;
  --bg-elevated: #ffffff;
  --text-primary: #0c4a6e;
}

.dark.theme-ocean {
  --bg-base: #082f49;
  --bg-elevated: #0c4a6e;
  --text-primary: #e0f2fe;
}
```

Apply via JavaScript:

```javascript
document.documentElement.classList.add('theme-ocean');
```

---

### Method 3: Dynamic Theme Switching

Create multiple themes selectable by users:

```astro
<script>
  const themes = {
    default: {
      primary: '#267270',
      accent: '#C0392B',
    },
    ocean: {
      primary: '#0ea5e9',
      accent: '#06b6d4',
    },
    forest: {
      primary: '#10b981',
      accent: '#059669',
    },
  };

  function applyTheme(themeName) {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-accent', theme.accent);
    
    localStorage.setItem('selectedTheme', themeName);
  }
</script>

<select onchange="applyTheme(this.value)">
  <option value="default">Default</option>
  <option value="ocean">Ocean</option>
  <option value="forest">Forest</option>
</select>
```

---

## Theme-Aware Components

### Using CSS Variables in Components

All design system components automatically use CSS variables:

```astro
<!-- This button adapts to light/dark mode automatically -->
<button class="btn-primary">
  Click Me
</button>
```

### Creating Theme-Aware Custom Components

Use CSS variables in your components:

```astro
<style>
  .my-component {
    background-color: var(--bg-elevated);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
  }
  
  .my-component:hover {
    background-color: var(--bg-base);
    box-shadow: var(--shadow-lg);
  }
</style>
```

### Theme-Specific Styling

Target specific themes with classes:

```css
/* Light mode only */
:root:not(.dark) .my-element {
  /* Light theme styles */
}

/* Dark mode only */
.dark .my-element {
  /* Dark theme styles */
}
```

---

## Advanced Customization

### Gradients

```css
:root {
  --bg-gradient-subtle: linear-gradient(135deg, #fafcfc 0%, #ffffff 50%, #f5fafa 100%);
  --bg-gradient-animated-1: radial-gradient(circle at 20% 50%, rgba(80, 176, 174, 0.55), transparent 50%);
}

.dark {
  --bg-gradient-subtle: linear-gradient(135deg, #1a202c 0%, #0f1419 50%, #1a202c 100%);
}
```

**Usage**:
```css
.hero {
  background: var(--bg-gradient-subtle);
}
```

---

### Typography

```css
:root {
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

**Custom fonts**:
```css
:root {
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Open Sans', sans-serif;
}
```

---

### Z-Index Hierarchy

```css
:root {
  --z-background: -1;
  --z-base: 0;
  --z-content: 1;
  --z-elevated: 10;
  --z-sticky: 100;
  --z-header: 200;
  --z-dropdown: 300;
  --z-tooltip: 400;
  --z-modal-backdrop: 500;
  --z-modal: 600;
  --z-toast: 700;
  --z-max: 9999;
}
```

---

### Transition Timing

```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Best Practices

### ✅ DO

- **Use CSS variables** for all colors
- **Test both themes** before deploying
- **Maintain contrast ratios** (WCAG AA: 4.5:1 minimum)
- **Provide smooth transitions** between themes
- **Save user preference** to localStorage

### ❌ DON'T

- **Hardcode colors** in components
- **Forget dark mode** testing
- **Use inline styles** for theme-dependent properties
- **Mix hex values** with CSS variables

---

## Debugging Themes

### Check Current Theme

```javascript
const isDark = document.documentElement.classList.contains('dark');
console.log('Current theme:', isDark ? 'dark' : 'light');
```

### Inspect CSS Variables

```javascript
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--color-primary');
console.log('Primary color:', primaryColor);
```

### Force Theme

```javascript
// Force dark mode
document.documentElement.classList.add('dark');

// Force light mode
document.documentElement.classList.remove('dark');
```

---

## Next Steps

- **[Design Tokens](./design-tokens.md)** - Complete token reference
- **[Components](./astro-components.md)** - All theme-aware components
- **[Accessibility](./accessibility.md)** - Ensure proper contrast
