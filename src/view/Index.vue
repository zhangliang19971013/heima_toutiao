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

  </div>
</template>

<script>
export default {
  data () {
    return {
      id: ''
    }
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
