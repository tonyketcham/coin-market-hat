<template>
  <div class="relative">
    <Html lang="en-US">
      <Head>
        <Title>CoinMarketHat | Cryptocurrency Market Data</Title>
        <Meta
          name="description"
          content="The coin market monitor that doesn't cap. An accessible, modern take on a crypto market tracker."
        />
        <Meta property="og:title" content="CoinMarketHat | Cryptocurrency Market Data" />
        <Meta
          property="og:description"
          content="The coin market monitor that doesn't cap. An accessible, modern take on a crypto market tracker."
        />
        <Meta property="og:site_name" content="CoinMarketHat" />
        <Meta property="og:type" content="website" />
        <Meta property="og:url" content="https://coin-market-hat.netlify.app/" />
        <Link rel="canonical" href="https://coin-market-hat.netlify.app/" />
      </Head>
    </Html>
    <Header />

    <main id="content" class="relative px-3 lg:px-10 mx-auto text-center w-screen mt-22">
      <ErrorToast v-if="coins.error || !isOnline" :error="coins.error || `Oops, you're offline!`" />
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
  import { useOnline } from '@vueuse/core';
  import { useCoinStore } from '@/stores/coins';

  const coins = useCoinStore();
  const isOnline = useOnline();
</script>

<style>
  @import '~/styles/main.css';

  :root {
    --bg-color: #ffffff;
  }

  .dark {
    --bg-color: #000000;
  }
  .header-grill {
    background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, var(--bg-color) 1px);
    background-size: 4px 4px;
  }
</style>
