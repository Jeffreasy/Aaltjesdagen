import { defineConfig } from 'astro/config'
import { storyblok } from '@storyblok/astro'
import { loadEnv } from 'vite'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/static'  // CHANGED: specific import
import basicSsl from '@vitejs/plugin-basic-ssl'

const env = loadEnv('', process.cwd(), 'STORYBLOK')

export default defineConfig({
  output: 'static',
  adapter: vercel(),
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
        page: 'storyblok/structural/Page',
        grid: 'storyblok/structural/Grid',
        columns: 'storyblok/structural/Grid',
        gridmenu: 'storyblok/structural/Gridmenu',
        programmaDag1: 'storyblok/structural/ProgrammaDag',
        programmaDag2: 'storyblok/structural/ProgrammaDag',
        programmaDag3: 'storyblok/structural/ProgrammaDag',

        // Home
        hero: 'storyblok/visual/Home/Hero',
        Intro: 'storyblok/visual/Home/Intro',
        feature: 'storyblok/visual/Home/Feature',
        teaser: 'storyblok/visual/Home/Teaser',
        tussentekst: 'storyblok/visual/Home/Tussentekst',
        'Belangrijk om te weten': 'storyblok/visual/Home/BelangrijkOmTeWeten',

        // Bereikbaarheid
        BereikbaarHero: 'storyblok/visual/Bereikbaarheid/BereikbaarHero',
        'Stallen fietsen': 'storyblok/visual/Bereikbaarheid/StallenFietsen',
        'Parkeren Auto': 'storyblok/visual/Bereikbaarheid/ParkerenAutos',
        'Openbaar vervoer': 'storyblok/visual/Bereikbaarheid/OpenbaarVervoer',
        'In en rondom de binnenstad': 'storyblok/visual/Bereikbaarheid/InEnRondomDeBinnenstad',
        parkeersectie: 'storyblok/visual/Bereikbaarheid/Parkeersectie',
        'EHBO-posten': 'storyblok/visual/Bereikbaarheid/EhboPosten',
        toegankelijkheid: 'storyblok/visual/Bereikbaarheid/Toegankelijkheid',

        // ADF Muziekfestival
        ProgrammaADF: 'storyblok/visual/ADF Muziekfestival/ProgrammaADF',
      },
    }),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
})
