<template>
  <div class="sign-up">
    <UCard class="sign-up__card">
      <template #header>
        <div class="font-bold">Регистрация</div>
      </template>

      <TransitionFade mode="out-in">
        <ConfirmCode
          v-if="userAccess.codeSent.value"
          text="Для завершения регистрации введите код, который мы отправили на ваш номер.
      Это поможет нам убедиться, что вы — это вы, и защитить ваш аккаунт."
          :phone="state.phone"
          @code:confirmed="createUser"
        />

        <UForm
          v-else
          ref="form"
          :schema="schema"
          :state="state"
          class="sign-up__form"
          @submit="execute"
        >
          <UFormField label="Имя" name="first_name">
            <UInput
                v-model="state.first_name"
                variant="soft"
                size="xl"
                class="w-full"
                placeholder="Иван"
            />
          </UFormField>

          <UFormField label="Фамилия" name="middle_name">
            <UInput
                v-model="state.middle_name"
                variant="soft"
                size="xl"
                class="w-full"
                placeholder="Иванов"
            />
          </UFormField>
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

          <UFormField label="Пароль" name="password" :ui="{ error: 'hidden' }">
            <UInput
              v-model="state.password"
              variant="soft"
              size="xl"
              class="w-full"
              :type="passwordShown ? 'text' : 'password'"
              placeholder="*********"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="passwordShown ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="
                    passwordShown ? 'Показать пароль' : 'Скрыть пароль'
                  "
                  :aria-pressed="passwordShown"
                  aria-controls="password"
                  @click="passwordShown = !passwordShown"
                />
              </template>
            </UInput>
          </UFormField>

          <FormsSignupPasswordRequirements :password="state.password" />
        </UForm>
      </TransitionFade>

      <template #footer>
        <TransitionFade mode="out-in">
          <div v-if="!userAccess.codeSent.value" class="sign-up__footer">
            <UButton
              :loading="status === 'pending'"
              size="lg"
              color="primary"
              @click="signupUser"
            >
              Регистрация
            </UButton>

            <ULink class="ml-2" to="/signin"> Есть аккаунт </ULink>
          </div>

          <div class="sign-up__footer">
            <UButton size="lg" variant="soft" color="secondary" @click="goBack"
              >Назад</UButton
            >
          </div>
        </TransitionFade>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { SignupUserData } from '~/components/Forms/types';
import { signUpForm } from '~/utils/schemas';
import { phoneMask } from '~/utils';
import { useUserAccess } from '~/composables/Forms/useUserAccess';

const schema = signUpForm;

const goBack = () => {
  userAccess.codeSent.value = false;
};

const userAccess = useUserAccess();

const form = ref();

const signupUser = () => form.value.submit();

const state = reactive<SignupUserData>({
  first_name: '',
  middle_name: '',
  phone: '',
  password: '',
});

const passwordShown = ref(false);

const { status, execute } = useAsyncData(
  'sendVerificationCode',
  () => userAccess.sendVerificationCode(state.phone),
  {
    immediate: false,
    lazy: true,
  },
);

const createUser = () => {
  userAccess.registerUser(state);
};
</script>

<style scoped lang="scss">
.sign-up {
  &__card {
    width: 450px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__footer {
    display: flex;
    align-items: center;
  }
}
</style>
