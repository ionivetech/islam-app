<script lang="ts" setup>
// Interface
import { IHadithList } from 'models/IHadith'

// Variable
const hadithHistorySelected = ref<string>('abu-dawud')
const page = ref<number>(1)
const limit: number = 20

// Watch if page is change
watch(page, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

// Watch if hadith history is change
watch(hadithHistorySelected, () => {
  page.value = 1
})

// Get list hadith by name of history & params
const { data: dataListHadith, pending } = await useAsyncData<IHadithList>(
  () =>
    $fetch(hadithHistorySelected.value, {
      baseURL: HADIST_API,
      params: {
        page: page.value,
        limit,
      },
    }),
  {
    pick: ['name', 'items', 'pagination'],
    watch: [page, hadithHistorySelected],
  },
)

// Change hadit history selected
const changeHadithHistory = (value: string) => (hadithHistorySelected.value = value)

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

    <!-- List Of Hadith -->
    <div
      v-if="pending"
      class="mb-4 space-y-4"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="h-60 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700/30"
      />
    </div>

    <div v-else>
      <p class="mb-3 text-sm text-yami dark:text-slate-200 md:text-base">
        Terdapat <b>{{ dataListHadith?.pagination.totalItems }}</b> hadist menurut
        {{ dataListHadith?.name }}
      </p>
      <div class="grid grid-cols-1 gap-4">
        <div
          v-for="list in dataListHadith?.items"
          :key="list.number"
          class="rounded-lg border border-gray-300/70 p-4 transition-all duration-150 ease-linear hover:!border-teal-600 hover:shadow-[0px_0px_20px_#e4e4e4] dark:border-gray-700 hover:dark:shadow-[0px_0px_20px_#2f2f2f] md:p-6"
        >
          <p class="mb-6 text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
            Hadist {{ dataListHadith?.name }} Nomor {{ list.number }}
          </p>

          <p
            class="mb-3 text-right font-mono text-2xl leading-[55px] text-yami dark:text-slate-200 md:leading-[60px] lg:text-3xl lg:!leading-[70px]"
          >
            {{ list.arab }}
          </p>

          <p class="text-sm !leading-8 text-smoke-1 dark:text-smoke-2 md:text-base">
            {{ list.id }}
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-5 flex justify-end">
        <UPagination
          v-if="!pending"
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
