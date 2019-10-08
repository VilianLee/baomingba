
const baseUrl = 'https://xcxtest.51bmb.com'

let localHeader = {
  'content-type': 'application/json',
  'cookie': wx.getStorageSync("_baomingbaCookie")
}

function networkpost({ url, headers, params, app, des }) {
  console.log(localHeader)
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'POST',
      success: function (res) {
        //自行处理返回结果
        console.log(des + '返回结果：')
        console.log(params)
        console.log(res.data)
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      }
    })
  });
  return promise;
}
//get请求
function networkget({ url, headers, params, app, des }) {
  console.log(localHeader)
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'GET',
      success: function (res) {
        //返回结果自行处理
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
        console.log(des + '返回结果：')
        console.log(params)
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