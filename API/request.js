import store from '../store.js'
import {
  baseUrl
} from '../config'
import {
  getToken
} from './servers'
import {
  timeFormat,
  generateSign
} from '../utils/util.js'
import {
  RES_OK,
  RES_OK2,
  TOKEN_EXPIRE,
  NOT_WC_BIND,
  commadList
} from '../cantants/contants'

function networkpost({
  url,
  headers,
  data,
  des,
  fail
}) {
  // console.log(baseUrl)
  let localHeader = {
    'content-type': 'application/json',
  }
  const {
    token,
    openid
  } = store.data
  if (data.command !== '1001') { // 获取 token 接口不需要带 token 请求
    data.token = token
  }
  if (openid) { // 登录后
    data.openid = openid
  } else if (url.indexOf('Operation') === -1 && commadList.indexOf(data.command) === -1) { // 未登录时取消请求并跳转登录页面（排除运营管理等无需登录就能请求的接口）
    wx.navigateTo({
      url: '/pages/login/index',
    })
    return
  }
  data.token = token
  data.openid = openid
  data.timestamp = timeFormat('ms')
  data.sign = generateSign(data)
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  if(headers) {
    data.param = JSON.stringify(data.param)
  }
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + url,
      header: headers ? headers : localHeader,
      data,
      method: 'POST',
      success: function (response) {
        const res = response.data
        console.log(des + '返回结果：')
        console.log(baseUrl + url)
        console.log(data)
        console.log(res)
        if (!res) {
          wx.showToast({
            title: '系统繁忙，请稍后再试',
            icon: 'none',
            duration: 2000
          })
          reject(new Error('系统繁忙，请稍后再试'))
        }
        wx.hideLoading()
        if (res.errcode && res.errcode !== RES_OK && res.errcode !== RES_OK2) { // 接口返回数据状态码字段为 errcode，且状态码异常
          if (res.errcode === TOKEN_EXPIRE) { // token 过期或者不存在
            // 重新获取 token
            return getToken({}, token => {
              store.data.token = token.data.token
              networkpost({
                url,
                headers,
                data,
                des
              })
            })
          } else if (res.errcode === NOT_WC_BIND || res.errcode == '203102') {
            return reject(new Error(res.errmsg || res.msg || 'error'))
          }

          if (res.errmsg === undefined) {
            wx.showToast({
              title: '未知错误',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.errmsg,
              icon: 'none',
              duration: 2000
            })
          }
          reject(new Error(res.errmsg || res.msg || 'error'))
        } else if (res.code && res.code !== RES_OK && res.code !== RES_OK2) { // 接口（部分车票数据接口）返回数据状态码字段为 code，且状态码异常
          if (res.msg === undefined) {
            wx.showToast({
              title: '未知错误',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
          reject(new Error(res.msg || res.errmsg || 'unknown error'))
        } else if (res.errcode === RES_OK || res.code === RES_OK2) { // 获取数据成功
          resolve(response);
        } else {
          wx.showToast({
            title: '请求参数错误',
            icon: 'none',
            duration: 2000
          })
          reject(new Error('请求参数错误'))
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  });
  return promise;
}

module.exports = {
  networkpost: networkpost
}