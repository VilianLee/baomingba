// pages/user/user/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getUserInfo,
  login,
  authUser,
  bindPhoneNo,
  getQrCodeResult,
  signupOnQrCode
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
  scanOnClick() { // 使用扫一扫
    const _this = this
    wx.scanCode({
      success: (res) => {
        console.log('扫一扫')
        console.log(res)
        const arr = res.result.split('/')
        console.log(arr)
        if (arr[1] === 'evoucher') { // 验票
          getQrCodeResult(res.result, res => {
            let message = _this.evoucherCode(res)
            wx.showToast({
              title: message,
              icon: 'none',
              duration: 2000
            })
            setTimeout(() => {
              wx.hideToast()
            }, 2000)
          })
        } else if (arr[0] === 'http:' || arr[0] === 'https:') {
          const urlKey = arr[2].split('.')[1]
          console.log(urlKey)
          if (arr[arr.length - 1] === 'signin') { // 二维码签到
            let url = `/${arr[3]}/${arr[4]}/${arr[5]}`
            getQrCodeResult(url, res => {
              let message = _this.signInActivity(arr, res)
              wx.showToast({
                title: message,
                icon: 'none',
                duration: 2000
              })
              setTimeout(() => {
                wx.hideToast()
              }, 2000)
            })
          } else if (urlKey === 'bmbee' || urlKey === '51bmb') {// 详情
            wx.navigateTo({
              url: `../../activities/activity-details/index?id=${arr[4]}`,
            })
          } else {
            let message = '无法识别的链接'
            wx.showToast({
              title: message,
              icon: 'error',
              duration: 2000
            })
            setTimeout(() => {
              wx.hideToast()
            }, 2000)
          }
        } else {
          let message = '无法识别的链接'
          wx.showToast({
            title: message,
            icon: 'error',
            duration: 2000
          })
          setTimeout(() => {
            wx.hideToast()
          }, 2000)
        }
      }
    })
  },


  signInActivity(arr, res) { // 扫码签到
    const EventSignUpStatus = {
      notSignUp: 0,
      signUpSucceed: 1,
      reviewPassed: 2,
      reviewRejected: 3,
      signUpCancelled: 5,
      waitingForPay: 6,
      preSignUp: 7
    }
    let message = ""
    const event = res.event
    if (res.e === 0) {
      console.log('进来')
      if (event.eventEnded) {
        message = "签到失败: 活动已结束"
        console.log('签到失败: 活动已结束')
      } else if (event.userStatus.signedIn) {
        message = '签到成功'
        console.log('签到成功')
      } else {
        console.log('notSignUp')
        let sinupstatus = EventSignUpStatus.notSignUp
        console.log(event.userStatus)
        if (event.userStatus.signupStatus !== null) {
          sinupstatus = event.userStatus.signupStatus
          console.log('null')
        }
        console.log('sinupstatus:' + sinupstatus)
        if (sinupstatus === EventSignUpStatus.notSignUp || sinupstatus === EventSignUpStatus.signUpCancelled || sinupstatus === EventSignUpStatus.waitingForPay || sinupstatus === EventSignUpStatus.preSignUp) {
          message = "还未报名，正在跳转活动详情"
          console.log(message)
          setTimeout(() => {
            wx.navigateTo({
              url: `../../activities/activity-details/index?id=${event.id}`,
            })
          }, 2000)
        } else if (sinupstatus === EventSignUpStatus.signUpSucceed || sinupstatus === EventSignUpStatus.reviewPassed) {
          //调用进行签到接口，接口在后面
          const params = {
            signInId: arr[4]
          }
          message = "正在进行签到.."
          console.log(message)
          signupOnQrCode(params, res => {
            //签到
            if (res.e === 0) {
              message = "签到成功"
            } else {
              switch (res.e) {
                case 108:
                  message = "签到失败: 活动已结束"
                case 111:
                  message = "签到失败: 不能重复签到"
                case 112:
                  message = "签到失败: 审核未通过"
                case 114:
                  message = "签到失败: 报名未审核"
                default:
                  message = "其他错误"
              }
            }
            wx.showToast({
              title: message,
              icon: 'none',
              duration: 2000
            })
            setTimeout(() => {
              wx.hideToast()
            }, 2000)
          })
        } else if (sinupstatus === EventSignUpStatus.reviewRejected) {
          message = "签到失败: 审核未通过"
          console.log(message)
        } else {
          message = 'default'
          console.log(message)
        }
      }
    }
    return message
  },

  gotoJoin(arr, res) {// 扫码报名

  },

  evoucherCode(res) { // 验票
    console.log('evoucher', res)
    let message = ""
    if (res.e === 0) {
      switch (res.status) {
        case 101:
          message = "验证通过"
          break
        case 102:
          message = "验证失败, 凭证已使用"
          break
        case 103:
          message = "验证失败, 该二维码属于无效凭证"
          break
        case 104:
          message = "验证失败, 凭证已过期"
          break
        default:
          console.log("电子凭证验证未知状态：\(status)")
          break
      }
    } else {
      switch (res.e) {
        case 100, 101:
          message = "对不起，您没有权限"
          break
        case 110:
          message = "活动未报名"
          break
        case 102, 204:
          message = "验证失败, 该二维码属于无效凭证"
          break
        default:
          break
      }
    }
    return message
  },

  goAuty() {// 认证页面
    wx.navigateTo({
      url: '../auty-detail/index',
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
            isLogin: true,
            getPhoneNumVisible: false
          })
          this.AjaxGetUser()
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
        this.AjaxGetUser()
      } else {
        this.AjaxAuthorUser()
      }
    })
  },
  AjaxGetUser() {
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
        if (!res.user.telephone) {
          this.setData({
            getPhoneNumVisible: true
          })
        }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.AjaxGetUser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(store.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this
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