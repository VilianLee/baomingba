const baseUrl = 'https://xcxtest.51bmb.com'

function Login({
  url,
  headers,
  app,
  des
}) {
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrl + url,
      header: headers,
      method: 'GET',
      success: function(res) {
        //自行处理返回结果
        console.log(des + '返回结果：')
        console.log(res.header["Set-Cookie"])
        wx.setStorageSync("_baomingbaCookie", res.header["Set-Cookie"])
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

module.exports = {
  Login
}