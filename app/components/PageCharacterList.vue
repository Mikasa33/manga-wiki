<script lang="ts" setup>
const { title, data, size, to, slice } = defineProps<{
  title: number | string
  data: any
  size?: 'large'
  to?: string
  slice?: boolean
}>()

const count = 10
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
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <ULink
        v-for="item in slicedData"
        :key="item.id"
        :to="item.to"
        class="flex group"
      >
        <div class="flex-shrink-0">
          <img
            loading="lazy"
            :src="item.covers.small"
            :alt="item.name || '未知'"
            :class="size === 'large' && 'w-[80px] h-[80px]'"
            class="rounded-md object-contain bg-gray-100 dark:bg-gray-800 w-[60px] h-[60px] border border-gray-200 dark:border-gray-800"
          >
        </div>
        <div class="flex flex-col justify-between ml-2 min-w-0">
          <div class="font-medium truncate group-hover:text-primary-500 group-hover:dark:text-primary-400">
            {{ item.name }}
          </div>
          <UBadge
            :label="item.relation"
            color="gray"
            class="w-max"
          />
        </div>
      </ULink>
    </div>
  </div>
</template>
