// pages/user/wallet/index.js
import store from '../../../store'
import create from '../../../utils/create'
import { formatTime } from '../../../utils/util'
import {
  getMyWalletBalance, getWalletSerails
} from '../../../API/servers'
import { baseUrl } from '../../../config'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    detailList: [],
    pageSize: 20,
    totalRows: 0
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.AjaxGetBalance()
    this.AjaxGetWalletSerails()
  },
  AjaxGetBalance(){ // 获取余额
    let _this = this
    getMyWalletBalance({}, res => {
      _this.setData({
        balance: res.balance
      })
    })
  },
  AjaxGetWalletSerails(){
    const list = this.data.detailList
    const startNum = list.length > 0 ? list[list.length - 1].anchor : ''
    const params = {
      pageSize: this.data.pageSize,
      an: startNum
    }
    const _this = this
    const detailList = this.data.detailList
    getWalletSerails(params, res => {
      _this.setData({
        detailList: detailList.concat(res.paymentFlows),
        totalRows: res.total ? res.total : this.data.totalRows
      })
    })
  },
  seeNormalProblem(){
    const uri = encodeURI(baseUrl.baseUrl + '/wallet-faq')
    wx.navigateTo({
      url: '../../web-view/index?url=' + uri
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
    this.setData({
      detailList: [],
      totalRows: 0
    })
    this.AjaxGetBalance()
    this.AjaxGetWalletSerails()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.totalRows > this.data.detailList.length) {
      this.AjaxGetWalletSerails()
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
  onShareAppMessage: function () {

  }
})