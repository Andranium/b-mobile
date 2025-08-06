export interface User {
    id: string;
    phone_number: string;
    role: string;
    banned: boolean;
    updated_at: string;
    created_at: string;
    drivers_license: string;
    email: string;
    first_name: string;
    middle_name: string;
    last_name?: string;
    gender: 'male' | 'female';
    passport: string;
    sponsor_id?: string;
}
