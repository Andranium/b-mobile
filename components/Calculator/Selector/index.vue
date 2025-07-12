<template>
  <div
      class="calculator-selector"
      :class="{ 'calculator-selector--active': value }"
  >
    <div class="calculator-selector__content">
      <div class="calculator-selector__placeholder">
        {{ placeholder }}
      </div>

      <div
          v-if="value"
          class="calculator-selector__value"
      >
        {{ value }}
      </div>
    </div>

    <UIcon
       v-if="value"
       name="material-symbols:close-small-outline-rounded"
       size="sm"
       class="calculator-selector__close size-6"
       @click.stop="emits('clearData')"
    />
  </div>
</template>

<script setup lang="ts">
const { placeholder } = defineProps<{ placeholder: string, value: string }>();

const emits = defineEmits(["clearData"]);
</script>

<style scoped lang="scss">
.calculator-selector {
  background-color: var(--light-gray);
  border-radius: 8px;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  cursor: pointer;
  font-weight: 600;

  &--active {
    background-color: var(--color-light-primary);
    color: var(--color-primary);

    .calculator-selector__placeholder {
      font-size: 1rem;
    }
  }

  &__placeholder {
    font-size: 1.125rem;
  }

  &__value {
    font-size: 1.125rem;
  }

  &__close {
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
