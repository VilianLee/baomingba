export default {
  data: {
    userInfo: {
      name: "Vilian"
    },
    hasUserInfo: false,
    default_address: {
      name: "Vilian",
      mobile: "152*****676",
      address: "浙江省杭州市西湖区城区天目山路238号华鸿大厦A座806"
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logs: [],
    b: { 
      arr: [{ name: '数值项目1' }] ,
      //深层节点也支持函数属性
      
    },
    pureProp: 'pureProp',
    globalPropTest: 'abc', //更改我会刷新所有页面,不需要再组件和页面声明data依赖
    ccc: { ddd: 1 } //更改我会刷新所有页面,不需要再组件和页面声明data依赖

  },
  globalData: ['globalPropTest', 'ccc.ddd'],
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}