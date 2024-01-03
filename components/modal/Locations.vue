<script lang="ts" setup>
import type { ILocations } from '@/models/ILocation'

// Show modal
const showModal = defineModel<boolean>()

// Props
const props = defineProps<{
  locations: ILocations[]
}>()

// Emits
const emits = defineEmits<{
  (e: 'select-location', value: ILocations): void
}>()

// Variables
const search = ref<string>('')

// List location
const locationLists = computed((): ILocations[] => {
  if (search.value === '') return props.locations || []
  return props.locations.filter((loc) =>
    loc.lokasi.toLowerCase().includes(search.value.toLowerCase()),
  )
})

// Close modal
const closeModal = () => (showModal.value = false)
</script>

<template>
  <UModal
    v-model="showModal"
    :ui="{
      rounded: 'rounded-xl',
      background:
        'bg-background-light dark:bg-background-dark dark:border dark:border-slate-700/50',
      width: 'sm:max-w-[80vw] md:max-w-[70vw]',
      height: 'max-h-[70vh]',
      overlay: {
        background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
      },
    }"
    prevent-close
  >
    <div>
      <UCard
        :ui="{
          divide: '',
          header: {
            base: 'h-[124px]',
          },
          body: {
            base: 'h-[calc(70vh-124px)] overflow-y-auto',
            padding: 'px-4 py-5 sm:p-6 !pt-0',
          },
        }"
      >
        <template #header>
          <div class="mb-4 flex items-center justify-between bg-white">
            <h4 class="text-xl font-semibold text-yami dark:text-white">Pilih Lokasi</h4>
            <Icon
              name="heroicons:x-mark"
              class="cursor-pointer text-xl"
              @click="closeModal"
            />
          </div>

          <!-- Search location -->
          <Input
            v-model="search"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="lg"
            placeholder="Cari lokasi"
          />
        </template>

        <!-- List cities -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div
            v-for="loc in locationLists"
            :key="loc.id"
            class="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-gray-100 p-3 text-sm capitalize text-gray-600 transition-colors duration-200 ease-in-out hover:border-teal-600"
            @click="emits('select-location', loc)"
          >
            {{ loc.lokasi }}
          </div>
        </div>
      </UCard>
    </div>
  </UModal>
</template>
