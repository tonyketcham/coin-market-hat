<template>
  <header
    class="flex justify-between sticky top-0 p-5 h-70px lg:h-88px transition-all-200 bg-transparent header-grill z-10 backdrop-blur-[3px]"
  >
    <Logo />

    <nav class="flex space-x-2">
      <form
        class="relative flex items-center bg-gray-100 px-9 py-3 rounded-full"
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
  </header>
</template>

<script setup lang="ts">
  import { useInteractionStore } from '@/stores/interactions';

  const interactions = useInteractionStore();
  const searchInput = ref(null);

  function blur() {
    searchInput.value.blur();
  }
</script>
