// pages/model/custom/index.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
import store from '../../../store'
import create from '../../../utils/create'
import {
  publicActivity,
  getEventInfo
} from '../../../API/servers'
import {
  uploadFile
} from '../../../utils/uploads'
import qiniuUploader from '../../../utils/qiniuUploader'
import {
  formatTime,
  getDate
} from '../../../utils/util'
import {
  baseUrl
} from '../../../config'
import {
  deepCopy,
  initPublic
} from '../../../utils/wxfunction'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    icon_type: "back",
    title_color: "#ffffff",
    baseUrl: baseUrl,
    pageType: '',
    eventId: '',
    bg_opacity: 0,
    pic_list: [],
    agree: true,
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
    beginTImeChange: false,
    enCodeIntro: '',
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
      isShare: 0, //是否可以分享
      conditions: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageType: options.type,
      eventId: options.eventId
    })
    this.AjaxGetEventInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  initCondition(arr) {
    console.log(arr)
    let conditions = [{
      text: "姓名",
      enableOther: 0,
      name: 'username',
      type: 'text',
      required: 1,
      selected: true,
      based: true,
    }, {
      text: "手机",
      enableOther: 0,
      name: 'telephone',
      type: 'text',
      required: 1,
      selected: true,
      based: true,
    }, {
      text: "公司",
      enableOther: 0,
      name: 'company',
      type: 'text',
      required: 0,
      selected: false,
      based: true,
    }, {
      text: "邮箱",
      enableOther: 0,
      name: 'email',
      type: 'text',
      required: 0,
      based: true,
      selected: false,
    }, {
      text: "职位",
      enableOther: 0,
      name: 'position',
      type: 'text',
      required: 0,
      based: true,
      selected: false,
    }, {
      text: "性别",
      enableOther: 0,
      name: 'sex',
      type: 'text',
      required: 0,
      based: true,
      selected: false,
    }, {
      text: "年龄",
      enableOther: 0,
      name: 'age',
      type: 'text',
      required: 0,
      selected: false,
      based: true,
    }]
    const repeatPosition = []
    arr = arr.filter(item => {
      item.selected = true
      let repeat = false
      conditions.forEach((filter,index) => {
        filter.selected = false
        console.log(item.text === filter.text)
        if(item.text === filter.text || item.name === filter.name) {
          repeat = true
          repeatPosition.push(index)
        }
      })
      if(!repeat) return item
    })
    repeatPosition.forEach(item => conditions[item].selected = true)
    console.log(arr)
    this.setData({
      conditions: conditions.concat(arr)
    })
  },
  conditionsOnChange(arr) {
    this.setData({
      conditions: arr
    })
  },
  tagOnChange(e) {
    const index = e.currentTarget.dataset.index
    let conditions = this.data.conditions
    conditions[index].selected = !conditions[index].selected
    this.setData({
      conditions
    })
  },
  editMoreInfo() {
    const conditions = encodeURIComponent(JSON.stringify(this.data.conditions))
    console.log(conditions)
    wx.navigateTo({
      url: '../../model/joinerInfo/index?conditions=' + conditions,
    })
  },
  AjaxGetEventInfo() {
    const _this = this
    getEventInfo({
      eventId: this.data.eventId
    }, res => {
      if (res.e === 0) {
        let activity = res.event
        activity.beginTimeStr = formatTime(new Date(activity.beginTime))
        activity.endTimeStr = formatTime(new Date(activity.endTime))
        activity.signUpStartTimeStr = formatTime(new Date(activity.signUpStartTime))
        activity.expireTimeStr = formatTime(new Date(activity.expireTime))
        _this.initCondition(activity.conditions)
        _this.setData({
          activity,
          enCodeIntro: encodeURIComponent(activity.intro)
        })
      } else {
        wx.showToast({
          title: '获取活动信息失败',
          icon: 'none'
        })
        setTimeout(() => {
          wx.hideToast()
          wx.navigateBack()
        }, 2000)
      }
    })
  },
  dataOnChange(key, value) { //其他页面引用导致的活动数据变化
    let activity = this.data.activity
    console.log(key, value)
    activity[key] = value
    console.log(activity)
    if (key === 'beginTime') {
      this.setData({
        beginTImeChange: true
      })
    }
    this.setData({
      activity
    })
  },
  seniorOnChange() { // 高级设置保存
    let activity = this.data.activity
    activity.conditions = store.data.activity.conditions
    activity.signUpStartTime = store.data.activity.signUpStartTime
    activity.expireTime = store.data.activity.expireTime
    activity.telephone = store.data.activity.telephone
    activity.organizer = store.data.activity.organizer
    activity.hideActLocation = store.data.activity.hideActLocation
    this.setData({
      activity
    })
    console.log(this.data.activity)
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
    if (key === 'anonSignUp') {
      wx.showModal({
        title: '提示',
        content: '若需用户身份实名请前往报名吧APP发布',
        confirmText: '去APP',
        confirmColor: '#fda402',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../about/download/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      activity[key] = value
      this.setData({
        activity
      })
    }
    console.log(this.data.activity)
  },
  seniorSetting() { //跳转高级设置
    console.log(this.data.activity)
    store.data.activity = this.data.activity
    store.update()
    wx.navigateTo({
      url: '../../model/seniorSetting/index'
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
    if (key === 'charge') {
      const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
      if (reg.test(value)) {
        console.log('right')
        activity[key] = value
      }
    } else if (key === 'payPath') {
      if (value === '3') {
        wx.showModal({
          title: '提示',
          content: '使用"报名吧"线上收费功能提现时需支付0.60%交易收付费，该手续费为微信交易手续费',
          cancelText: '放弃',
          confirmText: '同意支付',
          confirmColor: '#fda402',
          success: () => {
            console.log(activity)
            console.log(key)
            console.log(value)
            activity[key] = value
            this.setData({
              activity
            })
          }
        })
      } else {
        activity[key] = value
      }
    } else {
      activity[key] = value
    }
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
    if (!this.data.agree) {
      wx.showToast({
        title: '请勾选“同意《报名吧服务协议》”',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    const now = new Date()
    console.log(params)
    const params = this.data.activity
    if (!params.beginTime) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    if (this.data.beginTImeChange && params.beginTime && params.beginTime < now.getTime()) {
      wx.showToast({
        title: '修改后开始时间不得早于当前时间',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    if (params.endTime && params.endTime < now.getTime()) {
      wx.showToast({
        title: '结束时间不得早于当前时间',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    if (params.endTime && params.endTime < params.beginTime) {
      wx.showToast({
        title: '结束时间不得早于开始时间',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    if (!params.title || params.title === '') {
      wx.showToast({
        title: '请输入活动标题',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    let conditions = this.data.conditions.filter(item => item.selected)
    params.conditions = conditions
    publicActivity(params, res => {
      console.log(res)
      if (res.e === 0) {
        wx.showToast({
          title: '发布成功！',
          icon: 'success',
          mask: true
        })
        store.data.activity = deepCopy(initPublic)
        store.update()
        setTimeout(() => {
          wx.hideToast()
          wx.redirectTo({
            url: '../../activities/activity-details/index?id=' + res.eventId,
          })
        }, 2000)
      } else if (res.e === 601) {
        wx.showToast({
          title: '有人报名中，不能修改价格',
          icon: 'none',
          duration: 3000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 3000)
      } else {
        wx.showToast({
          title: '发布失败',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  addPic() {
    let _this = this
    wx.chooseImage({
      count: 9 - _this.data.activity.photos.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFiles = res.tempFiles;
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
        _this.uploadFiles()
      }
    })
  },

  uploadFiles() {
    let activity = this.data.activity
    let tempFiles = activity.photos;
    tempFiles.forEach(item => { //格式化接口返回的文件对象
      console.log(item.path)
      uploadFile(item.path, img => {
        console.log(img)
        item.name = img.imageURL
        item.id = ""
        item.base64 = "" //wx.getFileSystemManager().readFileSync(item.path, "base64")
        item.path = baseUrl.imageUrl + img.imageURL
        this.setData({
          activity
        })
      })
    })
  },

  setAddress() {
    const address = this.data.activity.address
    const url = `../location/index?longAddress=${address.longAddress}&longitude=${address.longitude}&latitude=${address.latitude}`
    wx.navigateTo({
      url: url,
    })
  },

  deletePic(e) { // 删除图片
    const picIndex = e.currentTarget.dataset.index
    let activity = this.data.activity
    let photos = activity.photos
    const _this = this
    wx.showModal({
      title: '提示',
      content: '是否确定删除这张图片',
      success(res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          const newPhotos = photos.filter((item, index) => index !== picIndex)
          console.log(newPhotos)
          activity.photos = newPhotos
          _this.setData({
            activity
          })
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 监听滚动
   */
  onPageScroll: function (ev) {
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
  onReady: function () {

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