import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  meta: {
    title: 'CoinMarketHat',
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
        'btn',
        'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
      ],
    ],
  },
});
