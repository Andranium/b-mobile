<template>
  <UModal v-model:open="model">
    <CalculatorSelector
        placeholder="Маршрут"
        :value="distance"
        @clear-data="clearNavigation"
    />

    <template #content="{ close }">
      <CalculatorNavigationContent
          :close="close"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useCalculatorStore } from "~/store/calculator/useCalculatorStore";

const calculatorStore = useCalculatorStore();

const model = ref(false);

const distance = computed(() => {
  if (!calculatorStore.navigation) {
    return '';
  }

  return `${calculatorStore.navigation.office.city} - ${calculatorStore.navigation.destination.name} | ${calculatorStore.navigation.distance} км`;
});

const clearNavigation = () => {
  calculatorStore.navigation = null;
}
</script>

<style scoped lang="scss">
</style>
