<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="flex justify-center align-center error">
    <view class="error-img">
      <view class="i-carbon-warning text-9xl text-gray-400"></view>
    </view>
    <text class="title">页面迷路了</text>
    <view class="info-box">
      <text class="info">1. 请确认访问地址是否有误</text>
      <text class="info">2. 请检查网络环境是否通畅</text>
      <text class="info">3. 关闭广告屏蔽插件后重试</text>
    </view>
    <button class="back-btn" @click="uni.switchTab({ url: '/' })">返回首页</button>
  </view>
</template>

<style lang="scss" scoped>
.error {
  flex-direction: column;
  height: 100vh;
  padding-top: var(--status-bar-height);
  background-color: #f8f9fa;

  .error-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400rpx;
    height: 400rpx;
    margin-bottom: 40rpx;
  }

  .title {
    margin-bottom: 60rpx;
    font-size: 56rpx;
    font-weight: 600;
    color: #2c3e50;
  }

  .info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;
  }

  .info {
    margin-bottom: 20rpx;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 1.8;
    color: #606c7c;
  }

  .back-btn {
    width: 320rpx;
    height: 88rpx;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 88rpx;
    color: #fff;
    text-align: center;
    background: #2979ff;
    border-radius: 44rpx;
    box-shadow: 0 8rpx 16rpx rgba(41, 121, 255, 0.2);

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
