import {
  networkpost,
  networkget
} from '../utils/request.js'
import {
  Login
} from 'login.js'

function login(params, success) { //登录
  const des = '登录'
  Login({
    url: '/login?username=18958081773&password=123456',
    des
  }).then(function(res) {
    return success(res)
  })
}

function getMyEnjoined(params, success) { //获取我报名的列表
  const des = '获取我报名的列表'
  networkget({
    url: '/events/signup?l=20&from= %2f',
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getMyPubliced(params, success) { //获取我发布的列表
  const des = '获取我发布的列表'
  networkget({
    url: '/events/publish?l=20',
    des
  }).then(function (res) {
    return success(res.data)
  })
}

function getMyCollected(params, success) { //获取我收藏的列表
  const des = '获取我收藏的列表'
  networkget({
    url: '/events/like?l=20',
    des
  }).then(function (res) {
    return success(res.data)
  })
}

function getActivityDetails(id, success) { //获取活动详情
  const des = '获取活动详情'
  networkget({
    url: `/event/${id}`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

function getUserInfo(params, success) { //获取用户信息
  const des = '获取用户信息'
  networkget({
    url: '/j/person',
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function checkHotActiveList(params, success) { //获取热门活动列表
  const des = '获取热门活动列表'
  networkget({
    url: '/events/hot?l=20',
    des
  }).then(function (res) {
    return success(res.data)
  })
}

function signUpActivity(params, success) { //活动报名
  const des = '活动报名'
  networkget({
    url: `/event/${params.eventId}/signup?shareType=0`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

module.exports = {
  login,
  getMyEnjoined,
  getMyPubliced,
  getMyCollected,
  getActivityDetails,
  getUserInfo,
  checkHotActiveList,
  signUpActivity
}