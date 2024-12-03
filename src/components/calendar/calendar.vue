<template>
  <view class="calendar">
    <view class="calendar-header">
      <view class="header-icon-wrap" @tap="handleClickPrevMonth">
        <img class="header-icon" src="https://z1.ax1x.com/2023/10/27/piZX39K.png" alt="" />
      </view>
      <view class="calendar-date">{{ nowYear + '年' + nowMonth + '月' }}</view>
      <view class="header-icon-wrap" @tap="handleClickNextMonth">
        <img class="header-icon" src="https://z1.ax1x.com/2023/10/27/piZXUHA.png" alt="" />
      </view>
      <view class="calendar-tip">{{ title }}</view>
    </view>
    <!-- 星期展示 -->
    <view class="calendar-grid calendar-week">
      <view
        v-for="(value, index) in weekDay"
        :key="index"
        class="calendar-grid-item calendar-week-item"
      >
        <view class="calendar-grid-item-text">{{ value }}</view>
      </view>
    </view>
    <!-- 日期内容 -->
    <view class="calendar-grid calendar-day">
      <view
        v-for="(item, index) in totalDay"
        :key="index"
        class="calendar-grid-item calendar-day-item"
        @click="handleCheck(item)"
      >
        <view
          :class="{
            'calendar-grid-item-text': true,
            'calendar-prev-month-day': item.prevMonth,
            'calendar-next-month-day': item.nextMonth,
            'calendar-check': item.check,
            'calendar-today': item.today,
          }"
        >
          {{ item.day }}
        </view>
        <view v-if="item.check" class="calendar-day-mark">
          <img style="width: 24rpx; height: 24rpx" src="./images/star.png" alt="" />
          <view>+{{ item.value }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      default: {}[{}],
    },
    title: {
      type: String,
      default: '积分按当月连续签到天数累加',
    },
  },
  data() {
    return {
      weekDay: ['日', '一', '二', '三', '四', '五', '六'],
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getMonth() + 1,
      nowDay: new Date().getDate(),
      maxDayList: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      totalDay: [],
    }
  },
  onLoad() {},
  methods: {
    initCalendar() {
      const maxDayList = [...this.maxDayList]
      const year = this.nowYear
      const month = this.nowMonth

      // 计算当前年是不是闰年，规则：能被4整除且不被100整除，或者能被400整除的年份
      maxDayList[1] = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28

      this.maxDayList = maxDayList

      // 累计当天天数
      const days = []
      for (let index = 1; index <= maxDayList[month - 1]; index++) {
        const { check, value } = this.getCheckState(year, month, index)
        days.push({
          year,
          month,
          day: index,
          today: this.isToDay(index),
          check,
          value,
        })
      }

      // 当前月的1号是星期几,0是星期天
      const firstDayWeek = new Date(year + '/' + month + '/1').getDay()

      // 需要补的前置天数，需要处理是否是本年的月份
      const beforeDays = []
      let nowYear = this.nowYear
      let previousMonth = month - 1
      let previousMonthIndex = month - 2
      if (previousMonthIndex < 0) {
        previousMonthIndex = 11
        nowYear = nowYear - 1
        previousMonth = 12
      }
      for (let index = 0; index < firstDayWeek; index++) {
        const day = maxDayList[previousMonthIndex] - index
        const { check, value } = this.getCheckState(nowYear, previousMonthIndex + 1, day)
        beforeDays.push({
          year,
          month: previousMonth,
          day,
          prevMonth: true,
          check,
          value,
        })
      }
      // 当前月最后一天是星期几
      const endDayWeek = new Date(year + '/' + month + '/' + maxDayList[month - 1]).getDay()

      let newxMonth = month + 1
      if (month === 12) {
        newxMonth = 1
      }
      // 需要补的后置天数
      const afterDays = []
      for (let index = 1; index < 7 - endDayWeek; index++) {
        const { check, value } = this.getCheckState(nowYear, newxMonth, index)
        afterDays.push({
          year,
          month: newxMonth,
          day: index,
          nextMonth: true,
          check,
          value,
        })
      }

      this.totalDay = [...beforeDays.reverse(), ...days, ...afterDays]
    },

    getCheckState(year, month, day) {
      const currentMonth = month > 9 ? month : '0' + month
      const currentDay = day > 9 ? day : '0' + day
      const curentDate = `${year}${currentMonth}${currentDay}`
      const item = this.values?.find((item) => item.date === curentDate)
      if (item) return { check: true, value: item.xbCount }
      return {}
    },

    isToDay(day) {
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth() + 1
      const currentDay = new Date().getDate()
      if (currentDay === day && this.nowYear === currentYear && this.nowMonth === currentMonth)
        return true
      return false
    },

    handleClickPrevMonth() {
      if (this.nowMonth === 1) {
        this.nowMonth = 12
        this.nowYear = this.nowYear - 1
      } else {
        this.nowMonth = this.nowMonth - 1
      }

      this.initCalendar()
    },

    handleClickNextMonth() {
      if (this.nowMonth === 12) {
        this.nowMonth = 1
        this.nowYear = this.nowYear + 1
      } else {
        this.nowMonth = this.nowMonth + 1
      }

      this.initCalendar()
    },

    handleCheck(item) {
      this.$emit('onChange', item)
    },
  },
  mounted() {
    this.initCalendar()
  },
}
</script>

<style lang="scss" scoped>
.calendar {
  width: 100%;
  height: 100%;
  .calendar-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48rpx;
    padding: 0 16rpx;
    margin: 36rpx 0 42rpx;
    .header-icon-wrap {
      padding: 0 16rpx;
      .header-icon {
        width: 14rpx;
        height: 20rpx;
      }
    }

    .calendar-date {
      padding: 0 16rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #07132b;
    }
    .calendar-tip {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 0 16rpx 0 20rpx;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 48rpx;
      color: #eccc66;
      background: #fff5c6;
      border-radius: 26rpx 0px 0px 26rpx;
    }
  }
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 14.28%);
    .calendar-grid-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 84rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #07132b;
      text-align: center;
      .calendar-grid-item-text {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52rpx;
        height: 52rpx;
      }
    }
  }
  .calendar-day {
    .calendar-day-item {
      .calendar-prev-month-day,
      .calendar-next-month-day {
        color: #a6b1bf;
      }
      .calendar-check {
        background: rgba(236, 204, 102, 0.2);
        border-radius: 50%;
      }
      .calendar-today {
        color: #ffffff;
        background: #eccc66;
        border-radius: 50%;
      }
      .calendar-day-mark {
        display: flex;
        align-items: center;
        height: 26rpx;
        font-size: 20rpx;
        font-weight: 400;
        color: #eccc66;
        img {
          width: 24rpx;
          height: 24rpx;
        }
      }
    }
  }
}
</style>
