// pages/model/seniorSetting/index.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinerNeedInfo: [{
      name: "姓名",
      require: true
    }, {
      name: "手机",
      require: true
    }],
    enrollStartTime: "",
    enrollEndTime: "",
    date: '2018-10-01',
    time: '12:00',
    startSignTimeArr: null,
    startSignTime: null,
    endSignTimeArr: null,
    endSignTime: null,
    endTimeInput: false,
    startYear: 2000,
    endYear: 2050,
    customSponsor: [],
    sponsorMobile: "",
    hideJoinerList: false,
    hideActLocation: false,
    hidePicWall: false,
    hideRewardFn: false,
    onlyJoinerCanComment: false,
    joinerNeedInfoSingle: []
  },
  switchChange(e) {
    console.log(e)
    const key = e.target.id
    const obj = new Object
    obj[key] = e.detail.value
    this.setData(obj)
  },
  editMoreInfo() {
    wx.navigateTo({
      url: '../joinerInfo/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.params)
    const params = JSON.parse(options.params);
    console.log(params)
    this.setData(params)
    this.setData({
      joinerNeedInfoSingle: [params.joinerNeedInfo[0], params.joinerNeedInfo[1], params.joinerNeedInfo[2]]
    })
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      startSignTimeArr: obj1.dateTimeArray,
      startSignTime: obj1.dateTime,
      endSignTimeArr: obj1.dateTimeArray,
      endSignTime: obj1.dateTime
    });
  },

  changeStartSignTime(e) {
    this.setData({
      startSignTime: e.detail.value
    });
  },
  changeStartTimeColumn(e) {
    var arr = this.data.startSignTime,
      dateArr = this.data.startSignTimeArr;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      startSignTimeArr: dateArr,
      startSignTime: arr
    });
  },
  changeEndSignTime(e) {
    console.log(e)
    this.setData({
      endSignTime: e.detail.value
    });
    this.setData({
      endTimeInput: true
    });
  },
  changeEndTimeColumn(e) {
    var arr = this.data.endSignTime,
      dateArr = this.data.endSignTimeArr;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      endSignTimeArr: dateArr,
      endSignTime: arr
    });
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