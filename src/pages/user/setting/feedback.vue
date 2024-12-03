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
      <u-form ref="form" :model="model">
        <u-cell-group border class="mb-4">
          <u-cell title="反馈类型" title-width="20%" prop="type">
            <u-radio-group
              v-model="model.type"
              inline
              shape="check"
              checked-color="#fa4350"
              style="text-align: left"
            >
              <u-radio value="1">功能建议</u-radio>
              <u-radio value="2">界面优化</u-radio>
              <u-radio value="3">性能问题</u-radio>
              <u-radio value="4">BUG反馈</u-radio>
              <u-radio value="5">其他</u-radio>
            </u-radio-group>
          </u-cell>
        </u-cell-group>

        <u-cell-group border class="mb-4">
          <u-textarea
            label="内容"
            label-width="20%"
            v-model="model.content"
            placeholder="请输入反馈内容"
            :maxlength="200"
            show-word-limit
          />
        </u-cell-group>

        <u-cell-group border class="mb-4">
          <u-cell class="text-center" title-width="0" prop="fileList">
            <u-upload
              :file-list="model.fileList"
              action="https://ftf.jd.com/api/uploadImg"
              @change="handleFileChange"
              multiple
              max-count="4"
            ></u-upload>
          </u-cell>
        </u-cell-group>

        <u-cell-group border class="mb-4">
          <u-input
            label="联系方式"
            label-width="20%"
            clearable
            v-model="model.contact"
            placeholder="请输入您的联系方式"
          />
        </u-cell-group>

        <view class="p-3">
          <u-button @click="handleSubmit" block>提交反馈</u-button>
        </view>
      </u-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'

const { safeAreaInsets } = uni.getSystemInfoSync()

const model = reactive({
  content: '',
  fileList: [],
  contact: '',
  type: '',
})

const form = ref()

function handleFileChange({ fileList }) {
  model.fileList = fileList
}

function handleSubmit() {
  if (!model.content || !model.type) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none',
    })
    return
  }

  showSuccess('提交成功')
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang="scss" scoped></style>
