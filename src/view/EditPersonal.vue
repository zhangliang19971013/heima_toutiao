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
      <van-field ref="nick" :value="userDate.nickname" placeholder="请输入昵称" required label="昵称" />
    </van-dialog>
    <!-- 密码编辑功能 -->
    <hmcell title="密码" :desc="userDate.password" type="password" @click="passShow=!passShow"></hmcell>
    <van-dialog
      v-model="passShow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :before-close="beforeClose"
    >
      <van-field ref="oldPass" placeholder="请输入原密码" required label="原密码" />
      <van-field ref="newPass" placeholder="请输入新密码" required label="新密码" />
    </van-dialog>
    <!-- 性别编辑功能 -->
    <hmcell title="性别" :desc="userDate.gender === 0 ? '女' : '男'" @click="genderShow=!genderShow"></hmcell>
    <!-- Vant弹出框 -->
    <van-dialog v-model="genderShow" title="修改性别" show-cancel-button @confirm="updateGender">
      <!-- 滑动选择栏 -->
      <van-picker :columns="['女','男']" :default-index="userDate.gender"  @change="onChange" />
    </van-dialog>
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
      nickShow: false,
      passShow: false,
      genderShow: false
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
      let res = await updateUserById(this.userDate.id, { nickname: name });
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.userDate.nickname = name;
        this.$toast.success('修改成功');
      } else {
        this.$toast.fail('修改失败');
      }
    },
    // 修改密码
    async updatePassword() {
      let oldPass = this.$refs.oldPass.$refs.input.value;
      // console.log(oldPass)
      if (this.userDate.password === oldPass) {
        let newPass = this.$refs.newPass.$refs.input.value;
        if (/^\S{3,16}$/.test(newPass)) {
          let res = await updateUserById(this.userDate.id, {
            password: newPass
          });
          // console.log(res)
          if (res.data.message === '修改成功') {
            this.userDate.password = newPass;
            this.$toast.success('密码修改成功');
          } else {
            this.$toast.fail('密码修改失败');
          }
        }
      }
    },
    // 修改密码的用户体验
    //  beforeClose 弹出框打开关闭的函数
    beforeClose(action, done) {
      // 点击为确定 判断 密码的对错
      if (action === 'confirm') {
        let oldPass = this.$refs.oldPass.$refs.input.value;
        let newPass = this.$refs.newPass.$refs.input.value;
        // console.log(oldPass)
        // console.log(newPass)
        // 判断原密码是否正确
        if (oldPass !== this.userDate.password) {
          this.$toast.fail('原密码输入不正确');
          this.$refs.oldPass.$refs.input.select();
          this.$refs.oldPass.$refs.input.focus();
          done(false);
        } else if (!/^\S{3,16}$/.test(newPass)) {
          this.$toast.fail('新密码输入不符合规范');
          done(false);
        } else {
          done();
        }
      } else {
        // 点击取消就关闭弹框
        done();
      }
    },
    // 实现修改性别功能
    async updateGender() {
      // console.log(this.gender)
      let res = await updateUserById(this.userDate.id, { gender: this.gender })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.userDate.gender = this.gender
        this.$toast.success('修改性别成功')
      } else {
        this.$toast.fail('修改性别失败')
      }
    },
    onChange(picker, value, index) {
      this.gender = index
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
