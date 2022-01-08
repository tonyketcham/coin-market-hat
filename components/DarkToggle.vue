<script setup lang="ts">
  const color = useColorMode();
  function toggleDark() {
    color.value = color.value === 'dark' ? 'light' : 'dark';
  }
</script>

<template>
  <button class="focus:outline-black" dark="focus:outline-white" @click="toggleDark()">
    <div class="dark:i-carbon-moon i-carbon-sun" />
  </button>
</template>
