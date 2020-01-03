// 封装 axios 的 api
// 引入配置好的基准路径
import axios from '@/utils/myaxios'

// 登录功能
export const login = (data) => {
  return axios({
    mathed: 'post',
    url: '/login',
    data
  })
}
