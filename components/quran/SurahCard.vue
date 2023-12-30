<script lang="ts" setup>
// Models
import type { ISurah } from 'models/ISurah'

// Props
const props = defineProps<{
  surah: ISurah
}>()

// Emits
const emits = defineEmits<{
  (e: 'refresh-data'): void
}>()

const toggleFavorite = () => {
  const dataFavorite: ISurah[] = useLocalStorage('surah-favorite', []).value

  if (dataFavorite.length > 0) {
    const index = dataFavorite.findIndex(
      (data) => data.namaLatin.toLowerCase() === props.surah.namaLatin.toLowerCase(),
    )

    if (index > -1) {
      dataFavorite.splice(index, 1)
      localStorage.setItem('surah-favorite', JSON.stringify(dataFavorite))
    } else {
      dataFavorite.push(props.surah)
      localStorage.setItem('surah-favorite', JSON.stringify(dataFavorite))
    }
  } else {
    dataFavorite.push(props.surah)
    localStorage.setItem('surah-favorite', JSON.stringify(dataFavorite))
  }

  emits('refresh-data')
}
</script>

<template>
  <NuxtLink
    :to="`/al-quran/${surah.nomor}`"
    class="group w-full cursor-pointer rounded-lg border border-gray-300/70 p-3 hover:border-teal-600 hover:shadow-surah-card dark:border-gray-700 dark:hover:border-teal-600 dark:hover:shadow-surah-card-dark"
  >
    <div class="mb-3 flex items-center justify-between">
      <!-- Number -->
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200/50 text-xs font-medium text-yami group-hover:bg-teal-600 group-hover:text-white dark:bg-slate-700 dark:text-slate-300"
      >
        {{ surah.nomor }}
      </div>

      <!-- Toggle wishlist -->
      <UTooltip :text="surah.isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'">
        <Icon
          :name="surah.isFavorite ? 'heroicons:heart-solid' : 'heroicons:heart'"
          :class="surah.isFavorite ? 'text-teal-600' : 'text-slate-500 dark:text-slate-300'"
          class="z-10 text-xl"
          @click.prevent="toggleFavorite"
        />
      </UTooltip>
    </div>

    <div class="flex items-center justify-between">
      <div>
        <p class="mb-1 text-[13px] font-semibold tracking-wide text-yami dark:text-slate-200">
          {{ surah.namaLatin }} ({{ surah.tempatTurun }})
        </p>
        <p class="text-xs font-normal text-smoke-1 dark:text-smoke-2">
          {{ surah.arti }}
        </p>
      </div>

      <div class="flex flex-col items-end gap-y-[2px]">
        <p
          dir="rtl"
          lang="ar"
          class="font-mono text-lg font-medium text-yami dark:text-slate-200"
        >
          {{ surah.nama }}
        </p>
        <p class="text-xs font-normal text-smoke-1 dark:text-smoke-2">
          {{ surah.jumlahAyat }} Ayat
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
