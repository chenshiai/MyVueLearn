<template>
  <section class="section-card">
    <div class="post-it-info">
      <!-- 本吧logo -->
      <div class="post-logo">
        <img src="../assets/logo.png" alt>
      </div>
      <!-- 本吧详情 -->
      <div class="post-detail">
        <div class="post-title">{{ postInfo.postname }}</div>
        <div class="post-introduction">{{ postInfo.introduction }}</div>
        <div class="post-user-numbar">{{ postInfo.usernumber }}人关注</div>
        <div class="post-number">{{ postInfo.postnumber }} 篇帖子</div>
        <div :class="isLogin?'follow followed':'follow nofollow'" @click="follow">
          <span v-show="!isLogin">
            <i class="el-icon-star-on"></i>加入本吧
          </span>
          <span v-show="isLogin">
            <i class="el-icon-star-on"></i>已加入
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "post-it",
  data() {
    return {
      postInfo: {
        postname: "速度与激情",
        introduction:
          "欢迎来到速度与激情论坛，在这里你可以“无照驾驶”，欢迎来分享驾驶心得",
        usernumber: 108,
        postnumber: 23040
      }
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    follow: function() {
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="less" scoped>
.post-it-info {
  padding: 20px;
  display: flex;
  .post-logo,
  .post-detail {
    display: inline-block;
    .post-title {
      font-size: 2.1rem;
      font-weight: bold;
      color: #4f4f4f;
    }
    .post-introduction,
    .post-user-numbar,
    .post-number {
      color: #868686;
      margin-top: 6px;
    }
    .follow{
      width: 130px;
      line-height: 40px;
      border: solid 1px;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      margin-top: 10px;
    }
    .followed {
      color: #ffc343;
    }
    .nofollow {
      background-color: #ffc343;
      border: solid 1px #ffc343;
      color: #fff;
    }
  }
  .post-logo {
    flex: 1;
    img {
      width: 100%;
    }
  }
  .post-detail {
    flex: 2;
    margin-left: 20px;
  }
}
</style>
