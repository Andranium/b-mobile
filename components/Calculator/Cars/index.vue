<template>
  <UModal>
    <CalculatorSelector
        placeholder="Машина"
        :value="selectedCar"
        @clear-data="calculatorStore.clearSelectedCar"
    />

    <template #content>
      <CalculatorCarsList />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useCalculatorStore } from "~/store/calculator/useCalculatorStore";

const calculatorStore = useCalculatorStore();

const selectedCar = computed(() => {
  return calculatorStore.car;
});
</script>

<style scoped lang="scss">
</style>
