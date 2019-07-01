<template>
  <div class="right-content">
    <section class="section-card">
      <div class="SD">
        <a href="http://localhost:3000/pingtuyouxi/index.html" target="blank"><img src="../assets/timg.jpg" title="拼图小游戏"></a>
        <div class="SD-tags">广告</div>
      </div>
    </section>
    <section class="section-card">
      <div class="QR">
        <img src="../assets/1561949106.png" alt title="Github-ChenShiAi">
        <div class="QR-detail">
          <div class="title">这是一个开源项目</div>
          <div class="content">
            欢迎一起学习！
            <a
              href="https://github.com/chenshiai/MyVueLearn/tree/master/tieba"
              target="blank"
            >Github</a>
          </div>
        </div>
      </div>
    </section>
    <section class="section-card">
      <div class="share-widget-complaint">
        <div class="share">
          <span class="cup" @click="copyUrl">
            <i class="el-icon-share"></i>
            分享
          </span>
          <!-- 这里存储当前页地址链接 -->
          <input
            type="text"
            style="opacity: 0;position: absolute; top:-999px;"
            v-model="thisurl"
            ref="thisurl"
          >
        </div>
        <div class="widget">
          <span class="cup">
            <i class="el-icon-link"></i>
            嵌入
          </span>
        </div>
        <div class="complaint">
          <span class="cup" @click="complaint">
            <i class="el-icon-s-flag"></i>
            投诉
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "right",
  data() {
    return {
      thisurl: ""
    };
  },
  mounted() {
    this.thisurl = window.location.href;
  },
  methods: {
    copyUrl: function() {
      this.$refs.thisurl.select();
      document.execCommand("Copy");
      this.$message({
        type: "success",
        message: "链接已复制到剪贴板。"
      });
    },
    complaint: function() {
      this.$message("不，不能投诉！这就是做个样子的。");
    },
  }
};
</script>

<style lang='less' scoped>
.right-content {
  .section-card {
    padding: 10px;
  }
  .SD {
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
    }
    .SD-tags {
      position: absolute;
      bottom: 5px;
      right: 5px;
      border: solid 1px #909399;
      padding: 0px 4px;
      font-size: 0.6rem;
      color: #909399;
    }
  }

  .QR {
    img {
      float: left;
      width: 100px;
    }
    .QR-detail {
      margin-left: 110px;
      line-height: 50px;
      .title {
        font-size: 1.3rem;
        color: #ffc343;
        font-weight: bold;
      }
      .content {
        font-size: 0.8rem;
        color: #909399;
      }
    }
  }

  .share-widget-complaint {
    display: flex;
    div {
      flex: 1;
      text-align: center;
      line-height: 30px;
      span {
        color: #909399;
        border-radius: 4px;
        padding: 5px;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
