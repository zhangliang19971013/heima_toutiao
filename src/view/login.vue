<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- 封装的文本框 -->
        <!-- 用户名框 -->
        <hminput placeholder="请输入手机号/用户名"></hminput>
        <!-- 文本框 -->
        <hminput placeholder="密码"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <!-- 封装的按钮 -->
      <hmbutton @click="handerclick">登录</hmbutton>
    </div>
  </div>
</template>

<script>
// 引入按钮
import hmbutton from '@/components/hmbutton';
// 引入封装的文本框
import hminput from '@/components/hminput.vue'
export default {
  // 注册
  components: {
    hmbutton, hminput
  },
  methods: {
    handerclick() {
      console.log(111222333);
    }
  }
};
</script>

<style lang="less" scoped>
// 登录页面的样式
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
 a {
    color: #3385ff;
  }
}
</style>
