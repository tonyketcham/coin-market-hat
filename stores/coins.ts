import { acceptHMRUpdate, defineStore } from 'pinia';
import Fuse from 'fuse.js';
import { useInteractionStore } from '@/stores/interactions';

import type { Coin } from '@/types';

export const useCoinStore = defineStore('coins', {
  state: () => ({
    /**
     * Current coin list.
     */
    list: [] as Coin[],
    /**
     * Awaiting CoinGecko API fetch.
     */
    isLoading: true,
    /**
     * Contains any errors that occur during the CoinGecko API fetch.
     */
    error: '',
  }),
  actions: {
    /**
     * Fetches & overwrites the current coin list w/ top 100 coins.
     */
    async fetchTop100(lastUpdated: number) {
      this.isLoading = true;

      this.restoreState();

      if (!this.needsRefresh(lastUpdated) && this.list) return;

      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&limit=100'
        );
        const data = await response.json();
        this.list = data;
        // localStorage.setItem('last-updated', String(Date.now()));
      } catch (e) {
        this.error = e;
      }

      this.isLoading = false;
    },
    /**
     * Restores the state of the coin store from localStorage.
     */
    restoreState() {
      console.log(JSON.parse(localStorage.getItem('coins-list')));
      console.log(Date.parse(localStorage.getItem('last-updated')));
    },

    /**
     * Check if the coin store needs to be refreshed.
     * @param timeToStale the time in milliseconds to wait before refreshing the coin list
     * @returns true if the coin store needs to be refreshed
     */
    needsRefresh(lastUpdated: number, timeToStale: number = 120000) {
      return Date.now() - lastUpdated > timeToStale;
    },
  },
  getters: {
    searchList(state): Coin[] {
      const interactions = useInteractionStore();
      const { coinSearch } = interactions;

      if (!coinSearch) return state.list;

      const fuse = new Fuse(state.list, {
        keys: ['name', 'symbol'],
      });

      return fuse.search(coinSearch).map((result) => result.item);
    },
    filteredList(): Coin[] {
      const interactions = useInteractionStore();
      const { coinSortField } = interactions;

      if (!coinSortField) return this.searchList;

      return this.searchList.sort((a: Coin, b: Coin) => a[coinSortField] - b[coinSortField]);
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
