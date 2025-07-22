<template>
  <div class="sign-up">
    <UCard class="sign-up__card">
      <template #header>
        <div
          class="font-bold"
          @click="
            userAccess.registrationConfirm.value =
              !userAccess.registrationConfirm.value
          "
        >
          Регистрация
        </div>
      </template>

      <TransitionFade mode="out-in">
        <FormsSignupConfirmCode
          v-if="userAccess.registrationConfirm.value"
          :state="state"
        />

        <UForm
          v-else
          ref="form"
          :schema="schema"
          :state="state"
          class="sign-up__form"
          @submit="userAccess.sendCode"
        >
          <UFormField label="Ваше имя" name="name">
            <UInput
              v-model="state.name"
              variant="soft"
              size="xl"
              class="w-full"
              placeholder="Иван"
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

          <UFormField label="Пароль" name="password">
            <UInput
              v-model="state.password"
              variant="soft"
              size="xl"
              class="w-full"
              type="password"
              placeholder="*********"
            />
          </UFormField>
        </UForm>
      </TransitionFade>

      <template #footer>
        <TransitionFade mode="out-in">
          <div
            v-if="!userAccess.registrationConfirm.value"
            class="sign-up__footer"
          >
            <UButton
              :loading="userAccess.loading.value"
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
import { signUpForm } from '~/schemas';
import { phoneMask } from '~/utils';
import { useUserAccess } from '~/composables/Forms/useUserAccess';

const schema = signUpForm;

const goBack = () => {
  userAccess.registrationConfirm.value = false;
};

const userAccess = useUserAccess();

const form = ref();

const signupUser = () => form.value.submit();

const state = reactive<SignupUserData>({
  name: '',
  phone: '',
  password: '',
});
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

  &__confirm {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
  }

  &__footer {
    display: flex;
    align-items: center;
  }
}
</style>
