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
            v-model="value"
            :disabled="!outside"
            :items="offices"
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
    </div>

    <template #footer>
      <div class="navigation-content__footer">
        <UButton variant="soft" color="secondary">
          Закрыть
        </UButton>

        <UButton>
          Сохранить маршрут
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { debounce } from "@morev/utils";
import type { LocationItem } from "~/components/Calculator/Navigation/types";

const outside = ref(false);

const offices = ref(['Нижний новгород', 'Санкт-Петербург', 'Владимир']);
const value = ref('Владимир');

const selectedAddress = ref('');

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
