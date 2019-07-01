<template>
  <div class="manage" v-show="isMyPost||isManege">
    <i class="el-icon-more cup"></i>
    <ul class="manage-list section-card">
      <li v-show="isMyPost" @click="updatePost">编辑</li>
      <li v-show="isManege&&!isSticky" @click="addSticky">置顶</li>
      <li v-show="isManege&&isSticky" @click="tagsPost('sticky',true)">撤顶</li>
      <li v-show="isManege&&!isEssencs" @click="addEssence">加精</li>
      <li v-show="isManege&&isEssencs" @click="tagsPost('essencs',true)">撤精</li>
      <li @click="addBanned" v-if="!isBanned">禁言</li>
      <li @click="tagsPost('banned',true)" v-else>开放</li>
      <li @click="deleteConfirm">删除</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Postoprating",
  props: ["item", "index"],
  inject: ["reload"],
  computed: {
    isMyPost: function() {
      return this.item.user_id === this.$store.state.userinfo.user_id;
    },
    isManege: function() {
      return this.$store.state.userinfo.power > 1;
    },
    isSticky: function() {
      return this.item.tags.indexOf('1') >= 0;
    },
    isEssencs: function() {
      return this.item.tags.indexOf('2') >= 0;
    },
    isBanned: function() {
      return this.item.tags.indexOf('3') >= 0;
    }
  },
  methods: {
    deleteConfirm: function() {
      this.$confirm("即将删除这篇帖子，是否继续?", "帖子删除", {
        confirmButtonText: "删除",
        cancelButtonText: "算了",
        type: "error"
      })
        .then(() => {
          this.deletePost();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除操作..."
          });
        });
    },
    deletePost: function() {
      this.axios.post("/api/postlist/delete", this.item).then(res => {
        if (res.data.status > 0) {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          this.$router.push("/");
          this.reload();
        } else {
          this.$message({
            type: "error",
            message: "删除失败！"
          });
        }
      });
    },
    updatePost: function() {
      this.$router.push({
        name: "editPost",
        params: { status: "update", postId: this.item.id, post: this.item }
      });
    },
    addSticky: function() {
      this.$confirm("即将置顶这篇帖子，是否继续?", "这个东西很重要欸！", {
        confirmButtonText: "置顶了",
        cancelButtonText: "算了",
        type: "info"
      })
        .then(() => {
          this.tagsPost('sticky');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消置顶操作..."
          });
        });
    },
    addEssence: function() {
      this.$confirm("即将加精这篇帖子，是否继续?", "好东西让大家都看到！", {
        confirmButtonText: "加精",
        cancelButtonText: "不了",
        type: "info"
      })
        .then(() => {
          this.tagsPost('essencs');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消加精操作..."
          });
        });
    },
    addBanned: function() {
      this.$confirm("即将禁言这篇帖子，是否继续?", "这帖子要沉！", {
        confirmButtonText: "确定",
        cancelButtonText: "算了",
        type: "info"
      })
        .then(() => {
          this.tagsPost('banned');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消沉帖操作..."
          });
        });
    },
    tagsPost: function(mode, noAdd) {
      let tags = this.item.tags;
      this.axios
        .post("/api/postlist/tagsadd", {
          id: this.item.id,
          tags: tags!=''?tags:[],
          mode,
          noAdd
        })
        .then(res => {
          if (res.data.status > 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.$router.push("/");
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("操作失败！");
        });
    },
  }
};
</script>

<style lang='less'>
.manage {
  float: right;
  position: relative;
  font-size: 14px;
  i{
    position: relative;
    z-index:9;
  }
  .manage-list {
    display: none;
    position: absolute;
    margin: 0;
    left: -17px;
    padding: 5px 0;
    z-index:10;
    li {
      width: 50px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      padding: 2px 0;
      color: #606266;
      &:hover {
        color: #ffc343;
        background-color: rgb(243, 243, 243);
      }
    }
  }
  &:hover {
    .manage-list {
      display: block;
    }
  }
}
</style>
