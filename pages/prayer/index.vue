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

// List doa
const prayerList = computed((): IPrayer[] => {
  const prayerData: IPrayer[] = dataPrayer.value || masterPrayerList.value
  if (search.value === '') return dataPrayerList.value
  return prayerData.filter((prayer) =>
    prayer.nama.toLowerCase().includes(search.value.toLowerCase()),
  )
})

watchEffect(() => {
  if (dataPrayer.value) setDataChunks(dataPrayer.value)
})

useServerSeoMeta({
  title: 'Doa | Islam App',
})
</script>

<template>
  <div>
    <!-- Header -->
    <PrayerHeaderList v-model="search" />

    <div class="container">
      <SkeletonPrayer v-if="!finishSetDataChunk" />

      <div v-else>
        <PrayerList :prayers="prayerList" />
        <div ref="bottomPrayList" />
      </div>
    </div>
  </div>
</template>
