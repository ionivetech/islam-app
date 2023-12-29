<script setup lang="ts">
// Interface
import type { IHadithList, IHadithItems } from 'models/IHadith'

// Variable
const hadithHistorySelected = ref<string>('abu-dawud')
const page = ref<number>(1)
const limit: number = 20
const search = ref<string>('')
const isSearching = ref<boolean>(false)
const isErrorSearch = ref<boolean>(false)
const isFinishSearch = ref<boolean>(false)
const searchResult = ref<IHadithItems | null>(null)
const debounceSearch = ref()

// Watch if page is change
watch(page, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

watch(search, () => {
  if (debounceSearch.value) clearTimeout(debounceSearch.value)
  debounceSearch.value = setTimeout(() => {
    searchHadithNumber()
  }, 1000)
})

// Get list hadith by name of history & params
const { data: dataListHadith, pending } = useFetch<IHadithList>(hadithHistorySelected, {
  baseURL: HADITH_API,
  params: {
    page,
    limit,
  },
  pick: ['name', 'items', 'pagination'],
  watch: [page, hadithHistorySelected],
})

// Change hadit history selected
const changeHadithHistory = (value: string) => {
  page.value = 1
  search.value = ''
  clearResultSearch()
  hadithHistorySelected.value = value
}

// Search hadith using number of hadith
const searchHadithNumber = () => {
  if (search.value) {
    isErrorSearch.value = false
    isFinishSearch.value = false
    isSearching.value = true
    $fetch(`${hadithHistorySelected.value}/${search.value}`, {
      baseURL: HADITH_API,
    })
      .then((res) => {
        searchResult.value = res
        isSearching.value = false
        isFinishSearch.value = true
      })
      .catch(() => {
        searchResult.value = null
        isSearching.value = false
        isErrorSearch.value = true
        isFinishSearch.value = true
      })
  } else {
    clearResultSearch()
  }
}

// Clear result search
const clearResultSearch = () => {
  searchResult.value = null
  isErrorSearch.value = false
  isFinishSearch.value = false
}

// Meta
useHead({
  title: 'Hadits | Islam App',
})
</script>

<template>
  <div class="container pt-20 md:pt-24">
    <!-- Header -->
    <div
      class="mb-6 flex flex-col items-center space-y-8 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 p-4 sm:pb-10 sm:pt-8 md:mb-10 dark:from-slate-700/50 dark:to-slate-600/60"
    >
      <Icon
        name="solar:notebook-minimalistic-bold"
        class="text-[80px] text-white sm:text-[95px]"
      />

      <div class="relative w-full md:w-2/3 lg:w-3/4 xl:w-6/12">
        <input
          v-model="search"
          type="text"
          placeholder="Cari nomor hadits"
          class="input-search"
        />

        <div
          class="absolute inset-y-2/4 right-2 flex h-8 w-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 md:h-9 md:w-9 dark:bg-slate-700"
        >
          <Icon
            name="radix-icons:magnifying-glass"
            class="text-xl text-white"
          />
        </div>
      </div>

      <!-- List name of history -->
      <HadithHistoryList
        :selected="hadithHistorySelected"
        @change-hadith-history="changeHadithHistory"
      />
    </div>

    <!-- Skeleton -->
    <SkeletonHadith v-if="pending || isSearching" />

    <div
      v-if="!pending"
      class="mt-5"
    >
      <div class="mb-3">
        <!-- Information total & search hadith -->
        <p
          v-if="!pending && !searchResult"
          class="text-sm text-yami md:text-base dark:text-slate-200"
        >
          Terdapat <b>{{ dataListHadith?.pagination.totalItems }}</b> hadits menurut
          {{ dataListHadith?.name }}
        </p>

        <p
          v-if="!pending && searchResult"
          class="text-sm text-yami md:text-base dark:text-slate-200"
        >
          Menampilkan hadits {{ dataListHadith?.name }} nomor <b>{{ search }}</b>
        </p>
      </div>

      <!-- List hadith -->
      <div v-if="!pending && !isSearching">
        <!-- List all hadith -->
        <div
          v-if="!isFinishSearch"
          class="grid grid-cols-1 gap-4"
        >
          <HadithCard
            v-for="list in dataListHadith?.items"
            :key="list.number"
            :hadith-history-name="dataListHadith?.name"
            :hadith="list"
          />
        </div>

        <!-- Show search result -->
        <HadithCard
          v-if="isFinishSearch && searchResult && !isErrorSearch"
          :hadith-history-name="dataListHadith?.name"
          :hadith="searchResult"
        />

        <div
          v-if="isFinishSearch && isErrorSearch"
          class="rounded-lg bg-slate-200/50 p-5 text-sm font-normal text-yami sm:text-base dark:bg-slate-700/50 dark:text-slate-200"
        >
          Tidak ditemukan hadits dengan nomor <b>{{ search }}</b>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="!pending && !search && !isFinishSearch"
        class="mt-5 flex justify-end"
      >
        <UPagination
          v-model="page"
          :page-count="limit"
          :total="dataListHadith!.pagination.totalItems"
          size="sm"
          :max="5"
          :ui="{
            wrapper: 'flex items-center space-x-1',
            base: 'min-w-[32px] h-8 flex items-center justify-center rounded-full',
            rounded: 'first:rounded-full last:rounded-full',
          }"
        />
      </div>
    </div>
  </div>
</template>
