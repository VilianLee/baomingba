import store from '../../../store'
import create from '../../../utils/create'

import {
  getActivityDetails,
  joinActivity
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
    eventId: '',
    event: {}
  },
  inputOnChange(e) {
    const index = e.target.dataset.index
    const value = e.detail.value
    let event = this.data.event
    event.conditions[index].value = value
    this.setData({event})
  },
  AjaxSignUpActivity() { // 
    const _this = this
    for (let i in this.data.event.conditions) {
      const item = this.data.event.conditions[i]
      if (item.required === 1 && !item.value) {
        wx.showToast({
          title: `请填写${item.text}`,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
        return false
      }
    }
    const params = {
      eventId: this.data.eventId,
      conditions: this.data.event.conditions.map(item => {
        return {
          name: item.name,
          value: item.value
        }
      })
    }
    joinActivity(params, res => {
      if(res.e === 0) {
        wx.showToast({
          title: '报名成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
          wx.navigateBack()
        }, 2000)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  AjaxGetDetails() { //获取活动详情
    const _this = this
    getActivityDetails(this.data.eventId, res => {
      let event = res.event
      _this.setData({event})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      eventId: options.eventId
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.AjaxGetDetails()
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