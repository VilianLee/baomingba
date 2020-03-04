// pages/about/feedback/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  feedBack
} from '../../../API/servers'


const app = getApp()
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    feedback: ""
  },
  textOnChange(e) {
    this.setData({
      feedback: e.detail.value
    })
  },
  AjaxFeedBack(){
    if(!this.data.feedback || this.data.feedback === "") {
      wx.showToast({
        title: '请输入反馈意见后提交',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    const params = {
      content: this.data.feedback
    }
    feedBack(params, res => {
      console.log(res)
      if(res.e === 0) {
        this.setData({
          feedback: ""
        })
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
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