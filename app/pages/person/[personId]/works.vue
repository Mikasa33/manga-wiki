<script lang="ts" setup>
const { data } = defineProps<{
  data: any
}>()

const route = useRoute()
const personId = computed(() => route.params.personId)

const { data: subjects } = await useFetch<any>(`https://api.bgm.tv/v0/persons/${personId.value}/subjects`)

const formattedSubjects = useArrayMap(useFilter(subjects.value, ['type', 1]), formatSubject)
</script>

<template>
  <div class="flex flex-col divide-y my-4">
    <PageHeader :data />

    <PageSubjectList
      title="作品"
      :data="formattedSubjects"
      size="large"
      class="mt-4 pt-4"
    />
  </div>
</template>
