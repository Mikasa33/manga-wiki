// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: false,
    layoutTransition: false,
  },
  compatibilityDate: '2024-04-03',
  // https://content.nuxt.com/
  content: {},
  // https://nuxt.com/modules/dayjs/
  dayjs: {},
  // https://devtools.nuxt.com/
  devtools: {
    enabled: true,
  },
  // https://eslint.nuxt.com/
  eslint: {
    config: {
      standalone: false,
    },
  },
  extends: ['@nuxt/ui-pro'],
  future: {
    compatibilityVersion: 4,
  },
  // https://image.nuxt.com/
  image: {},
  // https://nuxt.com/modules/lodash/
  lodash: {},
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    'nuxt-lodash',
  ],
  // https://ui.nuxt.com/
  ui: {
    global: true,
  },
  // https://ui.nuxt.com/pro/
  uiPro: {},
})
