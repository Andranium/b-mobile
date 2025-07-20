<template>
  <UCard class="navigation-content">
    <template #header>
      <div class="font-bold">Маршрут</div>
    </template>

    <div class="navigation-content__main">
      <USwitch
        v-model="calculatorStore.outside"
        label="Поеду за пределы региона выдачи"
        size="xl"
      />

      <CalculatorNavigationOffice />

      <CalculatorNavigationRoute />

      <CalculatorMap
        :office-coords="selectedOffice.coords"
        :destination-coords="destinationCoords"
      />
    </div>

    <template #footer>
      <div class="navigation-content__footer">
        <UButton variant="soft" color="secondary"> Закрыть </UButton>

        <UButton @click="saveDistance"> Сохранить маршрут </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useCalculatorStore } from '~/store/calculator/useCalculatorStore';
import { OFFICES } from '~/components/Calculator/constants';

const calculatorStore = useCalculatorStore();

const { close } = defineProps<{ close: () => void }>();

const selectedOffice = computed(() => {
  return OFFICES[calculatorStore.office];
});

const destinationCoords = computed<[number, number] | undefined>(() => {
  if (!calculatorStore.selectedAddress) {
    return;
  }

  return [
    calculatorStore.selectedAddress.lat,
    calculatorStore.selectedAddress.lon,
  ];
});

const saveDistance = () => {
  calculatorStore.navigation = {
    office: selectedOffice.value,
    destination: calculatorStore.selectedAddress,
    distance: calculatorStore.distance,
  };

  close();
};
</script>

<style scoped lang="scss">
.navigation-content {
  &__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &--disabled {
      opacity: 0.8;
    }
  }

  &__title {
    font-size: 0.785rem;
    font-weight: 600;
  }
}
</style>
