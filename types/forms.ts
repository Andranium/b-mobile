export interface SigninUser {
  phone: string;
  password: string;
}

export interface SignupUserData extends SigninUser {
  first_name: string;
  last_name: string;
}

export interface RecoveryPassword {
  phone: string;
  password: string;
  repeatPassword: string;
}

export interface UserBase {
  phone: string;
  password: string;
}

export interface UserRegistration extends UserBase {
  name: string;
}
