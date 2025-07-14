<template>
  <UCard class="cars-list">
    <template #header>
      <div class="font-bold">Выбор машины</div>
    </template>

    <UInput
        v-model="carQuery"
        placeholder="Поиск..."
        class="w-full"
        size="xl"
    />

    <transition-fade
        as="div"
        class="cars-list__grid"
        mode="in-out"
        group
    >
      <template v-if="!loaded">
        <div
            v-for="n in 6"
            :key="n"
            class="cars-list__loader"
        >
          <USkeleton class="w-full h-full" />
        </div>
      </template>

      <template v-else>
        <CalculatorCarsItem
            v-for="n in 8"
            :key="n"
            @click="emits('carSelect', 'car')"
        />
      </template>
    </transition-fade>

    <div @click="loaded = !loaded">1</div>
  </UCard>
</template>

<script setup lang="ts">
import {TransitionFade} from "@morev/vue-transitions";

const carQuery = '';

const emits = defineEmits(['carSelect']);

const loaded = ref(false);
</script>

<style scoped lang="scss">
.cars-list {
  min-width: 730px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 16px;
    gap: 8px;
    max-height: 500px;
    overflow: auto;
  }

  &__loader {
    aspect-ratio: 1 / 1;
    border-radius: 8px;
  }
}
</style>
