// pages/order-food/foodList/index.js
import store from '../../../store'
import create from '../../../utils/create'
import {
  getFoodTypes,
  getTravellerInfo,
  getFoodList
} from '../../../API/servers'
const app = getApp()

create(store, {

  //右侧分类的高度累加数组
  //比如：[洗车数组的高度，洗车+汽车美容的高度，洗车+汽车美容+精品的高度，...]
  heightArr: [],
  //记录scroll-view滚动过程中距离顶部的高度
  distance: 0,
  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    nowDate: '',
    trainNo: '',
    totalPrice: 0,
    totalPriceStr: 0,
    foodTypes: [],
    foodList: [],
    goodsList: [],
    currentLeft: 0, //左侧选中的下标
    selectId: "item0", //当前显示的元素id
    scrollTop: 0, //到顶部的距离
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
      nowDate: year + "-" + month + "-" + day,
      trainNo: options.trainNo
    });
    this.AjaxGetFoodTypes()
    this.AjaxGetTravellerInfo()
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

  foodOnClick(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order-food/foodDetail/index?dishid=${id}&trainno=${this.data.trainNo}&traindate=${this.data.nowDate}`,
    })
  },

  totalComputer() {
    const {
      foodList
    } = this.data
    let total = 0
    let num = 0
    foodList.forEach(item => {
      item.foods.forEach(food => {
        total += parseFloat(food.num) * parseFloat(food.dishprice)
        num += food.num
      })
    })
    this.setData({
      totalPriceStr: (total / 100).toFixed(2),
      totalPrice: total,
      totalNum: num
    })
  },

  subCount(e) {
    const {
      index,
      pos
    } = e.currentTarget.dataset
    const {
      foodList
    } = this.data
    let foods = foodList[index].foods
    let food = foods[pos]
    if (food.num > 0) {
      food.num = food.num - 1
      this.setData({
        foodList
      })
    }
    this.totalComputer()
  },
  addCount(e) {
    const {
      index,
      pos
    } = e.currentTarget.dataset
    const {
      foodList
    } = this.data
    let foods = foodList[index].foods
    console.log(foods)
    let food = foods[pos]
    if (food.num < food.remains) {
      food.num += 1
      this.setData({
        foodList
      })
    } else {
      wx.showToast({
        title: food.dishname + '只有' + food.remains + '份了',
        icon: 'none',
        duration: 2000
      })
    }
    this.totalComputer()
  },

  clickForOrder() {
    if (!this.data.totalNum) {
      wx.showToast({
        title: '请选择商品后再下单',
        icon: 'none',
        duration: 2000
      })
    }
    const dish = []
    this.data.foodList.forEach(item => {
      item.foods.forEach(food => {
        if (food.num > 0) {
          dish.push(food)
        }
      })
    })
    let timestamp = Date.parse(new Date());

    const obj = {
      total: this.data.totalNum,
      money: this.data.totalPrice,
      totalPriceStr: this.data.totalPriceStr,
      trainno: this.data.trainNo,
      starttime: this.data.nowDate,
      ordertype: '1',
      appType: '5',
      merchantno: timestamp,
      merchantname: timestamp,
      bizNo: timestamp,
      dish: dish,
      traveller: this.data.travellerInfo.traveller,
      contactmobile: this.data.travellerInfo.mobile
    }
    store.data.submitOrderInfo = obj
    store.update()
    wx.navigateTo({
      url: '/pages/order-food/submitOrder/index',
    })
  },

  AjaxGetFoodTypes() {
    getFoodTypes({}, res => {
      this.setData({
        foodTypes: res.data.result
      })
      this.AjaxGetFoodList()
    })
  },

  AjaxGetTravellerInfo() {
    getTravellerInfo({}, res => {
      this.setData({
        travellerInfo: res.data
      })
    })
  },

  AjaxGetFoodList() {
    const params = {
      trainno: this.data.trainNo,
      traindate: this.data.nowDate,
      classId: null,
      curpage: "1",
      empType: "2",
      numspage: "1000"
    }
    getFoodList(params, res => {
      var result = res.data.result;
      this.setData({
        goodsList: result
      })
      for (let i = 0; i < result.length; i++) {
        result[i].priceStr = (result[i].dishprice / 100).toFixed(2);
        result[i].dishdiscountprice = result[i].dishprice
        result[i].num = 0;
      }
      let c = this.data.foodTypes.map(item => {
        item.foods = [];
        result.forEach(v => {
          if (item.id == v.classId) {
            item.foods.push(v);
          }
        });
        return item;
      });
      //         	console.log(JSON.stringify(c),'228')
      for (var i = 0, len = c.length; i < len; i++) {
        if (c[i].foods.length == 0) {
          c.splice(i, 1);
          len--;
          i--;
        }
      }
      console.log(c, "this.goods");
      this.setData({
        foodList: c,
        loading: true
      })

    })
  },

  proItemTap(e) {
    this.setData({
      currentLeft: e.currentTarget.dataset.pos,
      selectId: "item" + e.currentTarget.dataset.pos
    })
  },

  //计算右侧每一个分类的高度，在数据请求成功后请求即可
  selectHeight() {
    let that = this;
    this.heightArr = [];
    let h = 0;
    const query = wx.createSelectorQuery();
    query.selectAll('.pro-box').boundingClientRect()
    query.exec(function (res) {
      res[0].forEach((item) => {
        h += item.height;
        that.heightArr.push(h);
      })
      console.log(that.heightArr);
      // [160, 320, 1140, 1300, 1570, 1840, 2000]
      // 160：洗车标题高度50px，item的高度110，洗车只有一个item，所以50+110*1=160px;
      // 320: 汽车美容标题高度50px，只有一个item，再加上洗车的高度，所以50+110*1+160=320px;
      // ...
    })
  },

  //监听scroll-view的滚动事件
  scrollEvent(event) {
    if (this.heightArr.length == 0) {
      return;
    }
    let scrollTop = event.detail.scrollTop;
    let current = this.data.currentLeft;
    if (scrollTop >= this.distance) { //页面向上滑动
      //如果右侧当前可视区域最底部到顶部的距离 超过 当前列表选中项距顶部的高度（且没有下标越界），则更新左侧选中项
      if (current + 1 < this.heightArr.length && scrollTop >= this.heightArr[current]) {
        this.setData({
          currentLeft: current + 1
        })
      }
    } else { //页面向下滑动
      //如果右侧当前可视区域最顶部到顶部的距离 小于 当前列表选中的项距顶部的高度，则更新左侧选中项
      if (current - 1 >= 0 && scrollTop < this.heightArr[current - 1]) {
        this.setData({
          currentLeft: current - 1
        })
      }
    }
    //更新到顶部的距离
    this.distance = scrollTop;
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