<script setup lang="ts">
const headerLinks = [
  // {
  //   id: 'index',
  //   label: '首页',
  //   icon: 'i-icon-park-outline-home',
  //   to: '/',
  // },
  // {
  //   id: 'classify',
  //   label: '分类',
  //   icon: 'i-icon-park-outline-all-application',
  //   to: '/classify',
  // },
]
</script>

<template>
  <div>
    <UHeader :links="headerLinks">
      <template #logo>
        <ULink to="/">
          Manga Wiki
        </ULink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          icon="i-icon-park-outline-github"
          color="gray"
          variant="ghost"
          to="https://github.com/mikasa33/manga-wiki"
          target="_blank"
        />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UMain>

    <UDivider />

    <UFooter :ui="{ bottom: { container: 'py-2 lg:py-6' } }">
      <template #center>
        Copyright © {{ new Date().getFullYear() }} Manga Wiki
      </template>
    </UFooter>
  </div>
</template>
