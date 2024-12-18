<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="content overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('points')" :placeholder="true" :autoBack="true"></up-navbar>

    <!-- 积分头部卡片 -->
    <view class="portrait-box">
      <image class="point-bg" src="/static/mine/point/point_bg_1.png"></image>
      <image class="point-img" src="/static/mine/point/tradehall.png" />
      <view class="total-points">
        <text class="points-value">{{ remainPoints }}</text>
        <text class="points-label">当前积分</text>
      </view>
      <view class="position-point">
        <view class="apply-point" @click="handleApplyPoint">申请积分</view>
      </view>
    </view>

    <!-- 积分快捷操作 -->
    <view class="points-actions">
      <view
        class="action-item"
        v-for="(action, index) in quickActions"
        :key="index"
        @click="handleQuickAction(action)"
      >
        <image :src="action.icon" mode="aspectFit" />
        <text>{{ action.name }}</text>
      </view>
    </view>

    <!-- 积分统计 -->
    <view class="points-summary">
      <view class="summary-item">
        <text class="value">{{ totalPoints }}</text>
        <text class="label">累计获得</text>
      </view>
      <view class="divider"></view>
      <view class="summary-item">
        <text class="value">{{ usedPoints }}</text>
        <text class="label">已使用</text>
      </view>
      <view class="divider"></view>
      <view class="summary-item">
        <text class="value">{{ expirePoints }}</text>
        <text class="label">即将过期</text>
      </view>
    </view>

    <!-- 积分任务 -->
    <view class="points-tasks" v-if="showTasks">
      <view class="section-title">
        <text>每日任务</text>
        <text class="subtitle">完成任务领积分</text>
      </view>
      <view class="task-list">
        <view v-for="(task, index) in dailyTasks" :key="index" class="task-item">
          <view class="task-info">
            <image :src="task.icon" mode="aspectFit" />
            <view class="task-detail">
              <text class="task-name">{{ task.name }}</text>
              <text class="task-desc">{{ task.description }}</text>
            </view>
          </view>
          <view class="task-action">
            <text class="task-points">+{{ task.points }}</text>
            <button
              :class="['task-btn', { completed: task.completed }]"
              @click="handleTaskAction(task)"
            >
              {{ task.completed ? '已完成' : '去完成' }}
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 积分明细标题 -->
    <view class="section-title points-record-title">
      <text>积分明细</text>
      <view class="filter-actions">
        <picker
          mode="selector"
          :range="filterOptions"
          :value="currentFilterIndex"
          @change="handleFilterChange"
        >
          <text class="filter-text">{{ filterOptions[currentFilterIndex] }}</text>
        </picker>
      </view>
    </view>

    <!-- 积分列表 -->
    <view class="points-list" v-if="pointsList.length > 0">
      <view
        v-for="(item, index) in pointsList"
        :key="index"
        class="list-item"
        :class="{ minus: item.points < 0 }"
      >
        <wd-row>
          <wd-col :span="20">
            <view class="item-desc">
              <text>{{ item.desc }}</text>
              <text class="item-tag" v-if="item.tag">{{ item.tag }}</text>
            </view>
            <view class="item-time">
              <text>{{ item.time }}</text>
            </view>
          </wd-col>
          <wd-col :span="4">
            <view class="item-points">
              <text>{{ item.points > 0 ? '+' : '' }}{{ item.points }}</text>
            </view>
          </wd-col>
        </wd-row>
      </view>
      <wd-loadmore :state="loadState" @reload="loadMore" />
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <image src="/static/mine/point/empty.png" mode="aspectFit" />
      <text>暂无积分记录</text>
    </view>

    <!-- 积分规则弹窗 -->
    <wd-popup v-model="showRules" position="bottom" round closeable>
      <view class="rules-popup">
        <view class="rules-title">积分规则</view>
        <scroll-view scroll-y class="rules-content">
          <view v-for="(rule, index) in pointRules" :key="index" class="rule-item">
            <text class="rule-index">{{ index + 1 }}</text>
            <text class="rule-text">{{ rule }}</text>
          </view>
        </scroll-view>
      </view>
    </wd-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'

const { safeAreaInsets } = uni.getSystemInfoSync()
const { t } = useI18n()

