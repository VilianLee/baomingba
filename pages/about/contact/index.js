// pages/about/contact/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  makePhoneCall(e) {
    const phone = e.currentTarget.dataset.phone
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  handleContact(e) { // 跳转用户所点消息的页面路径
    console.log(e)
    let query = ''
    if(e.detail.query) {
      query = '?'
      for(let key in e.detail.query) {
        const text = key + '=' + e.detail.query[key]
        query += text
      }
    }
    wx.reLaunch({
      url: e.detail.path + query,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})