import Vue from 'vue'
import App from './App'

// 引入初始化样式
import '@/styles/reset.css'

// 引入路由
import router from '@/router/index'

// 全局引入Vant框架按需引入
import { Button, Toast, Uploader, Dialog, Field, Picker, Icon, Tab, Tabs, List, PullRefresh, SwipeCell, Search } from 'vant'
// Toast轻提示可以实现我们的需求(做轻微提示框)

Vue.use(Uploader)// 文件上传
  .use(Button)
  .use(Toast)// 轻提示框 链式编程
  .use(Dialog) // 提出框（用于编辑信息）
  .use(Field) // 输入框，可与提示框嵌套使用
  .use(Picker) // 实现滑动选择功能
  .use(Icon) // 使用字体图标
  .use(Tab)
  .use(Tabs) // 用来实现滑动标签tab栏
  .use(List) // 实现上拉加载功能
  .use(PullRefresh) // 实现下拉刷新功能
  .use(SwipeCell)// 滑动单元格 实现删除文章功能
  .use(Search) // 实现文章搜索功能
Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
