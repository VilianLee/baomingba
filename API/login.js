// const baseUrl = 'https://xcxtest.51bmb.com'

import {baseUrl} from '../config'

module.exports.Login = ({url,headers,des}) => {
  console.log(baseUrl.baseUrl + url)
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      method: 'GET',
      success: function(res) {
        //自行处理返回结果
        console.log(des + '返回结果：')
        console.log(baseUrl.baseUrl + url)
        console.log(res.header["Set-Cookie"])
        wx.setStorageSync("_baomingbaCookie", res.header["Set-Cookie"])
        console.log(wx.getStorageSync("_baomingbaCookie"))
        console.log(res.data)
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      }
    })
  });
  return promise;
}

module.exports.Author = ({
  url,
  params,
  headers,
  des
}) => {
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      method: 'POST',
      data: params,
      success: function(res) {
        //自行处理返回结果
        console.log(des + '返回结果：')
        console.log(baseUrl + url)
        console.log(res.header["Set-Cookie"])
        wx.setStorageSync("_baomingbaCookie", res.header["Set-Cookie"])
        console.log(res.data)
        console.log(res.header)
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      }
    })
  });
  return promise;
}