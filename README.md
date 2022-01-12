# CoinMarketHat

[![Netlify Status](https://api.netlify.com/api/v1/badges/c3435894-930d-4188-9eb9-7047c2754e32/deploy-status)](https://app.netlify.com/sites/coin-market-hat/deploys)

The coin market monitor that doesn't cap. An accessible, modern take on a crypto market tracker.

## Features

- Fetches top 100 cryptocurrencies by market cap from CoinGecko's market data

  - 🚎 Automatic polling for market updates

  - Elegant error handlers with fallbacks in connection drops

- ⚖️ Full-featured **sorting** by all visible coin fields

- 🦮 Built with accessiblity best practices and mobile experiences in mind

- 🔍 Fast fuzzy **search** (by coin name and symbol) via [Fuze.js](https://fusejs.io/) for great search UX with some fault tolerance

  - `example`: if someone incorrectly searches 'ethor', they'll get their intended results of 'Ethereum', 'Tether', 'Ethereum Classic', etc.

  - `example 2`: searching 'loop ring', will correctly return 'Loopring' as a result.

- ⭐️ Ability to **favorite** cryptocurrencies and add them to your watchlist

  - Filter by your watchlist

- **State persistance to local storage** which can be restored to app state on subsequent visits in terms of interactions and if data is still fresh or user is offline in terms of coin data

- 🌐 **Works offline**, damn near has full PWA support

  > 🚧 currently blocked by Nuxt 3 needing to either fix their `nitro: {preset: 'worker'}` for a native Nuxt PWA or update the community [Nuxt PWA Module](https://github.com/nuxt-community/pwa-module) for Nuxt 3. In the meantime, I manually implemented a Vite-PWA and workbox solution which nearly works but has a couple small discrepencies of its own that I need to iron out around the Nuxt build process and Netlify's build environment

- 🦴 Skeleton loaders for loading without page shift

- ☀️ Light and dark themes

- Unit tests to provide coverage over functions that alter application state

## Tech Stack

- [💚 Nuxt 3](https://v3.nuxtjs.org) - Vue 3 w/ composition API, high performance & best practice scores out of the box, first-class TypeScript support, component/API auto-importing, predictable repository structure, Vite, and (generally) better DX over Nuxt 2.

  - This was chosen in the flavor of [Vitesse for Nuxt 3](https://github.com/antfu/vitesse-nuxt3) as a starting point to get from ideation to implementation faster featuring the necessary batteries included. I had to write way less boilerplate.
  - The Vue/Nuxt 3 space is wonderfully augmented by a hooks community that serve to simplify complexity and make code more DRY, readable, and therefore maintainable.

- 🦾 TypeScript - better guard rails while writing logical flows, easier to catch mistakes up front that may otherwise fester into harder bugs to squash

- ⚡️ Vite - Great developer experience with instant HMR, highly optimized builds via Rollup

  - Vibrant plugin ecosystem including tools like [VitePWA](https://vite-plugin-pwa.netlify.app/)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - instant, on-demand, atomic CSS engine with Tailwind-like syntax for maximizing implementation speed of granular styling

  - Tree-shakable auto-importing of icons from any pack in pure CSS, making iconography quick, clean, and performant

- 🍍 [Pinia](https://pinia.esm.dev/) - flux state management for application data flow that's easily testable and follows structure

- 😼 [Peeky](https://peeky.dev) - fast unit testing framework with first-class support for Vite + TypeScript

- [ESLint](https://eslint.org/) for logical linting not caught by TypeScript/VS Code

- [Prettier](https://prettier.io/) for syntax style linting to enforce consistency

- [Netlify](https://netlify.com/) for free static hosting on a global edge network for fast UX no matter where you are, automatic cache invalidation on iterative releases

- [Github Actions](https://github.com/features/actions) - CI/CD to automate test runners & builds, enforcing standards in the DevOps pipeline

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition API utilities
- [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine.
- [Pinia](https://pinia.esm.dev/) - intuitive, type safe, light and flexible Store for Vue.

## Contribute

First, clone the repository and `cd` into it. Then install node modules:

```bash
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

Then run that shit:

```bash
pnpm dev
```

Lint with eslint/prettier:

```bash
pnpm format
```

Pack it up for production:

```bash
pnpm build
```

Build PWA:

```bash
pnpm build:pwa # Once this works with Netlify's build env, it can be called in `pnpm build`
```

Check that your production build works:

```bash
pnpm start
```
