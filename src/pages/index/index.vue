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
    <UNavbar class="pl-2" :is-back="false" :is-fixed="true">
      <up-search
        style="width: 100%"
        v-model="keyword"
        :show-action="false"
        :placeholder="t('searchPlaceholder')"
        :showAction="false"
      ></up-search>
      <!-- #ifndef H5 -->
      <!-- 扫码功能 不兼容h5 详情文档: https://uniapp.dcloud.io/api/system/barcode?id=scancode -->
      <template v-slot:right>
        <div class="navbar-right">
          <up-icon name="scan" size="28"></up-icon>
        </div>
      </template>
      <!-- #endif -->
    </UNavbar>
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
import UNavbar from '@/components/navbar/u-navbar.vue'
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const keyword = ref<string>('')
</script>

<style></style>
