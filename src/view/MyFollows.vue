<template>
  <div class="myfollow">
      <hmheader title="我的关注">
     <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </hmheader>
  </div>
</template>

<script>
// 引入封装的头部
import hmheader from '../components/hmheader'
export default {
  components: {
    hmheader
  }
}
</script>

<style>

</style>
