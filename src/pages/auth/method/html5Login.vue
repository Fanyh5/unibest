<template>
  <view>
    <view class="mt-20">
      <view class="text-left text-3xl font-medium">{{ loginTitleWay[current].title }}</view>
      <view :class="current == 1 ? 'desc-light' : 'desc'" class="mb-24">
        {{ loginTitleWay[current].desc }}
        <span v-if="current == 1">{{ mobile || 'secrecyMobile' }}</span>
      </view>
    </view>
    <!-- 手机号登录 -->
    <view v-show="!enableUserPwdBox">
      <!-- 输入手机号 -->
      <view v-show="current == 0">
        <view class="content">
          <input
            class="u-border-bottom"
            type="number"
            v-model="mobile"
            placeholder="请输入手机号 (11位)"
          />
          <view class="tips">未注册的手机号验证后自动创建账号</view>
          <button @tap="fetchCode" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
          <view class="alternative">
            <view></view>
            <view class="issue">遇到问题</view>
          </view>
        </view>
      </view>

      <!-- 输入验证码 -->
      <view v-show="current == 1">
        <view class="key-input">
          <up-message-input
            :focus="true"
            :value="code"
            @change="change"
            @finish="finish"
            mode="bottomLine"
            :maxlength="6"
          ></up-message-input>
          <text :class="{ error: codeError }">验证码错误，请重新输入</text>

          <view class="px-6">
            <up-toast ref="uToastRef"></up-toast>
            <up-code
              :seconds="seconds"
              @start="reacquire = true"
              @end="reacquire = false"
              ref="uCodeRef"
              @change="codeChange"
            ></up-code>
            <up-button :disabled="reacquire" type="primary" @tap="getCode" class="mt-4">
              {{ tips }}
            </up-button>
          </view>
        </view>
      </view>
    </view>

    <!-- 帐号密码登录 -->
    <view v-show="enableUserPwdBox">
      <view class="content">
        <input class="u-border-bottom" v-model="userLogin.username" placeholder="请输入用户名" />
        <input
          class="u-border-bottom mt-5"
          :showPassword="true"
          v-model="userLogin.password"
          placeholder="请输入密码"
        />
        <button @tap="userLoginFun" class="getCaptcha">登录</button>
        <view class="alternative">
          <view></view>
          <view class="issue">遇到问题</view>
        </view>
      </view>
    </view>

    <!-- 隐私协议 -->
    <view class="flex mt-4 px-2" v-show="current != 1">
      <checkbox-group @change="checkboxChange">
        <checkbox :checked="enablePrivacy" style="transform: scale(0.7)" />
        <text class="privacy-tips">
          登录即代表您已同意
          <text @click="navigateToPrivacy('PRIVACY_POLICY')" style="color: #ff6b35">
            《隐私协议》
          </text>
          <text @click="navigateToPrivacy('USER_AGREEMENT')" style="color: #ff6b35">
            《用户协议》
          </text>
          并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
        </text>
      </checkbox-group>
    </view>

    <!-- 切换登录方式 -->
    <view
      v-if="current != 1"
      class="user-password-tips"
      @click="enableUserPwdBox = !enableUserPwdBox"
    >
      {{ !enableUserPwdBox ? '帐号密码' : '手机号' }}登录
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { sendMobileApi, userLoginApi } from '@/service/index/auth'
import { useUserStore } from '@/store'
import { currRoute } from '@/utils'

const userStore = useUserStore()

// 状态管理
const loading = ref(false)
const mobile = ref('')
const code = ref('')
const codeError = ref(false)
const enableUserPwdBox = ref(false)
const current = ref(0)
const seconds = ref(60)
const enablePrivacy = ref(false)
const uCodeRef = ref(null)
const reacquire = ref(false)
const tips = ref('获取验证码')

// 用户登录信息
const userLogin = reactive({
  username: '',
  password: '',
})

// 登录标题配置
const loginTitleWay = reactive([
  {
    title: '欢迎登录',
    desc: '登录后更精彩，美好生活即将开始',
  },
  {
    title: '请输入验证码',
    desc: '已经发送验证码至',
  },
])

// 手机号验证
const isValidPhone = computed(() => {
  return /^1[3-9]\d{9}$/.test(mobile.value)
})

// 获取验证码按钮样式
const inputStyle = computed(() => {
  return {
    color: mobile.value ? '#fff' : '#999',
    backgroundColor: mobile.value ? '#f9ae3d' : 'rgb(253, 243, 208)',
  }
})

/** 获取验证码 */
const fetchCode = async () => {
  if (!enablePrivacy.value) {
    uni.showToast({
      title: '请同意用户隐私协议',
      icon: 'none',
    })
    return
  }

  if (!isValidPhone.value) {
    uni.showToast({
      title: '请填写正确手机号',
      icon: 'none',
    })
    return
  }

  loading.value = true
  try {
    const res = await sendMobileApi(mobile.value)
    if (res.code === 0) {
      current.value = 1
      uCodeRef.value?.start()
      uni.showToast({
        title: '验证码已发送',
        icon: 'success',
      })
    } else {
      uni.showToast({
        title: res.message || '发送失败',
        icon: 'none',
      })
    }
  } catch (error) {
    uni.showToast({
      title: '网络异常，请重试',
      icon: 'none',
    })
  } finally {
    loading.value = false
  }
}

