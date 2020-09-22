// pages/user/personal-info/index.js
import store from '../../../store'
import create from '../../../utils/create'
import qiniuUploader from '../../../utils/qiniuUploader'

import {
  getEditFields,
  submitEditPersonalInfo,
  getHeadPicQiniuCloudToken
} from '../../../API/servers'
import {
  baseUrl
} from '../../../config'


const app = getApp()
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUpload: false
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
  onShow: function () {

  },
  exchangePhoto() {
    const _this = this
    let userInfo = this.data.userInfo
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFiles = res.tempFiles;
        userInfo.headPhoto = tempFiles[0].path
        getHeadPicQiniuCloudToken({}, resp => {
          store.data.uptoken = resp.uptoken
          store.update()
          _this.uploadFiles()
        })
      }
    })
  },
  uploadFiles() {
    let userInfo = this.data.userInfo
    let tempFile = userInfo.headPhoto
    qiniuUploader.upload(tempFile, (img) => {
      console.log(img)
      userInfo.avatar = img.key
      this.setData({
        userInfo,
        hasUpload: true
      })
      console.log(userInfo)
    }, (error) => {
      console.log('error: ' + error);
    }, {
      region: 'ECN',
      key: 'web/' + (new Date()).getTime(),
      //domain: 'http://upload.bmbee.cn/', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
      // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
      uptoken: store.data.uptoken
    }, (res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    }, () => {
      // 取消上传
    }, () => {
      // `before` 上传前执行的操作
    }, (err) => {
      // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
    })
  },
  inputOnChange(e) {
    const key = e.target.dataset.key
    const value = e.detail.value
    let user = this.data.userInfo
    user[key] = value
    this.setData({
      userInfo: user
    })
  },
  submit() {
    const _this = this
    submitEditPersonalInfo(this.data.userInfo, res => {
      if (res.e === 0) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          mask: true
        })
        setTimeout(() => {
          wx.hideToast()
          // this.prePageRefresh()
          wx.switchTab({
            url: '../user/index',
          })
        }, 2000)
      }
    })
  },

  prePageRefresh() {
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]; //上一页
    console.log(prevPage)
    prevPage.AjaxGetUser()
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