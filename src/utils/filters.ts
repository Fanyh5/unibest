/**
 * 金钱单位置换  2999 --> 2,999.00
 * @param val
 * @param unit
 * @param location
 * @returns {*}
 */
export function unitPrice(val, unit, location) {
  if (!val) val = 0
  const price = formatPrice(val)
  if (location === 'before') {
    return price.substr(0, price.length - 3)
  }
  if (location === 'after') {
    return price.substr(-2)
  }
  return (unit || '') + price
}

/**
 * 货币格式化
 * @param price
 * @returns {string}
 */
export function formatPrice(price) {
  if (typeof price !== 'number') return price
  return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 验证是否登录如果没登录则去登录
 * @returns
 */

export function forceLogin() {
  // const userInfo = storage.getUserInfo()
  // if (!userInfo || !userInfo.id) {
  //   // #ifdef MP-WEIXIN
  //
  //   uni.navigateTo({
  //     url: '/pages/auth/wechatMPLogin',
  //   })
  //
  //   // #endif
  //
  //   // #ifndef MP-WEIXIN
  //
  //   uni.navigateTo({
  //     url: '/pages/auth/login',
  //   })
  //
  //   //  #endif
  // }
}

/**
 * url: 重定向地址
 * 跳转到登录页面
 */
export function navigateToLogin(url: string, type: string = 'navigateTo') {
  /**
   * 此处进行条件编译判断
   * 微信小程序跳转到微信小程序登录页面
   * H5/App跳转到普通登录页面
   */
  // #ifdef MP-WEIXIN
  uni[type]({
    url: `/pages/auth/method/wechatMPLogin?redirect=${encodeURIComponent(url)}`,
  })
  // #endif
  // #ifndef MP-WEIXIN
  uni[type]({
    url: `/pages/auth/login?redirect=${encodeURIComponent(url)}`,
  })
  //  #endif
}

export function handleClickLeft() {
  uni.navigateBack()
}

/**
 * 路由跳转函数
 * @param {string} url - 目标页面的路径
 * @param {string} type - 跳转类型，默认为 'navigateTo'
 */
export function navigateToPage(url: string, type = 'navigateTo'): void {
  uni[type]({
    url,
  })
}

/**
 * 退出登录
 */
export function quiteLoginOut() {
  uni.showModal({
    title: '提示',
    content: '是否退出登录？',
    async success(res) {
      if (res.confirm) {
        navigateToPage('/', 'switchTab')
      }
    },
  })
}

/**
 * 用户注销
 */
export function logoff() {
  uni.showModal({
    title: '提示',
    content:
      '确认注销用户么？注销用户将无法再次登录并失去当前数据就。根据法规数据最长保留6个月，期间可以联系客服人员进行恢复数据。',
    async success(res) {
      if (res.confirm) {
        navigateToLogin('redirectTo')
      }
    },
  })
}
