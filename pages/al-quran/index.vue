<script lang="ts" setup>
// Interfaces
import { ISurah } from 'models/ISurah'

// Variables
const search = ref<string>('')
const surahFavorite = ref<ISurah[]>([])

// Get list surah
const {
  data: dataSurah,
  pending: pendingFetch,
  refresh,
} = useFetch<ISurah[]>(ALQURAN_API, {
  key: 'surah',
  lazy: true,
  server: false,
  transform: (data: any) => {
    const getDataFavorite = localStorage.getItem('surah-favorite')
    surahFavorite.value = getDataFavorite ? JSON.parse(getDataFavorite) : []

    const dataList = data.data.map((surah: ISurah) => {
      if (surahFavorite.value.length > 0) {
        const itsInFavorite = surahFavorite.value.find(
          (data) => data.namaLatin.toLowerCase() === surah.namaLatin.toLowerCase(),
        )
        surah.isFavorite = !!itsInFavorite
      } else {
        surah.isFavorite = false
      }
      return surah
    })
    return dataList
  },
})

// List surah
const surahList = computed((): ISurah[] => {
  if (search.value === '') return dataSurah.value || []
  return dataSurah.value!.filter((surah) =>
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
      class="mb-10 mt-16 flex h-72 w-full flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-teal-700 to-teal-500 p-4 dark:from-slate-800/50 dark:to-slate-700/50 md:h-80"
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

        <div
          class="absolute inset-y-2/4 right-3 flex h-8 w-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 dark:bg-slate-700 md:h-9 md:w-9"
        >
          <Icon
            name="radix-icons:magnifying-glass"
            class="text-xl text-white"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Favorite Section -->
      <div
        v-if="!search"
        class="mb-12"
      >
        <p
          class="mb-3 border-l-4 border-teal-600 pl-2 text-base font-semibold text-yami dark:text-slate-200"
        >
          Surah Favorit
        </p>

        <!-- If data favorite is empty -->
        <p
          v-if="surahFavorite.length === 0"
          class="text-sm text-yami dark:text-slate-200"
        >
          Anda belum memiliki surah favorit
        </p>

        <!-- If have data favorite -->
        <QuranFavoriteList
          v-else
          :favorites="surahFavorite"
          @refresh-data="refresh"
        />
      </div>

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
        <div
          v-if="pendingFetch"
          class="grid grid-cols-quran-list gap-3 lg:grid-cols-quran-list-lg"
        >
          <div
            v-for="i in 30"
            :key="i"
            class="h-[121px] w-full animate-pulse rounded-lg bg-gray-300 dark:bg-slate-700/30"
          />
        </div>

        <!-- List -->
        <div
          v-else
          class="grid grid-cols-quran-list gap-3 lg:grid-cols-quran-list-lg"
        >
          <QuranSurahCard
            v-for="data in surahList"
            :key="data.nama"
            :surah="data"
            @refresh-data="refresh"
          />
        </div>
      </div>
    </div>
  </div>
</template>
