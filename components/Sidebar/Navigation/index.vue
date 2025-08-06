<template>
  <nav class="navigation">
    <UTooltip
      v-for="(item, i) in items"
      :key="item.icon"
      :text="item.tooltip"
      :content="{
        align: 'center',
        side: 'right',
        sideOffset: 8,
      }"
    >
      <UButton
        class="navigation__item"
        size="xl"
        :icon="`material-symbols:${item.icon}`"
        :color="i === 0 ? 'primary' : 'secondary'"
        variant="ghost"
        :to="item.to"
      />
    </UTooltip>

    <UTooltip
      class="mt-auto"
      text="Тех. поддержка"
      :content="{
        align: 'center',
        side: 'right',
        sideOffset: 8,
      }"
    >
      <UButton
        class="navigation__item"
        size="xl"
        icon="material-symbols:support-agent-rounded"
        color="secondary"
        variant="ghost"
      />
    </UTooltip>
  </nav>
</template>

<script setup lang="ts">
import {SIDEBAR_NAVIGATION} from "~/utils/navigation";

const route = useRoute();

const items = computed(() => {
  const [item] = route.matched;

  return SIDEBAR_NAVIGATION[item?.name as keyof typeof SIDEBAR_NAVIGATION] ?? [];
});
</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100%;
}
</style>
