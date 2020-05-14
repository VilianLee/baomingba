const formatTime = (date, type, tag) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = tag === 'picker' ? '00' : date.getSeconds()
  if (type === 'date') {
    return [year, month, day].map(formatNumber).join('-')
  } else if (type === 'time') {
    return [hour, minute].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
  }
}

const getLeftTime = (endTime) => {
  let time = endTime / 1000; //距离结束的毫秒数
  // 获取天、时、分、秒
  let day = parseInt(time / (60 * 60 * 24));
  let hou = parseInt(time % (60 * 60 * 24) / 3600);
  let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
  let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
  // console.log(day + "," + hou + "," + min + "," + sec)
  day = timeFormin(day),
    hou = timeFormin(hou),
    min = timeFormin(min),
    sec = timeFormin(sec)
  return timeFormat(hou) + '小时' + timeFormat(min) + '分' + timeFormat(sec) + '秒'
}
//小于10的格式化函数（2变成02）
const timeFormat = (param) => {
  return param < 10 ? '0' + param : param;
}
//小于0的格式化函数（不会出现负数）
const timeFormin = (param) => {
  return param < 0 ? 0 : param;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

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

module.exports = {
  formatTime,
  formatNumber,
  getDate,
  getLeftTime,
  DeepClone
}