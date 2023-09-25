<script lang="ts" setup>
// Interfaces
import { ISurah } from 'models/ISurah'

// Props
defineProps({
  detailSurah: {
    type: Object as PropType<ISurah | null>,
    required: true,
  },
})

// Emits
const emits = defineEmits(['close-slide'])

// Store
const alquranStore = useAlQuranStore()

// Router
const router = useRouter()

// Variables
const search = ref<string>('')

// Get list surah
useFetch<ISurah[]>(ALQURAN_API, {
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
const listSurah = computed((): ISurah[] => {
  if (search.value === '') return alquranStore.getSurah
  return alquranStore.getSurah.filter((surah) =>
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
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <h4 class="text-base font-semibold text-yami dark:text-white md:text-lg">List Surah</h4>
      <Icon
        name="heroicons:x-mark"
        class="cursor-pointer text-xl"
        @click="emits('close-slide')"
      />
    </div>

    <UInput
      v-model="search"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      placeholder="Cari surah"
      :trailing="false"
      :autofocus="false"
      :ui="{
        placeholder: 'placeholder-gray-500 dark:placeholder-gray-400',
        rounded: 'rounded-lg',
        color: {
          white: {
            outline:
              'shadow-sm bg-white dark:bg-gray-950/20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-teal-500 dark:focus:ring-teal-600',
          },
        },
      }"
    />
  </div>

  <div
    v-if="detailSurah"
    class="h-full space-y-1 overflow-y-auto pb-6 pl-6 pr-2"
  >
    <div
      v-for="surah in listSurah"
      :key="surah.nama"
      :class="{ '!bg-teal-600': surah.namaLatin === detailSurah.namaLatin }"
      class="flex cursor-pointer items-center justify-between rounded px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      @click="handleSelectSurah(surah.nomor)"
    >
      <p
        :class="{ '!text-white': surah.namaLatin === detailSurah.namaLatin }"
        class="text-sm text-yami dark:text-slate-200 md:text-base"
      >
        {{ surah.nomor }}. {{ surah.namaLatin }}
      </p>
      <p
        :class="{ '!text-slate-200': surah.namaLatin === detailSurah.namaLatin }"
        class="text-xs text-smoke-1/60 dark:text-slate-400 md:text-sm"
      >
        {{ surah.jumlahAyat }} Ayat
      </p>
    </div>
  </div>
</template>
