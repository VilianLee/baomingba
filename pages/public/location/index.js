// pages/public/location/index.js
import store from '../../../store'
import create from '../../../utils/create'
import QQMapWX from '../../../utils/qqmap-wx-jssdk'
import {
  baseUrl
} from '../../../config'

const app = getApp()

let qqmapsdk

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0, // 中心经度
    latitude: 0, // 中心纬度
    markers: [],
    address: {},
    inputInfo: '', // 输入信息
    inputFocus: false,
    searchData: [], // 搜索信息
    page_index: 1, // 当前页码
    page_size: 10,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setViewHeight()
    console.log(address)
    let address = {
      longAddress: options.longAddress,
      longitude: options.longitude,
      latitude: options.latitude,
      title: options.longAddress,
    }
    this.setData({
      address,
      markers: [address],
      longitude: address.longitude,
      latitude: address.latitude,
      inputInfo: options.longAddress
    })
    qqmapsdk = new QQMapWX({
      key: 'A5OBZ-2PDKD-C4N4A-PB7KU-I3QMO-DHFGZ'
    });
    console.log(this.data.address)
    if(!address.longitude || !address.latitude) {
      this.getMyLocation()
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

  setViewHeight() {
    const _this = this
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })
  },

  getMyLocation() { // 定位当前坐标
    const _this = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        _this.reverseGeocoder({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },

  regiOnChange(e) { //视野发生变化时触发
    console.log(e)
  },
  mapOnClick(e) { //点击地图时触发
    console.log(e)
    this.reverseGeocoder(e.detail)
  },

  reverseGeocoder(location) { // 根据坐标查找地址
    const _this = this
    wx.showLoading()
    qqmapsdk.reverseGeocoder({
      location: location,
      success: res => {
        console.log(res)
        wx.hideLoading()
        const obj = {
          province: res.result.address_component.province, //省
          city: res.result.address_component.city,//市
          district: res.result.address_component.district,//区
          shortAddress: res.result.address_component.street_number,//地址
          longAddress: res.result.address,//完整地址
          title: res.result.address, //marker标题
          longitude: res.result.location.lng,//经度
          latitude: res.result.location.lat//维度
        }
        _this.setData({
          address: obj,
          markers: [obj],
          inputInfo: obj.title
        })
      },
      fail: err => {
        wx.hideLoading()
        console.log('err:')
        console.log(err)
      }
    })
  },

  searchLocation() { // 根据输入查找对应地址
    this.setData({
      page_index: 1,
      searchData: []
    })
    this.getSuggestion(this.data.inputInfo)
  },

  loadingMore() {
    this.setData({
      page_index: this.data.page_index + 1
    })
    this.getSuggestion(this.data.inputInfo)
  },

  getSuggestion(keyword) { // 根据关键字查找对应地址列表
    wx.showLoading()
    const _this = this
    qqmapsdk.getSuggestion({
      keyword: keyword,
      page_size: this.data.page_size,
      page_index: this.data.page_index,
      success: function (res) {
        wx.hideLoading()
        _this.setData({
          searchData: _this.data.searchData.concat(res.data),
          totalCount: res.count
        })
        console.log(res);
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res);
      }
    })
  },

  /**
     * 将焦点给到 input（在真机上不能获取input焦点）
     */
  tapInput() {
    this.setData({
      //在真机上将焦点给input
      inputFocus: true,
      //初始占位清空
      inputInfo: ''
    });
  },

  /**
   * input 失去焦点后将 input 的输入内容给到cover-view
   */
  blurInput(e) {
    this.setData({
      inputInfo: e.detail.value || '输入'
    });
  },

  inputOnChange(e) { // 输入
    this.setData({
      inputInfo: e.detail.value
    })
  },

  addressOnClick(e) { // 点击选中地址
    const position = e.currentTarget.dataset.position
    const searchData = this.data.searchData
    let obj = searchData[position]
    obj.shortAddress = obj.title
    obj.longAddress = obj.address + obj.title
    obj.longitude = obj.location.lng
    obj.latitude = obj.location.lat
    this.setData({
      address: obj,
      markers: [obj],
      inputInfo: obj.title,
      searchData: [],
      page_index: 1,
      totalCount: 0,
      longitude: obj.location.lng,
      latitude: obj.location.lat
    })
  },

  saveAddress() {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一页
    prevPage.dataOnChange('address', this.data.address, pages)
    wx.navigateBack()
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