import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'scale', mode: 'out-in' },
  },

  alias: {
    models: fileURLToPath(new URL('./models/', import.meta.url)),
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
  ],

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  eslint: {
    lintOnStart: false,
  },

  googleFonts: {
    families: {
      Inter: true,
      'Scheherazade New': true,
    },
    display: 'swap',
    preload: true,
    download: true,
  },

  imports: {
    dirs: ['stores'],
  },

  pinia: {
    autoImports: ['defineStore'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
    viewer: false,
  },
})
