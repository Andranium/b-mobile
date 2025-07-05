<template>
  <header class="header p-4">
    <UNavigationMenu
        color="primary" variant="pill" :items="items"
    />

    <UButton size="lg" class="ml-auto">
      Войти
    </UButton>
  </header>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Главная',
      to: '/'
    },
    {
      label: 'Автопарк',
      to: '/cars'
    },
    {
      label: 'О нас',
      to: '/about',
    }
  ],
])
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
