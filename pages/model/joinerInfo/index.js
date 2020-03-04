// pages/model/joinerInfo/index.js
import store from '../../../store'
import create from '../../../utils/create'


const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    conditions: [],
    add_type_arr: [{
      value: 'text',
      name: '单文本'
    }, {
      value: 'textarea',
      name: '多文本'
    }, {
      value: 'radio',
      name: '单选项'
    }, {
      value: 'checkbox',
      name: '多选项'
    }, {
      value: 'image',
      name: '图片'
    }],
    modal_visible: false,
    add_option: {
      text: "",
      enableOther: 0,
      name: '',
      type: 'value',
      require: 1,
      options: [{
        name: "",
        value: ""
      }]
    },
    add_required: true,
    add_type: "singleText",
    singleText_des: "",
    richText_des: "",
    radio_des: "",
    checkbox_des: "",
    picture_des: "",
    new_checkbox: ["", ""],
    new_radios: ["", ""],
    joiner_may_add: false,
    itemIndex: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let conditions = decodeURIComponent(options.conditions)
    conditions = JSON.parse(conditions)
    console.log(conditions)
    this.setData({
      conditions
    })
  },
  addOption() { // 添加选项
    let add_option = this.data.add_option
    let itemIndex = this.data.itemIndex > 9 ? this.data.itemIndex + 1 : '0' + (this.data.itemIndex + 1)
    add_option.options.push({
      key: "",
      value: ""
    })
    this.setData({
      add_option
    })
  },
  addRequireChange(e){
    console.log(e)
    const add_option = this.data.add_option
    add_option.require = e.detail.value ? 1 : 0
    this.setData({add_option})
  },
  deleteOption(e) { // 删除选项
    console.log(e)
    let add_option = this.data.add_option
    const optionIndex = e.currentTarget.dataset.key
    add_option.options = add_option.options.filter((item, index) => index !== optionIndex)
    this.setData({
      add_option
    })
  },
  deleteConditions(e) { // 删除报名项
    let conditions = this.data.conditions
    const optionIndex = e.currentTarget.dataset.index
    console.log(conditions)
    conditions = conditions.filter((item, index) => index !== optionIndex)
    console.log(conditions)
    this.setData({
      conditions
    })
  },
  inputOnChange(e) { // 输入数据
    const value = e.detail.value
    const key = e.target.dataset.key
    const option = e.target.dataset.option
    const index = e.target.dataset.index
    let add_option = this.data.add_option
    if (option) {
      add_option.options[index][option] = value
    } else {
      add_option[key] = value
    }
    this.setData({
      add_option
    })
    console.log(this.data.add_option[key])
  },
  willAddInfo(e) { //添加选项弹窗
    let itemIndex = this.data.itemIndex > 9 ? this.data.itemIndex + 1 : '0' + (this.data.itemIndex + 1)
    this.setData({
      modal_visible: true,
      add_option: {
        text: "",
        enableOther: 0,
        name: "item" + itemIndex,
        type: 'text',
        require: 1,
        options: [{
          name: "",
          value: ""
        }]
      },
      itemIndex: this.data.itemIndex + 1
    })
  },
  addInfo(e) { //确定添加选项
    let conditions = this.data.conditions
    const add_option = this.data.add_option
    let vertify = true
    let err_tip = ""
    if (add_option.text === '') {
      err_tip = '报名项标题不能为空'
      vertify = false
    } else if (add_option.type === 'radio' || add_option.type === 'checkbox') {
      add_option.options.forEach(item => {
        if(item.name === '' || item.value === '') {
          err_tip = '请完善选项内容'
          vertify = false
        }
      })
    }
    if (vertify) {
      conditions.push(add_option)
      console.log(conditions)
      this.setData({
        modal_visible: false,
        conditions
      })
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; //上一页
      console.log(prevPage.data)
      prevPage.conditionsOnChange(conditions)
      console.log(prevPage.data)
    } else {
      wx.showToast({
        title: err_tip,
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.hideToast()
      }, 2000)
    }
  },
  cancelAdd() { //取消添加选项
    this.setData({
      modal_visible: false
    })
  },
  selectTab(e) { //选择选项属性
    console.log(e)
    const value = e.target.dataset.value
    let add_option = this.data.add_option
    add_option.type = value
    this.setData({
      add_option
    })
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