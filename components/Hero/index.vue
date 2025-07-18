<template>
  <div class="hero">
    <div class="hero__cards">
      <HeroCard />

      <HeroNews />
    </div>

    <Calculator class="mt-12" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.hero {
  &__cards {
    display: flex;
    gap: 24px;

    @media (max-width: 48rem) {
      flex-direction: column;
    }
  }
}
</style>
