// pages/model/change-time/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  formatTime,
  getDate
} from '../../../utils/util'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    dateStr: '',
    timeStr: '',
    nowDate: '',
    nowTime: '',
    nowTimeStap: 0,
    timeStap: null,
    dateStap: 0,
    key: '',
    showTime: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      key: options.key,
      showTime: options.showTime === 'false' ? false : true,
      timeStap: options.timeStap === 'null' ? null : parseInt(options.timeStap)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let date
    const nowDate = new Date()
    if(this.data.timeStap) {
      date = new Date(this.data.timeStap)
    }
    console.log(typeof(this.data.timeStap))
    console.log(!this.data.timeStap)
    this.setData({
      dateStr: formatTime(this.data.timeStap ? date : nowDate, 'date', 'picker'),
      nowDate: formatTime(nowDate, 'date', 'picker'),
      timeStr: formatTime(this.data.timeStap ? date : nowDate, 'time', 'picker'),
      nowTime: formatTime(nowDate, 'time', 'picker'),
      nowTimeStap: nowDate.getTime()
    })
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
  pickerOnChange(e) {
    if(!this.validLogin()) {
      return
    }
    console.log(e)
    const key = e.target.dataset.key
    let value = e.detail.value
    if (key === 'timeStr') {
      value = value
    }
    this.setData({
      [key]: value
    })
  },
  okOnClick() {
    if(!this.validLogin()) {
      return
    }
    const date = this.data.dateStr + ' ' + (this.data.showTime ? this.data.timeStr + ':00' : '00:00:00')
    console.log(date)
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一页
    console.log(getDate(date))
    prevPage.dataOnChange(this.data.key, getDate(date).getTime(), pages)
    prevPage.dataOnChange(this.data.key + 'Str', this.data.dateStr + (this.data.showTime ? ' ' + this.data.timeStr : ''), pages)
    wx.navigateBack()
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