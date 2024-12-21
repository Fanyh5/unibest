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
    <UNavbar :is-fixed="true" :border-bottom="false">
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
      <view class="flex w-full h-10 bg-white dark:bg-dark-800 shadow-sm">
        <view
          v-for="(item, index) in sortOptions"
          :key="index"
          class="relative flex flex-1 items-center justify-center gap-1 h-full text-sm text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
          :class="{ 'text-orange-500 font-medium': filterIndex === index }"
          @click="handleSort(index, item.type)"
        >
          <text>{{ item.label }}</text>
          <!-- 排序箭头 -->
          <view v-if="item.sortable" class="flex flex-col gap-0.5">
            <image
              class="w-2.5 h-2.5 transition-opacity hover:opacity-80"
              :src="getSortArrowSrc(item.type, 'up')"
              mode="aspectFit"
            />
            <image
              class="w-2.5 h-2.5 transition-opacity hover:opacity-80"
              :src="getSortArrowSrc(item.type, 'down')"
              mode="aspectFit"
            />
          </view>
          <!-- 底部指示器 -->
          <view
            v-if="filterIndex === index"
            class="absolute bottom-0 left-1/2 w-8 h-0.5 bg-orange-500 rounded transform -translate-x-1/2"
          ></view>
        </view>
      </view>

      <!-- 搜索结果列表 -->
      <view class="search-results">
        <!-- 结果内容 -->
      </view>
    </view>

    <!-- 筛选抽屉 -->
    <u-popup :show="showFilter" mode="right" @close="closeFilter">
      <view class="w-[450rpx] h-screen bg-white dark:bg-dark-800 p-4">
        <!-- 价格区间 -->
        <view class="mb-6">
          <text class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
            价格区间
          </text>
          <view class="flex items-center gap-3">
            <input
              type="number"
              v-model="filters.minPrice"
              placeholder="最低价"
              class="flex-1 h-[60rpx] px-3 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:bg-dark-700"
            />
            <text class="text-gray-400">-</text>
            <input
              type="number"
              v-model="filters.maxPrice"
              placeholder="最高价"
              class="flex-1 h-[60rpx] px-3 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:bg-dark-700"
            />
          </view>
        </view>

        <!-- 商品分类 -->
        <view class="mb-6">
          <text class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
            商品分类
          </text>
          <view class="flex flex-wrap gap-3">
            <view
              v-for="(category, index) in categories"
              :key="index"
              class="px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
              :class="
                filters.category === category.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-200'
              "
              @click="selectCategory(category.value)"
            >
              {{ category.label }}
            </view>
          </view>
        </view>

        <!-- 品牌选择 -->
        <view class="mb-6">
          <text class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">品牌</text>
          <view class="flex flex-wrap gap-3">
            <view
              v-for="(brand, index) in brands"
              :key="index"
              class="px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
              :class="
                filters.brand === brand.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-200'
              "
              @click="selectBrand(brand.value)"
            >
              {{ brand.label }}
            </view>
          </view>
        </view>

        <!-- 按钮组 -->
        <view class="w-full flex gap-3 p-3 bg-white dark:bg-dark-800">
          <button
            class="flex-1 h-10 rounded-full bg-gray-100 dark:bg-dark-700 text-xs text-gray-700"
            @click="resetFilters"
          >
            重置
          </button>
          <button
            class="flex-1 h-10 rounded-full bg-orange-500 text-xs text-white"
            @click="applyFilters"
          >
            确定
          </button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts" setup>
import { t } from '@/locale'
import UNavbar from '@/components/navbar/u-navbar.vue'

const { safeAreaInsets } = uni.getSystemInfoSync()

// 状态管理
const showSearchResults = ref(false)
const filterIndex = ref(0)
const showFilter = ref(false)
const params = ref({
  keyword: '',
  pageNumber: 1,
  pageSize: 10,
  sort: '',
  order: '',
})

// 筛选条件
const filters = ref({
  minPrice: '',
  maxPrice: '',
  category: '',
  brand: '',
})

// 分类数据
const categories = ref([
  { label: '全部', value: '' },
  { label: '数码', value: 'digital' },
  { label: '服装', value: 'clothing' },
  { label: '食品', value: 'food' },
])

// 品牌数据
const brands = ref([
  { label: '全部', value: '' },
  { label: '苹果', value: 'apple' },
  { label: '华为', value: 'huawei' },
  { label: '小米', value: 'xiaomi' },
])

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
  if (type === 'filter') {
    showFilter.value = true
    return
  }

  if (!type) return

  if (params.value.sort === type) {
    params.value.order = params.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    params.value.sort = type
    params.value.order = 'desc'
  }
  // 重新搜索
}

const closeFilter = () => {
  showFilter.value = false
}

const selectCategory = (value: string) => {
  filters.value.category = value
}

const selectBrand = (value: string) => {
  filters.value.brand = value
}

const resetFilters = () => {
  filters.value = {
    minPrice: '',
    maxPrice: '',
    category: '',
    brand: '',
  }
}

const applyFilters = () => {
  // 验证价格区间
  if (filters.value.minPrice && filters.value.maxPrice) {
    if (Number(filters.value.minPrice) > Number(filters.value.maxPrice)) {
      uni.showToast({
        title: '价格区间有误',
        icon: 'none',
      })
      return
    }
  }

  // 应用筛选条件并重新搜索
  Object.assign(params.value, filters.value)
  closeFilter()
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
