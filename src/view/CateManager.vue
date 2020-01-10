<template>
   <div class="cate">
    <hmheader title="频道管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
    <div class="mycate">
      <p>点击删除频道</p>
      <span @click='removeCate(index)' v-for="(value,index) in cateList" :key="value.id">{{value.name}}</span>
    </div>
    <div class="mycate">
      <p>点击增加频道</p>
      <span @click='addCate(index)' v-for="(value,index) in uncateList" :key="value.id">{{value.name}}</span>
    </div>
  </div>
</template>

<script>
import hmheader from '../components/hmheader';
// 引入获取导航栏的api
import { getCateList } from '../apis/cate'
export default {
  components: {
    hmheader
  },
  data () {
    return {
      cateList: [],
      uncateList: []
    }
  },
  //   获取数据
  async mounted () {
    //   拿上面的数据
    if (localStorage.getItem('toutiao_41_cate_data')) {
      this.cateList = JSON.parse(localStorage.getItem('toutiao_41_cate_data'))
    } else {
      let res = await getCateList();
      this.cateList = res.data.data
      if (localStorage.getItem('toutiao_41_token')) {
        this.cateList = this.cateList.splice(2)
      } else {
        this.cateList = this.cateList.splice(1)
      }
    }
    console.log(this.cateList)
    // 拿下面的数据
    if (localStorage.getItem('toutiao_41_uncate_data')) {
      this.uncateList = JSON.parse(localStorage.getItem('toutiao_41_uncate_data'))
    }
  },
  methods: {
    //   点击删除栏目
    removeCate(index) {
      // 先添加在删除
      this.uncateList.unshift(this.cateList[index])
      // 点击删除
      this.cateList.splice(index, 1)
      //   数组存到本地存储
      localStorage.setItem('toutiao_41_cate_data', JSON.stringify(this.cateList));
      localStorage.setItem('toutiao_41_uncate_data', JSON.stringify(this.uncateList))
    },
    // 点击增加栏目
    addCate(index) {
      this.cateList.unshift(this.uncateList[index])
      this.uncateList.splice(index, 1)
      localStorage.setItem('toutiao_41_cate_data', JSON.stringify(this.cateList));
      localStorage.setItem('toutiao_41_uncate_data', JSON.stringify(this.uncateList))
    }
  }
};
</script>

<style lang='less' scoped>
.mycate {
  padding: 15px;
  clear: both;
  > p {
    font-size: 16px;
    color: #888;
    line-height: 30px;
  }
  > span {
    float: left;
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-left: 12px;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>
