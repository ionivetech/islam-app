<script setup lang="ts">
// Interfaces
import { ISurah } from 'models/ISurah'

// Router
const route = useRoute()

const { data, pending } = await useAsyncData<ISurah>(
  'surahDetail',
  () => $fetch(`${ALQURAN_LIST_API}/${route.params.id}`),
  {
    transform: (data: any) => data.data,
  },
)

useSeoMeta({
  title: () => `Surah ${data.value?.namaLatin} | Islam App`,
})
</script>

<template>
  <div class="container pt-8">
    <img
      src="/images/bismillah.svg"
      class="mx-auto mb-8 h-auto w-48 md:mb-10 md:w-52 lg:mb-12 lg:w-56"
    />

    <NuxtLoadingIndicator />

    <div v-if="!pending">
      <div
        v-for="ayat in data!.ayat"
        :key="ayat.nomorAyat"
        class="border-b border-gray-200 py-7"
      >
        <p
          class="mb-5 text-right font-mono text-3xl leading-[65px] text-slate-800 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]"
        >
          {{ ayat.teksArab }}
        </p>

        <p class="mb-3 text-sm !leading-relaxed text-teal-800 lg:text-base">{{ ayat.teksLatin }}</p>
        <p class="text-sm !leading-relaxed text-slate-800 lg:text-base">{{ ayat.teksIndonesia }}</p>
      </div>
    </div>
  </div>
</template>
