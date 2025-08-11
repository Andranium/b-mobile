<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected'],
});
</script>

<style scoped lang="scss"></style>
