<template>
  <aside class="aside p-4">
    <div class="aside__logo">
      <div class="logo">B</div>
    </div>

    <SidebarNavigation />
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__logo {
    margin-bottom: 24px;
  }
}

.logo {
  font-size: 24px;
  font-weight: bold;
  height: 40px;
  width: 40px;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
