# 🎡 Aaltjesdagen Frontend

> The official high-performance frontend for the **Aaltjesdagen Harderwijk** event website. Built for speed, accessibility, and a premium user experience.

![CI Status](https://github.com/Jeffreasy/Aaltjesdagen/actions/workflows/ci.yml/badge.svg)
![A11y Check](https://github.com/Jeffreasy/Aaltjesdagen/actions/workflows/a11y.yml/badge.svg)
![Vercel](https://vercelbadge.vercel.app/api/jeffreasy/aaltjesdagen)
![Framework](https://img.shields.io/badge/Built%20With-Astro%205.0-orange?logo=astro)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue?logo=tailwindcss)
![CMS](https://img.shields.io/badge/CMS-Storyblok-00b3b0?logo=storyblok)
![TypeScript](https://img.shields.io/badge/Languages-TypeScript-blue?logo=typescript)

This repository houses the modern frontend application for the Aaltjesdagen event. It features a custom **Design System 2.0**, fully integrated as a local package (`@aaltjesdagen/ui`), ensuring consistent branding and high-performance component reuse.

---

## 🚀 Key Features

- **⚡ Zero-JS by Default**: Powered by **Astro**, delivering static HTML for maximum performance with islands of interactivity where needed.
- **🎨 Design System 2.0**: A dedicated, reusable UI package (`@aaltjesdagen/ui`) implementing our "Breathable & Sophisticated" theme with **Tailwind CSS**.
- **🌗 Dark Mode Specific**: First-class dark mode support with deep teal styling and glassmorphism effects.
- **🧱 Component-Driven**: Modular visual blocks managed via **Storyblok** for flexible content editing.
- **🏃 Interactive Elements**: Lightweight interactions powered by **Alpine.js** (Modals, Filter Bars, Mobile Menu).
- **♿ Accessible**: Built with WCAG best practices, including semantic HTML, focus management, and reduced motion support.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
|----------|------------|-------------|
| **Core** | [Astro 5.0](https://astro.build) | Static Site Generator & Islands Architecture |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS framework |
| **CMS** | [Storyblok](https://www.storyblok.com) | Headless Content Management |
| **State** | [Alpine.js](https://alpinejs.dev) | Lightweight JavaScript framework for interactivity |
| **Package** | `@aaltjesdagen/ui` | Custom local design system package |

---

## 📂 Project Structure

We follow a modular, monorepo-style structure to separate the core application from the reusable design system.

```bash
├── 📁 src/
│   ├── 📁 components/      # Application-specific components
│   ├── 📁 layouts/         # Page layouts (BaseLayout.astro)
│   ├── 📁 pages/           # File-based routing ([...slug].astro)
│   └── 📁 storyblok/       # Storyblok CMS Components (Features, Sections, UI)
├── 📁 packages/
│   └── 📁 design-system/   # 🎨 @aaltjesdagen/ui (Shared UI Library)
│       ├── 📁 components/  # Atomic UI components (Link, Button, Modal)
│       ├── 📁 styles/      # CSS tokens & Tailwind Config
│       └── 📁 utils/       # Shared helpers (Dates, Images)
└── 📁 docs/                # Project documentation
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v18.17.1 or higher
- **NPM**: v9+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/aaltjesdagen-frontend.git
   cd aaltjesdagen-frontend
   ```

2. **Install dependencies:**
   *(This also links the local `@aaltjesdagen/ui` package)*
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file in the root directory:
   ```env
   STORYBLOK_TOKEN=your_storyblok_public_token
   ```

### Development

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:4321` to view the application.

### Build for Production

To create a production-ready build:

```bash
npm run build
```

The output will be generated in the `dist/` directory, ready for deployment.

---

## 🎨 Design System Usage

This project relies on the **`@aaltjesdagen/ui`** package.

**Importing Components:**
```astro
import { Link, Icon, ProgramModal } from "@aaltjesdagen/ui/components";
```

**Using Utilities:**
```ts
import { formatDate, storyblokImage } from "@aaltjesdagen/ui/utils";
```

**Styling:**
The design system exposes a pure Tailwind preset. You can use utility classes like `text-primary`, `bg-base`, or our custom plugin classes like `.btn-primary` and `.glass` directly in your markup.

_For full documentation, see [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)._

---

## 🧪 Testing

This project maintains professional quality standards with comprehensive testing:

### Test Suite
- **Unit Tests**: 26 tests (Vitest)
  - Logger utilities
  - Performance monitoring
  - Date formatting
- **E2E Tests**: 30+ tests (Playwright)
  - Navigation flows (Desktop + Mobile)
  - Accessibility (WCAG AA compliance)
  - Legal pages

### Commands
```bash
# Run all tests
npm test

# Unit tests only
npm run test:unit

# E2E tests only
npm run test:e2e

# CI-optimized (Chromium only)
npm run test:ci
```

### Continuous Integration
GitHub Actions automatically runs:
- ✅ Unit tests on every push
- ✅ E2E tests (Chromium) on every push
- ✅ Full accessibility audit weekly
- ✅ Build verification before deployment

---

## 🤝 Contributing

1. **Fork the repo**
2. **Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📄 License

&copy; 2026 Stichting Aaltjesdagen. All rights reserved.
