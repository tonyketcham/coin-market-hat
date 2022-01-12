import { setActivePinia, createPinia } from 'pinia';
import test from 'ava';
import { useCoinStore } from '../../stores/coins.js';

test.beforeEach(() => {
  setActivePinia(createPinia());
});

test('should filter coins by user search', (t) => {
  const coins = useCoinStore();
  console.log(coins);
  t.deepEqual(coins.list, []);
});
