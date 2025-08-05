<template>
  <header class="header p-4 lg:pr-8">
    <UNavigationMenu color="primary" variant="pill" :items="items" />

    <UButton v-if="!loggedIn" size="lg" class="ml-auto" to="/signin">
      Войти
    </UButton>

    <UDropdownMenu v-else :items="userAccountLinks">
      <UButton
        :label="user?.first_name"
        color="neutral"
        size="lg"
        variant="outline"
        icon="i-lucide-menu"
      />
    </UDropdownMenu>
  </header>
</template>

<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui';

const router = useRouter();

const { loggedIn, user, clear } = useUserSession();

const items = ref<NavigationMenuItem[]>([
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
]);

const userAccountLinks = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Личный кабинет',
      icon: 'i-lucide-users',
      to: '/lk',
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: async () => {
        await router.push('/signin');

        await clear();
      },
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
