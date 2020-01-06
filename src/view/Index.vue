<template>
  <div class="index">
    <!-- 头部 -->
   <div class="header">
     <div class="logo"><span class="iconfont iconnew"></span></div>
     <div class="search" @click='$router.push({name :"Search"})'>
       <van-icon name="search" />
       搜索商品
     </div>
     <div class="uesr" @click='$router.push({path : `/personal/${id}`})'>
       <van-icon name="manager-o" />
     </div>
   </div>
   <!-- Tab标签栏 -->
   <!-- 通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
<van-tabs v-model="active" sticky swipeable>
    <!-- 单击标签项及内容面板 -->
    <van-tab :title="value.name" v-for='value in cateList' :key='value.id'></van-tab>

</van-tabs>

  </div>
</template>

<script>
// 引入获取栏目列表的api
import { getCateList } from '../apis/cate.js'
export default {
  data () {
    return {
      id: '',
      // 对应的默认展示框，展示头条页，登录索引为1，没登录索引为0
      active: localStorage.getItem('toutiao_41_token') ? 1 : 0,
      cateList: []
    }
  },
  //  引入调用
  async mounted () {
    this.id = JSON.parse(localStorage.getItem('toutiao_41_userInfo') || '{}').id;
    let res = await getCateList()
    // console.log(res)
    this.cateList = res.data.data
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: red;
  font-size : 25px;
  color : #fff;
  .search{
    flex : 1;
    height: 40px;
    font-size: 15px;
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
    background-color: rgba(255,255,255,.6);
  }
  i {
    padding: 0 10px;
  }
  .logo {
    padding: 0 ,10px;
      .iconnew {
      font-size: 60px;
       }
    }
  }

</style>
