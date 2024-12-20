<template>
  <view class="login-container">
    <view class="header">
      <view class="title">{{ loginTitleWay[current].title }}</view>
      <view :class="current == 1 ? 'subtitle-light' : 'subtitle'" class="mb-24">
        {{ loginTitleWay[current].desc }}
        <span v-if="current == 1">{{ mobile || 'secrecyMobile' }}</span>
      </view>
    </view>

    <!-- 手机号登录 -->
    <view v-show="!enableUserPwdBox" class="login-form">
      <!-- 输入手机号 -->
      <view v-show="current == 0">
        <view class="form-content">
          <input
            ref="mobileInput"
            class="input-field"
            type="number"
            v-model="mobile"
            placeholder="请输入手机号 (11位)"
          />
          <view class="tips">未注册的手机号验证后自动创建账号</view>
          <button
            @tap="debouncedFetchCode"
            :class="['submit-btn', mobile ? 'btn-active' : '']"
            :disabled="btnLoading"
          >
            <text v-if="btnLoading">加载中...</text>
            <text v-else>获取短信验证码</text>
          </button>
          <view class="help-section">
            <view></view>
            <view class="help-text">遇到问题</view>
          </view>
        </view>
      </view>

      <!-- 输入验证码 -->
      <view v-show="current == 1">
        <view class="verification-section">
          <up-message-input
            :focus="true"
            :value="code"
            @change="change"
            @finish="finish"
            mode="bottomLine"
            :maxlength="6"
            class="code-input"
          ></up-message-input>
          <text :class="['error-text', { visible: codeError }]">验证码错误，请重新输入</text>

          <view class="code-actions">
            <up-toast ref="uToastRef"></up-toast>
            <up-code
              :seconds="seconds"
              @start="reacquire = true"
              @end="reacquire = false"
              ref="uCodeRef"
              @change="codeChange"
            ></up-code>
            <up-button :disabled="reacquire" type="primary" @tap="getCode" class="resend-btn">
              {{ tips }}
            </up-button>
          </view>
        </view>
      </view>
    </view>

    <!-- 帐号密码登录 -->
    <view v-show="enableUserPwdBox" class="login-form">
      <view class="form-content">
        <input class="input-field" v-model="userLogin.username" placeholder="请输入用户名" />
        <input
          class="input-field mt-3"
          :showPassword="true"
          v-model="userLogin.password"
          placeholder="请输入密码"
        />
        <button @tap="userLoginFun" class="submit-btn btn-active">登录</button>
        <view class="help-section">
          <view></view>
          <view class="help-text">遇到问题</view>
        </view>
      </view>
    </view>

    <!-- 隐私协议 -->
    <view class="privacy-section" v-show="current != 1">
      <checkbox-group @change="checkboxChange">
        <checkbox :checked="enablePrivacy" class="privacy-checkbox" />
        <text class="privacy-content">
          登录即代表您已同意
          <text @click="navigateToPrivacy('PRIVACY_POLICY')" class="link">《隐私协议》</text>
          <text @click="navigateToPrivacy('USER_AGREEMENT')" class="link">《用户协议》</text>
          并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
        </text>
      </checkbox-group>
    </view>

    <!-- 切换登录方式 -->
    <view v-if="current != 1" class="switch-login" @click="enableUserPwdBox = !enableUserPwdBox">
      {{ !enableUserPwdBox ? '帐号密码' : '手机号' }}登录
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { debounce } from '@/utils'

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
const btnLoading = ref(false)

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

// 模拟后端接口返回数据
const mockApiResponse = (data = {}, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: '操作成功',
        data: {
          userInfo: {
            id: 1,
            username: 'test',
            mobile: '13800138000',
            avatar: '',
          },
          token: 'mock_token_' + Date.now(),
          ...data,
        },
      })
    }, delay)
  })
}

/** 获取验证码 */
const fetchCode = async () => {
  if (!validateForm()) return

  loading.value = true
  btnLoading.value = true
  try {
    const res: any = await mockApiResponse()
    if (res.code === 0) {
      current.value = 1
      uCodeRef.value?.start()
      uni.showToast({
        title: '验证码已发送',
        icon: 'success',
      })
    } else {
      handleError(res)
    }
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
    btnLoading.value = false
  }
}

