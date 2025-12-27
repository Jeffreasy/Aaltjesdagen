import { defineConfig } from 'astro/config'
import { storyblok } from '@storyblok/astro'
import { loadEnv } from 'vite'
import tailwind from '@astrojs/tailwind'
import basicSsl from '@vitejs/plugin-basic-ssl'
const env = loadEnv('', process.cwd(), 'STORYBLOK')

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN || 'vgdfUWE4CP2d3ZXnPtoikQtt',
      apiOptions: {
        region: 'eu',
      },
      bridge: {
        customParent: 'https://app.storyblok.com',
      },
      components: {
        page: 'storyblok/structural/Page',
        grid: 'storyblok/structural/Grid',
        programmaDag1: 'storyblok/structural/ProgrammaDag',
        programmaDag2: 'storyblok/structural/ProgrammaDag',
        programmaDag3: 'storyblok/structural/ProgrammaDag',
        feature: 'storyblok/visual/Feature',
        teaser: 'storyblok/visual/Teaser',
        hero: 'storyblok/visual/Hero',
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
