import {
  baseUrl
} from '../config'

let localHeader = {
  'content-type': 'application/json',
  'cookie': wx.getStorageSync("_baomingbaCookie")
}

const upLoadImg = (path, suc) => {
  console.log('upLoadImg')
  console.log(path)
  wx.uploadFile({
    url: baseUrl.imageUrl + '/xcx/uploadfile',
    filePath: path,
    name: 'file',
    header: localHeader,
    success: (res) => {
      suc(res)
    }
  })
}

const initPublic = {
  createSource: 2, //创建源,(安卓，ios还是h5)
  title: null, //活动标题
  beginTime: null, //活动开始时间
  beginTimeStr: '',
  endTimeStr: '',
  endTime: null, //活动结束时间
  signUpStartTime: null, //报名开始时间
  expireTime: null, //到期时间
  telephone: "", //联系电话
  signUpLimit: "0", //报名人数限制
  charge: null, //收费费用
  status: "0", //活动状态
  payPath: 0, //支付方式
  organizer: "", //主办方
  address: {
    province: "", //省
    city: "", //市
    district: "", //区
    shortAddress: "", //地址
    longAddress: "", //完整地址
    longitude: "", //经度
    latitude: "" //维度
  },
  hideAddr: false, //是否隐藏地址
  publicType: 1, //公开类型(公开，私密)
  anonSignUp: 0, //匿名报名
  conditions: [{ //报名项
    name: "username"
  }, {
    name: "telephone"
  }],
  photowallControl: false, //是否有照片墙
  tipControl: false, //是否可以打赏
  intro: "", //活动介绍
  introPhotos: [],
  introType: 1, //介绍类型
  photos: [],
  isShare: 0 //是否可以分享
}

function deepCopy (obj, cache = []) {
  // typeof [] => 'object'
  // typeof {} => 'object'
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
  /**
   * 类似下面这种
   * var a = {b:1}
   * a.c = a
   * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
   */
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ?  [] :   {}
  // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })
  return copy
}


module.exports = {
  upLoadImg,
  deepCopy,
  initPublic
}