import {defineStore} from "pinia";
import type {NavigationObject} from "~/components/Calculator/types";

export const useCalculatorStore = defineStore('calculator-store', () => {
    const date = shallowRef();
    const car = ref();
    const navigation = ref<NavigationObject | null>(null);

    const clearDate = () => {
        date.value = undefined;
    }

    const clearSelectedCar = () => {
        car.value = ''
    }

    const clearNavigation = () => {
        navigation.value = null;
    }

    return {
        date,
        car,
        navigation,
        clearDate,
        clearSelectedCar,
        clearNavigation
    }
});
