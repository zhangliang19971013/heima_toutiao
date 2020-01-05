// 封装 axios 的 api
// 引入配置好的基准路径
import axios from '@/utils/myaxios'

// 登录功能的api
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
