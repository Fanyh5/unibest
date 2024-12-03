<template>
  <view class="content">
    <view class="body">
      <view class="top-view">
        <view class="title">{{ coupon.data.name }}</view>
        <view class="price">
          <text>￥</text>
          {{ unitPrice(props.data.amount) }}
        </view>
        <view class="text">满{{ props.data.enough }}元可用</view>
        <view class="bg-quan">券</view>
        <view class="jiao-1" :class="{ 'used-color': coupon.used_status != 0 }">
          <text class="text-1">
            {{ props.data.type_text }}
          </text>
        </view>
      </view>
      <view class="bottom-view mt-1">
        <wd-collapse v-model="value">
          <wd-collapse-item title="优惠券说明" name="item1">
            这是一条简单的示例文字。
          </wd-collapse-item>
          <wd-divider></wd-divider>
        </wd-collapse>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { unitPrice } from '@/utils/filters'

const coupon = reactive<any>({})
const value = ref<string[]>(['item1'])

const props = defineProps({
  data: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'coupon',
  },
})
</script>

<style scoped lang="scss">
page,
.content {
  height: 100%;
}
.body {
  .top-view {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 200rpx;
    padding: 60rpx 0;
    margin: 20rpx 20rpx 0;
    overflow: hidden;
    background: linear-gradient(316deg, #ff6b35ff 2%, #ff9f28ff 98%);
    border-radius: 20rpx;
    .title {
      font-size: 30rpx;
      color: #ffee80;
    }
    .price {
      font-size: 60rpx;
      font-weight: 600;
      color: #ffffff;
      text {
        font-size: 30rpx;
      }
    }
    .text {
      font-size: 24rpx;
      color: #ffffff;
    }
    .bg-quan {
      position: absolute;
      right: -54rpx;
      bottom: -54rpx;
      width: 244rpx;
      height: 244rpx;
      font-size: 130rpx;
      color: #ffffff;
      text-align: center;
      border: 6rpx solid #ffffff;
      border-radius: 50%;
      opacity: 0.3;
    }

    .jiao-1 {
      position: absolute;
      top: 0;
      right: -130rpx;
      width: 400rpx;
      color: #ffffff;
      text-align: center;
      background-color: #ffc71c;
      transform: rotate(45deg);
      .text-1 {
        margin-left: 68rpx;
        font-size: 28rpx;
      }
    }
    .used-color {
      background-color: #ffc71c;
    }
  }
  .bottom-view {
    height: 580rpx;
    padding: 50rpx 50rpx;
    margin: 0 20rpx;
    line-height: 2em;
    color: #999;
    background-color: #ffffff;
    border-radius: 20rpx;
  }
}
</style>
