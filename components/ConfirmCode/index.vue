<template>
  <div class="confirm-code">
    <p>
      {{ text }}
    </p>

    <p>
      Код отправлен на: <strong>{{ phone }}</strong>
    </p>

    <UPinInput length="4" otp @complete="pinFilled" />

    <p>Пожалуйста, проверьте SMS и введите код.</p>

    <ULink :disabled="seconds > 0" @click="requestNewCode"
      >запросите новый код
      <span v-if="seconds > 0">({{ seconds }} сек.)</span></ULink
    >
  </div>
</template>

<script setup lang="ts">
import { useUserAccess } from '~/composables/Forms/useUserAccess';

const { text, phone } = defineProps<{ text: string; phone: string }>();

const userAccess = useUserAccess();

const emits = defineEmits(['code:confirmed']);

const pinFilled = async (code: string[]) => {
  const codeStr = code.join('');

  try {
    await $fetch('/api/auth/confirmCode', {
      method: 'post',
      body: {
        phone,
        code: codeStr,
      },
    });

    userAccess.codeConfirmed.value = true;

    emits('code:confirmed');
  } catch (error: unknown) {
    userAccess.caughtError(error);
  }
};

const seconds = ref(60);

const interval = ref();

const timer = () => {
  if (!import.meta.client) {
    return;
  }

  seconds.value = 60;

  interval.value = setInterval(() => {
    if (seconds.value <= 0) {
      clearInterval(interval.value);
    }

    seconds.value--;
  }, 1000);
};

const requestNewCode = () => userAccess.sendVerificationCode(phone);

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

watch(() => userAccess.codeSent.value, timer, {
  immediate: true,
});
</script>

<style scoped lang="scss">
.confirm-code {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
}
</style>
