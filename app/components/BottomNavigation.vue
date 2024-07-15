<script lang="ts" setup>
// Use router
const route = useRoute()

// Variables
const menus: { url: string; label: string; icon: string }[] = [
  {
    url: '/al-quran',
    label: 'Al-Quran',
    icon: 'fa6-solid:book-quran',
  },
  {
    url: '/hadith',
    label: 'Hadits',
    icon: 'fa6-solid:book-open',
  },
  {
    url: '/prayer',
    label: 'Doa',
    icon: 'fa6-solid:person-praying',
  },
  {
    url: '/schedule',
    label: 'Jadwal Sholat',
    icon: 'fa6-solid:mosque',
  },
]
</script>

<template>
  <div
    class="fixed bottom-0 z-50 h-16 w-full border-t border-slate-700/10 bg-background-light backdrop-blur dark:border-slate-300/10 dark:bg-background-dark/75"
  >
    <div class="container flex h-full items-center justify-between gap-x-2">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.url"
        :to="menu.url"
        :class="
          route.path.includes(menu.url)
            ? 'text-teal-600 dark:text-teal-500'
            : 'text-yami/75 dark:text-gray-400'
        "
        class="flex flex-col items-center gap-y-1.5"
      >
        <Icon
          :name="menu.icon"
          class="size-5"
        />
        <span class="text-xs">{{ menu.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
