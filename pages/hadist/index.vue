<script setup lang="ts">
// Interface
import { IHadithList, IHadithItems } from 'models/IHadith'

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

// Get list hadith by name of history & params
const { data: dataListHadith, pending } = await useFetch<IHadithList>(hadithHistorySelected, {
  baseURL: HADIST_API,
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
      baseURL: HADIST_API,
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

// Onchange input search
const onChangeInputSearch = () => {
  if (debounceSearch.value) clearTimeout(debounceSearch.value)
  debounceSearch.value = setTimeout(() => {
    searchHadithNumber()
  }, 1000)
}

// Clear result search
const clearResultSearch = () => {
  searchResult.value = null
  isErrorSearch.value = false
  isFinishSearch.value = false
}

// Meta
useHead({
  title: 'Hadist',
})
</script>

<template>
  <div class="container mt-16 space-y-8 pt-8">
    <!-- List name of history -->
    <HadithHistoryList
      :selected="hadithHistorySelected"
      @change-hadith-history="changeHadithHistory"
    />

    <!-- Skeleton -->
    <div
      v-if="pending || isSearching"
      class="mb-4 space-y-4"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="h-60 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700/30"
      />
    </div>

    <div v-if="!pending">
      <div class="mb-3 flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between">
        <!-- Search input -->
        <Input
          v-model="search"
          :loading="isSearching"
          icon="i-heroicons-magnifying-glass-20-solid"
          loading-icon="i-heroicons-arrow-path"
          placeholder="No. hadist"
          class="mb-6 w-full self-end sm:mb-0 sm:w-40"
          @onchange-value="onChangeInputSearch"
        />

        <!-- Information total & search hadith -->
        <p
          v-if="!pending && !searchResult"
          class="text-sm text-yami dark:text-slate-200 md:text-base"
        >
          Terdapat <b>{{ dataListHadith?.pagination.totalItems }}</b> hadist menurut
          {{ dataListHadith?.name }}
        </p>

        <p
          v-if="!pending && searchResult"
          class="text-sm text-yami dark:text-slate-200 md:text-base"
        >
          Menampilkan hadist {{ dataListHadith?.name }} nomor <b>{{ search }}</b>
        </p>
      </div>

      <!-- List hadith -->
      <div v-if="!pending && !isSearching">
        <!-- List all hadith -->
        <div
          v-if="!isFinishSearch"
          class="grid grid-cols-1 gap-4"
        >
          <HadithList
            v-for="list in dataListHadith?.items"
            :key="list.number"
            :hadith-history-name="dataListHadith?.name"
            :hadith="list"
          />
        </div>

        <!-- Show search result -->
        <HadithList
          v-if="isFinishSearch && searchResult && !isErrorSearch"
          :hadith-history-name="dataListHadith?.name"
          :hadith="searchResult"
        />

        <div
          v-if="isFinishSearch && isErrorSearch"
          class="rounded-lg bg-slate-200/50 p-5 text-sm font-normal text-yami dark:bg-slate-700/50 dark:text-slate-200 sm:text-base"
        >
          Tidak ditemukan hadist dengan nomor <b>{{ search }}</b>
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
