<script setup lang="ts">
  import { useTimeAgo } from '@vueuse/core';
  import { useCoinStore } from '@/stores/coins';

  const coins = useCoinStore();

  const time = useTimeAgo(computed(() => Number(coins.lastUpdated)));
</script>

<template>
  <div class="text-sm opacity-40">Last updated: {{ time }}</div>
</template>
