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
const { data: dataDetail, pending } = await useAsyncData<ISurah>(
  'surahDetail',
  () => $fetch(`${ALQURAN_API}/${route.params.id}`),
  {
    transform: (data: any) => data.data,
  },
)

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

// Meta SEO
useHead({
  title: `Surah ${dataDetail.value?.namaLatin} | Islam App`,
  meta: [{ name: 'description', content: `Detail surah ${dataDetail.value?.namaLatin}` }],
  htmlAttrs: {
    lang: 'id',
  },
})
</script>

<template>
  <div class="relative">
    <!-- Header detail surah for show surah name & list surah -->
    <HeaderDetailSurah
      v-if="route.name === 'al-quran-id' && dataDetail"
      :detail-surah="dataDetail"
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

      <div v-if="!pending">
        <div
          v-for="(ayat, index) in dataDetail!.ayat"
          :key="ayat.nomorAyat"
          class="flex w-full flex-col gap-8 border-b border-gray-200 py-7 last:border-b-0 last:pb-0 dark:border-gray-800 md:flex-row md:gap-12"
        >
          <div class="flex items-center justify-start gap-2 md:flex-col">
            <!-- Number surah & ayat -->
            <p class="text-sm font-semibold tracking-wide text-smoke-1 dark:text-smoke-2">
              {{ dataDetail!.nomor }}:{{ ayat.nomorAyat }}
            </p>

            <!-- Button tafsir -->
            <UTooltip text="Tafsir">
              <div
                class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-lg text-smoke-1 hover:bg-teal-100/60 hover:text-teal-700 dark:text-smoke-2 hover:dark:bg-teal-200/10 hover:dark:text-teal-500"
                role="button"
                @click="handleOpenModalTafsir(index)"
              >
                <Icon name="heroicons:book-open" />
              </div>
            </UTooltip>
          </div>

          <div class="w-full">
            <p
              class="mb-5 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-slate-200 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]"
            >
              {{ ayat.teksArab }}
            </p>

            <p class="mb-3 text-base !leading-8 tracking-wide text-teal-800 dark:text-white">
              {{ ayat.teksLatin }}
            </p>
            <p class="text-base !leading-8 text-smoke-1 dark:text-slate-400">
              {{ ayat.teksIndonesia }}
            </p>
          </div>
        </div>
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
      width: 'sm:max-w-[90vw]',
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
</template>
