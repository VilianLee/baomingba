//app.js
import store from './store'
import {
  login,
  getToken
} from './API/servers'
App({
  onLaunch: function () {
    this.overShare()
    console.log("onLaunch")
    getToken({}, res => {
      store.data.token = res.data.token
      store.update()
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("login")
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
    })
  },
  globalData: {
    userInfo: null,
    userId: ''
  },
  overShare: function () {
    //监听路由切换
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        console.log('是否重写分享方法', data.isOverShare);
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            //你的分享配置
            return {
              title: '宜路行',
              path: '/pages/home/home/index',
              imageUrl: '/images/share_img.png'
            };
          }
        }
      }
    })
  },
  AjaxSilentLogin(code) {
    login({
      jsCode: code
    }, res => {
      console.log(res)
      if (res.data.openid) {
        store.data.isLogin = true
        store.data.openid = res.data.openid
        store.data.mobile = res.data.mobile
        store.data.wxopenid = res.data.wxopenid
        store.update()
      } else {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  config: {
    title_height: "64",
    statusbarHeight: "24",
    titleIcon_height: "32",
    title_top: "24",
    prefix: 24
  }
})