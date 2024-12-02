<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="p-2">
      <up-swipe-action>
        <up-swipe-action-item
          v-for="(item, index) in messageList"
          :options="item.options"
          :key="index"
        >
          <view
            class="relative flex p-6 mb-5 bg-white rounded-lg shadow-md"
            @click="handleMessageClick(item)"
          >
            <view class="flex items-center mr-5" v-if="isEdit">
              <u-checkbox
                :checked="selectedMessages.includes(item.id)"
                @click.stop="toggleSelect(item.id)"
              />
            </view>
            <view class="flex items-center justify-between mb-3">
              <text class="text-[32rpx] font-bold text-[#333]">{{ item.title }}</text>
              <text class="text-[24rpx] text-[#999]">{{ item.time }}</text>
            </view>
            <view class="text-[28rpx] leading-6 text-[#666]">
              {{ item.content }}
            </view>
            <view
              v-if="item.unread"
              class="absolute top-6 right-6 w-4 h-4 bg-[#ff6b35] rounded-full"
            ></view>
          </view>
        </up-swipe-action-item>
      </up-swipe-action>
    </view>
    <view
      class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between h-[100rpx] p-7 bg-white shadow-lg"
      v-if="isEdit"
    >
      <view class="flex items-center gap-2" @click="toggleSelectAll">
        <u-checkbox :checked="isAllSelected" />
        <text>全选</text>
      </view>
      <view class="flex items-center">
        <view class="mx-2 text-red">
          <u-button type="text" @click="deleteSelected" :disabled="!selectedMessages.length">
            删除
          </u-button>
        </view>
        <view class="ml-2">
          <u-button type="text" @click="isEdit = false">取消</u-button>
        </view>
      </view>
    </view>

    <u-popup
      v-model="showOper"
      position="bottom"
      custom-style="border-radius:32rpx 32rpx 0 0;"
      :safe-area-inset-bottom="true"
      :zIndex="9999"
    >
      <view
        class="my-2 text-center text-base"
        @click="
          () => {
            showOper = false
            isEdit = true
          }
        "
      >
        <text>批量删除</text>
      </view>
      <view class="my-2 text-center text-base" @click="markAllAsRead">
        <text>全部标记为已读</text>
      </view>
      <view class="my-2 text-center text-base" @click="showOper = false">
        <text>取消</text>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// #ifndef H5
// 获取窗口信息
const windowInfo = uni.getWindowInfo()
// #endif

// #ifdef MP-WEIXIN
// 获取胶囊左边界坐标
const { left } = uni.getMenuButtonBoundingClientRect()
// 计算胶囊(包括右边距)占据屏幕的总宽度：屏幕宽度-胶囊左边界坐标
const rightSafeArea = windowInfo.windowWidth - left
// #endif

const messageList = ref([
  {
    id: 1,
    title: '系统通知',
    content: '欢迎使用本系统',
    time: '2024-01-01 12:00',
    unread: true,
    options: [
      {
        text: '置顶',
        style: {
          backgroundColor: '#3c9cff',
        },
      },
      {
        text: '删除',
        style: {
          backgroundColor: '#ff6b35',
        },
      },
    ],
  },
  {
    id: 2,
    title: '订单提醒',
    content: '您的订单已发货',
    time: '2024-01-02 15:30',
    unread: false,
    options: [
      {
        text: '置顶',
        style: {
          backgroundColor: '#3c9cff',
        },
      },
      {
        text: '删除',
        style: {
          backgroundColor: '#f9ae3d',
        },
      },
    ],
  },
])

const isEdit = ref(false)
const showOper = ref(false)
const selectedMessages = ref<number[]>([])
const isAllSelected = computed(() => messageList.value.length === selectedMessages.value.length)

const toggleSelect = (id: number) => {
  const index = selectedMessages.value.indexOf(id)
  if (index === -1) {
    selectedMessages.value.push(id)
  } else {
    selectedMessages.value.splice(index, 1)
  }
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedMessages.value = []
  } else {
    selectedMessages.value = messageList.value.map((msg) => msg.id)
  }
}

const markAllAsRead = () => {
  messageList.value = messageList.value.map((msg) => ({ ...msg, unread: false }))
  showOper.value = false
}

const handleSwipeClick = (event: any, message: any) => {
  if (event === '删除') {
    uni.showModal({
      title: '提示',
      content: '确定要删除该消息吗？',
      success: (res) => {
        if (res.confirm) {
          messageList.value = messageList.value.filter((msg) => msg.id !== message.id)
        }
      },
    })
  }
}

const deleteSelected = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除选中的消息吗？',
    success: (res) => {
      if (res.confirm) {
        messageList.value = messageList.value.filter(
          (msg) => !selectedMessages.value.includes(msg.id),
        )
        selectedMessages.value = []
        isEdit.value = false
      }
    },
  })
}

const handleMessageClick = (message) => {
  if (isEdit.value) return
  message.unread = false
  uni.navigateTo({
    url: `/pages/public/richtext?id=${message.id}&title=${message.title}`,
  })
}
</script>

<style scoped lang="scss">
// 这里的样式已经通过unocss进行了优化，具体样式在模板中已应用
</style>
