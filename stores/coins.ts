import { acceptHMRUpdate, defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCoinStore = defineStore('coins', () => {
  /**
   * Current coin list.
   */
  let list = useLocalStorage('coins-list', []);
  /**
   * Awaiting CoinGecko API fetch.
   */
  const isLoading = ref(true);
  /**
   * Contains any errors that occur during the CoinGecko API fetch.
   */
  const error = ref('');

  /**
   * Fetches & overwrites the current coin list w/ top 100 coins.
   */
  async function fetchTop100(lastUpdated: number) {
    isLoading.value = true;

    restoreState();

    if (!needsRefresh(lastUpdated) && list.value) return;

    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&limit=100'
      );
      const data = await response.json();
      list.value = data;
      localStorage.setItem('last-updated', String(Date.now()));
    } catch (e) {
      error.value = e;
    }

    isLoading.value = false;
  }

  /**
   * Restores the state of the coin store from localStorage.
   */
  function restoreState() {
    console.log(JSON.parse(localStorage.getItem('coins-list')));
    console.log(Date.parse(localStorage.getItem('last-updated')));
  }

  /**
   * Check if the coin store needs to be refreshed.
   * @param timeToStale the time in milliseconds to wait before refreshing the coin list
   * @returns true if the coin store needs to be refreshed
   */
  function needsRefresh(lastUpdated: number, timeToStale: number = 120000) {
    return Date.now() - lastUpdated > timeToStale;
  }

  return {
    list,
    fetchTop100,
    isLoading,
    error,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
