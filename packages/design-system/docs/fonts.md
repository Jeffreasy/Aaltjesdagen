# Font Configuration

The design system uses **system fonts by default** for zero dependencies and optimal performance.

## Default Fonts (System Stack)

```css
--font-heading: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

This provides excellent typography across all platforms without requiring font downloads.

## Brand-Specific Fonts

Fonts can be customized per brand using the preset system:

### Aaltjesdagen Brand
```css
[data-brand="aaltjesdagen"] {
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### Modern Blue Brand
```css
[data-brand="modern-blue"] {
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Open Sans', sans-serif;
}
```

### Forest Brand
```css
[data-brand="forest"] {
  --font-heading: 'Merriweather', serif;
  --font-body: 'Lato', sans-serif;
}
```

## Custom Font Loading

### Option 1: CSS Variables (Recommended)

Load fonts in your project and override CSS variables:

```astro
---
// src/layouts/BaseLayout.astro
---
<head>
  <!-- Load your custom fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
  
  <!-- Override design system fonts -->
  <style is:global>
    :root {
      --font-heading: 'Your Font', sans-serif;
      --font-body: 'Your Font', sans-serif;
    }
  </style>
</head>
```

### Option 2: Use Brand Preset

Apply a brand preset that includes fonts:

```html
<html data-brand="aaltjesdagen">
  <!-- Automatically uses Outfit + Inter -->
</html>
```

### Option 3: Self-Hosting Fonts

1. Add `.woff2` files to `/public/fonts/`
2. Define `@font-face` in your project
3. Override CSS variables

```css
/* In your project's global CSS */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

:root {
  --font-heading: 'CustomFont', sans-serif;
}
```

## Font Loading Strategy

### Google Fonts Example

```astro
<head>
  <!-- Preconnect for faster loading -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Load fonts with display=swap for performance -->
  <link 
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap" 
    rel="stylesheet"
  >
</head>
```

### Font Display Strategy

- Use `font-display: swap` to prevent invisible text
- Load variable fonts when possible for smaller file sizes
- Subset fonts to only needed characters

## Typography Utilities

The design system provides responsive heading utilities:

```astro
<h1 class="heading-hero">Hero Title</h1>
<h2 class="heading-section">Section Title</h2>
```

These use the configured `--font-heading` variable automatically.

## Performance Tips

1. **Prefer system fonts** when possible (zero latency)
2. **Subset custom fonts** to reduce file size
3. **Use variable fonts** for multiple weights in one file
4. **Preload critical fonts** in `<head>`
5. **Use `font-display: swap`** to prevent FOIT

## Example Project Setup

### For Aaltjesdagen

```astro
---
// Load Aaltjesdagen fonts
---
<html data-brand="aaltjesdagen">
<head>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Automatically uses Outfit for headings, Inter for body -->
</body>
</html>
```

### For Generic Project (System Fonts)

```astro
<html>
  <!-- No font loading needed - uses system fonts -->
  <body>
    <h1>Fast, zero-latency typography!</h1>
  </body>
</html>
```
