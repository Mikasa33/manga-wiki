<script setup lang="ts">
const route = useRoute()
const dayjs = useDayjs()
const { y } = useWindowScroll({ behavior: 'smooth' })

interface Option {
  value: any
  label: string
  slot?: boolean
  children?: Option[]
}

const sortOptions: Option[] = [
  { value: 'rank', label: '按热度' },
  { value: 'date', label: '按日期' },
]
const seriesOptions: Option[] = [
  { value: null, label: '全部' },
  { value: 'true', label: '系列' },
  { value: 'false', label: '单行本' },
]
const timeOptions: Option[] = [
  { value: null, label: '全部' },
  { value: 'prev', label: '往年', slot: true },
]
const currentYear = dayjs().year() + 1
const yearOptions: Option[] = Array.from({ length: 13 }, (_, index) => ({
  value: `${currentYear - index}`,
  label: `${currentYear - index}年`,
}))
yearOptions.unshift(timeOptions[0]!)
yearOptions.push(timeOptions[1]!)
const prevYears = Array.from({ length: currentYear - 13 - 1948 }, (_, i) => ({
  value: `${currentYear - 13 - i}`,
  label: `${currentYear - 13 - i}年`,
}))

const filterOptions: Option[] = [
  {
    value: 'series',
    label: '系列',
    children: seriesOptions,
  },
  {
    value: 'year',
    label: '时间',
    children: yearOptions,
  },
  {
    value: 'sort',
    label: '排序',
    children: sortOptions,
  },
]

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
  data: any[]
  limit: number
  offset: number
  total: number
}

const page = ref(Number(route.query.page || 1))
function handleChangePage(value: number) {
  _navigateTo({
    query: { page: value },
  })
}

const filter = ref<Record<string, any>>({
  series: route.query.series || seriesOptions[1]!.value,
  year: route.query.year || yearOptions[0]!.value,
  sort: route.query.sort || sortOptions[0]!.value,
})
const selectYear = computed(() => {
  if (!filter.value.year || currentYear - filter.value.year < 13) {
    return null
  }
  return `${filter.value.year}年`
})
function handleChangeFilter(key: string, value: any) {
  filter.value[key] = value
  page.value = 1
  _navigateTo({
    query: { [key]: value, page: 1 },
  })
}

const { data, status } = await useFetch<RequestManga>('/api/subjects', {
  query: computed(() => {
    return {
      ...filter.value,
      type: 1,
      cat: 1001,
      limit: 24,
      offset: (page.value - 1) * 24,
    }
  }),
})
const isLoading = computed(() => status.value === 'pending')
watch(isLoading, (val: boolean) => {
  if (val) {
    y.value = 0
  }
})
const mangaList = computed(() => data.value?.data ?? [])
const mangaTotal = computed(() => data.value?.total ?? 0)
</script>

<template>
  <div>
    <!-- 筛选 -->
    <div class="flex flex-col gap-2 my-4">
      <div
        v-for="item in filterOptions"
        :key="item.value"
        class="flex"
      >
        <div class="text-sm py-1.5 pr-2">
          {{ item.label }}
        </div>
        <div class="flex flex-wrap gap-2 flex-1">
          <template
            v-for="item2 in item.children"
            :key="item2.value"
          >
            <UButton
              v-if="!item2.slot"
              :color="filter[item.value] === item2.value ? 'primary' : 'gray'"
              :variant="filter[item.value] === item2.value ? 'soft' : 'ghost'"
              :label="item2.label"
              :to="to({
                query: {
                  [item.value]: item2.value,
                  page: 1,
                },
              })"
              @click="handleChangeFilter(item.value, item2.value)"
            />
            <USelectMenu
              v-else-if="item2.value === 'prev'"
              clear-search-on-close
              searchable
              searchable-placeholder="输入"
              :options="prevYears"
              value-attribute="value"
              class="w-20"
              @update:model-value="(value: any) => handleChangeFilter(item.value, value)"
            >
              <UButton
                :color="selectYear ? 'primary' : 'gray'"
                :variant="selectYear ? 'soft' : 'ghost'"
                :label="selectYear ?? '选择年份'"
              />

              <template #option-empty>
                无年份
              </template>

              <template #empty>
                无年份
              </template>
            </USelectMenu>
          </template>
        </div>
      </div>
    </div>

    <UDivider />

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
          <div class="mt-1 text-gray-900 dark:text-white font-medium truncate group-hover:text-primary-500 group-hover:dark:text-primary-400">
            {{ item.name_cn || item.name || '未知' }}
          </div>
          <div class="text-sm truncate">
            {{ findInfoBox(item.infobox, '作者') !== '未知' ? findInfoBox(item.infobox, '作者') : findInfoBox(item.infobox, '作画') }}
          </div>
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
