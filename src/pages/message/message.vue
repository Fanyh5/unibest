<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="message-page" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <UNavbar class="navbar" :is-back="false" :is-fixed="true" :title="t('message')">
      <template v-slot:right>
        <view class="action-btn" @click="showOper = true">
          <up-icon name="more-dot-fill" size="44rpx" color="#333"></up-icon>
        </view>
      </template>
    </UNavbar>

    <!-- 消息列表 -->
    <view class="message-list" :style="{ paddingBottom: isEdit ? '180rpx' : '24rpx' }">
      <up-swipe-action>
        <up-swipe-action-item
          v-for="(item, index) in messageList"
          :options="options"
          :key="index"
          class="message-item-wrapper"
          @click="handleSwipeClick($event, item)"
        >
          <view
            class="message-item"
            :class="{
              'message-item--unread': item.unread,
              'message-item--selected': isEdit && selectedMessages.includes(item.id),
            }"
            @click="handleMessageClick(item)"
          >
            <!-- 选择框 -->
            <view v-if="isEdit" class="checkbox-wrapper" @click.stop="toggleSelect(item.id)">
              <checkbox
                :checked="selectedMessages.includes(item.id)"
                class="checkbox"
                :disabled="!item.unread && isReadOnlySelect"
              />
            </view>

            <!-- 消息内容区 -->
            <view class="message-content" :class="{ 'has-checkbox': isEdit }">
              <!-- 消息头部 -->
              <view class="message-header">
                <text class="message-title">{{ item.title }}</text>
                <text class="message-time">{{ formatTime(item.time) }}</text>
              </view>

              <!-- 消息内容 -->
              <view class="message-body">
                {{ item.content }}
              </view>

              <!-- 未读标记 -->
              <u-badge
                v-if="item.unread"
                :absolute="true"
                :offset="['-16rpx', '16rpx']"
                type="error"
                :show="!isEdit"
              />
            </view>
          </view>
        </up-swipe-action-item>
      </up-swipe-action>

      <!-- 空状态 -->
      <view v-if="!messageList.length" class="empty-state">
        <up-icon name="info" size="80rpx" color="#999"></up-icon>
        <text class="empty-text">暂无消息</text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view
      v-if="isEdit"
      class="bottom-bar"
      :style="{
        paddingBottom: `calc(${safeAreaInsets?.bottom}px + 24rpx)`,
      }"
    >
      <view class="select-all">
        <checkbox
          :checked="isAllSelected"
          class="checkbox"
          :disabled="!messageList.length"
          @click="toggleSelectAll"
        />
        <text class="select-text" @click="messageList.length && toggleSelectAll">
          全选 {{ isAllSelected ? `(${selectedMessages.length})` : '' }}
        </text>
      </view>
      <view class="action-buttons">
        <up-button
          class="action-btn mark-btn"
          type="primary"
          size="small"
          :disabled="!hasSelectedUnread"
          @click="markSelectedAsRead"
        >
          <template #icon>
            <up-icon name="checkmark-circle-fill" size="32rpx" color="#fff"></up-icon>
          </template>
          标为已读 {{ selectedUnreadCount ? `(${selectedUnreadCount})` : '' }}
        </up-button>
        <up-button
          class="action-btn delete-btn"
          type="error"
          size="small"
          :disabled="!selectedMessages.length"
          @click="deleteSelected"
        >
          <template #icon>
            <up-icon name="trash-fill" size="32rpx" color="#fff"></up-icon>
          </template>
          删除 {{ selectedMessages.length ? `(${selectedMessages.length})` : '' }}
        </up-button>
        <up-button class="action-btn cancel-btn" type="info" size="small" plain @click="cancelEdit">
          取消
        </up-button>
      </view>
    </view>

    <!-- 底部弹出菜单 -->
    <up-popup
      :show="showOper"
      mode="bottom"
      :round="20"
      @close="showOper = false"
      safe-area-inset-bottom
      class="action-popup"
    >
      <view class="popup-header">
        <text class="popup-title">消息操作</text>
        <up-icon
          name="close"
          size="40rpx"
          color="#999"
          @click="showOper = false"
          class="close-icon"
        ></up-icon>
      </view>
      <up-cell-group>
        <up-cell
          title="批量删除"
          :title-style="{ fontSize: '32rpx', fontWeight: 500 }"
          hover-class="cell-hover"
          @click="
            () => {
              showOper = false
              isEdit = true
              isReadOnlySelect = false
            }
          "
        >
          <template #icon>
            <up-icon name="trash-fill" size="40rpx" color="#ff6b6b" class="cell-icon"></up-icon>
          </template>
        </up-cell>
        <up-cell
          title="批量标记已读"
          :title-style="{ fontSize: '32rpx', fontWeight: 500 }"
          hover-class="cell-hover"
          :disabled="!hasUnread"
          @click="
            () => {
              showOper = false
              isEdit = true
              isReadOnlySelect = true
            }
          "
        >
          <template #icon>
            <up-icon
              name="checkmark-circle-fill"
              size="40rpx"
              :color="hasUnread ? '#19be6b' : '#ccc'"
              class="cell-icon"
            ></up-icon>
          </template>
        </up-cell>
        <up-cell
          title="全部标记已读"
          :title-style="{ fontSize: '32rpx', fontWeight: 500 }"
          hover-class="cell-hover"
          :disabled="!hasUnread"
          @click="markAllAsRead"
        >
          <template #icon>
            <up-icon
              name="checkmark-circle-fill"
              size="40rpx"
              :color="hasUnread ? '#19be6b' : '#ccc'"
              class="cell-icon"
            ></up-icon>
          </template>
        </up-cell>
      </up-cell-group>
    </up-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import UNavbar from '@/components/navbar/u-navbar.vue'
