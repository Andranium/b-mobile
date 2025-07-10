<template>
  <div class="hero-card shadow-md">
    <h2 class="hero-card__title">Арендовать</h2>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.hero-card {
  flex: 1;
  aspect-ratio: 16 / 7;
  background: url('@/assets/image/rent-a-car_bg.png') no-repeat bottom right, radial-gradient(#003699 0, #003566 100%);
  background-size: 65%, contain;
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;
  backface-visibility: hidden;

  @media (max-width: 64rem) {
    padding: 1rem;
  }

  &__title {
    font-size: 2rem;
    color: white;
    font-weight: 600;

    @media (max-width: 80rem) {
      font-size: 1.75rem;
    }
  }
}
</style>
