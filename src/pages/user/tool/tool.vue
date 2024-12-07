<template>
  <view style="">
    <!-- 常用工具 -->
    <view class="interact-tools" style="margin-bottom: 15px">
      <div class="paddingBox">
        <view
          class="grid grid-cols-4 text-center bg-[#fff]"
          style="margin: 0 20rpx; border-radius: 20rpx"
        >
          <view
            v-for="(item, index) in toolList"
            :key="index"
            class="interact-item"
            @click="item.url && navigateTo(item.url)"
          >
            <image :src="item.icon"></image>
            <view>{{ item.title }}</view>
          </view>
        </view>
      </div>
    </view>
  </view>
</template>

<script lang="ts" setup>
const toolList = [
  {
    title: '我的评价',
    icon: '/static/mine/feedback.png',
    url: '/pages/order/evaluate/myEvaluate',
  },
  {
    title: '我的关注',
    icon: '/static/mine/myfavorite.png',
    url: '/pages/mine/myCollect',
  },
  {
    title: '我的积分',
    icon: '/static/mine/mypoint.png',
    url: '/pages/user/tool/point',
  },
  {
    title: '我的分销',
    icon: '/static/mine/distribution.png',
    url: '',
  },
  {
    title: '我的投诉',
    icon: '/static/mine/shensu.png',
    url: '/pages/order/complain/complainList',
  },
  {
    title: '优惠券',
    icon: '/static/mine/mycoupon.png',
    url: '/pages/user/coupon/coupon',
  },
  {
    title: '每日签到',
    icon: '/static/mine/sign.png',
    url: '/pages/user/tool/signIn',
  },
  {
    title: '领券中心',
    icon: '/static/mine/couponcenter.png',
    url: '/pages/cart/coupon/couponCenter',
  },
  {
    title: '意见反馈',
    icon: '/static/mine/feedback.png',
    url: '/pages/mine/set/feedBack',
  },
  {
    title: '关于',
    icon: '/static/mine/pointgift.png',
    url: '/pages/user/setting/about',
  },
  {
    title: '设置',
    icon: '/static/mine/setting.png',
    url: '/pages/user/tool/setting',
  },
]

function navigateTo(url: string) {
  uni.navigateTo({
    url,
  })
}
</script>

<style lang="scss" scoped>
.interact-tools {
  border-right: none;
  border-left: none;

  .interactBox {
    height: 156rpx;
  }
}

image {
  width: 52rpx;
  height: 52rpx;
  margin-bottom: 6rpx;
}
.interact-item {
  padding: 25rpx 10rpx;
}
</style>
