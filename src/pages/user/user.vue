<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view>
    <view class="header">
      <up-avatar
        class="mt-8"
        :size="100"
        :enable-preview="true"
        :src="userStore.userInfo?.avatar || config.defaultUserPhoto"
      ></up-avatar>
      <view class="mt-16 ml-5 text-xl">
        <text v-if="isLogined">{{ userStore.userInfo?.userName || '微信用户' }}</text>
        <text v-else @click="navigateToLogin('')" class="cursor-pointer hover:opacity-80">
          登录/注册
        </text>
      </view>
    </view>
    <view class="pointBox -translate-y-6 py-4">
      <!-- 用户资产信息 -->
      <view class="grid grid-cols-3 text-lg">
        <view class="text-center" @click="navigateToPage('/pages/wallet/index')">
          <view class="text-gray-600">预存款</view>
          <view class="text-[#ff0000] font-medium">¥12.54</view>
        </view>
        <view class="text-center" @click="navigateToPage('/pages/cart/coupon/myCoupon')">
          <view class="text-gray-600">优惠券</view>
          <view class="text-[#ff0000] font-medium">8</view>
        </view>
        <view class="text-center" @click="navigateToPage('/pages/mine/myTracks')">
          <view class="text-gray-600">足迹</view>
          <view class="text-[#ff0000] font-medium">8</view>
        </view>
      </view>

      <!-- 订单状态导航 -->
      <view class="grid grid-cols-5 gap-2 justify-items-center text-center mt-4">
        <view class="order-item" @click="navigateToPage('/pages/order/list?status=1')">
          <view class="i-carbon-time text-2xl text-[#ff0000] mb-1"></view>
          <view class="text-sm">待付款</view>
        </view>
        <view class="order-item" @click="navigateToPage('/pages/order/list?status=2')">
          <view class="i-carbon-delivery text-2xl text-[#ff0000] mb-1" />
          <view class="text-sm">待收货</view>
        </view>
        <view class="order-item" @click="navigateToPage('/pages/order/list?status=3')">
          <view class="i-carbon-star text-2xl text-[#ff0000] mb-1" />
          <view class="text-sm">待评价</view>
        </view>
        <view class="order-item" @click="navigateToPage('/pages/order/afterSale/list')">
          <view class="i-carbon-help text-2xl text-[#ff0000] mb-1"></view>
          <view class="text-sm">售后</view>
        </view>
        <view class="order-item" @click="navigateToPage('/pages/order/list')">
          <view class="i-carbon-list text-2xl text-[#ff0000] mb-1" />
          <view class="text-sm">全部订单</view>
        </view>
      </view>
    </view>

    <tool />
  </view>
</template>

<script setup lang="ts">
import Tool from '@/pages/user/tool/tool.vue'
import { useUserStore } from '@/store'
import { navigateToLogin, navigateToPage } from '@/utils/filters'
import { config } from '@/types/config'

const userStore = useUserStore()
const isLogined = computed(() => {
  return userStore.isLogined
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  height: calc(var(--status-bar-height) + 360rpx);
  padding: calc(50rpx + var(--status-bar-height)) 30rpx 0 6%;
  color: #ffffff;
  background-image: url('@/static/images/main-bg.png');
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
</style>
