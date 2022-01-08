<template>
  <table
    aria-rowcount="100"
    aria-describedby="semantic_elements_table_desc"
    class="relative w-full min-w-screen-md text-right box-border border-collapse"
  >
    <caption id="semantic_elements_table_desc" class="sr-only">
      Track the 100 cryptocurrencies
    </caption>
    <colgroup>
      <col style="width: 50px; min-width: auto; max-width: auto" />
      <col style="width: 50px; min-width: auto; max-width: auto" />
      <col style="width: 250px; min-width: auto; max-width: auto" />
      <col style="width: 200px; min-width: auto; max-width: auto" />
      <col style="width: 84px; min-width: auto; max-width: auto" />
      <col style="width: 84px; min-width: auto; max-width: auto" />
      <col style="width: 200px; min-width: auto; max-width: auto" />
      <col style="width: 200px; min-width: auto; max-width: auto" />
    </colgroup>
    <CoinTableHeader />
    <tbody class="text-right">
      <template v-if="coins.isLoading">
        <tr
          v-for="x in 100"
          :key="x"
          class="children:py-6 border-b border-gray-100"
          dark="border-true-gray-900"
        >
          <td v-for="n in 8" :key="`${n}-${x}`">
            <div class="rounded-md bg-gray-100 animate-pulse p-2" dark="bg-true-gray-900">‎</div>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr
          v-for="coin of coins.filteredList"
          :key="coin.id"
          class="group children:py-6 border-b border-gray-100 hover:children:bg-[#0e0e0e] hover:border-fractional-green"
          dark="border-true-gray-900"
        >
          <td class="sticky left-0 px-2 text-left">
            <button
              class="flex my-auto mr-0.5 focus:outline-current focus:opacity-100 hover:opacity-80 transition-opacity duration-200"
              :class="[
                interactions.isCoinFavorited(coin.id)
                  ? 'i-carbon-star-filled opacity-100 text-yellow-400 focus:opacity-60'
                  : 'i-carbon-star opacity-30',
              ]"
              @click="interactions.toggleCoinFavorite(coin.id)"
            >
              <span class="sr-only">star</span>
            </button>
          </td>
          <td class="sticky left-6 text-left">
            <span class="opacity-40">{{ coin.market_cap_rank }}</span>
          </td>
          <td class="sticky left-13 text-left flex space-x-2 font-semibold">
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
                ? 'text-green-600 dark:text-fractional-green'
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
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { useCoinStore } from '@/stores/coins';
  import { useInteractionStore } from '@/stores/interactions';
  import { priceFormatter } from '@/composables/formatters';

  const coins = useCoinStore();
  const interactions = useInteractionStore();

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

<style>
  td {
    background-color: var(--bg-color);
  }
</style>
