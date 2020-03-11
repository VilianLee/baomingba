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
  DeepClone
}