<template>
  <table class="w-full text-right box-border border-collapse">
    <CoinTableHeader />
    <tbody class="text-right">
      <tr
        v-for="coin of coins.filteredList"
        :key="coin.id"
        class="children:py-6 border-b border-gray-100"
        dark="border-true-gray-900"
      >
        <td class="text-left">
          <button
            class="flex my-auto mr-0.5 focus:outline-current focus:opacity-100 hover:opacity-80 transition-opacity duration-200"
            :class="[
              isCoinFavorited(coin.id)
                ? 'i-carbon-star-filled opacity-100 text-yellow-400 focus:opacity-60'
                : 'i-carbon-star opacity-30',
            ]"
            @click="toggleCoinFavorite(coin.id)"
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
              : Math.sign(Number(coin.price_change_percentage_24h)) === 1
              ? 'text-green-600'
              : 'text-gray-600',
          ]"
        >
          {{
            getPlusSignIfPositive(coin.price_change_percentage_24h) +
            Number(coin.price_change_percentage_24h).toFixed(2).toString()
          }}%
        </td>
        <td>{{ priceFormatter(coin.ath) }}</td>
        <td>{{ priceFormatter(coin.market_cap) }}</td>
        <td>{{ priceFormatter(coin.total_volume) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { useCoinStore } from '@/stores/coins';
  import { isCoinFavorited, toggleCoinFavorite } from '@/composables/favorite';
  import { priceFormatter } from '@/composables/formatters';

  const coins = useCoinStore();

  /**
   * Little utility that does what it says on the tin. If the number is positive, it returns a plus sign.
   * Helpful for formatting the percentage change.
   *
   * @param value
   */
  function getPlusSignIfPositive(value: number) {
    return value > 0 ? '+' : '';
  }
</script>
