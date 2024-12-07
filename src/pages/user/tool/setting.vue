<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <UNavbar :title="t('setting')"></UNavbar>
    <view>
      <up-cell-group>
        <up-cell
          :isLink="true"
          url="/pages/users/set/setUser"
          center
          :titleStyle="{ width: '350px' }"
          :style="{ backgroundColor: '#f2f3f5' }"
        >
          <template #title>
            <view class="flex space-x-4 py-2">
              <u-avatar
                :size="90"
                :src="userStore.userInfo?.avatar || config.defaultUserPhoto"
              ></u-avatar>
              <view class="self-center text-xl basis-1/2">
                <view class="flex flex-col justify-center">
                  <text class="text-xl font-medium mb-1">
                    {{ userStore?.userInfo?.userName || '暂未登录' }}
                  </text>
                  <text class="text-sm text-gray-500" v-if="userStore.isLogined">
                    ID: {{ userStore?.userInfo?.id || '-' }}
                  </text>
                  <text class="text-sm text-gray-500" v-if="userStore.isLogined">
                    手机号: {{ userStore?.userInfo?.phone || '-' }}
                  </text>
                </view>
              </view>
            </view>
          </template>
        </up-cell>
        <!-- #ifndef MP-WEIXIN -->
        <up-cell
          title="安全中心"
          v-if="userStore.isLogined"
          center
          isLink
          @click="navigateToPage('/pages/user/setting/security')"
        ></up-cell>
        <!-- #endif -->
        <up-cell title="用户注销" v-if="userStore.isLogined" center is-link @click="logoff" />
        <up-cell title="切换语言" isLink @click="navigateToPage('/pages/user/setting/i18n')" />
        <up-cell title="意见反馈" isLink @click="navigateToPage('/pages/user/setting/feedback')" />
        <!-- #ifdef APP-PLUS -->
        <up-cell :title="`清除缓存(${fileSizeString})`" center @click="clearCache"></up-cell>
        <!-- #endif -->
        <up-cell title="关于我们" isLink @click="navigateToPage('/pages/user/setting/about')" />
      </up-cell-group>
      <view class="absolute inset-x-0 bottom-0 h-16 px-4">
        <up-button
          text="退出登录"
          size="normal"
          type="warning"
          v-if="userStore.isLogined"
          @click="quiteLoginOut"
        ></up-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'
import { useUserStore } from '@/store'
import { config } from '@/types/config'
import { navigateToLogin, navigateToPage, quiteLoginOut } from '@/utils/filters'
const userStore: any = useUserStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const userInfo = ref<Record<string, any>>(userStore.userInfo || {})

// 缓存大小
const fileSizeString = ref<string>('0B')

onShow(() => {
  // #ifdef APP-PLUS
  getCacheSize()
  // #endif

  // 更新用户信息
  if (userStore.isLogined) {
    userInfo.value = userStore.userInfo || {}
  }
})

// 检查用户登录状态并跳转
function checkUserInfo(): void {
  if (userStore.isLogined) {
    uni.navigateTo({ url: '/pages/users/set/setUser' })
    return
  }
  uni.showToast({ title: '请先登录', icon: 'none' })
}

// 获取缓存大小
function getCacheSize(): void {
  // #ifdef APP-PLUS
  ;(plus as any).cache.calculate((size: number) => {
    const sizeCache = parseInt(size.toString())
    const units = ['B', 'KB', 'MB', 'GB']
    const sizes = [1, 1024, 1048576, 1073741824]

    const index = sizes.findIndex((s, i) => sizeCache < sizes[i + 1] || i === sizes.length - 1)
    fileSizeString.value =
      index === 0
        ? `${sizeCache}${units[index]}`
        : `${(sizeCache / sizes[index]).toFixed(2)}${units[index]}`
  })
  // #endif
}

// 清除缓存
function clearCache(): void {
  // #ifdef APP-PLUS
  plus.os.name === 'Android' ? clearAndroidCache() : clearIOSCache()
  // #endif
}

// 清除Android缓存
function clearAndroidCache(): void {
  const main = plus.android.runtimeMainActivity()
  const sdRoot = (main as any).getCacheDir()
  const files = plus.android.invoke(sdRoot, 'listFiles')

  files.forEach((file: any) => {
    plus.io.resolveLocalFileSystemURL(
      `${file}`,
      (entry: PlusIoDirectoryEntry | PlusIoFileEntry) => {
        if (entry.isDirectory) {
          ;(entry as PlusIoDirectoryEntry).removeRecursively(showClearSuccess, () => {})
        } else {
          ;(entry as PlusIoFileEntry).remove()
        }
      },
      () => {
        uni.showToast({
          title: '文件路径读取失败',
          duration: 2000,
          icon: 'none',
        })
      },
    )
  })
}

// 清除iOS缓存
function clearIOSCache(): void {
  ;(plus as any).cache.clear(showClearSuccess)
}

// 显示清理成功提示
function showClearSuccess(): void {
  uni.showToast({
    title: '缓存清理完成',
    duration: 2000,
    icon: 'none',
  })
  getCacheSize()
}

/**
 * 用户注销
 */
function logoff() {
  uni.showModal({
    title: '提示',
    content:
      '确认注销用户么？注销用户将无法再次登录并失去当前数据就。根据法规数据最长保留6个月，期间可以联系客服人员进行恢复数据。',
    async success(res) {
      if (res.confirm) {
        navigateToLogin('/', 'redirectTo')
      }
    },
  })
}
</script>

<style lang="scss" scoped>
.set-footer {
  margin: 200rpx 0;

  .copyright-text {
    font-size: 22rpx;
    font-weight: 500;
    line-height: 30rpx;
    color: #cccccc;
  }

  .agreement-box {
    margin: 80rpx auto 0;

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
