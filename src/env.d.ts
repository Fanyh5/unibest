/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string
  /** 服务端口号 */
  readonly VITE_SERVER_PORT: string
  /** 后台接口地址 */
  readonly VITE_SERVER_BASEURL: string
  /** H5是否需要代理 */
  readonly VITE_APP_PROXY: 'true' | 'false'
  /** H5是否需要代理，需要的话有个前缀 */
  readonly VITE_APP_PROXY_PREFIX: string // 一般是/api
  /** 上传图片地址 */
  readonly VITE_UPLOAD_BASEURL: string
  /** 是否清除console */
  readonly VITE_DELETE_CONSOLE: string
  /** 唤起app地址 */
  readonly VITE_APP_SCHEME_LINK: string
  /** 下载地址，下载app的地址 */
  readonly VITE_APP_DOWNLOAD_LINK: string
  /** 分享地址，也就是在h5中默认的复制地址 */
  readonly VITE_APP_SHARE_LINK: string
  /** 小程序唯一凭证，即 AppID */
  readonly VITE_APP_ID: string
  /** 在高德中申请Web服务key */
  readonly VITE_A_MAP_KEY: string
  /** 扫码认证跳转域名配置 */
  readonly VITE_SCAN_AUTH_NAVIGATION: string[]
  /** AppStore的应用地址id */
  readonly VITE_IOS_APP_ID: string
  /** logo地址 */
  readonly VITE_LOGO: string
  /** 客服电话 */
  readonly VITE_CUSTOMER_SERVICE_MOBILE: string
  /** 客服邮箱 */
  readonly VITE_CUSTOMER_SERVICE_EMAIL: string
  /** IM地址 */
  readonly VITE_IM_WEB_SRC: string
  /** IM WS 地址 */
  readonly VITE_BASE_WS_URL: string
  /** 是否启用粘贴板获取链接 */
  readonly VITE_ENABLE_GET_CLIPBOARD: boolean
  /** 是否在h5中右侧浮空按钮点击启动app */
  readonly VITE_ENABLE_MINI_BAR_START_UP_APP: boolean
  /** 主题色 */
  readonly VITE_MAIN_COLOR: string
  /** 高亮主题色 */
  readonly VITE_LIGHT_COLOR: string
  /** 辅助高亮颜色 */
  readonly VITE_AIDER_LIGHT_COLOR: string
  /** 默认用户头像 */
  readonly VITE_DEFAULT_USER_PHOTO: string
  /** 是否启用获取手机号登录 */
  readonly VITE_ENABLE_FETCH_MOBILE_LOGIN: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
