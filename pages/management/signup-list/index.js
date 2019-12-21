// pages/management/signup-list/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getSignerList,
  exportListToEmail,
  rejectSignUp
} from '../../../API/servers'
import {
  formatTime
} from '../../../utils/util.js'

const app = getApp()

const signer = {
  "id": 405636, //id
  "username": "Dongdong", //用户名
  "telephone": "18958081773", //手机号
  "signIn": 0, //是否报名
  "status": 1, //状态
  "createTime": 1567930374624, //创建是啊金
  "conditions": [{ //报名项
    "name": "telephone", //名称
    "text": "手机",
    "type": "tel",
    "options": [],
    "value": "18958081773", //值
    "required": 1, //必填
    "enableOther": 0, //允许填其他值
    "otherValue": null //其他值
  }],
  "anchor": "1567930374624", //当前的锚
  "headPhoto": "http://avatar.bmbee.cn/web3/cgeo91547145540630?imageView2/1/w/120/h/120", //头像
  "userId": "zptbh159410", //用户id
  "charge": 0.0, //收费
  "signUpPermit": false, //允许报名
  "reason": null, //理由
  "reasonUpdateTime": null, //理由更新时间
  "refundReason": null, //退款理由
  "refundTime": null //退款时间
}

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    eventId: '',
    signupStatus: '2',
    signerList: [],
    totalRows: 0,
    pageSize: 20,
    selectSigner: {},
    showEmailInput: false,
    postEmail: '',
    rejectReason: '',
    signupPermit: false,
    showReject: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      eventId: options.eventId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //this.AjaxGetSignerList()
  },

  signupPermitOnChange() { // 是否允许再次报名
    console.log('change')
    const status = this.data.signUpPermit
    this.setData({
      signUpPermit: !status
    })
  },

  showEmailInputChange() { // 显示email输入弹窗
    console.log(this.data.showEmailInput)
    this.setData({
      showEmailInput: !this.data.showEmailInput
    })
  },

  showRejectOnChange(e) { // 显示拒绝报名弹窗
    const index = e.currentTarget.dataset.index
    if (this.data.showReject) {
      this.setData({
        showReject: false,
        signupPermit: false
      })
    } else {
      this.setData({
        showReject: true,
        selectSigner: this.data.signerList[index]
      })
    }
  },

  tabsChange(e) { // tab切换
    const value = e.detail.key
    this.setData({
      signupStatus: value,
      signerList: [],
      totalRows: 0
    })
    this.AjaxGetSignerList()
  },

  inputOnChange(e) { // 输入框变化
    const value = e.detail.value
    const key = e.target.dataset.key
    this.setData({
      [key]: value
    })
  },

  AjaxExportList() { // 导出到邮箱
    const params = {
      email: this.data.postEmail,
      eventId: this.data.eventId
    }
    const _this = this
    if (this.data.signerList.length > 0) {
      exportListToEmail(params, res => {
        if (res.e === 0) {
          wx.showToast({
            title: '导出成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.hideToast()
          }, 2000)
        } else {
          wx.showToast({
            title: '导出失败，请重试',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.hideToast()
          }, 2000)
        }
        _this.setData({
          showEmailInput: false
        })
      })
    }
  },

  otherInfoOnClick() {
    //没啥用，防冒泡
  },

  AjaxRejectSign() { //拒绝报名
    const params = {
      eventId: this.data.eventId,
      signerId: this.data.selectSigner.id,
      status: 3,
      rejectReason: this.data.rejectReason,
      signupPermit: this.data.signupPermit
    }
    if (!params.rejectReason) {
      wx.showToast({
        title: '请输入拒绝理由',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
      return
    }
    const _this = this
    rejectSignUp(params, res => {
      if (res.e === 0) {
        _this.setData({
          showReject: false,
          signerList: []
        })
        _this.AjaxGetSignerList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.hideToast()
        })
      }
    })
  },

  makePhoneCalls(e) { //打电话
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },

  ClickPostMessage(e) { //发送短信
    wx.showToast({
      title: '该功能调试中...',
      icon: 'none',
      duration: 2000
    })
    setTimeout(() => {
      wx.hideToast()
    })
  },

  cardDetailOnClick(e) { //显示报名者详情
    const index = e.currentTarget.dataset.index
    let signerList = this.data.signerList
    signerList[index].showDetail = !signerList[index].showDetail
    this.setData({
      signerList
    })
  },

  AjaxGetSignerList() { //获取报名者名单
    const params = {
      eventId: this.data.eventId,
      status: this.data.signupStatus,
      pageSize: this.data.pageSize,
      startNum: this.data.signerList.length
    }
    const _this = this
    getSignerList(params, res => {
      let list = _this.data.signerList.concat(res.signUps.map(item => {
        item.showDetail = false
      }))
      _this.setData({
        totalRows: res.signUpTotal,
        signerList: list
      })
    })
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
    this.setData({
      totalRows: 0,
      signerList: []
    })
    this.AjaxGetSignerList()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.signerList.length < this.data.totalRows) {
      this.AjaxGetSignerList()
    } else {
      wx.showToast({
        title: '已经没有更多了',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})