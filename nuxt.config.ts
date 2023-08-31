import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  devtools: { enabled: true },

  alias: {
    models: fileURLToPath(new URL('./models/', import.meta.url)),
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt'],

  eslint: {
    lintOnStart: false,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
