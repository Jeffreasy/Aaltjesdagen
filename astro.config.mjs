import { defineConfig } from 'astro/config'
import { storyblok } from '@storyblok/astro'
import { loadEnv } from 'vite'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'  // Using recommended import path


const env = loadEnv('', process.cwd(), 'STORYBLOK')

export default defineConfig({
  site: 'https://www.aaltjesdagen.nl',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  build: {
    inlineStylesheets: 'never',  // CRITICAL: Never inline CSS
  },
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN || 'vgdfUWE4CP2d3ZXnPtoikQtt',
      apiOptions: {
        region: 'eu',
      },
      bridge: {
        customParent: 'https://app.storyblok.com',
      },
      enableFallbackComponent: true,
      components: {
        // Structural (Layouts)
        Page: 'storyblok/structural/Page',
        Grid: 'storyblok/structural/Grid',
        Gridmenu: 'storyblok/structural/GridMenu',
        BereikbaarheidGrid: 'storyblok/structural/AccessibilityGrid',

        // Generic UI
        Feature: 'storyblok/ui/Feature',
        Teaser: 'storyblok/ui/Teaser',
        Tussentekst: 'storyblok/ui/SectionText',

        // Sections
        hero: 'storyblok/sections/Hero',
        Intro: 'storyblok/sections/Intro',
        BelangrijkOmTeWeten: 'storyblok/sections/ImportantInfo',

        // Features (Domain Specific)
        ProgrammaDag: 'storyblok/features/program/DayProgram',
        ProgrammaADF: 'storyblok/features/program/FestivalProgram',

        // Bereikbaarheid (Feature Group)
        BereikbaarHero: 'storyblok/features/accessibility/Hero',
        'Stallen fietsen': 'storyblok/features/accessibility/BicycleParking',
        'Parkeren Auto': 'storyblok/features/accessibility/CarParking',
        'OpenbaarVervoer': 'storyblok/features/accessibility/PublicTransport',
        'In en rondom de binnenstad': 'storyblok/features/accessibility/CityAccess',
        parkeersectie: 'storyblok/features/accessibility/ParkingSection',
        'EHBO-posten': 'storyblok/features/accessibility/FirstAid',
        toegankelijkheid: 'storyblok/features/accessibility/AccessibilityInfo',
      },
    }),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  image: {
    domains: ['a.storyblok.com'],
  },
  vite: {
    server: {
      https: false,  // Disabled HTTPS for local dev to avoid SSL errors
    },
  },
})
