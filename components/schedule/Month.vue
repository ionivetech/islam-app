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
const selectedColumns = ref([...tableColumns.value])
</script>

<template>
  <div>
    <div
      class="mb-5 flex flex-col items-start justify-start gap-1 sm:flex-row sm:items-center sm:justify-end sm:gap-2"
    >
      <p class="text-sm text-yami sm:text-base dark:text-slate-200">Tampilkan kolom:</p>
      <USelectMenu
        v-model="selectedColumns"
        :options="tableColumns"
        multiple
        searchable
        placeholder="Select Column"
        :ui-menu="{
          background: 'bg-white dark:bg-background-dark',
          input: 'bg-white dark:bg-background-dark',
          option: {
            active: 'bg-gray-100 dark:bg-teal-800',
          },
        }"
        class="w-full sm:w-60"
      />
    </div>

    <div class="rounded-xl bg-teal-600/5 p-4 md:p-5 dark:bg-background-dark-soft">
      <UTable
        :columns="selectedColumns"
        :rows="dataSchedule"
      />
    </div>
  </div>
</template>
