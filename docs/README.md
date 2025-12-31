# Aaltjesdagen Frontend

Modern, high-performance frontend voor het Aaltjesdagen evenement in Harderwijk, gebouwd met **Astro**, **Tailwind CSS**, en **Storyblok CMS**.

## 🚀 Quick Start

### Installatie

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Bezoek `http://localhost:4321` om de site te bekijken.

### Build voor Productie

```bash
npm run build
```

Output komt in de `dist/` folder.

---

## 📦 Tech Stack

| Technology | Versie | Gebruik |
|------------|--------|---------|
| **Astro** | 5.16.6 | Static site framework |
| **Tailwind CSS** | 3.4.19 | Utility-first styling |
| **Storyblok** | 7.3.7 | Headless CMS |
| **Alpine.js** | 3.15.3 | Lightweight interactivity |
| **Vercel** | 9.0.2 | Deployment platform |

---

## 📁 Project Structuur

```
Frontend/
├── src/
│   ├── assets/              # Static assets (images, icons)
│   ├── components/          # Herbruikbare componenten
│   │   ├── bereikbaarheid/  # Bereikbaarheid-specifieke componenten
│   │   ├── common/          # Gedeelde componenten
│   │   ├── layout/          # Layout componenten (Nav, Footer)
│   │   └── ui/              # UI componenten (ThemeToggle, etc.)
│   ├── constants/           # Application constants
│   ├── layouts/             # Page layouts
│   │   └── BaseLayout.astro # Hoofd layout template
│   ├── pages/               # Routing
│   │   ├── [...slug].astro  # Dynamische Storyblok pagina's
│   │   └── index.astro      # Homepage
│   ├── services/            # API services & integrations
│   ├── storyblok/           # Storyblok componenten
│   │   ├── structural/      # Structurele componenten (Grid, Page)
│   │   └── visual/          # Visual componenten (Hero, Feature)
│   ├── styles/              # Global styling
│   │   ├── global.css       # Design System 2.0
│   │   ├── prose/           # Richtext styling
│   │   └── animations.css   # Keyframe animaties
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── docs/                    # Documentatie (jij bent hier!)
├── public/                  # Statische assets
└── plans/                   # Archived planning documents
```

---

## 🎨 Design System

Het project gebruikt **Design System 2.0** met een "Breathable & Sophisticated" thema:

- **Primary Color**: Teal (`#50b0ae`) - Modern, schoon, fris
- **Accent Color**: Coral (`#ff7e67`) - Warm, high-contrast voor CTA's
- **Fonts**: 
  - Headings: `Outfit`
  - Body: `Inter`

Voor meer details, zie **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**.

---

## 🧩 Componenten

Het project is georganiseerd in component categorieën:

### Visual Componenten
- **Home**: Hero, Intro, Feature, Teaser, Tussentekst
- **Bereikbaarheid**: BereikbaarHero, ParkerenAutos, OpenbaarVervoer, etc.
- **ADF Muziekfestival**: ProgrammaADF

### Layout Componenten
- **Navigation**: Responsive header met mobile menu
- **Footer**: 4-kolom footer met social links
- **BackToTop**: Scroll-to-top button

### UI Componenten
- **ThemeToggle**: Dark/light mode switch

Voor volledige component lijst en gebruik, zie **[COMPONENTS.md](./COMPONENTS.md)**.

---

## 📝 Storyblok CMS

### Setup

Maak een `.env` bestand in de root:

```env
STORYBLOK_TOKEN=jouw_token_hier
```

### Component Mapping

Storyblok componenten zijn gekoppeld aan Astro bestanden in `astro.config.mjs`:

```javascript
components: {
  'hero': 'storyblok/visual/Home/Hero',
  'feature': 'storyblok/visual/Home/Feature',
  // etc.
}
```

Componenten zijn gecategoriseerd op domein (Home, Bereikbaarheid, ADF).

---

## 🌙 Dark Mode

Automatische dark mode detectie gebaseerd op systeem voorkeur, met manual toggle via `ThemeToggle` component.

Dark mode kleuren zijn geoptimaliseerd voor:
- Hoge contrast in low-light situaties
- Behoud van merk identiteit
- WCAG AA compliance

---

## 🚢 Deployment

Het project is geconfigureerd voor **Vercel** deployment:

```bash
npm run build
```

Vercel detecteert automatisch Astro en gebruikt de juiste build settings.

**Kritieke configuratie**:
- `output: 'static'` in `astro.config.mjs`
- `inlineStylesheets: 'never'` (voorkomt CSS gradient bugs)

---

## 🛠️ Development

Voor development workflows, testing, en troubleshooting, zie **[DEVELOPMENT.md](./DEVELOPMENT.md)**.

---

## 📚 Documentatie

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Colors, typography, components
- **[COMPONENTS.md](./COMPONENTS.md)** - Component library reference  
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Workflows, testing, best practices

---

**Laatst bijgewerkt**: 31 december 2024  
**Maintainer**: Jeffrey Lavente
