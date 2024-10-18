<script setup lang="ts">
import { useArrayFilter } from '@vueuse/core'

const links = [
  {
    id: 'index',
    label: '首页',
    icon: 'i-icon-park-outline-home',
    to: '/',
  },
  {
    id: 'classify',
    label: '分类',
    icon: 'i-icon-park-outline-all-application',
    to: '/classify',
  },
]

const sidebarLinks = useArrayFilter(links, (link: any) => link.show !== false)
</script>

<template>
  <!-- 仪表盘布局 -->
  <UDashboardLayout>
    <!-- 仪表盘面板 -->
    <UDashboardPanel
      collapsible
      :width="240"
    >
      <!-- 标题 -->
      <UDashboardNavbar title="MangaDB">
        <template #toggle>
          <UDashboardNavbarToggle />
        </template>
      </UDashboardNavbar>

      <!-- 侧边栏 -->
      <UDashboardSidebar>
        <!-- 菜单 -->
        <UDashboardSidebarLinks :links="sidebarLinks" />

        <!-- 占位 -->
        <div class="flex-1" />

        <!-- 分割线 -->
        <UDivider />

        <!-- 底部用户设置 -->
        <template #footer>
          <UDropdown class="w-full">
            <UButton
              color="gray"
              label="用户昵称"
              variant="ghost"
              class="w-full"
            >
              <template #leading>
                <UAvatar
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  size="2xs"
                />
              </template>

              <template #trailing>
                <UIcon
                  name="i-icon-park-outline-more-one"
                  class="ml-auto w-5 h-5"
                />
              </template>
            </UButton>
          </UDropdown>
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <!-- 右侧内容 -->
    <UDashboardPanel
      breakpoint="sm"
      grow
    >
      <!-- 顶栏 -->
      <UDashboardNavbar>
        <!-- 侧边栏切换控制 -->
        <template #toggle>
          <UDashboardNavbarToggle />
        </template>

        <!-- 主题控制 -->
        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>

      <!-- 路由 -->
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardLayout>
</template>
