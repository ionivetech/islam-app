<script setup lang="ts">
// Interfaces
import type { ILocation } from '@/models/ILocation'
import type { IPrayerTime, ISchedule } from '@/models/IPrayerTime'

// Variables
const isLoading = ref<boolean>(true)
const idCity = ref<number | null>(null)
const prayerTime = ref<IPrayerTime | null>(null)
const prayerTimeOneMonth = ref<ISchedule[]>([])
const schedules = ref<{ key: string; text: string; icon: string }[]>([
  { key: 'subuh', text: 'Shubuh', icon: 'solar:sun-fog-outline' },
  { key: 'dzuhur', text: 'Dzuhur', icon: 'solar:sun-outline' },
  { key: 'ashar', text: 'Ashar', icon: 'solar:cloud-sun-2-line-duotone' },
  { key: 'maghrib', text: 'Maghrib', icon: 'solar:moon-fog-linear' },
  { key: 'isya', text: 'Isya', icon: 'solar:cloudy-moon-linear' },
])
const tabs = [
  {
    key: 'today',
    label: 'Hari Ini',
  },
  {
    key: 'this-month',
    label: '1 Bulan',
  },
]
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

// Get date today
const dateToday = computed(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

  return `${year}/${month}/${day}`
})

// Get data location
const { data: dataLocation } = useAsyncData<ILocation>(() => $fetch(LOCATION_API), {
  transform: (data: any) => {
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      countryName: data.countryName,
      cityName: data.localityInfo.administrative[2].name,
    }
  },
})

// Search & get city location
const getIdCity = () => {
  useFetch(`/kota/cari/${dataLocation.value?.cityName}`, {
    baseURL: SHOLAT_API,
    transform: (data: any) => data.data[0].id,
  }).then((res) => {
    idCity.value = res.data.value
  })
}

// Get data prayer time
const getPrayerTime = () => {
  useFetch(`/jadwal/${idCity.value}/${dateToday.value}`, {
    baseURL: SHOLAT_API,
    transform: (data: any) => data.data,
  }).then((res) => {
    prayerTime.value = res.data.value
    isLoading.value = false
  })
}

// Get data prayer time 1 month
const getPrayerTimeOneMonth = () => {
  const date = dateToday.value.split('/')
  date.pop()

  useFetch(`/jadwal/${idCity.value}/${date.join('/')}`, {
    baseURL: SHOLAT_API,
    transform: (data: any) => {
      const date = new Date()
      const newData = data.data.jadwal.map((data: ISchedule, index: any) => {
        const value = { ...data }
        value.tanggal = index + 1 < 10 ? `0${index + 1}` : index + 1

        if (index + 1 === date.getDate()) {
          value.class = 'bg-teal-600/20 dark:bg-teal-500/20 rounded-lg'
        }

        return value
      })

      return newData
    },
  }).then((res) => {
    prayerTimeOneMonth.value = res.data.value
  })
}

watch(idCity, (val) => {
  if (val !== null) {
    getPrayerTime()
    getPrayerTimeOneMonth()
  }
})

onMounted(() =>
  setTimeout(() => {
    getIdCity()
  }, 500),
)

// Meta
useHead({
  title: 'Jadwal Sholat | Islam App',
})
</script>

<template>
  <div class="container pt-24">
    <!-- Header -->
    <div
      class="mb-10 flex items-center justify-between space-x-2 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 p-5 dark:from-slate-700/50 dark:to-slate-600/60"
    >
      <div>
        <h1 class="text-xl font-semibold text-white md:text-2xl">Jadwal Sholat</h1>
        <p class="text-sm text-slate-100 dark:text-slate-400 md:text-base">
          {{ prayerTime?.jadwal.tanggal }}
        </p>

        <div class="mt-5 flex items-center space-x-2 text-white">
          <Icon
            name="heroicons:map-pin-solid"
            class="text-base md:text-lg"
          />
          <p
            v-if="!isLoading"
            class="text-sm capitalize md:text-base"
          >
            {{ dataLocation?.cityName }}, {{ prayerTime?.daerah.toLowerCase() }},
            {{ dataLocation?.countryName }}
          </p>

          <div
            v-else
            class="h-6 w-[224px] animate-pulse rounded-md bg-gray-300 dark:bg-slate-700/30"
          />
        </div>
      </div>

      <Icon
        name="fa6-solid:mosque"
        class="text-[70px] text-white/40 dark:text-white/20 sm:text-[80px]"
      />
    </div>

    <!-- Tabs -->
    <UTabs
      :items="tabs"
      class="w-full"
      :ui="{
        container: 'pt-3',
        list: {
          background: 'bg-gray-100 dark:bg-background-dark-soft',
          tab: {
            active: 'bg-teal-600 text-white',
          },
        },
      }"
    >
      <template #item="{ item }">
        <!-- Prayer schedule today -->
        <div v-if="item.key === 'today'">
          <!-- Skeleton -->
          <div
            v-if="isLoading"
            class="space-y-5"
          >
            <div
              class="h-[291px] w-full animate-pulse rounded-xl bg-gray-300 dark:bg-slate-700/30"
            />
            <div
              class="h-[88px] w-full animate-pulse rounded-xl bg-gray-300 dark:bg-slate-700/30"
            />
          </div>

          <div
            v-else
            class="space-y-5"
          >
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
                    {{ prayerTime?.jadwal[schedule.key as keyof ISchedule] }}
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
                  {{ prayerTime?.jadwal.imsak }}
                </p>
              </div>

              <!-- Rise -->
              <div class="flex flex-col items-center">
                <p class="text-sm text-smoke-1 dark:text-smoke-2 md:text-base">Terbit</p>
                <p class="text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
                  {{ prayerTime?.jadwal.terbit }}
                </p>
              </div>

              <!-- Dhuha -->
              <div class="flex flex-col items-center">
                <p class="text-sm text-smoke-1 dark:text-smoke-2 md:text-base">Dhuha</p>
                <p class="text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
                  {{ prayerTime?.jadwal.dhuha }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Prayer schedule 1 month -->
        <div v-else-if="item.key === 'this-month'">
          <!-- Skeleton -->
          <div
            v-if="isLoading"
            class="h-[600px] w-full animate-pulse rounded-xl bg-gray-300 dark:bg-slate-700/30"
          />

          <div
            v-else
            class="mb-5 flex flex-col items-start justify-start gap-1 sm:flex-row sm:items-center sm:justify-end sm:gap-2"
          >
            <p class="text-sm text-yami dark:text-slate-200 sm:text-base">Tampilkan kolom:</p>
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

          <div class="rounded-xl bg-teal-600/5 p-5 dark:bg-background-dark-soft">
            <UTable
              :columns="selectedColumns"
              :rows="prayerTimeOneMonth"
            />
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>
