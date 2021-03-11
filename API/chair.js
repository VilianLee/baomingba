import {
  networkpost,
} from './request.js'
import {commonData, commonDataDp} from '../cantants/contants'


export const getProductList = (param, success) => { // 获取按摩椅套餐列表
  const des = '获取按摩椅套餐列表'
  const data = Object.assign({},commonData, {
    command: "7003",
    param
  });
  networkpost({
    url: `/applets/Chair/queryChairProduct.json`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const chairPayOrder = (param, success) => { // 按摩椅订单下单
  const des = '按摩椅订单下单'
  const data = Object.assign({},commonData, {
    command: "7004",
    param
  });
  networkpost({
    url: `/applets/Chair/getChairOrder.json`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

export const getPayResult = (param, success) => { // 按摩椅订单倒计时
  const des = '按摩椅订单倒计时'
  const data = Object.assign({},commonData, {
    command: "7005",
    param
  });
  networkpost({
    url: `/applets/Chair/orderCountDown.json`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data,
    des
  }).then(function (res) {
    return success(res.data)
  })
}