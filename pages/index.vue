<template>
  <div>
    <Suspense>
      <table class="w-full text-right box-border border-collapse">
        <thead class="relative sticky top-22 text-sm header-grill backdrop-blur-[3px] z-10">
          <th
            v-for="column of tableHeaders"
            :key="column.title"
            :title="column.tip ? column.tip as string : ''"
            :class="{ 'text-left': column.align === 'left', 'sr-only': column.isLabelSrOnly }"
          >
            {{ column.title }}
          </th>
        </thead>
        <tbody class="text-right">
          <tr
            v-for="coin of filteredCoinList"
            :key="coin.id"
            class="children:py-6 border-b border-gray-100"
            dark="border-true-gray-900"
          >
            <td class="text-left">
              <button
                class="flex my-auto mr-0.5"
                :class="[
                  isFavorited
                    ? 'i-carbon-star-filled opacity-100 text-yellow-400'
                    : 'i-carbon-star opacity-30',
                ]"
              >
                <span class="sr-only">star</span>
              </button>
            </td>
            <td class="text-left opacity-40">
              {{ coin.market_cap_rank }}
            </td>
            <td class="text-left flex space-x-2 font-semibold">
              <img
                :src="coin.image"
                :alt="`${coin.name} logo`"
                class="w-6 h-6 shadow-white"
                style="filter: drop-shadow(0 0 1px var(--strong-compliment))"
              />
              <span>{{ coin.name }} </span>
              <span class="uppercase font-normal opacity-60">
                {{ coin.symbol }}
              </span>
            </td>
            <td>
              {{ priceFormatter(coin.current_price) }}
            </td>
            <td
              :class="[
                Math.sign(Number(coin.price_change_percentage_24h)) === -1
                  ? 'text-red-600'
                  : 'text-green-600',
              ]"
            >
              {{ Number(coin.price_change_percentage_24h).toFixed(2) }}%
            </td>
            <td>{{ priceFormatter(coin.ath) }}</td>
            <td>{{ priceFormatter(coin.market_cap) }}</td>
            <td>{{ priceFormatter(coin.total_volume) }}</td>
          </tr>
        </tbody>
      </table>
      <template #fallback>
        <div class="opacity-50 italic">
          <span class="animate-pulse">Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
  import Fuse from 'fuse.js';
  import type { Coin } from '@/types';

  const coins = ref([]);
  const filteredCoinList = ref([]);
  const isFavorited = false;

  const tableHeaders = ref([
    {
      title: 'Favorite',
      align: 'left',
      isLabelSrOnly: true,
    },
    {
      title: '#',
      align: 'left',
      isLabelSrOnly: false,
    },
    {
      title: 'Name',
      align: 'left',
      isLabelSrOnly: false,
    },
    {
      title: 'Price',
      align: 'right',
      isLabelSrOnly: false,
    },
    {
      title: '24h %',
      align: 'right',
      isLabelSrOnly: false,
    },
    {
      title: 'ATH',
      tip: 'All Time High',
      align: 'right',
      isLabelSrOnly: false,
    },
    {
      title: 'Market Hat',
      align: 'right',
      isLabelSrOnly: false,
    },
    {
      title: 'Total Volume',
      align: 'right',
      isLabelSrOnly: false,
    },
  ]);

  // Refactor this into pinia
  let fuse: Fuse<Coin>;

  onMounted(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&limit=100')
      .then((res) => res.json())
      .then((data) => {
        coins.value = data;
        fuse = new Fuse(coins.value, {
          keys: ['name', 'symbol'],
        });
        filteredCoinList.value = coins.value;
        filteredCoinList.value = coinSearch('coin');
      });
  });

  function coinSearch(search: string) {
    return fuse.search(search).map((result) => result.item);
  }

  /**
   * Formats a price to a string with a currency symbol following the client's locale formatting standards
   *
   * @param value price to be formatted
   */
  function priceFormatter(value: number) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumSignificantDigits: 3,
    }).format(value);
  }

  //   function numberFormatter(value: number) {
  //     return new Intl.NumberFormat().format(value);
  //   }
</script>

<style>
  :root {
    --strong-compliment: rgba(0, 0, 0, 0.15);
  }
  .dark {
    --strong-compliment: rgba(255, 255, 255, 0.25);
  }
</style>
