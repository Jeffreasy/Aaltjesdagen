# Component Library

> **Quick Reference**:
> - **Shared UI**: [`@aaltjesdagen/ui`](../packages/design-system/src/components/)
> - **CMS Blocks**: [`src/storyblok/`](../src/storyblok/)

This document serves as the catalog for all components available in the project, separated by their scope.

---

## 📦 Shared UI Package (`@aaltjesdagen/ui`)

These components are reusable primitives imported from the design system package.

**Import**:
```typescript
import { Link, Icon, FilterBar, ProgramModal } from "@aaltjesdagen/ui/components";
```

### `Link`
A smart link component that handles internal/external routing and various visual styles.
- **Props**: `href`, `variant` (primary/accent/secondary), `size`
- **Usage**: General navigation, CTAs.

### `FilterBar`
A glassmorphism-styled sticky bar for filtering lists (used in Program pages).
- **Props**: `locations` (string[]), `activeFilter` (bind via Alpine)
- **Features**: Horizontal scroll, active states, location counts.

### `ProgramModal`
A dialog for displaying detailed event info.
- **State**: Controlled via Alpine.js (`modalOpen`).
- **Props**: None (Context based).

### `ThemeToggle`
Switch between Light and Dark mode.
- **Location**: Header / Mobile Menu.
- **Persist**: Uses `localStorage`.

---

## 🧱 Application Components (Storyblok)

These components are bound to specific Storyblok blocks defined in `astro.config.mjs`.

## 🧱 Application Components (Storyblok)

These components are bound to specific Storyblok blocks defined in `astro.config.mjs`.

### 🏗️ Structural (`src/storyblok/structural/`)
| Component | Storyblok Key | Description |
|-----------|---------------|-------------|
| **Page** | `page` | Root layout wrapper for dynamic pages. |
| **Grid** | `grid` | Flexible grid system for structural layout. |
| **GridMenu** | `Gridmenu` | Navigation blocks. |
| **AccessibilityGrid** | `BereikbaarheidGrid` | Layout wrapper for accessibility sections. |

### 🖼️ Sections (`src/storyblok/sections/`)
| Component | Storyblok Key | Description |
|-----------|---------------|-------------|
| **Hero** | `hero` | Large visual header with date/location emphasis. |
| **Intro** | `Intro` | Introduction text with rich media support. |
| **ImportantInfo** | `BelangrijkOmTeWeten` | Alert/Info section with emphasis. |

### 🧩 UI (`src/storyblok/ui/`)
| Component | Storyblok Key | Description |
|-----------|---------------|-------------|
| **Feature** | `feature` | Icon-based feature highlights (Glassmorphism). |
| **Teaser** | `teaser` | Gradient-rich promotional section. |
| **SectionText** | `Tussentekst` | Simple prose content block. |

### 📅 Program Features (`src/storyblok/features/program/`)
| Component | Storyblok Key | Description |
|-----------|---------------|-------------|
| **DayProgram** | `ProgrammaDag` | Complex tabular/list view for daily schedules. |
| **FestivalProgram** | `ProgrammaADF` | Overview of the festival program. |

### 🚲 Accessibility Features (`src/storyblok/features/accessibility/`)
| Component | Storyblok Key | Description |
|-----------|---------------|-------------|
| **Hero** | `BereikbaarHero` | Header specifically for accessibility pages. |
| **CarParking** | `Parkeren Auto` | Information card with car emoji branding. |
| **BicycleParking** | `Stallen fietsen` | Information card with bicycle branding. |
| **FirstAid** | `EHBO-posten` | Critical info card with medical/alert styling. |
| **PublicTransport** | `OpenbaarVervoer` | Train/Bus information. |
| **CityAccess** | `In en rondom de binnenstad` | Information about city access limits. |
| **ParkingSection** | `parkeersectie` | Layout wrapper for parking details. |
| **AccessibilityInfo** | `toegankelijkheid` | General accessibility information. |

---

## 🧭 Layout Components
Hosted in `src/components/layout/`.

### `Navigation.astro`
The main site header.
- **Features**: Responsive (Hamburger menu on mobile), transparent-to-glass scroll effect.
- **Dependencies**: `@aaltjesdagen/ui/components` (ThemeToggle).

### `Footer.astro`
Site-wide footer.
- **Content**: Social links, contact info, quick navigation.
- **Style**: Dark/Glass integrated.

### `SEO.astro`
Head management component.
- **Props**: `title`, `description`, `image`.
- **Logic**: Handles canonical URLs and OpenGraph tags.

---


---

## 📚 Detailed Reference Documentation

For deep dives into specific subsystems, see the reference guides:

- **[Layout System](./reference/LAYOUT_SYSTEM.md)**: Architecture of Navigation, Footer, and Shell.
- **[Constants & Data](./reference/CONSTANTS.md)**: Everything about `site.ts`, Social Links, and Metadata.
- **[Common Utilities](./reference/COMMON_COMPONENTS.md)**: SocialLinks, Newsletter Forms, etc.
- **[Bereikbaarheid](./reference/BEREIKBAARHEID.md)**: Deep dive into the Accessibility pages and helpers.
- **[Prose System](./reference/PROSE_SYSTEM.md)**: Typography details for Richtext.

**Last Updated**: January 1, 2026
