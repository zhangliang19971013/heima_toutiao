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
        <hminput placeholder="请输入手机号/用户名"
         msg='输入的用户名不存在'
        :rules='/^(\d{5,6})$|^(1\d{10})$/'
         @input='handerinput'
         :value='user.username'
        ></hminput>
        <!-- 文本框 -->
        <hminput placeholder="密码"
         v-model='user.password'
         :rules='/^\d{3}/'
          ></hminput>
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
// 引入登录api的方法
import { login } from '@/apis/user'
export default {
  // 注册
  components: {
    hmbutton, hminput
  },
  data () {
    return {
      user: {
        username: '10086',
        password: '123'
      }
    }
  },
  methods: {
    // asyne 用来标记当前方法中有异步操作
    async handerclick() {
      // 封装的按钮将传过来（子传父）
      // 点击登录实现验证（根据token是否跳转到个人页面）
      if (/^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) && /^\S{3,16}$/.test(this.user.password)) {
        // await：
        // 1.可以获取当前操作的返回结果
        // 2.await可以让后续的操作等待，只是执行完当前使用await标记的方法之后才会执行后续的操作
        let res = await login(this.user)
        // console.log(res)
        if (res.data.message === '用户不存在') {
          // 给出用户提示
          this.$toast.fail(res.data.message)
        } else {
          // 将当前接收到的token实现本地存储
          localStorage.setItem('toutiao_41_token', res.data.data.token)
          // 为了后期的操作，将当前用户数据也存储到本地
          localStorage.setItem('toutiao_41_userInfo', JSON.stringify(res.data.data.user))
          // 实现页面的跳转(个人登录页)
          this.$router.push({ path: `/personal/${res.data.data.user.id}` })
        }
      } else {
        this.$toast.fail('用户数据输入不合法')
      }
    },
    handerinput(data) {
      // 封装的文本框将值传过来（子传父）
      this.user.username = data
    //   console.log(this.user.username)
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
