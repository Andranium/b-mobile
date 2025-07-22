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

    <ULink :disabled="seconds > 0" @click="sendNewCode"
      >запросите новый код
      <span v-if="seconds > 0">({{ seconds }} сек.)</span></ULink
    >
  </div>
</template>

<script setup lang="ts">
import type { SignupUserData } from '~/components/Forms/types';
import { useUserAccess } from '~/composables/Forms/useUserAccess';

const { state } = defineProps<{ state: SignupUserData }>();

const userAccess = useUserAccess();

const seconds = ref(60);

const interval = ref();

const timer = () => {
  seconds.value = 60;

  interval.value = setInterval(() => {
    if (seconds.value <= 0) {
      clearInterval(interval.value);
    }

    seconds.value--;
  }, 1000);
};

const confirmCode = (code: string[]) => {
  userAccess.confirmCode({
    ...state,
    code: code.join(''),
  });
};

const sendNewCode = async () => {
  try {
    await userAccess.sendCode({ data: state });

    timer();
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  timer();
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<style scoped lang="scss"></style>
