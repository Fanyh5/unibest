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
    <view class="points-summary">
      <view class="summary-item">
        <text class="label">累计获得：</text>
        <text class="value">{{ totalPoints }}</text>
      </view>
      <view class="summary-item">
        <text class="label">剩余积分：</text>
        <text class="value">{{ remainPoints }}</text>
      </view>
    </view>

    <!-- 积分列表 -->
    <view class="points-list">
      <view v-for="(item, index) in pointsList" :key="index" class="list-item">
        <wd-row>
          <wd-col :span="20">
            <view class="item-desc">
              <text>{{ item.desc }}</text>
            </view>
            <view class="item-time">
              <text>{{ item.time }}</text>
            </view>
          </wd-col>
          <wd-col :span="4">
            <view class="item-points">
              <text>{{ item.points }}</text>
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
  height: 280rpx;
  margin: 24rpx 24rpx 0;
  color: #ffffff;
  background: linear-gradient(135deg, #ff6b35ff 0%, #ff9f28ff 100%);
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(255, 107, 53, 0.2);

  > image:first-child {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 263rpx;
    height: 250rpx;
    opacity: 0.8;
    transform: rotateY(180deg);
  }

  .position-point {
    position: absolute;
    top: 0;
    right: 0;

    .apply-point {
      width: 160rpx;
      height: 56rpx;
      margin-top: 24rpx;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 56rpx;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
      border-radius: 28rpx 0 0 28rpx;
      transition: all 0.3s ease;

      &:active {
        background: rgba(255, 255, 255, 0.35);
      }
    }
  }

  .point-img {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 32rpx;
    transition: transform 0.3s ease;

    &:active {
      transform: scale(1.05);
    }
  }
}

.points-summary {
  display: flex;
  padding: 32rpx 24rpx;
  background: #ffffff;
  border-radius: 0 0 24rpx 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .summary-item {
    flex: 1;
    text-align: center;

    .label {
      font-size: 28rpx;
      color: #666666;
    }

    .value {
      font-size: 36rpx;
      font-weight: 600;
      color: #ff6b35;
    }
  }
}

.points-list {
  margin-top: 24rpx;
  background: #ffffff;

  .list-item {
    position: relative;
    padding: 24rpx;
    transition: background-color 0.3s ease;

    &:active {
      background-color: #f8f8f8;
    }

    &:after {
      position: absolute;
      right: 24rpx;
      bottom: 0;
      left: 24rpx;
      height: 1px;
      content: '';
      background: #eeeeee;
      transform: scaleY(0.5);
    }

    .item-desc {
      margin-bottom: 8rpx;
      font-size: 28rpx;
      color: #333333;
    }

    .item-time {
      font-size: 24rpx;
      color: #999999;
    }

    .item-points {
      font-size: 32rpx;
      font-weight: 600;
      color: #ff6b35;
      text-align: right;
    }
  }
}
</style>
