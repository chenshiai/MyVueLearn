<template>
  <div class="drafts">
    <Navbar/>

    <transition name="form-fade" mode="in-out">
      <ul class="drafts-list section-card">
        <span class="drafts-title">草稿箱</span>
        <li v-for="(item, index) in $store.state.userDrafts" :key="index">
          <div class="title">
            <span @click="toEdit(item.id)" class="cup">{{item.title ? item.title:'无标题'}}</span>
          </div>
          <div class="detail">
            <div class="update-time">
              <i class="el-icon-time"></i>
              <span>{{item.updated_at}}</span>
            </div>
          </div>
          <span class="delete cup" @click="deleteDrafts(item.id, index)">
            <i class="el-icon-delete">删除</i>
          </span>
        </li>
        <li  v-if="$store.state.userDrafts.length===0">
          <div class="title">
            <span>空空如也</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "drafts",
  mounted() {
    // 获取草稿
    // 判断是否登录，没登录跳去登录页
    if (!this.isLogin) {
      this.$router.push("/login");
    } else {
      this.getDrafts();
    }
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    ...mapActions(["setUserDrafts", "deleteUserDrafts"]),
    getDrafts: function() {
      this.axios
        .post("/api/postlist/mydrafts", this.$store.state.userinfo)
        .then(res => {
          // 将获取到的草稿存入vuex中，（编辑草稿时从vuex中取出）
          if (res.data.status > 0) {
            this.setUserDrafts(res.data.data);
          }
        });
    },
    toEdit: function(id) {
      this.$router.push({
        name: "editPost",
        params: {
          status: "drafts",
          draftsId: id
        }
      });
    },
    deleteDrafts: function(id, index) {
      this.$confirm("此操作将永久删除该草稿, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/api/postlist/mydrafts/delete", {
              user_id: this.$store.state.userinfo.user_id,
              id
            })
            .then(res => {
              if (res.data.status > 0) {
                this.deleteUserDrafts(index);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            })
            .catch(err => {
              this.$message.error("服务器错误，操作失败！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang='less' scoped>
.drafts-list {
  width: 50%;
  margin: 20px auto;
  .drafts-title {
    font-size: 1.4rem;
    text-align: center;
    display: block;
    width: 100%;
    line-height: 35px;
    font-weight: bold;
    color: #ffc343;
  }
  li {
    padding: 10px 20px 20px 20px;
    border-top: 1px solid #eeeeee;
    .title {
      line-height: 1;
      font-weight: bold;
      margin: 15px 0;
      span:hover {
        color: #ffc343;
      }
    }
    .detail {
      color: #909399;
    }
    .delete:hover {
      color: #f56c6c;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
}
</style>
