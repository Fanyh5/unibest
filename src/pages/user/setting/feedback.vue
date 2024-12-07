<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('feedback')" :placeholder="true" :autoBack="true"></up-navbar>
    <view>
      <up-form ref="form" :model="model" :rules="rules" labelPosition="top">
        <up-form-item
          labelWidth="auto"
          label="反馈类型"
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
          label="相关描述"
          class="p-2 mt-4 bg-[#fff] text-[#333] font-bold"
        >
          <u-textarea
            label="内容"
            class="font-medium mt-2"
            label-width="20%"
            v-model="model.content"
            placeholder="请详细描述您遇到的问题或建议"
            :maxlength="500"
            :height="140"
            count
            show-word-limit
            prop="content"
          />
        </up-form-item>

        <up-form-item
          labelWidth="auto"
          label="上传凭证（最多2张）"
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
          label="联系方式"
          class="p-2 mt-4 bg-[#fff] text-[#333] font-bold"
        >
          <u-input
            label-width="20%"
            clearable
            shape="circle"
            class="font-medium"
            v-model="model.contact"
            placeholder="请输入手机号或邮箱,方便我们及时反馈"
            prop="contact"
            cless="mt-2"
          />
        </up-form-item>

        <view class="p-3">
          <u-button @click="handleSubmit" block :loading="submitting">提交反馈</u-button>
        </view>
      </up-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'

const { safeAreaInsets } = uni.getSystemInfoSync()

const feedbackTypes = [
  { disabled: false, name: '功能建议' },
  { disabled: false, name: '界面优化' },
  { disabled: false, name: '性能问题' },
  { disabled: false, name: 'BUG反馈' },
  { disabled: false, name: '其他' },
]

const model = reactive({
  content: '',
  fileList: [],
  contact: '',
  type: '',
})

const submitting = ref(false)

const rules = {
  type: [{ required: true, message: '请选择反馈类型' }],
  content: [
    { required: true, message: '请输入反馈内容' },
    { min: 10, message: '反馈内容至少10个字' },
  ],
  contact: [
    {
      pattern: /^1[3-9]\d{9}$|^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '请输入正确的手机号或邮箱',
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
  try {
    submitting.value = true
    await form.value?.validate()

    // TODO: 调用提交接口
    // showToast('提交成功', 'success')
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (error) {
    console.error(error)
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped></style>
