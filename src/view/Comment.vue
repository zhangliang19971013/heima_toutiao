<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="lists" v-for="comment in commentList" :key="comment.id">
      <div class="item">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{comment.content}}</div>
      </div>
      <!-- 引入封装的评论组件（实现二级评论显示） -->
       <commentItem v-if='comment.parent'  :parent='comment.parent'></commentItem>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/hmheader.vue';
// 引入二级评论封装的组件
import commentItem from '../components/hmcommentItem'
// 引入获取评论列表的api
import { getCommentList } from '../apis/article'
export default {
  components: {
    myheader, commentItem
  },
  data () {
    return {
      commentList: []
    }
  },
  async mounted () {
    let res = await getCommentList(this.$route.params.id, { pageSize: 40, pageIndex: 1 })
    console.log(res)
    this.commentList = res.data.data
    // 补充照片路径
    this.commentList = this.commentList.map(value => {
      value.user.head_img = 'http://127.0.0.1:3000' + value.user.head_img
      return value
    })
  }
};
</script>

<style lang='less' scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>
