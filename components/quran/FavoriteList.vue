<script lang="ts" setup>
// Interfaces
import type { ISurah } from 'models/ISurah'

// Props
defineProps<{
  favorites: ISurah[]
}>()

// Emits
const emits = defineEmits<{
  (e: 'refresh-data'): void
}>()

// Delete surah from favorites
const deleteFromFavorite = (surah: ISurah) => {
  const getFromLocalStorage = localStorage.getItem('surah-favorite')
  const dataFavorite: ISurah[] = getFromLocalStorage ? JSON.parse(getFromLocalStorage) : []

  const index = dataFavorite.findIndex(
    (data) => data.namaLatin.toLowerCase() === surah.namaLatin.toLowerCase(),
  )

  if (index > -1) {
    dataFavorite.splice(index, 1)
    localStorage.setItem('surah-favorite', JSON.stringify(dataFavorite))
    emits('refresh-data')
  }
}
</script>

<template>
  <div class="mb-12">
    <p
      class="mb-3 border-l-4 border-teal-600 pl-2 text-base font-semibold text-yami dark:text-slate-200"
    >
      Surah Favorit
    </p>

    <!-- If data favorite is empty -->
    <p
      v-if="favorites.length === 0"
      class="text-sm text-yami dark:text-slate-200"
    >
      Anda belum memiliki surah favorit
    </p>

    <!-- If have data favorite -->
    <div
      v-else
      class="no-scrollbar flex gap-x-3 overflow-x-auto scroll-smooth"
    >
      <NuxtLink
        v-for="(surah, index) in favorites"
        :key="`favorite-${index}`"
        :to="`/al-quran/${surah.nomor}`"
        class="group min-w-[200px] max-w-[200px] cursor-pointer rounded-lg border border-gray-300/70 p-3 hover:border-teal-600 hover:shadow-surah-card dark:border-gray-700 dark:hover:border-teal-600 dark:hover:shadow-surah-card-dark"
      >
        <div class="mb-3 flex items-center justify-between">
          <div>
            <p class="mb-1 text-[13px] font-semibold tracking-wide text-yami dark:text-slate-200">
              {{ surah.namaLatin }}
            </p>
            <p class="text-xs font-normal text-smoke-1 dark:text-smoke-2">
              {{ surah.arti }}
            </p>
          </div>

          <UTooltip text="Hapus dari favorit">
            <Icon
              name="heroicons:heart-solid"
              class="z-10 text-xl text-teal-600"
              @click.prevent="deleteFromFavorite(surah)"
            />
          </UTooltip>
        </div>

        <div
          class="flex h-20 flex-col items-center justify-center rounded-md bg-slate-100 dark:bg-slate-700"
        >
          <p
            dir="rtl"
            lang="ar"
            class="mb-0.5 font-mono text-lg font-medium text-yami dark:text-slate-200"
          >
            {{ surah.nama }}
          </p>
          <p class="text-xs font-normal text-smoke-1 dark:text-smoke-2">
            {{ surah.jumlahAyat }} Ayat
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
