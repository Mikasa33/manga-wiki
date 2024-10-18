<script lang="ts" setup>
const route = useRoute()
const mangaId = route.params.mangaId

const navigationList = [
  { to: `/manga/${mangaId}`, label: '概览' },
  { to: `/manga/${mangaId}/characters`, label: '角色' },
  { to: `/manga/${mangaId}/persons`, label: '制作人员' },
]

const { data: manga } = await useFetch<any>(`/api/subjects/${mangaId}`)

const formattedData = formatManga(manga.value)
</script>

<template>
  <div>
    <UHorizontalNavigation :links="navigationList" />

    <UDivider />

    <!-- 内容区域 -->
    <NuxtPage :data="formattedData" />
  </div>
</template>
