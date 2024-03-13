<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
// Interfaces
import type { ILocation, ILocations } from '@/models/ILocation'
import type { IPrayerTime, ISchedule } from '@/models/IPrayerTime'

// Get coordinate
const { coords, pause: pauseWatchCoords, error: errorGetLocation } = useGeolocation()

// Variables
const isLoading = ref<boolean>(true)
const showModalLocation = ref<boolean>(false)
const dataLocation = ref<ILocation | null>(null)
const locationLists = ref<ILocations[]>([])
const locationSelected = ref<ILocations | null>(null)
const idCity = ref<string>('')
const prayerTime = ref<IPrayerTime>()
const prayerTimeOneMonth = ref<ISchedule[]>()
const indexActiveTab = ref<number>(0)
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

// Watch coordinate
watch(
  () => coords.value.latitude,
  (val) => {
    if (val !== Infinity) getDataLocation()
  },
)
watch(errorGetLocation, (val) => {
  if (val) showModalLocation.value = true
})

// Get date today
const dateToday = computed(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

  return `${year}/${month}/${day}`
})

// Get data location
const getDataLocation = () => {
  useFetch(LOCATION_API, {
    query: {
      latitude: coords.value.latitude,
      longitude: coords.value.longitude,
      localityLanguage: 'id',
    },
    transform: (data: any) => {
      const adminisTrativeLength = data.localityInfo.administrative.length
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        countryName: data.countryName,
        cityName: data.localityInfo.administrative[adminisTrativeLength - 1].name,
      }
    },
  }).then((res) => {
    dataLocation.value = res.data.value
    pauseWatchCoords()
    getIdCity()
  })
}

// get all location
const getAllLocation = () => {
  useFetch('/kota/semua', {
    baseURL: SHOLAT_API,
    transform: (data: any) => {
      const newData = data.data.map((d: ILocations) => {
        return { id: d.id, lokasi: d.lokasi.toLowerCase() }
      })
      return newData
    },
  }).then((res) => {
    locationLists.value = res.data.value.sort()
  })
}

// Search & get city location
const getIdCity = () => {
  useFetch(`/kota/cari/${dataLocation.value?.cityName.toLowerCase()}`, {
    baseURL: SHOLAT_API,
    transform: (data: any) => data.data[0].id,
  }).then((res) => {
    idCity.value = res.data.value
    getPrayerTimeToday()
    getPrayerTimeOneMonth()
  })
}

// Handle select manual location
const handleSelectLocation = (location: ILocations) => {
  locationSelected.value = location
  indexActiveTab.value = 0
  isLoading.value = true

  idCity.value = location.id
  showModalLocation.value = false
  getPrayerTimeToday()
  getPrayerTimeOneMonth()
}

// Get data prayer time today
const getPrayerTimeToday = () => {
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

// Created
getAllLocation()

// Meta
useHead({
  title: 'Jadwal Sholat | Islam App',
})
</script>

<template>
  <div class="container pt-20 md:pt-24">
    <!-- Button change location -->
    <div
      role="button"
      class="mb-2 flex cursor-pointer items-center justify-end space-x-1 text-sm font-medium text-teal-600 dark:text-teal-500 md:text-base"
      @click="showModalLocation = true"
    >
      <Icon name="heroicons:pencil-20-solid" />
      <span>Ubah Lokasi</span>
    </div>

    <!-- Header -->
    <div
      class="mb-8 flex items-center justify-between space-x-2 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 p-5 dark:from-slate-700/50 dark:to-slate-600/60 md:mb-10"
    >
      <div>
        <h1 class="text-xl font-semibold text-white md:text-2xl">Jadwal Sholat</h1>
        <p
          v-if="!isLoading"
          class="text-sm text-slate-100 dark:text-slate-400 md:text-base"
        >
          {{ prayerTime?.jadwal.tanggal }}
        </p>

        <!-- Skeleton date -->
        <div
          v-else
          class="h-6 w-[224px] animate-pulse rounded-md bg-gray-300 dark:bg-slate-600/50"
        />

        <div class="mt-5 flex items-center space-x-2 text-white">
          <Icon
            name="heroicons:map-pin-solid"
            class="text-base md:text-lg"
          />
          <p
            v-if="!isLoading && !locationSelected"
            class="text-sm capitalize md:text-base"
          >
            {{ dataLocation?.cityName }}, {{ prayerTime?.daerah.toLowerCase() }},
            {{ dataLocation?.countryName }}
          </p>
          <p
            v-else-if="!isLoading && locationSelected"
            class="text-sm capitalize md:text-base"
          >
            {{ locationSelected.lokasi }}
          </p>

          <!-- Skeleton location -->
          <div
            v-else
            class="h-6 w-[224px] animate-pulse rounded-md bg-gray-300 dark:bg-slate-600/50"
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
      :default-index="indexActiveTab"
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
          <SkeletonScheduleToday v-if="isLoading" />

          <ScheduleToday
            v-else
            :data-schedule="prayerTime!"
          />
        </div>

        <!-- Prayer schedule 1 month -->
        <div v-else-if="item.key === 'this-month'">
          <!-- Skeleton -->
          <div
            v-if="isLoading"
            class="h-[600px] w-full animate-pulse rounded-xl bg-gray-300 dark:bg-slate-700/30"
          />
          <ScheduleMonth
            v-else
            :data-schedule="prayerTimeOneMonth!"
          />
        </div>
      </template>
    </UTabs>

    <!-- Modal location -->
    <ModalLocations
      v-model="showModalLocation"
      :locations="locationLists"
      @select-location="handleSelectLocation"
    />
  </div>
</template>
