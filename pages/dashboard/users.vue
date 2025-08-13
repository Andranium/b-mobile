<template>
  <div class="users">
    <h1 class="text-2xl font-semibold mb-4">Пользователи</h1>

    <div class="flex mb-1 px-4 py-3.5 gap-2 border border-muted rounded">
      <UInput v-model="search" class="max-w-sm" placeholder="Поиск" />

      <UDropdownMenu :items="allColumns" :content="{ align: 'end' }">
        <UChip :show="!allColumnsShown" size="lg">
          <UButton
            label="Колонки"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-chevron-down"
          />
        </UChip>
      </UDropdownMenu>
    </div>

    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:global-filter="search"
      v-model:column-pinning="pinnedColumns"
      v-model:sorting="sorting"
      :data="data"
      :columns="columns"
      :loading="isLoading"
    >
      <template #empty>
        <div class="flex items-center justify-center gap-2">
          Данные не найдены
        </div>
      </template>

      <template #loading>
        <div class="flex items-center justify-center gap-2">Загрузка...</div>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/common';
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui';
import type { Column } from '@tanstack/vue-table';
import { formatPhoneNumber } from '~/utils/common';
import { COLORS, COLUMNS, USER_ROLES } from '~/pages/dashboard/constants';

const toast = useToast();

const table = useTemplateRef('table');

const UButton = resolveComponent('UButton');
const UBadge = resolveComponent('UBadge');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const UChip = resolveComponent('UChip');

const { data, status } = useFetch<User[]>('/api/getAllUsers', {
  transform(data) {
    return data.map((item) => ({
      ...item,
      role: 'user',
      full_name: `${item.first_name} ${item.middle_name ?? ''} ${item.last_name ?? ''}`,
    }));
  },
});

const getHeader = (
  column: Column<User>,
  label: string,
  position: 'left' | 'right',
) => {
  const isPinned = column.getIsPinned();
  const isSorted = column.getIsSorted();

  const items = ref<DropdownMenuItem[]>([
    {
      label: isPinned ? 'Открепить колонку' : 'Закрепить колонку',
      icon: isPinned ? 'i-lucide-pin-off' : 'i-lucide-pin',
      onClick: async () => {
        column.pin(isPinned === position ? false : position);
      },
    },
    {
      label: 'Восходящий',
      type: 'checkbox',
      icon: 'i-lucide-arrow-up-narrow-wide',
      checked: isSorted === 'asc',
      onSelect: () => {
        if (isSorted === 'asc') {
          column.clearSorting();
        } else {
          column.toggleSorting(false);
        }
      },
    },
    {
      label: 'Нисходящий',
      icon: 'i-lucide-arrow-down-wide-narrow',
      type: 'checkbox',
      checked: isSorted === 'desc',
      onSelect: () => {
        if (isSorted === 'desc') {
          column.clearSorting();
        } else {
          column.toggleSorting(true);
        }
      },
    },
  ]);

  return h(
    'div',
    {
      class: 'flex items-center gap-2',
    },
    [
      label,
      h(
        UDropdownMenu,
        {
          items: items.value,
          size: 'md',
          ui: {
            content: 'w-48',
          },
          content: {
            side: 'left',
            align: 'start',
          },
        },
        () =>
          h(
            UChip,
            {
              show: isPinned || isSorted,
              size: 'lg',
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
      ),
    ],
  );
};

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

const isLoading = computed(() => status.value === 'pending');

const pinnedColumns = ref({
  left: [],
  right: [],
});

const search = ref('');

const columnVisibility = ref({
  id: false,
});

const allColumns: DropdownMenuItem = computed(() => {
  return table.value?.tableApi
    ?.getAllColumns()
    .filter((column: Column<User>) => column.getCanHide())
    .map((column: Column<User>) => ({
      label: COLUMNS[column.id as string],
      type: 'checkbox' as const,
      checked: column.getIsVisible(),
      onUpdateChecked(checked: boolean) {
        table.value?.tableApi?.getColumn(column.id)?.toggleVisibility(checked);
      },
      onSelect(e?: Event) {
        e?.preventDefault();
      },
    }));
});

const allColumnsShown: ComputedRef<boolean | undefined> = computed(() => {
  const columns = table.value?.tableApi?.getAllColumns();

  return columns?.every((column: Column<User>) => column.getIsVisible());
});

const sorting = ref([]);
</script>

<style scoped lang="scss"></style>
