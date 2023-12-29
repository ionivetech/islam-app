<script lang="ts" setup>
// Interfaces
import type { ISurah } from 'models/ISurah'

// Props
defineProps({
  detailSurah: {
    type: Object as PropType<ISurah | null>,
    required: true,
  },
})

// Emits
const emits = defineEmits(['close-slide'])

// Router
const router = useRouter()

const nuxtApp = useNuxtApp()

// Variables
const search = ref<string>('')

// Get list surah
const { data: surah, pending: pendingFetch } = useFetch<ISurah[]>(ALQURAN_API, {
  key: 'surah',
  lazy: true,
  server: false,
  transform: (data: any) => {
    return data.data
  },
  getCachedData: (key) => nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
})

// List surah
const surahList = computed((): ISurah[] => {
  const dataSurah: ISurah[] = surah.value!
  if (search.value === '') return dataSurah
  return dataSurah.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(search.value.toLowerCase()),
  )
})

// Handle select surah
const handleSelectSurah = (id: number) => {
  emits('close-slide')
  router.push(`/al-quran/${id}`)
}
</script>

<template>
  <ClientOnly>
    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <h4 class="text-base font-semibold text-yami md:text-lg dark:text-white">List Surah</h4>
        <Icon
          name="heroicons:x-mark"
          class="cursor-pointer text-xl"
          @click="emits('close-slide')"
        />
      </div>

      <Input
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Cari surah"
      />
    </div>

    <!-- Skeleton loading -->
    <div
      v-if="pendingFetch"
      class="h-full space-y-1 overflow-y-auto pb-6 pl-6 pr-2"
    >
      <div
        v-for="i in 20"
        :key="i"
        class="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-700/30"
      />
    </div>

    <!-- Surah list -->
    <div
      v-else
      class="h-full space-y-1 overflow-y-auto pb-6 pl-6 pr-2"
    >
      <div
        v-for="data in surahList"
        :key="data.nama"
        :class="{ '!bg-teal-600': data.namaLatin === detailSurah?.namaLatin }"
        class="flex cursor-pointer items-center justify-between rounded px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        @click="handleSelectSurah(data.nomor)"
      >
        <p
          :class="{ '!text-white': data.namaLatin === detailSurah?.namaLatin }"
          class="text-sm text-yami md:text-base dark:text-slate-200"
        >
          {{ data.nomor }}. {{ data.namaLatin }}
        </p>
        <p
          :class="{ '!text-slate-200': data.namaLatin === detailSurah?.namaLatin }"
          class="text-xs text-smoke-1/60 md:text-sm dark:text-slate-400"
        >
          {{ data.jumlahAyat }} Ayat
        </p>
      </div>
    </div>
  </ClientOnly>
</template>
