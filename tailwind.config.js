/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    fontFamily: {
      sans: 'Open Sans, sans-serif',
      mono: 'Scheherazade New, serif',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    extend: {
      boxShadow: {
        header: '0 4px 10px rgba(240, 240, 240, 1)',
      },
      gridTemplateColumns: {
        'quran-list': 'repeat(auto-fill, minmax(330px, 1fr))',
      },
    },
  },
  plugins: [],
}
