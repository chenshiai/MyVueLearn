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
              <el-input
                class="area"
                type="text"
                placeholder="输入你的用户名"
                v-model="loginForm.username"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="area"
                type="password"
                placeholder="输入你的密码"
                v-model="loginForm.password"
              />
            </el-form-item>
          </el-form>
          <el-button type="primary" :loading="submiting" class="tologin" @click="tologin">登录</el-button>
          <div class="toregister" @click="toregister">没有账号，去注册>></div>
        </section>
      </transition>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    return {
      showLogin: false,
      ip: "",
      topicId: "",
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      submiting: false
    };
  },
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  created() {
    this.topicId = this.$route.query.id;
  },
  mounted() {
    this.showLogin = true;
    if (this.isLogin) {
      this.$message({
        message: "已经登录，自动跳转至首页。"
      });
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["userLogin"]),
    tologin: function() {
      this.submiting = true;
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/login", this.loginForm)
            .then(res => {
              if (res.data.status > 0) {
                this.$message({
                  message:
                    "欢迎回来，" + unescape(res.data.data.nickname) + "。",
                  type: "success"
                });
                this.userLogin(res.data.data);
                // 如果是在帖子回复区点击的登录，则返回到帖子
                if (this.topicId) {
                  this.$router.push({ path: `/topic/${this.topicId}` });
                } else {
                  this.$router.push("/");
                }

              } else {
                this.loginForm.username = "";
                this.loginForm.password = "";
                this.$message.error(res.data.msg);
                this.submiting = false;
              }
              return;
            })
            .catch(err => {
              this.$message.error("服务器错误，登录失败！");
              this.submiting = false;
            });
        } else {
          this.submiting = false;
        }
      });
    },
    toregister: function() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped lang='less'>
.login-page {
  width: 400px;
  margin: 0 auto;
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
  margin-top: 5px;
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
  border: none;
  padding: 0;
}
.tologin:hover {
  background-color: #ffcf67;
}
.toregister {
  margin-top: 10px;
  font-size: 0.8rem;
}
.toregister:hover {
  color: #ffc343;
}
.footer {
  position: fixed;
  bottom: 0;
}
</style>
