import { http } from '@/utils/http'

/** GET 请求 */
export const initsData = () => {
  return http.get<any>('/api/inits')
}
