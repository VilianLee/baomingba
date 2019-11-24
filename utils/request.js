
import store from '../store.js'
import {baseUrl} from '../config'

const { $Toast } = require('../dist/base/index');

let localHeader = {
  'content-type': 'application/json',
  'cookie': wx.getStorageSync("_baomingbaCookie")
}

function networkpost({
  url,
  headers,
  params,
  app,
  des
}) {
  store.data.loading = true
  store.update()
  console.log(baseUrl)
  console.log(localHeader)
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'POST',
      success: function(res) {
        //自行处理返回结果
        console.log(des + '返回结果：')
        console.log(params)
        console.log(res.data)
        store.data.loading = false
        store.update()
        resolve(res);
      }
    })
  });
  return promise;
}
//get请求
function networkget({
  url,
  headers,
  params,
  app,
  des
}) {
  store.data.loading = true
  store.update()
  console.log(baseUrl)
  console.log(localHeader)
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'GET',
      success: function(res) {
        //返回结果自行处理
        store.data.loading = false
        store.update()
        resolve(res);
        console.log(des + '返回结果：')
        console.log(res.data)
      }
    })
  });
  return promise;
}

module.exports = {
  networkget: networkget,
  networkpost: networkpost,
  baseUrl: baseUrl
}