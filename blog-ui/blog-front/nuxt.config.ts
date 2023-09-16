// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: 'http://192.168.166.110/api',
    },
  },
  css: ['animate.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxt/image-edge',
    '@pinia/nuxt',
  ],
  colorMode: {
    classSuffix: '',
  },
  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: './assets/style/tailwind.css',
  },
})
