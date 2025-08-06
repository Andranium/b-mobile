<template>
  <div class="users">
    <h1 class="text-2xl font-semibold mb-4">Пользователи</h1>

    <UTable
        :data="data"
        :columns="columns"
        :loading="status === 'pending'"
    />
  </div>
</template>

<script setup lang="ts">
import type {User} from "~/types/common";
import type { TableColumn } from '@nuxt/ui'

const { data, status } = useFetch<User[]>('/api/getAllUsers');

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: '#'
  },

  {
    accessorKey: 'first_name',
    header: 'Имя'
  },
]
</script>

<style scoped lang="scss">

</style>
