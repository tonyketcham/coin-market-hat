import { setActivePinia, createPinia } from 'pinia';
import { useCoinStore } from '../../stores/coins';
import { useInteractionStore } from '../../stores/interactions';
import coinsListSnapshot from './snapshots/coins-list.snapshot.js';

/**
 * Unit tests for the coin store and associated user actions which affect the coin store's state.
 */
describe('coin list', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const coins = useCoinStore();
    coins.list = coinsListSnapshot;
  });

  test('without user interactions, filtered coin list should be same as fetched data', () => {
    const coins = useCoinStore();
    expect(coins.filteredList).toStrictEqual(coinsListSnapshot);
  });

  test('fuzzy searching "ethereum" returns "ethereum" and "ethereum classic"', () => {
    const coins = useCoinStore();
    const interactions = useInteractionStore();

    interactions.coinSearch = 'ethereum';

    const ethereum = coinsListSnapshot[1];
    const ethereumClassic = coinsListSnapshot[42];

    expect(coins.filteredList).toStrictEqual([ethereum, ethereumClassic]);
  });

  test('reverse sort order', () => {
    const coins = useCoinStore();
    const interactions = useInteractionStore();

    interactions.coinSortAscending = false;
    const reversedSnapshot = coinsListSnapshot.slice().reverse();

    expect(coins.filteredList).toStrictEqual(reversedSnapshot);
  });

  test('sort by name, ascending', () => {
    const coins = useCoinStore();
    const interactions = useInteractionStore();

    interactions.coinSortField = 'name';

    // Expect the first coin to be aave, and the last to be zcash
    expect(coins.filteredList[0].id).toBe('aave');
    expect(coins.filteredList[99].id).toBe('zcash');
  });

  test('favorite coins in non-linear order then filter by watchlist', () => {
    const coins = useCoinStore();
    const interactions = useInteractionStore();

    // Add a few coins to the watchlist
    for (const coinID of ['basic-attention-token', 'compound-governance-token', 'ethereum']) {
      interactions.toggleCoinFavorite(coinID);
    }

    // Now unfavorite and re-favorite eth
    interactions.toggleCoinFavorite('ethereum');
    interactions.toggleCoinFavorite('ethereum');

    expect(interactions.isCoinFavorited('ethereum')).toBe(true);

    // Turn on the watchlist
    interactions.coinWatchlist = true;

    // Expect the coins to follow natural order, only showing the ones we favorited
    expect(coins.filteredList.map((coin) => coin.id)).toStrictEqual([
      'ethereum',
      'basic-attention-token',
      'compound-governance-token',
    ]);
  });

  test('needs refresh if updated longer than 2 minutes ago', () => {
    const coins = useCoinStore();
    coins.lastUpdated = new Date('2022-01-10').getTime();
    expect(coins.needsRefresh).toBe(true);
  });
});
