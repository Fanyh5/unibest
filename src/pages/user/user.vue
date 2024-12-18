<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="user-center">
    <!-- 头部用户信息 -->
    <view class="header">
      <view class="header-content">
        <up-avatar
          class="avatar"
          :size="120"
          :enable-preview="true"
          :src="userStore.userInfo?.avatar || config.defaultUserPhoto"
          @click="handleAvatarClick"
        ></up-avatar>
        <view class="user-info">
          <text v-if="isLogined" class="username">
            {{ userStore.userInfo?.userName || '微信用户' }}
          </text>
          <text v-else @click="navigateToLogin('')" class="login-btn">登录/注册</text>
          <text class="user-id" v-if="isLogined">ID: {{ userStore.userInfo?.userId || '-' }}</text>
        </view>
      </view>
    </view>

    <!-- 用户资产信息卡片 -->
    <view class="asset-card">
      <view class="grid grid-cols-3 text-lg">
        <view class="asset-item" @click="navigateToPage('/pages/wallet/index')">
          <view class="label">预存款</view>
          <view class="value">¥{{ userAssets.balance || '0.00' }}</view>
        </view>
        <view class="asset-item" @click="navigateToPage('/pages/cart/coupon/myCoupon')">
          <view class="label">优惠券</view>
          <view class="value">{{ userAssets.coupons || 0 }}</view>
        </view>
        <view class="asset-item" @click="navigateToPage('/pages/mine/myTracks')">
          <view class="label">足迹</view>
          <view class="value">{{ userAssets.tracks || 0 }}</view>
        </view>
      </view>

      <!-- 订单状态导航 -->
      <view class="order-nav">
        <view
          v-for="(item, index) in orderNavItems"
          :key="index"
          class="order-item"
          @click="navigateToPage(item.path)"
        >
          <view :class="['icon', item.icon]"></view>
          <view class="label">{{ item.label }}</view>
          <view v-if="item.count" class="badge">{{ item.count }}</view>
        </view>
      </view>
    </view>

    <tool />
  </view>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import Tool from '@/pages/user/tool/tool.vue'
import { useUserStore } from '@/store'
import { navigateToLogin, navigateToPage } from '@/utils/filters'
import { config } from '@/types/config'

// 用户状态管理
const userStore = useUserStore()
const isLogined = computed(() => userStore.isLogined)

// 用户资产数据
interface UserAssets {
  balance: number
  coupons: number
  tracks: number
}

const userAssets = ref<UserAssets>({
  balance: 0,
  coupons: 0,
  tracks: 0,
})

// 订单导航配置
const orderNavItems = [
  {
    label: '待付款',
    icon: 'i-carbon-time',
    path: '/pages/order/list?status=1',
    count: 0,
  },
  {
    label: '待收货',
    icon: 'i-carbon-delivery',
    path: '/pages/order/list?status=2',
    count: 0,
  },
  {
    label: '待评价',
    icon: 'i-carbon-star',
    path: '/pages/order/list?status=3',
    count: 0,
  },
  {
    label: '售后',
    icon: 'i-carbon-help',
    path: '/pages/order/afterSale/list',
    count: 0,
  },
  {
    label: '全部订单',
    icon: 'i-carbon-list',
    path: '/pages/order/list',
    count: 0,
  },
]

// 头像点击处理
const handleAvatarClick = () => {
  if (!isLogined.value) {
    navigateToLogin('')
  }
}

// 在组件挂载时获取用户资产信息
onMounted(async () => {
  if (isLogined.value) {
    // TODO: 调用接口获取用户资产信息
    // const assets = await getUserAssets()
    // userAssets.value = assets
  }
})
</script>

<style scoped lang="scss">
.user-center {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.header {
  position: relative;
  padding: var(--status-bar-height) 0 120rpx;
  color: #ffffff;
  background-image: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  border-bottom-right-radius: 40rpx;
  border-bottom-left-radius: 40rpx;

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40rpx;
    content: '';
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1));
  }

  .header-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 40rpx 40rpx 0;
  }

  .avatar {
    position: relative;
    border: 6rpx solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transition: transform 0.3s ease;

    &:active {
      transform: scale(0.95);
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    margin-left: 32rpx;

    .username {
      font-size: 40rpx;
      font-weight: 600;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    }

    .user-id {
      font-size: 24rpx;
      opacity: 0.8;
    }

    .login-btn {
      padding: 4rpx 0;
      font-size: 36rpx;
      font-weight: 500;
      opacity: 0.95;

      &:active {
        opacity: 0.7;
      }
    }
  }
}

.asset-card {
  position: relative;
  padding: 32rpx 24rpx;
  margin: -60rpx 32rpx 32rpx;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);

  .asset-item {
    position: relative;
    padding: 20rpx;
    text-align: center;

    &::after {
      position: absolute;
      top: 20%;
      right: 0;
      bottom: 20%;
      width: 1px;
      content: '';
      background: #f0f0f0;
    }

    &:last-child::after {
      display: none;
    }

    .label {
      font-size: 28rpx;
      color: #666;
    }

    .value {
      margin-top: 12rpx;
      font-size: 36rpx;
      font-weight: 600;
      color: #ff6b6b;

      &.highlight {
        color: transparent;
        background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
        -webkit-background-clip: text;
      }
    }
  }
}

.order-nav {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16rpx;
  padding: 32rpx 0 16rpx;
  margin-top: 24rpx;
  border-top: 1px solid #f5f5f5;

  .order-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease;

    &:active {
      transform: scale(0.95);
    }

    .icon {
      margin-bottom: 12rpx;
      font-size: 52rpx;
      color: #ff6b6b;
      transition: color 0.2s ease;
    }

    .label {
      font-size: 26rpx;
      color: #333;
    }

    .badge {
      position: absolute;
      top: -6rpx;
      right: 20%;
      min-width: 32rpx;
      height: 32rpx;
      padding: 0 8rpx;
      font-size: 20rpx;
      line-height: 32rpx;
      color: #fff;
      text-align: center;
      background: #ff4444;
      border-radius: 16rpx;
      box-shadow: 0 2rpx 8rpx rgba(255, 68, 68, 0.3);
      transform: translateX(50%);
    }
  }
}
</style>
