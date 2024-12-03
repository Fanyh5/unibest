<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('switchLanguages')" :placeholder="true" :autoBack="true"></up-navbar>
    <view class="center flex-col mt-2 px-2">
      <view class="uni-list">
        <radio-group @change="radioChange" class="radio-group">
          <label class="uni-list-cell uni-list-cell-pd" v-for="item in languages" :key="item.value">
            <view>
              <radio :value="item.value" :checked="item.value === current" />
            </view>
            <view>{{ item.name }}</view>
          </label>
        </radio-group>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import i18n, { t } from '@/locale/index'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const current = ref(uni.getLocale())
const languages = [
  {
    value: 'zh-Hans',
    name: '中文',
    checked: 'true',
  },
  {
    value: 'en',
    name: 'English',
  },
]

const radioChange = (evt) => {
  current.value = evt.detail.value
  // 下面2句缺一不可！！！
  uni.setLocale(evt.detail.value)
  i18n.global.locale = evt.detail.value
}
</script>

<style scoped lang="scss">
.uni-list {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
}

.radio-group {
  width: 80%;
  margin: 10px auto;
  border-radius: 12px;
}

.uni-list-cell {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
</style>
