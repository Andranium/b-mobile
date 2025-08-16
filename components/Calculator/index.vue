<template>
  <div class="calculator">
    <h3 class="calculator__title">Калькулятор</h3>

    <div class="calculator__wrapper">
      <div class="calculator__row">
        <CalculatorDate />

        <CalculatorCars />

        <CalculatorNavigation />

        <button class="calculator__calculate">
          Рассчитать
        </button>
      </div>

      <div class="calculator__row">
        <CalculatorResults />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
    flex-direction: column;
    gap: 32px;
  }

  &__row {
    display: flex;
    gap: 8px;
  }

  &__calculate {
    width: 240px;
    background-color: var(--color-primary);
    flex-shrink: 0;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: var(--color-primary-hover);
    }
  }
}
</style>
