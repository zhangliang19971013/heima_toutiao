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
          <span @click='sendComment(comment)'>回复</span>
        </div>
            <!-- 引入封装的评论组件（实现二级评论显示） -->
       <commentItem v-if='comment.parent'  :parent='comment.parent'></commentItem>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <CommentFooter :post='article' @refresh='refresh' :obj='replyObj' @reset='replyObj=null'></CommentFooter>
  </div>
</template>

<script>
import myheader from '@/components/hmheader.vue';
// 引入二级评论封装的组件
import commentItem from '../components/hmcommentItem'
// 引入获取评论列表的api
import CommentFooter from '../components/hmCommentFooter'
import { getCommentList, getArticleById } from '../apis/article'
export default {
  components: {
    myheader, commentItem, CommentFooter
  },
  data () {
    return {
      commentList: [],
      article: '',
      replyObj: null
    }
  },
  async mounted () {
    // 获取评论数据
    this.init();

    // 获取文章详情
    let res2 = await getArticleById(this.$route.params.id)
    // console.log(res2)
    this.article = res2.data.data
  },
  methods: {
    async init() {
      let res = await getCommentList(this.$route.params.id, { pageSize: 40, pageIndex: 1 })
      console.log(res)
      this.commentList = res.data.data.length ? res.data.data : this.commentList
      // 补充照片路径
      this.commentList = this.commentList.map(value => {
        value.user.head_img = 'http://127.0.0.1:3000' + value.user.head_img
        return value
      })
    },
    // 发表评论（实现数据刷新功能，和列表的置顶）
    refresh() {
      this.init();
      // 数据重新加载后，会自动跳到顶部
      window.scrollTo(0, 0)
    },
    sendComment(comment) {
      this.replyObj = comment;
    }
  }
};
</script>

<style lang='less' scoped>
.comments {
  padding-bottom: 50px;
}
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
