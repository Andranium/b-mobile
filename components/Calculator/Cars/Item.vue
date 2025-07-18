<template>
  <div class="calculator-cars-item">
    <div class="calculator-cars-item__info">
      <div class="font-bold">Lexus RX 300t</div>

      <div class="text-sm">3500 сутки</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.calculator-cars-item {
  overflow: hidden;
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  cursor: pointer;
  background: url('@/assets/image/lex.jpg');
  background-size: cover;

  &--active {
    border: 2px solid var(--color-primary);

    .calculator-cars-item__info {
      background-color: var(--color-primary);
    }
  }

  &__info {
    width: 75%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    border-radius: 0 0 24px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 8px;
  }
}
</style>
