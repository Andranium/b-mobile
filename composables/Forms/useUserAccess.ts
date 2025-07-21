import type { FormSubmitEvent } from '@nuxt/ui';

export const useUserAccess = () => {
  const toast = useToast();

  const loading = ref(false);

  const { fetch } = useUserSession();

  const router = useRouter();

  const userSignup = (event: FormSubmitEvent<unknown>) => {
    toast.add({
      title: 'Добро пожаловать',
      description: 'Ваш аккаунт создан.',
      color: 'primary',
    });

    console.log(event.data);
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

  return {
    userSignup,
    userSignin,
    loading,
  };
};
