import {
  networkpost,
} from './request.js'


export const getToken = (param, success) => { // 获取token
  const des = '获取token'
  const data = Object.assign({}, {
    command: "1001",
    param: {
      appid: '35385640507',
      secret: 'a14c4ab485a60833fe09064e27ae013e'
    }
  });
  networkpost({
    url: `/base/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const bindPhoneNo = (param, success) => { // 绑定手机号
  const des = '绑定手机号'
  const data = Object.assign({}, {
    command: "200203",
    param
  });
  networkpost({
    url: `/user/member/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const login = (param, success) => { //登录
  const des = '登录'
  const data = Object.assign({}, {
    command: "200202",
    param
  });
  networkpost({
    url: `/user/member/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getHomeSlide = (param, success) => { //获取首页banner图
  const des = '获取首页banner图'
  const data = Object.assign({}, {
    command: "6001",
    param
  });
  networkpost({
    url: `/Operation/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const queryTrainList = (param, success) => { //车次模糊查询
  const des = '车次模糊查询'
  const data = Object.assign({}, {
    command: "4017",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getFoodTypes = (param, success) => { //查询餐品分类
  const des = '查询餐品分类'
  const data = Object.assign({}, {
    command: "4001",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getFoodList = (param, success) => { //查询餐品列表
  const des = '查询餐品列表'
  const data = Object.assign({}, {
    command: "4002",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getFoodDetail = (param, success) => { //查询餐品详情
  const des = '查询餐品详情'
  const data = Object.assign({}, {
    command: "4003",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getQuery = (param, success) => { //查询餐品校验
  const des = '查询餐品校验'
  const data = Object.assign({}, {
    command: "4013",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const submitFoodOrder = (param, success) => { //订餐订单提交
  const des = '订餐订单提交'
  const data = Object.assign({}, {
    command: "4002",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const payOrder = (param, success) => { //统一下单
  const des = '统一下单'
  param.wxPayType = '2'
  const data = Object.assign({}, {
    command: "5001",
    param
  });
  networkpost({
    url: `/Pay/Pay/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getPayResult = (param, success) => { //查询支付结果
  const des = '查询支付结果'
  const data = Object.assign({}, {
    command: "5002",
    param
  });
  networkpost({
    url: `/Pay/Pay/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getTravellerInfo = (param, success) => { //获取用户订餐信息
  const des = '获取用户订餐信息'
  const data = Object.assign({}, {
    command: "4015",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const submitOrder = (param, success) => { //提交订单
  const des = '提交订单'
  const data = Object.assign({}, {
    command: "4005",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getOrderList = (param, success) => { //获取订单列表
  const des = '获取订单列表'
  const data = Object.assign({}, {
    command: "4007",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getOrderDetail = (param, success) => { //获取订单详情
  const des = '获取订单详情'
  const data = Object.assign({}, {
    command: "4006",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const cancelOrder = (param, success) => { //取消订单
  const des = '取消订单'
  const data = Object.assign({}, {
    command: "4008",
    param
  });
  networkpost({
    url: `/Food/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getPersonInfo = (param, success) => { //查询我的资料
  const des = '查询我的资料'
  const data = Object.assign({}, {
    command: "2023",
    param
  });
  networkpost({
    url: `/user/member/doAction`,
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}