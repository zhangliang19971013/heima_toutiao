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

// 5,文章收藏列表
export const starList = () => {
  return axios({
    url: '/user_star'
  })
}

// 6,获取文章评论列表
export const getCommentList = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}

// 7,发表评论
export const replyComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
