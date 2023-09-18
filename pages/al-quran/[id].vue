<script setup lang="ts">
// Interfaces
import { ISurah } from 'models/ISurah'

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
// const { data: dataTafsir } = useFetch(`${TAFSIR_API}/${route.params.id}`, {
//   lazy: true,
//   server: false,
// })

// Variable
const showModalDetail = ref<boolean>(false)

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
    <div class="mb-16 flex flex-col">
      <p class="mb-4 text-center text-xl text-slate-800 dark:text-slate-200 lg:text-2xl">
        {{ data?.namaLatin }} &#x2022;
        <span class="font-mono text-2xl lg:text-3xl">{{ data?.nama }}</span>
      </p>

      <p class="mx-auto text-sm text-zinc-500 dark:text-zinc-400">
        {{ data?.tempatTurun }} &#x2022; {{ data?.arti }} &#x2022; {{ data?.jumlahAyat }} Ayat
      </p>

      <div class="mt-8 flex items-center gap-x-5 self-end">
        <div
          class="flex cursor-pointer items-center text-sm text-slate-800 dark:text-slate-200"
          @click="showModalDetail = true"
        >
          <Icon
            name="heroicons:information-circle-solid"
            class="mr-1 text-lg text-slate-800 dark:text-slate-200"
          />
          Detail Surah
        </div>
        <div class="flex cursor-pointer items-center text-sm text-teal-700 dark:text-teal-500">
          <Icon
            name="heroicons:play-solid"
            class="mr-1 text-lg text-teal-700 dark:text-teal-500"
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
        v-for="ayat in data!.ayat"
        :key="ayat.nomorAyat"
        class="border-b border-gray-200 py-7 dark:border-gray-600"
      >
        <p
          class="mb-5 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-slate-200 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]"
        >
          {{ ayat.teksArab }}
        </p>

        <p class="mb-3 text-sm !leading-relaxed text-teal-800 dark:text-slate-200 lg:text-base">
          {{ ayat.teksLatin }}
        </p>
        <p class="text-sm !leading-relaxed text-slate-800 dark:text-slate-400 lg:text-base">
          {{ ayat.teksIndonesia }}
        </p>
      </div>
    </div>
  </div>

  <!-- Modal Detail -->
  <UModal
    v-model="showModalDetail"
    :ui="{
      rounded: 'rounded-xl',
    }"
  >
    <div class="p-6">
      <h4 class="mb-3 text-xl font-semibold text-slate-800 dark:text-slate-200">Detail Surah</h4>
      <div
        class="text-sm !leading-7 text-slate-800 dark:text-slate-200 md:text-base"
        v-html="data?.deskripsi"
      />
    </div>
  </UModal>
</template>
