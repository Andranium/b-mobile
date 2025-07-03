import type {FormSubmitEvent} from "@nuxt/ui";

export const useUserAccess = <T>() => {
    const toast = useToast()

    const userSignup = (event: FormSubmitEvent<T>) => {
        toast.add({ title: 'Добро пожаловать', description: 'Ваш аккаунт создан.', color: 'primary' });

        console.log(event.data);
    }

    return {
        userSignup
    }
};
