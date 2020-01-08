<template>
  <!-- 加载图片 左右格式的 -->
  <div class="single" v-if="post.type === 1 && post.cover.length <=2" @click='handclick'>
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <!-- 加载视频数据 -->
  <div class="singlev" v-else-if="post.type===2" @click='handclick'>
    <p class="content">{{post.title}}</p>
    <div class="playarea">
      <img :src="post.cover[0].url" alt />
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
  <!-- 加载三张图片的格式 -->
  <div class="singlet" v-else-if="post.type === 1 && post.cover.length >=3" @click='handclick'>
    <p class="content">{{post.title}}</p>
    <div class="imgs">
      <!-- <img :src="post.cover[0].url" alt /> -->
      <img :src="item.url" v-for="item in post.cover" :key="item.id" alt />
      <!-- <img :src="item.url" alt v-for='item in post.cover' :key='item.id'/> -->
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    // 增加新闻模块的点击事件（子传父亲）
    handclick(event) {
      this.$emit('click', event)
    }
  }
};
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
.singlev {
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  .playarea {
    position: relative;
    .playicon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60/360 * 100vw;
      height: 60/360 * 100vw;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 15px #fff;
      color: #fff;
      text-align: center;
      line-height: 65/360 * 100vw;
      font-size: 45px;
    }
    > img {
      width: 100%;
      margin:  15px ,0;
    }
    .content {
      font-size : 15px;
     line-height: 18px;
    }
  }
}
.info {
    font-size: 12px;
    padding-left: 5px;
    padding-top : 6px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
.singlet{
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  > .imgs {
    display: flex;
    justify-content: space-around;
    > img {
      width: 32.33%;
    }
  }
  .content {
    font-size : 16px;
    padding-bottom: 8px;
  }
}
</style>
