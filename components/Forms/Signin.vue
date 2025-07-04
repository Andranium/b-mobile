<template>
  <div class="sign-in">
    <UCard class="sign-in__card">
      <template #header>
        <div class="font-bold">
          Вход
        </div>
      </template>

      <UForm
          ref="form"
          :schema="schema"
          class="sign-in__form"
          :state="state"
          @submit="userAccess.userSignin"
      >
        <UFormField label="Телефон" name="phone">
          <UInput
              v-model="state.phone"
              v-maska="phoneMask"
              variant="soft"
              size="xl"
              class="w-full"
              placeholder="+7 (999) 999-99-99"
          />
        </UFormField>

        <UFormField
            label="Пароль"
            name="password"
        >
          <UInput
              v-model="state.password"
              variant="soft"
              size="xl"
              class="w-full" type="password"
              placeholder="*********"
          />
        </UFormField>
      </UForm>

      <template #footer>
        <UButton
            size="lg"
            color="primary"
            @click="signinUser"
        >
          Войти
        </UButton>

        <ULink class="ml-2">
          Забыл пароль
        </ULink>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { phoneMask } from "~/utils";
import { signInForm } from "~/schemas";
import type { InferType } from "yup";
import type { SigninUser } from "~/components/Forms/types";
import { useUserAccess } from "~/composables/Forms/useUserAccess";

const schema = signInForm;

const form = ref();

type Schema = InferType<typeof schema>

const signinUser = () => form.value.submit();

const userAccess = useUserAccess<Schema>();

const state = reactive<SigninUser>({
  phone: '',
  password: '',
});
</script>

<style scoped lang="scss">
.sign-in {
  &__card {
    width: 450px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
