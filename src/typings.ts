// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  message: string
  error: string
  data: T
}

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

type IUserInfo = {
  userInfo?: any
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}

type IConfig = {
  name: string
  schemeLink: string // 唤起app地址
  downloadLink: string // 下载地址，下载app的地址
  shareLink: string // 分享地址，也就是在h5中默认的复制地址
  appid: string // 小程序唯一凭证，即 AppID
  aMapKey: string // 在高德中申请Web服务key
  scanAuthNavigation: string[] // 扫码认证跳转域名配置
  iosAppId: string // AppStore的应用地址id
  logo: string // logo地址
  customerServiceMobile: string // 客服电话
  customerServiceEmail: string // 客服邮箱
  imWebSrc: string // IM地址
  baseWsUrl: string // IM WS 地址
  enableGetClipboard: boolean // 是否启用粘贴板获取链接
  enableMiniBarStartUpApp: boolean // 是否在h5中右侧浮空按钮点击启动app
  mainColor: string // 主题色
  lightColor: string // 高亮主题色
  aiderLightColor: string // 辅助高亮颜色
  defaultUserPhoto: string // 默认用户头像
  enableFetchMobileLogin: boolean // 是否启用获取手机号登录
}
