<template>
  <div class="hero">
    <HeroCard />
    <HeroCard />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.hero {
  display: flex;
  gap: 24px;

  @media (max-width: 48rem) {
    flex-direction: column;
  }
}
</style>
