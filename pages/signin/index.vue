<template>
  <div class="sign-in">
    <FormsSignin />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<style scoped lang="scss">
.sign-in {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
