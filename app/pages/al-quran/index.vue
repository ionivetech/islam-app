<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
// Interfaces
import type { ISurah } from '@/models/ISurah';

const nuxtApp = useNuxtApp()

// Variables
const isLoading = ref<boolean>(true)
const search = ref<string>('')
const masterSurah = ref<ISurah[]>([])
const surahFavorites = ref<ISurah[]>([])

// Get list surah
const { data: dataSurah, status: statusDataSurah } = useLazyFetch<ISurah[]>(ALQURAN_API, {
  key: 'surah',
  server: false,
  getCachedData: (key) => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key],
  transform: (data: any) => data.data,
})

// List surah
const surahList = computed((): ISurah[] => {
  return (
    masterSurah.value?.filter((surah) =>
      surah.namaLatin.toLowerCase().includes(search.value.toLowerCase()),
    ) || []
  )
})

const setDataSurahAndFavorites = () => {
  const favoritesFromLocalStorage = useStorage('surah-favorite', []).value
  const favorites = favoritesFromLocalStorage.map((surah: ISurah) => surah.namaLatin.toLowerCase())

  const dataList = dataSurah.value?.map((surah) => {
    const isFavorite = favorites.includes(surah.namaLatin.toLowerCase())
    return { ...surah, isFavorite }
  })

  masterSurah.value = dataList ?? []
  surahFavorites.value = favoritesFromLocalStorage
  isLoading.value = false
}

watchEffect(() => {
  if (statusDataSurah.value === 'success') setDataSurahAndFavorites()
})

// Meta
useHead({
  title: 'Al-Quran | Islam App',
})
</script>

<template>
  <div>
    <!-- Header -->
    <QuranHeaderList v-model="search" />

    <div class="container">
      <!-- Favorite Section -->
      <QuranFavoriteList
        v-if="!search"
        :favorites="surahFavorites"
        @refresh-data="setDataSurahAndFavorites"
      />

      <!-- List Surah Section -->
      <div>
        <p
          v-if="!search"
          class="mb-3 border-l-4 border-teal-600 pl-2 text-base font-semibold text-yami dark:text-slate-200"
        >
          List Surah
        </p>

        <p
          v-else
          class="mb-3 text-sm text-yami dark:text-slate-200 md:text-base"
        >
          Menampilkan hasil pencarian <b>{{ search }}</b>
        </p>

        <!-- Loading -->
        <SkeletonSurah v-if="isLoading" />

        <!-- List -->
        <div
          v-else
          class="grid grid-cols-quran-list gap-3 lg:grid-cols-quran-list-lg"
        >
          <QuranSurahCard
            v-for="data in surahList"
            :key="data.nama"
            :surah="data"
            @refresh-data="setDataSurahAndFavorites"
          />
        </div>
      </div>
    </div>
  </div>
</template>
