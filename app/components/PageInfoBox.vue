<script lang="ts" setup>
const { data, autoHeight } = defineProps<{
  data: any
  autoHeight?: boolean
}>()
</script>

<template>
  <div class="flex-shrink-0 sm:w-[210px]">
    <img
      loading="lazy"
      :src="data.covers.medium"
      :alt="data.nameCn || data.name || '未知'"
      :class="autoHeight && 'sm:min-h-[280px] sm:h-auto'"
      class="rounded-md object-contain sm:object-cover bg-gray-100 dark:bg-gray-800 w-full sm:w-[210px] h-[280px] border border-gray-200 dark:border-gray-800"
    >
    <PageSubjectTitle
      :data
      class="sm:hidden mt-3"
    />
    <div class="flex flex-col">
      <div v-if="data.name" class="mt-2">
        <span class="text-gray-900 dark:text-white font-medium">原名：</span>
        <span>{{ data.name }}</span>
      </div>

      <template v-if="data.infoBox.length">
        <div
          v-for="item in data.infoBox"
          :key="item.key"
          class="mt-2"
        >
          <span class="text-gray-900 dark:text-white font-medium">{{ item.key }}：</span>
          <span>{{ joinInfoBoxValue(item.value, '、') }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
