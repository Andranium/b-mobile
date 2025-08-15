<template>
  <div>
    <div class="flex mb-1 px-4 py-3.5 gap-2 border border-muted rounded">
      <UInput v-model="search" class="max-w-sm" placeholder="Поиск" />

      <UDropdownMenu
        :items="allColumns as DropdownMenuItem[]"
        :content="{ align: 'end' }"
      >
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
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import type { Column } from '@tanstack/vue-table';
import { COLUMNS } from '~/pages/dashboard/constants';

const table = useTemplateRef('table');

const {
  columns,
  data = [],
  status,
} = defineProps<{
  columns: TableColumn<unknown>[];
  status: string;
  data?: unknown[];
}>();

const isLoading = computed(() => status === 'pending');

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
    .filter((column: Column<unknown>) => column.getCanHide())
    .map((column: Column<unknown>) => ({
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

  return columns?.every((column: Column<unknown>) => column.getIsVisible());
});

const sorting = ref([]);
</script>

<style scoped lang="scss"></style>
