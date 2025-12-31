# Development Guide

Best practices, workflows, en troubleshooting voor Aaltjesdagen Frontend development.

---

## 🚀 Development Workflow

### 1. Setup

```bash
# Clone repository
git clone <repository-url>
cd Frontend

# Install dependencies
npm install

# Create .env file
echo "STORYBLOK_TOKEN=your_token_here" > .env

# Start dev server
npm run dev
```

### 2. Development Server

```bash
npm run dev
```

- Runs on `https://localhost:4321` (HTTPS enabled voor Storyblok)
- Hot module reload (HMR) enabled
- Storyblok Visual Editor geactiveerd

### 3. Testing Changes

**Local Testing**:
- Test in Chrome, Firefox, Safari
- Test dark mode toggle
- Test responsive breakpoints (mobile, tablet, desktop)
- Verify Storyblok Visual Editor integration

**Storyblok Testing**:
- Open Storyblok Visual Editor
- Maak test content wijzigingen
- Verifieer live preview updates

### 4. Build

```bash
npm run build
```

Output: `dist/` folder

**Preview build**:
```bash
npm run preview
```

---

## 🎨 Styling Guidelines

### Use Design Tokens

❌ **Niet doen**:
```css
color: #50b0ae;
padding: 16px;
```

✅ **Wel doen**:
```css
color: var(--color-primary);
padding: var(--space-md);
```

### Utility Classes Priority

1. **Design System utilities** (`.card-base`, `.btn-primary`, etc.)
2. **Tailwind utilities** voor layout (`flex`, `grid`, etc.)
3. **Scoped CSS** voor component-specifieke styling

### Responsive Design

Mobile-first approach:

```css
/* Base = Mobile */
padding: 2rem;

/* Tablet */
@media (min-width: 768px) {
  padding: 3rem;
}

/* Desktop */
@media (min-width: 1024px) {
  padding: 4rem;
}
```

Of met Tailwind:
```html
<div class="p-8 md:p-12 lg:p-16">
```

---

## 🧩 Component Development

### Creating a New Component

**1. Choose location**:
- Storyblok component → `src/storyblok/visual/[Category]/`
- Reusable component → `src/components/common/`
- Layout component → `src/components/layout/`

**2. Create file**: `ComponentName.astro`

**3. Standard structure**:

```astro
---
import type { HTMLAttributes } from 'astro/types';
import { storyblokEditable, renderRichText } from "@storyblok/astro";

interface Props extends HTMLAttributes<'div'> {
  blok?: any; // Voor Storyblok componenten
}

const { blok, ...rest } = Astro.props;
const title = blok?.title || "";
const tekst = blok?.tekst;
const renderedText = tekst ? renderRichText(tekst) : "";
---

<section {...storyblokEditable(blok)} class="section-spacing" {...rest}>
  <div class="container-custom">
    {title && <h2 class="heading-section">{title}</h2>}
    
    {renderedText && (
      <div class="prose-base prose-primary">
        <Fragment set:html={renderedText} />
      </div>
    )}
  </div>
</section>

<style>
  /* Scoped styles here */
</style>
```

**4. Register in Storyblok** (`astro.config.mjs`):

```javascript
components: {
  'component_name': 'storyblok/visual/Category/ComponentName',
}
```

---

## ⚡ Performance Best Practices

### Backdrop-Filter Usage

**Probleem**: Veel `backdrop-filter: blur()` kan performance beïnvloeden.

**Guideline**:
- Maximum 12px blur voor de meeste gevallen
- 16px+ alleen voor hero elementen
- Test op mobiele devices

**Progressive Enhancement**:
```css
/* Fallback zonder backdrop-filter */
background: var(--bg-elevated);

/* Enhanced met backdrop-filter support */
@supports (backdrop-filter: blur(12px)) {
  background: var(--bg-overlay);
  backdrop-filter: blur(12px);
}
```

### Image Optimization

Gebruik Storyblok's image service:

```javascript
const optimizedImageUrl = imageUrl
  ? `${imageUrl}/m/800x600/filters:quality(80):format(webp)`
  : null;
```

**Parameters**:
- `/m/WIDTHxHEIGHT/` - Resize
- `quality(80)` - Compression (70-85 recommended)
- `format(webp)` - Modern format

### CSS Inlining

