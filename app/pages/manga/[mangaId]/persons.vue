<script lang="ts" setup>
const { data } = defineProps<{
  data: any
}>()

const route = useRoute()
const mangaId = route.params.mangaId

const { data: persons } = await useFetch<any>(`https://api.bgm.tv/v0/subjects/${mangaId}/persons`)

const formattedPersons = computed(() => {
  const result: any[] = []
  for (const item of persons.value) {
    const find = useFind(result, ['title', item.relation])
    if (!find) {
      result[['作者', '原作', '作画'].includes(item.relation) ? 'unshift' : 'push']({
        title: item.relation,
        data: [formatPerson(item)],
      })
    }
    else {
      find?.data.push(formatPerson(item))
    }
  }
  return result
})
</script>

<template>
  <div class="flex flex-col divide-y my-4 gap-4">
    <PageHeader :data />

    <PageCharacterList
      v-for="item in formattedPersons"
      :key="item.title"
      :="item"
      size="large"
      class="pt-4"
    />

    <div
      v-if="!formattedPersons.length"
      class="flex flex-col h-40 items-center justify-center rounded-md"
    >
      <UIcon
        name="i-icon-park-outline-box"
        class="text-[28px]"
      />
      <div class="mt-2 text-sm">
        暂无内容
      </div>
    </div>
  </div>
</template>
