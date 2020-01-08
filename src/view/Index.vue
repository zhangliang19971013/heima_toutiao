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
        <!-- 上拉加载组件 -->
        <van-list
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="10"
        >
          <!-- 下拉刷新组件 -->
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <hmarticleBlock v-for="item in cate.postList" :key="item.id" :post="item"></hmarticleBlock>
          </van-pull-refresh>
        </van-list>
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
        pageSize: 5, // 这个栏目每页所显示的记录数
        pageIndex: 1, // 这个栏目 当前的页码
        loading: false, // 这个栏目的加载状态
        finished: false, // 这个栏目的数据是否完全加载完毕（加载完毕显示没有数据了的提示）
        isLoading: false // 下拉刷新，是否处在刷新状态
      };
    });
    // map 向数组中的对象添加新的属性 生成一个新的数组
    console.log(this.cateList);
    // 获取数据库数据成功
    this.init();
  },
  methods: {
    //  下拉刷新功能
    onRefresh() {
      this.cateList[this.active].pageIndex = 1;
      this.cateList[this.active].postList.length = 0;
      setTimeout(() => {
        this.init();
      }, 1000)
      // 将finished重置为false,以便可以继续的上拉加载
      this.cateList[this.active].finished = false;
    },
    // 上拉加载功能
    onLoad() {
      // 当当前新闻列表没有在刷新的状态时，可以上拉加载
      if (this.cateList[this.active].isLoading === false) {
        this.cateList[this.active].pageIndex++;
        setTimeout(() => {
          this.init();
        }, 1000);
      }
    },
    async init() {
      let res2 = await getPostList({
        // 传参
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: this.cateList[this.active].id
      });
      // 下拉刷新
      if (this.cateList[this.active].isLoading) {
        this.cateList[this.active].isLoading = false
      }
      //  响应完更改为false(上拉加载)
      if (this.cateList[this.active].loading) {
        this.cateList[this.active].loading = false;
      }
      // 如果服务器当也数据长度小于显示的页数，则不再加载数据
      if (res2.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
      // console.log(res2)
      // 将数据存储到当前栏目的postList中
      // this.cateList[this.active].postList = res2.data.data;
      // 将拿到的数据存到postList中
      this.cateList[this.active].postList.push(...res2.data.data);
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
