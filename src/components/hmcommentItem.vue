<template>
<!-- 封装的评论组件 -->
<!-- 实现二级评论渲染 -->
  <div class="commentItem">
      <!-- 组件递归 -->
      <!-- 添加组件内的回复功能 -->
      <commentItem v-if='parent.parent' :parent='parent.parent' @replyComment='sendscomment' ></commentItem>
      <div class="top">
          <div class="left">
              <span>{{parent.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
              <span>2分钟前</span>
          </div>
          <span @click="sendscomment(parent)">回复</span>
      </div>
      <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
  props: ['parent'],
  name: 'commentItem',
  methods: {
    //   嵌套的回复评论功能
    sendscomment(data) {
    //   console.log(data)
      this.$emit('replyComment', data)
    }
  }
}
</script>

<style lang='less' scoped>
html,body {
  height: 100%;
  margin: 0;
}
    .commentItem{
        border: 1px solid #ccc;
        padding: 5px;
        margin-top: 10px;
        .top{
            font-size: 12px;
            color: #aaa;
            display: flex;
            justify-content: space-between;
        }
        .bottom{
            font-size: 13px;
            line-height: 40px;
        }
    }
</style>
