import axios from '../utils/myaxios'

// 1，实现文件上传
export const uploadFile = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
