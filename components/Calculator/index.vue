<template>
  <div class="calculator">
    <h3 class="calculator__title">
      Калькулятор
    </h3>

    <div class="calculator__wrapper">
      <CalculatorDate />

      <CalculatorCars />

      <CalculatorNavigation />
    </div>
  </div>
</template>


<script setup lang="ts">

</script>

<style scoped lang="scss">
.calculator {
  border: 1px solid var(--color-border);
  padding: 32px;
  border-radius: 16px;

  &__title {
    font-weight: 600;
    font-size: 1.625rem;
    margin-bottom: 32px;
  }

  &__wrapper {
    display: flex;
    gap: 8px;
  }
}
</style>
