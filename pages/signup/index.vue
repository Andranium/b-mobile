<template>
  <div class="sign-up">
    <FormsSignup />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<style scoped lang="scss">
.sign-up {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
