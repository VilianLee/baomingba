// pages/model/custom/index.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
import store from '../../../store'
import create from '../../../utils/create'
import {
  publicActivity
} from '../../../API/servers'
import {
  upLoadImg
} from '../../../utils/wxfunction'
import {
  formatTime,
  getDate
} from '../../../utils/util'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    icon_type: "back",
    title_color: "#ffffff",
    bg_opacity: 0,
    pic_list: [],
    agree: false,
    date: '2018-10-01',
    time: '12:00',
    endTimeInput: false,
    startYear: 2000,
    endYear: 2050,
    financial: 0,
    joinerNum: 0,
    pravicy_arr: ["私密活动", "公开可见", "仅粉丝可见"],
    real_name_arr: ["无需身份实名", "需要身份实名", "查看实名认证包"],
    real_name: "1",
    uploadFileUrls: [],
    activity: {
      createSource: 2, //创建源,(安卓，ios还是h5)
      title: null, //活动标题
      beginTime: null, //活动开始时间
      beginTimeStr: '',
      endTimeStr: '',
      endTime: null, //活动结束时间
      signUpStartTime: null, //报名开始时间
      expireTime: null, //到期时间
      telephone: "", //联系电话
      signUpLimit: "0", //报名人数限制
      charge: null, //收费费用
      status: "0", //活动状态
      payPath: 0, //支付方式
      organizer: "", //主办方
      address: {
        province: "", //省
        city: "", //市
        district: "", //区
        shortAddress: "", //地址
        longAddress: "", //完整地址
        longitude: "", //经度
        latitude: "" //维度
      },
      hideAddr: false, //是否隐藏地址
      publicType: 1, //公开类型(公开，私密)
      anonSignUp: 0, //匿名报名
      conditions: [{ //报名项
        name: "username"
      }, {
        name: "telephone"
      }],
      photowallControl: false, //是否有照片墙
      tipControl: false, //是否可以打赏
      intro: "", //活动介绍
      introPhotos: [],
      introType: 1, //介绍类型
      photos: [],
      isShare: 0 //是否可以分享
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const nowDate = new Date()
    let activity = this.data.activity
    activity.beginTime = nowDate.getTime()
    activity.beginTimeStr = formatTime(nowDate)
    this.setData({
      activity
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },
  dataOnChange(key, value) { //其他页面引用导致的活动数据变化
    let activity = this.data.activity
    console.log(key, value)
    activity[key] = value
    console.log(activity)
    this.setData({
      activity
    })
  },
  agreeOnChange() {
    this.setData({
      agree: !this.data.agree
    })
  },
  onPickChange(e) {
    console.log(e)
    const key = e.target.dataset.name
    const value = e.detail.value
    const activity = this.data.activity
    activity[key] = value
    this.setData({
      activity
    })
    console.log(this.data.activity)
  },
  seniorSetting() { //跳转高级设置
    let str = JSON.stringify(this.data.seniorSetting);
    console.log(str)
    wx.navigateTo({
      url: '../seniorSetting/index'
    })
  },
  setSeniorSetting(key, obj) {
    let activity = this.data.activity
    activity[key] = obj
    this.setData({
      activity
    })
  },
  inputOnChange(e) {
    console.log(e)
    const key = e.target.dataset.name
    const value = e.detail.value
    let activity = this.data.activity
    activity[key] = value
    this.setData({
      activity
    })
  },
  financialSettingVisibleChange() { // 费用设置显示
    this.setData({
      financialSetting: !this.data.financialSetting
    })
  },
  financialTypeOnChange(e) { // 支付方式设置
    const value = e.detail.value
    let activity = this.data.activity
    activity.payPath = value
    this.setData({
      activity
    })
  },
  ajaxPublicActivity() {
    const params = this.data.activity
    publicActivity(params, res => {
      console.log(res)
    })
  },
  addPic() {
    let _this = this
    wx.chooseImage({
      count: 9 - _this.data.activity.photos.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFiles = res.tempFiles;
        tempFiles.map(item => { //格式化接口返回的文件对象
          item.name = item.path
          item.id = item.path
          item.base64 = wx.getFileSystemManager().readFileSync(item.path, "base64")
          upLoadImg(item.path, res => {
            //item.base64
            console.log(res)
          })
        })
        let activity = _this.data.activity
        let uploadFileList = activity.photos.concat(tempFiles);
        let tempPaths = res.tempFilePaths
        let uploadFileUrls = _this.data.uploadFileUrls.concat(tempPaths)
        activity.photos = uploadFileList
        console.log(activity.photos)
        _this.setData({
          activity,
          uploadFileUrls: uploadFileUrls
        })
      }
    })
  },
  /**
   * 监听滚动
   */
  onPageScroll: function(ev) {
    const _this = this
    const base_height = wx.getSystemInfoSync().windowWidth * 0.5
    this.setData({
      bg_opacity: ev.scrollTop / base_height
    })
    if (ev.scrollTop >= base_height) {
      this.setData({
        title_color: "#333333",
        icon_type: "back_black"
      })
    } else {
      this.setData({
        title_color: "#ffffff",
        icon_type: "back"
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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