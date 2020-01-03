import Vue from 'vue'
import App from './App'

// 引入初始化样式
import '@/styles/reset.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
