<script setup lang="ts">
  // import { useCoinStore } from '@/stores/coins';

  // const coins = useCoinStore();

  // onMounted(() => {
  //   coins.fetchTop100();
  // });
</script>

<template>
  <div>
    <header
      class="flex justify-between sticky top-0 p-5 h-70px lg:h-88px transition-all-200 bg-transparent header-grill z-10 backdrop-blur-[3px]"
    >
      <Logo />

      <nav class="flex space-x-2">
        <form
          class="relative flex items-center bg-gray-100 px-9 py-3 rounded-full"
          dark="bg-true-gray-900"
          @submit.prevent
        >
          <span class="i-carbon-search mr-3" />
          <label for="search" class="sr-only">Search</label>
          <input
            id="search"
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

    <main id="content" class="max-w-screen-2xl mx-auto p-10 pb-0 text-center">
      <NuxtPage />
      <Footer />
    </main>
  </div>
</template>

<style>
  @import '~/styles/main.css';

  :root {
    --bg-color: #ffffff;
  }

  .dark {
    --bg-color: #000000;
  }
  .header-grill {
    background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, var(--bg-color) 1px);
    background-size: 4px 4px;
  }
</style>
