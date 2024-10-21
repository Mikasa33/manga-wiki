<script setup lang="ts">
const route = useRoute()
const toast = useToast()

const isOpen = ref(false)
const search = ref(route.params.keyword ?? '')
function handleSearch() {
  if (!search.value) {
    toast.add({ title: '搜索内容不能为空', color: 'red' })
    return
  }
  navigateTo(`/search/${search.value}`, !route.path.includes('/search/')
    ? {
        open: {
          target: '_blank',
        },
      }
    : {})
  isOpen.value = false
}
</script>

<template>
  <div>
    <UHeader>
      <template #logo>
        <ULink to="/">
          Manga Wiki
        </ULink>
      </template>

      <template #center>
        <UInput
          v-model="search"
          icon="i-heroicons:magnifying-glass-20-solid"
          placeholder="搜索漫画..."
          color="white"
          variant="outline"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          class="hidden sm:flex md:w-[320px] sm:w-[200px]"
          @keydown.enter="handleSearch"
        >
          <template #trailing>
            <UButton
              v-show="search !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="search = ''"
            />
          </template>
        </UInput>
      </template>

      <template #right>
        <UButton
          icon="i-heroicons:magnifying-glass-20-solid"
          color="gray"
          variant="ghost"
          class="flex sm:hidden"
          @click="isOpen = true"
        />

        <UModal
          v-model="isOpen"
          :ui="{ container: 'items-start' }"
        >
          <div class="flex p-4 gap-2 w-full">
            <UInput
              v-model="search"
              icon="i-heroicons:magnifying-glass-20-solid"
              placeholder="搜索漫画..."
              color="white"
              variant="outline"
              :ui="{ icon: { trailing: { pointer: '' } } }"
              class="w-full"
              @keydown.enter="handleSearch"
            >
              <template #trailing>
                <UButton
                  v-show="search !== ''"
                  color="gray"
                  variant="link"
                  icon="i-heroicons-x-mark-20-solid"
                  :padded="false"
                  @click="search = ''"
                />
              </template>
            </UInput>
            <UButton
              color="gray"
              @click="isOpen = false"
            >
              取消
            </UButton>
          </div>
        </UModal>

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
