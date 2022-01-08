import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  meta: {
    icon: 'public/CoinMarketHat.png',
  },
  buildModules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt'],
  vueuse: {
    ssrHandlers: true,
  },
  unocss: {
    uno: true,
    attributify: true,
    preflight: true,
    icons: {
      scale: 1.2,
    },
    theme: {
      colors: {
        fractional: {
          green: '#aaed4a',
        },
      },
    },

    shortcuts: [
      [
        'standard-input',
        'flex place-items-center bg-gray-100 dark:bg-true-gray-900 px-3 rounded-md border border-gray-200 dark:border-true-gray-800 border-opacity-5',
      ],
    ],
  },
});
