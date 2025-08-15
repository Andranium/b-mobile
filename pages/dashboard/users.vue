<template>
  <div class="users">
    <h1 class="text-2xl font-semibold mb-4">Пользователи</h1>

    <TableDefault
      :columns="columns as TableColumn<unknown>[]"
      :data="data"
      :status="status"
    />
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import type { User } from '~/types/common';
import { COLORS, COLUMNS, USER_ROLES } from '~/pages/dashboard/constants';
import { formatPhoneNumber } from '~/utils/common';
import { useTable } from '~/composables/Table/useTable';

const UBadge = resolveComponent('UBadge');
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');

const toast = useToast();

const { getHeader } = useTable();

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) =>
      getHeader(column, COLUMNS[column.id as string]!, 'left'),
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
    header: ({ column }) =>
      getHeader(column, COLUMNS[column.id as string]!, 'left'),
  },

  {
    accessorKey: 'role',
    header: ({ column }) =>
      getHeader(column, COLUMNS[column.id as string]!, 'left'),
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
    header: ({ column }) =>
      getHeader(column, COLUMNS[column.id as string]!, 'left'),
    cell: ({ row }) => {
      const number = row.getValue('phone_number') as string;

      const items = ref<DropdownMenuItem[]>([
        {
          label: 'Скопировать номер',
          icon: 'material-symbols:content-copy',
          onClick: async () => {
            await navigator.clipboard.writeText(number);

            toast.add({
              title: 'Номер скопирован',
              color: 'success',
              duration: 5000,
            });
          },
        },
        {
          label: 'Позвонить',
          icon: 'material-symbols:phone-enabled',
        },
        {
          label: 'Открыть Whatsapp',
          icon: 'mingcute:whatsapp-fill',
          href: `https://wa.me/${number}`,
          target: '_blank',
        },
        {
          label: 'Открыть Telegram',
          icon: 'uil:telegram',
          href: `https://t.me/${number}`,
          target: '_blank',
        },
      ]);

      return h(`div`, { class: 'flex items-center font-semibold gap-2' }, [
        formatPhoneNumber(number),
        h(
          UDropdownMenu,
          {
            items: items.value,
            size: 'md',
            ui: {
              content: 'w-48',
            },
          },
          () =>
            h(UButton, {
              icon: 'material-symbols:more-vert',
              color: 'neutral',
              variant: 'subtle',
              size: 'xs',
              title: 'Доп. возможности',
            }),
        ),
      ]);
    },
  },
];

const { data, status } = useFetch<User[]>('/api/getAllUsers', {
  transform(data) {
    return data.map((item) => ({
      ...item,
      role: 'user',
      full_name: `${item.first_name} ${item.middle_name ?? ''} ${item.last_name ?? ''}`,
    }));
  },
});
</script>

<style scoped lang="scss"></style>
