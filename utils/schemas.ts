import { object, string, ref } from 'yup';
import { phoneRegexp } from '~/utils';

const REQUIRED = 'Поле является обязательным для заполнения';
const INCORRECT_PHONE_NUMBER = 'Неверный формат номера';
const SHORT_FIELD = 'Должно быть не менее 8 символов';
const NOT_MATCHING_PASSWORDS = 'Пароли должны быть одинаковыми';
const INCORRECT_PASSWORD_FORMAT = 'Пароль не соответствует требованиям';

const INCORRECT_PASSWORD_FORMAT_REGEXP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{;:'"\\|,.<>/?-]).+$/;

const PHONE_REQUIREMENTS = string()
  .matches(phoneRegexp, {
    message: INCORRECT_PHONE_NUMBER,
  })
  .required(REQUIRED);

const PASSWORD_REQUIREMENTS = string()
  .min(8, SHORT_FIELD)
  .matches(INCORRECT_PASSWORD_FORMAT_REGEXP, INCORRECT_PASSWORD_FORMAT)
  .required(REQUIRED);

export const signUpForm = object({
  name: string().required(REQUIRED),
  phone: PHONE_REQUIREMENTS,
  password: PASSWORD_REQUIREMENTS,
});

export const signInForm = object({
  phone: PHONE_REQUIREMENTS,
  password: string().min(8, SHORT_FIELD).required(REQUIRED),
});

export const recoveryNewPassword = object({
  phone: PHONE_REQUIREMENTS,
  password: PASSWORD_REQUIREMENTS,
  repeatPassword: string()
    .oneOf([ref('password')], NOT_MATCHING_PASSWORDS)
    .required(REQUIRED),
});
