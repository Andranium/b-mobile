import type { SignupUserData } from '~/components/Forms/types';
import type { UserBase } from '~/composables/Forms/types';

export const useUserAccess = () => {
  const router = useRouter();
  const toast = useToast();

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

      codeConfirmed.value = true;

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

  const userSignin = async (data: UserBase) => {
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

  const confirmCode = async (data: SignupUserData & { code: string }) => {
    try {
      await $fetch('/api/auth/confirmCode', {
        method: 'post',
        body: {
          phone: data.phone,
          code: data.code,
        },
      });

      await registerUser(data);

      await userSignin(data);
    } catch (error) {
      caughtError(error);
    }
  };

  return {
    codeConfirmed,
    confirmCode,
    errorHandler,
    userSignin,
    sendVerificationCode,
  }
}
