<script setup lang="ts">
// Variables
const menus: { url: string; label: string }[] = [
  { url: '/', label: 'Home' },
  { url: '/al-quran', label: 'Al-Quran' },
  { url: '/hadist', label: 'Hadist' },
  { url: '/doa', label: 'Doa-doa' },
]
</script>

<template>
  <header class="fixed top-0 z-10 h-16 w-full bg-white px-3 py-4 shadow">
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
              :active-class="'text-slate-700'"
              :exact-active-class="'text-teal-700'"
              class="text-base text-slate-700 transition duration-200 ease-in-out hover:text-teal-700"
            >
              {{ menu.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
