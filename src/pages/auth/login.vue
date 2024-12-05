<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
}
</route>
<template>
  <view class="overflow-hidden pt-2 px-4" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <div v-if="!wechatLogin">
      <!--   滑动验证码   -->
      <html5Login></html5Login>
    </div>
    <view v-else></view>
  </view>
</template>

<script setup lang="ts">
import html5Login from '@/pages/auth/method/html5Login.vue'

const { safeAreaInsets } = uni.getSystemInfoSync()

// 微信登录标志
const wechatLogin = ref(false)

onMounted(() => {
  // #ifndef APP-PLUS
  // 判断是否微信浏览器
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match('/MicroMessenger/i') === 'micromessenger') {
    wechatLogin.value = true
  }
  // #endif
})
</script>

<style>
page {
  background: #fff;
}
</style>
<style lang="scss" scoped></style>
