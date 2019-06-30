<template>
  <div class="home">
    <Navbar/>
    <transition name="form-fade" mode="in-out">
      <div class="container" v-show="showPage">
        <!-- 左边主体 -->
        <div class="content-left">
          <!-- 本吧信息 -->
          <PostItInfo/>
          <!-- 吧主信息 -->
          <section class="section-card">
            <div class="post-owner">
              本吧吧主:
              <ul class="owner-list">
                <li class="owner-list-item">
                  <i class="el-icon-user"></i>
                </li>
              </ul>
            </div>
            <!-- 帖子列表 -->
            <router-view :stickyList="stickyList" :postList="postList" @deletePost="deletePost"/>
            <div style="height: 50px"></div>
          </section>
        </div>
        <!-- 右边侧栏 -->
        <div class="content-right">
          <section class="section-card">右边</section>
        </div>
      </div>
      <!-- 悬浮窗 -->
    </transition>
    <Floatwindow/>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      showPage: false,
      stickyList: [],
      postList: [],
      page: 1
    };
  },
  mounted() {
    this.showPage = true;
    // 获取置顶帖
    this.getStickyList();
    // 请求一页非置顶帖子
    this.lazyLoadList();
  },
  methods: {
    getStickyList: function() {
      // 获取置顶帖的请求
      this.axios.get("/api/postlist/sticky").then(res => {
        if (res.data.status > 0) {
          this.stickyList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(()=>{
        this.$message.error('服务器错误，置顶帖获取失败！');
      });
    },
    lazyLoadList: function() {
      // 根据page分页获取
      this.axios.post("/api/postlist/page", { page: this.page }).then(res => {
        if (res.data.status > 0) {
          this.postList = [...this.postList,...res.data.data];
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(()=>{
        this.$message.error('服务器错误，帖子获取失败！');
      });
    },
    deletePost: function(index){
      this.postList.splice(index, 1);
    }
  }
};
</script>

<style lang='less' scoped>
.post-owner {
  line-height: 25px;
  color: #868686;
  border-bottom: 1px #868686 solid;
  padding: 10px 20px;
  .owner-list {
    display: inline-block;
    vertical-align: middle;
    .owner-list-item {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      text-align: center;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
