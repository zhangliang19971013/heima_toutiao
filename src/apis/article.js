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

// 2,通过文章id,获取文章详情
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 3,点赞的api
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 4,文章收藏与取消收藏
export const starArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
