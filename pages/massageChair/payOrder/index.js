// pages/massageChair/payOrder/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  chairPayOrder
} from '../../../API/chair'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    chairList: [],
    orderInfo: {},
    mid: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      mid,
      code
    } = options
    const {
      chairList
    } = store.data
    let info = {}
    chairList.forEach(item => {
      if (item.mid == mid) {
        info = item
      }
    })
    console.log('chairList:', chairList)
    this.setData({
      orderInfo: info,
      code,
      mid
    })
  },

  AjaxPayOrder() {
    const {
      code,
      mid,
      orderInfo
    } = this.data
    const params = {
      deviceCode: code,
      mid: mid,
      wxOpenId: store.data.wxopenid,
      orderAmount: orderInfo.price,
      paymentAmount: orderInfo.price,
      discountAmount: orderInfo.discountMoney ? parseFloat(orderInfo.discountMoney) : 0,
      masTimeMin: orderInfo.duration
    }
    chairPayOrder(params, res => {
      this.showWxPay(res.data)
    })
  },

  showWxPay(option) {
    wx.requestPayment({
      timeStamp: option.timeStamp,
      nonceStr: option.nonceStr,
      package: option.prepayId,
      signType: option.signType,
      paySign: option.paySign,
      success: res => {
        console.log(res)
        wx.redirectTo({
          url: '../orderResult/index?orderNumber=' + option.sonumber,
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  changeOrder() {
    wx.navigateBack()
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