<route lang="json5">
{
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('personal')" :placeholder="true" :autoBack="true"></up-navbar>
    <view></view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>
