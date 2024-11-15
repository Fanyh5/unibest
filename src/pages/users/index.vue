<route lang="json5">
{
  style: {
    navigationBarTitleText: '个人中心',
  },
}
</route>
<template>
  <view>
    <view class="header">
      <wd-img
        :width="100"
        :height="100"
        round
        :enable-preview="true"
        src="https://pic2.zhimg.com/v2-1a79b84f5d33098805484ba1ec56456d_1440w.jpg"
      >
        <template #error>
          <view class="error-wrap">加载失败</view>
        </template>
        <template #loading>
          <view class="loading-wrap">
            <wd-loading />
          </view>
        </template>
      </wd-img>
      <view>微信用户</view>
    </view>
    <view class="pointBox box">
      <shortcut></shortcut>
    </view>

    <tool />
  </view>
</template>

<script setup lang="ts">
import Shortcut from '@/pages/users/shortcut/shortcut.vue'
import Tool from '@/pages/users/tool/tool.vue'
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  height: calc(var(--status-bar-height) + 360rpx);
  padding: calc(50rpx + var(--status-bar-height)) 30rpx 0 6%;
  color: #ffffff;
  background-image: url('/unibest/static/images/main-bg.png');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  border-bottom-right-radius: 30rpx;
  border-bottom-left-radius: 30rpx;
}

.pointBox {
  width: 94%;
  margin: 0 3%;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 24rpx 0 rgba($color: #f6f6f6, $alpha: 1);
}

.box {
  transform: translateY(-30rpx);
}
</style>
