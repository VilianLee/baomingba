import {
  networkpost,
  networkget,
  networkUpload
} from '../utils/request.js'
import {
  Login, Author
} from 'login.js'

const bindPhoneNo = (params, success) => { // 绑定手机号
  const des = '绑定手机号'
  networkpost({
    url: `/bingphone/xcx`,
    params,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

function login(params, success) { //登录
  const des = '登录'
  Login({
    url: '/login/wechatxcx?code=' + params.code,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function authUser(params, success) { //授权注册
  const des = '授权注册'
  Author({
    url: `/auth/wechat/xcx`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getMyEnjoined(params, success) { //获取我报名的列表
  const des = '获取我报名的列表'
  networkget({
    url: `/events/signup?l=${params.pageSize}&an=${params.startNum}&from=%2f`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getMyPubliced(params, success) { //获取我发布的列表
  const des = '获取我发布的列表'
  networkget({
    url: `/events/publish?l=${params.pageSize}&an=${params.startNum}`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getMyCollected(params, success) { //获取我收藏的列表
  const des = '获取我收藏的列表'
  networkget({
    url: `/events/like?l=${params.pageSize}&an=${params.startNum}`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getActivityDetails(id, success) { //获取活动详情
  const des = '获取活动详情'
  networkget({
    url: `/event/${id}`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getUserInfo(params, success) { //获取用户信息
  const des = '获取用户信息'
  networkget({
    url: '/person',
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function checkHotActiveList(params, success) { //获取热门活动列表
  const des = '获取热门活动列表'
  networkget({
    url: `/events/hot?l=${params.pageSize}&an=${params.startNum}&cc=${params.postCode}`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function publicActivity(params, success) { //发布活动
  const des = '发布活动'
  networkpost({
    url: `/event/create`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getMyWalletBalance(params, success) { //获取我的钱包余额
  const des = '获取我的钱包余额信息'
  networkget({
    url: '/cash/balance',
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getWalletSerails(params, success) { //获取我的钱包消费明细
  const des = '获取我的钱包消费明细'
  networkget({
    url: '/payment/orders?l=' + params.pageSize + '&an=' + params.an,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getEditFields(params, success) { //查询个人可编辑信息
  const des = '查询个人可编辑信息'
  networkget({
    url: '/person/edit',
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function submitEditPersonalInfo(params, success) { //编辑个人信息接口
  const des = '编辑个人信息接口'
  networkpost({
    url: `/person/edit`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function cancelEvent(params, success) { //取消活动
  const des = '取消活动'
  networkpost({
    url: `/event/${params.eventId}/cancel`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getMyPublicedEventInfo(params, success) { //我发布的活动信息
  const des = '我发布的活动信息'
  networkget({
    url: `/event/${params.eventId}/options?from=publish`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function prohibitSignUp(params, success) { //禁止报名
  const des = '禁止报名'
  networkpost({
    url: `/event/${params.eventId}/close_signup`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function allowSignUp(params, success) { //允许报名
  const des = '允许报名'
  networkpost({
    url: `/event/${params.eventId}/reopen_signup`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getQrCode(params, success) { //获取签到二维码
  const des = '获取签到二维码'
  networkget({
    url: `/event/${params.eventId}/qrcode`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function signupOnQrCode(params, success) { //扫描二维码签到
  const des = '扫描二维码签到'
  networkpost({
    url: `/event/${params.signInId}/signin`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getEventInfo(params, success) { //编辑时获取当前活动信息
  const des = '编辑时获取当前活动信息'
  networkget({
    url: `/event/${params.eventId}/edit`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getSignerList(params, success) { //报名名单
  const des = '报名名单'
  networkget({
    url: `/event/${params.eventId}/status_signups?l=${params.pageSize}&an=${params.startNum}&status=${params.status}`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function exportListToEmail(params, success) { //导出名单到邮箱
  const des = '导出名单到邮箱'
  networkpost({
    url: `/event/${params.eventId}/mail_signups`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function rejectSignUp(params, success) { //拒绝免费活动报名
  const des = '拒绝免费活动报名'
  networkpost({
    url: `/event/${params.eventId}/signup/${params.signerId}/review`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function rejectNeedPaySignUp(params, success) { //拒绝收费活动报名
  const des = '拒绝收费活动报名'
  networkpost({
    url: `/refund/rejectappl`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function rejectNeedPaySignUpPay(params, success) { //拒绝收费活动报名后预支付
  const des = '拒绝收费活动报名后预支付'
  networkpost({
    url: `/event/${params.eventId}/weixin/reject`,
    params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}


function joinActivity(params, success) { //活动报名
  const des = '活动报名'
  networkpost({
    url: `/event/${params.eventId}/signup?shareType=0`,
    params: params.conditions,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getPayLeftTime(params, success) { //获取支付剩余时间
  const des = '获取支付剩余时间'
  networkget({
    url: `/event/${params.eventId}/payment_left_time`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getJoinCode(params, success) { //获取报名凭证
  const des = '获取报名凭证'
  networkget({
    url: `/evouchers/${params.eventId}`,
    des
  }).then(function(res) {
    return success(res.data)
  })
}
function likeActivity (params, success) { // 收藏活动
  const des = '收藏活动'
  networkpost({
    url: `/event/${params.eventId}/like`,
    params: {},
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function cancelLiked(params, success) { //取消收藏
  const des = '取消收藏'
  networkpost({
    url: `/event/${params.eventId}/unlike`,
    params: {},
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function cancelJoin(params, success) { //取消报名
  const des = '取消报名'
  networkpost({
    url: `/event/${params.eventId}/remove_signup`,
    params: params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function cancelPayJoin(params, success) { //取消收费报名
  const des = '取消收费报名'
  networkpost({
    url: `/refund/requestdelappl/${params.eventId}`,
    params: params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function feedBack(params, success) { //意见反馈
  const des = '意见反馈'
  networkpost({
    url: `/feedback`,
    params: params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function getPreOrderInfo(params, success) { //支付生成预订单接口
  const des = '支付生成预订单接口'
  networkget({
    url: `/event/pay/weixinxcx/${params.applicantid}`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const getLeftPayTime = (params, success) => { // 获取支付剩余时间
  const des = '获取支付剩余时间'
  networkget({
    url: `/event/${params.eventId}/payment_left_time`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const getHeadPicQiniuCloudToken = (params, success) => { // 获取七牛云token
  const des = '获取上传头像七牛云token'
  networkget({
    url: `/qiniu/avatar_token`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const getQiniuCloudToken = (params, success) => { // 获取七牛云token
  const des = '获取七牛云token'
  networkget({
    url: `/qiniu/photo_token`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const getQrCodeResult = (url, success) => { // 扫描二维码后发起请求
  const des = '扫描二维码后发起请求'
  console.log(des)
  networkget({
    url: url,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const followUser = (params, success) => { // 关注用户
  const des = '关注用户'
  networkget({
    url: `/follow/${params.userUid}`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const unFollowUser = (params, success) => { // 取消关注用户
  const des = '取消关注用户'
  networkget({
    url: `/unfollow/${params.userUid}`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const createActivityLink = (params, success) => { // 生成活动链接
  const des = '生成活动链接'
  networkget({
    url: `/event/${params.eventId}/signup/qrcode`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const checkVidCount = (params, success) => { // 查询实名认证包
  const des = '查询实名认证包'
  networkget({
    url: `/vid/allcounts`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

const payCancelAct = (params, success) => { // 取消活动——余额支付接口
  const des = '取消活动——余额支付接口'
  networkpost({
    url: `/event/${params.eventId}/balance/act_cancel`,
    params: params,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

function payRejectUser(options, success) { //拒绝用户——余额支付接口
  const des = '拒绝用户——余额支付接口'
  networkpost({
    url: `/event/${options.eventId}/balance/reject`,
    params: {
      userId: options.userId
    },
    des
  }).then(function(res) {
    return success(res.data)
  })
}

function payUserAgreeCancel(params, success) { //同意用户取消——余额支付接口
  const des = '同意用户取消——余额支付接口'
  networkpost({
    url: `/event/${params.eventId}/balance/refund`,
    params: params,
    des
  }).then(function(res) {
    return success(res.data)
  })
}

const checkWalletAmount = (params, success) => { // 钱包余额查询接口
  const des = '钱包余额查询接口'
  networkget({
    url: `/cash/balance`,
    des
  }).then(function (res) {
    return success(res.data)
  })
}

module.exports = {
  payCancelAct,
  payRejectUser,
  payUserAgreeCancel,
  checkWalletAmount,
  followUser,
  unFollowUser,
  joinActivity,
  getPayLeftTime,
  getJoinCode,
  rejectSignUp,
  rejectNeedPaySignUp,
  createActivityLink,
  rejectNeedPaySignUpPay,
  exportListToEmail,
  checkVidCount,
  getSignerList,
  getMyPublicedEventInfo,
  getEventInfo,
  likeActivity,
  cancelLiked,
  getQrCode,
  cancelJoin,
  cancelPayJoin,
  feedBack,
  prohibitSignUp,
  allowSignUp,
  getLeftPayTime,
  cancelEvent,
  login,
  bindPhoneNo,
  authUser,
  getMyEnjoined,
  getMyPubliced,
  getMyCollected,
  getActivityDetails,
  getUserInfo,
  checkHotActiveList,
  publicActivity,
  getMyWalletBalance,
  getWalletSerails,
  getEditFields,
  submitEditPersonalInfo,
  getPreOrderInfo,
  getQiniuCloudToken,
  getHeadPicQiniuCloudToken,
  getQrCodeResult,
  signupOnQrCode
}