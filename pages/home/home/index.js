// pages/home/home/index.js
import store from '../../../store'
import create from '../../../utils/create'

const app = getApp()

create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  chargeOnClick() {
    console.log('open')
    wx.navigateToMiniProgram({
      appId: 'wx2d4bbccf6006b283',
      success(res) {
        // 打开成功
        console.log(res)
      }
    })
  },
  officialLoad(e){
    console.log('公众号')
    console.log(e)
    if(e.detail.status !== 0) {
      wx.showToast({
        title: e.detail.errMsg,
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
  },
  orderFoodOnClick() {
    // wx.navigateToMiniProgram({
    //   appId: 'wx74268c2c92bc7cbf',
    //   success(res) {
    //     // 打开成功
    //     console.log(res)
    //   }
    // })
    let webUrl = encodeURI("https://demo.xt-kp.com/xtkp/index.html")
    wx.navigateTo({
      url: '/pages/web-view/index?url=' + webUrl,
    })
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