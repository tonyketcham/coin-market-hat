import { acceptHMRUpdate, defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useCoinStore = defineStore('coins', () => {
  /**
   * Current coin list.
   */
  let coins = useStorage('coins', []);
  /**
   * Awaiting CoinGecko API fetch.
   */
  const isLoading = ref(true);
  /**
   * Contains any errors that occur during the CoinGecko API fetch.
   */
  const error = ref('');
  /**
   * When the coin store was last updated.
   */
  let lastUpdated = useStorage('last-updated', Date.now());

  /**
   * Fetches & overwrites the current coin list w/ top 100 coins.
   */
  async function fetchTop100() {
    isLoading.value = true;

    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&limit=100'
      );
      const data = await response.json();
      coins.value = data;
      lastUpdated.value = Date.now();
    } catch (e) {
      error.value = e;
    }

    isLoading.value = false;
  }

  return {
    coins,
    fetchTop100,
    isLoading,
    error,
    lastUpdated,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
