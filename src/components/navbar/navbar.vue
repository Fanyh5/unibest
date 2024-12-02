<template>
  <up-navbar
    :custom-back="true"
    :title="title"
    :height="navbarHeight"
    :backgroundColor="backgroundColor"
    :color="titleColor"
    :fixed="true"
    class="custom-navbar"
  >
    <!-- 左侧插槽 -->
    <template #left>
      <slot name="left"></slot>
    </template>

    <!-- 标题插槽 -->
    <template #title>
      <slot name="title">{{ title }}</slot>
    </template>

    <!-- 右侧插槽 -->
    <template #right>
      <view class="navbar-right" :style="{ marginRight: rightOffset + 'px' }">
        <slot name="right"></slot>
      </view>
    </template>
  </up-navbar>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  title?: string
  backgroundColor?: string
  titleColor?: string
  extraRightMargin?: number
}>()

const { title = '', backgroundColor = '#fff', titleColor = '#333', extraRightMargin = 10 } = props

// 状态
const navbarHeight = ref<number>(44) // 默认导航栏高度
const rightOffset = ref<number>(0) // 右侧偏移量

// 初始化导航栏参数
const initNavbar = () => {
  const { statusBarHeight, platform } = uni.getSystemInfoSync()
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect
    ? uni.getMenuButtonBoundingClientRect()
    : null

  if (menuButtonInfo) {
    const capsuleHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2
    navbarHeight.value = capsuleHeight
    rightOffset.value = menuButtonInfo.width + extraRightMargin
  }

  // 适配平台
  if (platform === 'android') {
    navbarHeight.value += 10
  } else if (platform === 'ios') {
    navbarHeight.value += 5
  }
}

// 属性变化时重新初始化
watch([() => backgroundColor, () => titleColor], () => {
  initNavbar()
})

// 初始化逻辑
onMounted(() => {
  initNavbar()
})
</script>

<style scoped lang="scss">
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
}

.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
