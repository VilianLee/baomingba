// pages/massageChair/orderResult/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  getPayResult
} from '../../../API/chair'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    countDownData: {
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      orderNumber
    } = options
    this.AjaxGetPayResult('202103101657446723125')
  },

  AjaxGetPayResult(orderNumber) {
    getPayResult({
      orderNumber
    }, res => {
      this.setData({
        orderInfo: res.data
      })
      this.computerCountdown(res.data.downMassageTime)
    })
  },

  computerCountdown(time) {
    time = parseInt(time)
    if (time > 0) {
      let hours = this.formartTime(Math.floor(time / 3600))
      let minutes = this.formartTime(Math.floor(time / 60))
      let seconds = this.formartTime(time % 60)
      console.log(seconds)
      if (minutes >= 60) {
        minutes = minutes % 60
      }
      this.setData({
        countDownData: {
          hours,
          minutes,
          seconds
        }
      })
      const _this = this
      setTimeout(() => {
        _this.computerCountdown(time - 1)
      }, 1000)
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '订单已结束，欢迎下次再来！',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }
  },

  formartTime(time) {
    if (time >= 10) {
      return String(time)
    } else {
      return `0${time}`
    }
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