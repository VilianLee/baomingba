//app.js
import { getQiniuCloudToken } from 'API/servers.js'
import store from './store'
App({
  onLaunch: function () {
    getQiniuCloudToken({}, res => {
      store.data.uptoken = res.uptoken
      store.update()
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