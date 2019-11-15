// pages/activities/activity-details/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getActivityDetails,
  signUpActivity
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
    id: '',
    loading:false,
    userInfo: {},
    info: {},
    pageLogic: {},
    btnDisable: false,
  },
  AjaxGetDetails(){ //获取活动详情
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
        pageLogic
      })
    })
  },
  followOrganizer(){

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

  }
})