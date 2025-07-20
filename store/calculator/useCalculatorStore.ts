import { defineStore } from 'pinia';
import type { NavigationObject } from '~/components/Calculator/types';

export const useCalculatorStore = defineStore('calculator-store', () => {
  const date = shallowRef();
  const car = ref();
  const navigation = ref<NavigationObject | null>(null);

  const office = ref(0);

  const outside = ref(false);

  const distance = ref(0);

  const selectedAddress = ref();

  return {
    date,
    car,
    navigation,
    outside,
    office,
    selectedAddress,
    distance,
  };
});
