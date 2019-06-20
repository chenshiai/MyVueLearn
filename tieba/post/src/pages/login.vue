<template>
  <div class="loginPage">
    <Navbar/>
    <div class="login-page">
      <!-- 触发时机 v-show v-if router -->
      <transition name="form-fade" mode="in-out">
        <section class="form-container section-card" v-show="showLogin">
          <div class="manage-tip">
            <span class="title">登录一起来哈皮！</span>
          </div>
          <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm">
            <el-form-item prop="username">
              <span class="fa-tips">
                <i class="fa fa-user"></i>
              </span>
              <el-input
                class="area"
                type="text"
                placeholder="输入你的用户名"
                v-model="loginForm.username"
              />
              <el-input
                class="area"
                type="password"
                placeholder="输入你的密码"
                v-model="loginForm.password"
              />
            </el-form-item>
          </el-form>
          <div class="tologin" @click="tologin">登录</div>
          <div class="toregister" @click="toregister">没有账号，点此注册</div>
        </section>
      </transition>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.vue"
export default {
  name: "login",
  data() {
    return {
      showLogin: false,
      ip: "",
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  components: {
    Navbar,
    Footer
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    tologin: function() {
      this.$message({
        message:'该功能未实现'
      })
    },
    toregister: function() {
      this.$message({
        message:'该功能未实现'
      })
    }
  }
};
</script>

<style scoped lang='less'>
.login-page {
  width: 400px;
  margin: 0 auto ;
}
.form-container {
  padding: 20px;
}
.manage-tip .title {
  text-align: center;
  font-size: 1.6rem;
  line-height: 2rem;
  color: #ffc343;
}
.area {
  margin-top: 10px;
}
.tologin {
  width: 100%;
  line-height: 40px;
  border-radius: 3px;
  background-color: #ffc343;
  color: #fff;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
}
.tologin:hover {
  background-color: #ffcf67;
}
.toregister{
  margin-top: 10px;
  font-size: 0.8rem;
}
.toregister:hover{
  color: #ffc343
}
.footer{
  position: fixed;
  bottom: 0;
}
</style>
