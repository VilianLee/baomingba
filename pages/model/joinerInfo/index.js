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
      moreInfo: [{
          name: "测试多文本，测试多文本",
          type: "richText",
          required: true
        },
        {
          name: "测试单选",
          type: "radio",
          options: ['1', '2'],
          required: false
        },
        {
          name: "测试多选",
          type: "checkbox",
          options: ['1', '2'],
          required: true
        },
        {
          name: "测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片测试图片",
          type: "picture",
          required: true
        }
      ],
    },
    add_type_arr: [{
      value: 'singleText',
      name: '单文本'
    }, {
      value: 'richText',
      name: '多文本'
    }, {
      value: 'radio',
      name: '单选项'
    }, {
      value: 'checkbox',
      name: '多选项'
    }, {
      value: 'picture',
      name: '图片'
    }],
    modal_visible: false,
    add_required: true,
    add_type: "singleText",
    singleText_des: "",
    richText_des: "",
    radio_des: "",
    checkbox_des: "",
    picture_des: ""
  },
  addRequireChange() {
    const new_value = !this.data.add_required
    this.setData({
      add_required: new_value
    })
  },
  willAddInfo(e) {
    console.log(e.target.dataset)
    this.setData({
      modal_visible: true,
      add_type: e.target.dataset.addtype
    })
  },
  addInfo(e) {
    let obj = {
      type: this.add_type
    }
    this.setData({
      modal_visible: false
    })
  },
  cancelAdd() {
    this.setData({
      modal_visible: false
    })
  },
  selectTab(e) {
    console.log(e)
    const value = e.target.dataset.value
    this.setData({
      add_type: value
    })
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