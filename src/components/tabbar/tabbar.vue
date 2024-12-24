<template>
  <view class="tabbar-wrap" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }">
    <view class="tabbar-content">
      <view
        v-for="(item, index) in tabs"
        :key="index"
        class="tabbar-item"
        :class="{ active: activeIndex === index }"
        @click="handleTabClick(index)"
      >
        <view class="tabbar-icon-wrap">
          <view v-if="item.badge" class="badge" :class="{ 'badge-dot': item.badge === 'dot' }">
            {{ item.badge !== 'dot' ? item.badge : '' }}
          </view>
          <image
            :src="getTabIcon(item, activeIndex === index)"
            mode="aspectFit"
            class="tabbar-icon"
          />
        </view>
        <text class="tabbar-text">{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface TabItem {
  icon: string
  activeIcon?: string
  text: string
  pagePath: string
  badge?: string | number
}

// Props 定义
const props = defineProps<{
  tabs: TabItem[]
  activeIndex: number
}>()

// Emits 定义
const emit = defineEmits<{
  (e: 'change', index: number): void
}>()

const safeAreaInsetBottom = ref(true)

// 获取 Tab 图标
const getTabIcon = (item: TabItem, isActive: boolean): string => {
  return isActive && item.activeIcon ? item.activeIcon : item.icon
}

// 处理 Tab 点击
const handleTabClick = (index: number) => {
  emit('change', index)
}

// 初始化
onMounted(() => {
  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync()
  safeAreaInsetBottom.value = systemInfo.safeAreaInsets?.bottom > 0
})
</script>

<style lang="scss" scoped>
.tabbar-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  padding-bottom: 0;
  background-color: rgba(255, 255, 255, 0.98);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-top: 0.5px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.05);
  transform: translateZ(0);

  &.safe-area-inset-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    /* prettier-ignore */
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.tabbar-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  padding: 0;
}

.tabbar-icon {
  width: 22px;
  height: 22px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.tabbar-text {
  width: 100%;
  height: 16px;
  overflow: hidden;
  font-size: 11px;
  line-height: 16px;
  color: currentColor;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.9;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.tabbar-item {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  max-width: 100px;
  height: 50px;
  padding: 3px 0;
  overflow: hidden;
  font-size: 20px;
  line-height: 1.4;
  color: var(--up-text-color-secondary, #666);
  text-align: center;
  border-radius: 0;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  -webkit-tap-highlight-color: transparent;

  &.active {
    color: var(--up-primary-color, #4080ff);

    .tabbar-icon {
      filter: drop-shadow(0 4px 6px rgba(64, 128, 255, 0.2));
      transform: scale(1.15) translateY(-2px);
    }

    .tabbar-text {
      opacity: 1;
      transform: translateY(-1px);
    }

    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 20px;
      height: 2px;
      content: '';
      background: currentColor;
      border-radius: 1px;
      opacity: 0.8;
      transform: translateX(-50%) scaleX(0.8);
    }
  }

  &:active {
    opacity: 0.7;
    transform: scale(0.96);
  }
}

.tabbar-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 1px auto 4px;
}

.badge {
  position: absolute;
  top: -2px;
  right: -6px;
  z-index: 1;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 11px;
  line-height: 16px;
  color: #fff;
  text-align: center;
  background: var(--up-danger-color, #ff4d4f);
  border: 1.5px solid #fff;
  border-radius: 16px;
  opacity: 0.95;
  transform: translate(0, 0) scale(0.9);
  transform-origin: center center;
  animation: badgeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.badge-dot {
    top: 0;
    right: -1px;
    width: 8px;
    height: 8px;
    padding: 0;
    border-width: 1.5px;
    border-radius: 50%;
  }
}

@keyframes badgeIn {
  from {
    opacity: 0;
    transform: translate(8px, -8px) scale(0.6);
  }
  to {
    opacity: 0.95;
    transform: translate(0, 0) scale(0.9);
  }
}

// 适配暗黑模式
@media (prefers-color-scheme: dark) {
  .tabbar-wrap {
    background-color: rgba(0, 0, 0, 0.85);
    border-top-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.2);
  }

  .tabbar-item {
    color: rgba(255, 255, 255, 0.65);

    &.active {
      color: var(--up-primary-color-dark, #1a90ff);

      .tabbar-icon {
        filter: drop-shadow(0 4px 6px rgba(26, 144, 255, 0.25));
      }

      &::after {
        opacity: 0.6;
      }
    }
  }

  .badge {
    border-color: rgba(0, 0, 0, 0.85);
    opacity: 0.9;
  }
}

// 适配大屏
@media (min-width: 768px) {
  .tabbar-content {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
