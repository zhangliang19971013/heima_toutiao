import Vue from 'vue'

import VueRouter from 'vue-router'

// 引入登录页面
import Login from '@/view/login'

Vue.use(VueRouter)

// 路由对象配置
let router = new VueRouter({
  routes: [
    //   登录页面
    {
      name: 'Login',
      path: '/login',
      component: Login
    }
  ]
})

// 暴露路由
export default router
