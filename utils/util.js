const formatTime = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const week = date.getDay()
  let weekStr = ""
  switch (week) {
    case 0:
      weekStr = '一'
      break
    case 1:
      weekStr += "一"
      break
    case 2:
      weekStr += "二"
      break
    case 3:
      weekStr += "三"
      break
    case 4:
      weekStr += "四"
      break
    case 5:
      weekStr += "五"
      break
    case 6:
      weekStr += "六"
      break
  }
  if (type === 'mm/dd') {
    return [month, day].map(formatNumber).join('/')
  } else if (type === 'detail') {
    return `${month}月${day}日（${weekStr}）`
  } else {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime,
  formatNumber
}