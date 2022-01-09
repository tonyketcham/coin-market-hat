import { acceptHMRUpdate, defineStore } from 'pinia';
import Fuse from 'fuse.js';
import { sortBy } from '@/composables/sortBy';
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
    /**
     * When the coins list was last updated.
     */
    lastUpdated: null as number | null,
  }),
  actions: {
    async initCoinList() {
      this.isLoading = true;
      // this.restoreState();
      // if (this.lastUpdated && !this.needsRefresh(this.lastUpdated) && this.list) return;
      await this.fetchCoinList();
      this.isLoading = false;
    },
    /**
     * Fetches & overwrites the current coin list w/ top 100 coins.
     */
    async fetchCoinList() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&limit=100'
        );
        const data = await response.json();
        if (!data) throw new Error('No data returned from CoinGecko API.');
        this.list = data;
        this.lastUpdated = Date.now();
        localStorage.setItem('last-updated', this.lastUpdated.toString());
      } catch (e) {
        this.error = e.message;
      }
    },
    /**
     * Restores the state of the coin store from localStorage.
     */
    restoreState() {
      // console.log(JSON.parse(localStorage.getItem('coins-list')));
      // console.log(Date.parse(localStorage.getItem('last-updated')));
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
    /**
     * Filters the coin list by search input.
     * @returns search-filtered coin list
     */
    searchList(state): Coin[] {
      const interactions = useInteractionStore();
      const { coinSearch } = interactions;

      if (!coinSearch) return state.list;

      const fuse = new Fuse(state.list, {
        keys: ['name', 'symbol'],
        threshold: 0.1,
      });

      return fuse.search(coinSearch).map((result) => result.item);
    },
    /**
     * Filters the coin list by user preference on sorting field and direction + search.
     * @returns search-filtered & sorted list of coins
     */
    filteredList(): Coin[] {
      const interactions = useInteractionStore();
      const { coinSortField, coinSortAscending, coinWatchlist, isCoinFavorited } = interactions;

      // Short circuit if something funky happens
      if (!coinSortField) return this.searchList;

      // Make a clone so we don't nuke the original list
      let clone = [...this.searchList] as Coin[];

      // Filter by user favorites
      if (coinWatchlist) {
        clone = clone.filter((coin) => isCoinFavorited(coin.id));
      }

      // Sort the damn thing
      sortBy(coinSortField, clone);

      // Continue this game of Bop-It with a reverse
      if (!coinSortAscending) clone.reverse();

      return clone;
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