import dayjs from 'dayjs'

const { t } = useI18n()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 消息列表数据
const messageList = ref([
  {
    id: 1,
    title: '系统通知',
    content: '您的订单已发货，请注意查收',
    time: '2024-12-18 10:00',
    unread: true,
  },
  {
    id: 2,
    title: '活动通知',
    content: '双12优惠活动即将开始，敬请期待',
    time: '2024-12-17 15:30',
    unread: false,
  },
])

// 编辑状态
const isEdit = ref(false)
const showOper = ref(false)
const selectedMessages = ref<number[]>([])
const isReadOnlySelect = ref(false)

// 计算属性
const isAllSelected = computed(
  () => messageList.value.length > 0 && messageList.value.length === selectedMessages.value.length,
)
const hasUnread = computed(() => messageList.value.some((msg) => msg.unread))
const hasSelectedUnread = computed(() =>
  selectedMessages.value.some((id) => messageList.value.find((msg) => msg.id === id)?.unread),
)
const selectedUnreadCount = computed(
  () =>
    selectedMessages.value.filter((id) => messageList.value.find((msg) => msg.id === id)?.unread)
      .length,
)

// 滑动操作配置
const options = [
  {
    text: '标为已读',
    style: { backgroundColor: '#19be6b' },
  },
  {
    text: '删除',
    style: { backgroundColor: '#ff6b6b' },
  },
]

// 格式化时间
const formatTime = (time: string) => {
  const messageTime = dayjs(time)
  const now = dayjs()

  if (messageTime.isSame(now, 'day')) {
    return messageTime.format('HH:mm')
  } else if (messageTime.isSame(now.subtract(1, 'day'), 'day')) {
    return '昨天'
  } else if (messageTime.isSame(now, 'year')) {
    return messageTime.format('MM-DD')
  }
  return messageTime.format('YYYY-MM-DD')
}

// 选择消息
const toggleSelect = (id: number) => {
  if (isReadOnlySelect.value) {
    const message = messageList.value.find((msg) => msg.id === id)
    if (!message?.unread) return
  }

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
    if (isReadOnlySelect.value) {
      selectedMessages.value = messageList.value.filter((msg) => msg.unread).map((msg) => msg.id)
    } else {
      selectedMessages.value = messageList.value.map((msg) => msg.id)
    }
  }
}

// 标记消息已读
const markAsRead = (ids: number[]) => {
  messageList.value = messageList.value.map((msg) => {
    if (ids.includes(msg.id) && msg.unread) {
      return { ...msg, unread: false }
    }
    return msg
  })
}

// 标记选中消息已读
const markSelectedAsRead = async () => {
  if (!hasSelectedUnread.value) return

  const unreadIds = selectedMessages.value.filter(
    (id) => messageList.value.find((msg) => msg.id === id)?.unread,
  )

  markAsRead(unreadIds)
  uni.showToast({ title: '已标记为已读', icon: 'success' })
  isEdit.value = false
}

// 标记全部已读
const markAllAsRead = async () => {
  if (!hasUnread.value) {
    uni.showToast({ title: '没有未读消息', icon: 'none' })
    showOper.value = false
    return
  }

  const unreadIds = messageList.value.filter((msg) => msg.unread).map((msg) => msg.id)
  markAsRead(unreadIds)
  uni.showToast({ title: '已全部标记为已读', icon: 'success' })
  showOper.value = false
}

// 删除消息
const deleteMessages = (ids: number[]) => {
  messageList.value = messageList.value.filter((msg) => !ids.includes(msg.id))
  selectedMessages.value = selectedMessages.value.filter((id) => !ids.includes(id))
}

