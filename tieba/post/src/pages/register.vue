<template>
  <div class="loginPage">
    <Navbar/>
    <div class="login-page">
      <!-- 触发时机 v-show v-if router -->
      <transition name="form-fade" mode="in-out">
        <section class="form-container section-card" v-show="showLogin">
          <div class="manage-tip">
            <span class="title">谢天谢地你来了！</span>
          </div>
          <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm">
            <el-form-item prop="username">
              <el-input class="area" type="text" placeholder="输入你的账号" v-model="loginForm.username"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="area"
                placeholder="输入你的密码"
                show-password
                v-model="loginForm.password"
              />
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="loginForm.checkPass" placeholder="确认你的密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
              <el-input class="area" type="text" placeholder="输入你的昵称" v-model="loginForm.nickname"/>
            </el-form-item>
          </el-form>
          <el-button type="primary" :loading="submiting" class="tologin" @click="toregister">注册</el-button>
          <div class="toregister" @click="tologin">已有账号，去登录>></div>
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// 这个页面解构与登录页面相同，类名没有变化，数据只有小部分变化，
export default {
  name: "regiser",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      showLogin: false,
      ip: "",
      loginForm: {
        username: "",
        password: "",
        nickname: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请给自己一个账号", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        nickname: [
          { required: true, message: "真的要叫你无名氏吗？", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ]
      },
      submiting: false
    };
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    ...mapActions(["userLogin"]),
    tologin: function() {
      this.$router.push("/login");
    },
    toregister: function() {
      this.submiting = true;
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/register", this.loginForm)
            .then(res => {
              if (res.data.status > 0) {
                this.$message({
                  message: "注册成功！已自动登录。",
                  type: "success"
                });
                this.userLogin(res.data.data);
                this.$router.push("/");
              } else {
                this.loginForm.username = "";
                this.loginForm.password = "";
                this.$message.error(res.data.msg);
                this.submiting = false;
              }
            })
            .catch(err => {
              this.$message.error("服务器错误，注册失败！");
              this.submiting = false;
            });
        } else {
          this.submiting = false;
        }
      });
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
