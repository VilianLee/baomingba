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
      require: 1
    }, {
      text: "手机",
      enableOther: 0,
      name: 'mobile',
      type: 'text',
      require: 1
    }, {
      text: "公司",
      enableOther: 0,
      name: 'company',
      type: 'text',
      require: 0
    }, {
      text: "邮箱",
      enableOther: 0,
      name: 'email',
      type: 'text',
      require: 0
    }, {
      text: "职位",
      enableOther: 0,
      name: 'position',
      type: 'text',
      require: 0
    }, {
      text: "性别",
      enableOther: 0,
      name: 'sex',
      type: 'text',
      require: 0
    }, {
      text: "年龄",
      enableOther: 0,
      name: 'age',
      type: 'text',
      require: 0
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
    const obj = new Object
    obj[key] = e.detail.value
    this.setData(obj)
  },
  editMoreInfo() {
    const conditions = encodeURIComponent(JSON.stringify(this.data.conditions))
    wx.navigateTo({
      url: '../joinerInfo/index?conditions=' + conditions,
    })
  },
  tagOnChange(e){
    const index = e.currentTarget.dataset.index
    let conditions = this.data.conditions
    conditions[index].require = conditions[index].require === 0 ? 1 : 0
    this.setData({
      conditions
    })
  },
  conditionsOnChange(arr) {
    this.setData({
      conditions: arr
    })
    store.data.activity.conditions = arr
    store.update()
  },
  submitSeniorSetting(){
    store.data.activity.conditions = this.data.conditions
    store.data.activity.signUpStartTime = this.data.signUpStartTime
    store.data.activity.expireTime = this.data.expireTime
    store.data.activity.telephone = this.data.telephone
    store.data.activity.organizer = this.data.organizer
    store.data.activity.hideJoinerList = this.data.hideJoinerList
    store.data.activity.hideActLocation = this.data.hideActLocation
    store.data.activity.hidePicWall = this.data.hidePicWall
    store.update()
    this.prePageDataChange()
  },
  prePageDataChange(){
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]; //上一页
    console.log(prevPage)
    prevPage.seniorOnChange()
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    console.log(store.data.activity)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})