// 验证码相关处理
const codeChange = (text: string) => {
  tips.value = text
}

const getCode = async () => {
  if (!uCodeRef.value?.canGetCode) {
    uni.showToast({
      title: '请稍后再试',
      icon: 'none',
    })
    return
  }

  loading.value = true
  try {
    const res = await sendMobileApi(mobile.value)
    if (res.code === 0) {
      uCodeRef.value.start()
      uni.showToast({
        title: '验证码已发送',
        icon: 'success',
      })
    } else {
      uni.showToast({
        title: res.message || '发送失败',
        icon: 'none',
      })
    }
  } catch (error) {
    uni.showToast({
      title: '网络异常，请重试',
      icon: 'none',
    })
  } finally {
    loading.value = false
  }
}

// 验证码输入处理
const change = (value: string) => {
  code.value = value
  if (codeError.value) codeError.value = false
}

// 验证码完成输入
const finish = async (value: string) => {
  if (value.length !== 6) return

  loading.value = true
  try {
    const res = await userLoginApi({ mobile: mobile.value, code: value }, 'H5')
    if (res.code === 0) {
      userStore.setUserInfo({
        userInfo: res.data.userInfo,
        token: res.data.token,
      })
      uni.switchTab({ url: '/' })
    } else {
      codeError.value = true
      uni.showToast({
        title: res.message || '验证失败',
        icon: 'none',
      })
    }
  } catch (error) {
    uni.showToast({
      title: '网络异常，请重试',
      icon: 'none',
    })
  } finally {
    loading.value = false
  }
}

/** 密码登录 */
const userLoginFun = async () => {
  if (!enablePrivacy.value) {
    uni.showToast({
      title: '请同意用户隐私协议',
      icon: 'none',
    })
    return
  }

  if (!userLogin.username || !userLogin.password) {
    uni.showToast({
      title: '请填写完整的登录信息',
      icon: 'none',
    })
    return
  }

  loading.value = true
  try {
    const res = await userLoginApi(userLogin, 'H5')
    if (res.code === 0) {
      userStore.setUserInfo({
        userInfo: res.data.userInfo,
        token: res.data.token,
      })
      uni.switchTab({ url: '/' })
    } else {
      uni.showToast({
        title: res.message || '登录失败',
        icon: 'none',
      })
    }
  } catch (error) {
    uni.showToast({
      title: '网络异常，请重试',
      icon: 'none',
    })
  } finally {
    loading.value = false
  }
}

/** 跳转隐私协议 */
const navigateToPrivacy = (val: string) => {
  uni.navigateTo({
    url: '/pages/mine/help/tips?type=' + val,
  })
}

// 隐私协议勾选
const checkboxChange = (e: any) => {
  enablePrivacy.value = e.detail.value.length > 0
}
</script>

<style scoped lang="scss">
.content {
  width: 600rpx;
  margin: 20rpx auto 0;
  input {
    padding-bottom: 6rpx;
    margin-bottom: 10rpx;
    text-align: left;
  }
  .tips {
    margin-top: 8rpx;
    margin-bottom: 60rpx;
    font-size: 12px;
    color: $u-info;
  }
  .getCaptcha {
    padding: 12rpx 0;
    font-size: 30rpx;
    color: $u-tips-color;
    background-color: rgb(253, 243, 208);
    border: none;

    &::after {
      border: none;
    }
  }
  .alternative {
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
    color: $u-tips-color;
  }
}

.title {
  padding-top: calc(104rpx);
  font-size: 56rpx;
  font-weight: 500;
  line-height: 1;
  color: #333;
}

.desc,
.desc-light {
  margin-top: 40rpx;
  font-size: 32rpx;
  line-height: 32rpx;
}

.desc {
  color: #333;
}

.desc-light {
  color: #999;

  > span {
    margin-left: 8rpx;
    color: #333;
  }
}

.mobile {
  margin-top: 80rpx;
}

.privacy-tips {
  width: 100%;
  font-size: 24rpx;
  line-height: 40rpx;
  word-break: break-all;
  white-space: normal;
}

.fetch-btn {
  width: 370rpx;
  height: 80rpx;
  margin: 71rpx auto 0;
  font-size: 28rpx;
  line-height: 80rpx;
  color: #999;
  text-align: center;
  background: #f2f2f2;
  border-radius: 100rpx;
}

.user-password-tips {
  margin: 20px 0;
  color: #ff3c2a;
  text-align: center;
}

.key-input {
  padding: 10rpx 0;
  text {
    display: none;
  }
  .error {
    display: block;
    margin: 20rpx 0;
    font-size: 30rpx;
    color: red;
  }
}
</style>
