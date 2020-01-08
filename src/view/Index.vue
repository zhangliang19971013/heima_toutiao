<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name :'Search'})">
        <van-icon name="search" />搜索商品
      </div>
      <div class="uesr" @click="$router.push({path : `/personal/${id}`})">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- Tab标签栏 -->
    <!-- 通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
    <van-tabs v-model="active" sticky swipeable>
      <!-- 单击标签项及内容面板 -->
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
         <hmarticleBlock v-for="item in cate.postList" :key="item.id" :post="item"></hmarticleBlock>
      </van-tab>

    </van-tabs>
    <!-- 新闻列表 -->
    <div class="newsList"></div>
  </div>
</template>

<script>
// 引入获取栏目列表的api
import { getCateList } from '../apis/cate.js';
// 引入文章信息列表的api
import { getPostList } from '../apis/article';
// 引入封装的文章信息页面
import hmarticleBlock from '../components/hmarticleBlock';
export default {
  data() {
    return {
      id: '',
      // 对应的默认展示框，展示头条页，登录索引为1，没登录索引为0
      active: localStorage.getItem('toutiao_41_token') ? 1 : 0,
      cateList: []
    };
  },
  components: {
    hmarticleBlock
  },
  watch: {
    active() {
      // console.log(this.active);
      // 重新发起请求，获取当前栏目的新闻数据
      // 注意：如果之前已经加载好数据了，那么就不用再重复的加载
      if (this.cateList[this.active].postList.length === 0) {
        this.init();
      }
    }
  },
  //  引入调用
  async mounted() {
    this.id = JSON.parse(
      localStorage.getItem('toutiao_41_userInfo') || '{}'
    ).id;
    let res = await getCateList();
    // console.log(res)
    this.cateList = res.data.data;
    // console.log(this.cateList)
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        postList: [], // 这个栏目的新闻列表数据
        pageSize: 10, // 这个栏目每页所显示的记录数
        pageIndex: 1 // 这个栏目 当前的页码
      };
    });
    // map 向数组中的对象添加新的属性 生成一个新的数组
    console.log(this.cateList)
    // 获取数据库数据成功
    this.init();
  },
  methods: {
    async init() {
      let res2 = await getPostList({
        // 传参
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: this.cateList[this.active].id
      });
      // console.log(res2)
      // 将数据存储到当前栏目的postList中
      this.cateList[this.active].postList = res2.data.data;
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: red;
  font-size: 25px;
  color: #fff;
  .search {
    flex: 1;
    height: 40px;
    font-size: 15px;
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.6);
  }
  i {
    padding: 0 10px;
  }
  .logo {
    padding: 0, 10px;
    .iconnew {
      font-size: 60px;
    }
  }
}
</style>
