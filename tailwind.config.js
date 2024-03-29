/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      sans: 'Inter, sans-serif',
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
      colors: {
        'background-light': 'rgb(255, 255, 255)',
        'background-dark': 'rgb(31, 33, 37)',
        'background-dark-soft': 'rgb(37, 41, 47)',
        yami: 'rgb(17, 24, 39)',
        'smoke-1': 'rgb(55, 65, 81)',
        'smoke-2': 'rgb(209, 213, 219)',
      },
      boxShadow: {
        header: '0 4px 10px rgba(240, 240, 240, 1)',
        'surah-card': '0px 0px 12px #E7E7E7',
        'surah-card-dark': '0px 0px 12px #181616',
        slideover: '0px 4px 4px rgba(120, 120, 120, 0.25)',
      },
      gridTemplateColumns: {
        'quran-list-lg': 'repeat(auto-fill, minmax(275px, 1fr))',
        'quran-list': 'repeat(auto-fill, minmax(240px, 1fr))',
        'prayer-time': 'repeat(auto-fill, minmax(220px, 1fr))',
      },
    },
  },
  plugins: [],
}
