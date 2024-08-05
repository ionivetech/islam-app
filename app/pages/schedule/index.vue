<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useGeolocation } from '@vueuse/core';
// Interfaces
import type { LocationData } from '@/models/dto/dataLocation.dto';
import type { ILocation, ILocations } from '@/models/ILocation';
import type { IPrayerTime, ISchedule } from '@/models/IPrayerTime';

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
    transform: (locationData: LocationData) => {
      const administrativeData = locationData.localityInfo.administrative
      const lastAdministrativeData = administrativeData[administrativeData.length - 1]!
      const cityName = lastAdministrativeData.name.replace('Kabupaten', 'Kab.')

      return {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        countryName: locationData.countryName,
        cityName
      }
    },
  }).then((res) => {
    dataLocation.value = res.data.value ?? null
    pauseWatchCoords()
    getIdCity()
  })
}

// get all location
const getAllLocation = () => {
  useFetch('/kota/semua', {
    baseURL: SHOLAT_API,
    transform: ({ data }) => {
      const newData = data.map(({ id, lokasi }: ILocations) => ({
        id,
        lokasi: lokasi.toLowerCase(),
      }))
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
    transform: ({ data }) => data[0].id,
  }).then((res) => {
    idCity.value = res.data.value
    getDataSchedule()
  })
}

// Handle select manual location
const handleSelectLocation = (location: ILocations) => {
  locationSelected.value = location
  isLoading.value = true

  idCity.value = location.id
  showModalLocation.value = false
  getDataSchedule()
}

// Get data prayer time today and this month
const getDataSchedule = async () => {
  const promises = [getPrayerTimeToday(), getPrayerTimeOneMonth()]
  const res = await Promise.all(promises)
  if (res) isLoading.value = false
}

// Get data prayer time today
const getPrayerTimeToday = async () => {
  const res = await useFetch(`/jadwal/${idCity.value}/${dateToday.value}`, {
    baseURL: SHOLAT_API,
    transform: ({ data }) => data,
  }).then((res) => {
    prayerTime.value = res.data.value
    return res.status.value
  })
  return res
}

// Get data prayer time 1 month
const getPrayerTimeOneMonth = async () => {
  const date = dateToday.value.split('/')
  date.pop()

  const res = await useFetch(`/jadwal/${idCity.value}/${date.join('/')}`, {
    baseURL: SHOLAT_API,
    transform: ({ data }) => {
      const newData = data.jadwal.map((schedule: ISchedule, index: number) => ({
        ...schedule,
        tanggal: (index + 1).toString().padStart(2, '0'),
        class:
          index + 1 === new Date().getDate()
            ? 'active-row bg-teal-600/20 dark:bg-teal-500/20 rounded-lg'
            : '',
      }))

      return newData
    },
  }).then((res) => {
    prayerTimeOneMonth.value = res.data.value
    return res.status.value
  })
  return res
}

watch(indexActiveTab, (val) => {
  if (val === 1) scrollToActiveRow()
})

// Function for scroll to element with classname active-row
const scrollToActiveRow = () => {
  setTimeout(() => {
    const element = document.querySelector('.active-row')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }, 250)
}

// Change index active tab
const onChangeTab = (index: number) => (indexActiveTab.value = index)

// Created
getAllLocation()

// Meta
useHead({
  title: 'Jadwal Sholat | Islam App',
})
</script>

<template>
  <div class="container pt-6 md:pt-8">
    <!-- Button change location -->
    <div class="flex justify-end">
      <div
        role="button"
        class="mb-2 flex cursor-pointer items-center space-x-1 text-sm font-medium text-teal-600 dark:text-teal-500 md:text-base"
        @click="showModalLocation = true"
      >
        <Icon icon="heroicons:pencil-20-solid" />
        <span>Ubah Lokasi</span>
      </div>
    </div>

    <!-- Header -->
    <div
      class="mb-8 flex items-center justify-between space-x-2 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 px-5 py-7 dark:from-slate-700/50 dark:to-slate-600/60 md:mb-10"
    >
      <div>
        <h1 class="text-xl font-semibold text-white md:text-2xl">
          Jadwal Sholat
        </h1>
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
            icon="heroicons:map-pin-solid"
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
        icon="fa6-solid:mosque"
        class="text-[70px] text-white/40 dark:text-white/20 sm:text-[80px]"
      />
    </div>

    <!-- Tabs -->
    <UTabs
      :items="tabs"
      :default-index="0"
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
      @change="onChangeTab"
    >
      <template #item="{ item }">
        <!-- Prayer schedule today -->
        <div v-if="item.key === 'today'">
          <!-- Skeleton -->
          <SkeletonScheduleToday v-if="isLoading" />

          <ScheduleToday
            v-else-if="!isLoading && prayerTime"
            :data-schedule="prayerTime"
          />
        </div>

        <!-- Prayer schedule 1 month -->
        <div v-else-if="item.key === 'this-month'">
          <ScheduleMonth
            :loading="isLoading"
            :data-schedule="prayerTimeOneMonth"
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
