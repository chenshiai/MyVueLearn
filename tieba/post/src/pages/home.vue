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
            <router-view :stickyList="stickyList" :postList="postList"/>
          </section>
        </div>
        <!-- 右边侧栏 -->
        <div class="content-right">
          <section class="section-card">右边</section>
        </div>
      </div>
      <!-- 悬浮窗 -->
    </transition>
<Floatwindow @reload="reloadPostList"/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PostItInfo from "../components/postItInfo.vue";
import Footer from "../components/Footer.vue";
import Floatwindow from "../components/Floatwindow";
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
        },
        {
          postTitle: "这里是一个帖子标题",
          postUser: "你大爷楼主",
          postTags: [1],
          postContent:
            "这是一段测试内容这是一段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容",
          postImg: "../static/logo.png",
          postTime: "2019-06-19",
          postClick: "424",
          postReply: "799"
        },
        {
          postTitle: "这里是一个帖子标题",
          postUser: "你大爷楼主",
          postTags: [1],
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
          postTitle: "这里是一个帖子标题",
          postUser: "ChenShiAi",
          postTags: [2],
          postContent:
            "这是一段测试内容这是一段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容",
          postImg: "../static/logo.png",
          postTime: "2019-06-20",
          postClick: "424",
          postReply: "799"
        },
        {
          postTitle: "这里是一个帖子标题",
          postUser: "ChenShiAi",
          postTags: [],
          postContent:
            "这是一段测试内容这是一段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容",
          postImg: "../static/logo.png",
          postTime: "2019-06-20",
          postClick: "424",
          postReply: "799"
        },
        {
          postTitle: "这里是一个帖子标题",
          postUser: "ChenShiAi",
          postTags: [],
          postContent:
            "这是一段测试内容这是一段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容",
          postImg: "",
          postTime: "2019-06-20",
          postClick: "424",
          postReply: "799"
        },
        {
          postTitle: "这里是一个帖子标题",
          postUser: "ChenShiAi",
          postTags: [],
          postContent:
            "这是一段测试内容这是一段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容",
          postImg: "sss.png",
          postTime: "2019-06-20",
          postClick: "424",
          postReply: "799"
        }
      ]
    };
  },
  components: {
    Navbar,
    PostItInfo,
    Floatwindow,
    Footer
  },
  mounted() {
    this.showPage = true;
    this.$router.push({
      name: "postlist",
      params: {
        postList: this.postList,
        stickyList: this.stickyList
      }
    });
  },
  methods: {
    reloadPostList: function(){
      this.$message({
        message: '正在刷新页面'
      })
    }
  },
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
