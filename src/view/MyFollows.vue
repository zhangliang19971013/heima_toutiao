<template>
  <div class="myfollow">
      <hmheader title="我的关注">
     <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </hmheader>
      <div class="list">
          <div class="box" v-for='(item,index) in followList' :key='item.id'>
              <img :src="item.head_img" alt="">
              <div class="center">
                  <p>{{item.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click="unfollow(item.id,index)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
// 引入封装的头部
import hmheader from '../components/hmheader'
// 引入关注列表和取消关注的api
import { getUserFollows, unfollowUser } from '../apis/user'
export default {
  components: {
    hmheader
  },
  data () {
    return {
      followList: []
    }
  },
  async  mounted () {
    let res = await getUserFollows();
    this.followList = res.data.data;
    this.followList = this.followList.map(value => {
      value.head_img = 'http://127.1.1.0:3000' + value.head_img;
      return value
    })
  },
  methods: {
    async unfollow(id, index) {
      let res = await unfollowUser(id)
      //   console.log(res)
      if (res.data.message === '取消关注成功') {
        this.$toast.success(res.data.message);
        this.followList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
