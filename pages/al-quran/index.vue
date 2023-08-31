<script lang="ts" setup>
// Interfaces
import { ISurah } from 'models/ISurah'
// Constant
import { ALQURAN_LIST_API } from '@/utils/constantApi'

// Meta
useSeoMeta({
  title: 'Al-Quran',
})

// Get list surah
const { data: surah, pending } = useFetch<ISurah[]>(ALQURAN_LIST_API, {
  key: 'surah',
  lazy: true,
  server: false,
  transform: (surah: any) => {
    return surah.data.map((data: ISurah) => data)
  },
})
</script>

<template>
  <div class="container">
    <!-- Loading -->
    <div
      v-if="pending"
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
      v-else
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
