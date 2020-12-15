// pages/home/home/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  createAdvert
} from "../../../utils/data";
import {
  getHomeSlide
} from '../../../API/servers'
import {
  functionList
} from '../../../cantants/contants'

const app = getApp()

create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    sliderList: [],
    functionList: functionList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.waitForToken()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  funcOnClick(e) {
    if(!store.data.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }
    const {func} = e.currentTarget.dataset
    if(func.type === 'local') {
      wx.navigateTo({
        url: func.path,
      })
    } else {
      wx.showToast({
        title: '功能正在开发中，请耐心等待',
        icon: 'none',
        duration: 2000
      })
    }
  },
  waitForToken() {
    const {
      token
    } = store.data
    if (token) {
      this.AjaxGetHomeSlide()
    } else {
      setTimeout(() => {
        this.waitForToken()
      }, 200)
    }
  },
  AjaxGetUserInfo(){
    
  },
  AjaxGetHomeSlide() {
    getHomeSlide({}, res => {
      let homeSlide = this._normalizeData(res.data.result);
      homeSlide.forEach(item => {
        item.link = item.link.replace("mobile=%s", "mobile=" + this.phone);
      });
      this.setData({
        sliderList: homeSlide
      })
    });
  },
  _normalizeData(datas) {
    let ret = [];
    datas.forEach(item => {
      ret.push(createAdvert(item));
    });
    return ret;
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