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
            <!-- 置顶帖 -->
            <div class="post-sticky">
              <ul class="sticky-list">
                <li class="sticky-list-item" v-for="(item, index) in stickyList" :key="index">
                  <!-- 帖子内容 -->
                  <div class="item-detail">
                    <div class="item-user">
                      <i class="el-icon-user"></i>
                      {{item.postUser}}
                    </div>
                    <div class="item-head">
                      <!-- 帖子标签 -->
                      <span
                        v-for="(tag, index) in item.postTags"
                        :key="index"
                        class="tag"
                      >{{tag==1?'置顶':tag==2?'精华':tag==3?'禁言':''}}</span>
                      <span class="item-title">{{item.postTitle}}</span>
                    </div>
                    <div class="item-summary">{{item.postContent}}</div>
                    <div class="item-img">
                      <img :src="item.postImg" alt="并没有图片">
                    </div>
                    <div class="item-all">
                      <div class="item-time">
                        <i class="el-icon-date"></i>
                        {{item.postTime}}
                      </div>
                      <div class="item-clicknumber">
                        <i class="el-icon-thumb"></i>
                        {{item.postClick}}
                      </div>
                      <div class="item-reply">
                        <i class="el-icon-chat-dot-round"></i>
                        {{item.postReply}}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 帖子列表 -->
            这里是帖子列表
            <div style="height:1000px"></div>
          </section>
        </div>
        <!-- 右边侧栏 -->
        <div class="content-right">
          <section class="section-card">右边</section>
        </div>
      </div>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PostItInfo from "../components/postItInfo.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "home",
  data() {
    return {
      showPage: false,
      stickyList: [
        {
          postTitle: "这里是一个帖子标题",
          postUser: "你大爷楼主",
          postTags: [1, 2, 3],
          postContent:
            "这是一段测试内容这是一段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容",
          postImg: "../static/logo.png",
          postTime: "2019-06-19",
          postClick: "424",
          postReply: "799"
        }
      ],
      postList: [
        {
          postName: "",
          postUser: "",
          postTags: [1],
          postContent: "",
          postImg: "",
          postTime: "",
          postClick: "",
          postReply: ""
        }
      ]
    };
  },
  components: {
    Navbar,
    PostItInfo,
    Footer
  },
  mounted() {
    this.showPage = true;
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
.sticky-list-item {
  padding: 10px 20px;
  border-bottom: 1px #868686 solid;
  .item-summary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-head {
    display: flex;
    margin-top: 5px;
  }
  .item-title {
    line-height: 20px;
    color: #4f4f4f;
  }
  .tag {
    padding: 0 5px;
    line-height: 20px;
    background-color: #ffc343;
    border-radius: 4px;
    color: #fff;
    font-size: 0.6rem;
    text-align: center;
    margin-right: 5px;
  }
  .item-summary {
    margin-top: 10px;
    color: #868686;
    font-size: 0.8rem;
  }
  .item-all {
    display: flex;
    .item-time {
      flex: 1;
    }
    .item-clicknumber {
      flex: 1;
    }
    .item-reply {
      flex: 1;
    }
  }
}
</style>
