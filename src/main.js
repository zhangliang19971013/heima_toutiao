import Vue from 'vue'
import App from './App'

// 引入初始化样式
import '@/styles/reset.css'

// 引入路由
import router from '@/router/index'

// 全局引入Vant框架(做轻微提示框) 按需引入
import { Button, Toast, Uploader, Dialog, Field } from 'vant'
// Toast轻提示可以实现我们的需求(做轻微提示框)

Vue.use(Uploader)// 文件上传
  .use(Button)
  .use(Toast)// 轻提示框 链式编程
  .use(Dialog) // 提出框（用于编辑信息）
  .use(Field) // 输入框，可与提示框嵌套使用
Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
