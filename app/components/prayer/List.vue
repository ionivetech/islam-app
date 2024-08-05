<script setup lang="ts">
import { Icon } from '@iconify/vue';
// Interfaces
import type { IPrayer } from '@/models/IPrayer';

// Props
defineProps<{
  prayers: IPrayer[]
}>()
</script>

<template>
  <UAccordion
    :items="prayers"
    :ui="{
      wrapper: 'w-full flex flex-col gap-y-4',
      container:
        'rounded-lg bg-slate-50 border border-gray-300/80 dark:border-gray-700 dark:bg-gray-800/50',
      item: {
        base: 'bg-background-light dark:bg-background-dark border-t border-gray-300/80 dark:border-gray-700',
        padding: 'p-0',
      },
    }"
  >
    <template #default="{ item, index, open }">
      <div class="flex cursor-pointer items-center justify-between gap-x-3 p-3 md:p-4">
        <div
          class="flex items-start gap-x-1.5 text-sm font-normal text-yami dark:text-slate-200 md:text-base"
        >
          <p>{{ index + 1 }}.</p>
          <p>{{ item.nama }}</p>
        </div>

        <Icon
          icon="fluent:chevron-down-24-filled"
          :class="{ 'rotate-180': open }"
          class="w-4 min-w-[16px] text-yami transition-all duration-300 ease-in-out dark:text-slate-200 md:text-xl"
        />
      </div>
    </template>

    <template #item="{ item }">
      <div class="space-y-2">
        <div class="px-3 pb-1 pt-5 md:px-4">
          <!-- Arab, latin & translation -->
          <div v-if="item.arab">
            <p
              dir="rtl"
              lang="ar"
              class="mb-3 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-slate-200 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]"
            >
              {{ item.arab }}
            </p>

            <p
              class="mb-3 text-sm !leading-6 tracking-wide text-teal-800 dark:text-white md:text-base md:!leading-7"
            >
              {{ item.latin }}
            </p>

            <p
              class="text-sm !leading-6 text-smoke-1 dark:text-slate-400 md:text-base md:!leading-7"
            >
              {{ item.arti }}
            </p>
          </div>

          <!-- Notes -->
          <div v-if="item.keterangan">
            <p class="mb-1 text-sm font-semibold text-yami dark:text-slate-200">
              Keterangan:
            </p>
            <p
              class="text-xs text-smoke-1 dark:text-slate-400 md:text-sm"
              v-html="item.keterangan"
            />
          </div>
        </div>

        <!-- History -->
        <div
          v-if="item.riwayat"
          class="rounded-b-lg bg-gray-100 px-3 py-2 dark:bg-gray-700 md:px-4"
        >
          <p class="text-xs text-smoke-1 dark:text-smoke-2 md:text-sm">
            {{ item.riwayat }}
          </p>
        </div>
      </div>
    </template>
  </UAccordion>
</template>
