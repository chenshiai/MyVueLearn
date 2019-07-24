<template>
  <section class="section-card">
    <div class="post-it-info">
      <!-- 本吧logo -->
      <div class="post-logo">
        <img src="../assets/mylogo.png" alt>
      </div>
      <!-- 本吧详情 -->
      <div class="post-detail">
        <div class="post-title">{{ postInfo.postname }}</div>
        <div class="post-introduction">{{ postInfo.introduction }}</div>
        <div :class="isLogin?'follow followed':'follow nofollow'">
          <span v-show="!isLogin"  @click="follow">
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
        postname: "来吧",
        introduction:
          "欢迎来到“来吧”，在这里你可以和大家一起学习新的技术、分享自己的心得",
        usernumber: 0,
        postnumber: 0
      }
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    follow: function() {
      // this.$message({
      //   message: '关注功能未完成'
      // })
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
      color: #303133;
    }
    .post-introduction,
    .post-user-numbar,
    .post-number {
      color: #909399;
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
