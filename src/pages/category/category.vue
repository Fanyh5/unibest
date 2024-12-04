<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <UNavbar :title="t('category')"></UNavbar>
    <view class="u-wrap">
      <view class="u-menu-wrap">
        <scroll-view
          scroll-y
          scroll-with-animation
          class="u-tab-view menu-scroll-view"
          :scroll-top="scrollTop"
        >
          <view
            v-for="(item, index) in tabbar"
            :key="index"
            class="u-tab-item"
            :class="[current == index ? 'u-tab-item-active' : '']"
            :data-current="index"
            @tap.stop="swichMenu(index)"
          >
            <text class="u-line-1">{{ item.name }}</text>
          </view>
        </scroll-view>
        <block v-for="(item, index) in tabbar" :key="index">
          <scroll-view scroll-y class="right-box" v-if="current == index">
            <view class="page-view">
              <view class="class-item">
                <view class="item-title">
                  <text>{{ item.name }}</text>
                </view>
                <view class="item-container">
                  <view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
                    <image class="item-menu-image" :src="item1.icon" mode=""></image>
                    <view class="item-menu-name">{{ item1.name }}</view>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </block>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'
const { safeAreaInsets } = uni.getSystemInfoSync()
interface ClassifyData {
  [key: string]: any // 根据实际数据定义类型
}

const tabbar = ref<ClassifyData[]>([]) // 定义 classifyData 的类型

// Reactive variables
const scrollTop = ref(0) // tab标题的滚动条位置
const current = ref(0) // 当前项的索引
const menuHeight = ref(0) // 左边菜单的高度
const menuItemHeight = ref(0) // 左边菜单item的高度

// Methods
const getImg = (): number => {
  return Math.floor(Math.random() * 35)
}

// 点击左边的栏目切换
const swichMenu = async (index: number) => {
  if (index === current.value) return

  current.value = index

  // 如果菜单未初始化，获取元素的高度
  if (menuHeight.value === 0 || menuItemHeight.value === 0) {
    await getElRect('menu-scroll-view', 'menuHeight')
    await getElRect('u-tab-item', 'menuItemHeight')
  }

  // 将菜单活动item垂直居中
  scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2
}

// 获取目标元素的高度
const getElRect = (elClass: string, dataVal: string) => {
  return new Promise<void>((resolve) => {
    const query = uni.createSelectorQuery().in(uni)
    query
      .select('.' + elClass)
      .fields({ size: true }, (res: any) => {
        if (!res) {
          // 如果节点尚未生成，继续尝试
          setTimeout(() => {
            getElRect(elClass, dataVal)
          }, 10)
          return
        }
        // 将元素的高度赋值给对应的变量
        if (dataVal === 'menuHeight') {
          menuHeight.value = res.height
        } else if (dataVal === 'menuItemHeight') {
          menuItemHeight.value = res.height
        }
        resolve()
      })
      .exec()
  })
}

// On mounted lifecycle hook to initialize
onMounted(() => {
  // 可以初始化一些数据，比如 classifyData，如果需要从 API 加载数据
  // tabbar.value = [] // 假设此数据来自 API
})
</script>

<style lang="scss" scoped>
.u-wrap {
  /* #endif */
  display: flex;
  flex-direction: column;
  height: calc(100vh);
  /* #ifdef H5 */
  height: calc(100vh - var(--window-top));
}

.u-menu-wrap {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.u-tab-view {
  width: 200rpx;
  height: 100%;
}

.u-tab-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110rpx;
  font-size: 26rpx;
  font-weight: 400;
  line-height: 1;
  color: #444;
  background: #f6f6f6;
}

.u-tab-item-active {
  position: relative;
  font-size: 30rpx;
  font-weight: 600;
  color: #000;
  background: #fff;
}

.u-tab-item-active::before {
  position: absolute;
  top: 39rpx;
  left: 0;
  height: 32rpx;
  content: '';
  border-left: 4px solid $u-primary;
}

.u-tab-view {
  height: 100%;
}

.right-box {
  background-color: rgb(250, 250, 250);
}

.page-view {
  padding: 16rpx;
}

.class-item {
  padding: 16rpx;
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 8rpx;
}

.item-title {
  font-size: 26rpx;
  font-weight: bold;
  color: $u-main-color;
}

.item-menu-name {
  font-size: 24rpx;
  font-weight: normal;
  color: $u-main-color;
}

.item-container {
  display: flex;
  flex-wrap: wrap;
}

.thumb-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.333333%;
  margin-top: 20rpx;
}

.item-menu-image {
  width: 120rpx;
  height: 120rpx;
}
</style>
