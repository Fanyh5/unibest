<route lang="json5">
{
  needLogin: true,
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('signIn')" :placeholder="true" :autoBack="true"></up-navbar>
    <view class="py-4 mx-4 rounded-xl">
      <div class="box">
        <div class="circle-box">
          <div class="cricle" @click="signIn()">
            <span v-if="!ifSign" :class="{ active: signFlag || ifSign }">签到</span>
            <span
              v-else
              :class="{ active: signFlag || ifSign }"
              :style="ifSign ? 'transform: rotateY(0deg);' : ''"
            >
              已签
            </span>
          </div>
        </div>
        <text class="tips">坚持每天连续签到可以获多重奖励哦</text>
      </div>
    </view>
    <view class="py-4 mx-4 bg-[#fff] rounded-xl">
      <calendar :values="checks"></calendar>
    </view>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale/index'
import Calendar from '@/components/calendar/calendar.vue'
import { useUserStore } from '@/store'
import { navigateToLogin } from '@/utils/filters'
import { getLastItem } from '@/utils'
const userStore = useUserStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
function handleClickLeft() {
  uni.navigateBack()
}

const checks = ref([
  { date: '20230928', signInFlag: true, xbCount: 7 },
  { date: '20230927', signInFlag: true, xbCount: 6 },
  { date: '20230926', signInFlag: true, xbCount: 5 },
  { date: '20230925', signInFlag: true, xbCount: 4 },
  { date: '20231019', signInFlag: true, xbCount: 4 },
  { date: '20231018', signInFlag: true, xbCount: 3 },
  { date: '20231017', signInFlag: true, xbCount: 2 },
  { date: '20231016', signInFlag: true, xbCount: 1 },
  { date: '20231015', signInFlag: true, xbCount: 7 },
  { date: '20231014', signInFlag: true, xbCount: 6 },
  { date: '20231002', signInFlag: true, xbCount: 1 },
  { date: '20231022', signInFlag: true, xbCount: 7 },
  { date: '20231021', signInFlag: true, xbCount: 6 },
  { date: '20231020', signInFlag: true, xbCount: 5 },
  { date: '20231009', signInFlag: true, xbCount: 1 },
  { date: '20231008', signInFlag: true, xbCount: 7 },
  { date: '20231007', signInFlag: true, xbCount: 6 },
  { date: '20230930', signInFlag: true, xbCount: 1 },
  { date: '20231006', signInFlag: true, xbCount: 5 },
  { date: '20231001', signInFlag: true, xbCount: 4 },
  { date: '20231005', signInFlag: true, xbCount: 4 },
  { date: '20231004', signInFlag: true, xbCount: 3 },
  { date: '20231003', signInFlag: true, xbCount: 2 },
  { date: '20231013', signInFlag: true, xbCount: 5 },
  { date: '20231012', signInFlag: true, xbCount: 4 },
  { date: '20231011', signInFlag: true, xbCount: 3 },
  { date: '20231010', signInFlag: true, xbCount: 2 },
])

const ifSign = ref(false) // 今天是否签到
const signFlag = ref(false)

const signIn = async () => {}

const isLogined = computed(() => {
  return userStore.isLogined
})

onReady(() => {
  const pages = getCurrentPages()
  const lastPage = getLastItem(pages)
  const currRoute = (lastPage as any).$page
  if (!isLogined.value) {
    navigateToLogin(currRoute.fullPath)
  }
})
</script>

<style lang="scss" scoped>
.tips {
  margin-top: 54rpx;
  font-size: 24rpx;
  color: #999;
  letter-spacing: 1rpx;
}

.circle-box {
  display: flex;
  align-items: center; //这个是 Y轴居中
  justify-content: center; //这个是X轴居中
  width: 200rpx;
  height: 200rpx;
  background: #ff9f28ff;
  border-radius: 50%;
  box-shadow: 0 4rpx 24rpx 0 rgba($color: #ff9f28ff, $alpha: 1);
}

.cricle {
  width: 160rpx;
  height: 160rpx;
  font-size: 40rpx;
  line-height: 160rpx;
  color: #fff;
  text-align: center;
  background: #ff9f28ff;
  border-radius: 50%;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64rpx 32rpx;
  background: #fff;
  border-radius: 20rpx;
}
</style>
