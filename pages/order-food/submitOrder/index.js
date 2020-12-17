// pages/order-food/submitOrder/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  submitOrder,
  payOrder
} from '../../../API/servers'
const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    submitOrderInfo: {},
    seatData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const carData = []
    for (let i = 1; i <= 20; i++) {
      let obj = {
        value: i < 10 ? '0' + i : String(i),
        text: i < 10 ? '0' + i : String(i),
        children: []
      }
      for (let j = 0; j <= 118; j++) {
        let rowItem = j === 0 ? {
          value: '无座',
          text: '无座',
          children: [{
            value: '无',
            text: '无'
          }]
        } : {
          value: j < 10 ? '0' + j : String(j),
          text: j < 10 ? '0' + j : String(j),
          children: [{
            value: 'A',
            text: 'A'
          }, {
            value: 'B',
            text: 'B'
          }, {
            value: 'C',
            text: 'C'
          }, {
            value: 'D',
            text: 'D'
          }, {
            value: 'F',
            text: 'F'
          }, {
            value: '上铺',
            text: '上铺'
          }, {
            value: '中铺',
            text: '中铺'
          }, {
            value: '下铺',
            text: '下铺'
          }, ]
        }
        obj.children.push(rowItem)
      }
      carData.push(obj)
    }
    const seatData = [carData, carData[0].children, carData[0].children[0].children]
    console.log(seatData)
    this.setData({
      seatData: seatData
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

  },

  makeSureOrderInfo() {
    const {
      submitOrderInfo
    } = store.data
    if (!submitOrderInfo.carno || !submitOrderInfo.tseat) {
      wx.showToast({
        title: '请选择车厢席位',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showModal({
      title: '请确认您的送餐信息',
      content: `乘车日期：${submitOrderInfo.starttime}\r\n乘车车次：${submitOrderInfo.trainno}\r\n席位信息：${submitOrderInfo.carno + submitOrderInfo.tseat}\r\n姓名：${submitOrderInfo.traveller}\r\n手机号：${submitOrderInfo.contactmobile}\r\n`,
      success: res => {
        if (res.confirm) {
          this.AjaxSubmitOrder()
        }
      }
    })
  },

  AjaxSubmitOrder() {
    submitOrder(store.data.submitOrderInfo, res => {
      const orderid = res.data.orderid
      const params = {
        orderid,
        desc: '订餐',
        attach: '1',
        wxopenid: store.data.wxopenid
      }
      this.AjaxPayOrder(params, orderid)
    })
  },

  AjaxPayOrder(params, orderid) {
    payOrder(params, res => {
      wx.requestPayment({
        ...res.data,
        success(res) {
          wx.redirectTo({
            url: '/pages/order-food/payResult/index?orderid=' + orderid
          })
        },
        fail(res) {
          console.log(res)
          wx.redirectTo({
            url: '/pages/order-food/payResult/index?orderid=' + orderid
          })
        }
      })
    })
  },

  seatOnChange(e) {
    console.log('seatOnChange:', e)
    const {
      seatData
    } = this.data
    const {
      value
    } = e.detail
    store.data.submitOrderInfo.carno = seatData[0][value[0]].value
    store.data.submitOrderInfo.tseat = seatData[1][value[1]].value + (seatData[2][value[2]].value == '无' ? '' : seatData[2][value[2]].value)
    store.update()
  },

  seatColumnChange(e) {
    console.log('seatColumnChange:', e.detail)
    const {
      column,
      value
    } = e.detail
    const {
      seatData
    } = this.data
    if (column > 1) {
      return
    }
    seatData[column + 1] = seatData[column][value].children
    this.setData({
      seatData
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