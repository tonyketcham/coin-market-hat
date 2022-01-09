const pwaConfiguration = {
  srcDir: 'src/server-middleware',
  filename: 'sw.js',
  includeManifestIcons: false,
  includeAssets: [
    'CoinMarketHat.png',
    'robots.txt',
    '/pwa/apple-icon-180.png',
    '/pwa/apple-splash-640-1136.jpg',
    '/pwa/apple-splash-750-1334.jpg',
    '/pwa/apple-splash-828-1792.jpg',
    '/pwa/apple-splash-1125-2436.jpg',
    '/pwa/apple-splash-1136-640.jpg',
    '/pwa/apple-splash-1170-2532.jpg',
    '/pwa/apple-splash-1242-2208.jpg',
    '/pwa/apple-splash-1284-2778.jpg',
    '/pwa/apple-splash-1242-2688.jpg',
    '/pwa/apple-splash-1334-750.jpg',
    '/pwa/apple-splash-2778-1284.jpg',
  ],
  // should be fixed (base + scope), since the root for nuxt is `/_nuxt/` folder and not `/`
  base: '/',
  scope: '/',
  manifest: {
    // should be fixed (id + scope + start_url), since the root for nuxt is `/_nuxt/` folder and not `/`
    id: '/',
    scope: '/',
    start_url: '/',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: '/pwa/manifest-icon-192.maskable.png', sizes: '192x192', type: 'image/png' },
      { src: '/pwa/manifest-icon-512.maskable.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/pwa/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    navigateFallback: '/',
    globPatterns: ['**/*.{js,mjs,css,html,ico,png,svg}'],
    globIgnores: ['**/sw*', '**/workbox-*', '**/manifest.webmanifest'],
  },
};

const pwaConfigurationGenerator = (
  build,
  pages,
  siteName = 'CoinMarketHat | Cryptocurrency Market Data',
  siteShortName = 'CoinMarketHat',
  siteDescription = "The coin market monitor that doesn't cap. An accessible, modern take on a crypto market tracker."
) => {
  const newPwaConfiguration = { ...pwaConfiguration };
  // eslint-disable-next-line dot-notation
  newPwaConfiguration.manifest['name'] = siteName;
  // eslint-disable-next-line dot-notation
  newPwaConfiguration.manifest['short_name'] = siteShortName;
  // eslint-disable-next-line dot-notation
  newPwaConfiguration.manifest['description'] = siteDescription;

  if (build) {
    newPwaConfiguration.workbox.globDirectory = '.output/public/';
    newPwaConfiguration.outDir = '.output/public/_nuxt/';
    pages &&
      (newPwaConfiguration.workbox.additionalManifestEntries = pages.reduce((acc, me) => {
        acc.push(me);
        return acc;
      }, []));
  } else {
    newPwaConfiguration.workbox.globDirectory = '.nuxt/dist/client/';
    newPwaConfiguration.outDir = '.nuxt/dist/client/';
  }

  return newPwaConfiguration;
};

export default pwaConfigurationGenerator;
