<template>
  <view class="container">
    <UNavbar :is-back="false" :title="t('wechatH5Login')"></UNavbar>
    <view class="wx-auth-container">
      <div class="box">
        <view class="logo-info">
          <text class="title">欢迎进入{{ projectName }}</text>
        </view>
        <view class="small-tips">
          <view>为您提供优质服务,{{ projectName }}需要获取以下信息</view>
          <view>您的公开信息（昵称、头像）</view>
        </view>
        <view class="btns">
          <button class="btn-auth">使用微信授权</button>
          <div class="btn-callback">暂不登录</div>
        </view>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'

const projectName = ref<string>('')
</script>

<style lang="scss" scoped>
.wx-auth-container {
  width: 100%;
  margin-top: 20%;
}

.logo-info {
  display: flex;
  flex-direction: row;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20rpx;
  font-weight: bold;
}

image {
  width: 100px;
  height: 100px;
  text-align: center;
  -webkit-transform: scale(2.5);
  transform: scale(2.5);
}

text.title,
text.shop {
  display: inline-block;
  font-size: 60rpx;
  color: #333;
}

.box {
  margin: 0 32rpx;
}
/* 文字提示*/
.small-tips {
  width: 94%;
  padding: 20rpx;
  margin: 0 0 20rpx;
  font-size: 24rpx;
  color: #999;
}

.btn-callback {
  width: 92%;
  height: 90rpx;
  margin: 0 auto;
  font-size: 30rpx;
  line-height: 90rpx;
  text-align: center;
  background: #ededed;
  border-radius: 100px;
}

.btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 100rpx;
}

@keyframes mymove {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
}
</style>
