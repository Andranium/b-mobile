<template>
  <nav class="navigation">
    <UTooltip
        v-for="(item, i) in items"
        :key="item.icon"
        :text="item.tooltip"
        :content="{
          align: 'center',
          side: 'right',
          sideOffset: 8
        }"
    >
      <UButton
          class="navigation__item"
          size="xl"
          :icon="`material-symbols:${item.icon}`"
          :color="i === 0 ? 'primary' : 'secondary'"
          variant="ghost"
      />
    </UTooltip>

    <UTooltip
        class="mt-auto"
        text="Тех. поддержка"
        :content="{
          align: 'center',
          side: 'right',
          sideOffset: 8
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
const items = [
  {
    icon: 'percent-rounded',
    tooltip: 'Новости и акции'
  },

  {
    icon: 'directions-car-outline-rounded',
    tooltip: 'Список машин'
  }
]
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
