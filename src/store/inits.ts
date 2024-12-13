import { defineStore } from 'pinia'

export const EmailLogin = 1
export const PhoneLogin = 2

export const useInitsStore = defineStore('inits', {
  state: () => {
    return {
      name: '', // 站点名称
      logo: '', // 站点Logo
      lang: '', // 语言
      chatURL: '', // 客服链接
      notice: '', // 站点公告
      introduce: '', // 站点介绍
      template: '', // 站点模版
      menus: {
        mobileNavs: [] as any, // 手机导航菜单
        desktopNavs: [] as any, // 桌面导航菜单
        commonUserMenu: [] as any, // 公共用户菜单
        commonUserMoreMenu: [] as any, // 公共用户更多菜单
        commonWalletMenu: [] as any, // 公共钱包菜单
      },
      countrys: [] as any, // 国家列表
      translate: {} as any, // 翻译数据
      langs: [], // 语言列表
      footer: {}, // 底部信息
      settings: {
        basics: {
          showAssets: false, // 显示资产
          showLevel: false, // 显示等级
          showScore: false, // 显示积分
          showAuth: false, // 显示认证
          showAuthView: false, // 显示认证查看
          showWithdrawAccountEdit: false, // 显示提现账户编辑
          showWithdrawAccountDelete: false, // 显示提现账户删除
          showWithdrawAccountNumber: false, // 显示提现账户号码
          showModifyPassword: false, // 显示修改密码
          showModifyWithdrawPassword: false, // 显示修改提现密码
          showBindEmail: false, // 显示绑定邮箱
          showBindTelephone: false, // 显示绑定手机
        }, // 基础设置
        billOptions: [] as any, // 钱包账单设置
        walletAssets: [] as any, // 钱包资产设置
        emailLogin: [], // 邮箱登录设置
        emailRegister: [], // 邮箱注册设置
        phoneLogin: [], // 手机登录设置
        phoneRegister: [], // 手机注册设置
        userSetting: [] as any, // 用户设置
        userAuth: [] as any, // 身份认证设置
        withdrawAccountBank: [] as any, // 提现账户银行卡模版
        withdrawAccountAsset: [] as any, // 提现账户资产模版
      },
      channels: [] as any, // 渠道列表
      errors: '', // 错误信息
    }
  },
  getters: {},
  actions: {},
})
