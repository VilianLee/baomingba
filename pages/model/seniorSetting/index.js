// pages/model/seniorSetting/index.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
import store from '../../../store'
import create from '../../../utils/create'
import { getDate } from '../../../utils/util'


const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    conditions: [{
      text: "姓名",
      enableOther: 0,
      name: 'username',
      type: 'text',
      require: 1
    }, {
      text: "手机",
      enableOther: 0,
      name: 'mobile',
      type: 'text',
      require: 1
    }, {
      text: "公司",
      enableOther: 0,
      name: 'company',
      type: 'text',
      require: 0
    }, {
      text: "邮箱",
      enableOther: 0,
      name: 'email',
      type: 'text',
      require: 0
    }, {
      text: "职位",
      enableOther: 0,
      name: 'position',
      type: 'text',
      require: 0
    }, {
      text: "性别",
      enableOther: 0,
      name: 'sex',
      type: 'text',
      require: 0
    }, {
      text: "年龄",
      enableOther: 0,
      name: 'age',
      type: 'text',
      require: 0
    }],
    signUpStartTime: 0,
    signUpStartTimeStr: '',
    expireTime: 0,
    expireTimeStr: '',
    customSponsor: [],
    telephone: "",
    organizer: "",
    hideJoinerList: false,
    hideActLocation: false,
    hidePicWall: false,
    hideRewardFn: false,
    onlyJoinerCanComment: false
  },
  inputOnChange(e) {
    console.log(e)
    const key = e.target.dataset.key
    const obj = new Object
    obj[key] = e.detail.value
    this.setData(obj)
    this.prePageDataChange(key, e.detail.value)
  },
  editMoreInfo() {
    const conditions = encodeURIComponent(JSON.stringify(this.data.conditions))
    wx.navigateTo({
      url: '../joinerInfo/index?conditions=' + conditions,
    })
  },
  tagOnChange(e){
    const index = e.currentTarget.dataset.index
    let conditions = this.data.conditions
    conditions[index].require = conditions[index].require === 0 ? 1 : 0
    this.setData({
      conditions
    })
  },
  dataOnChange(key, value, page) {
    console.log(key)
    this.setData({
      [key]: value
    })
    this.prePageDataChange(key, value, page)
  },
  prePageDataChange(key, value, page){
    const pages = page ? page : getCurrentPages()
    const prevPage = page ? pages[pages.length - 3] : pages[pages.length - 2]; //上一页
    console.log(prevPage)
    prevPage.dataOnChange(key, value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    // // 获取完整的年月日 时分秒，以及默认显示的数组
    // var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // // 精确到分的处理，将数组的秒去掉
    // var lastArray = obj1.dateTimeArray.pop();
    // var lastTime = obj1.dateTime.pop();
    // const nowTime = new Date()
    // this.setData({
    //   signUpStartTimeArr: obj1.dateTimeArray,
    //   signUpStartTimeValue: obj1.dateTime,
    //   signUpStartTime: nowTime.getTime(),
    //   expireTime: nowTime.getTime(),
    //   expireTimeArr: obj1.dateTimeArray,
    //   expireTimeValue: obj1.dateTime
    // });
  },

  // changeTime(e) {//报名时间变化
  //   const key = e.target.dataset.name
  //   const value = e.detail.value
  //   console.log(e)
  //   switch (key) {
  //     case "signUpStartTime":
  //       let startarr = this.data.signUpStartTimeArr
  //       const signUpStartTimeStr = startarr[0][value[0]] + '-' + startarr[1][value[1]] + '-' + startarr[2][value[2]] + ' ' + startarr[3][value[3]] + ':' + startarr[4][value[4]] + ":00"
  //       const signUpStartTime = getDate(signUpStartTimeStr).getTime()
  //       this.setData({
  //         signUpStartTime,
  //         signUpStartTimeValue: value
  //       })
  //       console.log(signUpStartTime)
  //       break
  //     case "expireTime":
  //       let expireTimeArr = this.data.expireTimeArr
  //       const expireTimeStr = expireTimeArr[0][value[0]] + '-' + expireTimeArr[1][value[1]] + '-' + expireTimeArr[2][value[2]] + ' ' + expireTimeArr[3][value[3]] + ':' + expireTimeArr[4][value[4]] + ":00"
  //       console.log(expireTimeStr)
  //       const expireTime = getDate(expireTimeStr).getTime()
  //       this.setData({
  //         expireTime,
  //         expireTimeValue: value
  //       })
  //       console.log(expireTime)
  //       break
  //     default:
  //       break
  //   }
  // },
  // changeStartTimeColumn(e) {
  //   console.log(e)
  //   var arr = this.data.signUpStartTimeValue,
  //     dateArr = this.data.signUpStartTimeArr;

  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

  //   this.setData({
  //     signUpStartTimeArr: dateArr,
  //     signUpStartTimeValue: arr
  //   });
  // },
  // changeEndTimeColumn(e) {
  //   var arr = this.data.expireTimeValue,
  //     dateArr = this.data.expireTimeArr;
  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  //   this.setData({
  //     expireTimeArr: dateArr,
  //     expireTimeValue: arr
  //   });
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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