<template>
  <div class="commentFooter">
    <!-- 底部评论框显示 -->
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder="写跟帖"  @focus="handlerFocus"/>
      <span class="comment" @click="$router.push({path: `/comment/${post.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click='starThisArticle' :class="{active:post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <!-- 文本域结构显示 -->
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" @blur='isFocus = false'></textarea>
        <div>
            <span @click='sendComment'>发送</span>
            <span @click='handlerFocus'>取消</span>
        </div>
    </div>
  </div>
</template>

<script>
// 引入文章收藏的api
import { starArticle } from '@/apis/article.js'
// 引入发表评论的api
import { replyComment } from '../apis/article'
export default {
  props: ['post'],
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      this.$refs.commtext.focus()
    },
    async starThisArticle() {
      let res = await starArticle(this.post.id)
      //   console.log(res)
      this.post.has_star = !this.post.has_star
      this.$toast.success(res.data.message)
    },
    // 发布评论
    async sendComment() {
      let data = {
        content: this.$refs.commtext.value
      }
      let res = await replyComment(this.post.id, data)
      console.log(res)
      if (res.data.message === '评论发布成功') {
        this.$toast.success(res.data.message)
        // 让输入框消失
        this.isFocus = false;
        this.$refs.commtext.value = ''
        // 让评论列表数据刷新--让父组件进行数据的刷新
        this.$emit('refresh')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.commentFooter{
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.active{
    color: red;
}
</style>
