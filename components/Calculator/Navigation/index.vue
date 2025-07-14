<template>
  <UModal description="test">
    <CalculatorSelector
        placeholder="Маршрут"
        value=""
    />

    <template #content>
      <CalculatorNavigationContent />
    </template>
  </UModal>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
</style>
