<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('security')" :placeholder="true" :autoBack="true"></up-navbar>
    <view class="center flex-col mt-2 px-2"></view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss">
.uni-list {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
}

.radio-group {
  width: 80%;
  margin: 10px auto;
  border-radius: 12px;
}

.uni-list-cell {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
</style>
