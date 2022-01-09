import { acceptHMRUpdate, defineStore } from 'pinia';

export const useInteractionStore = defineStore('interactions', {
  state: () => ({
    coinSearch: '',
    favoriteCoins: [] as string[],
    coinSortField: 'market_cap_rank',
    coinSortAscending: true,
    coinWatchlist: false,
  }),
  actions: {
    toggleCoinFavorite(coinID: string) {
      if (this.isCoinFavorited(coinID)) {
        this.removeFavoriteCoin(coinID);
      } else {
        this.addFavoriteCoin(coinID);
      }
    },
    addFavoriteCoin(coinID: string) {
      this.favoriteCoins.push(coinID);
    },
    removeFavoriteCoin(coinID: string) {
      this.favoriteCoins.splice(this.favoriteCoins.indexOf(coinID), 1);
    },
    toggleWatchlist() {
      this.coinWatchlist = !this.coinWatchlist;
    },
  },
  getters: {
    /**
     * Check if a coin is favorited.
     *
     * @returns true, if coin is favorited
     */
    isCoinFavorited: (state) => {
      return (coinID: string): boolean => state.favoriteCoins.includes(coinID);
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useInteractionStore, import.meta.hot));