**CRITICAL**: CSS inlining is **disabled** in `astro.config.mjs`:

```javascript
build: {
  inlineStylesheets: 'never',  // Prevents gradient text bugs
}
```

Dit voorkomt problemen met gradient text rendering op Vercel.

---

## 🐛  Troubleshooting

### Text Niet Zichtbaar op Vercel

**Symptoom**: Text met gradient clip is invisible in production

**Oorzaak**: CSS wordt geïnlined, breaking gradient text effect

**Fix**: Zorg dat `inlineStylesheets: 'never'` staat in `astro.config.mjs`

---

### Dark Mode Niet Werkend

**Check**:
1. `ThemeToggle` component toegevoegd aan layout?
2. Theme wordt opgeslagen in localStorage?
3. CSS variabelen zijn gedefinieerd voor dark mode?

**Debug**:
```javascript
// In browser console
console.log(document.documentElement.getAttribute('data-theme'));
console.log(localStorage.getItem('theme'));
```

---

### Storyblok Visual Editor Niet Werkend

**Check**:
1. HTTPS enabled? (requirement voor Storyblok)
2. `STORYBLOK_TOKEN` correct in `.env`?
3. Component geregistreerd in `astro.config.mjs`?
4. `{...storyblokEditable(blok)}` toegevoegd aan root element?

---

### Z-Index Problemen

**Check z-index hierarchy**:

```css
--z-header: 200        /* Navigation */
--z-dropdown: 300      /* Dropdowns */
--z-modal-backdrop: 500 /* Modal backdrop */
--z-modal: 600         /* Modal content */
```

**Gebruik design tokens**:
```css
z-index: var(--z-header);  /* ✅ Good */
z-index: 999;              /* ❌ Bad */
```

---

## 🧪 Testing Checklist

### Pre-Deploy Checklist

- [ ] Test in Chrome, Firefox, Safari
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Test dark mode
- [ ] Test Storyblok Visual Editor
- [ ] Run `npm run build` succesvol
- [ ] Preview build lokaal werkt
- [ ] Geen console errors
- [ ] Images laden correct
- [ ] Links werken
- [ ] Forms submitten

### Accessibility Checklist

- [ ] Headings hebben logische hierarchy (`h1` → `h2` → `h3`)
- [ ] Images hebben alt text
- [ ] Links hebben descriptive text
- [ ] Focus states zijn zichtbaar
- [ ] Keyboard navigation werkt
- [ ] Color contrast voldoet aan WCAG AA (4.5:1 voor text)
- [ ] `prefers-reduced-motion` wordt gerespecteerd

---

## 📊 Code Style

### Naming Conventions

**Files**:
- Components: `PascalCase.astro` (e.g., `BereikbaarHero.astro`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)

**CSS Classes**:
- Utility classes: `kebab-case` (e.g., `.card-base`)
- BEM voor complexe componenten: `.block__element--modifier`

**CSS Variables**:
- Design tokens: `--category-name` (e.g., `--color-primary`, `--z-header`)

### Formatting

- **Indentation**: 2 spaces
- **Line length**: Max 100 characters (als mogelijk)
- **Quotes**: Single quotes voor JavaScript, double quotes voor HTML attributes

---

## 🔧 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Astro specific
npm run astro check  # Type check
npm run astro sync   # Sync Storyblok types
```

---

## 📝 Git Workflow

### Branch Strategy

- `main` - Production branch (auto-deploy naar Vercel)
- `develop` - Development branch
- Feature branches: `feature/component-name`
- Bugfix branches: `bugfix/issue-description`

### Commit Messages

Format: `type: description`

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Styling changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvement

**Examples**:
```
feat: add ParkerenAutos component
fix: dark mode gradient text visibility
docs: update component documentation
style: improve mobile navigation spacing
```

---

## 🚀 Deployment

### Vercel

Automatische deployment bij push naar `main` branch.

**Build settings** (auto-detected):
- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`

**Environment variables**:
- `STORYBLOK_TOKEN` - Configured in Vercel dashboard

---

## 🔗 Resources

- **Astro Docs**: https://docs.astro.build
- **Storyblok Docs**: https://www.storyblok.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Alpine.js Docs**: https://alpinejs.dev

---

**Based on**: Actual development workflows and common issues  
**Last Updated**: 31 december 2024
