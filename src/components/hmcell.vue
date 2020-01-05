<template>
  <div class="cell">
      <!-- 左边内容 -->
<div class="left">{{title}}</div>
<!-- 右边内容 -->
<div class="right">{{desc}} <span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc']
}
</script>

<style lang='less' scoped>
.cell{
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    > .right{
        font-size: 13px;
        color: #888;
    }
}
</style>
