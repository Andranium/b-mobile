<template>
  <div class="settings">
    <UForm ref="form" :state="state" class="settings__form">
      <UFormField label="Телефон" name="phone">
        <UInput
          v-model="state.phone"
          v-maska="phoneMask"
          variant="soft"
          size="xl"
          class="w-full"
          placeholder="+7 (999) 999-99-99"
          disabled
        />
      </UFormField>

      <UFormField label="Email" name="Email">
        <UInput v-model="state.email" variant="soft" size="xl" class="w-full" />
      </UFormField>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { phoneMask } from '~/utils';

const state = reactive({
  phone: '9601772233',
  email: 'a@mail.ru',
});
</script>

<style scoped lang="scss">
.settings {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 450px;
  }
}
</style>
