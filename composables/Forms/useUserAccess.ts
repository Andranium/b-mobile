import type {
  RecoveryPassword,
  SigninUser,
  SignupUserData,
} from '~/types/forms';

export const useUserAccess = () => {
  const router = useRouter();
  const toast = useToast();

  const codeSent = ref(false);
  const codeConfirmed = ref(false);

  const { fetch } = useUserSession();

  const errorHandler = (status: number) => {
    const errorTexts = {
      title: 'Не удалось выполнить запрос',
      description:
        'Пожалуйста, попробуйте снова через несколько минут. Если проблема сохраняется, обратитесь в поддержку.',
    };

    if (status === 429) {
      errorTexts.title = 'Слишком много запросов';
      errorTexts.description =
        'Вы отправили слишком много запросов. Пожалуйста, подождите 60 секунд и попробуйте снова. Если проблема сохраняется, обратитесь в поддержку.';
    }

    toast.add({
      ...errorTexts,
      color: 'error',
      duration: 5000,
    });
  };

  const caughtError = (error: unknown) => {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      errorHandler(error.statusCode as number);
    }
  };

  const registerUser = async (data: SignupUserData) => {
    try {
      await $fetch('/api/auth/registerUser', {
        method: 'post',
        body: data,
      });

      await userSignin(data);

      toast.add({
        title: 'Добро пожаловать! Ваш аккаунт успешно создан!',
        description: 'Переводим вас на главную страницу...',
        color: 'success',
      });
    } catch (error: unknown) {
      caughtError(error);
    }
  };

  const sendVerificationCode = async (phone: string) => {
    try {
      await $fetch('/api/auth/sendCode', {
        method: 'post',
        body: {
          phone,
        },
      });

      codeSent.value = true;

      toast.add({
        title: 'Код подтверждения отправлен',
        description:
          'Мы отправили код на ваш номер телефона. Проверьте SMS и введите код в поле ниже. Если код не пришел, запросите новый через 60 секунд.',
        color: 'success',
      });
    } catch (error: unknown) {
      caughtError(error);
    }
  };

  const userSignin = async (data: SigninUser) => {
    try {
      await $fetch('/api/auth/login', {
        method: 'post',
        body: data,
      });

      await fetch();

      await router.push('/');
    } catch (error) {
      caughtError(error);
    }
  };

  const passwordRecovery = async (data: RecoveryPassword) => {
    try {
      await $fetch('/api/auth/recoverPassword', {
        method: 'post',
        body: {
          phone: data.phone,
          password: data.password,
        },
      });

      toast.add({
        title: 'Пароль успешно изменён!',
        description:
          'Ваш пароль был успешно обновлён. Вы будете перенаправлены на страницу входа.',
        color: 'success',
      });

      await router.push('/signin');
    } catch (error) {
      caughtError(error);
    }
  };

  return {
    codeSent,
    codeConfirmed,
    registerUser,
    errorHandler,
    userSignin,
    sendVerificationCode,
    passwordRecovery,
    caughtError,
  };
};
