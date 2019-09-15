// pages/model/joinerInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinerNeedInfo: {
      singleText: [{
        name: "姓名",
        require: true
      }, {
        name: "手机",
        require: true
      }, {
        name: "公司",
        require: false
      }, {
        name: "邮箱",
        require: false
      }, {
        name: "职位",
        require: false
      }, {
        name: "性别",
        require: false
      }, {
        name: "年龄",
        require: false
      }, {
        name: "备注",
        require: false
      }],
      moreInfo: [
        {
          name:"测试多文本，测试多文本",
          type: "richText"
        },
        {
          name: "测试单选",
          type: "radio",
          options: ['1', '2']
        },
        {
          name: "测试多选",
          type: "checkbox",
          options: ['1', '2']
        },
        {
          name: "测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片",
          type: "picture"
        }
      ]
    },
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