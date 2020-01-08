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

// 3，更新个人信息
export const updateUserById = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 4,实现用户注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 5，关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 6,取消关注用户
export const unfollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
