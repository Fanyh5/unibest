<template>
  <view>
    <slot />
    <tabbar v-if="showTabbar"></tabbar>
  </view>
</template>

<script setup lang="ts">
// TabBar 页面的路径配置
const tabbarPages = ['/pages/index/index', '/pages/about/about', '/']

// TabBar 显示状态
const showTabbar = ref(false)

// 提取路由路径的通用方法
const extractPath = (rawPath: string): string => {
  // 移除查询参数和 hash 的辅助正则
  return rawPath.split('?')[0].split('#')[0]
}

// 获取当前路由路径的函数
const getCurrentPath = (): string => {
  let currentPath = '/'

  // #ifdef MP
  const pages = getCurrentPages()
  currentPath = `/${pages[pages.length - 1].route}`
  // #endif

  // #ifdef H5
  const hash = window.location.hash
  if (hash) {
    // 提取 hash 模式中的路径（去掉 #）
    currentPath = extractPath(hash.replace(/^#/, ''))
  } else {
    // 非 hash 模式时直接获取路径
    currentPath = extractPath(window.location.pathname)
  }
  // 修正根路径
  if (currentPath === '/index') currentPath = '/'
  // #endif

  return currentPath
}

// 更新 TabBar 显示状态
const updateTabbarVisibility = () => {
  const currentPath = getCurrentPath()
  showTabbar.value = tabbarPages.includes(currentPath)
}

// 在挂载时设置初始状态，并监听路由变化
onMounted(() => {
  updateTabbarVisibility()

  // 监听 H5 的路由变化事件
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', updateTabbarVisibility)
    window.addEventListener('popstate', updateTabbarVisibility) // 非 hash 模式支持
  }
})

// 清理事件监听
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('hashchange', updateTabbarVisibility)
    window.removeEventListener('popstate', updateTabbarVisibility)
  }
})
</script>
