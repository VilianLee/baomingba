//app.js
import store from './store'
App({
  onLaunch: function () {
    this.overShare()
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
              title: '报名吧',
              path: '/pages/hot/hot',
              imageUrl: '/images/share_img.png'
            };
          }
        }
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