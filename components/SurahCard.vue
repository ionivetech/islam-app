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
  <div
    class="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4 transition-all duration-200 ease-in-out hover:border-emerald-600"
  >
    <div class="flex items-center gap-x-5">
      <!-- Surah number -->
      <div
        class="flex h-11 w-11 rotate-45 items-center justify-center rounded-lg bg-gray-100 transition-all duration-200 ease-in-out group-hover:bg-emerald-600"
      >
        <p
          class="-rotate-45 text-sm font-semibold text-slate-700 transition-all duration-200 ease-in-out group-hover:text-white"
        >
          {{ surah.nomor }}
        </p>
      </div>

      <div>
        <p class="text-base font-semibold text-slate-800">
          {{ surah.namaLatin }} ({{ surah.tempatTurun }})
        </p>
        <p class="text-sm font-normal text-zinc-500">{{ surah.arti }}</p>
      </div>
    </div>

    <div class="flex flex-col items-end gap-y-1">
      <p class="text-lg font-medium text-slate-800">{{ surah.nama }}</p>
      <p class="text-xs font-normal text-zinc-500">{{ surah.jumlahAyat }} Ayat</p>
    </div>
  </div>
</template>
