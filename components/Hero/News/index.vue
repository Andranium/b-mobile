<template>
  <div class="news shadow-md">
    <client-only>
      <swiper-container ref="news" :init="false">
        <swiper-slide class="news-slide news-slide--scooters">
          <h3 class="news-slide__title">
            Новинка ! <br />
            Электроскутеры
          </h3>
        </swiper-slide>

        <swiper-slide class="news-slide news-slide--investment">
          <h3 class="news-slide__title">
            Инвестиции с перспективой: <br />
            Начните сегодня
          </h3>
        </swiper-slide>
      </swiper-container>

      <template #fallback>
        <USkeleton class="h-full w-full" />
      </template>
    </client-only>
  </div>
</template>

<script setup lang="ts">
const news = ref();

useSwiper(news, {
  effect: 'fade',
  loop: true,
  spaceBetween: 16,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  pagination: {
    enabled: true,
    clickable: true,
    dynamicBullets: true,
  },
  injectStyles: [
    `
    .swiper-pagination-bullet-active {
      background-color: var(--color-primary) !important;
    }
    `,
  ],
});
</script>

<style scoped lang="scss">
.news {
  flex: 1;
  width: 100%;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  border-radius: 1rem;
}

swiper-container {
  height: 100%;
  border-radius: 1rem;
}

swiper-slide {
  height: 100%;
  border-radius: 1rem;
}

.news-slide {
  padding: 2rem;
  cursor: pointer;

  &--scooters {
    background:
      url('@/assets/image/electro-scooter.png') no-repeat bottom right,
      radial-gradient(circle at center, #f0f0f0 0%, #add8e6 100%);
    color: var(--color-secondary);
    background-size: 65%, contain;
  }

  &--investment {
    background:
      url('@/assets/image/investment.png') no-repeat 111% 117%,
      radial-gradient(circle at center, #0083c0 0%, #3553a9 100%);
    color: white;
    background-size: 65%, contain;
  }

  &__title {
    font-size: 2rem;
    font-weight: 600;
  }
}
</style>
