<script lang="ts" setup>
// Interfaces
import { ISurah } from 'models/ISurah'

// Variables
const search = ref<string>('')

// Get list surah
const { data: surahCache } = useNuxtData('surah')
const { data: surah, pending: pendingFetch } = useFetch<ISurah[]>(ALQURAN_API, {
  key: 'surah',
  lazy: true,
  server: false,
  immediate: !surahCache.value,
  transform: (data: any) => {
    return data.data
  },
})
refreshNuxtData('surah')

// Loading get surah list
const loading = computed((): boolean => (surahCache.value ? false : pendingFetch.value))

// List surah
const surahList = computed((): ISurah[] => {
  const dataSurah: ISurah[] = surahCache.value || surah.value
  if (search.value === '') return dataSurah
  return dataSurah.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(search.value.toLowerCase()),
  )
})

// Meta
useHead({
  title: 'Al-Quran | Islam App',
})
</script>

<template>
  <div>
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
        v-if="loading"
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
        v-else
        class="grid grid-cols-quran-list gap-4"
      >
        <QuranSurahCard
          v-for="data in surahList"
          :key="data.nama"
          :surah="data"
        />
      </div>
    </div>
  </div>
</template>
