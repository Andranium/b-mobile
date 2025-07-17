<template>
  <UModal>
    <CalculatorSelector
        placeholder="Маршрут"
        :value="distance"
    />

    <template #content>
      <CalculatorNavigationContent
          @update:navigation="navigation = $event"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { NavigationObject } from "~/components/Calculator/types";

const navigation = ref<NavigationObject | null>(null);

const distance = computed(() => {
  if (!navigation.value) {
    return '';
  }

  return navigation.value.distance + ' км';
});
</script>

<style scoped lang="scss">
</style>
