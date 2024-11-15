<template>
  <view>
    <!-- 常用工具 -->
    <view class="interact-tools" style="margin-bottom: 15px">
      <div class="paddingBox">
        <view class="interact-container">
          <view class="interact-item" @click="navigateTo('/pages/mine/address/addressManage')">
            <image src="/static/mine/myaddress.png" mode=""></image>
            <view>地址管理</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/mine/myTracks')">
            <image src="/static/mine/logistics.png" mode=""></image>
            <view>我的足迹</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/order/evaluate/myEvaluate')">
            <image src="/static/mine/feedback.png" mode=""></image>
            <view>我的评价</view>
          </view>
          <!-- <view class="interact-item" @click="linkMsgDetail()">
            <image src="/static/mine/mycommit.png" mode=""></image>
            <view>我的消息</view>
          </view> -->

          <view class="interact-item" @click="navigateTo('/pages/mine/myCollect')">
            <image src="/static/mine/myfavorite.png" mode=""></image>
            <view>我的关注</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/mine/point/myPoint')">
            <image src="/static/mine/mypoint.png" mode=""></image>
            <view>我的积分</view>
          </view>

          <view class="interact-item" @click="distribution">
            <image src="/static/mine/distribution.png" mode=""></image>
            <view>我的分销</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/order/complain/complainList')">
            <image src="/static/mine/shensu.png" mode=""></image>
            <view>我的投诉</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/cart/coupon/myCoupon')">
            <image src="/static/mine/mycoupon.png" mode=""></image>
            <view>优惠券</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/mine/signIn')">
            <image src="/static/mine/sign.png" mode=""></image>
            <view>每日签到</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/cart/coupon/couponCenter')">
            <image src="/static/mine/couponcenter.png" mode=""></image>
            <view>领券中心</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/promotion/bargain/log')">
            <image src="/static/mine/kanjia.png" mode=""></image>
            <view>砍价记录</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/mine/set/feedBack')">
            <image src="/static/mine/feedback.png" mode=""></image>
            <view>意见反馈</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/mine/set/editionIntro')">
            <image src="/static/mine/pointgift.png" mode=""></image>
            <view>关于</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/passport/entry/seller/index')">
            <image src="/static/mine/feedback.png" mode=""></image>
            <view>店铺入驻</view>
          </view>

          <view class="interact-item" @click="navigateTo('/pages/mine/set/setUp')">
            <image src="/static/mine/setting.png" mode=""></image>
            <view>设置</view>
          </view>
        </view>
      </div>
    </view>
  </view>
</template>

<script lang="ts" setup>
function navigateTo(url: string) {
  console.log(url)
}
</script>

<style lang="scss" scoped>
.interact-tools {
  border-right: none;
  border-left: none;

  .interactBox {
    height: 156rpx;
  }
  .interact-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 20rpx;
    text-align: center;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 24rpx 0 rgba($color: #f6f6f6, $alpha: 1);
    .interact-item-img {
      width: 52rpx !important;
      height: 52rpx !important;
      // margin-bottom:  !important;
      margin: 0 auto 6rpx auto !important;
    }
    image {
      width: 52rpx;
      height: 52rpx;
      margin-bottom: 6rpx;
    }

    .interact-item {
      width: 25%;
      height: 160rpx;
      padding: 30rpx;
      font-size: 18px;
    }
  }
}
</style>
