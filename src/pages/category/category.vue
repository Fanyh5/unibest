<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <navbar :placeholder="true" :title="t('category')" leftIcon=""></navbar>
    <view class="pt-2 px-4">
      <view class="text-center mt-8">
        当前平台是：
        <text class="text-green-500">{{ PLATFORM.platform }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import PLATFORM from '@/utils/platform'
import Navbar from '@/components/navbar/navbar.vue'

const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style scoped lang="scss"></style>
