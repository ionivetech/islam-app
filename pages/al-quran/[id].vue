<script setup lang="ts">
// Interfaces
import type { ISurah, IVerse, IBeforeNextSurah } from 'models/ISurah'
interface ITafsir {
  ayat: number
  teks: string
}

// Router
const route = useRoute()
const router = useRouter()

// Ref
const bottomVerseList = ref(null)

// Variables
const finishSetDataChunk = ref<boolean>(false)
const masterVerseList = ref<IVerse[]>([])
const chunkPage = ref<number>(1)
const verseChunk = ref<Array<IVerse[]>>([])
const verseList = ref<IVerse[]>([])
const showModalDetail = ref<boolean>(false)
const showModalTafsir = ref<boolean>(false)
const showListSurah = ref<boolean>(false)
const tafsirSelected = ref<ITafsir | null>(null)

// Composables infinite scrolling
useInfiniteScrolling(
  bottomVerseList,
  () => {
    // load more
    if (chunkPage.value !== verseChunk.value.length) {
      chunkPage.value += 1
      verseList.value.push(...verseChunk.value[chunkPage.value - 1])
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-200px 0px 0px 0px',
  },
)

// Get detail surah
const { data: dataDetail } = useAsyncData<ISurah>(
  'surahDetail',
  () => $fetch(`${ALQURAN_API}/${route.params.id}`),
  {
    transform: (data: any) => {
      const returnData = {
        ...data.data,
        audioFull: Object.values(data.data.audioFull).find((audio: any) =>
          audio.includes('Misyari'),
        ),
      }
      return returnData
    },
  },
)

// Get data tafsir
const { data: dataTafsir } = useLazyFetch<ITafsir[]>(`/${route.params.id}`, {
  baseURL: TAFSIR_API,
  server: false,
  transform: (data: any) => data.data.tafsir,
})

const setDataChunks = (data: IVerse[]) => {
  chunkPage.value = 1
  masterVerseList.value = data

  // Split array into chunks
  for (let i = 0; i < masterVerseList.value.length; i += 20) {
    const chunk = masterVerseList.value.slice(i, i + 20)
    verseChunk.value.push(chunk)
  }

  verseList.value = verseChunk.value[0]
  finishSetDataChunk.value = true
}

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

// Scroll to top of page
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

// Go to previous / next surah
const goToSurah = (surah: IBeforeNextSurah) => router.push(`/al-quran/${surah.nomor}`)

watchEffect(() => {
  if (dataDetail.value) setDataChunks(dataDetail.value!.ayat!)
})

useSeoMeta({
  title: () => `Surah ${dataDetail.value?.namaLatin} | Islam App`,
  description: () => `Detail surah ${dataDetail.value?.namaLatin}`,
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
        <SkeletonVerse v-if="!finishSetDataChunk" />

        <div v-else>
          <div class="space-y-5">
            <QuranVerseList
              v-for="(verse, index) in verseList"
              :key="`verse-${verse.nomorAyat}`"
              :surah-name="dataDetail?.namaLatin"
              :surah-number="dataDetail?.nomor"
              :verse="verse"
              :index="index"
              @open-tafsir="handleOpenModalTafsir"
            />
          </div>
          <div ref="bottomVerseList" />

          <!-- Button prev & next surah -->
          <div
            v-if="dataDetail"
            class="mt-12 flex items-center justify-center space-x-3 md:mt-20"
          >
            <!-- Previous surah -->
            <button
              v-if="dataDetail.suratSebelumnya"
              class="flex items-center space-x-2 rounded-md border border-gray-300/70 px-2 py-1.5 text-sm text-smoke-1 dark:border-gray-700 dark:bg-background-dark-soft dark:text-smoke-2 sm:px-3 sm:py-2"
              @click="goToSurah(dataDetail.suratSebelumnya as IBeforeNextSurah)"
            >
              <Icon
                name="heroicons:chevron-left-solid"
                class="text-base"
              />
              <span class="hidden sm:block">Surah sebelumnya</span>
              <span class="block sm:hidden">Sebelumnya</span>
            </button>

            <!-- Back to top -->
            <button
              class="flex items-center rounded-md border border-gray-300/70 px-2 py-1.5 text-sm text-smoke-1 dark:border-gray-700 dark:bg-background-dark-soft dark:text-smoke-2 sm:px-3 sm:py-2"
              @click="scrollToTop"
            >
              <span class="hidden sm:block">Kembali ke atas</span>
              <span class="block sm:hidden">Ke atas</span>
            </button>

            <!-- Next surah -->
            <button
              v-if="dataDetail.suratSelanjutnya"
              class="flex items-center space-x-2 rounded-md border border-gray-300/70 px-2 py-1.5 text-sm text-smoke-1 dark:border-gray-700 dark:bg-background-dark-soft dark:text-smoke-2 sm:px-3 sm:py-2"
              @click="goToSurah(dataDetail.suratSelanjutnya as IBeforeNextSurah)"
            >
              <span class="hidden sm:block">Surah berikutnya</span>
              <span class="block sm:hidden">Berikutnya</span>
              <Icon
                name="heroicons:chevron-right-solid"
                class="text-base"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- List Surah -->
    <SlideSurah
      v-model="showListSurah"
      :detail-surah="dataDetail"
      @close-slide="showListSurah = false"
    />

    <!-- Modal Detail -->
    <ModalDetailSurah
      v-model="showModalDetail"
      :description="dataDetail?.deskripsi"
      @close-modal="showModalDetail = false"
    />

    <!-- Modal Tafsir -->
    <ModalTafsir
      v-model="showModalTafsir"
      :tafsir="tafsirSelected?.teks"
      @close-modal="handleCloseModalTafsir"
    />
  </div>
</template>
