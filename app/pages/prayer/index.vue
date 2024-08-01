<script lang="ts" setup>
// Interfaces
import type { IPrayer } from '@/models/IPrayer';

const nuxtApp = useNuxtApp()

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
      const chunk = prayerChunk.value[chunkPage.value - 1]
      if (Array.isArray(chunk)) dataPrayerList.value.push(...chunk)
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-200px 0px 0px 0px',
  },
)

// get list prayer
const { data: dataPrayer, status: statusDataPrayer } = await useLazyFetch<IPrayer[]>(
  '/api/doa', {
    server: false,
  })

const setDataChunks = () => {
  const datas: IPrayer[] = dataPrayer.value!
  chunkPage.value = 1
  masterPrayerList.value = datas

  // Split array into chunks
  for (let i = 0; i < masterPrayerList.value.length; i += 20) {
    const chunk = masterPrayerList.value.slice(i, i + 20)
    prayerChunk.value.push(chunk)
  }

  dataPrayerList.value = prayerChunk.value[0] ?? []
  finishSetDataChunk.value = true
}

// Prayer list
const prayerList = computed((): IPrayer[] => {
  const prayerData: IPrayer[] = dataPrayer.value || masterPrayerList.value
  if (search.value === '') return dataPrayerList.value
  return prayerData.filter((prayer) =>
    prayer.nama.toLowerCase().includes(search.value.toLowerCase()),
  )
})

watchEffect(() => {
  if (statusDataPrayer.value === 'success') setDataChunks()
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
      <SkeletonPrayer v-if="statusDataPrayer !== 'success'" />

      <div v-else>
        <PrayerList :prayers="prayerList" />
        <div ref="bottomPrayList" />
      </div>
    </div>
  </div>
</template>
