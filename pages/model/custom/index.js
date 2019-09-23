// pages/model/custom/index.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_type: "back",
    title_color: "#ffffff",
    bg_opacity: 0,
    pic_list: ['pic_01.jpg', 'pic_02.jpg'],
    date: '2018-10-01',
    time: '12:00',
    startActTimeArr: null,
    startActTime: null,
    endActTimeArr: null,
    endActTime: null,
    endTimeInput: false,
    startYear: 2000,
    endYear: 2050,
    financial: 0,
    joinerNum: 0,
    pravicy_arr: ["私密活动", "公开可见", "仅粉丝可见"],
    real_name_arr: ["无需身份实名", "需要身份实名", "查看实名认证包"],
    real_name: "1",
    seniorSetting: {
      joinerNeedInfo: [{
        name: "姓名",
        require: true
      }, {
        name: "手机",
        require: true
      }, {
        name: "公司",
        require: false
      }, {
        name: "邮箱",
        require: false
      }, {
        name: "职位",
        require: false
      }, {
        name: "性别",
        require: false
      }, {
        name: "年龄",
        require: false
      }, {
        name: "备注",
        require: false
      }],
      enrollStartTime: "",
      enrollEndTime: "",
      customSponsor: [],
      sponsorMobile: "",
      hideJoinerList: false,
      hideActLocation: false,
      hidePicWall: false,
      hideRewardFn: false,
      onlyJoinerCanComment: false
    },
    activity: {
      createSource: "4", //创建源,(安卓，ios还是h5)
      title: null, //活动标题
      beginTime: null, //活动开始时间
      endTime: null, //活动结束时间
      signUpStartTime: null, //报名开始时间
      expireTime: null, //到期时间
      telephone: "18958081773", //联系电话
      signUpLimit: "0", //报名人数限制
      charge: 1, //收费费用
      status: "", //活动状态
      payPath: 3, //支付方式
      organizer: "东哥俱乐部", //主办方
      address: {
        province: "浙江省", //省
        city: "杭州市", //市
        district: "上城区", //区
        shortAddress: "清泰街208号", //地址
        longAddress: "浙江省杭州市上城区清泰街208号", //完整地址
        longitude: "120.187916", //经度
        latitude: "30.25352" //维度
      },
      hideAddr: false, //是否隐藏地址
      publicType: 1, //公开类型(公开，私密)
      anonSignUp: 0, //匿名报名
      conditions: [{ //报名项
        name: "username"
      }, {
        name: "telephone"
      }],
      photowallControl: false, //是否有照片墙
      tipControl: false, //是否可以打赏
      intro: "\n<img>哈哈", //活动介绍
      introPhotos: [{ //活动介绍的图片
        name: "web/977d691568601690343", //图片名称
        id: "", //图片id
        base64: ""
      }],
      introType: 1, //介绍类型
      photos: [{ //活动封面
        id: "", //图片id
        name: "web/977d691568601689217", //图片名称
        base64: ""
      }],
      isShare: 0 //是否可以分享
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      startActTimeArr: obj1.dateTimeArray,
      startActTime: obj1.dateTime,
      endActTimeArr: obj1.dateTimeArray,
      endActTime: obj1.dateTime
    });
  },
  onTimeChange(e) { //修改时间
    const key = e.target.dataset.name
    switch (key) {
      case "beginTime":
        this.data.startActTime = e.detail.value
        const startarr = this.data.startActTimeArr
        const start = this.data.startActTime
        this.data.activity.beginTime = startarr[0][start[0]] + '-' + startarr[1][start[1]] + '-' + startarr[2][start[2]] + ' ' + startarr[3][start[3]] + ':' + startarr[4][start[4]]
        break
      case "endTime":
        this.setData({
          endActTime: e.detail.value,
          endTimeInput: true
        });
        const endarr = this.data.endActTimeArr
        const end = this.data.endActTime
        this.data.activity.endTime = endarr[0][end[0]] + '-' + endarr[1][end[1]] + '-' + endarr[2][end[2]] + ' ' + endarr[3][end[3]] + ':' + endarr[4][end[4]]
        break
      default:
        break
    }
    console.log(e)
    console.log(this.data.activity)
  },
  changeStartTimeColumn(e) {
    const key = e.target.dataset.name
    const value = e.detail.value
    const column = e.detail.column
    switch (key) {
      case 'beginTime':
        let startarr = this.data.startActTime,
          startdateArr = this.data.startActTimeArr
        startarr[column] = value
        startdateArr[2] = dateTimePicker.getMonthDay(startdateArr[0][startarr[0]], startdateArr[1][startarr[1]])
        this.setData({
          startActTimeArr: startdateArr,
          startActTime: startarr
        })
        break
      case "endTime":
        var arr = this.data.endActTime,
          dateArr = this.data.endActTimeArr;
        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
        this.setData({
          endActTimeArr: dateArr,
          endActTime: arr
        });
        break
      default:
        break
    }
  },
  clearEndTime(e) {
    console.log(e)
    this.setData({
      endTimeInput: false,
      endActTimeArr: this.data.startActTimeArr,
      endActTime: this.data.startActTime
    });
  },
  onPickChange(e) {
    console.log(e)
    const key = e.target.dataset.name
    const value = e.detail.value
    const activity = this.data.activity
    activity[key] = value
    this.setData({
      activity
    })
    console.log(this.data.activity)
  },
  seniorSetting() {
    let str = JSON.stringify(this.data.seniorSetting);
    console.log(str)
    wx.navigateTo({
      url: '../seniorSetting/index?params=' + str
    })
  },
  mainInputOnChange(e) {
    const key = e.target.dataset.name
    const value = e.detail.value
    let activity = this.data.activity
    activity[key] = value
    this.data.activity = activity
  },
  /**
   * 监听滚动
   */
  onPageScroll: function(ev) {
    const _this = this
    const base_height = wx.getSystemInfoSync().windowWidth * 0.5
    this.setData({
      bg_opacity: ev.scrollTop / base_height
    })
    if (ev.scrollTop >= base_height) {
      this.setData({
        title_color: "#333333",
        icon_type: "back_black"
      })
    } else {
      this.setData({
        title_color: "#ffffff",
        icon_type: "back"
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})