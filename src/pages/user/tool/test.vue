<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="content overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('mission')" :placeholder="true" :autoBack="true"></up-navbar>
    <view>
      <view
        class="flex box-border mb-3"
        :style="{
          position: 'static',
          flex1: 'auto',
          width: '100%',
          height: '200px',
          padding: '0px 10px 10px 10px',
          margin: '-15px 0px 12px 0px',
          color: '#333333',
          background: '#ffc000ff',
          borderRadius: '0px',
          borderColor: '#ffffff',
          borderWidth: '0px',
          borderStyle: 'solid',
        }"
      >
        <view
          class="flex box-border"
          :style="{
            url: '',
            position: 'static',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex1: 'auto',
            width: '100%',
            height: '100%',
            padding: '10px',
            margin: '30px 0px 10px 0px',
            color: '#333333',
            background: '#ffffff00',
            borderRadius: '0px',
            borderColor: '#ffffff',
            borderWidth: '0px',
            borderStyle: 'solid',
            top: '',
            bottom: '',
            left: '',
            right: '',
          }"
        >
          <view class="flex box-border">
            <up-text
              class=""
              style=""
              color="#FEFEFEFF"
              size="15px"
              text="我的积分"
              align="left"
              wordWrap="normal"
              :show="true"
              iconStyle="15px"
              decoration="none"
            ></up-text>
            <up-icon
              class=""
              style=""
              name="arrow-right"
              color="#FFFFFFFF"
              size="16px"
              labelPos="right"
              labelSize="15px"
              labelColor="#606266"
              space="3px"
              imgMode="aspectFill"
              width="100%"
              height="100%"
              :top="'0'"
            ></up-icon>
          </view>
          <up-text
            class=""
            style=""
            color="#FFFFFFFF"
            size="55px"
            text="1000"
            align="left"
            wordWrap="normal"
            :show="true"
            :bold="true"
            iconStyle="15px"
            decoration="none"
          ></up-text>
        </view>
        <view
          class="flex box-border"
          :style="{
            url: '',
            position: 'static',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flex1: 'auto',
            width: '100%',
            height: '100%',
            padding: '0',
            margin: '0px 0px 15px 0px',
            color: '#333333',
            background: '#ffffff00',
            borderRadius: '0px',
            borderColor: '#ffffff',
            borderWidth: '0px',
            borderStyle: 'solid',
            top: '',
            bottom: '',
            left: '',
            right: '',
          }"
        >
          <up-image
            class="flex flex-row"
            style=""
            src="https://s3.bmp.ovh/imgs/2024/11/26/477b9c9726671fe4.png"
            mode="aspectFill"
            width="100px"
            height="100px"
            shape="circle"
            radius="0px"
            :lazyLoad="true"
            duration="500"
            bgColor="#f3f4f600"
            :showMenuByLongpress="true"
          ></up-image>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { t } from '@/locale'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss" scoped></style>
