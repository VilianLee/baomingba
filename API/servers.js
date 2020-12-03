import {
  networkpost,
  networkget,
  networkUpload
} from '../utils/request.js'
import {
  Login,
  Author
} from 'login.js'


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

export const authUser = (params, success) => { //授权注册
  const des = '授权注册'
  Author({
    url: `/auth/wechat/xcx`,
    params,
    des
  }).then(function (res) {
    return success(res.data)
  })
}