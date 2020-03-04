// pages/public/rich-editor/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  uploadFile
} from '../../../utils/uploads'
import {
  baseUrl
} from '../../../config'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content: decodeURIComponent(options.content)
    })
    console.log(options.content)
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },

  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 100
    const btnHeight = 90
    const { windowHeight, windowWidth, platform } = wx.getSystemInfoSync()
    const scale = 750 / windowWidth
    const equipmentHeight = windowHeight * scale
    keyboardHeight = keyboardHeight * scale
    let editorHeight = keyboardHeight > 0 ? (equipmentHeight - keyboardHeight - toolbarHeight - btnHeight) : equipmentHeight - toolbarHeight -btnHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html: that.data.content,
        success: res => {
          console.log(res)
        },
        fail: err => {
          console.log('err:' + err)
        }
      }) // 注意：插入的是对象
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.uploadFiles(res.tempFiles)
      }
    })
  },

  uploadFiles(tempFiles) {
    const that = this
    tempFiles.forEach(item => { //格式化接口返回的文件对象
      uploadFile(item.path, img => {
        that.editorCtx.insertImage({
          src: baseUrl.imageUrl + img.imageURL,
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '100%',
          success: function () {
            console.log('insert image success')
          }
        })
      })
    })
  },

  saveEditor(){
    this.editorCtx.getContents({
      success: res => {
        console.log(res)
        this.prePageDataChange(res.html)
      },
      fail: err => {
        console.log('err:' + err)
      }
    })
  },

  prePageDataChange(html){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一页
    prevPage.dataOnChange('intro', html, pages)
    wx.navigateBack()
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