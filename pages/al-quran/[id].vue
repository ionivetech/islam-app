<script setup lang="ts">
// Interfaces
import { ISurah } from 'models/ISurah'

// Local interface
interface ITafsir {
  ayat: number
  teks: string
}

// Router
const route = useRoute()

// Get detail surah
const { data: dataDetail, pending } = useFetch<ISurah>(`${ALQURAN_API}/${route.params.id}`, {
  transform: (data: any) => {
    return {
      ...data.data,
      audioFull: Object.values(data.data.audioFull).find((audio: any) => audio.includes('Misyari')),
    }
  },
})

// Get data tafsir
const { data: dataTafsir } = useFetch<ITafsir[]>(`${TAFSIR_API}/${route.params.id}`, {
  lazy: true,
  server: false,
  transform: (data: any) => data.data.tafsir,
})

// Variable
const showModalDetail = ref<boolean>(false)
const showModalTafsir = ref<boolean>(false)
const showListSurah = ref<boolean>(false)
const tafsirSelected = ref<ITafsir | null>(null)

watch(pending, (val) => {
  if (!val) {
    useHead({
      title: `Surah ${dataDetail.value?.namaLatin} | Islam App`,
      meta: [{ name: 'description', content: `Detail surah ${dataDetail.value?.namaLatin}` }],
      htmlAttrs: {
        lang: 'id',
      },
    })
  }
})

// Open modal tafsir
const handleOpenModalTafsir = (index: number) => {
  if (dataTafsir.value) {
    tafsirSelected.value = dataTafsir.value[index]
    showModalTafsir.value = true
  }
}

// Close modal tafsir
const handleCloseModalTafsir = () => {
  showModalTafsir.value = false
  setTimeout(() => {
    tafsirSelected.value = null
  }, 400)
}
</script>

<template>
  <div>
    <div class="relative">
      <!-- Header detail surah for show surah name & list surah -->
      <HeaderDetailSurah
        v-if="route.name === 'al-quran-id' && dataDetail"
        @show-detail="showModalDetail = true"
        @show-list="showListSurah = true"
      />

      <div class="container pt-8">
        <!-- Bismillah images -->
        <img
          src="/images/bismillah.svg"
          class="mx-auto my-5 h-auto w-48 dark:brightness-0 dark:invert-[1] md:w-52 lg:w-56"
          alt="bismillah-images"
        />

        <!-- List Ayat -->
        <SkeletonAyat v-if="pending" />

        <template v-if="!pending">
          <QuranAyatList
            v-for="(ayat, index) in dataDetail!.ayat"
            :key="ayat.nomorAyat"
            :surah-name="dataDetail?.namaLatin"
            :surah-number="dataDetail?.nomor"
            :ayat="ayat"
            :index="index"
            @open-tafsir="handleOpenModalTafsir"
          />
        </template>
      </div>
    </div>

    <!-- List Surah -->
    <USlideover
      v-model="showListSurah"
      side="left"
      :ui="{
        background:
          'bg-background-light dark:bg-background-dark dark:border dark:border-slate-700/50',
        width: 'w-screen md:max-w-md max-w-xs',
        overlay: {
          background: 'bg-gray-200/50 dark:bg-background-dark/50',
        },
      }"
    >
      <SlideSurah
        :detail-surah="dataDetail"
        @close-slide="showListSurah = false"
      />
    </USlideover>

    <!-- Modal Detail -->
    <UModal
      v-model="showModalDetail"
      :ui="{
        rounded: 'rounded-xl',
        background:
          'bg-background-light dark:bg-background-dark dark:border dark:border-slate-700/50',
        width: 'sm:max-w-[60vw]',
        overlay: {
          background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
        },
      }"
    >
      <ModalDetailSurah
        :description="dataDetail?.deskripsi"
        @close-modal="showModalDetail = false"
      />
    </UModal>

    <!-- Modal Tafsir -->
    <UModal
      v-model="showModalTafsir"
      prevent-close
      :ui="{
        rounded: 'rounded-xl',
        background:
          'bg-background-light dark:bg-background-dark dark:border dark:border-slate-700/50',
        width: 'sm:max-w-[60vw]',
        overlay: {
          background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
        },
      }"
    >
      <ModalTafsir
        :tafsir="tafsirSelected?.teks"
        @close-modal="handleCloseModalTafsir"
      />
    </UModal>
  </div>
</template>
