<template>
  <up-navbar
    :height="navbarHeight"
    v-bind="props"
    class="custom-navbar"
    :safe-area-inset-top="safeAreaInsetTop"
    :placeholder="placeholder"
    :fixed="fixed"
    :border="border"
    :left-icon="leftIcon"
    :left-text="leftText"
    :right-text="rightText"
    :right-icon="rightIcon"
    :title="title"
    :bg-color="bgColor"
    :title-width="titleWidth"
    :left-icon-size="leftIconSize"
    :left-icon-color="leftIconColor"
    :auto-back="autoBack"
    :title-style="titleStyle"
  >
    <!-- 左侧插槽 -->
    <template #left>
      <slot name="left"></slot>
    </template>

    <!-- 标题插槽 -->
    <template #center>
      <slot name="center"></slot>
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
interface Props {
  extraRightMargin?: number // 额外的右侧边距
  safeAreaInsetTop?: boolean // 是否开启顶部安全区适配
  placeholder?: boolean // 固定在顶部时，是否生成一个等高元素，以防止塌陷
  fixed?: boolean // 导航栏是否固定在顶部
  border?: boolean // 导航栏底部是否显示下边框
  leftIcon?: string // 左边返回图标的名称，只能为uview-plus自带的图标
  leftText?: string // 左边的提示文字
  rightText?: string // 右边的提示文字
  rightIcon?: string // 右边返回图标的名称，只能为uview-plus自带的图标
  title?: string // 导航栏标题，如设置为空字符，将会隐藏标题占位区域
  bgColor?: string // 导航栏背景设置
  titleWidth?: string | number // 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx
  leftIconSize?: string | number // 左侧返回图标的大小
  leftIconColor?: string // 左侧返回图标的颜色
  autoBack?: boolean // 点击左侧区域(返回图标)，是否自动返回上一页
  titleStyle?: string | object // 标题的样式，对象或字符串形式
}

// Props定义
const props = defineProps<Props>()

// 默认值
const {
  extraRightMargin = 10,
  safeAreaInsetTop = true,
  placeholder = true,
  fixed = true,
  border = false,
  leftIcon = 'arrow-left',
  leftText = '',
  rightText = '',
  rightIcon = '',
  title = '',
  bgColor = '#ffffff',
  titleWidth = '400rpx',
  leftIconSize = '20px',
  leftIconColor = '#303133',
  autoBack = true,
  titleStyle = {},
} = props

// 状态
const navbarHeight = ref<number>(44) // 默认导航栏高度
const rightOffset = ref<number>(0) // 右侧偏移量

// 初始化导航栏参数
const initNavbar = () => {
  const { statusBarHeight, platform } = uni.getSystemInfoSync()

  // 获取胶囊信息
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect
    ? uni.getMenuButtonBoundingClientRect()
    : null

  if (menuButtonInfo) {
    navbarHeight.value = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2
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
