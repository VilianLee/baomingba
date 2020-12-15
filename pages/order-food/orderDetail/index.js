// pages/order-food/orderDetail/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  getOrderDetail
} from '../../../API/servers'
import {
  orderStatus,
  payTypes
} from '../../../cantants/contants'
const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderDetail: {},
    orderStatus: orderStatus,
    payTypes: payTypes
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
    this.AjaxGetOrderDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  AjaxGetOrderDetail() {
    const {
      orderId
    } = this.data
    const {
      mobile
    } = store.data
    const params = {
      orderid: orderId,
      mobile: mobile
    }
    getOrderDetail(params, res => {
      this.setData({
        orderDetail: res.data
      })
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