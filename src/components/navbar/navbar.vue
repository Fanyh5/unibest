<template>
  <up-navbar :custom-back="true" :height="navbarHeight" v-bind="props" class="custom-navbar">
    <!-- 左侧插槽 -->
    <template #left>
      <slot name="left"></slot>
    </template>

    <!-- 标题插槽 -->
    <template #center>
      <slot name="center">{{ title }}</slot>
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
  extraRightMargin?: number
}>()

const { title = '', extraRightMargin = 10 } = props

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
}

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
