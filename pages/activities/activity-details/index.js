// pages/activities/activity-details/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getActivityDetails,
  getJoinCode,
  getPreOrderInfo,
  cancelJoin,
  getLeftPayTime,
  cancelPayJoin,
  likeActivity,
  cancelLiked
} from '../../../API/servers'
import {
  formatTime
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
    applicantId: '',
    cancelReason: ""
  },
  showJoinCodeOnHide() {
    this.setData({
      showJoinCode: false
    })
  },
  AjaxGetPreOrder() { // 预下单
    console.log(this.data.applicantId)
    const params = {
      applicantid: this.data.applicantId
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
        }, 1500)
      }
    })
  },
  likeOnClick(e) { // 点击收藏按钮
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
      _this.setData({
        info: event,
        applicantId: res.applicantId,
        pageLogic
      })
    })
  },
  followOrganizer() {

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
      imageUrl: this.data.baseUrl.imageUrl + this.data.info.photos[0].name
    };
  }
})