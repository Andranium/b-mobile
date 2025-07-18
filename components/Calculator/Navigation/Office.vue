<template>
  <div
      class="navigation-office"
      :class="{'navigation-office__group--disabled': !calculatorStore.outside}"
  >
    <div class="navigation-office__title">
      Выберите офис заключения договора
    </div>

    <USelect
        v-model="calculatorStore.office"
        :disabled="!calculatorStore.outside"
        :items="OFFICES"
        value-key="id"
        label-key="city"
        size="xl"
        :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
        class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import {useCalculatorStore} from "~/store/calculator/useCalculatorStore";
import {OFFICES} from "~/components/Calculator/constants";

const calculatorStore = useCalculatorStore();
</script>

<style scoped lang="scss">
.navigation-office {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &--disabled {
    opacity: 0.8;
  }
}
</style>
