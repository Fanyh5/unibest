<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="personal-page" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('personal')" :placeholder="true" :autoBack="true" class="navbar" />

    <view class="personal-content">
      <view class="profile-header">
        <text class="profile-title">个人信息</text>
        <text class="profile-subtitle">完善个人信息让其他用户更好地了解你</text>
      </view>

      <up-form
        :model="userInfo"
        ref="formRef"
        labelPosition="left"
        :rules="formRules"
        class="up-form"
      >
        <u-form-item
          label="头像"
          @click="handleEditAvatar"
          class="u-form-item avatar-item"
          hoverClass="item-hover"
        >
          <view class="avatar-wrapper">
            <u-avatar
              :src="userInfo.avatar || defaultAvatar"
              size="50"
              shape="circle"
              class="avatar"
            />
            <view class="avatar-right">
              <text class="avatar-tip">点击更换头像</text>
              <text class="avatar-desc">支持 jpg、png 格式大小 5M 以内的图片</text>
            </view>
            <u-icon name="arrow-right" color="var(--up-text-color-secondary)" size="16" />
          </view>
        </u-form-item>

        <u-form-item borderBottom label="用户名" class="u-form-item">
          <view class="input-wrapper">
            <text class="username-text">{{ userInfo.username }}</text>
            <text class="input-desc">用户名不可修改</text>
          </view>
        </u-form-item>

        <u-form-item
          borderBottom
          label="昵称"
          @click="handleEditNickname"
          class="u-form-item"
          prop="nickname"
          hoverClass="item-hover"
        >
          <view class="input-wrapper">
            <u-input
              v-model="userInfo.nickname"
              placeholder="请输入昵称"
              :maxlength="20"
              @blur="handleNicknameBlur"
              class="form-input"
            />
            <u-icon name="arrow-right" color="var(--up-text-color-secondary)" size="16" />
          </view>
        </u-form-item>

        <u-form-item
          borderBottom
          label="性别"
          @click="handleShowGenderPicker"
          class="u-form-item"
          prop="gender"
          hoverClass="item-hover"
        >
          <view class="input-wrapper">
            <text :class="['gender-text', !userInfo.gender && 'placeholder']">
              {{ genderLabel }}
            </text>
            <u-icon name="arrow-right" color="var(--up-text-color-secondary)" size="16" />
          </view>
        </u-form-item>
      </up-form>

      <view class="action-buttons">
        <u-button type="primary" @click="handleSave" :loading="isSaving" class="save-button">
          {{ isSaving ? '保存中...' : '保存修改' }}
        </u-button>
      </view>
    </view>

    <u-popup
      v-model="showGenderPicker"
      mode="bottom"
      safeAreaInsetBottom
      round="16"
      class="gender-popup"
    >
      <view class="picker-header">
        <text class="picker-title">选择性别</text>
      </view>
      <u-picker
        :columns="[genderOptions]"
        @confirm="handleGenderConfirm"
        @cancel="showGenderPicker = false"
        :defaultIndex="[
          userInfo.gender ? genderOptions.findIndex((item) => item.value === userInfo.gender) : 0,
        ]"
        class="gender-picker"
      />
    </u-popup>

    <u-toast ref="uToast" />
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { t } from '@/locale'
import type { FormInstance } from '@/types/form'
import { useUserStore } from '@/store/user'

// 系统信息
const { safeAreaInsets } = uni.getSystemInfoSync()

// 常量定义
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const defaultAvatar = '/static/images/default-avatar.png'

// Store
const userStore = useUserStore()

// 类型定义
interface UserInfo {
  avatar: string
  username: string
  nickname: string
  gender: number
}

// 表单规则
const formRules = {
  nickname: [
    { required: true, message: '请输入昵称' },
    { min: 2, max: 20, message: '昵称长度在2-20个字符之间' },
  ],
  gender: [{ required: true, message: '请选择性别' }],
}

// 状态管理
const formRef = ref<FormInstance>()
const uToast = ref()
const userInfo = ref<UserInfo>({
  avatar: '',
  username: '',
  nickname: '',
  gender: 0,
})
const showGenderPicker = ref(false)
const isSaving = ref(false)

// 性别选项
const genderOptions = [
  { text: '男', value: 1 },
  { text: '女', value: 2 },
]

// 计算属性
const genderLabel = computed(() => {
  const gender = genderOptions.find((item) => item.value === userInfo.value.gender)
  return gender ? gender.text : '请选择性别'
})

// 方法定义
const handleShowGenderPicker = () => {
  showGenderPicker.value = true
}

const handleEditAvatar = async () => {
  try {
    // const [tempFile] = await uni.chooseImage({
    //   count: 1,
    //   sizeType: ['compressed'],
    // })

    // if (tempFile.size > MAX_IMAGE_SIZE) {
    //   uToast.value.show({
    //     type: 'warning',
    //     message: '图片大小不能超过5MB',
    //   })
    //   return
    // }

    isSaving.value = true
    // const uploadResult = await uploadFile(tempFile.path)
    // await userStore.updateUserInfo({ avatar: uploadResult.url })
    // userInfo.value.avatar = uploadResult.url

    uToast.value.show({
      type: 'success',
      message: '头像更新成功',
    })
  } catch (error) {
    uToast.value.show({
      type: 'error',
      message: '头像更新失败，请重试',
    })
  } finally {
    isSaving.value = false
  }
}

