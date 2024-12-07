<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <UNavbar :is-back="false" :is-fixed="true">
      <view class="px-2" style="width: 100%">
        <up-search
          v-model="keyword"
          :show-action="false"
          :placeholder="t('searchPlaceholder')"
        ></up-search>
      </view>
      <!-- #ifndef H5 -->
      <template v-slot:right>
        <div class="navbar-right" @click="scan">
          <up-icon name="scan" size="28"></up-icon>
        </div>
      </template>
      <!-- #endif -->
    </UNavbar>
    <view class="px-2">
      <view class="text-center">
        当前平台是：
        <text class="text-green-500">{{ PLATFORM.platform }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'
import PLATFORM from '@/utils/platform'
import { config } from '@/types/config'
import { gotoAppPermissionSetting, judgeIosPermission, PermissionType } from '@/utils/permission'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const keyword = ref<string>('')
const isIos = ref<boolean>()

// 提示获取权限
function tipsGetSettings() {
  uni.showModal({
    title: '提示',
    content: '您已经关闭相机权限,去设置',
    success: function (res) {
      if (res.confirm) {
        if (isIos.value) {
          plus.runtime.openURL('app-settings:')
        } else {
          gotoAppPermissionSetting()
        }
      }
    },
  })
}

// 唤醒客户端扫码
async function scan() {
  // #ifdef APP-PLUS
  isIos.value = plus.os.name === 'iOS'
  // 判断是否是Ios
  if (isIos.value) {
    const iosFirstCamera = uni.getStorageSync('iosFirstCamera') // 是不是第一次开启相机
    if (iosFirstCamera !== 'false') {
      uni.setStorageSync('iosFirstCamera', 'false') // 设为false就代表不是第一次开启相机
      scanCode()
    } else {
      if (judgeIosPermission(PermissionType.Camera)) {
        scanCode()
      } else {
        // 没有权限提醒是否去申请权限
        tipsGetSettings()
      }
    }
  } else {
    scanCode()
  }
  // #endif

  // #ifdef MP-WEIXIN
  scanCode()
  // #endif
}

// TODO 扫码功能后续还会后续增加
// 应该实现的功能目前计划有：
// 扫描商品跳转商品页面
// 扫描活动跳转活动页面
// 扫描二维码登录
// 扫描其他站信息 弹出提示，返回首页。
function scanCode() {
  uni.scanCode({
    success: function (res) {
      const path = encodeURIComponent(res.result)

      if (path !== undefined && path.indexOf('QR_CODE_LOGIN_SESSION') === 0) {
        console.log(path)
        // app扫码登录
        uni.navigateTo({
          url: '/pages/passport/scannerCodeLoginConfirm?token=' + path,
        })
        return
      }

      // WX_CODE 为小程序码
      if (res.scanType === 'WX_CODE') {
        console.log(res)
        uni.navigateTo({
          url: `/${res.path}`,
        })
      } else {
        config.scanAuthNavigation.forEach((src) => {
          if (res.result.indexOf(src) !== -1) {
            uni.navigateTo({
              url: `/${res.result.substring(src.length)}`,
            })
          } else {
            setTimeout(() => {
              uni.navigateTo({
                url: '/pages/tabbar/home/web-view?src=' + path,
              })
            }, 100)
          }
        })
      }
    },
  })
}
</script>

<style></style>
