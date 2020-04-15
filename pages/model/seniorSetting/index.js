// pages/model/seniorSetting/index.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
import store from '../../../store'
import create from '../../../utils/create'
import { getDate } from '../../../utils/util'


const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    conditions: [], //报名者需填写
    signUpStartTime: 0, //报名开始时间
    signUpStartTimeStr: '', //报名开始时间字符串
    expireTime: 0, //报名结束时间
    expireTimeStr: '', //报名结束时间字符串
    customSponsor: [], //
    telephone: "", // 联系电话
    organizer: "", // 自定义主办方
    hideJoinerList: false, //隐藏报名名单
    hideActLocation: false, //隐藏活动地址
    hidePicWall: false, //隐藏照片墙
    hideRewardFn: false,
    onlyJoinerCanComment: false,
    activity: {}
  },
  inputOnChange(e) {
    console.log(e)
    const key = e.target.dataset.key
    const activity = this.data.activity
    activity[key] = e.detail.value
    this.setData(activity)
    store.data.activity = activity
    store.update()
  },
  dataOnChange(key, value) { //其他页面引用导致的活动数据变化
    console.log(key, value)
    const activity = this.data.activity
    activity[key] = value
    this.setData({
      activity
    })
    store.data.activity = activity
    store.update()
  },
  conditionsOnChange(arr) {
    const activity = this.data.activity
    activity.conditions = arr
    this.setData({
      activity
    })
    store.data.activity = activity
    store.update()
  },
  submitSeniorSetting() {
    const activity = this.data.activity
    const reg = /^1[3456789]\d{9}$/
    if(activity.telephone && !reg.test(activity.telephone)) {
      wx.showToast({
        title: `请填写正确的手机号码`,
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return false
    }
    this.prePageDataChange()
  },
  prePageDataChange() {
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]; //上一页
    console.log(prevPage)
    prevPage.seniorOnChange()
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
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