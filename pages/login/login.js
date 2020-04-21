// pages/login/login.js
import store from '../../store'
import create from '../../utils/create'
import {
  Login
} from '../../API/login'

const app = getApp()

import {
  getUserInfo,
  login,
  authUser,
  bindPhoneNo
} from '../../API/servers'
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    getPhoneNumVisible: false
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
            isLogin: true,
            getPhoneNumVisible: false
          })
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
      const userInfo = info.detail.userInfo
      console.log(info)
      this.setData({
        userData: info
      })
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
      code: code
    }, res => {
      console.log(res)
      if (res.e === 0) {
        store.data.isLogin = true
        store.data.sessionkey = res.sessionKey
        store.update()
        wx.navigateBack()
      } else {
        this.AjaxAuthorUser()
      }
    })
  },
  AjaxAuthorUser() {
    const info = this.data.userData
    wx.login({
      success: resp => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(resp.code)
        store.data.wxCode = resp.code
        store.update()
        const params = {
          id: 'wx7758de782c51657c',
          code: resp.code,
          rawData: info.detail.rawData,
          signature: info.detail.signature,
          iv: info.detail.iv,
          encryptedData: info.detail.encryptedData
        }
        console.log(params)
        authUser(params, res => {
          console.log(res)
          if (res.e === 0) {
            store.data.isLogin = true
            store.data.sessionkey = res.sessionkey
            store.update()
            this.setData({
              isLogin: true,
              getPhoneNumVisible: true
            })
          }
        })
      }
    })
  },
  backPage(){
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