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
});
