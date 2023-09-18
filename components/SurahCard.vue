<script lang="ts" setup>
// Models
import { ISurah } from 'models/ISurah'

defineProps({
  surah: {
    type: Object as PropType<ISurah>,
    required: true,
  },
})
</script>

<template>
  <NuxtLink
    :to="`/al-quran/${surah.nomor}`"
    class="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4 transition-all duration-200 ease-in-out hover:border-teal-700 dark:border-gray-700 dark:hover:border-teal-700"
  >
    <div class="flex items-center gap-x-5">
      <!-- Surah number -->
      <div
        class="flex h-11 w-11 rotate-45 items-center justify-center rounded-lg bg-gray-200/40 transition-all duration-200 ease-in-out group-hover:bg-teal-600 dark:bg-slate-900/40"
      >
        <p
          class="-rotate-45 text-sm font-semibold text-slate-700 transition-all duration-200 ease-in-out group-hover:text-white dark:text-slate-300"
        >
          {{ surah.nomor }}
        </p>
      </div>

      <div>
        <p class="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {{ surah.namaLatin }} ({{ surah.tempatTurun }})
        </p>
        <p class="text-xs font-normal text-zinc-500 dark:text-zinc-400 md:text-sm">
          {{ surah.arti }}
        </p>
      </div>
    </div>

    <div class="flex flex-col items-end gap-y-1">
      <p class="font-mono text-lg font-medium text-slate-800 dark:text-slate-200">
        {{ surah.nama }}
      </p>
      <p class="text-xs font-normal text-zinc-500 dark:text-zinc-400">
        {{ surah.jumlahAyat }} Ayat
      </p>
    </div>
  </NuxtLink>
</template>
