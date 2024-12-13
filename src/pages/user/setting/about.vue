<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('aboutUs')" :placeholder="true" :autoBack="true"></up-navbar>
    <view class="edition-intro pt-12">
      <image :src="imageSrc($inits.logo)" class="logo" />
      <h1>{{ $inits.name }}</h1>
      <view class="version">
        <!-- #ifdef APP-PLUS -->
        Version {{ localVersion.version }}
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        小程序版本: {{ localVersion.version }} {{ localVersion.envVersion }}
        <!--  #endif -->
      </view>

      <up-cell-group class="cell" border>
        <!--  #ifdef APP-PLUS -->
        <up-cell v-if="IosWhether" @click="checkStar" title="去评分"></up-cell>
        <up-cell title="功能介绍" isLink url="/pages/mine/set/versionFunctionList"></up-cell>
        <up-cell title="检查更新" @click="checkUpdate"></up-cell>
        <!--  #endif -->
        <up-cell
          title="证照信息"
          isLink
          url="/pages/mine/help/tips?type=LICENSE_INFORMATION"
        ></up-cell>
        <up-cell title="服务协议" isLink url="/pages/mine/help/tips?type=USER_AGREEMENT"></up-cell>
        <up-cell title="隐私协议" isLink url="/pages/mine/help/tips?type=PRIVACY_POLICY"></up-cell>
        <up-cell title="关于我们" is-link url="/pages/mine/help/tips?type=ABOUT"></up-cell>
      </up-cell-group>

      <view class="intro text-center">
        <view>
          {{ config.customerServiceMobile ? `客服热线：${config.customerServiceMobile}` : `` }}
        </view>
        <view style="margin: 20rpx 0 0 0">
          {{ config.customerServiceEmail ? `客服邮箱：${config.customerServiceEmail}` : `` }}
        </view>

        <view class="set-footer text-center flex flex-col">
          <view class="agreement-box flex justify-center mb-4">
            <view class="flex text-center justify-center mb-2">
              <view class="tcp-text">《{{ config.name }}用户协议》</view>
              <view class="agreement-text">与</view>
              <view class="tcp-text">《隐私协议》</view>
            </view>
          </view>
          <view class="copyright-text mb-2">******版权所有</view>
          <view class="copyright-text">Copyright© 2018-2022</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import { imageSrc } from '@/utils'
import { useInitsStore } from '@/store'
import { config } from '@/types/config'
const { safeAreaInsets } = uni.getSystemInfoSync()

const $inits = useInitsStore()
const IosWhether = ref(false) // 是否是ios
const editionHistory = ref([]) // 版本历史
const versionData = ref<any>({}) // 版本信息
const localVersion = ref<any>({}) // 当前版本信息
const params = ref({
  pageNumber: 1,
  pageSize: 5,
  type: 0,
})

onLoad(() => {
  // #ifdef APP-PLUS
  const platform = uni.getSystemInfoSync().platform
  /**
   * 获取是否是安卓
   */
  if (platform === 'android') {
    params.value.type = 0
  } else {
    IosWhether.value = true
    params.value.type = 1
  }
  getVersion(platform)

  plus.runtime.getProperty(plus.runtime.appid, (inf) => {
    localVersion.value = {
      versionCode: inf.version.replace(/\./g, ''),
      version: inf.version,
    }
  })
  // #endif

  // #ifdef MP-WEIXIN
  const accountInfo = wx.getAccountInfoSync()
  // version_number.value = accountInfo.miniProgram.version // 小程序 版本号
  localVersion.value = {
    versionCode: accountInfo.miniProgram.version.replace(/\./g, ''),
    version: accountInfo.miniProgram.version, // 小程序 版本号,
    envVersion: accountInfo.miniProgram.envVersion, // 判断小程序是开发版本还是release版本
  }
  // #endif
})

async function getVersion(platform) {
  let type
  platform === 'android' ? (type = 'ANDROID') : (type = 'IOS')
  console.log(type)
  // let res = await getAppVersion(type);
  // if (res.data.success) {
  //   versionData.value = res.data.result;
  // }
}

/**
 * ios点击评分
 */
function checkStar(appInf: PlusRuntimeApplicationInf, errorCB: (result: any) => void) {
  plus.runtime.launchApplication(
    {
      // action: `itms-apps://itunes.apple.com/app/${config.iosAppId}?action=write-review`,
    },
    errorCB,
  )
}

/**
 * 检查更新
 */
function checkUpdate() {
  if (versionData.value.version.replace(/\./g, '') < localVersion.value.versionCode) {
    // APPUpdate();
  } else {
    uni.showToast({
      title: '当前版本已是最新版',
      duration: 2000,
      icon: 'none',
    })
  }
}
</script>

<style lang="scss" scoped>
page {
  background: #fff !important;
}
.cell {
  width: 90%;
  margin: 0 auto;
}
.edition-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;

  > h1 {
    margin: 20rpx 0 20rpx 0;
    letter-spacing: 2rpx;
  }
  > .version {
    margin-bottom: 100rpx;
    font-size: 30rpx;
  }
}
.intro {
  margin-top: 100rpx;
  font-size: 24rpx;
  letter-spacing: 2rpx;
}
.logo {
  width: 200rpx;
  height: 200rpx;
}
.set-footer {
  .copyright-text {
    font-size: 22rpx;
    font-weight: 500;
    line-height: 30rpx;
    color: #cccccc;
  }

  .agreement-box {
    margin: 20rpx auto 0;
    .tcp-text {
      color: #ff6000;
    }

    .agreement-text {
      font-size: 26rpx;
      font-weight: 500;
      color: #999999;
    }
  }
}
</style>
