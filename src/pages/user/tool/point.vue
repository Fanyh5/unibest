<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="content overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('points')" :placeholder="true" :autoBack="true"></up-navbar>
    <!-- 积分头部卡片 -->
    <view class="portrait-box">
      <image src="/static/mine/point/point_bg_1.png"></image>
      <image class="point-img" src="/static/mine/point/tradehall.png" />
      <view class="position-point">
        <view class="apply-point" @click="handleApplyPoint">申请积分</view>
      </view>
    </view>

    <!-- 积分统计 -->
    <view class="flex py-4">
      <view class="flex-1 text-center text-lg">
        <text>累计获得：</text>
        <text class="text-[#ff6b35ff]">{{ totalPoints }}</text>
      </view>
      <view class="flex-1 text-center text-lg">
        <text>剩余积分：</text>
        <text class="text-[#ff6b35ff]">{{ remainPoints }}</text>
      </view>
    </view>

    <!-- 积分列表 -->
    <view class="container">
      <view v-for="(item, index) in pointsList" :key="index" class="list-item">
        <wd-row>
          <wd-col :span="20">
            <view class="text-[#666666] text-base">
              <text>{{ item.desc }}</text>
            </view>
            <view class="text-[#999]">
              <text>{{ item.time }}</text>
            </view>
          </wd-col>
          <wd-col :span="4">
            <view class="text-right text-lg">
              <text class="text-[#ff6b35ff]">{{ item.points }}</text>
            </view>
          </wd-col>
        </wd-row>
      </view>
      <wd-loadmore :state="loadState" @reload="loadMore" />
    </view>
  </view>
</template>
<script setup lang="ts">
import { t } from '@/locale/index'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 积分数据
const totalPoints = ref<number>(0)
const remainPoints = ref<number>(0)
const pointsList = ref<any[]>([])
const loadState = ref<string>('loading')
const pageSize = 15
const maxItems = 60

// 返回上一页
function handleClickLeft() {
  uni.navigateBack()
}

// 申请积分
function handleApplyPoint() {
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
}

// 加载更多
function loadMore() {
  setTimeout(() => {
    const newItems = Array(pageSize)
      .fill('')
      .map(() => ({
        desc: '会员签到第2天，赠送积分2分',
        time: '2024-02-30 15:23:56',
        points: 2,
      }))
    pointsList.value.push(...newItems)

    if (pointsList.value.length >= maxItems) {
      loadState.value = 'finished'
    }
  }, 200)
}

// 触底加载
onReachBottom(() => {
  if (pointsList.value.length < maxItems) {
    loadMore()
  }
})

// 初始化
onLoad(() => {
  loadMore()
})
</script>

<style lang="scss" scoped>
.portrait-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250rpx;
  margin: 20rpx 20rpx 0;
  color: #ffffff;
  background: #ff3c2aff linear-gradient(91deg, #ff6b35ff 1%, #ff9f28ff 99%);
  border-radius: 20rpx 20rpx 0 0;

  > image:first-child {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 263rpx;
    height: 250rpx;
    transform: rotateY(180deg);
  }

  .position-point {
    position: absolute;
    top: 0;
    right: -2rpx;

    .apply-point {
      width: 142rpx;
      height: 40rpx;
      margin-top: 30rpx;
      font-size: 18px;
      line-height: 40rpx;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      background: rgba(#ffffff, 0.2);
      border-radius: 20rpx 0 0 20rpx;
    }
  }

  .point-img {
    width: 108rpx;
    height: 108rpx;
    margin-bottom: 30rpx;
  }
}

.list-item {
  position: relative;
  padding: 10px 15px;
  color: #464646;
  background: #fff;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    content: '';
    background: #eee;
    transform: scaleY(0.5);
  }
}
</style>
