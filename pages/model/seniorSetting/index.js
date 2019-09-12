// pages/model/seniorSetting/index.js
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