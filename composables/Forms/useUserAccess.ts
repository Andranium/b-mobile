import type { FormSubmitEvent } from '@nuxt/ui';
import type {UserBase, UserRegistration} from "~/composables/Forms/types";

export const useUserAccess = () => {
  const toast = useToast();
  const registrationConfirm = ref(false);

  const loading = ref(false);

  const { fetch } = useUserSession();

  const router = useRouter();

  const errorHandler = (error: unknown) => {
    const errorTexts = {
      title: "Не удалось выполнить запрос",
      description: "Пожалуйста, попробуйте снова через несколько минут. Если проблема сохраняется, обратитесь в поддержку."
    }

    const tooManyRequests = (error as { message: string }).message.includes('429');

    if (tooManyRequests) {
      errorTexts.title = 'Слишком много запросов';
      errorTexts.description = 'Вы отправили слишком много запросов. Пожалуйста, подождите 60 секунд и попробуйте снова. Если проблема сохраняется, обратитесь в поддержку.';
    }

    toast.add({
      ...errorTexts,
      color: 'error',
      duration: 5000,
    });
  }

  const sendCode = async (event: FormSubmitEvent<UserRegistration>) => {
    try {
      loading.value = true;

      await $fetch('/api/auth/sendCode', {
        method: 'post',
        body: {
          phone: event.data.phone
        }
      });

      loading.value = false;
      registrationConfirm.value = true;

      toast.add({
        title: 'Код подтверждения отправлен',
        description: 'Мы отправили код на ваш номер телефона. Проверьте SMS и введите код в поле ниже. Если код не пришел, запросите новый через 60 секунд.',
        color: 'success',
      });

    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      loading.value = false;
    }
  };

  const userSignin = async (
    event: FormSubmitEvent<UserBase> | { data: UserBase },
  ) => {
    try {
      loading.value = true;

      await $fetch('/api/auth/login', {
        method: 'post',
        body: event.data,
      });

      await fetch();

      await router.push('/');
    } catch (error) {
      errorHandler(error);
    } finally {
      loading.value = false;
    }
  };

  const registerUser = async (data: UserRegistration) => {
    try {
      await $fetch('/api/auth/registerUser', {
        method: 'post',
        body: data
      });

      toast.add({
        title: 'Добро пожаловать! Ваш аккаунт успешно создан!',
        description: 'Переводим вас на главную страницу...',
        color: 'success',
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  const confirmCode = async (data: UserRegistration & { code: string }) => {
    try {
      loading.value = true;

      await $fetch('/api/auth/confirmCode', {
        method: 'post',
        body: {
          phone: data.phone,
          code: data.code
        }
      });

      await registerUser(data);

      await userSignin({ data });
    } catch (error) {
      errorHandler(error);
    }
  }

  return {
    sendCode,
    userSignin,
    confirmCode,
    loading,
    registrationConfirm
  };
};
