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
    <view>
      <up-form :model="userInfo" ref="uForm" labelPosition="left">
        <u-form-item label="头像" @click="handleEditAvatar">
          <u-avatar :src="userInfo.avatar" size="35" shape="circle" />
        </u-form-item>

        <up-form-item borderBottom label="用户名">
          <text>{{ userInfo.username }}</text>
        </up-form-item>

        <up-form-item borderBottom label="昵称" @click="handleEditNickname">
          <u-input border="none" v-model="userInfo.nickname" placeholder="请输入昵称" />
        </up-form-item>
      </up-form>
    </view>
    <!--    <u-form :model="userInfo" ref="uForm">-->
    <!--      <u-form-item label="头像" @click="handleEditAvatar">-->
    <!--        <u-avatar :src="userInfo.avatar || defaultAvatar" size="35" shape="circle" />-->
    <!--        <u-icon name="arrow-right" color="#969799" size="16" />-->
    <!--      </u-form-item>-->

    <!--      <u-form-item label="昵称" @click="handleEditNickname">-->
    <!--        <u-input v-model="userInfo.nickname" disabled placeholder="请输入昵称" />-->
    <!--        <u-icon name="arrow-right" color="#969799" size="16" />-->
    <!--      </u-form-item>-->

    <!--      <u-form-item label="性别" @click="showGenderPicker = true">-->
    <!--        <u-input v-model="genderLabel" disabled placeholder="请选择性别" />-->
    <!--        <u-icon name="arrow-right" color="#969799" size="16" />-->
    <!--      </u-form-item>-->
    <!--    </u-form>-->
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'

// 获取系统安全区域信息
const { safeAreaInsets } = uni.getSystemInfoSync()

const userInfo = ref<any>({})
const uForm = ref()
//
// // 性别选择相关
// const showGenderPicker = ref(false)
// const genderOptions = [
//   { text: '男', value: 1 },
//   { text: '女', value: 2 },
// ]
// const genderLabel = computed(() => {
//   const gender = genderOptions.find((item) => item.value === userInfo.value.gender)
//   return gender ? gender.text : 'unknown'
// })
//
// // 格式化手机号
// const formatPhone = (phone: string) => {
//   return phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''
// }
//
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
//
// 编辑昵称
const handleEditNickname = () => {
  uni.navigateTo({
    url: '/pages/user/setting/nickname',
  })
}
//
// // 修改性别
// const handleGenderConfirm = async ([gender]) => {
//   // try {
//   //   await userStore.updateUserInfo({ gender: gender.value })
//   //   userInfo.value = userStore.userInfo
//   //   uToast.value.show({ type: 'success', message: t('updateSuccess') })
//   // } catch (error) {
//   //   uToast.value.show({ type: 'error', message: t('updateFailed') })
//   // }
//   showGenderPicker.value = false
// }
</script>

<style lang="scss" scoped>
:deep(.u-form-item) {
  padding: 10px 16px;
  margin-bottom: 1px;
  background: #fff;
}
</style>
