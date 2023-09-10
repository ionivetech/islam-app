<script setup lang="ts">
const colorMode = useColorMode()

// Variables
const menus: { url: string; label: string }[] = [
  { url: '/', label: 'Home' },
  { url: '/al-quran', label: 'Al-Quran' },
  { url: '/hadist', label: 'Hadist' },
  { url: '/doa', label: 'Doa-doa' },
]

const isDark = computed<boolean>({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <header
    class="fixed top-0 z-10 h-16 w-full border-b border-slate-700/10 bg-background-light px-3 py-4 shadow backdrop-blur-lg dark:border-slate-300/10 dark:bg-background-dark/70"
  >
    <div class="container flex justify-between">
      <div class="flex items-center space-x-5">
        <p class="text-2xl font-semibold text-slate-800 dark:text-slate-100">ISLAM APP</p>

        <nav>
          <ul class="flex items-center gap-x-5">
            <li
              v-for="menu in menus"
              :key="menu.url"
            >
              <NuxtLink
                :to="menu.url"
                :active-class="'text-slate-700 dark:text-teal-600'"
                :exact-active-class="'text-teal-700 dark:text-teal-600'"
                class="text-base text-slate-700 transition duration-200 ease-in-out hover:text-teal-700 dark:text-slate-200 dark:hover:text-teal-600"
              >
                {{ menu.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Toggle dark mode -->
      <div
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-lg transition-all duration-200 ease-in-out hover:bg-slate-200/50 dark:hover:bg-slate-800"
        @click="isDark = !isDark"
      >
        <UIcon :name="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" />
      </div>
    </div>
  </header>
</template>
