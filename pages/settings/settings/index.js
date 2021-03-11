// pages/settings/settings/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {baseUrl} from '../../../config'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {

  },

  clickToWebview(e){
    const url = encodeURI(baseUrl + '/xtkp/index.html#/' + e.currentTarget.dataset.url)
    wx.navigateTo({
      url: '/pages/web-view/index?url=' + url,
    })
  },

  logout(){
    store.data.isLogin = false
    store.data.openid = null
    store.data.wxCode = null
    store.data.userInfo = {}
    store.data.hasUserInfo = false
    store.update()
    wx.switchTab({
      url: '/pages/home/home/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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