<template>
  <div class="sign-up__confirm">
    <p>
      Для завершения регистрации введите код, который мы отправили на ваш номер.
      Это поможет нам убедиться, что вы — это вы, и защитить ваш аккаунт.
    </p>

    <p>
      Код отправлен на: <strong>{{ state.phone }}</strong>
    </p>

    <UPinInput length="4" otp @complete="confirmCode" />

    <p>Пожалуйста, проверьте SMS и введите код.</p>

    <ULink disabled>запросите новый код</ULink>
  </div>
</template>

<script setup lang="ts">
import type { SignupUserData } from '~/components/Forms/types';
import { useUserAccess } from '~/composables/Forms/useUserAccess';

const { state } = defineProps<{ state: SignupUserData }>();

const userAccess = useUserAccess();

const confirmCode = (code: string[]) => {
  userAccess.confirmCode({
    ...state,
    code: code.join(''),
  });
};
</script>

<style scoped lang="scss"></style>
