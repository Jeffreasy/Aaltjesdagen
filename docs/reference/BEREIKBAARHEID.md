# Bereikbaarheid Documentation

> **Context**: Accessibility Pages & Components (Storyblok).
> **Source**: [`src/storyblok/features/accessibility/`](../../src/storyblok/features/accessibility/)

This document references the specific components used for the "Bereikbaarheid" (Accessibility/Arrival) pages, including specific Storyblok integrations and shared internal components.

---

## Helper Components

These components are internal helpers to ensure consistency across the Accessibility block suite.

**Source**: [`src/components/accessibility/`](../../src/components/accessibility/)

### 1. [`IconBadge`](../../src/components/accessibility/IconBadge.astro)
Display emoji or SVG icons in styled badges with gradient backgrounds.
- **Variants**: Primary (Teal), Accent (Coral), Error (Red).
- **Animations**: Pulse, Hover-Rotate.

### 2. [`DecorativeUnderline`](../../src/components/accessibility/DecorativeUnderline.astro)
Adds decorative gradient or solid underlines to titles.
- **Widths**: sm, md, lg, full.

### 3. [`ContentCard`](../../src/components/accessibility/ContentCard.astro)
Flexible card wrapper supporting glassmorphism and elevated styling.
- **Variants**: Default, Glass, Elevated, Gradient.

---

## CMS Components (Storyblok)

These components map directly to Storyblok blocks.

| Component | Design Pattern | File |
|-----------|----------------|------|
| **Hero** | Glassmorphism card with accent bar | [`Hero.astro`](../../src/storyblok/features/accessibility/Hero.astro) |
| **FirstAid** | Medical theme with pulsing badge | [`FirstAid.astro`](../../src/storyblok/features/accessibility/FirstAid.astro) |
| **CityAccess** | Split layout with sticky title | [`CityAccess.astro`](../../src/storyblok/features/accessibility/CityAccess.astro) |
| **PublicTransport** | Gradient split design | [`PublicTransport.astro`](../../src/storyblok/features/accessibility/PublicTransport.astro) |
| **ParkingSection** | Centered card with icon badge | [`ParkingSection.astro`](../../src/storyblok/features/accessibility/ParkingSection.astro) |
| **CarParking** | Glassmorphism card with icon | [`CarParking.astro`](../../src/storyblok/features/accessibility/CarParking.astro) |
| **BicycleParking** | Sidebar accent design | [`BicycleParking.astro`](../../src/storyblok/features/accessibility/BicycleParking.astro) |
| **AccessibilityInfo** | Corner decorations design | [`AccessibilityInfo.astro`](../../src/storyblok/features/accessibility/AccessibilityInfo.astro) |

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
