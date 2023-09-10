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
const { pending } = useFetch<ISurah[]>(ALQURAN_LIST_API, {
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
    surah.namaLatin.toLowerCase().includes(search.value),
  )
})
</script>

<template>
  <!-- Header -->
  <div
    class="mb-10 flex h-72 w-full flex-col items-center justify-center gap-y-8 bg-teal-600 p-4 md:h-80"
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
        placeholder="Search Surah"
        class="input-search"
      />
      <Icon
        name="radix-icons:magnifying-glass"
        class="absolute left-3 top-3 h-6 w-6 text-gray-400"
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
        class="h-24 w-full animate-pulse rounded-lg bg-gray-200"
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
