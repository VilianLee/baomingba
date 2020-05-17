// pages/activities/activity-details/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getActivityDetails,
  getJoinCode,
  getPreOrderInfo,
  cancelJoin,
  createActivityLink,
  cancelPayJoin,
  likeActivity,
  unFollowUser,
  followUser,
  cancelLiked
} from '../../../API/servers'
import {
  formatTime,
  getLeftTime
} from '../../../utils/util.js'
import {
  baseUrl
} from '../../../config'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    loading: false,
    userInfo: {},
    info: {},
    pageLogic: {},
    btnDisable: false,
    showJoinCode: false,
    isOverShare: true,
    joinCode: {},
    baseUrl: baseUrl,
    showCancelCover: false,
    autyShow: false,
    autyContent: {},
    applicantId: '',
    cancelReason: "",
    qrCode: '',
    signUpStartTime: '',
    leftTime: '',
    leftTimerStr: '',
    secInday: '',
    showEventLink: false
  },
  validLogin() {
    if (!store.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false
    } else {
      return true
    }
  },
  AjaxCreateLink() {
    if (!this.validLogin()) {
      return
    }
    const params = {
      eventId: this.data.id
    }
    createActivityLink(params, res => {
      if (res.e === 0) {
        this.setData({
          qrCode: res.qrcode,
          showEventLink: true
        })
      }
    })
  },
  signUpLink(e) {
    if (!this.validLogin()) {
      return
    }
    const eventId = this.data.id
    wx.navigateTo({
      url: '../sign-up/sign-up?eventId=' + eventId,
    })
  },
  showEventLinkChange() {
    if (!this.validLogin()) {
      return
    }
    this.setData({
      showEventLink: !this.data.showEventLink
    })
  },
  showAutyFrame(e) {
    if (!this.validLogin()) {
      return
    }
    const content = e.currentTarget.dataset.content
    console.log(content)
    this.setData({
      autyShow: true,
      autyContent: content
    })
  },
  hideAutyFrame() {
    if (!this.validLogin()) {
      return
    }
    if (!this.validLogin()) {
      return
    }
    this.setData({
      autyShow: false
    })
  },
  showJoinCodeOnHide() {
    if (!this.validLogin()) {
      return
    }
    if (!this.validLogin()) {
      return
    }
    this.setData({
      showJoinCode: false
    })
  },
  payForJoin(){
    if (!this.validLogin()) {
      return
    }
    wx.navigateTo({
      url: `../../public/pay-page/index?amount=${this.data.info.charge}&payType=join&eventId=${this.data.applicantId}`,
    })
  },
  AjaxGetPreOrder() { // 预下单
    if (!this.validLogin()) {
      return
    }
    console.log(this.data.applicantId)
    const params = {
      applicantid: this.data.applicantId
    }
    getPreOrderInfo(params, res => {
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
  previewImg(e) {
    if (!this.validLogin()) {
      return
    }
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url],
    })
  },
  getWxPayApi(obj) { //唤起微信支付
    if (!this.validLogin()) {
      return
    }
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
        }, 1500)
      }
    })
  },
  likeOnClick(e) { // 点击收藏按钮
    if (!this.validLogin()) {
      return
    }
    console.log(e)
    const params = {
      eventId: this.data.id
    }
    let info = this.data.info
    if (info.userStatus.liked) {
      cancelLiked(params, res => {
        if (res.e === 0) {
          wx.showToast({
            title: '已取消',
          })
          info.userStatus.liked = false
          info.likeCount = info.likeCount - 1
          this.setData({
            info
          })
          setTimeout(() => {
            wx.hideToast()
          }, 2000)
        }
      })
    } else {
      likeActivity(params, res => {
        if (res.e === 0) {
          wx.showToast({
            title: '已收藏',
          })
          info.userStatus.liked = true
          info.likeCount = info.likeCount + 1
          this.setData({
            info
          })
          setTimeout(() => {
            wx.hideToast()
          }, 2000)
        }
      })
    }
  },
  cancelOnClick() { // 取消弹窗显示或取消
    if (!this.validLogin()) {
      return
    }
    console.log(this.data.showCancelCover)
    this.setData({
      showCancelCover: !this.data.showCancelCover
    })
  },
  inputOnChange(e) { // 输入取消原因
    this.setData({
      cancelReason: e.detail.value
    })
  },
  AjaxCancelJoin() { // 取消报名
    const params = {
      eventId: this.data.id,
      reason: this.data.cancelReason
    }
    if (params.reason) {
      if (this.data.info.eventStatus.needPay) { // 判断是否收费活动
        this.AjaxNeedPayActCancel(params)
      } else {
        this.AjaxFreeActCancel(params)
      }
    }
  },
  AjaxNeedPayActCancel(params) { // 收费活动取消报名
    if (!this.validLogin()) {
      return
    }
    const _this = this
    cancelPayJoin(params, res => {
      if (res.e === 0) {
        this.setData({
          showCancelCover: false
        })
        wx.showModal({
          title: '主办方已收到退款通知，请等待确认',
          content: '通过后，报名费将微信支付原路退回',
          showCancel: false,
          confirmColor: '#ffa404',
          success(res) {
            if (res.confirm) {
              _this.AjaxGetDetails()
            }
          }
        })
      }
    })
  },
  AjaxFreeActCancel(params) { // 免费活动取消报名
    if (!this.validLogin()) {
      return
    }
    cancelJoin(params, res => {
      if (res.e === 0) {
        this.setData({
          showCancelCover: false
        })
        wx.showToast({
          title: '已取消',
        })
        setTimeout(() => {
          wx.hideToast()
          this.AjaxGetDetails()
        }, 2000)
      }
    })
  },
  AjaxGetJoinCode() { // 获取报名凭证
    if (!this.validLogin()) {
      return
    }
    const _this = this
    getJoinCode({
      eventId: this.data.id
    }, res => {
      _this.setData({
        joinCode: res.evouchers[0],
        showJoinCode: true
      })
    })
  },
  AjaxGetDetails() { //获取活动详情
    const _this = this
    getActivityDetails(this.data.id, res => {
      let event = res.event
      event.beginTimeStr = formatTime(new Date(event.beginTime), 'detail')
      event.endTimeStr = formatTime(new Date(event.endTime), 'detail')
      let pageLogic = {
        isPayPending: event.userStatus.signupStatus === 6,
        isNormalEvent: event.actCat === 0,
        isStatisticsEvent: event.actCat === 2,
        isVoteEvent: event.actCat === 3,
        isPPTEvent: event.actCat === 4,
        isArticle: event.actCat === 5,
        isRecFlagNormalEvent: event.recFlag === -1,
        showVoucher: false
      }
      let btnDisable = false
      if (event.eventStatus.signUpVisible || (!event.eventStatus.signUpCancellable && !event.eventStatus.signUpRefundApplied)) {
        btnDisable = true
      } else if (event.eventStatus.signUpVisible) {
        if (pageLogic.isVoteEvent) {
          pageLogic.actionName = 'vote'
        } else {
          pageLogic.actionName = 'signup'
        }
      } else if (pageLogic.isArticle) {
        if (pageLogic.isFollowed) {
          btnDisable = true
          pageLogic.actionName = 'unfollow-org'
        } else {
          pageLogic.actionName = 'follow-org'
        }
      } else if (event.eventStatus.signUpCancellable && !event.eventStatus.signUpRefundApplied) {
        pageLogic.actionName = 'cancel-signup'
      }
      if (event.actCat == 0 && pageLogic.isRecFlagNormalEvent) {
        pageLogic.showVoucher = event.isCheck ? event.userStatus.signupStatus == 2 : event.userStatus.signupStatus == 1
      }
      let signUpStartTime = event.signUpStartTime ? event.signUpStartTime : 0
      _this.getLeftTimeStr(signUpStartTime)
      _this.setData({
        info: event,
        applicantId: res.applicantId,
        signUpStartTime,
        pageLogic
      })
    })
  },
  getLeftTimeStr(signUpStartTime) {
    const secInday = 86400000
    const nowTime = new Date()
    let leftTime = signUpStartTime - nowTime.getTime()
    let leftTimerStr = ""
    if (leftTime > secInday) {
      leftTimerStr = parseInt(leftTime / 86400000) + '天'
    } else {
      leftTimerStr = getLeftTime(leftTime)
    }
    const _this = this
    this.setData({
      leftTime,
      leftTimerStr
    })
    if (leftTime > 0) {
      setTimeout(() => {
        _this.getLeftTimeStr(signUpStartTime)
      }, 1000);
    }
  },
  followOrganizer(e) { // 关注
    if (!this.validLogin()) {
      return
    }
    const params = {
      userUid: e.currentTarget.dataset.id
    }
    followUser(params, res => {
      if (res.e === 0) {
        wx.showToast({
          title: '关注成功',
          icon: 'success'
        })
        this.AjaxGetDetails()
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  AjaxUnFollow(e) { // 取关
    if (!this.validLogin()) {
      return
    }
    const params = {
      userUid: e.currentTarget.dataset.id
    }
    unFollowUser(params, res => {
      if (res.e === 0) {
        wx.showToast({
          title: '关注成功',
          icon: 'success'
        })
        this.AjaxGetDetails()
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  makePhoneCall(e) { // 联系组织者
    if (!this.validLogin()) {
      return
    }
    const phone = e.currentTarget.dataset.phone
    console.log(e)
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    } else {
      wx.showToast({
        title: '该用户未认证手机号码',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
    }
  },
  seeMap() {
    const address = this.data.info.address
    const url = `../map/index?longAddress=${address.longAddress}&longitude=${address.longitude}&latitude=${address.latitude}`
    wx.navigateTo({
      url: url,
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
    console.log(this.data)
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
    this.AjaxGetDetails()
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
    return {
      title: this.data.info.title,
      imageUrl: this.data.baseUrl.imageUrl + '/' + this.data.info.photos[0].name
    };
  }
})