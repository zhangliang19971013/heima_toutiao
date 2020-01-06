<template>
  <div class="edit">
    <!-- 顶部 -->
    <!--  @click="$router.back() 可以返回上一个页面 -->
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <!-- 中心图片 -->
    <div class="userimg">
      <img :src="userDate.head_img" alt />
      <!-- 文件上传引用 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 下面修改详细信息部分 -->
    <hmcell title="昵称" :desc="userDate.nickname" @click="nickShow=!nickShow"></hmcell>
    <van-dialog v-model="nickShow" title="标题" show-cancel-button @confirm="updateNickname">
      <van-field ref="nick" :value='userDate.nickname' placeholder="请输入昵称" required label="昵称" />
    </van-dialog>

    <hmcell title="密码" :desc="userDate.password" type="password"></hmcell>
    <hmcell title="性别" :desc="userDate.gender === 0 ? '女' : '男'"></hmcell>
  </div>
</template>

<script>
// 引入页面的头部
import hmheader from '../components/hmheader';
// 引入封装的栏框
import hmcell from '../components/hmcell';
// 引入获取用户详情的方法
import { getUserById } from '../apis/user';
// 引入上传文件的方法
import { uploadFile } from '@/apis/upload';
// 引入更新信息的api
import { updateUserById } from '@/apis/user';
export default {
  components: {
    hmheader,
    hmcell
  },
  data() {
    return {
      userDate: {},
      nickShow: false
    };
  },
  //   个人信息动态渲染
  async mounted() {
    let res = await getUserById(this.$route.params.id);
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.userDate = res.data.data;
      if (this.userDate.head_img) {
        this.userDate.head_img =
          'http://127.0.1.1:3000' + this.userDate.head_img;
      } else {
        //   如果没有图片就默认图片
        this.currentUser.head_img =
          'http://127.0.0.1:3000/uploads/images/default.png';
      }
    }
  },
  methods: {
    //   实现图片文件上传
    async afterRead(file) {
      let formdata = new FormData();
      formdata.append('file', file.file);
      let res = await uploadFile(formdata);
      //   console.log(res)
      if (res.data.message === '文件上传成功') {
        //  实现预览
        this.userDate.head_img = 'http://127.0.1.1:3000' + res.data.data.url;
        let res2 = await updateUserById(this.userDate.id, {
          head_img: res.data.data.url
        });
        // console.log(res2)
        if (res2.data.message === '修改成功') {
          this.$toast.success('文件修改成功');
        } else {
          this.$toast.fail('文件修改失败');
        }
      } else {
        this.$toast.fail('文件上传失败');
      }
    },
    // 修改用户名称
    async updateNickname() {
      // 拿到新输入的值
      let name = this.$refs.nick.$refs.input.value;
      // console.log(name)
      // 拿到服务器的值
      let res = await updateUserById(this.userDate.id, { nickname: name })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.userDate.nickname = name
        this.$toast.success('修改成功')
      } else {
        this.$toast.fail('修改失败')
      }
    }
  }
};
</script>

<style lang='less' scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__upload {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