const handleEditNickname = () => {
  uni.navigateTo({
    url: `/pages/user/setting/nickname?nickname=${userInfo.value.nickname}`,
  })
}

const handleNicknameBlur = () => {
  userInfo.value.nickname = userInfo.value.nickname.trim()
}

const handleGenderConfirm = async ([gender]) => {
  try {
    userInfo.value.gender = gender.value
    showGenderPicker.value = false

    isSaving.value = true
    // await userStore.updateUserInfo({ gender: gender.value })

    uToast.value.show({
      type: 'success',
      message: '性别修改成功',
    })
  } catch (error) {
    uToast.value.show({
      type: 'error',
      message: '性别修改失败，请重试',
    })
    // 恢复原值
    // userInfo.value.gender = userStore.userInfo.gender
  } finally {
    isSaving.value = false
  }
}

const handleSave = async () => {
  try {
    await formRef.value?.validate()

    isSaving.value = true
    // await userStore.updateUserInfo(userInfo.value)

    uToast.value.show({
      type: 'success',
      message: '保存成功',
    })
  } catch (error) {
    uToast.value.show({
      type: 'error',
      message: error.message || '保存失败，请重试',
    })
  } finally {
    isSaving.value = false
  }
}

// 生命周期
onMounted(async () => {
  try {
    // const userInfo = await userStore.getUserInfo()
    // userInfo.value = userInfo
  } catch (error) {
    uToast.value.show({
      type: 'error',
      message: '获取用户信息失败',
    })
  }
})
</script>

<style lang="scss" scoped>
.personal-page {
  min-height: 100vh;
  color: #333;
  background-color: #f7f8fa;
}

.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(60, 60, 67, 0.1);
}

.personal-content {
  padding: 20px 16px;
}

.profile-header {
  padding: 0 4px;
  margin-bottom: 24px;
}

.profile-title {
  display: block;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.profile-subtitle {
  font-size: 14px;
  color: #666;
}

.up-form {
  margin-bottom: 24px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid rgba(60, 60, 67, 0.1);
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
}

.u-form-item {
  position: relative;
  padding: 16px;
  transition: all 0.3s ease;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(60, 60, 67, 0.1);
  }
}

.item-hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.avatar-item {
  padding: 20px 16px;
}

.avatar-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}

.avatar {
  flex-shrink: 0;
  border: 2px solid #4080ff;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2b62da;
    box-shadow: 0 2px 8px rgba(64, 128, 255, 0.2);
    transform: scale(1.05);
  }
}

.avatar-right {
  flex: 1;
  min-width: 0;
}

.avatar-tip {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #1a1a1a;
}

.avatar-desc {
  font-size: 12px;
  color: #999;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}

.username-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  color: #666;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.input-desc {
  font-size: 12px;
  color: #999;
}

.form-input {
  flex: 1;
  min-width: 0;

  :deep(input) {
    height: 24px;
    font-size: 14px;
    color: #333;
  }
}

.gender-text {
  flex: 1;
  font-size: 14px;
  color: #333;

  &.placeholder {
    color: #999;
  }
}

.action-buttons {
  padding: 8px 16px 32px;
}

.save-button {
  width: 100%;
  height: 48px !important;
  font-size: 16px !important;
  font-weight: 500;
  color: #fff !important;
  background: linear-gradient(135deg, #4080ff 0%, #2b62da 100%) !important;
  border: none !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(64, 128, 255, 0.2) !important;
  transition: all 0.3s ease !important;

  &:active {
    box-shadow: 0 2px 8px rgba(64, 128, 255, 0.15) !important;
    opacity: 0.9;
    transform: translateY(1px);
  }
}

.gender-popup {
  overflow: hidden;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid rgba(60, 60, 67, 0.1);
}

.picker-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.gender-picker {
  padding: 16px 0;
}

// 适配暗黑模式
@media (prefers-color-scheme: dark) {
  .personal-page {
    color: #fff;
    background-color: #000;
  }

  .navbar {
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .profile-title {
    color: #fff;
  }

  .profile-subtitle {
    color: rgba(255, 255, 255, 0.6);
  }

  .up-form {
    background-color: #1c1c1e;
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
  }

  .u-form-item {
    &:not(:last-child) {
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }
  }

  .item-hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .avatar-tip {
    color: #fff;
  }

  .avatar-desc,
  .input-desc {
    color: rgba(255, 255, 255, 0.45);
  }

  .username-text {
    color: rgba(255, 255, 255, 0.6);
  }

  .form-input {
    :deep(input) {
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .gender-text {
    color: #fff;

    &.placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  .save-button {
    background: linear-gradient(135deg, #1a90ff 0%, #0c53b7 100%) !important;
    box-shadow: 0 4px 12px rgba(25, 144, 255, 0.2) !important;

    &:active {
      box-shadow: 0 2px 8px rgba(25, 144, 255, 0.15) !important;
    }
  }

  .gender-popup,
  .picker-header {
    background-color: #1c1c1e;
    border-color: rgba(255, 255, 255, 0.1);
  }

  .picker-title {
    color: #fff;
  }
}
</style>
