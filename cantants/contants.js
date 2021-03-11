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
  '6001', // 获取首页banner图
  '6011', // 查询小程序广告位信息
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

export const APP_ID = '35385640507'

export const commonData = {
  ver: '1.0',
  // sign: 'MD5MD5MD',
  timestamp: '137889283'
}

export const commonDataDp = {
  merchantCode: APP_ID,
  merchantName: '携程订票系统'
}

export const functionList = [{
  icon: '/images/index/icon_food.png',
  name: '列车点餐',
  type: 'local',
  path: '/pages/order-food/index/index'
}, {
  icon: '/images/index/icon_mobile_recharge.png',
  name: '手机充电',
  function: 'EnergyMonster',
  type: 'scan',
  scanType: 'miniProgram',
  appid: 'wxb57627a2a7e9cb59',
  jumpPath: '/PagesB/WaitPower/waitPower'
}, {
  icon: '/images/index/icon_chair.png',
  name: '按摩椅',
  type: 'scan',
  function: 'wxChart',
  scanType: 'local',
  path: '/pages/massageChair/list/index'
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
  name: '西银线开通',
  type: 'local',
  path: '/pages/vidios/index'
}, {
  icon: '/images/index/icon_vending_machine.png',
  name: '自动售卖机'
}]

const scanType = { // 跳转方式
  'local': '本地页面',
  'webview': '内嵌H5页面',
  'minProgram': '跳转小程序'
}

//scanType == 'local'，需要带参数 path="path"
//scanType == 'webview'，需要带参数url="fullUrl" --fullUrl必须是encode转码后的值
//scanType == 'minProgram'，需要带参数appid="appid"、jumpPath={path} -- path为跳转的目标小程序的页面路径、query={query} -- query是跳转外部小程序时需要带的参数，必须是encode转码后的值