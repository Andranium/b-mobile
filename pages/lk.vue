<template>
  <div class="lk" >
    <LkHeader />

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
