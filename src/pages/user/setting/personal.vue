<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="overflow-hidden" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('personal')" :placeholder="true" :autoBack="true" />

    <view class="bg-[#fff]">
      <u-cell-group>
        <u-cell title="头像" @click="handleEditAvatar" :isLink="true">
          <template #right-icon>
            <u-avatar :src="userInfo.avatar || defaultAvatar" size="35" shape="circle" />
          </template>
        </u-cell>

        <u-cell
          title="昵称"
          :value="userInfo?.nickname"
          @click="handleEditNickname"
          :isLink="true"
        />
        <u-cell
          title="用户名"
          :value="userInfo?.username"
          @click="handleEditNickname"
          :isLink="true"
        />

        <u-cell title="手机号码" :value="formatPhone(userInfo.phone)" :isLink="true" />

        <u-cell title="性别" :value="genderLabel" @click="showGenderPicker = true" :isLink="true" />
      </u-cell-group>
    </view>

    <!-- 性别选择器 -->
    <up-picker
      :show="showGenderPicker"
      :columns="genderOptions"
      @confirm="handleGenderConfirm"
      @cancel="showGenderPicker = false"
    />

    <!-- 操作反馈 -->
    <u-toast ref="uToast" />
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import { useUserStore } from '@/store'

// 获取系统安全区域信息
const { safeAreaInsets } = uni.getSystemInfoSync()

const userStore = useUserStore()
const userInfo = ref<any>(userStore.userInfo)
const defaultAvatar = '/static/images/default-avatar.png'
const uToast = ref()

// 性别选择相关
const showGenderPicker = ref(false)
const genderOptions = [
  { text: '男', value: 1 },
  { text: '女', value: 2 },
]
const genderLabel = computed(() => {
  const gender = genderOptions.find((item) => item.value === userInfo.value.gender)
  return gender ? gender.text : 'unknown'
})

// 格式化手机号
const formatPhone = (phone: string) => {
  return phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''
}

// 编辑头像
const handleEditAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: async (res) => {
      // try {
      //   // TODO: 上传头像
      //   const uploadResult = await uploadFile(res.tempFilePaths[0])
      //   await userStore.updateUserInfo({ avatar: uploadResult.url })
      //   userInfo.value = userStore.userInfo
      //   uToast.value.show({ type: 'success', message: 'updateSuccess' })
      // } catch (error) {
      //   uToast.value.show({ type: 'error', message: 'updateFailed' })
      // }
    },
  })
}

// 编辑昵称
const handleEditNickname = () => {
  uni.navigateTo({
    url: '/pages/user/setting/nickname',
  })
}

// 修改性别
const handleGenderConfirm = async ([gender]) => {
  // try {
  //   await userStore.updateUserInfo({ gender: gender.value })
  //   userInfo.value = userStore.userInfo
  //   uToast.value.show({ type: 'success', message: t('updateSuccess') })
  // } catch (error) {
  //   uToast.value.show({ type: 'error', message: t('updateFailed') })
  // }
  showGenderPicker.value = false
}
</script>

<style lang="scss" scoped></style>
