<template>
  <div class="edit-post">
    <!-- 编辑帖子头 -->
    <div class="post-head">
      <div class="post-title">
        <input type="text" placeholder="输入帖子标题..." v-model="postInfo.title" @input="changeContent">
      </div>
      <!-- 用户工具 -->
      <div class="user-controller">
        <!-- 草稿箱 -->
        <div class="drafts" v-show="!updating">
          <span v-if="autoSave">正在保存至</span>
          <span v-else>已经自动保存至</span>
          <i class="el-icon-document cup" @click="myDrafts">草稿</i>
        </div>
        <!-- 发表 -->
        <div class="publish cup" @click="publish">
          <span>发表</span>
        </div>
        <!-- 用户信息 -->
        <div class="user-avatar">
          <span>{{$store.state.userinfo.nickname}}</span>
        </div>
      </div>
    </div>
    <div style="height: 62px;"></div>
    <!-- 帖子内容 -->
    <div class="post-content">
      <mavon-editor
        ref="md"
        @imgAdd="imgAdd"
        v-model="postInfo.content"
        :toolbars="toolbars"
        @change="changeContent"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import API from "../../static/js/global.js";
export default {
  name: "editPost",
  data() {
    return {
      autoSave: false,
      draftsId: "",
      updating: false,
      postInfo: {
        content: "",
        title: ""
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        ink: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true // 导航目录
      }
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
    changeDebounce: function() {
      let that = this;
      // 防抖处理
      return API.debounce(
        () => {
          // 这里发起保存请求
          that.autoSave = true;
          this.contentSave();
        },
        1000,
        { leading: false, trailing: true, context: null }
      );
    }
  },
  mounted() {
    if (this.$route.params.status === "create") {
      // 点击发帖，新建一个帖子到草稿箱，并获取draftsId
      this.$notify.info({
        title: "来自网页的通知",
        message:
          "这里是编辑页面，采用MarkDown语法，字数限制2000字（含符号），停止编辑一秒后，将会自动保存至草稿箱哦。"
      });
      this.createPost();
    } else if (this.$route.params.status === "update") {
      // 如果是从更新帖子进来的编辑页就获取该帖子的内容
      if (this.$route.params.post) {
        // 将如有进来的参数传给当前页面并显示
        this.postInfo = this.$route.params.post;
        this.$message({
          type: "success",
          message: "读取成功，可以开始编辑了！"
        });
        this.updating = true;
      } else {
        this.$message.error("出现错误，请在首页进行反馈，谢谢！");
      }
    } else if (this.$route.params.status === "drafts") {
      // 如果是从草稿箱进来更新，需要草稿帖子的id作为参数
      this.editDrafts();
    } else {
      // 如果是通过地址进入此页面则跳转回首页
      this.$message.error("出现错误，即将跳转至首页。");
      setTimeout(() => {
        this.$router.push("/");
      }, 500);
    }
  },
  methods: {
    publish: function() {
      // 再判断一次是否登录
      if (!this.isLogin) {
        this.$router.push("/login");
        this.$message.error("白写了，请先登录");
      } else {
        this.$confirm("即将发表，是否继续?", "大功告成了！", {
          confirmButtonText: "发表",
          cancelButtonText: "再改改",
          type: "warning"
        })
          .then(() => {
            this.publishSave();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "再改改..."
            });
          });
      }
    },
    changeContent: function() {
      // 内容一改变就触发
      // 如果是更新已经发布的帖子，则不会触发自动保存
      if (this.draftsId) {
        this.changeDebounce();
      }
    },
    contentSave: function() {
      // 自动保存草稿的请求
      if (this.postInfo.content.length > 2000) {
        this.$message.error("字数大于2000了！");
        return;
      }
      this.axios
        .post("/api/publish/drafts", {
          id: this.draftsId,
          ...this.postInfo
        })
        .then(res => {
          if (res.data.status > 0) {
            this.autoSave = false;
            if (!this.draftsId) {
              this.draftsId = res.data.data.id;
            }
          }
        })
        .catch(res => {
          this.$message.error("服务器错误，自动保存失败！");
        });
    },
    publishSave: function() {
      // 发帖的请求
      if (this.postInfo.content.length > 2000) {
        this.$message.error("字数大于2000了！");
        return;
      }
      // 如果postId存在，则表示更新帖子
      // 如果postId不存在且draftsId存在，则表示草稿完成且发表
      // 帖子内容和用户的信息作为帖子的参数
      this.axios
        .post("/api/publish", {
          postId: this.postInfo.id,
          draftsId: this.draftsId,
          ...this.postInfo,
          ...this.$store.state.userinfo
        })
        .then(res => {
          if (res.data.status > 0) {
            this.$router.push("/");
            this.$message({
              type: "success",
              message: "发表成功！"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(res => {
          this.$message.error("服务器错误，发布失败！");
        });
    },
    createPost: function() {
      // 新建草稿的请求，并获取草稿id
      this.axios
        .post("/api/publish/init")
        .then(res => {
          if (res.data.status > 0) {
            this.draftsId = res.data.data.id;
            this.$message({
              type: "success",
              message: "已添加至草稿箱中。"
            });
          } else {
            this.$message.error(res.data.msg);
            this.$router.push("/");
          }
        })
        .catch(res => {
          this.$message.error("服务器错误，新建帖子失败！");
        });
    },
    myDrafts: function() {
      // 跳转至草稿箱
      this.$router.push("/user/mydrafts");
    },
    editDrafts: function() {
      // 拿到草稿箱传进来的草稿id
      if (this.$route.params.draftsId) {
        this.draftsId = this.$route.params.draftsId;
        // 从vuex的缓存中，循环找到草稿内容给当前页面显示
        this.$store.state.userDrafts.forEach(draft => {
          if (draft.id == this.draftsId) {
            let title = draft.title || "";
            let content = draft.content || "";
            this.postInfo = {
              title,
              content
            };
          }
        });
        this.$message({
          type: "success",
          message: "读取完成，可以继续编辑草稿啦。"
        });
      } else {
        // 如果没有参数进来
        this.$message.error("出现错误，请在首页进行反馈，谢谢！");
      }
    },
    imgAdd: function (pos, file) {
      // 上传图片
      var formData = new FormData();
      formData.append("image", file);
      console.log(formData)
      this.axios({
        url: '/api/user/img/upload', //请求地址
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        // console.log(JSON.stringify(url))
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1.  通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         * 3. 由于vue运行访问的路径只能在static下，so，我就把图片保存到它这里了
         */
        this.$refs.md.$img2Url(
          pos,"http://localhost:3000"+url.data.data
        );
      });
    }
  }
};
</script>

<style lang='less' scpoed>
.post-head {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1600;
  background-color: #fff;
  padding: 16px;
  border-bottom: solid #ffc343 1px;
  .post-title {
    display: inline-block;
    width: 50%;
    input {
      width: 100%;
      border: none; // 去除未选中状态边框
      outline: none;
      font-size: 1.5rem;
      font-weight: bold;
      height: 30px;
    }
  }
  .user-controller {
    line-height: 30px;
    text-align: center;
    float: right;
    width: 400px;
    display: flex;
    .drafts {
      flex: 3;
    }
    .top-img {
      position: relative;
      .top-imt-input {
        position: absolute;
      }
    }
    .publish {
      flex: 1;
      background-color: #ffc343;
      color: #fff;
    }
    .user-avatar {
      flex: 2;
    }
  }
}
.post-content {
  overflow: hidden;
  .v-note-wrapper .v-note-op.shadow,
  .v-note-wrapper .v-note-panel.shadow {
    border-bottom: solid #ffc343 1px;
    box-shadow: none;
  }
  .v-note-wrapper .v-note-panel.shadow {
    margin-top: 41px;
  }
  .v-note-wrapper .v-note-op {
    position: fixed;
  }
}
</style>
