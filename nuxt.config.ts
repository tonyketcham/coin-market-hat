import { defineNuxtConfig } from 'nuxt3';
import { VitePWA } from 'vite-plugin-pwa';
import pwaConfigGen from './pwa-config';

export default defineNuxtConfig({
  meta: {
    meta: [{ name: 'theme-color', content: '#000000' }],
    link: [
      { rel: 'icon', href: '/direct-link.svg', type: 'image/svg+xml' },
      // required manifest, apple-touch-icon and mask-icon: pwa
      // add manifest.webmanifest only on build?
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'apple-touch-icon', href: '/pwa/apple-icon-180.png', sizes: '180x180' },
      { rel: 'mask-icon', href: '/pwa/direct-link.svg', color: '#000000' },
    ],
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
        'flex place-items-center bg-gray-100 dark:bg-true-gray-900 px-3 rounded-md border border-gray-200 dark:border-true-gray-800 border-opacity-5 hover:bg-gray-200 dark:hover:bg-true-gray-800',
      ],
    ],
  },

  // server middleware to serve sw.js, workbox-**.js and manifest.webmanifest
  // serverMiddleware: [{ path: '/', handler: '@/server-middleware/sw.js' }],

  vite: {
    plugins: [VitePWA(pwaConfigGen(false, undefined))],
  },
});
