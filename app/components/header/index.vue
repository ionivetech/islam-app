<script setup lang="ts">
import { Icon } from '@iconify/vue';

const route = useRoute()
const colorMode = useColorMode()

// Variables
const menus: { url: string; label: string }[] = [
  { url: '/al-quran', label: 'Al-Quran' },
  { url: '/hadith', label: 'Hadits' },
  { url: '/prayer', label: 'Doa' },
  { url: '/schedule', label: 'Jadwal Sholat' },
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
    :class="{ fixed: route.name !== 'al-quran-id' }"
    class="top-0 z-50 h-16 w-full border-b border-slate-700/10 bg-white py-4 backdrop-blur dark:border-slate-300/10 dark:bg-background-dark/75"
  >
    <div class="container flex items-center justify-between">
      <div class="flex items-center">
        <!-- Icon -->
        <NuxtLink
          to="/"
          class="flex items-center md:mr-5"
        >
          <img
            src="/logo-full.svg"
            alt="logo-app"
            width="121"
            height="24"
          >
        </NuxtLink>

        <!-- Menu -->
        <div class="hidden items-center gap-x-5 md:flex">
          <NuxtLink
            v-for="menu in menus"
            :key="menu.url"
            :to="menu.url"
            :class="
              route.path.includes(menu.url)
                ? 'text-teal-600 dark:text-teal-500 font-semibold'
                : 'text-yami/75 dark:text-gray-400'
            "
            class="text-base transition duration-200 ease-in-out hover:text-teal-700 dark:hover:text-teal-500"
          >
            {{ menu.label }}
          </NuxtLink>
        </div>
      </div>

      <!-- Toggle dark mode -->
      <div
        class="flex size-8 cursor-pointer items-center justify-center rounded-md text-lg transition-all duration-100 ease-in-out hover:bg-slate-200/50 dark:hover:bg-slate-800"
        @click="isDark = !isDark"
      >
        <Icon :icon="isDark ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'" />
      </div>
    </div>
  </header>
</template>
