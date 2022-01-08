<template>
  <div class="relative">
    <Header />

    <main id="content" class="px-3 lg:px-10 mx-auto text-center w-screen mt-22">
      <NuxtPage />
    </main>

    <Footer />
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
