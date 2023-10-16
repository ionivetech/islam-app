import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'name', content: 'Islam Application' },
        { name: 'author', content: 'Ionive Tech' },
      ],
      htmlAttrs: {
        lang: 'id',
      },
    },
  },

  alias: {
    models: fileURLToPath(new URL('./models/', import.meta.url)),
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  eslint: {
    lintOnStart: false,
  },

  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'Scheherazade New': true,
    },
    display: 'swap',
    preload: true,
    download: true,
  },

  imports: {
    dirs: ['stores'],
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
  ],

  pinia: {
    autoImports: ['defineStore'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === 'production'
          ? { preset: ['default', { discardComments: { removeAll: true } }] }
          : false, // disable cssnano when not in production
    },
  },

  pwa: {
    manifest: {
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      name: 'Islam Application',
      short_name: 'Islam App',
      description: 'Web application for the Islamic religion',
      icons: [
        {
          src: '/icon-pwa/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-pwa/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: '/icon-pwa/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icon-pwa/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      cleanupOutdatedCaches: false,
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
    viewer: false,
  },
})
