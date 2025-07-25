declare module '#auth-utils' {
  interface User {
    id: string;
    name: string;
    phone_number: string;
    role: string;
    banned: boolean;
    updated_at: string;
    created_at: string;
  }
}

export {};
