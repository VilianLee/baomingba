import store from '../store.js'
import {
  baseUrl
} from '../config'

const errCode = {
  100: "需要登录进行操作但检测到未登录",
  101: "没权限",
  102: "传入参数有问题",
  103: "活动已取消",
  104: "活动已关闭",
  105: "活动已报名，不能重复报名",
  106: "报名信息有些数据为空或不合法",
  107: "活动报名已截止",
  108: "活动已结束",
  109: "暂无名额，稍后再试",
  110: "活动未报名",
  111: "签到失败, 不能重复签到",
  112: "签到失败, 审核未通过",
  113: "活动未开始报名",
  114: "签到失败, 报名未审核",
  115: "请先报名再支付", //EventSignUpNotInPayStatus(115) - 活动报名不在待支付状态，用在生成支付订单时的判断
  116: "活动报名停留在待支付状态",
  117: "该活动已被发布方删除",
  118: "修改报名人数小于当前报名人数返回错误码",
  120: "内容包含敏感词",
  130: "没有邮箱",
  131: "非法邮件地址",
  135: "导出的excel文件未生成",
  136: "Read write error",
  140: "用户名或密码错误", //"登录错误"
  145: "手机已注册,忘记密码请通过验证码登录",
  146: "手机号码错误",
  147: "验证码错误",
  148: "其他注册错误",
  149: "发送验证码错误",
  150: "手机未注册",
  151: "旧密码错误",
  155: "帐号已绑定",
  156: "帐号绑定出错",
  157: "该微信号已和其它手机号绑定，请先解除",
  160: "最后一个帐号不能被解绑",
  161: "帐号解绑错误",
  162: "发布活动和报名活动需要绑定手机",
  190: "你已关注该组织或个人",
  200: "系统出错",
  201: "超时",
  202: "数据库出错",
  203: "获取Qiniu Token Error",
  204: "无效二维码",
  300: "重复插入同一个item入库失败，比如报名多次",
  600: "活动已取消，不支持该操作",
  800: "活动不需要支付",
  904: "单次提现金额不能超过50000元",
  1112: "组织号一次只能绑定一个私人帐号",
  1118: "绑定失败，已经绑定其他的组织号",
  1700: "组织号不存在",
  1900: "组织号申请表不存在",
  1901: "组织号申请信息填写错误",
  1902: "组织号会员已申请",
  2100: "重复处理已经退款完成的请求",
  2101: "处理失效的退款请求或拒绝无效状态的报名者",
  2500: "没有权限删除",

  3000: "身份证姓名和身份证号码不匹配",
  // EventForbidden(121), InvalidTitleWords(122), InvalidCommentWords(123),UserNotValidated(152),

  5000: "你的认证类型与前一次不一致",
  // 客户端自定义错误
  8000: "网络数据格式错误",
  9000: "操作取消"
}

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
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'POST',
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading()
        }, 500)
        //自行处理返回结果
        if (res.data.e !== 0) {
          if (res.data.e === 100 || res.data.e === 140) { // 未登录
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else {
            res.data.msg = errCode[res.data.e]
          }
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
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl.baseUrl + url,
      header: headers ? headers : localHeader,
      data: params,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if (res.data.e === 100) { // 未登录
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