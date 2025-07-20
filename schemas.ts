import { object, string } from 'yup';
import { phoneRegexp } from '~/utils';

const REQUIRED = 'Поле является обязательным для заполнения';
const INCORRECT_PHONE_NUMBER = 'Неверный формат номера';
const SHORT_FIELD = 'Должно быть не менее 8 символов';

export const signUpForm = object({
  name: string().required(REQUIRED),
  phone: string()
    .matches(phoneRegexp, {
      message: INCORRECT_PHONE_NUMBER,
    })
    .required(REQUIRED),
  password: string().min(8, SHORT_FIELD).required(REQUIRED),
});

export const signInForm = object({
  phone: string()
    .matches(phoneRegexp, {
      message: INCORRECT_PHONE_NUMBER,
    })
    .required(REQUIRED),
  password: string().min(8, SHORT_FIELD).required(REQUIRED),
});