// 数据状态
const totalPoints = ref(1000)
const remainPoints = ref(800)
const usedPoints = ref(200)
const expirePoints = ref(50)
const pointsList = ref([])
const loadState = ref('loading')
const maxItems = 100
const currentFilterIndex = ref(0)
const filterOptions = ['全部', '获取', '使用', '过期']
const showRules = ref(false)
const showTasks = ref(true)

// 快捷操作
const quickActions = [
  { name: '积分商城', icon: '/static/mine/point/shop.png', action: 'shop' },
  { name: '积分规则', icon: '/static/mine/point/rule.png', action: 'rules' },
  { name: '任务中心', icon: '/static/mine/point/task.png', action: 'tasks' },
  { name: '积分排行', icon: '/static/mine/point/rank.png', action: 'rank' },
]

// 每日任务
const dailyTasks = ref([
  {
    icon: '/static/mine/point/sign.png',
    name: '每日签到',
    description: '连续签到积分翻倍',
    points: 10,
    completed: false,
  },
  {
    icon: '/static/mine/point/share.png',
    name: '分享商品',
    description: '分享商品给好友',
    points: 5,
    completed: false,
  },
  {
    icon: '/static/mine/point/browse.png',
    name: '浏览商品',
    description: '浏览商品5分钟',
    points: 3,
    completed: false,
  },
])

// 积分规则
const pointRules = [
  '积分有效期为一年，请及时使用',
  '每日签到可获得基础积分，连续签到积分翻倍',
  '分享商品给好友可获得额外积分奖励',
  '购物时可使用积分抵扣，100积分=1元',
  '积分不可转让，不可提现',
  '如有疑问，请联系客服',
]

// 方法
const handleClickLeft = () => {
  uni.navigateBack()
}

const handleApplyPoint = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
}

const handleQuickAction = (action) => {
  switch (action.action) {
    case 'shop':
      uni.navigateTo({ url: '/pages/shop/points-mall' })
      break
    case 'rules':
      showRules.value = true
      break
    case 'tasks':
      showTasks.value = !showTasks.value
      break
    case 'rank':
      uni.navigateTo({ url: '/pages/user/points-rank' })
      break
  }
}

const handleTaskAction = (task) => {
  if (task.completed) return
  // 这里添加任务完成的逻辑
  uni.showLoading({ title: '加载中' })
  setTimeout(() => {
    task.completed = true
    remainPoints.value += task.points
    totalPoints.value += task.points
    uni.hideLoading()
    uni.showToast({
      title: `获得${task.points}积分`,
      icon: 'none',
    })
  }, 1000)
}

const handleFilterChange = (e) => {
  currentFilterIndex.value = e.detail.value
  pointsList.value = [] // 清空列表
  loadMore() // 重新加载
}

const loadMore = async () => {
  if (loadState.value === 'loading') return
  loadState.value = 'loading'

  // 模拟加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      desc: '购物奖励',
      time: '2024-12-18 20:58',
      points: Math.random() > 0.5 ? 100 : -50,
      tag: Math.random() > 0.5 ? '已过期' : '',
    }))

    pointsList.value.push(...newItems)
    loadState.value = pointsList.value.length >= maxItems ? 'nomore' : 'loadmore'
  }, 1000)
}

// 触底加载
onReachBottom(() => {
  if (pointsList.value.length < maxItems) {
    loadMore()
  }
})

// 初始化
onMounted(() => {
  loadMore()
})
</script>

<style lang="scss" scoped>
.portrait-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 320rpx;
  margin: 24rpx 24rpx 0;
  overflow: hidden;
  color: #ffffff;
  background: linear-gradient(135deg, #ff6b35ff 0%, #ff9f28ff 100%);
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(255, 107, 53, 0.2);

  .point-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 263rpx;
    height: 250rpx;
    opacity: 0.8;
    transform: rotateY(180deg);
  }

  .total-points {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16rpx;

    .points-value {
      margin-bottom: 8rpx;
      font-size: 64rpx;
      font-weight: 600;
      line-height: 1;
    }

    .points-label {
      font-size: 28rpx;
      opacity: 0.9;
    }
  }

  .position-point {
    position: absolute;
    top: 0;
    right: 0;

    .apply-point {
      width: 160rpx;
      height: 56rpx;
      margin-top: 24rpx;
      font-size: 28rpx;
      font-weight: 500;
      line-height: 56rpx;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
      border-radius: 28rpx 0 0 28rpx;
      transition: all 0.3s ease;

      &:active {
        background: rgba(255, 255, 255, 0.35);
      }
    }
  }

  .point-img {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 24rpx;
    transition: transform 0.3s ease;

    &:active {
      transform: scale(1.05);
    }
  }
}

