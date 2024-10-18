<script lang="ts" setup>
const { data } = defineProps<{
  data: any
}>()
</script>

<template>
  <div class="flex flex-col divide-y sm:divide-none gap-2">
    <PageSubjectTitle
      :data
      class="hidden sm:flex"
    />

    <div
      v-if="data.summary || data.tags?.length"
      class="flex flex-col gap-2 pt-4 sm:pt-0"
    >
      <H2
        label="简介"
        class="sm:hidden"
      />

      <!-- <div
        v-if="data.summary"
        class="whitespace-pre-line"
      >
        {{ data.summary }}
      </div> -->

      <div
        v-if="data.tags?.length"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="item in data.tags"
          :key="item.label"
          :label="item.label"
          color="gray"
        />
      </div>
    </div>
  </div>
</template>
