<script lang="ts" setup>
const { data } = defineProps<{
  data: any
}>()

const route = useRoute()
const characterId = route.params.characterId

const { data: subjects } = await useFetch<any>(`/api/characters/${characterId}/subjects`)

const formattedSubjects = useArrayMap(useFilter(subjects.value, (item: any) => item.type === 1), formatSubject)
</script>

<template>
  <div class="my-4 flex sm:flex-row flex-col gap-4">
    <PageInfoBox
      :data
      auto-height
    />

    <div class="flex flex-col divide-y gap-4 w-full">
      <PageDetail :data />

      <PageSubjectList
        title="出演"
        :data="formattedSubjects"
        class="pt-4"
      />
    </div>
  </div>
</template>
