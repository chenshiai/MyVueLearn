<template>
  <div class="head">
    <div class="container">
      <div class="nav-bar">
        <div class="nav-bar-logo">LOGO</div>
        <ul class="nav-bar-list">
          <li class="list-item" @click="lookPost">看贴</li>
          <li class="list-item">热门</li>
          <li class="list-item">精品</li>
        </ul>
        <div class="feature">
          <div class="user" v-show="isLogin">
            <div class="user-notice">
              <i class="el-icon-bell" @click="undone"></i>
            </div>
            <div class="user-avatar">
              <img src="../assets/logo.png" alt>
            </div>
          </div>
          <div class="login" v-show="!isLogin">
            <span @click="userLogin">
              <i class="el-icon-user-solid"></i>
              欢迎登录
            </span>
            <span @click="userRegister">
              <i class="el-icon-user"></i>
              点我注册
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    undone: function() {
      this.$message.error("该功能尚未实现");
    },
    lookPost: function(){
      this.$router.push('/');
    },
    userLogin: function(){
      this.$router.push('/login');
    },
    userRegister: function(){
      this.$message.error("该功能尚未实现");
    }
  }
};
</script>

<style lang='less' scoped>

.nav-bar {
  display: flex;
  line-height: 80px;
  text-align: center;
  color: #fff;
  .nav-bar-logo {
    flex: 1;
    font-size: 1.5rem;
  }
  .nav-bar-list {
    flex: 3;
    display: flex;
    .list-item {
      flex: 1;
      cursor: pointer;
      &:hover {
        background-color: #ffcf67;
      }
    }
  }
  .feature {
    flex: 1;
    .user {
      display: flex;
      .user-notice,
      .user-avatar {
        i {
          font-size: 1.5rem;
        }
        display: inline-block;
        flex: 1;
        img {
          width: 45px;
          border: solid 3px #fff;
          border-radius: 100%;
          background-color: #fff;
        }
      }
    }
    .login {
      display: flex;
      span {
        flex: 1;
      }
    }
  }
}
</style>
