<script setup lang="ts">
import type { IHadithHistory } from 'models/IHadith'

// Props
defineProps({
  selected: {
    type: String,
    default: '',
  },
})

// Variable
const hadithHistoryList: IHadithHistory[] = [
  {
    name: 'Abu Dawud',
    slug: 'abu-dawud',
  },
  {
    name: 'Ahmad',
    slug: 'ahmad',
  },
  {
    name: 'Bukhari',
    slug: 'bukhari',
  },
  {
    name: 'Darimi',
    slug: 'darimi',
  },
  {
    name: 'Ibnu Majah',
    slug: 'ibnu-majah',
  },
  {
    name: 'Malik',
    slug: 'malik',
  },
  {
    name: 'Muslim',
    slug: 'muslim',
  },
  {
    name: 'Nasai',
    slug: 'nasai',
  },
  {
    name: 'Tirmidzi',
    slug: 'tirmidzi',
  },
]

// Emits
const emits = defineEmits(['change-hadith-history'])
</script>

<template>
  <div
    class="no-scrollbar flex w-full items-center gap-x-2 overflow-x-auto scroll-smooth lg:justify-center"
  >
    <div
      v-for="hadithHistory in hadithHistoryList"
      :key="hadithHistory.slug"
      :class="
        selected === hadithHistory.slug
          ? 'bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-100'
          : 'bg-gray-100/80 dark:bg-slate-600/60 text-slate-500/80 dark:text-slate-400'
      "
      class="w-min cursor-pointer whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium"
      @click="emits('change-hadith-history', hadithHistory.slug)"
    >
      {{ hadithHistory.name }}
    </div>
  </div>
</template>
