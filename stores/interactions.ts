import { acceptHMRUpdate, defineStore } from 'pinia';

export const useInteractionStore = defineStore('interactions', {
  state: () => ({
    coinSearch: '',
    favoriteCoins: [],
    coinSortField: 'market_cap_rank',
    coinSortAscending: true,
  }),
  actions: {
    addFavoriteCoin(coinID: string) {
      this.favoriteCoins.push(coinID);
    },
    removeFavoriteCoin(coinID: string) {
      this.favoriteCoins.splice(this.favoriteCoins.indexOf(coinID), 1);
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useInteractionStore, import.meta.hot));
