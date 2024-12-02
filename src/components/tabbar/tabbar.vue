<template>
  <view class="tabbar-wrap">
    <up-tabbar :value="activeIndex" @change="onTabChange" :fixed="true" :placeholder="true">
      <up-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :text="item.text"
        :icon="item.icon"
      ></up-tabbar-item>
    </up-tabbar>
  </view>
</template>

<script setup lang="ts">
// TabBar 配置
const tabbarList = ref([
  { icon: 'home', text: '首页', pagePath: '/pages/index/index' },
  { icon: 'search', text: '搜索', pagePath: '/pages/about/about' },
])

const activeIndex = ref(0)

// 获取当前路径
const getCurrentPath = (): string => {
  // #ifdef MP
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return `/${currentPage.route}`
  // #endif

  // #ifdef H5
  // eslint-disable-next-line no-unreachable
  return window.location.hash.replace('#', '') || `/`
  // #endif

  // #ifdef APP-PLUS
  return uni.getStorageSync('currentPagePath') || '/pages/index/index'
  // #endif
}

// 更新当前激活的 Tab
const updateActiveIndex = () => {
  const currentPath = getCurrentPath()
  const index = tabbarList.value.findIndex((item) => item.pagePath === currentPath)
  activeIndex.value = index !== -1 ? index : 0 // 找不到时默认激活第一个 Tab
}

// 页面初始化时设置当前激活的 Tab
onMounted(() => {
  updateActiveIndex()
})

// Tab 切换处理
const onTabChange = (index: number) => {
  const selected = tabbarList.value[index]
  const currentPath = tabbarList.value[activeIndex.value]?.pagePath

  if (selected.pagePath !== currentPath) {
    // 页面跳转
    // #ifdef MP || APP-PLUS
    uni.switchTab({ url: selected.pagePath })
    uni.setStorageSync('currentPagePath', selected.pagePath) // 存储当前路径
    // #endif

    // #ifdef H5
    const targetPath = `#${selected.pagePath}` // 确保路径符合 Hash 模式
    if (window.location.hash !== targetPath) {
      window.location.hash = targetPath
    }
    // #endif
  }
}
</script>

<style scoped lang="scss">
.tabbar-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0 -2rpx 4rpx rgba(0, 0, 0, 0.1);
}
</style>
