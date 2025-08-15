import type { Column } from '@tanstack/vue-table';
import type { User } from '~/types/common';
import type { DropdownMenuItem } from '@nuxt/ui';

import { UDropdownMenu, UChip, UButton } from '#components';

export const useTable = () => {
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
          UDropdownMenu as Component,
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
              UChip as Component,
              {
                show: isPinned || isSorted,
                size: 'lg',
              },
              () =>
                h(UButton as Component, {
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

  return {
    getHeader,
  };
};
