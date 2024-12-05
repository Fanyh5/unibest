import { http } from '@/utils/http'
/**
 * 账号密码登陆
 * @params  password
 * @params  username
 */
export const userLoginApi = (params: any, clientType: string) => {
  return http<any>({
    method: 'POST',
    url: `/api/login`,
    data: params,
    header: {
      clientType,
    },
  })
}

/**
 * 短信登录
 * @param params
 * @param clientType
 */
export function smsLoginApi(params: any, clientType: string): Promise<IResData<unknown>> {
  return http.post(`/passport/member/smsLogin`, params, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      clientType,
    },
  })
}

/**
 * 发送验证码
 * @param  mobile
 * @param type
 */
export function sendMobileApi(mobile: string, type: string = 'LOGIN') {
  return http.get(`/common/sms/${type}/${mobile}`)
}
