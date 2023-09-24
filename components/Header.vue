<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()

// Variables
const menus: { url: string; label: string }[] = [
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
    :class="{ fixed: route.name !== 'al-quran-id' }"
    class="top-0 z-10 h-16 w-full border-b border-slate-700/10 bg-background-light px-3 py-4 dark:border-slate-300/10 dark:bg-background-dark/70 dark:backdrop-blur"
  >
    <div class="container flex justify-between">
      <div class="flex items-center space-x-5">
        <p class="text-2xl font-semibold text-yami dark:text-white">ISLAM APP</p>

        <!-- Menu -->
        <nav>
          <ul class="flex items-center gap-x-5">
            <li
              v-for="menu in menus"
              :key="menu.url"
            >
              <NuxtLink
                :to="menu.url"
                :class="
                  route.path.includes(menu.url)
                    ? 'text-teal-700 dark:text-teal-500'
                    : 'text-yami/75 dark:text-gray-400'
                "
                class="text-base transition duration-200 ease-in-out hover:text-teal-700 dark:hover:text-teal-500"
              >
                {{ menu.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Toggle dark mode -->
      <div
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-lg transition-all duration-100 ease-in-out hover:bg-slate-200/50 dark:hover:bg-slate-800"
        @click="isDark = !isDark"
      >
        <Icon :name="isDark ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'" />
      </div>
    </div>
  </header>
</template>
