<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected', 'admin-protection'],
});
</script>

<style scoped lang="scss"></style>
