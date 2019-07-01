<template>
  <div class="post-page">
    <Navbar/>
    <transition name="form-fade" mode="in-out">
      <div class="container" v-show="showPage">
        <div class="content-left section-card topic-left">
          <!-- 帖子详情 -->
          <div class="topic">
            <!-- 帖子头 -->
            <div class="topic-head">
              <!-- 标题 -->
              <div class="topic-title">{{topic.title}}</div>
              <!-- 标签 -->
              <div class="topic-tags">
                <span
                  v-for="(tag, index) in topic.tags"
                  :key="index"
                  class="tag"
                >{{tag==1?'置顶':tag==2?'精华':tag==3?'禁言':''}}</span>
              </div>
              <!-- 帖子信息 -->
              <div class="topic-all">
                <span class="topic-user" title="楼主">
                  <i class="el-icon-user-solid">{{topic.nickname}}</i>
                </span>
                <span class="topic-time" title="发表时间">
                  <i class="el-icon-time">{{topic.created_at}}</i>
                </span>
                <span class="topic-looknumber" title="浏览量">
                  <i class="el-icon-view">{{topic.looknumber ? topic.looknumber : 0}}</i>
                </span>
                <Postoprating :item="topic"/>
              </div>
            </div>
            <!-- 帖子内容 -->
            <Topic :topic="topic"/>
          </div>
          <!-- 回复区 -->
          <router-view :topicId="topicId" :noreply="noreply" @sendFloorReply="sendFloorReply"/>
          <!-- 回复输入框 -->
          <div class="replyarea">
            <div class="reply-head">
              <span>发表回复</span>
            </div>
            <div class="input">
              <el-input
                type="textarea"
                :rows="7"
                placeholder="请输入内容"
                v-model="textarea"
                ref="reply"
                maxlength="200"
                show-word-limit
              ></el-input>
              <div @click="sendReply" class="sendReply cup">
                <span v-if="replyObj.floor==0">向楼主回复</span>
                <span v-else>向{{replyObj.nickname}}回复</span>
              </div>
              <div @click="closeFloorReply" v-show="replyObj.floor!=0" class="sendReply cup">取消</div>
              <div class="replymask" v-show="!isLogin&&!noreply">
                你需要登录才可以回复
                <router-link :to="{ path: '/login', query: { id: topicId } }">登录</router-link>|
                <router-link to="/register">立即注册</router-link>
              </div>
              <div class="replymask" v-show="noreply">该帖被设为禁止回复</div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <Right/>
        </div>
      </div>
    </transition>
    <!-- 悬浮窗 -->
    <Floatwindow :status="true"/>
    <!-- <div class="mask"></div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "postPage",
  inject: ["reload"],
  data() {
    return {
      showPage: false,
      topicId: "",
      topic: {
        tags: []
      },
      textarea: "",
      replyObj: {
        floor: 0,
        nickname: "",
        amis: ""
      }
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
    // 是否禁止回复
    noreply: function() {
      return this.topic.tags.indexOf("3") >= 0;
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.topicId = this.$route.params.id;
  },
  mounted() {
    // 获取帖子内容
    this.showPage = true;
    this.getTopic();
  },
  methods: {
    getTopic: function() {
      // 获取帖子的请求
      this.axios
        .post("/api/postlist/topic", { id: this.topicId })
        .then(res => {
          if (res.data.status > 0) {
            this.topic = res.data.data;
            this.replyObj.amis = this.topic.user_id;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("服务器错误，数据获取失败！");
        });
    },
    sendFloorReply: function({ item, floor }) {
      // 接收到被回复的楼层id和用户信息
      this.replyObj.floor = floor;
      this.replyObj.nickname = item.nickname;
      this.replyObj.amis = item.user_id;
      this.replyFocus();
      this.$message({
        message: `正在向【${item.nickname}】回复`
      });
    },
    replyFocus: function() {
      // 聚焦输入框
      this.$refs.reply.focus();
    },
    closeFloorReply: function() {
      // 取消楼层回复
      this.replyObj.floor = 0;
      this.replyObj.nickname = "";
      this.replyObj.amis = this.topic.user_id;
    },
    sendReply: function() {
      // 发送回复的请求
      /**
       * 参数说明
       * @param amis { string } 回复目标的user_id 初始化为楼主user_id
       * @param content { string } 回复内容
       * @param topic_id { int } 帖子的id
       * @param userinfo { object } 回复者的信息
       * @param replynumber { int } 当前帖子的回复数
       * @param floor { int } 回复楼层的id 0 表示不是楼中楼 初始化为0
       */
      if (this.textarea != "") {
        this.axios
          .post("/api/reply/add", {
            amis: this.replyObj.amis,
            content: this.textarea,
            topic_id: this.topicId,
            user_id: this.$store.state.userinfo.user_id,
            replynumber: this.topic.replynumber,
            floor: this.replyObj.floor
          })
          .then(res => {
            if (res.data.status > 0) {
              this.$message({
                type: "success",
                message: "回复成功！"
              });
              // 将新回复显示在页面上未写 直接刷新
              this.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error("服务器错误，回复失败！");
          });
      } else {
        this.$message({
          type: "warning",
          message: "请先输入内容。"
        });
      }
    },
    reverseReply: function() {
      // 倒序查看回复
      this.reply = this.reply.reverse();
    }
  }
};
</script>

<style lang='less' scoped>
.topic-left {
  padding: 25px;
}
.topic {
  .topic-head {
    padding: 0 0 20px 0;
    border-bottom: 1px solid #d1d1d1;

    .topic-title {
      line-height: 50px;
      font-size: 2.2rem;
    }
    .topic-tags {
      display: flex;
      margin-top: 5px;
      font-size: 1.2rem;
    }
    .topic-all {
      color: #909399;
      span {
        margin-right: 10px;
      }
    }
  }
}
.reply-head {
  border-left: 4px solid #ffc343;
  font-size: 1.2rem;
  padding-left: 5px;
  margin-bottom: 20px;
  .reply-only {
    float: right;
    font-size: 0.8rem;
  }
}
.allreply {
  margin-top: 20px;
  .reply-list {
    .reply-status {
      line-height: 80px;
      text-align: center;
    }
    .reply-item {
      padding-bottom: 25px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eeeeee;
      .reply-user {
        font-weight: bold;
        .reply-floor {
          float: right;
        }
      }
      .reply-floor,
      .reply-time {
        margin-top: 10px;
        color: #999999;
        font-size: 0.8rem;
      }
    }
    .floor-list {
      border-top: 1px solid #eeeeee;
      padding-top: 10px;
    }
    .reply-content {
      margin-top: 10px;
      padding-left: 40px;
      span {
        display: block;
        margin-bottom: 10px;
      }
      i {
        margin-right: 5px;
      }
      .relpy2floor {
        color: #909399;
        font-size: 0.8rem;
      }
    }
  }
}
.replyarea {
  margin-top: 30px;
  margin-bottom: 50px;
  .input {
    width: 100%;
    position: relative;
    .sendReply {
      border-radius: 5px;
      border: solid 1px #ffc343;
      margin: 10px 10px 0 0;
      color: #ffc343;
      padding: 10px;
      text-align: center;
      float: right;
      &:hover {
        background-color: #ffc343;
        color: #fff;
      }
    }
    .replymask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1600;
      // background-color: rgba(0, 0, 0, 0.01);
      text-align: center;
      padding-top: 50px;
    }
  }
}
.mask {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>
