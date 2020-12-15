// pages/order-food/index/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  queryTrainList
} from '../../../API/servers'
const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    tranNo: '',
    queryDate: '',
    trainList: [],
    nowDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dates = new Date();
    let year = dates.getFullYear();
    let month = dates.getMonth() + 1;
    let monthDay = new Date(year, month, 0);
    monthDay = monthDay.getDate();
    let day = null;
    day = dates.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.setData({
      nowDate: year + "-" + month + "-" + day
    });
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

  AjaxQueryTrainList() {
    const params = {
      traincode: this.data.tranNo
    }
    const _this = this
    queryTrainList(params, res => {
      const list = res.data
      if (list.length > 0) {
        this.setData({
          trainList: list
        })
        const itemList = []
        list.forEach((item, index) => {
          if (index < 6) {
            itemList.push(item.trainnoinfo)
          }
        })
        console.log(itemList)
        wx.showActionSheet({
          itemList: itemList,
          success(res) {
            _this.doActionSeet(res.tapIndex)
          },
          fail(res) {
            console.log(res.errMsg)
          }
        })
      } else {
        wx.showToast({
          title: '无效车次',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  doActionSeet(index) {
    const {trainList} = this.data
    const selectTrain = trainList[index]
    wx.navigateTo({
      url: '/pages/order-food/foodList/index?trainNo=' + selectTrain.trainno,
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