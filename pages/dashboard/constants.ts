export const COLORS: Record<string, string> = {
  admin: 'error' as const,
  assistant: 'warning' as const,
  user: 'neutral' as const,
};

export const USER_ROLES: Record<string, string> = {
  admin: 'Админ',
  assistant: 'Сотрудник',
  user: 'Пользователь',
};

export const COLUMNS: Record<string, string> = {
  id: 'ID',
  full_name: 'ФИО',
  role: 'Роль',
  phone_number: 'Телефон',
};
