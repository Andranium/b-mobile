<template>
  <UCard class="user m-1 shadow-md">
    <div class="user__wrapper">
      <UAvatar class="h-20 w-20 rounded" :alt="user?.name" size="xl" />

      <div class="user__info">
        <h1 class="font-medium text-2xl">{{ user?.name }}</h1>

        <div class="text-muted">{{ user?.role }}</div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { user } = useUserSession();
</script>

<style scoped lang="scss">
.user {
  &__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 16px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
