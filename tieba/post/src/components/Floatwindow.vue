<template>
  <div class="floatwindow">
    <ul class="float-list">
      <li class="section-card" @click="editPost" v-show="!looking">
        <i class="el-icon-edit-outline"></i>
        <span>发吧</span>
      </li>
      <li class="section-card" @click="reload" v-show="!looking">
        <i class="el-icon-refresh"></i>
        <span>刷新</span>
      </li>
      <li class="section-card" v-show="!looking">
        <i class="el-icon-s-promotion"></i>
        <span>反馈</span>
      </li>
      <li class="section-card" @click="goToTop">
        <i class="el-icon-caret-top"></i>
        <span>回顶部</span>
      </li>
    </ul>
  </div>
</template>

<script>
import API from "../../static/js/global.js";
import { mapGetters } from "vuex";
export default {
  name: "floatwindow",
  props: ["status"],
  inject:['reload'],
  data() {
    return {
      looking: false
    };
  },
  created() {
    if (this.status) {
      this.looking = this.status;
    }
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    goToTop: function() {
      API.goToTop();
    },
    editPost: function() {
      if (!this.isLogin) {
        this.$message.error("发帖功能需要先登录才行哦。");
      } else {
        this.$router.push({ name: "editPost", params: { status: "create" } });
      }
    },
    toReply: function() {
      if (this.isLogin) {
        this.$emit("sendReply");
      } else {
        this.$message.error('你需要登录才可以回复哦。')
      }
    }
  }
};
</script>

<style lang='less' scoped>
.floatwindow {
  position: fixed;
  right: 30px;
  bottom: 20%;
  .float-list {
    li {
      width: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 10px;
      margin-top: 0;
      cursor: pointer;
      position: relative;
      i {
          color: #ffc343;
        }
      span {
        position: absolute;
        display: none;
        width: 100%;
        font-size: 1rem;
        top: 0;
        left: 0;
      }
      &:hover {
        background-color: #ffc343;
        
        span {
          display: block;

          color: #fff;
        }
      }
    }
  }
}
</style>
