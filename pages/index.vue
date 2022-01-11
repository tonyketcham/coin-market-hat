<template>
  <div class="w-full relative">
    <CoinTable />
  </div>
</template>

<script setup lang="ts">
  /* eslint-disable no-console */
  import { useIntervalFn } from '@vueuse/core';
  import { useCoinStore } from '@/stores/coins';
  import { useInteractionStore } from '@/stores/interactions';

  const coins = useCoinStore();
  const interactions = useInteractionStore();

  onMounted(() => {
    // Restore the last update time from localStorage
    coins.restoreLastUpdated();

    // Initial fetch of coin list with loading indicator
    if (coins.needsRefresh) {
      console.log('Fetching data from CoinGecko...');
      coins.initCoinList('fetch');
    } else {
      console.log('Restoring data from localStorage...');
      coins.initCoinList('backup');
    }

    // Restore user interaction state from localStorage
    interactions.restoreInteractions();

    useIntervalFn(() => {
      // Trigger an update to the coin list every 10 seconds
      coins.fetchCoinList();
    }, 10000);
  });

  // Subscribe to interaction state changes
  interactions.$subscribe((_, state) => {
    // Persist the interaction state to local storage whenever it changes
    localStorage.setItem('interactions', JSON.stringify(state));
  });
</script>

<style>
  :root {
    --strong-compliment: rgba(0, 0, 0, 0.15);
  }
  .dark {
    --strong-compliment: rgba(255, 255, 255, 0.25);
  }
</style>
