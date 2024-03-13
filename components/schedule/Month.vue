<script lang="ts" setup>
// Interfaces
import type { ISchedule } from '@/models/IPrayerTime'

defineProps<{
  dataSchedule: ISchedule[]
}>()

// Variables
const tableColumns = ref<{ key: string; label: string }[]>([
  { key: 'tanggal', label: 'Tanggal' },
  { key: 'imsak', label: 'Imsak' },
  { key: 'subuh', label: 'Shubuh' },
  { key: 'terbit', label: 'Terbit' },
  { key: 'dhuha', label: 'Dhuha' },
  { key: 'dzuhur', label: 'Dzuhur' },
  { key: 'ashar', label: 'Ashar' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isya', label: 'Isya' },
])
</script>

<template>
  <div class="rounded-xl bg-teal-600/5 p-4 dark:bg-background-dark-soft md:p-5">
    <UTable
      :columns="tableColumns"
      :rows="dataSchedule"
    />
  </div>
</template>
