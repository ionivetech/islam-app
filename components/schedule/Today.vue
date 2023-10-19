<script lang="ts" setup>
// Variables
import type { IPrayerTime, ISchedule } from '@/models/IPrayerTime'

// Props
defineProps({
  dataSchedule: {
    type: Object as PropType<IPrayerTime>,
    required: true,
  },
})

// Variables
const schedules = ref<{ key: string; text: string; icon: string }[]>([
  { key: 'subuh', text: 'Shubuh', icon: 'solar:sun-fog-outline' },
  { key: 'dzuhur', text: 'Dzuhur', icon: 'solar:sun-outline' },
  { key: 'ashar', text: 'Ashar', icon: 'solar:cloud-sun-2-line-duotone' },
  { key: 'maghrib', text: 'Maghrib', icon: 'solar:moon-fog-linear' },
  { key: 'isya', text: 'Isya', icon: 'solar:cloudy-moon-linear' },
])
</script>

<template>
  <div class="space-y-5">
    <div class="rounded-xl bg-teal-600/5 p-4 dark:bg-background-dark-soft md:p-5">
      <div class="divide-y divide-teal-600/30 dark:divide-slate-700/70">
        <div
          v-for="schedule in schedules"
          :key="schedule.key"
          class="flex items-center justify-between py-4 first:pt-0 last:pb-0"
        >
          <div class="flex items-center space-x-3">
            <Icon
              :name="schedule.icon"
              class="text-xl text-slate-500 dark:text-slate-400"
            />
            <p class="text-base text-smoke-1 dark:text-smoke-2">{{ schedule.text }}</p>
          </div>

          <p class="text-base font-medium text-smoke-1 dark:text-smoke-2">
            {{ dataSchedule.jadwal[schedule.key as keyof ISchedule] }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-3 divide-x divide-teal-600 rounded-xl bg-teal-600/5 p-4 dark:bg-background-dark-soft md:p-5"
    >
      <!-- Imsak -->
      <div class="flex flex-col items-center">
        <p class="text-sm text-smoke-1 dark:text-smoke-2 md:text-base">Imsak</p>
        <p class="text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
          {{ dataSchedule.jadwal.imsak }}
        </p>
      </div>

      <!-- Rise -->
      <div class="flex flex-col items-center">
        <p class="text-sm text-smoke-1 dark:text-smoke-2 md:text-base">Terbit</p>
        <p class="text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
          {{ dataSchedule.jadwal.terbit }}
        </p>
      </div>

      <!-- Dhuha -->
      <div class="flex flex-col items-center">
        <p class="text-sm text-smoke-1 dark:text-smoke-2 md:text-base">Dhuha</p>
        <p class="text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
          {{ dataSchedule.jadwal.dhuha }}
        </p>
      </div>
    </div>
  </div>
</template>
