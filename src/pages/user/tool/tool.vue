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
            v-for="(item, index) in $inits.menus.commonUserMenu"
            :key="index"
            class="interact-item"
            @click="item.route && navigateTo(item.route)"
          >
            <image :src="item.data.lightIcon"></image>
            <view>{{ item.name }}</view>
          </view>
        </view>
      </div>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useInitsStore } from '@/store'

const $inits = useInitsStore()
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
