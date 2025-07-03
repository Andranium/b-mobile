<template>
  <main class="main">
    <Header class="main__header" />

    <Sidebar />

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
  grid-template-columns: 100px 1fr;
  grid-template-rows: 60px 1fr;

  &__header {
    grid-column: 1 / -1;
  }

  &__content {
    overflow: auto;
  }
}
</style>
