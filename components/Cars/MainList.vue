<template>
  <div class="cars-main-list">
    <h2 class="cars-main-list__title">Автопарк</h2>

    <div class="cars-main-list__grid">
      <CarsCard />
      <CarsCard />
      <CarsCard />
      <CarsCard />
      <CarsCard />
      <CarsCard />
      <CarsCard />
      <CarsCard />
    </div>

    <UButton color="neutral" variant="subtle" class="mt-7 self-center" size="xl">Весь автопарк</UButton>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.cars-main-list {
  display: flex;
  flex-direction: column;

  &__title {
    font-weight: 600;
    font-size: 1.625rem;
    margin-bottom: 32px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 32px;
  }
}
</style>
