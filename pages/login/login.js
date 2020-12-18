// pages/login/login.js
import store from '../../store'
import create from '../../utils/create'
const app = getApp()

import {
  login,
  bindPhoneNo
} from '../../API/servers'
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    getPhoneNumVisible: false,
    wxopenid: ''
  },
  getPhoneNumber(e) { //绑定手机
    console.log(e)
    if (e.detail.iv) {
      const params = {
        wxopenid: this.data.wxopenid,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
      }
      bindPhoneNo(params, res => {
        console.log(res.data.openid)
        if (res.data.openid) {
          this.setData({
            isLogin: true,
            getPhoneNumVisible: false
          })
          store.data.isLogin = true
          store.data.openid = res.data.openid
          store.data.mobile = res.data.mobile
          store.update()
          wx.navigateBack()
        }
      })
    } else {
      this.alertHidden()
    }
  },
  alertHidden() {
    this.setData({
      getPhoneNumVisible: false
    })
  },
  getUserInfo(info) { //获取用户信息
    if (info.detail.userInfo) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res.code)
          store.data.wxCode = res.code
          store.update()
          this.AjaxSilentLogin(res.code)
        },
        fail: res => {
          $Toast({
            content: res.message,
            type: 'error'
          });
        }
      })
    }
  },
  AjaxSilentLogin(code) {
    login({
      jsCode: code
    }, res => {
      console.log(res)
      store.data.sessionkey = res.data.wxopenid
      if (res.data.openid) {
        store.data.isLogin = true
        store.data.openid = res.data.openid
        store.data.mobile = res.data.mobile
        store.data.wxopenid = res.data.wxopenid
        store.update()
        wx.navigateBack()
      } else {
        this.setData({
          wxopenid: res.data.wxopenid,
          getPhoneNumVisible: true
        })
        store.data.wxopenid= res.data.wxopenid
        store.update()
      }
    })
  },

  backPage() {
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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