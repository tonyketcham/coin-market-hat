/* eslint-disable no-console */
import { copyFileSync } from 'fs';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { resolveConfig } from 'vite';
import pwaConfigurationGenerator from '../pwa-config.js';

const buildPwa = async () => {
  // filter pages/!* to onclude them on sw precache manifest to work offline
  const { default: entries } = await import('../.nuxt/dist/server/client.manifest.mjs');
  const pwaConfiguration = pwaConfigurationGenerator(
    true,
    Object.keys(entries)
      .filter((p) => p.startsWith('pages/'))
      .map((p) => {
        let url = p.slice(5);
        url = url.slice(0, url.indexOf('.'));
        if (url === '/index') url = '/';
        console.log(`${p} => ${url}`);
        return { url, revision: null };
      })
  );
  const config = await resolveConfig(
    {
      plugins: [VitePWA(pwaConfiguration)],
    },
    'build',
    'production'
  );
  // when `vite-plugin-pwa` is presented, use it to regenerate SW after rendering
  const pwaPlugin = config.plugins.find((i) => i.name === 'vite-plugin-pwa')?.api;
  if (pwaPlugin?.generateSW) {
    console.log('Generating PWA...');
    await pwaPlugin.generateSW();
    // Get current working directory from process
    const cwd = process.cwd();
    // we just remove sw.js and workbox-**.js since it is from vite plugin build
    // we also need to move manifest.webmanifest one level up
    copyFileSync(
      resolve(cwd, '.output/public/_nuxt/manifest.webmanifest'),
      resolve(cwd, '.output/public/manifest.webmanifest')
    );
  }
};

buildPwa();
