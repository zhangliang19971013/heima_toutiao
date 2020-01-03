import Vue from 'vue'
import App from './App'

// 引入初始化样式
import '@/styles/reset.css'

// 引入路由
import router from '@/router/index'

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
