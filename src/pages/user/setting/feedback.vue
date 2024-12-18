<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('feedback.title')" :placeholder="true" :autoBack="true"></up-navbar>
    <view>
      <up-form ref="form" :model="model" :rules="rules" labelPosition="top">
        <up-form-item
          labelWidth="auto"
          :label="t('feedback.type')"
          class="p-2 bg-[#fff] text-[#333] font-bold"
        >
          <up-radio-group v-model="model.type" class="px-2 mt-2 font-medium">
            <up-radio
              :customStyle="{ marginRight: '16px' }"
              placement="column"
              v-for="(item, index) in feedbackTypes"
              :key="index"
              :label="item.name"
              :name="item.name"
            ></up-radio>
          </up-radio-group>
        </up-form-item>

        <up-form-item
          labelWidth="auto"
          :label="t('feedback.description')"
          class="p-2 mt-4 bg-[#fff] text-[#333] font-bold"
        >
          <u-textarea
            :label="t('feedback.content')"
            class="font-medium mt-2"
            label-width="20%"
            v-model="model.content"
            :placeholder="t('feedback.contentPlaceholder')"
            :maxlength="500"
            :height="140"
            count
            show-word-limit
            prop="content"
          />
        </up-form-item>

        <up-form-item
          labelWidth="auto"
          :label="t('feedback.uploadTitle')"
          class="p-2 mt-4 bg-[#fff] text-[#333] font-bold"
        >
          <u-upload
            :file-list="model.fileList"
            action="https://ftf.jd.com/api/uploadImg"
            @change="handleFileChange"
            @delete="handleFileDelete"
            multiple
            max-count="4"
            :before-upload="beforeUpload"
            class="mt-2"
          ></u-upload>
        </up-form-item>

        <up-form-item
          labelWidth="auto"
          :label="t('feedback.contact')"
          class="p-2 mt-4 bg-[#fff] text-[#333] font-bold"
        >
          <u-input
            label-width="20%"
            clearable
            shape="circle"
            class="font-medium"
            v-model="model.contact"
            :placeholder="t('feedback.contactPlaceholder')"
            prop="contact"
          />
        </up-form-item>

        <view class="p-3">
          <u-button
            @click="handleSubmit"
            block
            :loading="submitting"
            :disabled="!model.type || !model.content"
            :customStyle="{
              background: 'linear-gradient(90deg, #ff6b35, #ff9f28)',
              color: '#fff',
              height: '88rpx',
              borderRadius: '44rpx',
            }"
          >
            {{ submitting ? t('feedback.submitting') : t('feedback.submit') }}
          </u-button>
        </view>
      </up-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'

const { safeAreaInsets } = uni.getSystemInfoSync()

const feedbackTypes = [
  { disabled: false, name: t('feedback.suggestion') },
  { disabled: false, name: t('feedback.uiOptimization') },
  { disabled: false, name: t('feedback.performance') },
  { disabled: false, name: t('feedback.bug') },
  { disabled: false, name: t('feedback.other') },
]

const model = reactive({
  content: '',
  fileList: [],
  contact: '',
  type: '',
})

const submitting = ref(false)

const rules = {
  type: [{ required: true, message: t('feedback.typeRequired') }],
  content: [
    { required: true, message: t('feedback.contentRequired') },
    { min: 10, message: t('feedback.contentMinLength') },
  ],
  contact: [
    {
      pattern: /^1[3-9]\d{9}$|^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: t('feedback.contactInvalid'),
    },
  ],
}

const form = ref()

function handleFileChange({ fileList }) {
  model.fileList = fileList
}

function handleFileDelete(index) {
  model.fileList.splice(index, 1)
}

function beforeUpload(file) {
  // 限制文件大小为10MB
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    // showToast('上传图片不能超过10MB!')
    return false
  }
  return true
}

async function handleSubmit() {
  if (!model.type || !model.content) {
    uni.showToast({
      title: t('feedback.requiredFields'),
      icon: 'none',
    })
    return
  }

  try {
    submitting.value = true
    await form.value?.validate()

    // 模拟提交接口调用
    await new Promise((resolve) => setTimeout(resolve, 1500))

    uni.showToast({
      title: t('feedback.submitSuccess'),
      icon: 'success',
    })

    // 重置表单
    model.type = ''
    model.content = ''
    model.contact = ''
    model.fileList = []

    // 延迟返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    uni.showToast({
      title: error?.message || t('feedback.submitError'),
      icon: 'none',
    })
    console.error(error)
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped></style>
