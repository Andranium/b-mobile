<template>
  <header class="header p-4 lg:pr-8">
    <UNavigationMenu color="primary" variant="pill" :items="items" />

    <UButton v-if="!loggedIn" size="lg" class="ml-auto" to="/signin">
      Войти
    </UButton>
    <div v-else>{{ user?.name }}</div>
  </header>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { loggedIn, user } = useUserSession();

console.log(loggedIn.value);

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Главная',
      to: '/',
    },
    {
      label: 'Автопарк',
      to: '/cars',
    },
    {
      label: 'О нас',
      to: '/about',
    },
  ],
]);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
