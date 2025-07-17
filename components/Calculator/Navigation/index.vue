<template>
  <UModal v-model:open="model">
    <CalculatorSelector
        placeholder="Маршрут"
        :value="distance"
        @clear-data="navigation = null"
    />

    <template #content="{ close }">
      <CalculatorNavigationContent
          :close="close"
          @update:navigation="saveNavigation"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { NavigationObject } from "~/components/Calculator/types";

const navigation = ref<NavigationObject | null>(null);

const model = ref(false);

const distance = computed(() => {
  if (!navigation.value) {
    return '';
  }

  return `${navigation.value.office.city} - ${navigation.value.destination.name} | ${navigation.value.distance} км`;
});

const saveNavigation = (navigationObject: NavigationObject | null) => {
  navigation.value = navigationObject;
}
</script>

<style scoped lang="scss">
</style>
