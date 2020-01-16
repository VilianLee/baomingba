import store from '../../../store'
import create from '../../../utils/create'

import {
  getActivityDetails,
  getPreOrderInfo,
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
          if(parseFloat(res.signupFee) > 0) {
            console.log(res.applicantId)
            this.AjaxGetPreOrder(res.applicantId)
          } else {
            wx.navigateBack()
          }
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
  AjaxGetPreOrder(applicantid){ // 预下单
    console.log(applicantid)
    const params = {
      applicantid
    }
    getPreOrderInfo(params, res => {
      let obj = JSON.parse(res.orderResult)
      this.getWxPayApi(obj)
    })
  },
  getWxPayApi(obj) { //唤起微信支付
    const _this = this
    console.log(obj)
    store.data.loading = true
    store.update()
    wx.requestPayment({
      'timeStamp': obj.timestamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        store.data.loading = false
        store.update()
        console.log('唤起微信支付成功')
      },
      'fail': function (res) {
        console.log(res)
        store.data.loading = false
        store.update()
        wx.showToast({
          title: "支付未成功，请重新支付或联系客服",
          icon: 'error'
        });
        setTimeout(() => {
          wx.hideToast()
          wx.redirectTo({
            url: '../activity-details/index?id=' + _this.data.eventId,
          })
        }, 1500)
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