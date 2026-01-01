# Bereikbaarheid Documentation

> **Context**: Accessibility Pages & Components (Storyblok).
> **Source**: [`src/storyblok/visual/Bereikbaarheid/`](../../src/storyblok/visual/Bereikbaarheid/)

This document references the specific components used for the "Bereikbaarheid" (Accessibility/Arrival) pages, including specific Storyblok integrations and shared internal components.

---

## Helper Components

These components are internal helpers to ensure consistency across the Bereikbaarheid block suite.

**Source**: [`src/components/bereikbaarheid/`](../../src/components/bereikbaarheid/)

### 1. [`IconBadge`](../../src/components/bereikbaarheid/IconBadge.astro)
Display emoji or SVG icons in styled badges with gradient backgrounds.
- **Variants**: Primary (Teal), Accent (Coral), Error (Red).
- **Animations**: Pulse, Hover-Rotate.

### 2. [`DecorativeUnderline`](../../src/components/bereikbaarheid/DecorativeUnderline.astro)
Adds decorative gradient or solid underlines to titles.
- **Widths**: sm, md, lg, full.

### 3. [`ContentCard`](../../src/components/bereikbaarheid/ContentCard.astro)
Flexible card wrapper supporting glassmorphism and elevated styling.
- **Variants**: Default, Glass, Elevated, Gradient.

---

## CMS Components (Storyblok)

These components map directly to Storyblok blocks.

| Component | Design Pattern | File |
|-----------|----------------|------|
| **BereikbaarHero** | Glassmorphism card with accent bar | [`BereikbaarHero.astro`](../../src/storyblok/visual/Bereikbaarheid/BereikbaarHero.astro) |
| **EhboPosten** | Medical theme with pulsing badge | [`EhboPosten.astro`](../../src/storyblok/visual/Bereikbaarheid/EhboPosten.astro) |
| **InEnRondomDeBinnenstad** | Split layout with sticky title | [`InEnRondomDeBinnenstad.astro`](../../src/storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad.astro) |
| **OpenbaarVervoer** | Gradient split design | [`OpenbaarVervoer.astro`](../../src/storyblok/visual/Bereikbaarheid/OpenbaarVervoer.astro) |
| **Parkeersectie** | Centered card with icon badge | [`Parkeersectie.astro`](../../src/storyblok/visual/Bereikbaarheid/Parkeersectie.astro) |
| **ParkerenAutos** | Glassmorphism card with icon | [`ParkerenAutos.astro`](../../src/storyblok/visual/Bereikbaarheid/ParkerenAutos.astro) |
| **StallenFietsen** | Sidebar accent design | [`StallenFietsen.astro`](../../src/storyblok/visual/Bereikbaarheid/StallenFietsen.astro) |
| **Toegankelijkheid** | Corner decorations design | [`Toegankelijkheid.astro`](../../src/storyblok/visual/Bereikbaarheid/Toegankelijkheid.astro) |

### Color Themes
- **Primary (Blue/Teal)**: General parking.
- **Secondary (Purple)**: Public transport.
- **Accent (Yellow/Coral)**: Cycling & accessibility.
- **Error (Red)**: Emergency services.

---

## Implementation Details

### Glassmorphism Pattern
```css
background: color-mix(in srgb, var(--bg-elevated), transparent 10%);
backdrop-filter: blur(12px);
border: 1px solid var(--border-primary);
```

### Data Handling
Most components use the `tekst` (RichText) and `title` fields from Storyblok. Some exceptions (Hero, Parkeersectie) use plain text fields.

### Accessibility
- Use of semantic HTML (`<section>`, `<h1>`).
- `prefers-reduced-motion` support for animations.
- WCAG 2.1 AA contrast ratios.

---

**Original Doc Updated:** January 1, 2026
