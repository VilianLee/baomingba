export const TODAY = new Date() // 今天
TODAY.setHours(0, 0, 0, 0) // 默认今天 00:00

export const START_ORDER_DATE = new Date(new Date(TODAY.getTime()).setDate(TODAY.getDate() + 2)) // 订餐时间

export const RES_OK = '0'
export const RES_OK2 = 'OK'
export const TOKEN_EXPIRE = '4'
export const NOT_WC_BIND = '203101'

// 无需登录可以调用的接口
export const commadList = [
  '1001', // 获取订票 token
  '1002', // 获取微信 access_token
  '1004', // 获取微信 jssdk config 方法的配置对象
  '1005', // 获取云闪付 jssdk config 方法的配置对象
  '200201', // 获取 redirectUri，进而获取云闪付网页授权 code
  '200202', // 微信小程序登录（使用微信小程序的 code 登录）
  '200203', // 微信小程序绑定手机号
  '100601', // 云闪付登录（使用云闪付的 code 登录）
  '100301', // 获取微信 redirectUri
  '100302', // 获取微信用户 openid
  '200101', // 注册请码
  '203001', // 获取二维码（注册，微信中单独处理）
  '200102', // 注册
  '203002', // 注册（微信中单独处理）
  '2002', // 密码登录
  '202901', // 验证码登录请码
  '202902', // 验证码登录
  '2031', // 微信登录（使用微信的 openid 登录）
  '202201', // 忘记密码请码
  '202202' // 忘记密码
]

export const orderStatus = {
  '1': '待支付',
  '2': '待接单',
  '3': '已取消',
  '4': '待配送',
  '5': '已配送',
  '6': '已退货',
  '7': '已完成',
}

export const payTypes = {
  '1': '微信支付',
  '2': '支付宝支付',
  '3': '银联支付'
}

export const functionList = [{
  icon: '/images/index/icon_mobile_recharge.png',
  name: '手机充值',
}, {
  icon: '/images/index/icon_chair.png',
  name: '按摩椅'
}, {
  icon: '/images/index/icon_food.png',
  name: '列车点餐',
  type: 'local',
  path: '/pages/order-food/index/index'
}, {
  icon: '/images/index/icon_ticket.png',
  name: '订火车票'
}, {
  icon: '/images/index/icon_redHat.png',
  name: '小红帽'
}, {
  icon: '/images/index/icon_vip_waitroom.png',
  name: '贵宾候车室'
}, {
  icon: '/images/index/icon_luggage.png',
  name: '行李寄存'
}, {
  icon: '/images/index/icon_singer.png',
  name: '共享唱吧'
}, {
  icon: '/images/index/icon_vending_machine.png',
  name: '自动售卖机'
}]