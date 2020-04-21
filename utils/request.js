
import store from '../store.js'
import {baseUrl} from '../config'



function networkpost({
  url,
  headers,
  params,
  app,
  des
}) {
  // console.log(baseUrl)
  let localHeader = {
    'content-type': 'application/json',
    'cookie': wx.getStorageSync("_baomingbaCookie")
  }
  console.log(localHeader)
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'POST',
      success: function(res) {
        setTimeout(() => {
          wx.hideLoading()
        }, 500)
        //自行处理返回结果
        if(res.data.e === 100){ // 未登录
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
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
  let localHeader = {
    'content-type': 'application/json',
    'cookie': wx.getStorageSync("_baomingbaCookie")
  }
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
        if(res.data.e === 100){ // 未登录
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
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