.points-actions {
  display: flex;
  justify-content: space-around;
  padding: 32rpx 24rpx;
  margin: -20rpx 24rpx 0;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  image {
    width: 64rpx;
    height: 64rpx;
    margin-bottom: 12rpx;
  }
  text {
    font-size: 24rpx;
    color: #666666;
  }
}

.points-summary {
  display: flex;
  align-items: center;
  padding: 32rpx 24rpx;
  margin: 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .summary-item {
    flex: 1;
    text-align: center;

    .value {
      display: block;
      margin-bottom: 8rpx;
      font-size: 36rpx;
      font-weight: 600;
      color: #ff6b35;
    }

    .label {
      font-size: 24rpx;
      color: #999999;
    }
  }

  .divider {
    width: 2rpx;
    height: 40rpx;
    background: #eeeeee;
  }
}

.points-tasks {
  padding: 24rpx;
  margin: 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  image {
    width: 80rpx;
    height: 80rpx;
    margin-right: 24rpx;
  }

  .task-list {
    margin-top: 24rpx;
  }

  .task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .task-info {
      display: flex;
      align-items: center;

      .task-detail {
        .task-name {
          margin-bottom: 8rpx;
          font-size: 28rpx;
          color: #333333;
        }

        .task-desc {
          font-size: 24rpx;
          color: #999999;
        }
      }
    }

    .task-action {
      display: flex;
      align-items: center;

      .task-points {
        margin-right: 24rpx;
        font-size: 32rpx;
        font-weight: 600;
        color: #ff6b35;
      }

      .task-btn {
        width: 140rpx;
        height: 56rpx;
        font-size: 24rpx;
        line-height: 56rpx;
        color: #ffffff;
        text-align: center;
        background: #ff6b35;
        border: none;
        border-radius: 28rpx;

        &.completed {
          background: #cccccc;
        }
      }
    }
  }
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
  margin-bottom: 16rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;

  .subtitle {
    margin-left: 16rpx;
    font-size: 24rpx;
    font-weight: normal;
    color: #999999;
  }

  .filter-actions {
    .filter-text {
      font-size: 28rpx;
      color: #666666;
    }
  }
}

.points-record-title {
  margin-top: 32rpx;
}

.points-list {
  background: #ffffff;

  .list-item {
    position: relative;
    padding: 24rpx;
    transition: background-color 0.3s ease;

    &:active {
      background-color: #f8f8f8;
    }

    &:after {
      position: absolute;
      right: 24rpx;
      bottom: 0;
      left: 24rpx;
      height: 1px;
      content: '';
      background: #eeeeee;
      transform: scaleY(0.5);
    }

    &.minus &.item-points {
      color: #52c41a;
    }

    .item-desc {
      margin-bottom: 8rpx;
      font-size: 28rpx;
      color: #333333;

      .item-tag {
        display: inline-block;
        padding: 4rpx 12rpx;
        margin-left: 12rpx;
        font-size: 20rpx;
        color: #ffffff;
        background: #ff9f28;
        border-radius: 4rpx;
      }
    }

    .item-time {
      font-size: 24rpx;
      color: #999999;
    }

    .item-points {
      font-size: 32rpx;
      font-weight: 600;
      color: #ff6b35;
      text-align: right;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;

  image {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 24rpx;
  }

  text {
    font-size: 28rpx;
    color: #999999;
  }
}

.rules-popup {
  padding: 48rpx 32rpx;

  .rules-title {
    margin-bottom: 32rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: #333333;
    text-align: center;
  }

  .rules-content {
    max-height: 60vh;
  }

  .rule-item {
    display: flex;
    margin-bottom: 24rpx;

    .rule-index {
      width: 40rpx;
      height: 40rpx;
      margin-right: 16rpx;
      font-size: 24rpx;
      line-height: 40rpx;
      color: #ffffff;
      text-align: center;
      background: #ff6b35;
      border-radius: 20rpx;
    }

    .rule-text {
      flex: 1;
      font-size: 28rpx;
      line-height: 1.6;
      color: #666666;
    }
  }
}
</style>
