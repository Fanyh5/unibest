<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '优惠券详情',
  },
}
</route>
<template>
  <view class="overflow-hidden" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-navbar title="优惠券详情" left-arrow @click-left="handleClickLeft"></wd-navbar>
    <view class="">
      <coupon-detail :data="couponData"></coupon-detail>
    </view>
  </view>
</template>

<script setup lang="ts">
import { handleClickLeft } from '@/utils/filters'
import CouponDetail from '@/components/coupon/coupon-detail.vue'

const { safeAreaInsets } = uni.getSystemInfoSync()

const couponData = {
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
}
</script>

<style scoped lang="scss"></style>
