/* eslint-disable no-console */
import { acceptHMRUpdate, defineStore } from 'pinia';
import Fuse from 'fuse.js';
import { sortBy } from '../composables/sortBy';
import { useInteractionStore } from '../stores/interactions';

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
    async initCoinList(fromSource: 'backup' | 'fetch' = 'fetch') {
      this.isLoading = true;

      if (fromSource === 'backup') {
        this.restoreCoinList();
        console.log('Coin list restored from backup.');
      } else {
        await this.fetchCoinList();
        console.log('Coin list fetched from CoinGecko.');
      }
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
        localStorage.setItem('coins-list', JSON.stringify(this.list));
      } catch (e) {
        this.error = e.message;
      }
    },
    /**
     * Restores the state of the last update to the coin store from localStorage.
     */
    restoreLastUpdated() {
      this.lastUpdated = JSON.parse(localStorage.getItem('last-updated'));
    },
    /**
     * Restores the state of the coin list from localStorage.
     */
    restoreCoinList() {
      this.list = JSON.parse(localStorage.getItem('coins-list'));
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
        threshold: 0.3,
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
    /**
     * Check if the coin store needs to be refreshed.
     * @returns true if the coin store needs to be refreshed
     */
    needsRefresh() {
      return Date.now() - this.lastUpdated > 120000;
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCoinStore, import.meta.hot));
