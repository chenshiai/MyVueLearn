<template>
  <div class="allreply">
    <!-- 回复区头 -->
    <div class="reply-head">
      <span>全部回复({{maxlength}})</span>
      <span class="reply-only">
        <!-- <i class="el-icon-s-custom">只看楼主</i> -->
        <i class="el-icon-sort cup" @click="reverseReply">倒序查看</i>
      </span>
    </div>
    <!-- 回复列表 -->
    <ul class="reply-list">
      <li class="reply-item" v-for="(item, index) in reply" :key="index">
        <div class="repley-detail">
          <!-- 回复者昵称 -->
          <div class="reply-user">
            {{item.nickname}}
            <span class="reply-floor">{{item.index}}楼</span>
          </div>
          <!-- 回复时间 -->
          <div class="reply-time">{{item.created_at}}</div>
          <!-- 回复内容 -->
          <div class="reply-content">
            <div>{{item.content}}</div>
            <div
              class="relpy2floor"
              @click="sendFloorReply(item, item.id)"
              v-show="isLogin&&!noreply"
            >
              <span class="cup">
                <i class="el-icon-chat-line-round"></i>回复
              </span>
            </div>
            <!-- 楼中楼 -->
            <ul class="floor-list" v-show="item.replyfloor.length!=0">
              <li v-for="(floor, indexf) in item.replyfloor" :key="indexf">
                <div class="repley-detail">
                  <div class="reply-user">
                    {{floor.nickname}}
                    <i class="el-icon-caret-right"></i>
                    {{floor.amisname}}
                  </div>
                  <div class="reply-time">{{floor.created_at}}</div>
                  <div class="reply-content">
                    <div>{{floor.content}}</div>
                    <div
                      class="relpy2floor"
                      @click="sendFloorReply(floor, item.id)"
                      v-show="isLogin&&!noreply"
                    >
                      <span class="cup">
                        <i class="el-icon-chat-line-round"></i>回复
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class="reply-status" v-show="zeroreply">暂无回复</li>
    </ul>
    <div class="loadmore cup" @click="pageOfReply.lazyload(5)" v-show="maxlength>reply.length">加载更多</div>
  </div>
</template>

<script>
import API from "../../static/js/global.js";
import { mapGetters } from "vuex";
export default {
  name: "allreply",
  props: ["topicId", "noreply"],
  data() {
    return {
      pageOfReply: () => {},
      reply: [],
      maxlength: 0,
      reverse: true // 是否时间倒序
    };
  },
  created() {
    this.getReply(true);
  },
  computed: {
    ...mapGetters(["isLogin"]),
    // 是否零回复
    zeroreply: function() {
      return this.reply.length == 0;
    }
  },
  methods: {
    getReply: function() {
      // 获取回复的请求
      this.axios
        .post("/api/reply/list", { id: this.topicId, reverse: this.reverse })
        .then(res => {
          if (res.data.status > 0) {
            // 因为后端数据库设计问题，分页交给前端来处理
            this.maxlength = res.data.data.length;
            this.pageOfReply = new API.Taglazyload(res.data.data, data => {
              this.reply.push(data);
            });
            this.pageOfReply.lazyload(5);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("服务器错误，回复获取失败！");
        });
    },
    reverseReply: function() {
      this.reverse = !this.reverse;
      this.pageOfReply = () => {};
      this.reply = [];
      this.maxlength = 0;
      this.getReply();
    },
    sendFloorReply: function(item, floor) {
      this.$emit("sendFloorReply", { item, floor });
    }
  }
};
</script>

<style lang="less" scoped>
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
      i {
        margin-right: 5px;
      }
      .relpy2floor {
        color: #909399;
        font-size: 0.8rem;
        margin-bottom: 10px;
      }
    }
  }
  .loadmore {
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    border: solid 1px;
    &:hover {
      color: #ffc343;

      background-color: #ffc34350;
    }
  }
}
</style>
