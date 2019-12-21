
import store from '../store.js'
import {baseUrl} from '../config'

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
  // console.log(baseUrl)
  // console.log(localHeader)
  wx.showLoading({
    title: '加载中',
  })
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'POST',
      success: function(res) {
        wx.hideLoading()
        //自行处理返回结果
        console.log(des + '返回结果：')
        console.log(baseUrl.baseUrl + url)
        console.log(params)
        console.log(res.data)
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
  console.log(localHeader)
  wx.showLoading({
    title: '加载中',
  })
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        //返回结果自行处理
        wx.hideLoading()
        resolve(res);
        console.log(baseUrl.baseUrl + url)
        console.log(des + '返回结果：')
        console.log(res.data)
      }
    })
  });
  return promise;
}

function networkUpload({
  url,
  headers,
  params,
  app,
  des
}) {
  wx.showLoading({
    title: '上传中',
  })
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl.uploadUrl + url,
      header: {
        'content-type': 'multipart/form-data; boundary=<frontier>',
        'content-length': '<multipartContentLength>'
      },
      data: params,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        //自行处理返回结果
        console.log(des + '返回结果：')
        console.log(baseUrl.baseUrl + url)
        console.log(params)
        console.log(res.data)
        resolve(res);
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