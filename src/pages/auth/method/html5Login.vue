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
    <div v-show="!enableUserPwdBox">
      <!-- 输入手机号 -->
      <div v-show="current == 0">
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
      </div>

      <!-- 输入验证码 -->
      <div v-show="current == 1">
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
      </div>
    </div>

    <!-- 帐号密码登录 -->
    <div v-show="enableUserPwdBox">
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
    </div>

    <!-- 隐私协议 -->
    <div class="flex mt-4 px-2" v-show="current != 1">
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
    </div>

    <!-- 切换登录方式 -->
    <div
      v-if="current != 1"
      class="user-password-tips"
      @click="enableUserPwdBox = !enableUserPwdBox"
    >
      {{ !enableUserPwdBox ? '帐号密码' : '手机号' }}登录
    </div>
  </view>
</template>

<script setup lang="ts">
import { sendMobileApi, userLoginApi } from '@/service/index/auth'
import { useUserStore } from '@/store'
import { currRoute } from '@/utils'

const userStore = useUserStore()
const { safeAreaInsets } = uni.getSystemInfoSync()

// 状态管理
const flage = ref(false)
const codeFlag = ref(true)
const tips = ref('')
const enableUserPwdBox = ref(false)
const current = ref(0)
const seconds = ref(60)
const enablePrivacy = ref(false)
const mobile = ref('')
const code = ref('')
const codeError = ref(false)
const uCodeRef = ref(null)
const reacquire = ref(false)
// 用户数据
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

/** 获取验证码 */
const fetchCode = async () => {
  if (!enablePrivacy.value) {
    uni.showToast({ title: '请同意用户隐私', duration: 2000, icon: 'none' })
    return
  }

  if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
    uni.showToast({ title: '请填写正确手机号', duration: 2000, icon: 'none' })
    return
  }

  current.value = 1

  if (tips.value === '重新获取验证码' && codeFlag.value) {
    uni.showLoading({ title: '加载中' })
    try {
      tips.value = '已发送'
    } finally {
      uni.hideLoading()
    }
  }
}

const codeChange = (text) => {
  tips.value = text
}

const getCode = () => {
  if (uCodeRef.value.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码',
    })
    setTimeout(() => {
      uni.hideLoading()
      // 这里此提示会被start()方法中的提示覆盖
      uni.showToast({
        title: '验证码已发送',
        icon: 'none',
      })
      // 通知验证码组件内部开始倒计时
      uCodeRef.value.start()
    }, 1000)
  } else {
    uni.showToast({
      title: '倒计时结束后再发送',
      icon: 'none',
    })
  }
}

// change事件侦听
const change = (value: string) => {
  // console.log('change', value);
}

// 输入完验证码最后一位执行
const finish = (value: string) => {
  // console.log('finish', value);
}

/** 密码登录 */
function userLoginFun() {
  if (!enablePrivacy.value) {
    uni.showToast({
      title: '请同意用户隐私',
      duration: 2000,
      icon: 'none',
    })
    return false
  }

  if (!userLogin.username) {
    uni.showToast({
      title: '请填写用户名',
      duration: 2000,
      icon: 'none',
    })
    return false
  }

  if (!userLogin.password) {
    uni.showToast({
      title: '请填写密码',
      duration: 2000,
      icon: 'none',
    })
    return false
  }

  const params = JSON.parse(JSON.stringify(userLogin))
  userLoginApi(params, 'H5').then((res: IResData<any>) => {
    if (res.code === 0) {
      userStore.setUserInfo({ userInfo: res.data.userInfo, token: res.data.token })
      const { query } = currRoute()
      uni.redirectTo({ url: query.redirect })
    } else {
      uni.showToast({
        title: res.message,
        duration: 2000,
        icon: 'none',
      })
    }
  })
}

/** 跳转隐私协议 */
function navigateToPrivacy(val: string) {
  uni.navigateTo({
    url: '/pages/mine/help/tips?type=' + val,
  })
}
const inputStyle = computed(() => {
  const style: any = {}
  if (mobile.value) {
    style.color = '#fff'
    style.backgroundColor = '#f9ae3d'
  }
  return style
})

// 监听按钮状态
watch(
  () => flage.value,
  async (val) => {
    if (val) {
      if (enableUserPwdBox.value) {
        return
      }
      const res = await sendMobileApi(mobile.value)
    }
  },
)

// 隐私协议勾选
function checkboxChange(e) {
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
