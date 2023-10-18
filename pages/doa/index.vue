<script lang="ts" setup>
// Interfaces
import type { IPrayer } from '@/models/IPrayer'

// get list doa
const { data } = await useAsyncData<IPrayer[]>(() => $fetch('/api/doa'))

// Variables
const search = ref<string>('')
const prayerExpanded = ref<number>(0)

// Function for expand / collapse pray
const toggleExpandPrayer = (value: number) => {
  if (prayerExpanded.value === value) prayerExpanded.value = 0
  else prayerExpanded.value = value
}

// List doa
const prayerList = computed((): IPrayer[] => {
  const prayerData: IPrayer[] = data.value || []
  if (search.value === '') return prayerData
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
</script>

<template>
  <div class="container pt-24">
    <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 class="mb-3 text-xl font-semibold text-yami dark:text-slate-200 md:mb-0">List Do'a</h1>

      <Input
        v-model="search"
        placeholder="Cari doa"
        icon="i-heroicons-magnifying-glass-20-solid"
      />
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
