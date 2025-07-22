export interface UserBase {
    phone: string;
    password: string;
}

export interface UserRegistration extends UserBase {
    name: string;
}
