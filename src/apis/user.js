// 封装 axios 的 api
// 引入配置好的基准路径
import axios from '@/utils/myaxios'

// 1,登录功能的api (data为参数)
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 2,通过id获取用户信息（id为参数）
export const getUserById = (id) => {
  return axios({
    method: 'get',
    url: `user/${id}`
  })
}
