export default defineAppConfig({
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'zinc',
    },
    table: {
      slots: {
        root: 'rounded border border-muted',
        td: 'text-sm text-gray-900 px-4 py-3 text-muted',
        th: 'text-sm font-semibold text-gray-500 text-highlited bg-gray-50 px-4 py-3',
        divide: 'divide-y divide-gray-200',
      },
    },
  },
});
