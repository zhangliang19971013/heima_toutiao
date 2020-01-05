<template>
  <div class="edit">
      <!-- 顶部 -->
      <!--  @click="$router.back() 可以返回上一个页面 -->
<hmheader title="编辑个人信息">
 <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
</hmheader>
<div class="imgSrc">

</div>

  </div>
</template>

<script>
// 引入页面的头部
import hmheader from '../components/hmheader'
export default {
  components: {
    hmheader
  }
}
</script>

<style>

</style>
