<script lang="ts" setup>
const { data } = defineProps<{
  data: any
}>()
</script>

<template>
  <ULink
    :to="data.to"
    class="flex items-center w-max group"
  >
    <img
      loading="lazy"
      :src="data.covers.small"
      :alt="data.nameCn || data.name || '未知'"
      class="rounded-md object-cover bg-gray-100 dark:bg-gray-800 w-[80px] h-[80px] border border-gray-200 dark:border-gray-800"
    >
    <H1
      :label="data.nameCn || data.name || '未知'"
      class="ml-2 group-hover:text-primary-500 group-hover:dark:text-primary-400"
    />
  </ULink>
</template>
