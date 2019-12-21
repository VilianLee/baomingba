// pages/user/personal-info/index.js
import store from '../../../store'
import create from '../../../utils/create'

import {
  getEditFields,
  submitEditPersonalInfo
} from '../../../API/servers'
import {
  upLoadImg
} from '../../../utils/wxfunction'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const _this = this
    getEditFields({}, res => {
      _this.setData({
        userInfo: res.user
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  exchangePhoto() {
    const _this = this
    let userInfo = this.data.userInfo
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFiles = res.tempFiles;
        userInfo.headPhoto = tempFiles[0].path
        _this.setData({userInfo})
        upLoadImg(tempFiles[0].path, res => {
          console.log(res)
          userInfo.headPhoto = JSON.parse(res.data).base64String
          _this.setData({ userInfo })
        })
      }
    })
  },
  inputOnChange(e){
    const key = e.target.dataset.key
    const value = e.detail.value
    let user = this.data.userInfo
    user[key] = value
    this.setData({
      userInfo: user
    })
  },
  submit(){
    submitEditPersonalInfo(this.data.userInfo, res => {
      if(res.e === 0) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          mask: true
        })
        setTimeout(() => {
          wx.hideToast()
          wx.switchTab({
            url: '../user/index',
          })
        }, 2000)
      }
    })
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