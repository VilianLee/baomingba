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
    dateStap: 0,
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      key: options.key
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const nowDate = new Date()
    console.log(formatTime(nowDate, 'date'))
    this.setData({
      dateStr: formatTime(nowDate, 'date'),
      nowDate: formatTime(nowDate, 'date'),
      timeStr: formatTime(nowDate, 'time'),
      nowTime: formatTime(nowDate, 'time'),
      nowTimeStap: nowDate.getTime()
    })
  },

  pickerOnChange(e) {
    console.log(e)
    const key = e.target.dataset.key
    let value = e.detail.value
    if (key === 'timeStr') {
      value = value + ':00'
    }
    this.setData({
      [key]: value
    })
  },
  okOnClick() {
    const date = this.data.dateStr + ' ' + this.data.timeStr
    console.log(date)
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一页
    console.log(getDate(date))
    prevPage.dataOnChange(this.data.key, getDate(date).getTime(), pages)
    prevPage.dataOnChange(this.data.key + 'Str', date, pages)
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