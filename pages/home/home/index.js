// pages/home/home/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getMyEnjoined,
  getMyPubliced,
  getMyCollected
} from '../../../API/servers'
import {
  formatTime
} from '../../../utils/util.js'

const app = getApp()

create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    activeType: 'enrolment',
    userInfo: store.data.userInfo,
    scrollViewHeight: 0,
    ActiveList: [],
  },
  tabsChange(e) {
    const key = e.detail.key
    this.setData({
      activeType: key
    })
    this.AjaxGetActiveList(key)
  },
  AjaxGetActiveList(key) {
    const _this = this
    if (key === 'enrolment') {
      getMyEnjoined({}, res => {
        let list = res.events
        list.forEach(item => {
          item.updateTime = formatTime(new Date(item.updateTime))
        })
        _this.setData({
          ActiveList: list
        })
      })
    } else if (key === 'publiced') {
      getMyPubliced({}, res => {
        let list = res.events
        list.forEach(item => {
          item.updateTime = formatTime(new Date(item.updateTime))
        })
        _this.setData({
          ActiveList: list
        })
      })
    } else if (key === 'collected') {
      getMyCollected({}, res => {
        let list = res.events
        list.forEach(item => {
          item.updateTime = formatTime(new Date(item.updateTime))
        })
        _this.setData({
          ActiveList: list
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const res = wx.getSystemInfoSync()
    const scrollViewHeight = res.windowHeight - res.statusBarHeight - 86
    console.log(res)
    console.log(scrollViewHeight)
    this.setData({
      scrollViewHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.AjaxGetActiveList(this.data.activeType)
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