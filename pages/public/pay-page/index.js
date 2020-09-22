// pages/public/pay-page/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  payCancelAct,
  payRejectUser,
  payUserAgreeCancel,
  payJoinAct,
  getPreOrderInfo,
  checkWalletAmount,
  cancelNeedPayActPay,
  rejectNeedPaySignUpPay
} from '../../../API/servers'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    payAmount: 0,
    payType: '', // 支付类型： reject--拒绝报名 cancel--取消活动 refund--同意用户取消
    eventId: '',
    userId: '',
    applicantid: '',
    agreementShow: false,
    agree: false,
    payWay: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.applicantid)
    this.setData({
      payAmount: parseFloat(options.amount),
      payType: options.payType,
      eventId: options.eventId,
      userId: options.userId,
      applicantid: options.applicantid
    })
    console.log('applicantid:', this.data.applicantid)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.AjaxCheckAmount()
  },

  selectPayWay(e) { // 选择支付方式
    const payWay = e.currentTarget.dataset.payWay
    if (payWay === 'wallet' && this.balance < this.data.payAmount) {
      return
    } else {
      this.setData({
        payWay
      })
    }
  },

  showAgreement() {
    this.setData({
      agreementShow: true
    })
  },

  readAndAgree() {
    this.setData({
      agree: true,
      agreementShow: false
    })
  },

  agreementOnClick() {
    this.setData({
      agree: !this.data.agree
    })
  },

  AjaxCheckAmount() { //查询钱包余额
    checkWalletAmount({}, res => {
      if (res.e === 0) {
        const balance = (res.balance / 100).toFixed(2)
        this.setData({
          balance: balance,
          payWay: balance < this.data.payAmount ? 'wechat' : 'wallet'
        })
      }
    })
  },

  clickPay() { //点击支付
    if (!this.data.agree) {
      const _this = this
      wx.showModal({
        title: '提示',
        content: '请阅读并同意《报名吧协议》',
        showCancel: false,
        confirmColor: '#ffa404',
        success: res => {
          _this.showAgreement()
        }
      })
      return
    }
    if (this.data.payWay === 'wechat') {
      this.wxPrePay()
    } else if (this.data.payWay === 'wallet') {
      this.PayFromWallet()
    } else {
      wx.showToast({
        title: '未选择支付方式',
      })
    }
  },
  PayFromWallet() { // 钱包支付
    const params = {
      eventId: this.data.eventId,
      userId: this.data.userId ? this.data.userId : null
    }
    if (this.data.payType === 'reject') {
      this.AjaxPayRejectUser(params)
    } else if (this.data.payType === 'cancel') {
      this.AjaxPayCancelAct(params)
    } else if (this.data.payType === 'join') {
      this.AjaxPayJoinAct(params)
    }
  },

  AjaxPayJoinAct(params) {
    store.data.loading = true
    store.update()
    payJoinAct(params, res => {
      if (res.e === 0) {
        store.data.loading = false
        store.update()
        wx.showToast({
          title: '报名成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
          wx.navigateBack({
            delta: 2,
          })
        }, 2000)
      } else {
        wx.showToast({
          title: '报名失败',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  AjaxPayCancelAct(params) {
    store.data.loading = true
    store.update()
    payCancelAct(params, res => {
      if (res.e === 0) {
        store.data.loading = false
        store.update()
        wx.showToast({
          title: '退款成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
          wx.navigateBack()
        }, 2000)
      } else {
        wx.showToast({
          title: '退款失败',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },

  AjaxPayRejectUser(params) { // 拒绝用户 钱包支付
    store.data.loading = true
    store.update()
    payRejectUser(params, res => {
      if (res.e === 0) {
        store.data.loading = false
        store.update()
        wx.showToast({
          title: '退款成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
          wx.navigateBack()
        }, 2000)
      } else {
        wx.showToast({
          title: '退款失败',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },

  wxPrePay() {
    const params = {
      eventId: this.data.eventId,
      userId: this.data.userId ? this.data.userId : null,
      applicantid: this.data.applicantid,
      ps: 5
    }
    console.log('applicantid:', this.data.applicantid)
    console.log(params)
    if (this.data.payType === 'reject') {
      this.AjaxWxPrePay(params)
    } else if (this.data.payType === 'cancel') {
      this.AjaxCancelWxPrePay(params)
    } else if (this.data.payType === 'join') {
      this.AjaxGetPreOrder(params)
    }
  },
  AjaxWxPrePay(params) { // 拒绝报名微信预支付
    rejectNeedPaySignUpPay(params, res => { // 拒绝报名微信付款
      if (res.e === 0) {
        let obj = JSON.parse(res.orderResult)
        this.getWxPayApi(obj)
      } else {
        wx.showToast({
          title: '预下单异常，请重试',
          icon: 'error',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },

  AjaxCancelWxPrePay(params) {
    cancelNeedPayActPay(params, res => { // 拒绝报名微信付款
      if (res.e === 0) {
        let obj = JSON.parse(res.orderResult)
        this.getWxPayApi(obj)
      } else {
        wx.showToast({
          title: '预下单异常，请重试',
          icon: 'error',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },

  AjaxGetPreOrder(params) { // 报名预下单
    console.log(params)
    const param = {
      applicantid: params.applicantid
    }
    getPreOrderInfo(param, res => {
      if (res.e === 0) {
        let obj = JSON.parse(res.orderResult)
        this.getWxPayApi(obj)
      } else {
        wx.showToast({
          title: '预下单异常，请重试',
          icon: 'error',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
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
        wx.showToast({
          title: '支付成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
          wx.navigateBack({
            delta: 2,
          })
        }, 2000)
      },
      'fail': function (res) {
        console.log(res)
        store.data.loading = false
        store.update()
        wx.showToast({
          title: "支付未成功，请重新操作或联系客服",
          icon: 'error'
        });
        setTimeout(() => {
          wx.hideToast()
          wx.navigateBack()
        }, 1500)
      }
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