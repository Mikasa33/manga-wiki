<script lang="ts" setup>
const { title, data, to, slice } = defineProps<{
  title: number | string
  data: any
  to?: string
  slice?: boolean
}>()

const count = 8
const slicedData = computed<any[]>(() => slice ? useSlice(data, 0, count) : data)
</script>

<template>
  <div
    v-if="data.length"
    class="flex flex-col gap-4"
  >
    <div class="flex justify-between items-center">
      <H2 :label="title" />
      <ULink
        v-if="slice && data.length > count"
        :to
        class="flex items-center text-sm hover:text-primary-500 hover:dark:text-primary-400"
      >
        <span>更多{{ title }}</span>
        <UIcon name="i-icon-park-outline-right" />
      </ULink>
    </div>
    <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      <ULink
        v-for="item in slicedData"
        :key="item.id"
        :to="item.to"
        class="flex flex-col group"
      >
        <div class="aspect-w-3 aspect-h-4">
          <img
            loading="lazy"
            :src="item.covers.common"
            :alt="item.nameCn || item.name || '未知'"
            class="rounded-md object-cover bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800"
          >
        </div>
        <div class="mt-1 h-[40px] line-clamp-2 font-medium leading-5 group-hover:text-primary-500 group-hover:dark:text-primary-400">
          {{ item.nameCn || item.name || '未知' }}
        </div>
      </ULink>
    </div>
  </div>
</template>
