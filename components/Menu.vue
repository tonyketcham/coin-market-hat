<template>
  <nav class="flex space-x-2">
    <button
      class="standard-input bg-gradient-to-br from-transparent to-gray-200 dark:to-true-gray-800 transition-colors duration-100"
      :class="[
        interactions.coinWatchlist
          ? 'text-black dark:text-white'
          : 'text-gray-700 dark:text-gray-400',
      ]"
      @click="interactions.toggleWatchlist()"
    >
      <span
        class="mr-1.5 inline-block"
        :class="[
          interactions.coinWatchlist
            ? 'i-carbon-star-filled text-yellow-400'
            : 'i-carbon-star text-black dark:text-white',
        ]"
      ></span>
      Watchlist
    </button>
    <form
      class="relative standard-input bg-gradient-to-bl from-transparent to-gray-200 dark:to-true-gray-800"
      dark="bg-true-gray-900"
      @submit.prevent="blur()"
    >
      <span class="i-carbon-search mr-3" />
      <label for="search" class="sr-only">Search</label>
      <input
        id="search"
        ref="searchInput"
        v-model="interactions.coinSearch"
        type="search"
        name="search"
        autocomplete="off"
        placeholder="search them coins"
        class="bg-transparent focus:outline-none outline-none"
      />
    </form>
    <DarkToggle />
  </nav>
</template>

<script setup lang="ts">
  import { useInteractionStore } from '@/stores/interactions';

  const interactions = useInteractionStore();
  const searchInput = ref(null);

  function blur() {
    searchInput.value.blur();
  }
</script>
