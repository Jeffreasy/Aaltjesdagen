# Component Library Reference

Volledige overzicht van alle Storyblok en herbruikbare componenten in het project.

**Based on**: `astro.config.mjs` component mappings + actual component files

---

## 📋 Component Categorieën

| Categorie | Aantal | Locatie | Doel |
|-----------|--------|---------|------|
| **Structural** | 5 | `storyblok/structural/` | Page layout & grids |
| **Home** | 6 | `storyblok/visual/Home/` | Homepage componenten |
| **Bereikbaarheid** | 8 | `storyblok/visual/Bereikbaarheid/` | Accessibility info |
| **ADF Muziekfestival** | 1 | `storyblok/visual/ADF Muziekfestival/` | Festival programma |
| **Layout** | 3 | `components/layout/` | Navigation, Footer |
| **UI** | 5 | `components/ui/` | Interactive UI elements |
| **Common** | 3 | `components/common/` | Herbruikbare elementen |

> **Note**: Additional visual categories exist for future features: Braderie, Contact, Salsa, Sponsoring, Vacatures

---

## 🏗️ Structural Components

### Page
**File**: `storyblok/structural/Page.astro`  
**Storyblok**: `page`

Root component voor alle pagina's. Ontvangt Storyblok blok data en rendert child componenten.

### Grid
**File**: `storyblok/structural/Grid.astro`  
**Storyblok**: `grid`, `columns`, `gridmenu`

Responsive grid layout voor content organisatie.

### ProgrammaDag
**File**: `storyblok/structural/ProgrammaDag.astro`  
**Storyblok**: `programmaDag1`, `programmaDag2`, `programmaDag3`

Dagindeling voor evenement programma's.

---

## 🏠 Home Components

### Hero
**File**: `storyblok/visual/Home/Hero.astro`  
**Storyblok**: `hero`  
**Gebruik**: Homepage hero banner met gradient text

**Props**:
- `title` - Hero heading
- `subtitle` - Subheading text
- `date` - Event date
- `location` - Event location

**Design**: Grote heading met gradient text effect, centered layout

---

### Intro
**File**: `storyblok/visual/Home/Intro.astro`  
**Storyblok**: `Intro`

Introductie sectie met richtext content.

---

### Feature
**File**: `storyblok/visual/Home/Feature.astro`  
**Storyblok**: `feature`

Feature card met emoji icon, titel, en beschrijving.

**Design**: Glassmorphism card met hover lift effect

---

### Teaser
**File**: `storyblok/visual/Home/Teaser.astro`  
**Storyblok**: `teaser`

Promotional teaser sectie met accent gradient.

---

### Tussentekst
**File**: `storyblok/visual/Home/Tussentekst.astro`  
**Storyblok**: `tussentekst`

Content sectie met richtext en optionele CTA button.

---

### Belangrijk om te Weten
**File**: `storyblok/visual/Home/BelangrijkOmTeWeten.astro`  
**Storyblok**: `Belangrijk om te weten`

Important information highlight sectie.

---

## 🚲 Bereikbaarheid Components

### BereikbaarHero
**File**: `storyblok/visual/Bereikbaarheid/BereikbaarHero.astro`  
**Storyblok**: `BereikbaarHero`

Hero banner voor bereikbaarheid pagina met accent strip.

**Design**: Glassmorphism met top gradient accent bar

---

### Parkeren Auto
**File**: `storyblok/visual/Bereikbaarheid/ParkerenAutos.astro`  
**Storyblok**: `Parkeren Auto`

Auto parkeer informatie met richtext content.

**Design**: Glassmorphism card met car emoji icon badge

---

### Stallen Fietsen
**File**: `storyblok/visual/Bereikbaarheid/StallenFietsen.astro`  
**Storyblok**: `Stallen fietsen`

Fiets parkeer informatie.

**Design**: Side accent bar design met bicycle emoji

---

### Openbaar Vervoer
**File**: `storyblok/visual/Bereikbaarheid/OpenbaarVervoer.astro`  
**Storyblok**: `Openbaar vervoer`

Openbaar vervoer informatie.

**Design**: Gradient split layout met bus emoji

---

### In en Rondom de Binnenstad
**File**: `storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro`  
**Storyblok**: `In en rondom de binnenstad`

Navigatie info voor binnenstad.

**Design**: Split layout met sticky title (desktop)

---

### Parkeersectie
**File**: `storyblok/visual/Bereikbaarheid/Parkeersectie.astro`  
**Storyblok**: `parkeersectie`

Parking sectie met optionele afbeelding en link.

**Props**:
- `title` - Section title
- `tekst` - Plain text description
- `foto` - Optional image asset
- `link` - Optional URL link

**Design**: Centered card met parking emoji icon

---

### EHBO-posten
**File**: `storyblok/visual/Bereikbaarheid/EhboPosten.astro`  
**Storyblok**: `EHBO-posten`

Eerste hulp posten informatie.

**Design**: Medical theme met pulsing alert badge, red accent

---

### Toegankelijkheid  
**File**: `storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro`  
**Storyblok**: `toegankelijkheid`

Accessibility informatie voor event.

**Design**: Corner decorations pattern

---

