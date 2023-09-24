<script lang="ts" setup>
// Interfaces
import { ISurah } from 'models/ISurah'

// Meta
useSeoMeta({
  title: 'Al-Quran',
})

// Store
const alquranStore = useAlQuranStore()

// Variables
const search = ref<string>('')

// Get list surah
const { pending } = useFetch<ISurah[]>(ALQURAN_API, {
  key: 'surah',
  lazy: true,
  server: false,
  immediate: alquranStore.getSurah.length === 0,
  transform: (data: any) => {
    if (data.data) alquranStore.setSurah(data.data)
    return data.data
  },
})

// List surah
const surah = computed((): ISurah[] => {
  if (search.value === '') return alquranStore.getSurah
  return alquranStore.getSurah.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(search.value.toLowerCase()),
  )
})
</script>

<template>
  <!-- Header -->
  <div
    class="mb-10 mt-16 flex h-72 w-full flex-col items-center justify-center gap-y-8 bg-teal-600 p-4 dark:bg-slate-700/50 md:h-80"
  >
    <img
      src="/images/alquran.svg"
      alt="alquran-logo"
      class="h-auto w-24"
    />

    <div class="relative w-full md:w-8/12 lg:w-6/12">
      <input
        v-model="search"
        type="text"
        placeholder="Cari Surah"
        class="input-search"
      />
      <Icon
        name="radix-icons:magnifying-glass"
        class="absolute left-3 top-[10px] h-6 w-6 text-gray-400 md:top-3"
      />
    </div>
  </div>

  <div class="container">
    <!-- Loading -->
    <div
      v-if="pending && surah.length === 0"
      class="grid grid-cols-quran-list gap-4"
    >
      <div
        v-for="i in 30"
        :key="i"
        class="h-24 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700/30"
      />
    </div>

    <!-- List -->
    <div
      v-else-if="!pending || surah.length > 0"
      class="grid grid-cols-quran-list gap-4"
    >
      <SurahCard
        v-for="data in surah"
        :key="data.nama"
        :surah="data"
      />
    </div>
  </div>
</template>
