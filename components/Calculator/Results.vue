<template>
  <div class="calculator-results">
    <div class="calculator-results__text">
    </div>

    <div class="calculator-results__buttons">
      <UButton size="xl" block class="w-48 py-5 text-lg rounded-xl" color="primary">
        Рассчитать
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.calculator-results {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
