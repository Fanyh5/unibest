import { createSSRApp } from 'vue'
import App from './App.vue'
import store, { useInitsStore } from './store'
import i18n from './locale/index'
import { routeInterceptor, requestInterceptor, prototypeInterceptor } from './interceptors'
import 'virtual:uno.css'
import '@/style/index.scss'
import { initsData } from './service/index'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(i18n)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)

  // 初始化站点数据
  initsData().then((res: any) => {
    const $inits = useInitsStore()
    if (res?.data) {
      $inits.errors = res.data.msg
      if (res.code === 0) {
        // 初始化配置
        $inits.name = res.data.name
        $inits.logo = res.data.logo
        $inits.lang = res.data.lang
        $inits.notice = res.data.notice
      }
    }
  })

  return {
    app,
  }
}
