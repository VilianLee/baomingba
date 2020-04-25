// pages/management/management/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  formatTime
} from '../../../utils/util'
import {
  getMyPublicedEventInfo,
  prohibitSignUp,
  getQrCode,
  allowSignUp,
  cancelEvent,
  createActivityLink
} from '../../../API/servers'


const app = getApp()
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    activityId: '',
    activityInfo: {},
    showQrCode: false,
    showEventLink: false,
    showCancelCover: false,
    cancelReason: '',
    hasDeal: false,
    qrCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.eventId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.AjaxGetEditInfo()
  },
  AjaxGetEditInfo() {
    const _this = this
    getMyPublicedEventInfo({
      eventId: this.data.activityId
    }, res => {
      _this.setData({
        activityInfo: res
      })
    })
  },
  AjaxCreateLink(){
    const params = {
      eventId: this.data.activityId
    }
    createActivityLink(params, res => {
      if(res.e === 0) {
        this.setData({
          qrCode: res.qrcode,
          showEventLink: true
        })
      }
    })
  },
  clickGoEdit() {
    if (this.data.activityInfo.status !== 4) {
      wx.navigateTo({
        url: '../../public/public/index?type=edit&eventId=' + this.data.activityId,
      })
    }
  },
  inputOnChange(e) {
    const value = e.detail.value
    this.setData({
      cancelReason: value
    })
  },
  showCodeChange() {
    this.AjaxGetQrCode()
    this.setData({
      showQrCode: !this.data.showQrCode
    })
  },
  showEventLinkChange(){
    this.setData({
      showEventLink: !this.data.showEventLink
    })
  },
  previewImage(e){
    const url = e.currentTarget.dataset.qr
    wx.previewImage({
      urls: [url],
    })
  },
  doAnything() { },
  showCancelChange() {
    this.setData({
      showCancelCover: !this.data.showCancelCover
    })
  },
  activityOnChange() {
    const activityInfo = this.data.activityInfo
    const _this = this
    if (activityInfo.status === 1) {
      _this.AjaxProhibitSignUp()
    } else if (activityInfo.status === 2) {
      _this.AjaxAllowSignUp()
    }
  },
  AjaxGetQrCode() {
    const _this = this
    getQrCode({
      eventId: this.data.activityId
    }, res => {
      if (res.e === 0) {
        _this.setData({
          qrCode: res.qrcode
        })
      } else {
        wx.showToast({
          title: '获取二维码失败',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  AjaxAllowSignUp() { //允许报名
    const _this = this
    allowSignUp({
      eventId: this.data.activityId
    }, res => {
      if (res.e === 0) {
        _this.AjaxGetEditInfo()
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  AjaxProhibitSignUp() { //禁止报名
    const _this = this
    prohibitSignUp({
      eventId: this.data.activityId
    }, res => {
      if (res.e === 0) {
        _this.AjaxGetEditInfo()
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  AjaxCancelActivity() { //取消活动
    if (this.data.cancelReason === '') {
      wx.showToast({
        title: '请输入取消原因',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
    } else {
      const params = {
        eventId: this.data.activityId,
        reason: this.data.cancelReason
      }
      cancelEvent(params, res => {
        if (res.e === 0) {
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.hideToast()
            wx.switchTab({
              url: '../../home/home/index',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '取消失败',
            icon: 'none'
          })
          setTimeout(() => {
            wx.hideToast()
          }, 2000)
        }
      })
    }
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