// 删除选中消息
const deleteSelected = async () => {
  if (!selectedMessages.value.length) return

  const result: any = await new Promise((resolve) => {
    uni.showModal({
      title: '确认删除',
      content: '是否删除选中的消息？',
      confirmColor: '#ff6b6b',
      success: resolve,
    })
  })

  if (result.confirm) {
    deleteMessages(selectedMessages.value)
    uni.showToast({ title: '删除成功', icon: 'success' })
    if (messageList.value.length === 0) {
      isEdit.value = false
    }
  }
}

// 取消编辑
const cancelEdit = () => {
  isEdit.value = false
  isReadOnlySelect.value = false
  selectedMessages.value = []
}

// 处理滑动操作点击
const handleSwipeClick = async (event: any, message: any) => {
  const { index } = event
  if (index === 0) {
    // 标为已读
    if (!message.unread) {
      uni.showToast({ title: '该消息已读', icon: 'none' })
      return
    }
    markAsRead([message.id])
    uni.showToast({ title: '已标记为已读', icon: 'success' })
  } else if (index === 1) {
    // 删除
    const result: any = await new Promise((resolve) => {
      uni.showModal({
        title: '确认删除',
        content: '是否删除此消息？',
        confirmColor: '#ff6b6b',
        success: resolve,
      })
    })
    if (result.confirm) {
      deleteMessages([message.id])
      uni.showToast({ title: '删除成功', icon: 'success' })
    }
  }
}

// 点击消息
const handleMessageClick = (message: any) => {
  if (isEdit.value) return
  if (message.unread) {
    markAsRead([message.id])
  }
  // TODO: 跳转到消息详情页
  uni.showToast({ title: '查看消息详情', icon: 'none' })
}
</script>

<style scoped lang="scss">
.message-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

// 通用按钮样式
.action-btn {
  &:active {
    opacity: 0.8;
  }
}

.navbar {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;

  .action-btn {
    padding: 20rpx;
    border-radius: 50%;
    transition: opacity 0.2s;
  }
}

.message-list {
  padding: 24rpx;
}

.message-item-wrapper {
  margin-bottom: 24rpx;
  overflow: hidden;
  border-radius: 16rpx;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
}

.message-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 32rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &--unread {
    background: #fff9f9;
    border-left: 6rpx solid #ff6b6b;
  }

  &--selected {
    background: #f0f7ff;
    border-left: 6rpx solid #2979ff;
  }
}

.checkbox-wrapper {
  padding: 8rpx 24rpx 8rpx 0;

  .checkbox {
    transform: scale(0.9);
  }
}

.message-content {
  flex: 1;
  min-width: 0;

  &.has-checkbox {
    margin-left: 16rpx;
  }
}

.message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.message-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.message-time {
  font-size: 24rpx;
  color: #999;
}

.message-body {
  display: -webkit-box;
  overflow: hidden;
  font-size: 28rpx;
  line-height: 1.6;
  color: #666;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;

  .empty-text {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #999;
  }
}

.bottom-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx 0;
  background: #ffffff;
  box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.05);
}

.select-all {
  display: flex;
  gap: 12rpx;
  align-items: center;

  .checkbox {
    transform: scale(0.9);
  }

  .select-text {
    font-size: 28rpx;
    color: #666;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
}

.action-buttons {
  display: flex;
  gap: 20rpx;

  .action-btn {
    min-width: 160rpx;
    height: 72rpx;
    font-size: 28rpx;
    font-weight: 500;
    border-radius: 36rpx;

    &.mark-btn {
      background: linear-gradient(135deg, #19be6b, #23d688);
      border: none;

      :deep(.u-icon) {
        margin-right: 8rpx;
      }

      &:disabled {
        background: #ccc;
        opacity: 0.6;
      }
    }

    &.delete-btn {
      background: linear-gradient(135deg, #ff6b6b, #ff8585);
      border: none;

      :deep(.u-icon) {
        margin-right: 8rpx;
      }

      &:disabled {
        background: #ccc;
        opacity: 0.6;
      }
    }

    &.cancel-btn {
      color: #666;
      border-color: #e4e4e4;
    }
  }
}

.action-popup {
  :deep(.up-popup__content) {
    padding-bottom: calc(var(--window-bottom) + 24rpx);
  }

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    border-bottom: 1px solid #f5f5f5;

    .popup-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }

    .close-icon {
      padding: 12rpx;
      border-radius: 50%;
      transition: opacity 0.2s;

      &:active {
        opacity: 0.8;
      }
    }
  }
  :deep(.up-cell) {
    padding: 32rpx !important;

    .cell-icon {
      margin-right: 24rpx;
    }
  }

  :deep(.up-cell--disabled) {
    pointer-events: none;
    opacity: 0.5;
  }

  .cell-hover {
    background-color: #f5f5f5;
  }
}
</style>
