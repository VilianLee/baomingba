export default {
  data: {
    userInfo: {},
    payChannelId: "1",
    invalidTime: 30,
    hasUserInfo: false,
    sessionkey: '',
    activity: {
      createSource: 2, //创建源,(安卓，ios还是h5)
      title: null, //活动标题
      beginTime: null, //活动开始时间
      beginTimeStr: '',
      endTimeStr: '',
      endTime: null, //活动结束时间
      signUpStartTime: null, //报名开始时间
      expireTime: null, //到期时间
      telephone: "", //联系电话
      signUpLimit: "0", //报名人数限制
      charge: null, //收费费用
      status: "0", //活动状态
      payPath: 0, //支付方式
      organizer: "", //主办方
      address: {
        province: "", //省
        city: "", //市
        district: "", //区
        shortAddress: "", //地址
        longAddress: "", //完整地址
        longitude: "", //经度
        latitude: "" //维度
      },
      hideAddr: false, //是否隐藏地址
      publicType: 1, //公开类型(公开，私密)
      anonSignUp: 0, //匿名报名
      conditions: [],
      photowallControl: false, //是否有照片墙
      tipControl: false, //是否可以打赏
      intro: "", //活动介绍
      introPhotos: [],
      introType: 1, //介绍类型
      photos: [],
      isShare: 0 //是否可以分享
    },
    wxCode: '',
    unionId: '',
    hasBindPhone: false,
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