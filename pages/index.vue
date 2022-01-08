<template>
  <div class="w-full">
    <CoinTable />
  </div>
</template>

<script setup lang="ts">
  import { useCoinStore } from '@/stores/coins';

  const coins = useCoinStore();

  onMounted(() => {
    coins.fetchTop100(0);
  });

  coins.$subscribe((_, state) => {
    // // import { MutationType } from 'pinia'
    // mutation.type; // 'direct' | 'patch object' | 'patch function'
    // // same as cartStore.$id
    // mutation.storeId; // 'cart'
    // // only available with mutation.type === 'patch object'
    // mutation.payload; // patch object passed to cartStore.$patch()

    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('coins-list', JSON.stringify(state.list));
  });
</script>

<style>
  :root {
    --strong-compliment: rgba(0, 0, 0, 0.15);
  }
  .dark {
    --strong-compliment: rgba(255, 255, 255, 0.25);
  }
</style>
