import {baseUrl} from '../config'

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


module.exports = {
  upLoadImg
}