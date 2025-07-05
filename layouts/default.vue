<template>
  <main class="main">
    <Header class="main__header" />

    <Sidebar class="main__sidebar" />

    <div class="main__content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-rows: 64px 1fr;

  &__header {
    grid-column: 2 / -1;
  }

  &__sidebar {
    grid-row: 1 / -1;
  }

  &__content {
    overflow: auto;
    border-radius: 16px 0 0 0;
    box-shadow: -15px -4px 41px -22px rgba(34, 60, 80, 0.19);
  }
}
</style>
