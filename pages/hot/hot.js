// pages/hot/hot.js
import store from '../../store'
import create from '../../utils/create'
import { formatTime } from '../../utils/util'
import {
  checkHotActiveList
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
    hotList: []
  },
  bindPickerChange(e){
    console.log(e)
    const key = e.currentTarget.dataset.key
    const value = e.detail.value
    this.setData({
      [key]: value
    })
  },
  AjaxCheckHotActiveList(){
    const _this = this
    checkHotActiveList({}, res => {
      let list = res.events
      list.forEach(item => {
        item.dayStr = formatTime(new Date(item.beginTime), "mm/dd")
        item.addressShort = item.longAddress.substring(0,2)
      })
      _this.setData({
        hotList: list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.AjaxCheckHotActiveList()
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
    this.setData({
      hotList: []
    })
    this.AjaxCheckHotActiveList()
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