<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <!-- 搜索栏 -->
    <UNavbar :is-fixed="true">
      <up-search
        style="width: 100%"
        v-model="params.keyword"
        :actionText="t('cancel')"
        :placeholder="t('searchPlaceholder')"
        @search="handleSearch"
        @clear="handleClear"
      ></up-search>
    </UNavbar>

    <!-- 搜索历史和热门搜索 -->
    <view class="bg-[#ffffff] min-h-screen" v-if="!showSearchResults">
      <!-- 热门搜索 -->
      <view class="px-4 py-4">
        <view class="flex justify-between items-center mb-3">
          <view class="flex items-center gap-2">
            <text class="font-semibold text-base text-gray-800">热门搜索</text>
            <view
              class="flex items-center px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            >
              <text class="text-[10px] text-white">HOT</text>
            </view>
          </view>
        </view>
        <!-- 热门搜索列表 -->
        <view class="grid grid-cols-2 gap-2">
          <view
            v-for="(keyword, index) in hotKeywordList"
            :key="index"
            class="flex items-center gap-2 truncate py-2 px-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            @click="handleKeywordClick(keyword)"
          >
            <text
              class="flex-shrink-0 w-4 h-4 leading-4 text-center text-[10px] font-medium"
              :class="index < 3 ? 'text-orange-500' : 'text-gray-400'"
            >
              {{ index + 1 }}
            </text>
            <text class="truncate text-sm text-gray-700">{{ keyword }}</text>
          </view>
        </view>
      </view>

      <!-- 搜索历史 -->
      <view class="px-4 py-3" v-if="oldKeywordList.length > 0">
        <view class="flex justify-between items-center mb-2">
          <text class="font-semibold text-base">搜索历史</text>
          <text class="text-sm text-gray-500" @click="handleClearHistory">清空</text>
        </view>
        <!-- 历史搜索列表 -->
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(keyword, index) in oldKeywordList"
            :key="index"
            class="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer max-w-[40%]"
            @click="handleKeywordClick(keyword)"
          >
            <span class="text-sm truncate block">{{ keyword }}</span>
          </div>
        </div>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view v-else>
      <!-- 搜索条件栏 -->
      <view class="navbar">
        <view
          v-for="(item, index) in sortOptions"
          :key="index"
          class="nav-item"
          :class="{ current: filterIndex === index }"
          @click="handleSort(index, item.type)"
        >
          <text>{{ item.label }}</text>
          <!-- 排序箭头 -->
          <view class="sort-arrows" v-if="item.sortable">
            <image class="sort-arrow" :src="getSortArrowSrc(item.type, 'up')" mode="aspectFit" />
            <image class="sort-arrow" :src="getSortArrowSrc(item.type, 'down')" mode="aspectFit" />
          </view>
        </view>
      </view>

      <!-- 搜索结果列表 -->
      <view class="search-results">
        <!-- 结果内容 -->
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'

const { safeAreaInsets } = uni.getSystemInfoSync()

// 状态管理
const showSearchResults = ref(false)
const filterIndex = ref(0)
const params = ref({
  keyword: '',
  pageNumber: 1,
  pageSize: 10,
  sort: '',
  order: '',
})

// 搜索数据
const hotKeywordList = ref([
  '平板电脑',
  '虚拟',
  '薯条',
  '荷兰双牛全脂奶粉400g',
  '荷兰双牛全脂奶粉',
  '男士内裤',
  '男士内裤 豹纹',
  '包',
  '"荷兰双牛全脂奶粉"',
  '钢琴',
])

const oldKeywordList = ref(['手机', '耳机', '笔记本电脑', '荷兰双牛全脂奶粉400g'])

// 排序选项
const sortOptions = [
  { label: '综合排序', type: '' },
  { label: '销量', type: 'buyCount', sortable: true },
  { label: '价格', type: 'price', sortable: true },
  { label: '筛选', type: 'filter' },
]

// 方法
const handleSearch = () => {
  if (!params.value.keyword) return
  showSearchResults.value = true
  saveSearchHistory(params.value.keyword)
  // 执行搜索
}

const handleClear = () => {
  showSearchResults.value = false
  params.value.keyword = ''
}

const handleKeywordClick = (keyword: string) => {
  params.value.keyword = keyword
  handleSearch()
}

const handleClearHistory = () => {
  oldKeywordList.value = []
  // 清除本地存储
}

const handleSort = (index: number, type: string) => {
  filterIndex.value = index
  if (!type || type === 'filter') return

  if (params.value.sort === type) {
    params.value.order = params.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    params.value.sort = type
    params.value.order = 'desc'
  }
  // 重新搜索
}

const getSortArrowSrc = (type: string, direction: 'up' | 'down') => {
  if (params.value.sort !== type) {
    return `/static/index/arrow-${direction}.png`
  }
  const isActive = direction === 'up' ? params.value.order === 'asc' : params.value.order === 'desc'
  return `/static/index/arrow-${direction}${isActive ? '-1' : ''}.png`
}

const saveSearchHistory = (keyword: string) => {
  if (!oldKeywordList.value.includes(keyword)) {
    oldKeywordList.value.unshift(keyword)
    if (oldKeywordList.value.length > 10) {
      oldKeywordList.value.pop()
    }
    // 保存到本地存储
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #ff6b35;
$text-color: #303133;
/* 搜索条件导航栏 */
.navbar {
  z-index: 10;
  display: flex;
  width: 100%;
  height: 80rpx;
  background: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
  /* 导航项 */
  .nav-item {
    position: relative;
    display: flex;
    flex: 1;
    gap: 4rpx;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 28rpx;
    color: $text-color;
    transition: color 0.3s;
    /* 当前选中项样式 */
    &.current {
      font-weight: 500;
      color: $primary-color;
      /* 底部指示器 */
      &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 40rpx;
        height: 4rpx;
        content: '';
        background: $primary-color;
        border-radius: 2rpx;
        transform: translateX(-50%);
      }
    }
  }
}
/* 排序箭头容器 */
.sort-arrows {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}
/* 排序箭头图标 */
.sort-arrow {
  width: 24rpx;
  height: 24rpx;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
}
/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  .navbar {
    background: #1c1c1e;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.2);
  }
}
</style>
