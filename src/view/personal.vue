<template>
  <div class="personal">
    <router-link :to="{path:`/editPersonal/${userDate.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="userDate.head_img" alt="" />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienv"></span>{{userDate.nickname}}
          </div>
          <div class="time">{{userDate.create_date | filters}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
     <hmcell title='我的关注' desc='关注的用户'></hmcell>
    <hmcell title='我的跟帖' desc='跟帖/回复'></hmcell>
    <hmcell title='我的收藏' desc='文章/视频'></hmcell>
    <hmcell title='设置'></hmcell>
    <hmbutton class="btn" @click='exit' >退出</hmbutton>
  </div>
</template>

<script>
// 引入封装的栏框
import hmcell from '../components/hmcell'
// 引入封装的按钮
import hmbutton from '../components/hmbutton'
// 引入获取用户详情的api
import { getUserById } from '@/apis/user'
// 引入封装的过滤器
import { filters } from '../utils/myfilters'
export default {
  components: {
    hmcell, hmbutton
  },
  data () {
    return {
      // 设置一个当前用户登录对象
      userDate: {

      }
    }
  },
  async mounted() {
    let id = this.$route.params.id;
    // 拿到路由id
    // console.log(id)
    let res = await getUserById(id)
    if (res.data.message === '获取成功') {
      this.userDate = res.data.data
      this.userDate.head_img = 'http://127.0.0.1:3000' + this.userDate.head_img;
      console.log(this.userDate)
    }
  },
  methods: {
    exit() {
      localStorage.removeItem('toutiao_41_token');
      this.$router.push({ name: 'Index' })
    }
  },
  filters: {
    filters
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: pink;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}

.btn {
  margin: 20px auto;
  background: red;
}
</style>
