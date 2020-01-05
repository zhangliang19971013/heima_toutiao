<template>
  <div class="header">
    <div>
        <slot name="left"></slot>
    </div>
     <div>{{title}}</div>
     <div>
        <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    &:nth-child(1){
      padding-left: 10px;
    }
    div:nth-child(2){
        font-weight: 700;
        margin-left: -20px;
    }
}
</style>
