<template>
  <div class="password-recovery">
    <UCard class="password-recovery__card">
      <template #header>
        <div class="font-bold">Восстановить пароля</div>
      </template>

      <TransitionFade mode="out-in">
        <ConfirmCode
          v-if="userAccess.codeSent.value"
          text="Для завершения регистрации введите код, который мы отправили на ваш номер.
      Это поможет нам убедиться, что вы — это вы, и защитить ваш аккаунт."
          :phone="state.phone"
          @code:confirmed="triggerRecovery"
        />

        <UForm
          v-else
          ref="form"
          :state="state"
          :schema="schema"
          class="password-recovery__form"
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

          <UFormField label="Новый пароль" name="password">
            <UInput
              v-model="state.password"
              variant="soft"
              :type="passwordShown ? 'text' : 'password'"
              size="xl"
              class="w-full"
              placeholder="Пароль"
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

          <UFormField label="Повторите новый пароль" name="repeatPassword">
            <UInput
              v-model="state.repeatPassword"
              variant="soft"
              :type="repeatPasswordShown ? 'text' : 'password'"
              size="xl"
              class="w-full"
              placeholder="Пароль"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="
                    repeatPasswordShown ? 'i-lucide-eye-off' : 'i-lucide-eye'
                  "
                  :aria-label="
                    repeatPasswordShown ? 'Показать пароль' : 'Скрыть пароль'
                  "
                  :aria-pressed="repeatPasswordShown"
                  aria-controls="password"
                  @click="repeatPasswordShown = !repeatPasswordShown"
                />
              </template>
            </UInput>
          </UFormField>

          <FormsSignupPasswordRequirements
            class="new-password__password-requirements"
            :password="state.password"
          />
        </UForm>
      </TransitionFade>

      <template #footer>
        <UButton
          size="lg"
          color="primary"
          :loading="isLoading"
          @click="recoverPassword"
        >
          Восстановить пароль
        </UButton>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useUserAccess } from '~/composables/Forms/useUserAccess';
import { phoneMask } from '~/utils';
import type { RecoveryPassword } from '~/components/Forms/types';
import { recoveryNewPassword } from '~/utils/schemas';

const schema = recoveryNewPassword;

const userAccess = useUserAccess();

const form = ref();

const passwordShown = ref(false);
const repeatPasswordShown = ref(false);

const recoverPassword = () => form.value.submit();

const state = reactive<RecoveryPassword>({
  phone: '',
  password: '',
  repeatPassword: '',
});

const { status, execute } = useAsyncData(
  'sendVerificationCode',
  () => userAccess.sendVerificationCode(state.phone),
  {
    immediate: false,
    lazy: true,
  },
);

const isLoading = computed(() => status.value === 'pending');

const triggerRecovery = () => userAccess.passwordRecovery(state);
</script>

<style scoped lang="scss">
.password-recovery {
  &__card {
    width: 450px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__password-requirements {
    margin-top: 16px;
  }
}
</style>
