import store from '../../../store'
import create from '../../../utils/create'
import {
  uploadFile
} from '../../../utils/uploads'
import {
  baseUrl
} from '../../../config'

import {
  getActivityDetails,
  getPreOrderInfo,
  bindPhoneNo,
  getJoinInfo,
  getUserInfo,
  joinActivity
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
    eventId: '',
    event: {},
    userInfo: {},
    baseUrl: baseUrl,
    getPhoneNumVisible: false
  },
  AjaxGetJoinInfo() {
    const params = {
      eventId: this.data.eventId
    }
    getJoinInfo(params, res=> {
      if(!res.phoneBound) {
        this.setData({
          getPhoneNumVisible: true
        })
      }
    })
  },
  getPhoneNumber(e) { //绑定手机
    console.log(e)
    if (e.detail.iv) {
      const params = {
        sessionkey: store.data.sessionkey,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
      }
      console.log(params)
      bindPhoneNo(params, res => {
        if (res.e === 0) {
          this.setData({
            getPhoneNumVisible: false
          })
          store.data.hasBindPhone = true
          store.update()
        }
      })
    } else {
      this.alertHidden()
    }
  },
  deleteImage(e) { // 删除图片
    const index = e.currentTarget.dataset.index // 报名项下标
    const position = e.currentTarget.dataset.position // 图片下标
    let event = this.data.event
    let option = event.conditions[index]
    option.value = option.value.filter((item, imageIndex) => imageIndex !== position)
    console.log(option)
    this.setData({
      event
    })
  },
  postImage(e) { // 上传图片
    const position = e.currentTarget.dataset.position
    let event = this.data.event
    let item = event.conditions[position]
    console.log(item)
    if (!item.value) {
      item.value = []
    }
    let _this = this
    wx.chooseImage({
      count: 9 - item.value.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFiles = res.tempFiles;
        _this.uploadFiles(tempFiles, position)
      }
    })
  },
  uploadFiles(tempFiles, position) {
    let event = this.data.event
    let option = event.conditions[position]
    if (!option.value) {
      option.value = []
    }
    tempFiles.forEach(item => { //格式化接口返回的文件对象
      uploadFile(item.path, img => {
        console.log(img)
        const obj = {
          name: img.imageURL
        }
        option.value.push(obj)
        console.log(option)
        this.setData({
          event
        })
      })
    })
  },
  inputOnChange(e) { // 输入数据
    const index = e.target.dataset.index
    const value = e.detail.value
    let event = this.data.event
    event.conditions[index].value = value
    this.setData({
      event
    })
  },
  selectOnChange(e) { // 选择数据
    console.log(e)
    const index = e.target.dataset.index
    const position = e.detail.value
    let event = this.data.event
    event.conditions[index].select = position
    event.conditions[index].value = event.conditions[index].options[position].value
    this.setData({
      event
    })
  },
  checkOnChange(e) { // 多选
    console.log(e)
    const index = e.target.dataset.index
    let event = this.data.event
    event.conditions[index].value = e.detail.value
    console.log(e.detail.value)
    this.setData({
      event
    })
  },
  AjaxSignUpActivity() { // 提交报名表单
    const _this = this
    for (let i in this.data.event.conditions) {
      const item = this.data.event.conditions[i]
      const reg = /^1[3456789]\d{9}$/
      if (item.required === 1 && !item.value) {
        wx.showToast({
          title: `请填写${item.text}`,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
        return false
      } else if (item.name === 'telephone' && !reg.test(item.value)) {
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
    }
    const params = {
      eventId: this.data.eventId,
      conditions: this.data.event.conditions.map(item => {
        return {
          name: item.name,
          value: item.value
        }
      })
    }
    joinActivity(params, res => { // 提交报名表单
      if (res.e === 0) {
        if (parseFloat(res.signupFee) > 0) {
          console.log(res.applicantId)
          wx.navigateTo({
            url: `../../public/pay-page/index?amount=${res.signupFee}&payType=join&eventId=${this.data.event.id}&applicantId=${res.applicantId}`,
          })
        } else {
          wx.showToast({
            title: '报名成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.hideToast()
            wx.navigateBack()
          }, 2000)
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        }, 2000)
      }
    })
  },
  AjaxGetPreOrder(applicantid) { // 预下单
    console.log(applicantid)
    const params = {
      applicantid
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
          title: '报名成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
          wx.redirectTo({
            url: '../activity-details/index?id=' + _this.data.eventId,
          })
        }, 2000)
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
          wx.redirectTo({
            url: '../activity-details/index?id=' + _this.data.eventId,
          })
        }, 1500)
      }
    })
  },
  AjaxGetDetails() { //获取活动详情
    const _this = this
    getActivityDetails(this.data.eventId, res => {
      let event = res.event
      event.conditions.forEach(item => {
        if (item.name === 'username') {
          item.value = store.data.userInfo.name
        } else if (item.name === 'telephone') {
          item.value = store.data.userInfo.telephone
        } else if (item.name === 'email') {
          item.value = store.data.userInfo.email
        }
      })

      _this.setData({
        event
      })
    })
  },

  AjaxGetUser() { // 获取用户信息
    const _this = this
    getUserInfo({}, res => {
      if (res.e === 0) {
        console.log(res)
        store.data.userInfo = res.user
        store.data.hasUserInfo = true
        store.update()
        _this.setData({
          userInfo: res.user
        })
        this.AjaxGetDetails()
        if (!res.user.telephone) {
          this.setData({
            getPhoneNumVisible: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      eventId: options.eventId
    })
    this.AjaxGetUser()
    this.AjaxGetJoinInfo()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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