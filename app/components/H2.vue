<script setup lang="ts">
import type { VNodeChild } from 'vue'

const { label } = defineProps<{
  label?: number | string
}>()
const slots = defineSlots<{
  default?: () => VNodeChild
}>()
</script>

<template>
  <h2 class="text-gray-900 dark:text-white text-xl font-bold truncate">
    <slot v-if="slots.default" />
    <template v-else>
      {{ label }}
    </template>
  </h2>
</template>
