// pages/home/home/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  createAdvert
} from "../../../utils/data";
import {
  getHomeSlide,
  login,
  bindPhoneNo,
  getUrlQueryInfo,
  getPersonInfo
} from '../../../API/servers'
import {
  functionList
} from '../../../cantants/contants'
import {
  getHrefParam
} from '../../../utils/util'

const app = getApp()

create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    sliderList: [],
    functionList: functionList,
    coverItem: {},
    showCover: false,
    showLogin: false,
    getPhoneNumVisible: false,
    wxopenid: '',
    query: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.q) {
      const q = decodeURIComponent(options.q)
      // const q = 'https://xt-kp.solidace.cn/admin/views/Applets?type=scan&scanType=minProgram&appid=12345&query={url%3Dhttps%3A%2F%2Ftest.test.com%2F123456%26partnerId%3D1234}'
      console.log('options:', q)
      const option = getHrefParam(q.split("?")[1])
      this.setData({
        query: option.query
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.waitForToken()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  hideCover() {
    this.setData({
      showCover: false
    })
  },
  AjaxGetUserInfo() {
    getPersonInfo({}, res => {
      store.data.userInfo = res.data
      store.data.hasUserInfo = true
      store.update()
    })
  },
  AjaxGetUrlQueryInfo(query, func) {
    const params = {
      query
    }
    getUrlQueryInfo(params, res => {
      if (func && res.function !== func.function) {
        wx.showToast({
          title: '请扫描正确的二维码',
          icon: 'none'
        })
        return
      }
      if (res.scantype === 'webview') {
        wx.navigateTo({
          url: '/pages/web-view/index?url=' + encodeURIComponent(res.result),
        })
      } else if (res.scantype === 'miniProgram') {
        this.data.functionList.forEach(item => {
          if (item.type === 'scan' && item.function === res.function) {
            this.setData({
              coverItem: item,
              showCover: true,
              minProgramOption: res
            })
          }
        })
      } else if (res.scantype === 'local') {
        wx.navigateTo({
          url: res.path + '?scan=' + encodeURIComponent(res.originUrl),
        })
      }
    })
  },
  jumpToMinProgram() {
    const {
      minProgramOption
    } = this.data
    let queryStr = `?url=${encodeURIComponent(minProgramOption.originUrl)}`
    for (let key in minProgramOption.other) {
      queryStr += `&${key}=${minProgramOption.other[key]}`
    }
    const path = minProgramOption.jumppath
    wx.navigateToMiniProgram({
      appId: minProgramOption.appid,
      path: path + queryStr,
      envVersion: 'release',
      success: () => {
        console.log(path + queryStr)
        this.hideCover()
      },
      fail: err => {
        console.log('jumpErr:', err)
      }
    })
  },
  funcOnClick(e) {
    if (!store.data.isLogin) {
      this.setData({
        showLogin: true
      })
      return
    }
    const {
      func
    } = e.currentTarget.dataset
    if (func.type === 'local') {
      wx.navigateTo({
        url: func.path,
      })
    } else if (func.type === 'webview') {
      wx.navigateTo({
        url: '/pages/web-view/index?url=' + encodeURIComponent(func.url),
      })
    } else if (func.type === 'scan') {
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          console.log(res)
          const query = getHrefParam(res.result.split("?")[1]).query
          if (query) {
            this.AjaxGetUrlQueryInfo(query, func)
          } else {
            wx.showToast({
              title: '请扫描正确的二维码',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '功能正在开发中，请耐心等待',
        icon: 'none',
        duration: 2000
      })
    }
  },
  cancelLogin() {
    this.setData({
      showLogin: false
    })
  },
  waitForToken() {
    const {
      token
    } = store.data
    if (token) {
      this.AjaxGetHomeSlide()
      if (this.data.query) {
        setTimeout(() => {
          this.AjaxGetUrlQueryInfo(this.data.query)
        }, 1000)
      }
    } else {
      setTimeout(() => {
        this.waitForToken()
      }, 200)
    }
  },
  AjaxGetHomeSlide() {
    getHomeSlide({}, res => {
      let homeSlide = this._normalizeData(res.data.result);
      homeSlide.forEach(item => {
        item.link = item.link.replace("mobile=%s", "mobile=" + this.phone);
      });
      this.setData({
        sliderList: homeSlide
      })
    });
  },
  _normalizeData(datas) {
    let ret = [];
    datas.forEach(item => {
      ret.push(createAdvert(item));
    });
    return ret;
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
            getPhoneNumVisible: false,
            showLogin: false
          })
          store.data.isLogin = true
          store.data.openid = res.data.openid
          store.data.mobile = res.data.mobile
          store.update()
          this.AjaxGetUserInfo()
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
        this.cancelLogin()
        this.AjaxGetUserInfo()
      } else {
        this.setData({
          wxopenid: res.data.wxopenid,
          getPhoneNumVisible: true
        })
        store.data.wxopenid = res.data.wxopenid
        store.update()
      }
    })
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