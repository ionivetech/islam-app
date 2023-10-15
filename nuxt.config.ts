import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
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
    registerType: 'autoUpdate',
    manifest: {
      name: 'Islam App',
      short_name: 'IslamApp',
      description: 'Web application for the Islamic religion',
      start_url: '/al-quran',
      scope: '/al-quran',
      theme_color: '#FFFFFF',
      icons: [
        {
          src: 'logo-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'logo-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'logo-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/al-quran',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
    viewer: false,
  },
})
