<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <UNavbar class="pl-2" :is-back="false" :is-fixed="true" :title="t('message')">
      <template v-slot:right>
        <view class="px-2">
          <up-icon @click="showOper = true" name="more-dot-fill"></up-icon>
        </view>
      </template>
    </UNavbar>
    <!-- 消息列表 -->
    <view class="p-2">
      <up-swipe-action>
        <up-swipe-action-item
          v-for="(item, index) in messageList"
          :options="options"
          :key="index"
          style="overflow: inherit"
        >
          <view
            class="relative flex flex-col p-6 mb-5 bg-white rounded-lg shadow-md"
            @click="handleMessageClick(item)"
          >
            <!-- 选择框 -->
            <view class="flex items-center mr-5" v-if="isEdit">
              <u-checkbox
                :checked="selectedMessages.includes(item.id)"
                @click.stop="toggleSelect(item.id)"
              />
            </view>
            <!-- 消息头部 -->
            <view class="flex items-center justify-between mb-3">
              <text class="text-[32rpx] font-bold text-[#333]">{{ item.title }}</text>
              <text class="text-[24rpx] text-[#999]">{{ item.time }}</text>
            </view>
            <!-- 消息内容 -->
            <view class="text-[28rpx] leading-6 text-[#666] line-clamp-2">
              {{ item.content }}
            </view>
            <!-- 未读标记 -->
            <u-badge
              v-if="item.unread"
              :absolute="true"
              :offset="['-10rpx', '10rpx']"
              type="error"
            />
          </view>
        </up-swipe-action-item>
      </up-swipe-action>
    </view>

    <!-- 底部操作栏 -->
    <view
      class="fixed bottom-0 left-0 right-0 z-99999 flex items-center justify-between h-[80rpx] px-5 bg-white shadow-lg"
      v-if="isEdit"
      :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
    >
      <view class="flex items-center gap-2" @click="toggleSelectAll">
        <u-checkbox :checked="isAllSelected" />
        <text>全选</text>
      </view>
      <view class="flex items-center">
        <view class="mx-2">
          <up-button
            type="error"
            size="mini"
            @click="deleteSelected"
            :disabled="!selectedMessages.length"
          >
            删除
          </up-button>
        </view>
        <view class="ml-2">
          <up-button type="info" size="mini" @click="isEdit = false">取消</up-button>
        </view>
      </view>
    </view>

    <!-- 底部弹出菜单 -->
    <up-popup :show="showOper" mode="bottom" :round="10">
      <up-cell-group>
        <up-cell
          title="批量删除"
          @click="
            () => {
              showOper = false
              isEdit = true
            }
          "
        />
        <up-cell title="全部标记为已读" @click="markAllAsRead" />
        <up-cell title="取消" @click="showOper = false" />
      </up-cell-group>
    </up-popup>

    <!-- 空状态 -->
    <up-empty v-if="!messageList.length" mode="message" text="暂无消息" />
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const options = ref<any[]>([
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
])

// 消息列表数据
const messageList = ref([
  {
    id: 1,
    title: '系统通知',
    content: '欢迎使用本系统',
    time: '2024-01-01 12:00',
    unread: true,
  },
  {
    id: 2,
    title: '订单提醒',
    content: '您的订单已发货',
    time: '2024-01-02 15:30',
    unread: false,
  },
])

// 编辑状态相关
const isEdit = ref(false)
const showOper = ref(false)
const selectedMessages = ref<number[]>([])
const isAllSelected = computed(() => messageList.value.length === selectedMessages.value.length)

// 选择消息
const toggleSelect = (id: number) => {
  const index = selectedMessages.value.indexOf(id)
  if (index === -1) {
    selectedMessages.value.push(id)
  } else {
    selectedMessages.value.splice(index, 1)
  }
}

// 全选/取消全选
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedMessages.value = []
  } else {
    selectedMessages.value = messageList.value.map((msg) => msg.id)
  }
}

// 标记全部已读
const markAllAsRead = () => {
  messageList.value = messageList.value.map((msg) => ({ ...msg, unread: false }))
  showOper.value = false
  uni.showToast({
    title: '已全部标记为已读',
    icon: 'success',
  })
}

// 处理滑动操作
const handleSwipeClick = (event: any, message: any) => {
  if (event === '删除') {
    uni.showModal({
      title: '提示',
      content: '确定要删除该消息吗？',
      success: (res) => {
        if (res.confirm) {
          messageList.value = messageList.value.filter((msg) => msg.id !== message.id)
          uni.showToast({
            title: '删除成功',
            icon: 'success',
          })
        }
      },
    })
  }
}

// 删除选中消息
const deleteSelected = () => {
  if (!selectedMessages.value.length) return
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
        uni.showToast({
          title: '删除成功',
          icon: 'success',
        })
      }
    },
  })
}

// 点击消息
const handleMessageClick = (message) => {
  if (isEdit.value) return
  message.unread = false
  uni.navigateTo({
    url: `/pages/public/richtext?id=${message.id}&title=${encodeURIComponent(message.title)}`,
  })
}
</script>

<style scoped lang="scss">
// 使用unocss进行样式优化
</style>
