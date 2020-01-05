<template>
  <div class="btn" @click='handclick' >
<!-- 字体图标的运用 -->
<span :class="icon"></span>
<!-- 匿名插槽的使用 -->
<slot></slot>
  </div>
</template>

<script>
export default {
  // 父传子
  props: ['icon'],
  //   子传父
  methods: {
    handclick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
// 按钮样式
  .btn {
     width: 318*100vw/360;
      height: 50px;
      color: #fff;
      font-size: 20px;
       font-weight: 700;
      text-align: center;
      line-height: 50px;
      border-radius: 25px;
      background-color: green;
      margin: 0 auto;
  }
</style>
