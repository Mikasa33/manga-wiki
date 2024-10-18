<script lang="ts" setup>
const { data } = defineProps<{
  data: any
}>()

const route = useRoute()
const mangaId = route.params.mangaId

const { data: characters } = await useFetch<any>(`/api/subjects/${mangaId}/characters`)
const { data: subjects } = await useFetch<any>(`/api/subjects/${mangaId}/subjects`)

const formattedCharacters = useArrayMap(characters, formatCharacter)
const formattedSubjects = computed(() => {
  const result: any[] = []
  for (const item of subjects.value) {
    if (item.type !== 1) {
      continue
    }
    const find = useFind(result, ['title', item.relation])
    if (!find) {
      result[item.relation === '单行本' ? 'unshift' : 'push']({
        title: item.relation,
        data: [formatSubject(item)],
      })
    }
    else {
      find?.data.push(formatSubject(item))
    }
  }
  return result
})
</script>

<template>
  <div class="my-4 flex sm:flex-row flex-col gap-4">
    <PageInfoBox :data />

    <div class="flex flex-col divide-y gap-4 w-full">
      <PageDetail :data />

      <PageCharacterList
        title="角色"
        :data="formattedCharacters"
        :to="`${data.to}/characters`"
        slice
        class="pt-4"
      />

      <PageSubjectList
        v-for="item in formattedSubjects"
        :key="item.title"
        :="item"
        class="pt-4"
      />
    </div>
  </div>
</template>
