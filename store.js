export default {
  data: {
    userInfo: {},
    payChannelId: "1",
    invalidTime: 30,
    hasUserInfo: false,
    sessionkey: '',
    wxCode: '',
    unionId: '',
    isLogin: false,
    pageLoading: false,
    unReadMsgNum: 0,
    default_address: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    uptoken: ''
  },
  globalData: ['xcSessionId', 'isLogin', 'hasUserInfo', 'userInfo', 'default_address', 'pageLoading'],
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}