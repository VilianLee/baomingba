// pages/user/user/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getUserInfo,
  login,
  authUser,
  bindPhoneNo
} from '../../../API/servers'



const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    hasUserInfo: false,
    isLogin: false,
    userData: {},
    userInfo: {},
    getPhoneNumVisible: false,
  },
  onShareClick() {

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
        this.setData({
          isLogin: true,
          getPhoneNumVisible: false
        })
        this.AjaxGetUser()
      })
    } else {
      this.alertHidden()
    }
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
  AjaxSilentLogin(code){
    login({
      code: code
    }, res => {
      console.log(res)

      this.AjaxAuthorUser()
      // if (res.e === 0) {
      //   wx.setStorageSync("_baomingbaCookie", res.header["Set-Cookie"])
      //   store.data.isLogin = true
      //   store.update()
      //   this.AjaxGetUser()
      // } else {
      //   this.AjaxAuthorUser()
      // }
    })
  },
  AjaxGetUser() {
    const _this = this
    store.data.hasUserInfo = true
    store.update()
    getUserInfo({}, res => {
      _this.setData({
        htmlStr: res
      })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(store.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const _this = this
    getUserInfo({}, res => {
      _this.setData({
        userInfo: res.user
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