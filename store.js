export default {
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCode: '',
    token: '',
    isLogin: false,
    openid: '',
    wxopenid: '',
    mobile: '',
    submitOrderInfo: {},
    chairList: []
  },
  globalData: ['userInfo', 'hasUserInfo', 'isLogin', 'wxCode', 'token', 'openid', 'submitOrderInfo', 'mobile', 'wxopenid', 'chairList'],
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}