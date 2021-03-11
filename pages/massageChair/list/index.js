// pages/massageChair/list/index.js
import {
  getHrefParam
} from '../../../utils/util'
import store from '../../../store'
import create from '../../../utils/create'
import {
  getProductList
} from '../../../API/chair'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    chairList: [],
    selectItem: 0,
    code: '',
    agree: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scanResult = decodeURIComponent(options.scan).split('?')
    let sacnResultUrl = scanResult[0]
    if (sacnResultUrl.indexOf('cozzia') > 0) {
      const query = getHrefParam(scanResult[1])
      console.log(query)
      this.AjaxGetList(query.code)
    } else {
      wx.navigateBack({
        delta: 1,
        success: () => {
          wx.showToast({
            title: '请扫描正确的二维码',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  AjaxGetList(code) {
    const {
      mobile
    } = store.data.userInfo
    const params = {
      deviceCode: code,
      mobile
    }
    getProductList(params, res => {
      this.setData({
        code
      })
      store.data.chairList = res.data
      store.update()
    })
  },

  cardOnClick(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectItem: index
    })
  },

  agreeOnChange() {
    const {
      agree
    } = this.data
    this.setData({
      agree: !agree
    })
  },

  payOnClick() {
    const {
      chairList,
      selectItem,
      code,
      agree
    } = this.data
    if (agree) {
      wx.navigateTo({
        url: '../payOrder/index?mid=' + chairList[selectItem].mid + '&code=' + code,
      })
    }
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