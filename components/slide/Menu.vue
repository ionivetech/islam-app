<script setup lang="ts">
const route = useRoute()

// Emits
const emits = defineEmits(['close-slide'])

// Variables
const menus: { url: string; label: string }[] = [
  { url: '/al-quran', label: 'Al-Quran' },
  { url: '/hadith', label: 'Hadits' },
  { url: '/prayer', label: 'Doa' },
  { url: '/prayer-schedule', label: 'Jadwal Sholat' },
]
</script>

<template>
  <div class="py-6">
    <!-- Header -->
    <div
      class="mb-6 flex justify-between border-b border-slate-700/10 px-5 pb-6 dark:border-slate-300/10"
    >
      <img
        src="/logo-full.svg"
        alt="logo-app"
        height="24"
        class="w-auto"
      />

      <Icon
        name="heroicons:x-mark-solid"
        class="cursor-pointer text-xl text-yami dark:text-slate-200"
        @click="emits('close-slide')"
      />
    </div>

    <p class="mb-3 pl-5 text-sm font-semibold text-yami dark:text-slate-200">Menu</p>

    <!-- Menu -->
    <div class="flex flex-col gap-y-1">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.url"
        :to="menu.url"
        :class="
          route.path.includes(menu.url)
            ? 'text-teal-600 dark:text-teal-500 font-semibold'
            : 'text-yami/75 dark:text-gray-400'
        "
        class="block w-full px-5 py-1.5 text-base transition duration-200 ease-in-out hover:bg-gray-200/40 focus-visible:outline-none dark:hover:bg-zinc-700"
        @click="emits('close-slide')"
      >
        {{ menu.label }}
      </NuxtLink>
    </div>
  </div>
</template>
