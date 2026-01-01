import { defineConfig } from 'astro/config'
import { storyblok } from '@storyblok/astro'
import { loadEnv } from 'vite'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'  // Using recommended import path
import { storyblokComponentMap } from './src/config/storyblok.mjs'


const env = loadEnv('', process.cwd(), 'STORYBLOK')

export default defineConfig({
  site: 'https://www.aaltjesdagen.nl',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
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
      components: storyblokComponentMap,
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
