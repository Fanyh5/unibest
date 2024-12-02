<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <navbar :placeholder="true" :title="t('setting')"></navbar>
    <u-cell-group>
      <u-cell
        :isLink="true"
        url="/pages/users/set/set-user"
        center
        :titleStyle="{ width: '350px' }"
        :style="{ backgroundColor: '#f2f3f5' }"
      >
        <template #title>
          <view class="flex space-x-4 py-2">
            <u-avatar
              :size="90"
              shape="circle"
              src="https://pic2.zhimg.com/v2-1a79b84f5d33098805484ba1ec56456d_1440w.jpg"
            ></u-avatar>
            <view class="self-center text-xl basis-1/2">微信用户</view>
          </view>
        </template>
      </u-cell>
      <u-cell title="意见反馈" center :isLink="true" url="/pages/index/index" />
      <u-cell title="关于我们" center :isLink="true" url="/pages/index/index" />
    </u-cell-group>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

function handleClickLeft() {
  uni.navigateBack()
}
</script>
