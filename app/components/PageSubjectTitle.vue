<script setup lang="ts">
import type { VNodeChild } from 'vue'

const { data } = defineProps<{
  data: any
}>()
const slots = defineSlots<{
  chip?: () => VNodeChild
}>()
</script>

<template>
  <div class="flex">
    <H1 :label="data.nameCn || data.name || '未知'" />
    <div
      v-if="slots.chip || data.chip"
      class="ml-2 font-bold"
    >
      <slot
        v-if="slots.chip"
        name="chip"
      />
      <Component
        :is="data.chip"
        v-else
      />
    </div>
  </div>
</template>
