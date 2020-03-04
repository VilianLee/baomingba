
import qiniuUploader from './qiniuUploader'
import {
  getQiniuCloudToken
} from '../API/servers'
import store from '../store'

const uploadFile = (path, success) => {
  getQiniuCloudToken({}, resp => {
    store.data.uptoken = resp.uptoken
    store.update()
    qiniuUploader.upload(path, (img) => {
      success(img)
    }, (error) => {
      console.log('error: ' + error);
    }, {
      region: 'ECN',
      key: 'xcx/' + (new Date()).getTime(),
      //domain: 'http://upload.bmbee.cn/', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
      // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
      uptoken: store.data.uptoken
    }, (res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    }, () => {
      // 取消上传
    }, () => {
      // `before` 上传前执行的操作
    }, (err) => {
      // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
    })
  })
}


module.exports = {
  uploadFile
}