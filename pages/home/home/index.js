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
    topHeight: 0,
    activeType: 'enrolment',
    userInfo: store.data.userInfo,
    scrollViewHeight: 0,
    pageSize: 10,
    totalRows: 0,
    ActiveList: [],
  },
  
  validLogin() {
    if (!store.data.isLogin) {
      wx.showModal({
        title: '您还未登录',
        content: '是否跳转登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../user/user/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false
    } else {
      return true
    }
  },
  seeDetail(e){
    const id = e.currentTarget.dataset.id
    if (this.data.activeType === 'publiced') {
      wx.navigateTo({
        url: '../../management/management/index?eventId=' + id,
      })
    } else {
      wx.navigateTo({
        url: '../../activities/activity-details/index?id=' + id,
      })
    }
  },
  tabsChange(e) {
    if(!this.validLogin()) {
      return
    }
    const key = e.detail.key
    this.setData({
      activeType: key,
      ActiveList: [],
      totalRows: 0
    })
    this.AjaxGetActiveList(key)
  },
  AjaxGetActiveList(key) {
    const _this = this
    const list = this.data.ActiveList
    const startNum = list.length > 0 ? list[list.length - 1].anchor : ''
    if (key === 'enrolment') {
      getMyEnjoined({
        pageSize: this.data.pageSize,
        startNum
      }, res => {
        let list = res.events
        list.forEach(item => {
          item.updateTime = formatTime(new Date(item.updateTime))
        })
        let newList = this.data.ActiveList.concat(list)
        _this.setData({
          ActiveList: newList,
          totalRows: res.eventCount ? res.eventCount : this.data.totalRows
        })
      })
    } else if (key === 'publiced') {
      getMyPubliced({
        pageSize: this.data.pageSize,
        startNum
      }, res => {
        let list = res.events
        list.forEach(item => {
          item.updateTime = formatTime(new Date(item.updateTime))
        })
        let newList = this.data.ActiveList.concat(list)
        _this.setData({
          ActiveList: newList,
          totalRows: res.eventCount ? res.eventCount : this.data.totalRows
        })
      })
    } else if (key === 'collected') {
      getMyCollected({
        pageSize: this.data.pageSize,
        startNum
      }, res => {
        let list = res.events
        list.forEach(item => {
          item.updateTime = formatTime(new Date(item.updateTime))
        })
        let newList = this.data.ActiveList.concat(list)
        _this.setData({
          ActiveList: newList,
          totalRows: res.eventCount ? res.eventCount : this.data.totalRows
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
    const _this = this
    wx.getSystemInfo({
      success: function (res) {
        let statusBarHeight = res.statusBarHeight
        let clientWidth = res.windowWidth;
        let clientHeight = res.windowHeight - 88 - statusBarHeight;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        console.log(statusBarHeight)
        _this.setData({
          topHeight: 88 + statusBarHeight
        })
      }
    });
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
    this.setData({
      ActiveList: [],
      totalRows: 0
    })
    this.AjaxGetActiveList(this.data.activeType)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.ActiveList.length < this.data.totalRows) {
      this.AjaxGetActiveList(this.data.activeType)
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