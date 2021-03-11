import md5 from "./md5.min.js"

//字符串转日期格式，strDate要转为日期格式的字符串
const getDate = (strDate) => {
  console.log(strDate)
  var st = strDate;
  var a = st.split(" ");
  var b = a[0].split("-");
  var c = a[1].split(":");
  b[1] = (parseInt(b[1]) - 1).toString()
  var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
  return date;
}

//深拷贝
const DeepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  var cpObj = obj instanceof Array ? [] : {};
  for (var key in obj) cpObj[key] = DeepClone(obj[key]);
  return cpObj;
}

// 生成时间戳函数
const timeFormat = (flag) => {
  if (!flag || flag === 'day') {
    var date = new Date()
    var Y = '' + date.getFullYear()
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1))
    var D = (date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate())
    var h = (date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours())
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes())
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds())
    return Y + M + D + h + m + s
  } else if (flag === 's') {
    return parseInt(new Date().getTime() / 1000) + ''
  } else if (flag === 'ms') {
    return new Date().getTime() + ''
  } else {
    console.log('timeFormat flag 参数错误')
  }
}

// 生成sign
const generateSign = (data) => {
  let param
  let params
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  //
  !data.command && data.command !== '' && (data.command = '')
  // 登录注册接口不需要传 openid
  typeof data.openid === 'undefined' && (data.openid = '')
  // 获取token接口不需要传 token
  typeof data.token === 'undefined' && (data.token = '')
  // 有些接口不需要传 param
  typeof data.param === 'undefined' ? param = '' : typeof data.param === 'string' ? param = data.param : param = JSON.stringify(data.param)
  // 订票接口不传 param 传 params
  typeof data.params === 'undefined' ? params = '' : typeof data.param === 'string' ? params = data.param : params = JSON.stringify(data.param)

  const md5Str = data.command + data.openid + param + params + data.timestamp + data.token + data.ver + 'abx23579436'
  const sign = md5(md5Str)
  return sign + ''
}

const getHrefParam = (paramStr, equal = "=", and = "&") => {
  if (!paramStr) {
    return {}
  }
  const paramArr = paramStr.split(and)
  console.log(paramArr)
  let ret = {}
  paramArr.forEach(param => {
    param = param.split(equal)
    ret[param[0]] = param[1]
  })
  return ret
}

module.exports = {
  getDate,
  DeepClone,
  timeFormat,
  generateSign,
  getHrefParam
}