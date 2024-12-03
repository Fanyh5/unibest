<template>
  <view class="m-2" :style="{ opacity: disabled ? '0.5' : '1' }">
    <view class="content">
      <view
        class="tag text-center"
        :class="
          data.status === 'expired' || data.status === 'used'
            ? 'disabled-bg-color'
            : 'info-bg-color'
        "
      >
        {{ data.type_text }}
      </view>
      <view class="title mx-4 pt-2">
        <view class="grid grid-cols-2 gap-2">
          <view
            class="value-text"
            :class="
              data.status === 'expired' || data.status === 'used' ? 'disabled-color' : 'info-color'
            "
          >
            <span class="inline-block align-bottom">{{ data.name }}</span>
          </view>
          <view class="text-right">
            <view
              class="inline-block align-middle"
              :class="
                data.status !== 'expired' && data.status !== 'used'
                  ? 'price-text'
                  : 'disabled-color'
              "
            >
              <text class="value-reduce" v-if="data.type === 'reduce'">￥</text>
              <text class="value-price">{{ data.amount }}</text>
              <text class="value-discount ss-m-b-10 ss-m-l-4" v-if="data.type === 'discount'">
                折
              </text>
            </view>
          </view>
        </view>
        <view class="flex flex-row mt-2">
          <view
            class="sellby-text basis-3/4"
            :class="
              data.status === 'expired' || data.status === 'used'
                ? 'disabled-color'
                : 'subtitle-color'
            "
          >
            {{
              type === 'user'
                ? '有效期：' + data.use_start_time.substring(0, 11)
                : '领取时间：' + data.get_start_time.substring(0, 11)
            }}至
            {{
              type === 'user'
                ? data.use_end_time.substring(0, 11)
                : data.get_end_time.substring(0, 11)
            }}
          </view>
          <view
            class="value-enough basis-1/4 text-right"
            :class="
              data.status === 'expired' || data.status === 'used'
                ? 'disabled-color'
                : 'subtitle-color'
            "
          >
            满{{ data.enough }}可用
          </view>
        </view>
      </view>
    </view>

    <view class="desc flex flex-row flex-content-between">
      <view class="basis-1/2">
        <view class="desc-title inline-block align-middle">
          {{ data.description }}
        </view>
        <view>
          <slot name="reason"></slot>
        </view>
      </view>
      <view class="basis-1/2 text-right">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
  stateMap: {
    0: '立即领取',
    1: '去使用',
  },
})
// 接受参数
const props = defineProps({
  data: {
    type: Object,
    default: {}[{}],
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

<style lang="scss" scoped>
.info-bg-color {
  background: linear-gradient(90deg, #ff6000, rgba(255, 96, 0, 0.6));
}
.disabled-bg-color {
  background: #999;
}
.info-color {
  color: #333;
}
.subtitle-color {
  color: #666;
}
.disabled-color {
  color: #999;
}
.content {
  width: 100%;
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.04);
  -webkit-mask: radial-gradient(circle at 12rpx 100%, #0000 12rpx, red 0) -12rpx;

  .tag {
    width: 100rpx;
    height: 40rpx;
    font-size: 24rpx;

    color: #fff;
    border-radius: 20rpx 0 20rpx 0;
  }
  .title {
    padding-bottom: 22rpx;
    border-bottom: 2rpx dashed #d3d3d3;
    .value-text {
      font-size: 32rpx;
      font-weight: 600;
    }
    .sellby-text {
      font-size: 24rpx;
      font-weight: 400;
    }
    .value-price {
      font-family: OPPOSANS;
      font-size: 64rpx;
      font-weight: 500;
      line-height: normal;
    }
    .value-reduce {
      font-size: 32rpx;
      line-height: normal;
    }
    .value-discount {
      font-size: 28rpx;
      line-height: normal;
    }
    .value-enough {
      font-family: OPPOSANS;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
}
.desc {
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 30rpx;
  background: #fff;
  border-radius: 0 0 20rpx 20rpx;
  box-shadow: rgba(#000, 0.1);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.04);
  -webkit-mask: radial-gradient(circle at 12rpx 0%, #0000 12rpx, red 0) -12rpx;
  .desc-title {
    font-size: 24rpx;
    font-weight: 400;
    color: #999;
  }
}
.price-text {
  color: #ff0000;
}
</style>
