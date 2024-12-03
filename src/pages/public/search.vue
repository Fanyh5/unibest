<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <view class="bg-[#ffffff]" v-show="false">
      <view class="px-4 py-2">
        <view class="text-base mb-2">热门搜索</view>
        <view class="grid grid-cols-2 gap-2">
          <view class="wes" v-for="(keyword, index) in hotKeywordList" :key="index">
            {{ keyword }}
          </view>
        </view>
      </view>
      <view class="px-4 py-2" v-if="oldKeywordList.length > 0">
        <view class="text-base">搜索历史</view>
        <div class="oldKeyList">
          <div
            class="oldKeyItem mt-2 mr-2 truncate ..."
            v-for="(keyword, index) in oldKeywordList"
            :key="index"
          >
            <span class="text-sm">{{ keyword }}</span>
          </div>
          <!-- <div @click="showMore" v-if="oldKeywordIndex > loadIndex" class="oldKeyItem">
            展示更多
          </div> -->
        </div>
      </view>
      <div
        class="bg-[#f7f7f7] absolute inset-x-0 bottom-0 h-14 leading-14 text-[#666666] text-center text-base"
      >
        清空搜索历史
      </div>
    </view>
    <!-- 搜索 -->
    <view>
      <view class="navbar">
        <view class="nav-item" :class="{ current: filterIndex === 0 }" @click="tabClick(0)">
          综合排序
        </view>
        <view
          class="nav-item"
          :class="{ current: filterIndex === 3 }"
          @click="tabClick(3, 'buyCount')"
        >
          <text>销量</text>
          <view class="p-box">
            <view class="index-nav-arrow">
              <image
                class="img"
                src="/static/index/arrow-up-1.png"
                v-if="params.sort === 'buyCount' && params.order === 'asc'"
                mode="aspectFit"
              ></image>
              <image class="img" src="/static/index/arrow-up.png" v-else mode="aspectFit"></image>
            </view>
            <view class="index-nav-arrow">
              <image
                class="img"
                src="/static/index/arrow-down.png"
                v-if="params.sort === 'buyCount' && params.order === 'desc'"
                mode="aspectFit"
              ></image>
              <image
                class="img"
                src="/static/index/arrow-down-1.png"
                v-else
                mode="aspectFit"
              ></image>
            </view>
          </view>
        </view>
        <view
          class="nav-item"
          :class="{ current: filterIndex === 4 }"
          @click="tabClick(4, 'price')"
        >
          <text>价格</text>
          <view class="p-box">
            <view class="index-nav-arrow">
              <image
                class="img"
                src="/static/index/arrow-up-1.png"
                v-if="params.sort === 'price' && params.order === 'asc'"
                mode="aspectFit"
              ></image>
              <image class="img" src="/static/index/arrow-up.png" v-else mode="aspectFit"></image>
            </view>
            <view class="index-nav-arrow">
              <image
                class="img"
                src="/static/index/arrow-down.png"
                v-if="params.sort === 'price' && params.order === 'desc'"
                mode="aspectFit"
              ></image>
              <image
                class="img"
                src="/static/index/arrow-down-1.png"
                v-else
                mode="aspectFit"
              ></image>
            </view>
          </view>
        </view>
        <view class="nav-item">筛选</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const searchQuery = ref<string>('')
const results = ref<Array<{ title: string; label: string }>>([])

const hotKeywordList = ref<string[]>([
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

const oldKeywordList = ref<string[]>(['手机', '耳机', '笔记本电脑', '荷兰双牛全脂奶粉400g'])
const loadIndex = ref<number>(10)
const filterIndex = ref<number>(0)
const params = ref<any>({
  pageNumber: 1,
  pageSize: 10,
  // sort: 'grade_asc',
  keyword: '',
})

// 模拟搜索功能
function performSearch() {
  // 这里可以添加实际的搜索逻辑
  if (searchQuery.value) {
    results.value = [
      { title: '结果1', label: '这是结果1的描述' },
      { title: '结果2', label: '这是结果2的描述' },
    ]
  } else {
    results.value = []
  }
}

function tabClick(index: number, type: string = '') {}

// 监听搜索框变化
watch(searchQuery, (newValue) => {
  performSearch()
})
</script>

<style lang="scss" scoped>
$light-color: #ff6b35ff;
$font-color-dark: #303133ff;

.search-box {
  display: flex;
  align-items: center;
  height: 100%;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}

.search-box {
  display: flex;
  align-items: center;
}

.results {
  flex: 1;
  padding: 10px;
}

.no-results {
  color: #999;
  text-align: center;
}
.oldKeyList {
  display: flex;
  flex-wrap: wrap;
  .oldKeyItem {
    max-width: 114px;
    padding: 2px 13px;
    background: #f0f2f5;
    border-radius: 100px;
  }
}

.navbar {
  z-index: 10;
  display: flex;
  width: 100%;
  height: 80rpx;
  background: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
  // position: fixed;
  // left: 0;
  // top: var(--status-bar-height);
  .nav-item {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 30rpx;
    color: $font-color-dark;
  }
  .current {
    position: relative;
    color: $light-color;
    &:after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 40rpx;
      height: 0;
      content: '';
      border-bottom: 4rpx solid $light-color;
      transform: translateX(-50%);
    }
  }
  .p-box {
    display: flex;
    flex-direction: column;

    .yticon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30rpx;
      height: 14rpx;
      margin-left: 4rpx;
      font-size: 26rpx;
      line-height: 1;
      color: #888;
    }

    .xia {
      transform: scaleY(-1);
    }
  }
}
.img {
  width: 26rpx;
  height: 26rpx;
}
</style>
