/**
 * 金钱单位格式化 (例: 2999 --> 2,999.00)
 * @param val - 金额数值
 * @param unit - 货币单位(可选)
 * @param location - 位置('before'/'after')
 * @returns {string} 格式化后的金额字符串
 */
export function unitPrice(
  val: number | string,
  unit?: string,
  location?: 'before' | 'after',
): string {
  const price = formatPrice(Number(val) || 0)

  if (location === 'before') {
    return price.slice(0, -3)
  }
  if (location === 'after') {
    return price.slice(-2)
  }
  return (unit || '') + price
}

/**
 * 货币格式化
 * @param price - 金额数值
 * @returns {string} 格式化后的金额字符串(保留2位小数,千分位分隔)
 */
export function formatPrice(price: number): string {
  if (typeof price !== 'number') return String(price)
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 验证登录状态并跳转登录页
 */
export function forceLogin(): void {
  // const userInfo = storage.getUserInfo()
  // if (!userInfo?.id) {
  //   // #ifdef MP-WEIXIN
  //   uni.navigateTo({
  //     url: '/pages/auth/wechatMPLogin'
  //   })
  //   // #endif
  //
  //   // #ifndef MP-WEIXIN
  //   uni.navigateTo({
  //     url: '/pages/auth/login'
  //   })
  //   // #endif
  // }
}

/**
 * 跳转到登录页面
 * @param url - 重定向地址
 * @param type - 跳转类型
 */
export function navigateToLogin(
  url: string,
  type: 'navigateTo' | 'redirectTo' = 'navigateTo',
): void {
  // #ifdef MP-WEIXIN
  uni[type]({
    url: `/pages/auth/method/wechatMPLogin?redirect=${encodeURIComponent(url)}`,
  })
  // #endif

  // #ifndef MP-WEIXIN
  uni[type]({
    url: `/pages/auth/login?redirect=${encodeURIComponent(url)}`,
  })
  // #endif
}

/**
 * 返回上一页
 */
export function handleClickLeft(): void {
  uni.navigateBack()
}

/**
 * 路由跳转函数
 * @param url - 目标页面路径
 * @param type - 跳转类型
 */
export function navigateToPage(
  url: string,
  type: 'navigateTo' | 'redirectTo' | 'switchTab' = 'navigateTo',
): void {
  uni[type]({
    url,
  })
}

/**
 * 退出登录
 */
export function quiteLoginOut(): void {
  uni.showModal({
    title: '提示',
    content: '是否退出登录？',
    success(res) {
      if (res.confirm) {
        navigateToPage('/', 'switchTab')
      }
    },
  })
}

/**
 * 用户注销
 */
export function logoff(): void {
  uni.showModal({
    title: '提示',
    content:
      '确认注销用户么？注销用户将无法再次登录并失去当前数据。根据法规数据最长保留6个月，期间可以联系客服人员进行恢复数据。',
    success(res) {
      if (res.confirm) {
        navigateToLogin('/', 'redirectTo')
      }
    },
  })
}