// 验证码相关处理
const codeChange = (text: string) => {
  tips.value = text
}

const getCode = async () => {
  if (!uCodeRef.value?.canGetCode) {
    handleError(null, '请稍后再试')
    return
  }

  loading.value = true
  try {
    const res: any = await mockApiResponse()
    if (res.code === 0) {
      uCodeRef.value.start()
      uni.showToast({
        title: '验证码已发送',
        icon: 'success',
      })
    } else {
      handleError(res)
    }
  } catch (error) {
    handleError(error)
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
    const res: any = await mockApiResponse()
    if (res.code === 0) {
      userStore.setUserInfo({
        userInfo: res.data.userInfo,
        token: res.data.token,
      })
      uni.switchTab({ url: '/' })
    } else {
      codeError.value = true
      handleError(res)
    }
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}

/** 密码登录 */
const userLoginFun = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const res: any = await mockApiResponse()
    if (res.code === 0) {
      userStore.setUserInfo({
        userInfo: res.data.userInfo,
        token: res.data.token,
      })
      uni.switchTab({ url: '/' })
    } else {
      handleError(res)
    }
  } catch (error) {
    handleError(error)
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

// 统一错误处理
const handleError = (error: any, customMessage?: string) => {
  uni.showToast({
    title: customMessage || error?.message || '网络异常，请重试',
    icon: 'none',
  })
}

// 统一表单验证
const validateForm = () => {
  if (!enablePrivacy.value) {
    handleError(null, '请同意用户隐私协议')
    return false
  }

  if (enableUserPwdBox.value) {
    if (!userLogin.username || !userLogin.password) {
      handleError(null, '请填写完整的登录信息')
      return false
    }
  } else {
    if (!isValidPhone.value) {
      handleError(null, '请填写正确手机号')
      return false
    }
  }
  return true
}

// 防抖处理
const debouncedFetchCode = debounce(async () => {
  await fetchCode()
}, 300)

// 输入框自动聚焦
const mobileInput = ref(null)

onMounted(() => {
  // 自动聚焦手机号输入框
  nextTick(() => {
    mobileInput.value?.focus()
  })
})
</script>

<style scoped lang="scss">
.login-container {
  padding: 30rpx;
  background: #fff;
}

.header {
  margin-bottom: 60rpx;
  .title {
    margin-bottom: 20rpx;
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
  }
  .subtitle,
  .subtitle-light {
    font-size: 28rpx;
    line-height: 1.5;
  }

  .subtitle {
    color: #333;
  }

  .subtitle-light {
    color: #999;

    span {
      margin-left: 8rpx;
      color: #333;
    }
  }
}

.login-form {
  .form-content {
    padding: 0 40rpx;

    .input-field {
      width: 100%;
      height: 90rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
      border-bottom: 2rpx solid #eee;
      transition: all 0.3s;

      &:focus {
        border-color: #f9ae3d;
      }
    }

    .tips {
      margin: 20rpx 0 40rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  font-size: 32rpx;
  color: #999;
  background: #f5f5f5;
  border: none;
  border-radius: 44rpx;
  transition: all 0.3s;

  &.btn-active {
    color: #fff;
    background: linear-gradient(to right, #f9ae3d, #ff6b35);
  }

  &:active {
    opacity: 0.8;
  }
}

.help-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 30rpx;

  .help-text {
    font-size: 26rpx;
    color: #666;
  }
}

.verification-section {
  padding: 40rpx;

  .code-input {
    margin-bottom: 30rpx;
  }

  .error-text {
    display: none;
    font-size: 26rpx;
    color: #ff4d4f;

    &.visible {
      display: block;
    }
  }

  .code-actions {
    margin-top: 40rpx;
  }

  .resend-btn {
    width: 100%;
    margin-top: 20rpx;
  }
}

.privacy-section {
  padding: 30rpx 40rpx;

  .privacy-checkbox {
    transform: scale(0.7);
  }

  .privacy-content {
    font-size: 24rpx;
    line-height: 1.6;
    color: #666;

    .link {
      color: #f9ae3d;
    }
  }
}

.switch-login {
  padding: 20rpx;
  margin-top: 40rpx;
  font-size: 28rpx;
  color: #f9ae3d;
  text-align: center;
}
</style>
