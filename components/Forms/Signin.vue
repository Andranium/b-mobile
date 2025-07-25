<template>
  <div class="sign-in">
    <UCard class="sign-in__card">
      <template #header>
        <div class="font-bold">Вход</div>
      </template>

      <UForm
        ref="form"
        :schema="schema"
        class="sign-in__form"
        :state="state"
        @submit="execute"
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

        <UFormField label="Пароль" name="password">
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
      </UForm>

      <template #footer>
        <div class="sign-in__footer">
          <UButton
            size="lg"
            color="primary"
            :loading="isLoading"
            @click="signinUser"
          >
            Войти
          </UButton>

          <ULink to="/password-recovery" class="ml-2"> Забыл пароль </ULink>

          <ULink to="/signup" class="ml-auto">Создать аккаунт</ULink>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { phoneMask } from '~/utils';
import { signInForm } from '~/utils/schemas';
import type { SigninUser } from '~/components/Forms/types';
import { useUserAccess } from '~/composables/Forms/useUserAccess';

const schema = signInForm;

const passwordShown = ref(false);

const form = ref();

const signinUser = () => form.value.submit();

const userAccess = useUserAccess();

const state = reactive<SigninUser>({
  phone: '',
  password: '',
});

const { execute, status } = useAsyncData(
  'signIn',
  () => userAccess.userSignin(state),
  {
    immediate: false,
    lazy: true,
  },
);

const isLoading = computed(() => status.value === 'pending');
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

  &__footer {
    display: flex;
    align-items: center;
  }
}
</style>
