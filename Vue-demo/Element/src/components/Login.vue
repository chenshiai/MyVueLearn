<template>
  <div class="login">
    <div class="container">
      <p class="title">后台管理系统</p>
      <div class="msg mt20">
        <el-input v-model="user" placeholder="请输入账号"></el-input>
      </div>
      <div class="msg mt20">
        <el-input v-model="password" placeholder="请输入密码"></el-input>
      </div>
      <div class="btn mt20">
          <el-button type="primary" v-on:click="login">主要按钮</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      if (this.user && this.password) {
        localStorage.setItem('userName', this.user)
        this.$router.push('/hello')
        // this.$router.push({ path: '/hello' }) // 对象
        // this.$router.push({ name: 'HelloWord' })
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
}
.container {
  width: 300px;
  padding: 50px;
  border-right: 4px;
  margin: 100px auto 0 auto;
  box-shadow: 0 0 20px #cac6c6;
}
.mt20 {
  margin-top: 20px;
}
.btn button {
  width: 100%;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #505458;
}
</style>
