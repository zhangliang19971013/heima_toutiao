<template>
  <input type="text" class="input" :class="{ 'green':isShow ,'red':!isShow}" @input='handinput'
  @blur='handblur'>
</template>

<script>
export default {
  props: ['msg', 'rules'],
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    //   input事件，输入的值正确或者错误底部边框的颜色
    handinput(event) {
      let value = event.target.value;
      //   console.log(value)
      //   判断文本框底框的颜色
      if (this.rules && this.rules.test(value)) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      //   将文本框的值传回父组件（子传父）
      this.$emit('input', value)
    },
    // 文本框失去焦点是，如果输入错误的轻微提示框
    handblur() {
      let value = event.target.value
      if (this.rules && !this.rules.test(value)) {
        // console.log(this.msg || '输入不正确')
        this.$toast.fail({
          message: this.msg || '输入不正确',
          duration: 3000
        })
      }
    }
  }
}
</script>

<style lang= 'less' scoped>
.input {
      width: 318*100vw/360;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      outline: none;
      border: none;
      border-bottom: 3px solid #ccc;
}
.red {
    border-bottom: 3px solid red;
}
.green {
    border-bottom: 3px solid green;
}
</style>
