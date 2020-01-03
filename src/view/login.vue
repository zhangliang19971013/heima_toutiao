<template>
  <div class="login">

<hmbutton @click='handerclick'>登录</hmbutton>

  </div>
</template>

<script>
// 引入按钮
import hmbutton from '@/components/hmbutton'
export default {
  // 注册
  components: {
    hmbutton
  },
  methods: {
    handerclick() {
      console.log(111222333)
    }
  }
}
</script>

<style>

</style>
