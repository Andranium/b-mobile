<template>
  <div class="users">
    <h1 class="text-2xl font-semibold mb-4">Пользователи</h1>

    <div class="flex mb-1 px-4 py-3.5 border border-muted rounded">
      <UInput v-model="search" class="max-w-sm" placeholder="Поиск" />
    </div>

    <UTable
      v-model:global-filter="search"
      v-model:column-pinning="pinnedColumns"
      :data="data"
      :columns="columns"
      :loading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/common';
import type { TableColumn } from '@nuxt/ui';
import type { Column } from '@tanstack/vue-table';
import { formatPhoneNumber } from '~/utils/common';
import { COLORS, USER_ROLES } from '~/pages/dashboard/constants';

const toast = useToast();

const { data, status } = useFetch<User[]>('/api/getAllUsers', {
  transform(data) {
    return data.map((item) => ({
      ...item,
      role: 'user',
      full_name: `${item.first_name} ${item.middle_name ?? ''} ${item.last_name ?? ''}`,
    }));
  },
});

const UButton = resolveComponent('UButton');
const UBadge = resolveComponent('UBadge');

const getHeader = (
  column: Column<User>,
  label: string,
  position: 'left' | 'right',
) => {
  const isPinned = column.getIsPinned();

  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label,
    icon: isPinned ? 'i-lucide-pin-off' : 'i-lucide-pin',
    class: '-mx-2.5',
    onClick() {
      column.pin(isPinned === position ? false : position);
    },
  });
};

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => getHeader(column, 'ID', 'left'),
    cell: ({ row }) => {
      return h(UButton, {
        icon: 'material-symbols:content-copy',
        color: 'neutral',
        variant: 'subtle',
        title: 'Скопировать айди пользователя',
        size: 'xs',
        onClick: async () => {
          await navigator.clipboard.writeText(row.getValue('id'));

          toast.add({
            title: 'ID пользователя скопирован',
            color: 'success',
            duration: 5000,
          });
        },
      });
    },
  },

  {
    accessorKey: 'full_name',
    header: ({ column }) => getHeader(column, 'ФИО', 'left'),
  },

  {
    accessorKey: 'role',
    header: ({ column }) => getHeader(column, 'Роль', 'left'),
    cell: ({ row }) => {
      const role = row.getValue('role') as string;

      const color = COLORS[role];

      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color },
        USER_ROLES[role],
      );
    },
  },

  {
    accessorKey: 'phone_number',
    header: ({ column }) => getHeader(column, 'Телефон', 'left'),
    cell: ({ row }) => {
      const number = row.getValue('phone_number') as string;

      return h(`div`, { class: 'flex items-center font-semibold gap-2' }, [
        formatPhoneNumber(number),
        h(UButton, {
          icon: 'material-symbols:content-copy',
          color: 'neutral',
          variant: 'subtle',
          title: 'Скопировать номер',
          size: 'xs',
          onClick: async () => {
            await navigator.clipboard.writeText(number);

            toast.add({
              title: 'Номер скопирован',
              color: 'success',
              duration: 5000,
            });
          },
        }),
        h(UButton, {
          icon: 'material-symbols:phone-enabled',
          color: 'neutral',
          variant: 'subtle',
          title: 'Позвонить по номеру',
          size: 'xs',
          href: `tel:${number}`,
        }),
      ]);
    },
  },
];

const isLoading = computed(() => status.value === 'pending');

const pinnedColumns = ref({
  left: [],
  right: [],
});

const search = ref('');
</script>

<style scoped lang="scss"></style>
