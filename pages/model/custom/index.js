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
    pravicy: "1",
    real_name_arr: ["无需身份实名", "需要身份实名", "查看实名认证包"],
    real_name: "1"
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
  changestartActTime(e) {
    this.setData({
      startActTime: e.detail.value
    });
  },
  changeStartTimeColumn(e) {
    var arr = this.data.startActTime,
      dateArr = this.data.startActTimeArr;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      startActTimeArr: dateArr,
      startActTime: arr
    });
  },
  changeEndActTime(e) {
    console.log(e)
    this.setData({
      endActTime: e.detail.value
    });
    this.setData({
      endTimeInput: true
    });
  },
  changeEndTimeColumn(e) {
    var arr = this.data.endActTime,
      dateArr = this.data.endActTimeArr;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      endActTimeArr: dateArr,
      endActTime: arr
    });
  },
  clearEndTime(e) {
    console.log(e)
    this.setData({
      endTimeInput: false,
      endActTimeArr: this.data.startActTimeArr,
      endActTime: this.data.startActTime
    });
  },
  pravicyChange (e) {
    console.log(e)
    this.setData({
      pravicy: e.detail.value
    })
  },
  /**
   * 监听滚动
   */
  onPageScroll: function (ev) {
    const _this = this
    console.log(ev.scrollTop)
    const base_height = wx.getSystemInfoSync().windowWidth * 0.5
      console.log(wx.getSystemInfoSync().windowWidth)
    this.setData({
      bg_opacity: ev.scrollTop/base_height
    })
    if(ev.scrollTop >= base_height) {
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