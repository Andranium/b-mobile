<template>
  <div
      class="navigation-route"
      :class="{'navigation-route__group--disabled': !calculatorStore.outside}"
  >
    <div class="navigation-route__title">
      Пункт назначения (Город, Населённый пункт...)
    </div>

    <UInputMenu
        v-model="calculatorStore.selectedAddress"
        :disabled="!calculatorStore.outside"
        :items="location as any"
        label-key="display_name"
        size="xl"
        placeholder="Адрес"
        type="search"
        :loading="isLoading && !!searchTerm"
        @update:search-term="changeSearchTerm"
    >
      <template #empty>
        {{ isLoading && !!searchTerm ? 'Загрузка' : 'Пусто' }}
      </template>
    </UInputMenu>
  </div>
</template>

<script setup lang="ts">
import {useCalculatorStore} from "~/store/calculator/useCalculatorStore";
import {debounce} from "@morev/utils";
import type {LocationItem} from "~/components/Calculator/types";

const calculatorStore = useCalculatorStore();

const searchTerm = ref('');

const changeSearchTerm = debounce((address: string) => {
  searchTerm.value = address;
}, 300);

const isLoading = computed(() => {
  return status.value !== 'success';
});

const cityFilter = (locationArr: LocationItem[]) => locationArr.filter(location => location.class === 'place' && ['city', 'town', 'village', 'hamlet'].includes(location.type));

const { data: location, status } = useFetch<LocationItem[]>('/api/getAddress', {
  query: {
    address: searchTerm
  },
  immediate: false,
  transform: cityFilter
});
</script>

<style scoped lang="scss">
.navigation-route {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &--disabled {
    opacity: 0.8;
  }
}
</style>
