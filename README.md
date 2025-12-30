# Aaltjesdagen Frontend

The modern, high-performance frontend for the Aaltjesdagen event website, built with **Astro**, **Tailwind CSS**, and **Storyblok**.

## 🚀 Tech Stack

- **Framework:** [Astro 5.0](https://astro.build)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with a custom Design System
- **CMS:** [Storyblok](https://www.storyblok.com)
- **Interactivity:** [Alpine.js](https://alpinejs.dev)
- **Package Manager:** NPM

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18.17.1 or higher)
- NPM

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory (if not present) and add your Storyblok token:

```env
STORYBLOK_TOKEN=your_token_here
```

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:4321` to view the site.

## 📂 Project Structure

- `src/components`: Reusable UI components (Storyblok & local)
- `src/layouts`: Page layouts (`BaseLayout.astro`)
- `src/pages`: Astro pages and routing (includes dynamic `[...slug].astro`)
- `src/storyblok`: Storyblok-specific components
- `src/styles`: Global styles and design system (`global.css`)
- `plans/`: Implementation plans and documentation

## 🎨 Design System

The project uses a comprehensive design system defined in `src/styles/global.css`. It includes:
- **Colors**: Primary, Secondary, Brand Accents.
- **Typography**: Responsive type scale.
- **Components**: `.card-base`, `.btn-primary`, `.glass` effects.
- **Animations**: Custom keyframe animations.

See `plans/design-system-analysis.md` for detailed documentation.

## 📦 Build & Deploy

To build the project for production:

```bash
npm run build
```

The output will be in the `dist/` directory.
