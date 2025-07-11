import type {FormSubmitEvent} from "@nuxt/ui";

export const useUserAccess = <T>() => {
    const toast = useToast()

    const userSignup = (event: FormSubmitEvent<T>) => {
        toast.add({ title: 'Добро пожаловать', description: 'Ваш аккаунт создан.', color: 'primary' });

        console.log(event.data);
    }

    const userSignin = (event: FormSubmitEvent<T>) => {
        toast.add({ title: 'Добро пожаловать', description: 'Вы успешно зашли в аккаунт.', color: 'primary' });

        console.log(event.data);
    }

    return {
        userSignup,
        userSignin
    }
};
