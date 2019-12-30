// pages/hot/hot.js
import store from '../../store'
import create from '../../utils/create'
import {
  formatTime
} from '../../utils/util'
import {
  checkHotActiveList, login
} from '../../API/servers'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    location: 0,
    locationArr: ["全国", "杭州", "北京", "上海", "广州", "深圳"],
    postCodeArr: ["", "33010000", "11000000", "31000000", "44010000", "44030000"],
    totalRows: 0,
    pageSize: 10,
    hotList: []
  },
  bindPickerChange(e) {
    const value = e.detail.value
    this.setData({
      location: value,
      hotList: [],
      totalRows: 0
    })
    this.AjaxCheckHotActiveList()
  },
  AjaxCheckHotActiveList() {
    const _this = this
    const hotList = this.data.hotList
    checkHotActiveList({
      pageSize: this.data.pageSize,
      startNum: this.data.hotList.length,
      postCode: this.data.postCodeArr[this.data.location]
    }, res => {
      let list = res.events
      list.forEach(item => {
        item.dayStr = formatTime(new Date(item.beginTime), "mm/dd")
        item.addressShort = item.longAddress.substring(0, 2)
      })
      _this.setData({
        hotList: hotList.concat(list),
        totalRows: res.eventCount ? res.eventCount : this.data.totalRows
      })
    })
  },
  AjaxSilentLogin() {
    wx.login({
      success: resp => {
        store.data.wxCode = resp.code
        store.update()
        login({
          code: resp.code
        }, res => {
          if (res.e === 0) {
            store.data.isLogin = true
            store.update()
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.AjaxSilentLogin()
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
    this.AjaxCheckHotActiveList()
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
    this.setData({
      hotList: [],
      totalRows: 0
    })
    this.AjaxCheckHotActiveList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.totalRows > this.data.hotList.length) {
      this.AjaxCheckHotActiveList()
    } else {
      wx.showToast({
        title: '已经没有更多了',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})