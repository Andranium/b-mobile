import {defineStore} from "pinia";

export const useCalculatorStore = defineStore('calculator-store', () => {
    const date = shallowRef();
    const car = ref();

    const clearDate = () => {
        date.value = undefined;
    }

    const clearSelectedCar = () => {
        car.value = ''
    }

    return {
        date,
        car,
        clearDate,
        clearSelectedCar
    }
});
