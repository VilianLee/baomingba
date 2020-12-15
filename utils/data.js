/**
 * 广告对象 Advert
 */
export class Advert {
  constructor({id, advertype, title, link, picurl, createtime, updatetime, remark}) {
    this.id = id
    this.advertype = advertype
    this.title = title
    this.link = link
    this.picurl = picurl
    this.createtime = createtime
    this.updatetime = updatetime
    this.remark = remark
  }
}

export function createAdvert(oAdvert) {
  return new Advert({
    id: oAdvert.id,
    advertype: oAdvert.advertype,
    title: oAdvert.title,
    link: oAdvert.link,
    picurl: dealUrl(oAdvert.picurl),
    createtime: oAdvert.createtime,
    updatetime: oAdvert.updatetime,
    remark: oAdvert.remark
  })
}

function dealUrl(url) {
  let url2 = ''
  if (url.indexOf('http') !== 0 && url.indexOf('//') !== 0) {
    url2 = 'https://' + url
  } else {
    url2 = url
  }
  return url2
}

/**
 * 列车对象 Train
 */
export class Train {
  constructor({trainNo, trainType, startSta, startType, startTime, endSta, endType, endTime, runDistance, runTime, priceList, minPrice}) {
    this.trainNo = trainNo
    this.trainType = trainType
    this.startSta = startSta
    // this.startType = startType
    this.startTime = startTime
    this.endSta = endSta
    // this.endType = endType
    this.endTime = endTime
    // this.runDistance = runDistance
    this.runTime = runTime
    this.priceList = priceList
    this.minPrice = minPrice
  }
}
//
// export function createTrain(oTrain) {
//   return new Train({
//     trainNo: oTrain.train_no,
//     trainType: oTrain.train_type,
//     startSta: oTrain.start_station,
//     startType: oTrain.start_station_type,
//     startTime: oTrain.start_time,
//     endSta: oTrain.end_station,
//     endType: oTrain.end_station_type,
//     endTime: oTrain.end_time,
//     runDistance: oTrain.run_distance,
//     runTime: oTrain.run_time,
//     priceList: oTrain.price_list,
//     minPrice: oTrain.price_list[0].price
//   })
// }

export function createTrain(oTrain) {
  const ticket = processTicket(oTrain.ticketInfo)
  return new Train({
    trainNo: oTrain.num,
    trainType: oTrain.num.slice(0, 1).match(/\d/) ? 'P' : oTrain.num.slice(0, 1), // 区分普列和其他列车类型
    startSta: oTrain.fromCity,
    // startType: oTrain.start_station_type,
    startTime: oTrain.fromTime.slice(0, 2).concat(':', oTrain.fromTime.slice(2)),
    endSta: oTrain.toCity,
    // endType: oTrain.end_station_type,
    endTime: oTrain.toTime.slice(0, 2).concat(':', oTrain.toTime.slice(2)),
    // runDistance: oTrain.run_distance,
    runTime: oTrain.usedTime,
    priceList: ticket,
    minPrice: ticket[0] ? ticket[0].price : ''
  })
}

function processTicket(ticket) {
  let ret = []
  // let noSeat = ticket.noseat ? ticket.noseat : null
  for (const item in ticket) {
    if (item === 'noseat' || item.indexOf('up') !== -1 || item.indexOf('mid') !== -1) { // 将对象中的无座、上铺、中铺给去掉（卧铺只需显示下铺票价）
      continue
    } else if (item.indexOf('down') !== -1) { // 处理下铺字段名
      let ticketName = ticket[item].ticketName
      ticket[item].ticketName = ticketName.slice(0, ticketName.length - 1)
    }
    ret.push(ticket[item])
  }
  ret.sort(compare) // 将座位类型按照票价从小到大排序（先将无座除外）
  // if (noSeat) {
  //   ret.push(noSeat)
  // }
  return ret
}

// 数组排序比较函数
function compare(a, b) {
  return a.price - b.price
}

/**
 * 订票订单对象 TicketOrder
 */
export class TicketOrder {
  constructor({id, bizNo, orderStatus, createTime, restPayTime, requestId, flowId, total, idName, idNo, seatType, ticketNum, ticketPrices, trainCode, startSta, endSta, startDate, endDate, startTime, endTime, coachNo, seatNo, ticketImgUri, refundPrices, remark}) {
    this.id = id
    this.bizNo = bizNo
    this.orderStatus = orderStatus
    this.createTime = createTime
    this.restPayTime = restPayTime
    this.requestId = requestId
    this.flowId = flowId
    this.total = total

    this.idName = idName
    this.idNo = idNo
    this.seatType = seatType
    this.ticketNum = ticketNum
    this.ticketPrices = ticketPrices

    this.trainCode = trainCode
    this.startSta = startSta
    this.endSta = endSta
    this.startDate = startDate
    this.endDate = endDate
    this.startTime = startTime
    this.endTime = endTime
    this.coachNo = coachNo
    this.seatNo = seatNo
    this.ticketImgUri = ticketImgUri
    this.refundPrices = refundPrices
    this.remark = remark
  }
}

export function createTicketOrder(order) {
  return new TicketOrder({
    id: order.id,
    bizNo: order.bizNo,
    orderStatus: order.orderStatus,
    createTime: order.createTime,
    restPayTime: order.restPayTime,
    requestId: order.requestId,
    flowId: order.flowId,
    total: order.total,
    idName: order.idName.split('#'),
    idNo: order.idNo.split('#').map((idNo) => {
      const idNoArr = idNo.split(':')
      let idNum
      let persontype
      if (idNoArr[1] === undefined) { // 兼容儿童票下单之前的版本
        idNum = idNoArr[0]
        persontype = '1'
      } else {
        idNum = idNoArr[1]
        persontype = idNoArr[0]
      }
      return {idNum, persontype}
    }),
    seatType: order.seatType,
    ticketNum: order.ticketNum,
    ticketPrices: order.ticketPrices,
    trainCode: order.trainCode,
    startSta: order.fromStation,
    endSta: order.toStation,
    startDate: order.startTime,
    endDate: order.endTime,
    startTime: getTime(order.startTime),
    endTime: getTime(order.endTime),
    coachNo: order.coachNo || '--',
    seatNo: order.seatNo || '--',
    ticketImgUri: (order.ticketImgUri && order.ticketImgUri.split(',')) || [],
    refundPrices: order.refundPrices || 0,
    remark: order.remark || ''
  })
}

function getTime(date = new Date(), hasSecond = false) {
  if (typeof date === 'number') {
    date = new Date(date)
  }
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  if (hasSecond) {
    const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return hour + ':' + minute + ':' + second
  } else {
    return hour + ':' + minute
  }
}
