<template>
  <div class="recovery-password">
    <Index />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<style scoped lang="scss">
.recovery-password {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
