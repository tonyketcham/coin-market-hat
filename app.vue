<template>
  <div>
    <Header />

    <main id="content" class="max-w-screen-2xl mx-auto p-10 pb-0 text-center">
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
