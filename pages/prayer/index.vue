<script lang="ts" setup>
// Interfaces
import type { IPrayer } from '@/models/IPrayer'

// Variables
const search = ref<string>('')
const masterPrayerList = ref<IPrayer[]>([])
const chunkPage = ref<number>(1)
const prayerChunk = ref<Array<IPrayer[]>>([])
const dataPrayerList = ref<IPrayer[]>([])
const prayerExpanded = ref<number>(0)

// get list doa
useAsyncData<IPrayer[]>(() => $fetch('/api/doa'), {
  transform: (data: any) => {
    chunkPage.value = 1
    masterPrayerList.value = data

    // Split array into chunks
    for (let i = 0; i < masterPrayerList.value.length; i += 20) {
      const chunk = masterPrayerList.value.slice(i, i + 20)
      prayerChunk.value.push(chunk)
    }

    dataPrayerList.value = prayerChunk.value[0]

    return data
  },
})

// Function for expand / collapse pray
const toggleExpandPrayer = (value: number) => {
  if (prayerExpanded.value === value) prayerExpanded.value = 0
  else prayerExpanded.value = value
}

// List doa
const prayerList = computed((): IPrayer[] => {
  const prayerData: IPrayer[] = masterPrayerList.value
  if (search.value === '') return dataPrayerList.value
  return prayerData.filter((prayer) =>
    prayer.nama.toLowerCase().includes(search.value.toLowerCase()),
  )
})

watch(search, () => {
  prayerExpanded.value = 0
})

useHead({
  title: 'Doa | Islam App',
})

onMounted(() => {
  window.onscroll = () => {
    if (chunkPage.value !== prayerChunk.value.length) {
      const bottomOfWindow =
        window.innerHeight + Math.ceil(window.pageYOffset) === document.body.offsetHeight

      if (bottomOfWindow) {
        chunkPage.value += 1
        dataPrayerList.value.push(...prayerChunk.value[chunkPage.value - 1])
      }
    }
  }
})
</script>

<template>
  <div class="container pt-24">
    <!-- Header -->
    <div
      class="mb-10 flex flex-col items-center space-y-8 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 px-5 py-8 dark:from-slate-700/50 dark:to-slate-600/60 sm:pb-10 sm:pt-8"
    >
      <Icon
        name="material-symbols:prayer-times-rounded"
        class="text-[80px] text-white sm:text-[95px]"
      />

      <div class="relative w-full md:w-2/3 lg:w-3/4 xl:w-6/12">
        <input
          v-model="search"
          type="text"
          placeholder="Cari do'a"
          class="input-search"
        />

        <div
          class="absolute inset-y-2/4 right-2 flex h-8 w-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 dark:bg-slate-700 md:h-9 md:w-9"
        >
          <Icon
            name="radix-icons:magnifying-glass"
            class="text-xl text-white"
          />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <PrayerCard
        v-for="(doa, index) in prayerList"
        :key="index"
        :index="index"
        :prayer="doa"
        :prayer-expanded="prayerExpanded"
        @toggle-expand-prayer="toggleExpandPrayer"
      />
    </div>
  </div>
</template>

<style scoped></style>
