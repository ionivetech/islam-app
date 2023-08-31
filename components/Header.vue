<script setup lang="ts">
const route = useRoute()

// Variables
const menus: { url: string; label: string }[] = [
  { url: '/', label: 'Home' },
  { url: '/al-quran', label: 'Al-Quran' },
  { url: '/hadist', label: 'Hadist' },
  { url: '/doa', label: 'Doa-doa' },
]
</script>

<template>
  <header class="w-full bg-white px-3 py-4 shadow-header">
    <div class="container flex items-center space-x-5">
      <p class="text-2xl font-semibold text-slate-800">ISLAM APP</p>

      <nav>
        <ul class="flex items-center gap-x-5">
          <li
            v-for="menu in menus"
            :key="menu.url"
          >
            <NuxtLink
              :to="menu.url"
              :active-class="menu.url === route.path ? '!text-emerald-700 font-semibold' : ''"
              class="text-base text-slate-700 transition duration-200 ease-in-out hover:text-emerald-700"
            >
              {{ menu.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
