<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <!-- <navbar leftIcon="">
      <template #center>
        <view class="flex align-center w-full px-2">
          <up-search
            v-model="keyword"
            :show-action="false"
            :placeholder="t('searchPlaceholder')"
            :showAction="false"
          ></up-search>
          <up-icon name="scan" size="28"></up-icon>
        </view>
      </template>
    </navbar> -->
    <up-navbar :title="t('switchLanguages')" :placeholder="true" :autoBack="true"></up-navbar>
    <view class="px-2">
      <view class="text-center">
        当前平台是：
        <text class="text-green-500">{{ PLATFORM.platform }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
// #ifdef MP
import Navbar from '@/components/navbar/navbar.vue'
// #endif
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const keyword = ref<string>('')
</script>

<style></style>
