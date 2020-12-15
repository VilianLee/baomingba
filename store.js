export default {
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCode: '',
    token: '',
    isLogin: false,
    openid: '',
    mobile: '',
    submitOrderInfo: {}
  },
  globalData: ['userInfo', 'hasUserInfo', 'isLogin', 'wxCode', 'token', 'openid', 'submitOrderInfo', 'mobile'],
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}