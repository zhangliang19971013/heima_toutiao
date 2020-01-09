<template>
  <div class="articaldetail">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span :class="{active:article.has_follow}" @click="followThisUser">{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <!-- 文章部分 -->
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.user.nickname}}</span> &nbsp;&nbsp;
        <span>{{article.create_date | filters}}</span>
      </div>
      <div class="content" v-html="article.content" v-if="article.type===1"></div>
      <!-- controls:是否显示控制面板，默认不显示
      src:路径
      controls:是否显示控制面板
      autoplay:自动播放，在chrome是有问题，不会响应
      loop:是否循环播放
      poster:首帧画面-->
      <video :src="article.content" v-if="article.type===2" controls></video>
      <div class="opt">
        <span class="like" :class="{active:article.has_like}" @click="likeThisArticle">
          <van-icon name="good-job-o" />
          {{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <!-- <img :src="article.cover[0].url" alt /> -->
          <div>
            <!-- <p>{{article.categories[0].name}}</p> -->
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部评论块 -->
    <hmCommentFooter :post='article'></hmCommentFooter>
  </div>
</template>

<script>
// 引入获取文章详情的api
import { getArticleById } from '../apis/article';
// 引入封装的过滤器
import { filters } from '../utils/myfilters';
// 引入关注的api
import { followUser } from '@/apis/user'
// 引入取消关注的api
import { unfollowUser } from '../apis/user'
// 引入点赞的api
import { likeArticle } from '@/apis/article'
// 引入评论块
import hmCommentFooter from '@/components/hmCommentFooter'
export default {
  components: {
    hmCommentFooter
  },
  data() {
    return {
      article: {
        user: {}
      }
    };
  },
  async mounted() {
    //   拿到新闻详细数据
    let res = await getArticleById(this.$route.params.id);
    // console.log(res)
    this.article = res.data.data;
    console.log(this.article);
  },
  //   过滤器
  filters: {
    filters
  },
  methods: {
    //  用户关注
    async followThisUser() {
      let res
      if (this.article.has_follow) {
        res = await unfollowUser(this.article.id)
      } else {
        res = await followUser(this.article.id);
      }
      this.article.has_follow = !this.article.has_follow
      this.$toast.success(res.data.message)
    },
    // 点赞文章
    async likeThisArticle() {
      let res = await likeArticle(this.article.id)
      console.log(res)
      if (res.data.message === '点赞成功') {
        ++this.article.like_length;
      } else {
        --this.article.like_length
      }
      this.article.has_like = !this.article.has_like;
      this.$toast.success(res.data.message)
    }
  }
};
</script>

<style lang="less" scoped >
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      color: #fff;
      background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/.photo {
      img {
        width: 100%;
        display: block;
      }
    }
  }
  video {
    width: 100%;
  }
}
.opt {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .like {
    &.active {
      color: red;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
// .keeps {
//   border-top: 5px solid #ddd;
//   padding: 0 15px 50px;
//   > h2 {
//     line-height: 50px;
//     text-align: center;
//   }
// }
</style>
