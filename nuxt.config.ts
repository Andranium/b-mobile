// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-swiper',
    '@morev/vue-transitions/nuxt',
    '@nuxtjs/leaflet',
    '@pinia/nuxt',
    'nuxt-auth-utils',
  ],

  css: ['~/assets/css/main.css'],

  icon: {
    cssLayer: 'components',
  },

  runtimeConfig: {
    session: {
      name: 'b-mobile',
      password: process.env.NUXT_SESSION_PASSWORD!,
      cookie: {
        secure: false,
      },
    },
  },
});
