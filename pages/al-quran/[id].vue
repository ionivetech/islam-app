<script setup lang="ts">
// Interfaces
import { ISurah, IAyat } from 'models/ISurah'

// Local interface
interface ITafsir {
  ayat: number
  teks: string
}

// Router
const route = useRoute()

// Ref

// Variable
const masterAyatList = ref<IAyat[]>([])
const chunkPage = ref<number>(1)
const ayatChunk = ref<Array<IAyat[]>>([])
const ayatList = ref<IAyat[]>([])
const showModalDetail = ref<boolean>(false)
const showModalTafsir = ref<boolean>(false)
const showListSurah = ref<boolean>(false)
const tafsirSelected = ref<ITafsir | null>(null)

// Get detail surah
const { data: dataDetail, pending } = useFetch<ISurah>(`${ALQURAN_API}/${route.params.id}`, {
  key: 'surahDetail',
  transform: (data: any) => {
    chunkPage.value = 1
    masterAyatList.value = data.data.ayat

    // Split array into chunks
    for (let i = 0; i < masterAyatList.value.length; i += 20) {
      const chunk = masterAyatList.value.slice(i, i + 20)
      ayatChunk.value.push(chunk)
    }

    ayatList.value = ayatChunk.value[0]

    const returnData = {
      ...data.data,
      audioFull: Object.values(data.data.audioFull).find((audio: any) => audio.includes('Misyari')),
    }

    delete returnData.ayat
    return returnData
  },
})

// Get data tafsir
const { data: dataTafsir } = useFetch<ITafsir[]>(`${TAFSIR_API}/${route.params.id}`, {
  lazy: true,
  server: false,
  transform: (data: any) => data.data.tafsir,
})

watch(pending, (val) => {
  if (!val) {
    useHead({
      title: `Surah ${dataDetail.value?.namaLatin} | Islam App`,
      meta: [{ name: 'description', content: `Detail surah ${dataDetail.value?.namaLatin}` }],
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

onMounted(() => {
  window.onscroll = () => {
    if (chunkPage.value !== ayatChunk.value.length && !pending.value) {
      const bottomOfWindow =
        window.innerHeight + Math.ceil(window.pageYOffset) === document.body.offsetHeight

      if (bottomOfWindow) {
        chunkPage.value += 1
        ayatList.value.push(...ayatChunk.value[chunkPage.value - 1])
      }
    }
  }
})
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
          class="mx-auto mb-10 h-auto w-48 dark:brightness-0 dark:invert-[1] md:w-52 lg:w-56"
          alt="bismillah-images"
        />

        <!-- List Ayat -->
        <SkeletonAyat v-if="pending" />

        <div
          v-if="!pending"
          class="space-y-5"
        >
          <QuranVerseList
            v-for="(ayat, index) in ayatList"
            :key="ayat.nomorAyat"
            :surah-name="dataDetail?.namaLatin"
            :surah-number="dataDetail?.nomor"
            :ayat="ayat"
            :index="index"
            @open-tafsir="handleOpenModalTafsir"
          />
        </div>
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
      <LazySlideSurah
        v-if="showListSurah"
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
        width: 'sm:max-w-[80vw] md:max-w-[70vw]',
        overlay: {
          background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
        },
      }"
    >
      <LazyModalDetailSurah
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
        width: 'sm:max-w-[80vw] md:max-w-[70vw]',
        overlay: {
          background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
        },
      }"
    >
      <LazyModalTafsir
        :tafsir="tafsirSelected?.teks"
        @close-modal="handleCloseModalTafsir"
      />
    </UModal>
  </div>
</template>
