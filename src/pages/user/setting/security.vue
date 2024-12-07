<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<template>
  <view class="page-container" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar
      :title="t('security')"
      :placeholder="true"
      :autoBack="true"
      class="nav-bar"
    ></up-navbar>
    <view class="content-wrapper">
      <u-cell-group class="cell-group">
        <u-cell
          :title="t('changePassword')"
          isLink
          @click="showPasswordPopup = true"
          class="cell-item"
        >
          <template #icon>
            <u-icon name="lock-fill" size="20" color="#3c9cff" class="cell-icon"></u-icon>
          </template>
        </u-cell>

        <u-cell :title="t('bindPhone')" isLink @click="showPhonePopup = true" class="cell-item">
          <template #icon>
            <u-icon name="phone-fill" size="20" color="#19be6b" class="cell-icon"></u-icon>
          </template>
          <template #value>
            <text class="value-text">{{ maskPhone(userStore?.userInfo?.phone) }}</text>
          </template>
        </u-cell>

        <u-cell :title="t('bindEmail')" isLink @click="showEmailPopup = true" class="cell-item">
          <template #icon>
            <u-icon name="email-fill" size="20" color="#ff9900" class="cell-icon"></u-icon>
          </template>
          <template #value>
            <text class="value-text">{{ maskEmail(userStore?.userInfo?.email) }}</text>
          </template>
        </u-cell>
      </u-cell-group>
    </view>

    <!-- 修改密码弹窗 -->
    <up-popup
      :show="showPasswordPopup"
      @close="showPasswordPopup = false"
      mode="bottom"
      :round="10"
    >
      <view class="popup-content">
        <!-- 密码修改表单 -->
      </view>
    </up-popup>

    <!-- 绑定手机弹窗 -->
    <up-popup :show="showPhonePopup" @close="showPhonePopup = false" mode="bottom" :round="10">
      <view class="popup-content">
        <!-- 手机绑定表单 -->
      </view>
    </up-popup>

    <!-- 绑定邮箱弹窗 -->
    <up-popup :show="showEmailPopup" @close="showEmailPopup = false" mode="bottom" :round="10">
      <view class="popup-content">
        <!-- 邮箱绑定表单 -->
      </view>
    </up-popup>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import { useUserStore } from '@/store'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const userStore = useUserStore()

// 弹窗显示状态
const showPasswordPopup = ref(false)
const showPhonePopup = ref(false)
const showEmailPopup = ref(false)

// 手机号脱敏
const maskPhone = (phone: string) => {
  if (!phone) return ''
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 邮箱脱敏
const maskEmail = (email: string) => {
  if (!email) return ''
  const [username, domain] = email.split('@')
  return `${username.charAt(0)}****@${domain}`
}
</script>

<style lang="scss">
.page-container {
  min-height: 100vh;
  background-color: #f5f6fa;
}

.nav-bar {
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-wrapper {
  padding: 20px 16px;
}

.cell-group {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.cell-item {
  background: #ffffff;

  .u-cell__body {
    padding: 20px 16px !important;
  }

  .cell-icon {
    margin-right: 12px;
  }
}

.value-text {
  font-size: 14px;
  color: #909399;
}

.popup-content {
  min-height: 300px;
  padding: 20px;
  background: #fff;
}
</style>
