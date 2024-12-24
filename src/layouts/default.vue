<template>
  <view>
    <slot />
    <tabbar
      v-if="showTabbar"
      :tabs="tabbarConfig"
      :active-index="activeTabIndex"
      @change="handleTabChange"
    />
  </view>
</template>

<script setup lang="ts">
interface TabItem {
  icon: string
  activeIcon: string
  text: string
  pagePath: string
  badge?: string | number
}

// TabBar 配置
const tabbarConfig = ref<TabItem[]>([
  {
    icon: '/static/tabbar/home.png',
    activeIcon: '/static/tabbar/homeHL.png',
    text: '首页',
    pagePath: '/pages/index/index',
  },
  {
    icon: '/static/tabbar/category.png',
    activeIcon: '/static/tabbar/categoryHL.png',
    text: '分类',
    pagePath: '/pages/category/category',
  },
  {
    icon: '/static/tabbar/message.png',
    activeIcon: '/static/tabbar/messageHL.png',
    text: '消息',
    pagePath: '/pages/message/message',
    badge: '99+',
  },
  {
    icon: '/static/tabbar/personal.png',
    activeIcon: '/static/tabbar/personalHL.png',
    text: '我的',
    pagePath: '/pages/user/user',
  },
])

// TabBar 页面路径列表
const tabbarPages = tabbarConfig.value.map((tab) => tab.pagePath)

// TabBar 显示状态和当前激活的索引
const showTabbar = ref(false)
const activeTabIndex = ref(0)

// 提取路由路径的通用方法
const extractPath = (rawPath: string): string => {
  return rawPath.split('?')[0].split('#')[0]
}

// 获取当前路由路径
const getCurrentPath = (): string => {
  let currentPath = '/'

  // #ifdef MP
  const pages = getCurrentPages()
  currentPath = `/${pages[pages.length - 1].route}`
  // #endif

  // #ifdef H5
  const hash = window.location.hash
  if (hash) {
    currentPath = extractPath(hash.replace(/^#/, ''))
  } else {
    currentPath = extractPath(window.location.pathname)
  }
  // #endif

  // #ifdef APP-PLUS
  currentPath = uni.getStorageSync('currentPagePath') || '/pages/index/index'
  // #endif

  // 如果是根路径,返回首页路径
  if (currentPath === '/') {
    currentPath = '/pages/index/index'
  }

  return currentPath
}

// 更新 TabBar 状态
const updateTabbarState = () => {
  const currentPath = getCurrentPath()
  showTabbar.value = tabbarPages.includes(currentPath)

  if (showTabbar.value) {
    const index = tabbarConfig.value.findIndex((tab) => tab.pagePath === currentPath)
    activeTabIndex.value = index !== -1 ? index : 0
  }
}

// 处理 Tab 切换
const handleTabChange = (index: number) => {
  const selected = tabbarConfig.value[index]
  if (!selected) return

  // #ifdef MP || APP-PLUS
  uni.switchTab({
    url: selected.pagePath,
    success: () => {
      uni.setStorageSync('currentPagePath', selected.pagePath)
      activeTabIndex.value = index
    },
  })
  // #endif

  // #ifdef H5
  const targetPath = `#${selected.pagePath}`
  if (window.location.hash !== targetPath) {
    window.location.hash = targetPath
    activeTabIndex.value = index
  }
  // #endif
}

// 生命周期钩子
onMounted(() => {
  updateTabbarState()

  // 监听路由变化
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', updateTabbarState)
    window.addEventListener('popstate', updateTabbarState)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('hashchange', updateTabbarState)
    window.removeEventListener('popstate', updateTabbarState)
  }
})
</script>
