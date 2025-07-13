<template>
  <UPopover v-model:open="open">
    <CalculatorSelector
        placeholder="Машина"
        :value="car"
        @clear-data="clearSelectedCar"
    />

    <template #content>
      <CalculatorCarsList @car-select="carSelect" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const car = ref('');

const open = ref(false);

const clearSelectedCar = () => {
  car.value = ''
}

const carSelect = (selectedCar: string) => {
  car.value = selectedCar;

  open.value = false;
}
</script>

<style scoped lang="scss">
</style>
