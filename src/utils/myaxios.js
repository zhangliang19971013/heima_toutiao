// 封装的axios
// 引入axios
import axios from 'axios'
// 设置url路径的基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// 增加请求拦截器，所有请求都会经过
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // 获取token
//   let token = localStorage.getItem('toutiao_41_token')
//   // 判断是否有token如果有，则以请求头的方式进行传递
//   if (token) {
//     config.headers.Authorization = token
//   }
//   // 可以拦截请求对报文进行处理，但是拦截器并不会代替你来发请求，只是对发送请求时所传递的报文 数据进行必要的处理
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('toutiao_41_token');
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 增加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.data.message === '用户信息验证失败' || response.data.message === '用户信息验证失败!') {
    // this.$router.push({name:'Login'})
    window.location.href = '#/login'
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
// 暴露axios
export default axios
