<script lang="ts" setup>
const route = useRoute()
const characterId = route.params.characterId

const navigationList = [
  { to: `/character/${characterId}`, label: '概览' },
]

const { data: character } = await useFetch<any>(`/api/characters/${characterId}`)

const formattedData = formatCharacter(character.value)
</script>

<template>
  <div>
    <UHorizontalNavigation :links="navigationList" />

    <UDivider />

    <!-- 内容区域 -->
    <NuxtPage :data="formattedData" />
  </div>
</template>
