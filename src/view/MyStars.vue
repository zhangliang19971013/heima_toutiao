<template>
  <div class="stars">
    <hmheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>

    <van-swipe-cell v-for="item in startsList" :key="item.id">
      <hmarticleBlock :post="item" @click="$router.push({path:`/articleDetail/${item.id}`})"></hmarticleBlock>
      <template slot="right">
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
// 引入顶部栏组件
import hmheader from '../components/hmheader';
// 引入文章格式组件
import hmarticleBlock from '../components/hmarticleBlock';
// 引入文章列表的api
import { starList } from '../apis/article.js';
export default {
  components: {
    hmheader,
    hmarticleBlock
  },
  data() {
    return {
      startsList: []
    };
  },
  async mounted() {
    let res = await starList();
    // console.log(res)
    this.startsList = res.data.data;
  }
};
</script>

<style>
</style>
