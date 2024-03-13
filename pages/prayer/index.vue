<script lang="ts" setup>
// Interfaces
import type { IPrayer } from '@/models/IPrayer'

// Ref
const bottomPrayList = ref(null)

// Variables
const finishSetDataChunk = ref<boolean>(false)
const search = ref<string>('')
const masterPrayerList = ref<IPrayer[]>([])
const chunkPage = ref<number>(1)
const prayerChunk = ref<Array<IPrayer[]>>([])
const dataPrayerList = ref<IPrayer[]>([])
const prayerExpanded = ref<number>(0)

// Composables
useInfiniteScrolling(
  bottomPrayList,
  () => {
    // load more
    if (chunkPage.value !== prayerChunk.value.length) {
      chunkPage.value += 1
      dataPrayerList.value.push(...prayerChunk.value[chunkPage.value - 1])
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-200px 0px 0px 0px',
  },
)

// get list prayer
const { data: dataPrayer } = await useFetch<IPrayer[]>('/api/doa')

const setDataChunks = (data: IPrayer[]) => {
  chunkPage.value = 1
  masterPrayerList.value = data

  // Split array into chunks
  for (let i = 0; i < masterPrayerList.value.length; i += 20) {
    const chunk = masterPrayerList.value.slice(i, i + 20)
    prayerChunk.value.push(chunk)
  }

  dataPrayerList.value = prayerChunk.value[0]
  finishSetDataChunk.value = true
}

// Function for expand / collapse pray
const toggleExpandPrayer = (value: number) => {
  if (prayerExpanded.value === value) prayerExpanded.value = 0
  else prayerExpanded.value = value
}

// List doa
const prayerList = computed((): IPrayer[] => {
  const prayerData: IPrayer[] = dataPrayer.value || masterPrayerList.value
  if (search.value === '') return dataPrayerList.value
  return prayerData.filter((prayer) =>
    prayer.nama.toLowerCase().includes(search.value.toLowerCase()),
  )
})

watch(search, () => (prayerExpanded.value = 0))

onMounted(() => {
  setTimeout(() => {
    if (dataPrayer.value) setDataChunks(dataPrayer.value)
  }, 500)
})

useServerSeoMeta({
  title: 'Doa | Islam App',
})
</script>

<template>
  <div class="container pt-20 md:pt-24">
    <!-- Header -->
    <div
      class="mb-6 flex flex-col items-center space-y-8 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 p-4 dark:from-slate-700/50 dark:to-slate-600/60 sm:pb-10 sm:pt-8 md:mb-10"
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
          class="absolute inset-y-2/4 right-2 flex size-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 dark:bg-slate-700 md:size-9"
        >
          <Icon
            name="radix-icons:magnifying-glass"
            class="text-xl text-white"
          />
        </div>
      </div>
    </div>

    <SkeletonPrayer v-if="!finishSetDataChunk" />

    <div
      v-else
      class="space-y-4"
    >
      <PrayerCard
        v-for="(prayer, index) in prayerList"
        :key="`prayer-${index}`"
        :index="index"
        :prayer="prayer"
        :prayer-expanded="prayerExpanded"
        @toggle-expand-prayer="toggleExpandPrayer"
      />
      <div ref="bottomPrayList" />
    </div>
  </div>
</template>
