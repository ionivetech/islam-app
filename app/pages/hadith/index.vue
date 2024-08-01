<script setup lang="ts">
// Interface
import type { IHadithItems, IHadithList } from '@/models/IHadith';

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
const { data: dataListHadith, status: statusDataList } = useLazyFetch<IHadithList>(hadithHistorySelected, {
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

    const history = hadithHistorySelected.value
    const number = search.value

    $fetch<IHadithItems>(`${history}/${number}`, { baseURL: HADITH_API })
      .then((result) => {
        searchResult.value = result
      })
      .catch(() => {
        isErrorSearch.value = true
      })
      .finally(() => {
        isSearching.value = false
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
  <div>
    <!-- Header -->
    <HadithHeaderList
      v-model="search"
      :hadith-history-selected
      @change-hadith-history="changeHadithHistory"
    />

    <div class="container">
      <!-- Skeleton -->
      <SkeletonHadith v-if="statusDataList === 'pending' || isSearching" />

      <div
        v-else-if="statusDataList === 'success'"
        class="mt-5"
      >
        <div class="mb-3">
          <!-- Information total & search hadith -->
          <p
            v-if="!searchResult"
            class="text-sm text-yami dark:text-slate-200 md:text-base"
          >
            Terdapat <b>{{ dataListHadith?.pagination.totalItems }}</b> hadits menurut
            {{ dataListHadith?.name }}
          </p>

          <p
            v-else
            class="text-sm text-yami dark:text-slate-200 md:text-base"
          >
            Menampilkan hadits {{ dataListHadith?.name }} nomor <b>{{ search }}</b>
          </p>
        </div>

        <!-- List hadith -->
        <div v-if="!isSearching">
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
            class="rounded-lg bg-slate-200/50 p-5 text-sm font-normal text-yami dark:bg-slate-700/50 dark:text-slate-200 sm:text-base"
          >
            Tidak ditemukan hadits dengan nomor <b>{{ search }}</b>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="!search && !isFinishSearch"
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
  </div>
</template>
