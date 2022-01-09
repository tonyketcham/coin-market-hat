<template>
  <div class="fixed right-5 bottom-5 z-40 flex">
    <div
      class="flex space-x-1 place-items-center text-fractional-green header-grill bg-transparent p-2 rounded-lg backdrop-blur-[3px] m-auto border border-true-gray-900"
    >
      <strong class="block font-semibold">
        {{ error }}
      </strong>

      <a href="javascript:window.location.reload()" class="block animate-pulse"
        ><span class="i-carbon-renew block"><span class="sr-only">click to refresh</span></span></a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    error: {
      type: String,
      default: '',
    },
  });
</script>
