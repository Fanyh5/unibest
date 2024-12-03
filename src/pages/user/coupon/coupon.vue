<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <up-navbar :title="t('coupon')" :placeholder="true" :autoBack="true"></up-navbar>
    <view class="navbar">
      <!-- 循环出头部tab栏 -->
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        @click="handleTabClick(index)"
      >
        <text :class="{ current: tabCurrentIndex === index }">{{ item.text }}</text>
      </view>
    </view>
    <view class="">
      <view v-for="item in couponData" :key="item.id">
        <coupon-list :data="item">
          <template #default>
            <up-button
              class="card-btn"
              size="mini"
              :class="item.get_status != 'can_get' ? 'border-btn' : ''"
              @click.stop="getBuy(item.id)"
              :disabled="item.get_status != 'can_get'"
            >
              {{ item.get_status_text }}
            </up-button>
          </template>
        </coupon-list>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { t } from '@/locale/index'
import CouponList from '@/components/coupon/coupon-list.vue'

const { safeAreaInsets } = uni.getSystemInfoSync()

const tabCurrentIndex = ref<number>(0)
const navList = ref([
  // 每个tab存储的信息
  {
    text: '未使用',
    loadStatus: 'more',
    dataList: [],
    params: {
      memberCouponStatus: 'NEW',
      pageNumber: 1,
      pageSize: 10,
      status: 1,
    },
    whetherEmpty: false,
  },
  {
    text: '已使用',
    loadStatus: 'more',
    dataList: [],
    params: {
      memberCouponStatus: 'USED',
      pageNumber: 1,
      pageSize: 10,
      status: 2,
    },
    whetherEmpty: false,
  },
  {
    text: '已过期',
    loadStatus: 'more',
    dataList: [],
    params: {
      memberCouponStatus: 'EXPIRE',
      pageNumber: 1,
      pageSize: 10,
      status: 3,
    },
    whetherEmpty: false,
  },
])

const couponData = ref([
  {
    type_text: '满减券',
    status_text: '公开发放',
    use_scope_text: '指定商品可用',
    amount_text: '满999.00元,减99元',
    get_time_text: '发放中',
    id: 75,
    name: '测试指定券',
    type: 'reduce',
    use_scope: 'goods',
    items: '253,240',
    amount: '99.00',
    max_amount: '0.00',
    enough: '999.00',
    stock: 988,
    limit_num: 1,
    get_start_time: '2024-11-08 00:00:00',
    get_end_time: '2024-12-31 23:59:59',
    use_time_type: 'days',
    use_start_time: null,
    use_end_time: null,
    start_days: 0,
    days: 10,
    is_double_discount: 1,
    description: '满减测试',
    status: 'normal',
    create_time: '2024-11-08 10:52:13',
    update_time: '2024-11-19 23:27:57',
    delete_time: null,
    get_status: 'cannot_get',
    get_status_text: '已领取',
    user_coupons: [
      {
        name: '全场可用',
        type: 'reduce',
        type_text: '满减券',
        use_scope: 'goods',
        use_scope_text: 'goods',
        items: '253',
        amount: '20.00',
        amount_text: '满100.00元,减20元',
        enough: '100.00',
        limit_num: 2,
        use_start_time: '2024-11-14 10:36:48',
        use_end_time: '2024-12-14 10:36:48',
        max_amount: '0.00',
        is_double_discount: 1,
        description: '全场可用优惠券',
        status: 'can_use',
        status_text: '立即使用',
        id: 1785,
        user_id: 6,
        coupon_id: 75,
        use_order_id: 0,
        use_time: null,
        create_time: '2024-11-14 10:36:48',
        update_time: '2024-11-14 10:36:48',
      },
    ],
  },
  {
    type_text: '满减券',
    status_text: '公开发放',
    use_scope_text: '指定商品可用',
    amount_text: '满100.00元,减20元',
    get_time_text: '发放中',
    id: 73,
    name: '全场可用',
    type: 'reduce',
    use_scope: 'goods',
    items: '253',
    amount: '20.00',
    max_amount: '0.00',
    enough: '100.00',
    stock: 984,
    limit_num: 2,
    get_start_time: '2024-10-30 00:00:00',
    get_end_time: '2024-11-30 23:59:59',
    use_time_type: 'days',
    use_start_time: null,
    use_end_time: null,
    start_days: 0,
    days: 30,
    is_double_discount: 1,
    description: '全场可用优惠券',
    status: 'normal',
    create_time: '2024-10-30 10:38:24',
    update_time: '2024-11-16 15:44:03',
    delete_time: null,
    get_status: 'cannot_get',
    get_status_text: '已领取',
    user_coupons: [
      {
        name: '全场可用',
        type: 'reduce',
        type_text: '满减券',
        use_scope: 'goods',
        use_scope_text: 'goods',
        items: '253',
        amount: '20.00',
        amount_text: '满100.00元,减20元',
        enough: '100.00',
        limit_num: 2,
        use_start_time: '2024-10-30 21:36:17',
        use_end_time: '2024-11-29 21:36:17',
        max_amount: '0.00',
        is_double_discount: 1,
        description: '全场可用优惠券',
        status: 'can_use',
        status_text: '立即使用',
        id: 1766,
        user_id: 6,
        coupon_id: 73,
        use_order_id: 0,
        use_time: null,
        create_time: '2024-10-30 21:36:17',
        update_time: '2024-10-30 21:36:17',
      },
      {
        name: '全场可用',
        type: 'reduce',
        type_text: '满减券',
        use_scope: 'goods',
        use_scope_text: 'goods',
        items: '253',
        amount: '20.00',
        amount_text: '满100.00元,减20元',
        enough: '100.00',
        limit_num: 2,
        use_start_time: '2024-11-03 11:01:59',
        use_end_time: '2024-12-03 11:01:59',
        max_amount: '0.00',
        is_double_discount: 1,
        description: '全场可用优惠券',
        status: 'can_use',
        status_text: '立即使用',
        id: 1769,
        user_id: 6,
        coupon_id: 73,
        use_order_id: 0,
        use_time: null,
        create_time: '2024-11-03 11:01:59',
        update_time: '2024-11-03 11:01:59',
      },
    ],
  },
])

/**
 * 顶部tab点击
 */
function handleTabClick(index: number) {
  tabCurrentIndex.value = index
}

async function getBuy(id) {}
</script>

<style scoped lang="scss">
.navbar {
  position: relative;
  z-index: 10;
  display: flex;
  height: 80rpx;
  padding: 0 5px;
  color: #ff6b35ff;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);

  .nav-item {
    position: relative;
    flex: 1;
    height: 100%;
    font-size: 26rpx;
    color: #ff6b35ff;
    text-align: center;
    text {
      line-height: 80rpx;
    }
    .current {
      font-size: 28rpx;
      font-weight: bold;
      &:after {
        position: absolute;
        bottom: 10rpx;
        left: 108rpx;
        width: 30rpx;
        content: '';
        border-bottom: 2px solid #ff6b35ff;
      }
    }
  }
}

.card-btn {
  background: linear-gradient(90deg, #ff6000, rgba(255, 96, 0, 0.6));
}
</style>
