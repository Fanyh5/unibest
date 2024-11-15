<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="overflow-hidden pt-2 px-4" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-swiper
      :list="swiperList"
      autoplay
      v-model:current="current"
      @click="handleClick"
      @change="onChange"
    ></wd-swiper>

    <wd-notice-bar
      prefix="warn-bold"
      direction="vertical"
      :text="textArray"
      :delay="3"
      custom-class="space"
    />

    <view>
      <wd-row>
        <wd-col :span="4"><view>span: 12</view></wd-col>
        <wd-col :span="4" :offset="4"><view>span: 12</view></wd-col>
      </wd-row>
    </view>

    <wd-grid :gutter="10" :column="3">
      <wd-grid-item icon="picture" text="文字" />
      <wd-grid-item icon="picture" text="文字" />
      <wd-grid-item icon="picture" text="文字" />
      <wd-grid-item icon="picture" text="文字" />
      <wd-grid-item icon="picture" text="文字" />
    </wd-grid>

    <wd-popup v-model="show" position="bottom" custom-style="height: 200px;"></wd-popup>
  </view>
  <tabbar />
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const current = ref<number>(0)
const show = ref<boolean>(false)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

const textArray = ref(['和爱的人度过美好时刻', 'WX内打开即可登录', '也可联系v:cat6724 开通'])
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
