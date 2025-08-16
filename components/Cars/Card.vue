<template>
  <div class="car-card">
    <figure class="car-card__image relative">
      <NuxtImg
          v-show="imageLoaded"
          src="https://carloson.ru/uploads/images/cars-crm/216697/9556156b-e1cf-46f3-931b-e1c7e86b7d5f-740x507_webp.webp"
          @load="imageLoaded = true"
      />

      <TransitionFade
      >
        <USkeleton v-if="!imageLoaded" class="car-card__skeleton h-full w-full" />
      </TransitionFade>
    </figure>

    <div class="car-card__price my-2">
      <span class="text-2xl">20 000 ₽</span> <span class="text-muted text-sm ml-1">/ Сутки</span>

      <UPopover class="ml-auto" mode="hover">
        <UButton
            icon="ic:outline-info"
            color="neutral"
            variant="ghost"
        />

        <template #content>
          <ul class="car-card__price-list">
            <li class="car-card__price-item flex items-center justify-between">
              <span class="font-semibold mr-8">15 000 ₽</span>
              <span class="text-muted text-sm flex items-center gap-1">
                3-7 дней
              </span>
            </li>

            <li class="car-card__price-item flex items-center justify-between">
              <span class="font-semibold mr-8">12 000 ₽</span> <span class="text-muted text-sm">7-14 дней</span>
            </li>

            <li class="car-card__price-item flex items-center justify-between">
              <span class="font-semibold mr-8">10 000 ₽</span> <span class="text-muted text-sm">14+ дней</span>
            </li>
          </ul>
        </template>
      </UPopover>
    </div>

    <div class="car-card__wrapper">
      <span class="car-card__name">Audi A8</span>

      <div class="car-card__info">
        <UIcon name="mdi:engine" class="size-6" />

        <div>Бензин</div>
      </div>

      <div class="car-card__info">
        <UIcon name="bitcoin-icons:gear-filled" class="size-6" />

        <div>Автомат</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const imageLoaded = ref(false);
</script>

<style scoped lang="scss">
.car-card {
  &:hover {
    .car-card__image {
      img {
        transform: scale(1.05);
      }
    }
  }

  &__image {
    overflow: hidden;
    border-radius: 16px;
    height: 240px;

    img {
      transition: transform 0.2s linear;
    }
  }

  &__price {
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: flex-end;
  }

  &__price-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 600;
    font-size: 18px;
    padding: 16px;
  }

  &__price-item {
    text-align: right;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 8px;
    }
  }

  &__name {
    font-size: 18px;
    font-weight: 600;
    margin-right: auto;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__info {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 8px;
  }

  &__skeleton {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
