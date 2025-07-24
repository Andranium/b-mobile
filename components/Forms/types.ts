export interface SigninUser {
  phone: string;
  password: string;
}

export interface SignupUserData extends SigninUser {
  name: string;
}

export interface RecoveryPassword {
    phone: string
    password: string;
    repeatPassword: string;
}
