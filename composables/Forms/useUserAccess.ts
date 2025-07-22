import type { FormSubmitEvent } from '@nuxt/ui';

export const useUserAccess = () => {
  const toast = useToast();
  const registrationConfirm = ref(false);

  const loading = ref(false);

  const { fetch } = useUserSession();

  const router = useRouter();

  const sendCode = async (event: FormSubmitEvent<{ phone: string, password: string, name: string }>) => {
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

    } catch (error) {
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
    } finally {
      loading.value = false;
    }
  };

  const userSignin = async (
    event: FormSubmitEvent<{ phone: string; password: string }>,
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
      console.error(error);

      toast.add({
        title: 'Не удалось войти',
        description:
          'Похоже, логин или пароль введены неверно. Пожалуйста, проверьте данные или воспользуйтесь восстановлением пароля.',
        color: 'warning',
        duration: 5000,
      });
    } finally {
      loading.value = false;
    }
  };

  const confirmCode = async (data: { phone: string, code: string, name: string }) => {
    try {
      loading.value = true;

      await $fetch('/api/auth/confirmCode', {
        method: 'post',
        body: data
      });

      console.log(data);

      await $fetch('/api/auth/registerUser', {
        method: 'post',
        body: data
      });

      await $fetch(`http://45.12.236.212:8000/auth/registration`, {
        method: 'post',
        body: data
      });

      await $fetch('/api/auth/login', {
        method: 'post',
        body: data,
      });

      await fetch();

      await router.push('/');
    } catch (error) {
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
  }

  return {
    sendCode,
    userSignin,
    confirmCode,
    loading,
    registrationConfirm
  };
};
