import { object, string, ref } from 'yup';
import { phoneRegexp } from '~/utils';

const REQUIRED = 'Поле является обязательным для заполнения';
const INCORRECT_PHONE_NUMBER = 'Неверный формат номера';
const SHORT_FIELD = 'Должно быть не менее 8 символов';
const SPECIAL_SYMBOL = 'Хотя бы 1 специальный символ';
const NOT_MATCHING_PASSWORDS = 'Пароли должны быть одинаковыми.';

export const signUpForm = object({
  name: string().required(REQUIRED),
  phone: string()
    .matches(phoneRegexp, {
      message: INCORRECT_PHONE_NUMBER,
    })
    .required(REQUIRED),
  password: string()
    .min(8, SHORT_FIELD)
    .matches(/\W/, SPECIAL_SYMBOL)
    .required(REQUIRED),
});

export const signInForm = object({
  phone: string()
    .matches(phoneRegexp, {
      message: INCORRECT_PHONE_NUMBER,
    })
    .required(REQUIRED),
  password: string().min(8, SHORT_FIELD).required(REQUIRED),
});

export const recoveryNewPassword = object({
  phone: string()
    .matches(phoneRegexp, {
      message: INCORRECT_PHONE_NUMBER,
    })
    .required(REQUIRED),
  password: string().min(8, SHORT_FIELD).required(REQUIRED),
  repeatPassword: string()
    .oneOf([ref('password')], NOT_MATCHING_PASSWORDS)
    .min(8, SHORT_FIELD)
    .required(REQUIRED),
});
