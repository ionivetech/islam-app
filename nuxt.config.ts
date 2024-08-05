import process from 'node:process'

const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
    typescriptBundlerResolution: true,
  },

  devtools: { enabled: true },

  app: {
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

  css: ['./assets/css/main.scss'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
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

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
  ],

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    analyze: true,
  },

  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
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
        },
        {
          src: '/icon-pwa/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/icon-pwa/maskable-icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },

  routeRules: {
    '/': { prerender: true, redirect: '/al-quran' },
    '/hadith': { isr: 3600 },
    '/prayer': { isr: 3600 },
    '/schedule': { ssr: false },
  },

  compatibilityDate: '2024-07-03',
})