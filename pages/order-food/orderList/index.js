// pages/order-food/orderList/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  getOrderList,
  cancelOrder,
  payOrder
} from '../../../API/servers'
import {
  orderStatus
} from '../../../cantants/contants'
const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    list: [],
    curpage: 1,
    numspage: 10,
    total: 0,
    orderStatus: orderStatus,
    selectTable: ''
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
    this.initPage()
  },

  tabOnClick(e) {
    const {
      tab
    } = e.currentTarget.dataset
    this.setData({
      selectTable: tab
    })
    this.initPage()
  },

  initPage() {
    this.setData({
      list: [],
      total: 0
    })
    this.AjaxGetOrderList()
  },

  cardOnClick(e) {
    const orderid = e.currentTarget.dataset.orderId
    wx.navigateTo({
      url: '/pages/order-food/orderDetail/index?orderId=' + orderid,
    })
  },

  cancelOnClick(e) {
    const {
      mobile
    } = this.data
    const {
      orderId
    } = e.currentTarget.dataset
    wx.showModal({
      title: '操作确认',
      content: '是否确认取消订单',
      success: res => {
        if (res.confirm) {
          const params = {
            mobile,
            orderid: orderId
          }
          cancelOrder(params, res => {
            wx.showToast({
              title: '订单已取消',
              duration: 2000
            })
            this.initPage()
          })
        }
      }
    })
  },

  payForOrder(e) {
    const orderid = e.currentTarget.dataset.orderid
    const params = {
      orderid,
      desc: '订餐',
      attach: '1',
      wxopenid: store.data.wxopenid
    }
    this.AjaxPayOrder(params, orderid)
  },

  AjaxPayOrder(params, orderid) {
    payOrder(params, res => {
      wx.requestPayment({
        ...res.data,
        success(res) {
          wx.reLaunch({
            url: '/pages/order-food/payResult/index?orderid=' + orderid
          })
        },
        fail(res) {
          console.log(res)
          wx.reLaunch({
            url: '/pages/order-food/payResult/index?orderid=' + orderid
          })
        }
      })
    })
  },

  AjaxGetOrderList() {
    const params = {
      mobile: this.data.mobile,
      curpage: this.data.curpage,
      numspage: this.data.numspage,
      orderStatus: this.data.selectTable ? [this.data.selectTable] : null
    }
    getOrderList(params, res => {
      let data = res.data.result
      data.forEach(item => {
        item.moneyStr = (parseInt(item.money) / 100).toFixed(2)
      })
      this.setData({
        list: this.data.list.concat(data),
        total: res.data.num
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
    this.initPage()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total > this.data.list.length) {
      this.setData({
        curpage: this.data.curpage += 1
      })
      this.AjaxGetOrderList()
    } else {
      wx.showToast({
        title: '已经没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})