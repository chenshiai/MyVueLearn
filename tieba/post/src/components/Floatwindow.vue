<template>
  <div class="floatwindow">
    <ul class="float-list">
      <li class="section-card" @click="editPost">
        <i class="el-icon-edit-outline"></i>
        <span>发帖</span>
      </li>
      <li class="section-card" @click="reload">
        <i class="el-icon-refresh"></i>
        <span>刷新</span>
      </li>
      <li class="section-card">
        <i class="el-icon-s-promotion"></i>
        <span>反馈</span>
      </li>
      <li class="section-card" @click="goToTop">
        <i class="el-icon-arrow-up"></i>
        <span>回顶部</span>
      </li>
    </ul>
  </div>
</template>

<script>
import API from '../../static/js/global.js';
export default {
  name: "floatwindow",
  data() {
    return {};
  },
  methods: {
    goToTop: function() {
      API.goToTop();
    },
    reload: function() {
      this.$emit("reload");
    },
    editPost: function() {
      this.$router.push({ name: "editPost", params: { status: "create" } });
    }
  }
};
</script>

<style lang='less' scoped>
.floatwindow {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
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
        i {
          color: #ffc343;
        }
        span {
          display: block;

          color: #fff;
        }
      }
    }
  }
}
</style>
