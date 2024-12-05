<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <UNavbar :borderBottom="false" :title="t('wechatMPLogin')"></UNavbar>
    <view class="wx-auth-container px-4">
      <view class="logo-info">
        <text class="title">欢迎进入{{ config.name }}</text>
      </view>
      <view class="small-tips">
        <view>为您提供优质服务,{{ config.name }}需要获取以下信息</view>
        <view>您的公开信息（昵称、头像）</view>
      </view>
      <view class="w-full mt-12">
        <up-button type="primary" size="large" :disabled="logingFlag" @click="getUserProfile()">
          登录
        </up-button>
        <div style="height: 16rpx"></div>
        <up-button block size="large" @click="navigateToPage('/')" type="info">暂不登录</up-button>
      </view>
      <!-- 隐私协议 -->
      <div class="flex mt-4 px-2">
        <checkbox-group @change="checkboxChange">
          <checkbox :checked="enablePrivacy" style="transform: scale(0.7)" />
          <text class="privacy-tips">
            登录即代表您已同意
            <text
              @click="navigateToPage('/pages/mine/help/tips?type=PRIVACY_POLICY')"
              style="color: #ff6b35"
            >
              《隐私协议》
            </text>
            <text
              @click="navigateToPage('/pages/mine/help/tips?type=USER_AGREEMENT')"
              style="color: #ff6b35"
            >
              《用户协议》
            </text>
            并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
          </text>
        </checkbox-group>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'
import { navigateToPage } from '@/utils/filters'
import { config } from '@/types/config'

const { safeAreaInsets } = uni.getSystemInfoSync()
const enablePrivacy = ref(false)
// 状态变量
const phoneAuthPopup = ref(false) // 手机号授权弹窗
const projectName = ref('lilishop') // 商城名称
const code = ref('') // 微信返回的 code
const nickName = ref('') // 微信昵称
const logingFlag = ref(false) // 登录状态标志
const image = ref('') // 微信头像

// 页面加载时获取微信小程序 code
onMounted(() => {
  // 小程序默认分享
  uni.showShareMenu({
    withShareTicket: true,
  })

  // 获取微信 code
  uni.login({
    success: (res) => {
      if (res.errMsg === 'login:ok') {
        code.value = res.code
      } else {
        uni.showToast({
          title: '系统异常，请联系管理员！',
        })
      }
    },
  })
})

// 获取用户信息
const getUserProfile = () => {
  if (!enablePrivacy.value) {
    uni.showToast({
      title: '请勾选协议',
      icon: 'none',
    })
    return
  }

  logingFlag.value = true

  if (code.value) {
    // 推荐使用 wx.getUserProfile
    uni.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        // 示例逻辑：获取用户信息
        // nickName.value = res.userInfo.nickName;
        // image.value = res.userInfo.avatarUrl;
        // 示例：请求后端登录接口（占位实现）
      },
      fail: (res) => {
        console.log('fail', res)
      },
    })

    logingFlag.value = false
  }
}

// 获取手机号授权
const getPhoneNumber = (e: any) => {
  // 示例逻辑：解析手机号授权信息
  // const iv = e.detail.iv;
  // const encryptedData = e.detail.encryptedData;
  // if (!encryptedData) {
  //   uni.showToast({
  //     title: '请授予手机号码权限，手机号码会和会员系统用户绑定！',
  //     icon: 'none',
  //   });
  //   return;
  // }
  // 示例：请求后端登录接口（占位实现）
}

// 隐私协议勾选
function checkboxChange(e: any): void {
  enablePrivacy.value = e.detail.value.length > 0
}
</script>
<style lang="scss" scoped>
/*微信授权*/
page {
  background-color: #ffffff;
}

.wx-auth-container {
  margin-top: 20%;
  .logo-info {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20rpx;
    font-weight: bold;
  }
}

text.title,
text.shop {
  display: inline-block;
  font-size: 60rpx;
  color: #333;
}

text.shop {
  display: inline-block;
  font-size: 55rpx;
  color: #333;
}
/* 文字提示*/
.small-tips {
  width: 94%;
  padding: 20rpx;
  margin: 0 0 20rpx;
  font-size: 24rpx;
  color: #999;
}

.privacy {
  width: 100%;
  margin-top: 20rpx;
  text-align: center;
}
</style>
