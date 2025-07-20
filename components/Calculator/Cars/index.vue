<template>
  <UModal>
    <CalculatorSelector
      placeholder="Машина"
      :value="selectedCar"
      @clear-data="clearCar"
    />

    <template #content>
      <CalculatorCarsList />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useCalculatorStore } from '~/store/calculator/useCalculatorStore';

const calculatorStore = useCalculatorStore();

const selectedCar = computed(() => {
  return calculatorStore.car;
});

const clearCar = () => {
  calculatorStore.car = '';
};
</script>

<style scoped lang="scss"></style>
