/**
 * Check if a coin is favorited.
 *
 * @todo Figure out Pinia/TS type inference for a store implementation.
 * @param id coin ID
 * @returns true, if coin is favorited
 */
export function isCoinFavorited(interactions: any, id: string) {
  return interactions.favoriteCoins.includes(id);
}

/**
 * Toggle a coin as a favorite.
 *
 * @todo Figure out Pinia/TS type inference for a store implementation.
 * @param id coin ID
 */
export function toggleCoinFavorite(interactions: any, id: string) {
  if (isCoinFavorited(interactions.favoriteCoins, id)) {
    interactions.removeFavoriteCoin(id);
  } else {
    interactions.addFavoriteCoin(id);
  }
}
