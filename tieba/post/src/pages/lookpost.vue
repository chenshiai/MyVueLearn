<template>
  <div class="post-page">
    <Navbar/>
    <div class="container">
      <div class="content-left">
        <div class="topic">
          <div class="topic-head">
            <div class="topic-title">{{topic.title}}</div>
            <div class="topic-tags">
              <span
                v-for="(tag, index) in topic.tags"
                :key="index"
                class="tag"
              >{{tag==1?'置顶':tag==2?'精华':tag==3?'禁言':''}}</span>
            </div>
            <div class="topic-all">
              <span class="topic-user">
                <i class="el-icon-user-solid">{{topic.nickname}}</i>
              </span>
              <span class="topic-time">
                <i class="el-icon-date">{{topic.created_at}}</i>
              </span>
              <span class="topic-looknumber">
                <i class="el-icon-view">{{topic.looknumber}}</i>
              </span>
              <span class="topic-only">
                <i class="el-icon-s-custom">只看楼主</i>
                <i class="el-icon-sort">倒序查看</i>
              </span>
            </div>
          </div>
          <div class="topic-content">
            <div v-html="MDcontent"></div>
          </div>
        </div>
        <div class="allreply">
          <div class="reply-head">
            <span>全部回复({{topic.replynumber}})</span>
            <span class="reply-only">
              <i class="el-icon-s-custom">只看楼主</i>
              <i class="el-icon-sort">倒序查看</i>
            </span>
          </div>
          <ul class="reply-list">
            <li class="reply-item">
              <div class="repley-detail">
                <div class="reply-user">
                  Chneshiai
                  <span class="reply-floot">2楼</span>
                </div>
                <div class="reply-time">2019/6/24 下午3:00:00</div>
                <div class="reply-content">这是一段长长的长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的回复内容</div>
              </div>
            </li>
            <li class="reply-item">
              <div class="repley-detail">
                <div class="reply-user">
                  Chneshiai
                  <span class="reply-floot">2楼</span>
                </div>
                <div class="reply-time">2019/6/24 下午3:00:00</div>
                <div class="reply-content">这是一段长长的长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的回复内容</div>
              </div>
            </li>
            <li class="reply-item">
              <div class="repley-detail">
                <div class="reply-user">
                  Chneshiai
                  <span class="reply-floot">2楼</span>
                </div>
                <div class="reply-time">2019/6/24 下午3:00:00</div>
                <div class="reply-content">这是一段长长的长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的回复内容</div>
              </div>
            </li>
            <li class="reply-status">暂无回复</li>
          </ul>
        </div>
        <div class="replyarea">
          <div class="reply-head">
            <span>发表回复</span>
          </div>
          <div class="input">
            <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="textarea"></el-input>
            <div class="replymask" v-show="!isLogin">
              你需要登录才可以回复
              <router-link :to="{ path: '/login', query: { id: topic.id } }">登录</router-link>|
              <router-link to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <div class="mask"></div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import marked from "marked";
import { mapGetters } from "vuex";
export default {
  name: "postPage",
  data() {
    return {
      topic: {
        nickname: "ChenShiAi",
        id: 7,
        title: "这里是一个测试用标题",
        content:
          "这是一段内容\n 这里是第二行内容\n 这里是第三行内容\n ## 一级标题",
        looknumber: 233,
        tags: [1, 2],
        replynumber: 3,
        created_at: "2019/6/24 下午4:00:00"
      },
      textarea:''
    };
  },
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters(["isLogin"]),
    MDcontent: function() {
      return marked(this.topic.content || "", {
        sanitize: true
      });
    }
  },
  methods: {
    tologin: function() {
      this.$router.push({ name: "login", params: { id: this.topic.id } });
    }
  }
};
</script>

<style lang='less' scoped>
.topic {
  margin-top: 20px;
  .topic-head {
    padding: 20px 0;
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
  .topic-content {
    margin-top: 10px;
    font-size: 1.1rem;
    line-height: 1.5;
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
      margin-bottom: 15px;
      padding-bottom: 25px;
      padding-left: 10px;
      border-bottom: 1px solid #eeeeee;
      .reply-user {
        font-weight: bold;
        .reply-floot {
          float: right;
        }
      }
      .reply-floot,
      .reply-time {
        color: #999999;
        font-size: 0.8rem;
      }
      .reply-content {
        margin-top: 10px;
        padding-left: 40px;
      }
    }
  }
}
.replyarea {
  margin-top: 30px;
  .input {
    width: 100%;
    position: relative;
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
