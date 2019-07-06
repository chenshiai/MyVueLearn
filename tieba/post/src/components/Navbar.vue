<template>
  <div class="head">
    <div class="container">
      <div class="nav-bar">
        <div class="nav-bar-logo">LaiBA</div>
        <ul class="nav-bar-list">
          <li class="list-item" @click="lookPost">看吧</li>
          <li class="list-item" @click="lookMyself">热门</li>
          <li class="list-item" @click="lookMyself">精品</li>
        </ul>
        <div class="feature">
          <div class="user" v-show="isLogin">
            <div class="user-notice">
              <span @click="undone">
                <i class="el-icon-bell"></i>
              </span>
            </div>
            <div class="user-avatar">
              <span @click="selfInfo">{{$store.state.userinfo.nickname}}</span>
              <transition name="self-fade" mode="in-out">
                <div class="self-info section-card" v-show="showSelfInfo">
                  <ul>
                    <li @click="lookMyself">个人中心</li>
                    <li @click="myDrafts">草稿箱</li>
                    <li @click="outLogin">退出登录</li>
                  </ul>
                </div>
              </transition>
              
            </div>
          </div>
          <div class="login" v-show="!isLogin">
            <span @click="toUserLogin" class="cup">
              <i class="el-icon-user-solid"></i>
              登录
            </span>
            <span @click="toUserRegister" class="cup">
              <i class="el-icon-user"></i>
              注册
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import API from "../../static/js/global.js";
export default {
  name: "Navbar",
  data() {
    return {
      showSelfInfo: false
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  mounted() {
    let that = this;
    if (!this.isLogin) {
      // 如果用户处于未登录状态，则把token发给服务端校验
      // 服务端再返回该用户的信息设置在vuex中
      this.axios
        .post("/api/autologin/check")
        .then(res => {
          if (res.data.status > 0) {
            let nickname = res.data.data.nickname;
            let user_id = res.data.data.user_id;
            let power = res.data.data.power;
            that.userLogin({
              nickname,
              user_id,
              power
            });
          }
        })
    }

    return null;
  },
  methods: {
    ...mapActions(["cancelLogin", "userLogin"]),
    undone: function() {
      this.$message.error("该功能尚未实现");
    },
    outLogin: function() {
      this.$router.push("/");
      this.cancelLogin();
      this.axios
        .post("/api/login/out")
        .then(res => {
          if (res.data.status > 0) {
            this.$message({
              type: "success",
              message: "已退出登录。"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("出现错误，可以到首页进行反馈。");
        });
    },
    lookPost: function() {
      this.$router.push("/");
    },
    toUserLogin: function() {
      this.$router.push("/login");
    },
    toUserRegister: function() {
      this.$router.push("/register");
    },
    selfInfo: function() {
      this.showSelfInfo = !this.showSelfInfo;
    },
    lookMyself: function() {
      this.$message("非主要需求，并未实现");
    },
    myDrafts: function() {
      this.$router.push("/user/mydrafts");
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

        span {
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .user-avatar {
        position: relative;
        .self-info {
          color: #4f4f4f;
          position: absolute;
          line-height: 30px;
          width: 100%;
          margin-top: 10px;
          z-index: 99;
          ul {
            position: relative;
            padding: 10px 0;
            li {
              cursor: pointer;
              font-size: 0.8rem;
              &:hover {
                color: #ffc343;
                background-color: rgb(243, 243, 243);
              }
            }
            &:after {
              content: "";
              width: 0;
              height: 0;
              border-width: 0 20px 30px;
              border-style: solid;
              border-color: transparent transparent #ffffff; /*透明 透明  灰*/
              position: absolute;
              top: -20px;
              transform: translate3d(-20px, 0, 0);
            }
          }
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
/* self-info transition淡入样式 */
.self-fade-enter-active,
.self-fade-leave-active {
  transition: all 0.3s;
  transform-origin: top center;
}
.self-fade-enter,
.self-fade-leave-to {
  transform: scale(0, 2.5);
  opacity: 0;
}
</style>
