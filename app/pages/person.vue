<script lang="ts" setup>
const route = useRoute()
const personId = route.params.personId

const navigationList = [
  { to: `/person/${personId}`, label: '概览' },
  { to: `/person/${personId}/works`, label: '作品' },
]

const { data: person } = await useFetch<any>(`/api/persons/${personId}`)

const formattedData = formatPerson(person.value)
</script>

<template>
  <div>
    <UHorizontalNavigation :links="navigationList" />

    <UDivider />

    <!-- 内容区域 -->
    <NuxtPage :data="formattedData" />
  </div>
</template>
