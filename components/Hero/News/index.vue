<template>
  <div class="news shadow-md">
    <client-only>
      <swiper-container ref="news" :init="false">
        <swiper-slide v-for="n in 5" :key="n">
          hello {{ n }}
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

const swiper = useSwiper(news, {
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

const slides = reactive(Array.from({ length: 10 }));

onMounted(() => {
  console.log(swiper.instance);
});
</script>

<style scoped lang="scss">
.news {
  flex: 1;
  width: 100%;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  border-radius: 16px;
}

swiper-container {
  height: 100%;
  border-radius: 16px;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  height: 100%;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  background-color: gray;
  border-radius: 16px;
}
</style>
