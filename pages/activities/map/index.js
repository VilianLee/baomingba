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
    points: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setViewHeight()
    let address = {
      longAddress: options.longAddress,
      longitude: options.longitude,
      latitude: options.latitude,
      title: options.longAddress,
    }
    this.setData({
      address,
      markers: [address]
    })
    qqmapsdk = new QQMapWX({
      key: 'A5OBZ-2PDKD-C4N4A-PB7KU-I3QMO-DHFGZ'
    });
    console.log(this.data.address)
    if(options.longitude !== 'null' && options.latitude !== 'null') {
      this.reverseGeocoder({
        longitude: options.longitude,
        latitude: options.latitude
      })
    } else {
      const _this = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log(res)
          const location = {
            latitude: res.latitude,
            longitude: res.longitude
          }
          _this.setData(location)
        }
      })
      wx.showToast({
        title: '暂无活动地址坐标',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
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

  setViewHeight(){
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
    const marker = this.data.markers[0]
    const markerLocation = {
      latitude: marker.latitude,
      longitude: marker.longitude
    }
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        const location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        const points = [
          location,
          markerLocation
        ]
        _this.setData({
          points: points
        })
      }
    })
  },

  regiOnChange(e) { //视野发生变化时触发
    console.log(e)
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
          id: '000001',
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
          longitude: res.result.location.lng,//经度
          latitude: res.result.location.lat//维度
        })
        console.log(this.data.markers)
      },
      fail: err => {
        wx.hideLoading()
        console.log('err:')
        console.log(err)
      }
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