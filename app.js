//app.js
import { login } from 'API/servers.js'
import store from './store'
App({
  onLaunch: function () {
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        store.data.userInfo = res.userInfo
        store.data.hasUserInfo = true
        store.update()
      },
      fail: function (err) {
      }
    })
    login({}, res => {
      this.globalData.userId = res.userId
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: ''
  },
  config: {
    title_height: "64",
    statusbarHeight: "24",
    titleIcon_height: "32",
    title_top: "24", 
    prefix: 24
  }
})