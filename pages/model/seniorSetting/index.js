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
    conditions: [{
      text: "姓名",
      enableOther: 0,
      name: 'username',
      type: 'text',
      based: true,
      required: 1
    }, {
      text: "手机",
      enableOther: 0,
      name: 'mobile',
      type: 'text',
      based: true,
      required: 1
    }, {
      text: "公司",
      enableOther: 0,
      name: 'company',
      type: 'text',
      based: true,
      required: 0
    }, {
      text: "邮箱",
      enableOther: 0,
      name: 'email',
      type: 'text',
      based: true,
      required: 0
    }, {
      text: "职位",
      enableOther: 0,
      name: 'position',
      type: 'text',
      based: true,
      required: 0
    }, {
      text: "性别",
      enableOther: 0,
      name: 'sex',
      based: true,
      type: 'text',
      required: 0
    }, {
      text: "年龄",
      enableOther: 0,
      name: 'age',
      type: 'text',
      based: true,
      required: 0
    }], //报名者需填写
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
  editMoreInfo() {
    const conditions = encodeURIComponent(JSON.stringify(this.data.activity.conditions))
    console.log(conditions)
    wx.navigateTo({
      url: '../joinerInfo/index?conditions=' + conditions,
    })
  },
  tagOnChange(e) {
    const index = e.currentTarget.dataset.index
    const activity = this.data.activity
    let conditions = activity.conditions
    conditions[index].required = conditions[index].required === 0 ? 1 : 0
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