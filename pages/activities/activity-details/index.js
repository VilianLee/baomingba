// pages/activities/activity-details/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getActivityDetails
} from '../../../API/servers'
import {
  formatTime
} from '../../../utils/util.js'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {}
  },
  AjaxGetDetails(){
    const _this = this
    getActivityDetails(this.data.id, res => {
      _this.setData({
        info: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
    this.AjaxGetDetails()
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