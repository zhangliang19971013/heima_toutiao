// 文章相关的api
// 引入封装的axios
import axios from '../utils/myaxios'

// 1,获取文章信息列表
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