## 🎵 ADF Muziekfestival Components

### ProgrammaADF
**File**: `storyblok/visual/ADF Muziekfestival/ProgrammaADF.astro`  
**Storyblok**: `ProgrammaADF`

Festival programma overzicht component.

---

## 🧭 Layout Components

### Navigation
**File**: `components/layout/Navigation.astro`

Main site navigation met responsive mobile menu.

**Features**:
- Desktop horizontal nav
- Mobile slide-in drawer
- Alpine.js state management
- Active page detection
- Social links in mobile menu

**Z-index**:
- Header: `var(--z-header)` (200)
- Mobile toggle: `var(--z-nav-mobile-toggle)` (600)
- Mobile backdrop: `var(--z-nav-mobile-backdrop)` (500)

---

### Footer
**File**: `components/layout/Footer.astro`

4-column site footer.

**Sections**:
1. Site description + social links
2. Quick links (navigation items)
3. Contact info
4. Newsletter signup

**Design**: Glassmorphism background, professional layout

---

### BackToTop
**File**: `components/layout/BackToTop.astro`

Scroll-to-top button.

**Features**:
- Appears after scrolling 300px
- Smooth scroll animation
- Alpine.js visibility toggle

---

## 🎨 UI Components

### ThemeToggle
**File**: `components/ui/ThemeToggle.astro`

Dark/light mode toggle button.

**Features**:
- System preference detection
- localStorage persistence
- Smooth icon transitions
- Sun/moon icons

**Implementation**:
```javascript
// Toggle theme
const currentTheme = document.documentElement.getAttribute('data-theme');
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
document.documentElement.setAttribute('data-theme', newTheme);
localStorage.setItem('theme', newTheme);
```

---

### Icon
**File**: `components/ui/Icon.astro`

Generic icon wrapper component voor consistente icon rendering.

---

### Link
**File**: `components/ui/Link.astro`

Reusable link component met styling en navigation logic.

---

### ProgramModal
**File**: `components/ui/ProgramModal.astro`

Modal dialog component voor programma details weergave.

**Features**:
- Alpine.js state management
- Accessible modal pattern
- Backdrop click to close

---

## 🧩 Common Components

**Location**: `components/common/`

Herbruikbare componenten voor gebruik door andere componenten.

---

## 📝 Storyblok Integration

### Component Mapping

Configuratie in `astro.config.mjs`:

```javascript
components: {
  // Structural
  'page': 'storyblok/structural/Page',
  'grid': 'storyblok/structural/Grid',
  
  // Home
  'hero': 'storyblok/visual/Home/Hero',
  'feature': 'storyblok/visual/Home/Feature',
  
  // Bereikbaarheid
  'BereikbaarHero': 'storyblok/visual/Bereikbaarheid/BereikbaarHero',
  'Parkeren Auto': 'storyblok/visual/Bereikbaarheid/ParkerenAutos',
  // etc.
}
```

### Field Conventions

**Standaard fields** (meeste componenten):
- `title` (text) - Component heading
- `tekst` (richtext) - Main content

**Uitzonderingen**:
- `BereikbaarHero`: gebruikt `tekst` (textarea) voor plain text
- `Parkeersectie`: heeft extra `foto` en `link` fields
- `Hero`: heeft `subtitle`, `date`, `location` fields

### Richtext Rendering

```astro
---
import { renderRichText } from "@storyblok/astro";

const { blok } = Astro.props;
const renderedText = blok.tekst ? renderRichText(blok.tekst) : "";
---

<div class="prose-base prose-primary">
  <Fragment set:html={renderedText} />
</div>
```

**Prose variants**:
- `.prose-primary` - Teal links (default)
- `.prose-accent` - Coral links
- `.prose-error` - Red links (medical)

---

## 🎨 Design Patterns

### Glassmorphism Cards

Meeste Bereikbaarheid componenten gebruiken:

```css
background: color-mix(in srgb, var(--bg-elevated), transparent 10%);
backdrop-filter: blur(12px);
border: 1px solid var(--border-primary);
```

### Icon Badges

Gradient-filled rounded squares met emoji:

```html
<div class="icon-badge">
  <span>🚗</span>
</div>
```

**Style**:
- Size: 4.5-5rem square
- Border-radius: 1-1.25rem
- Gradient background (theme-colored)
- Optional rotation (-3deg)

### Decorative Elements

- **Accent bars**: Top/side gradient strips
- **Underlines**: Small gradient bars below titles
- **Corner decorations**: L-shaped elements
- **Pulsing badges**: Animated indicators

---

## 📱 Responsive Patterns

Alle componenten volgen mobile-first design:

```css
/* Mobile */
padding: 2rem;
grid-template-columns: 1fr;

/* Tablet (768px+) */
padding: 3rem 2.5rem;

/* Desktop (1024px+) */
padding: 4rem 3.5rem;
grid-template-columns: 1fr 2fr;
```

---

## 🔗 Related Documentation

- **Design System**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Bereikbaarheid README**: `src/storyblok/visual/Bereikbaarheid/README.md`
- **Prose System**: `src/styles/prose/README.md`

---

**Based on**: astro.config.mjs + actual component files  
**Last Updated**: 31 december 2024
