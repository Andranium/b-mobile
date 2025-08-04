<template>
  <div class="lk" >
    <LkHeader />

    <h2 class="mt-8 mb-6 font-medium text-2xl border-b border-b-muted pb-4">Настройки профиля</h2>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected'],
})

// const { data } = useFetch('/api/currentUser');
//
// console.log(data)
</script>

<style scoped lang="scss">

</style>
