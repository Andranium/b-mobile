<template>
  <UCard class="navigation-content">
    <template #header>
      <div class="font-bold">Маршрут</div>
    </template>

    <div class="navigation-content__main">
      <USwitch
          v-model="outside"
          label="Поеду за пределы региона выдачи"
          size="xl"
      />

      <div
          class="navigation-content__group"
          :class="{'navigation-content__group--disabled': !outside}"
      >
        <div class="navigation-content__title">
          Выберите офис заключения договора
        </div>

        <USelect
            v-model="office"
            :disabled="!outside"
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

      <div
          class="navigation-content__group"
          :class="{'navigation-content__group--disabled': !outside}"
      >
        <div class="navigation-content__title">
          Пункт назначения (Город, Населённый пункт...)
        </div>

        <UInputMenu
            v-model="selectedAddress"
            :disabled="!outside"
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

      <CalculatorMap
          :office-coords="selectedOffice.coords"
          :destination-coords="destinationCoords"
          @update:distance="distance = $event"
      />
    </div>

    <template #footer>
      <div class="navigation-content__footer">
        <UButton variant="soft" color="secondary">
          Закрыть
        </UButton>

        <UButton @click="saveDistance">
          Сохранить маршрут
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { debounce } from "@morev/utils";
import type { LocationItem } from "~/components/Calculator/types";

import { OFFICES } from '../constants';

const emits = defineEmits(["update:navigation"]);

const outside = ref(false);

const office = ref(0);

const selectedAddress = ref();

const searchTerm = ref('');

const distance = ref(0);

const selectedOffice = computed(() => {
  return OFFICES[office.value];
});

const changeSearchTerm = debounce((address: string) => {
  searchTerm.value = address;
}, 300);

const isLoading = computed(() => {
  return status.value !== 'success';
});

const destinationCoords = computed<[number, number] | undefined>(() => {
  if (!selectedAddress.value) {
    return;
  }

  return [selectedAddress.value.lat, selectedAddress.value.lon];
});

const cityFilter = (locationArr: LocationItem[]) => locationArr.filter(location => location.class === 'place' && ['city', 'town', 'village', 'hamlet'].includes(location.type));

const { data: location, status } = useFetch<LocationItem[]>('/api/getAddress', {
  query: {
    address: searchTerm
  },
  immediate: false,
  transform: cityFilter
});

const saveDistance = () => {
  emits('update:navigation', {
    office: selectedOffice.value,
    destination: selectedAddress.value,
    distance: distance.value,
  });
}
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
