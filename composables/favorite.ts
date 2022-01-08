import { useInteractionStore } from '@/stores/interactions';

const interactions = useInteractionStore();

/**
 * Check if a coin is favorited.
 *
 * @param id coin ID
 * @returns true, if coin is favorited
 */
export function isCoinFavorited(id: string) {
  return interactions.favoriteCoins.includes(id);
}

/**
 * Toggle a coin as a favorite.
 *
 * @param id coin ID
 */
export function toggleCoinFavorite(id: string) {
  if (isCoinFavorited(id)) {
    interactions.removeFavoriteCoin(id);
  } else {
    interactions.addFavoriteCoin(id);
  }
}
