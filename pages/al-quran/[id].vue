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
const { data, pending } = await useAsyncData<ISurah>(
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
  title: `Surah ${data.value?.namaLatin} | Islam App`,
  meta: [{ name: 'description', content: `Detail surah ${data.value?.namaLatin}` }],
  htmlAttrs: {
    lang: 'id',
  },
})
</script>

<template>
  <div class="container pt-8">
    <!-- Header -->
    <div class="mb-16 flex flex-col border-b border-gray-200 pb-5 dark:border-gray-800 md:pb-8">
      <p class="mb-2 text-center text-2xl text-slate-800 dark:text-slate-200 md:mb-4">
        {{ data?.namaLatin }} &#x2022;
        <span class="font-mono text-3xl">{{ data?.nama }}</span>
      </p>

      <p class="mx-auto text-xs text-zinc-500 dark:text-slate-400 md:text-sm">
        {{ data?.tempatTurun }} &#x2022; {{ data?.arti }} &#x2022; {{ data?.jumlahAyat }} Ayat
      </p>

      <div class="mt-5 flex items-center gap-x-5 self-center md:mt-8 md:self-end">
        <div
          class="flex cursor-pointer items-center text-xs text-slate-800 dark:text-slate-200 md:text-sm"
          @click="showModalDetail = true"
        >
          <Icon
            name="heroicons:information-circle-solid"
            class="mr-1 text-base text-slate-800 dark:text-slate-200 md:text-lg"
          />
          Detail Surah
        </div>
        <div
          class="flex cursor-pointer items-center text-xs text-teal-700 dark:text-teal-500 md:text-sm"
        >
          <Icon
            name="heroicons:play-solid"
            class="mr-1 text-base text-teal-700 dark:text-teal-500 md:text-lg"
          />
          Putar Audio
        </div>
      </div>
    </div>

    <!-- Bismillah images -->
    <img
      src="/images/bismillah.svg"
      class="mx-auto mb-5 h-auto w-48 dark:brightness-0 dark:invert-[1] md:w-52 lg:w-56"
      alt="bismillah-images"
    />

    <!-- List Ayat -->
    <div v-if="!pending">
      <div
        v-for="(ayat, index) in data!.ayat"
        :key="ayat.nomorAyat"
        class="flex w-full flex-col gap-8 border-b border-gray-200 py-7 last:border-b-0 last:pb-0 dark:border-gray-800 md:flex-row md:gap-12"
      >
        <div class="flex items-center justify-start gap-3 md:flex-col">
          <!-- Number surah & ayat -->
          <p class="text-sm font-semibold tracking-wide text-smoke-1 dark:text-smoke-2">
            {{ data!.nomor }}:{{ ayat.nomorAyat }}
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

          <p
            class="mb-3 text-sm !leading-relaxed tracking-wide text-teal-800 dark:text-white lg:text-base"
          >
            {{ ayat.teksLatin }}
          </p>
          <p class="text-sm !leading-relaxed text-smoke-1 dark:text-slate-400 lg:text-base">
            {{ ayat.teksIndonesia }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Detail -->
  <UModal
    v-model="showModalDetail"
    :ui="{
      rounded: 'rounded-xl',
      background: 'bg-background-light dark:bg-background-dark dark:border dark:border-gray-800',
      overlay: {
        background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
      },
    }"
  >
    <div class="p-6">
      <h4 class="mb-5 text-xl font-semibold text-yami dark:text-white">Detail Surah</h4>
      <div
        class="text-sm !leading-7 text-smoke-1 dark:text-smoke-2 md:text-base"
        v-html="data?.deskripsi"
      />
    </div>
  </UModal>

  <!-- Modal Tafsir -->
  <UModal
    v-model="showModalTafsir"
    prevent-close
    :ui="{
      rounded: 'rounded-xl',
      background: 'bg-background-light dark:bg-background-dark dark:border dark:border-gray-800',
      width: 'sm:max-w-[90vw]',
      overlay: {
        background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
      },
    }"
  >
    <div class="py-6">
      <div class="mb-6 flex items-center justify-between px-6">
        <h4 class="text-xl font-semibold text-yami dark:text-white">Tafsir</h4>
        <Icon
          name="heroicons:x-mark"
          class="cursor-pointer text-xl"
          @click="handleCloseModalTafsir"
        />
      </div>

      <div
        class="max-h-[60vh] overflow-y-auto px-6 text-sm !leading-8 text-smoke-1 dark:text-smoke-2 md:text-base"
        v-html="tafsirSelected?.teks"
      />
    </div>
  </UModal>
</template>
