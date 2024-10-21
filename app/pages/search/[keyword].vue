<script setup lang="ts">
const route = useRoute()
const { y } = useWindowScroll({ behavior: 'smooth' })

function to({ query }: any) {
  return {
    path: route.path,
    query: {
      ...route.query,
      ...query,
    },
  }
}

function _navigateTo({ query }: any) {
  for (const key in query) {
    if (isNil(query[key]))
      query[key] = ''
  }
  navigateTo(to({ query }))
  y.value = 0
}

interface RequestManga {
  list: any[]
  results: number
}

const keyword = route.params.keyword

const page = ref(Number(route.query.page || 1))
function handleChangePage(value: number) {
  _navigateTo({
    query: { page: value },
  })
}

const { data, status } = await useFetch<RequestManga>(`/api/search/subject/${keyword}`, {
  query: computed(() => {
    return {
      type: 1,
      responseGroup: 'large',
      max_results: 24,
      start: (page.value - 1) * 24 + 1,
    }
  }),
})
const isLoading = computed(() => status.value === 'pending')
watch(isLoading, (val: boolean) => {
  if (val) {
    y.value = 0
  }
})
const mangaList = computed(() => data.value?.list ?? [])
const mangaTotal = computed(() => data.value?.results ?? 0)
</script>

<template>
  <div>
    <div class="my-4">
      以下为
      <span class="text-primary-500 dark:text-primary-400">“{{ route.params.keyword }}”</span>
      的搜索结果：
    </div>

    <!-- 内容区域 -->
    <div class="my-4">
      <!-- 加载状态 -->
      <div
        v-if="isLoading"
        class="flex flex-col h-80 items-center justify-center rounded-md"
      >
        <UIcon
          name="i-icon-park-outline-loading-four"
          class="animate-spin text-[28px]"
        />
        <div class="mt-2 text-sm">
          加载中...
        </div>
      </div>

      <div
        v-if="!isLoading && !mangaTotal"
        class="flex flex-col h-80 items-center justify-center  rounded-md"
      >
        <UIcon
          name="i-icon-park-outline-box"
          class="text-[28px]"
        />
        <div class="mt-2 text-sm">
          暂无内容
        </div>
      </div>

      <!-- 漫画列表 -->
      <div
        v-if="!isLoading"
        class="grid grid-cols-3 sm:grid-cols-6 xl:grid-cols-8 gap-4 items-start"
      >
        <ULink
          v-for="item in mangaList"
          :key="item.id"
          :to="`/manga/${item.id}`"
          target="_blank"
          class="group text-left"
        >
          <div class="aspect-w-3 aspect-h-4">
            <img
              loading="lazy"
              :src="item.images?.common"
              :alt="item.name_cn || item.name || '未知'"
              class="rounded-md object-cover bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800"
            >
          </div>
          <div class="mt-1 h-[40px] line-clamp-2 font-medium leading-5 text-gray-900 group-hover:text-primary-500 group-hover:dark:text-primary-400">
            {{ item.nameCn || item.name || '未知' }}
          </div>
          <!-- <div class="text-sm truncate">
            {{ findInfoBox(item.infobox, '作者') !== '未知' ? findInfoBox(item.infobox, '作者') : findInfoBox(item.infobox, '作画') }}
          </div> -->
        </ULink>
      </div>

      <!-- 分页 -->
      <UPagination
        v-if="!isLoading && mangaTotal > 0"
        v-model="page"
        :total="mangaTotal"
        :page-count="24"
        :to="(value: number) => to({
          query: {
            page: value,
          },
        })"
        class="mt-4"
        @update:model-value="handleChangePage"
      />
    </div>
  </div>
</template>
