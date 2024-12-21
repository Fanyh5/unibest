<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="personal-page" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('personal')" :placeholder="true" :auto-back="true" class="navbar" />
    <view class="personal-content">
      <!-- 头像部分 -->
      <view class="avatar-section">
        <view class="avatar-container" @click="handleEditAvatar">
          <u-avatar
            :src="userInfo.avatar || defaultAvatar"
            :size="80"
            shape="circle"
            class="avatar"
          />
          <view class="avatar-edit-icon">
            <u-icon name="camera-fill" color="#fff" :size="20" />
          </view>
        </view>
        <text class="avatar-username">{{ userInfo.username }}</text>
        <text class="avatar-tip">点击更换头像</text>
      </view>

      <!-- 表单部分 -->
      <view class="form-section">
        <up-form
          :model="userInfo"
          ref="formRef"
          label-position="left"
          :rules="formRules"
          class="up-form"
        >
          <u-form-item
            :border-bottom="true"
            label="昵称"
            @click="handleEditNickname"
            class="form-item"
            prop="nickname"
            hover-class="item-hover"
          >
            <view class="input-wrapper">
              <u-input
                v-model="userInfo.nickname"
                placeholder="请输入昵称"
                :maxlength="20"
                border="bottom"
                @blur="handleNicknameBlur"
                class="form-input"
              />
              <u-icon name="arrow-right" color="var(--up-text-color-secondary)" :size="16" />
            </view>
          </u-form-item>

          <u-form-item
            :border-bottom="true"
            label="性别"
            @click="handleShowGenderPicker"
            class="form-item"
            prop="gender"
            hover-class="item-hover"
          >
            <view class="input-wrapper">
              <text :class="['gender-text', !userInfo.gender && 'placeholder']">
                {{ genderLabel }}
              </text>
              <u-icon name="arrow-right" color="var(--up-text-color-secondary)" :size="16" />
            </view>
          </u-form-item>
        </up-form>
      </view>

      <!-- 保存按钮 -->
      <view class="action-buttons">
        <u-button type="primary" @click="handleSave" :loading="isSaving" class="save-button">
          {{ isSaving ? '保存中...' : '保存修改' }}
        </u-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
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
  background-color: #f7f8fa;
}

.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(60, 60, 67, 0.1);
}

.personal-content {
  max-width: 800px;
  padding: 24px 16px;
  margin: 0 auto;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%);
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.avatar {
  border: 4px solid #fff;
  box-shadow: 0 4px 15px rgba(64, 128, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar-edit-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4080ff 0%, #2b62da 100%);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(64, 128, 255, 0.25);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(5px);
}

.avatar-container {
  position: relative;
  margin-bottom: 16px;
  cursor: pointer;

  &:hover {
    .avatar {
      box-shadow: 0 8px 25px rgba(64, 128, 255, 0.25);
      transform: scale(1.05);
    }

    .avatar-edit-icon {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.avatar-username {
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.avatar-tip {
  font-size: 14px;
  color: #666;
}

.form-section {
  margin-bottom: 24px;
}

.up-form {
  overflow: hidden;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
}

.form-item {
  padding: 8px 16px;
  transition: background-color 0.3s ease;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(60, 60, 67, 0.1);
  }
}

.item-hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}

.form-input {
  flex: 1;

  :deep(input) {
    height: 28px;
    font-size: 15px;
    color: #333;
  }
}

.gender-text {
  flex: 1;
  font-size: 15px;
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
  height: 50px !important;
  font-size: 16px !important;
  font-weight: 600;
  background: linear-gradient(135deg, #4080ff 0%, #2b62da 100%) !important;
  border: none !important;
  border-radius: 25px !important;
  box-shadow: 0 6px 20px rgba(64, 128, 255, 0.25) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;

  &:active {
    box-shadow: 0 2px 10px rgba(64, 128, 255, 0.2) !important;
    transform: translateY(2px);
  }

  &:hover {
    box-shadow: 0 8px 25px rgba(64, 128, 255, 0.3) !important;
    transform: translateY(-1px);
  }
}

@media (prefers-color-scheme: dark) {
  .personal-page {
    background-color: #000;
  }

  .avatar-section {
    background: linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%);
  }

  .avatar {
    border-color: #2c2c2e;
  }

  .avatar-username {
    color: #fff;
  }

  .avatar-tip {
    color: rgba(255, 255, 255, 0.6);
  }

  .up-form {
    background: #1c1c1e;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
  }

  .form-item {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .item-hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .form-input {
    :deep(input) {
      color: #fff;
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
  }
}
</style>
