<template>
  <UPopover>
    <CalculatorSelector
        placeholder="Дата"
        :value="dateRange"
        @clear-data="calculatorStore.clearDate"
    />

    <template #content>
      <UCalendar
          v-model="calculatorStore.date"
          :min-value="minValue"
          class="p-2"
          :number-of-months="2"
          range
          :week-starts-on="0"
          weekday-format="short"
          locale="ru-RU"
          :year-controls="false"
      />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import type {CalendarDate} from '@internationalized/date';
import { useCalculatorStore } from "~/store/calculator/useCalculatorStore";

const calculatorStore = useCalculatorStore();

const minValue = today('UTC');

const df = new DateFormatter('ru-RU', {
  month: "short",
  day: "numeric",
})

const dateFormatter = (date: CalendarDate) => {
  return df.format(date.toDate(getLocalTimeZone()));
}

const dateRange = computed(() => {
  if (!calculatorStore.date?.start || !calculatorStore.date?.end) {
    return '';
  }

  return `${dateFormatter(calculatorStore.date.start)} - ${dateFormatter(calculatorStore.date.end)}`;
});
</script>

<style scoped lang="scss">
</style>
