// pages/personal/address-edit/index.js
import create from '../../../utils/create'
import store from '../../../store'

const app = getApp()

const {
  $Toast
} = require('../../../dist/base/index');

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    pageTitle: '',
    addressId: '',
    hasAddressInfo: false,
    region: [],
    addressInfo: {
      province: '',
      city: '',
      district: '',
      shortAddress: '',
      longAddress: ''
    },
    jump: "",
    pageType: 'edit',
    deleteVisible: false
  },
  inputOnChange(e) {
    const addressInfo = this.data.addressInfo
    const value = e.detail.value
    const key = e.currentTarget.dataset.key
    addressInfo[key] = value
    this.setData({
      addressInfo
    })
  },
  regionChange(e) {
    console.log(e)
    let addressInfo = this.data.addressInfo
    const value = e.detail.value
    addressInfo.province = value[0]
    addressInfo.city = value[1]
    addressInfo.district = value[2]
    this.setData({
      addressInfo,
      region: value,
      hasAddressInfo: true
    })
  },
  saveAddress() {
    let address = this.data.addressInfo
    if (address.province && address.city && address.district && address.shortAddress) {
      address.longAddress = address.province + address.city + address.district + address.shortAddress
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; //上一页
      prevPage.dataOnChange('address', address)
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '请完善地址信息',
        icon: none,
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      addressInfo: {
        province: '',
        city: '',
        district: '',
        address: '',
        postcode: '',
        contact: '',
        phoneNo: '',
        isDefault: false
      },
      pageTitle: '',
      addressId: '',
    })
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