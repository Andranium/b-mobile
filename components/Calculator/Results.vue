<template>
  <div class="calculator-results">
    <div class="calculator-results__text"/>

    <div class="calculator-results__buttons">
<!--      <UButton-->
<!--          v-if="!calc"-->
<!--          :disabled="isButtonDisabled"-->
<!--          size="xl"-->
<!--          block-->
<!--          class="w-48 py-5 text-lg rounded-xl"-->
<!--          color="primary"-->
<!--          @click="calculate"-->
<!--      >-->
<!--        Рассчитать-->
<!--      </UButton>-->

<!--      <template v-else>-->
<!--        <UButton-->
<!--            :disabled="isButtonDisabled"-->
<!--            size="xl"-->
<!--            block-->
<!--            class="w-48 py-5 text-lg rounded-xl"-->
<!--            color="primary"-->
<!--            @click="calculate"-->
<!--        >-->
<!--          Рассчитать-->
<!--        </UButton>-->

<!--        <UButton-->
<!--            :disabled="isButtonDisabled"-->
<!--            size="xl"-->
<!--            block-->
<!--            class="w-48 py-5 text-lg rounded-xl"-->
<!--            color="primary"-->
<!--            @click="calculate"-->
<!--        >-->
<!--          Рассчитать-->
<!--        </UButton>-->
<!--      </template>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCalculatorStore} from "~/store/calculator/useCalculatorStore";

const calculatorStore = useCalculatorStore();

const calc = ref(false); // temporary

const isButtonDisabled  = computed(() => {
  return !(calculatorStore.date && calculatorStore.car);
});

const calculate = () => {
  calc.value = true;
}
</script>

<style scoped lang="scss">
.calculator-results {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__buttons {
    display: flex;
    gap: 8px;
  }
}
</style>
