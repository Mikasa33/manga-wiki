<script lang="ts" setup>
const { data } = defineProps<{
  data: any
}>()

const route = useRoute()
const personId = route.params.personId

const { data: subjects } = await useFetch<any>(`https://api.bgm.tv/v0/persons/${personId}/subjects`)

const formattedSubjects = useArrayMap(useFilter(subjects.value, ['type', 1]), formatSubject)
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
        title="作品"
        :data="formattedSubjects"
        :to="`${data.to}/works`"
        slice
        class="pt-4"
      />
    </div>
  </div>
</template>
