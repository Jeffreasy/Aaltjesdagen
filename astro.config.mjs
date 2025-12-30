import { defineConfig } from 'astro/config'
import { storyblok } from '@storyblok/astro'
import { loadEnv } from 'vite'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import basicSsl from '@vitejs/plugin-basic-ssl'
const env = loadEnv('', process.cwd(), 'STORYBLOK')

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
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
        feature: 'storyblok/visual/Feature',
        teaser: 'storyblok/visual/Teaser',
        hero: 'storyblok/visual/Hero',
        tussentekst: 'storyblok/visual/Tussentekst',
        parkeersectie: 'storyblok/visual/Parkeersectie',
        BereikbaarHero: 'storyblok/visual/BereikbaarHero',
        'Stallen fietsen': 'storyblok/visual/StallenFietsen',
        'Parkeren Auto': 'storyblok/visual/ParkerenAutos',
        'Openbaar vervoer': 'storyblok/visual/OpenbaarVervoer',
        toegankelijkheid: 'storyblok/visual/Toegankelijkheid',
        'In en rondom de binnenstad': 'storyblok/visual/InEnRondomDeBinnenstad',
        'EHBO-posten': 'storyblok/visual/EhboPosten',
        'Belangrijk om te weten': 'storyblok/visual/BelangrijkOmTeWeten',
        Intro: 'storyblok/visual/Intro',
        ProgrammaADF: 'storyblok/visual/ProgrammaADF',
      },
    }),
    tailwind(),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
})
