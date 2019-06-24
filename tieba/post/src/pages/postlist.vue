<template>
  <div>
    <!-- 置顶帖 -->
    <div class="post-sticky">
      <span @click="stickyRetract" class="stickyRetract cup">
        {{retracText}}
        <i :class="stickyShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
      </span>
      <transition name="list-out" mode="in-out">
        <ul class="sticky-list" v-show="stickyShow">
          <li class="list-item" v-for="(item, index) in stickys" :key="index">
            <!-- 帖子内容 -->
            <div class="item-detail">
              <!-- 帖子头 -->
              <div class="item-head">
                <!-- 帖子标签 -->
                <span
                  v-for="(tag, index) in item.tags"
                  :key="index"
                  class="tag"
                >{{tag==1?'置顶':tag==2?'精华':tag==3?'禁言':''}}</span>
                <span class="item-title cup">{{item.title}}</span>
              </div>
              <!-- 帖子内容缩略 -->
              <div class="item-summary">{{item.content}}</div>
              <!-- 帖子数据 -->
              <div class="item-all">
                <!-- 楼主 -->
                <div class="item-user">
                  <i class="el-icon-edit" title="发布者">{{item.nickname}}</i>
                </div>
                <div class="item-time" title="发布时间">
                  <i class="el-icon-date"></i>
                  {{item.updated_at}}
                </div>
                <div class="item-clicknumber" title="浏览量">
                  <i class="el-icon-view"></i>
                  {{item.looknumber ? item.looknumber : 0}}
                </div>
                <div class="item-reply" title="回复量">
                  <i class="el-icon-chat-dot-round"></i>
                  {{item.replynumber ? item.replynumber : 0}}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </transition>
    </div>
    <!-- 帖子列表 -->
    <div class="post-list">
      <ul class="normal-list">
        <li class="list-item" v-for="(item, index) in posts" :key="index">
          <!-- 帖子内容 -->
          <div class="item-detail">
            <!-- 楼主 -->
            <div class="item-user">
              <i class="el-icon-edit" title="发布者">{{item.nickname}}</i>
              <div class="manage" v-show="item.user_id==$store.state.userinfo.user_id">
                <i class="el-icon-more cup"></i>
                <ul class="manage-list">
                  <li v-show="$store.state.userinfo.power==0">编辑</li>
                  <li v-show="$store.state.userinfo.power>0">置顶</li>
                  <li v-show="$store.state.userinfo.power>0">加精</li>
                  <li>禁言</li>
                  <li>删除</li>
                </ul>
              </div>
            </div>
            <!-- 帖子头 -->
            <div class="item-head">
              <!-- 帖子标签 -->
              <span
                v-for="(tag, index) in item.tags"
                :key="index"
                class="tag"
              >{{tag==1?'置顶':tag==2?'精华':tag==3?'禁言':''}}</span>
              <span class="item-title cup">{{item.title}}</span>
            </div>
            <!-- 帖子内容缩略 -->
            <div class="item-summary">{{item.content}}</div>
            <!-- 镇楼图 -->
            <div class="item-img" v-show="item.imgurl">
              <el-image :src="item.postImg"></el-image>
            </div>
            <!-- 帖子数据 -->
            <div class="item-all">
              <div class="item-time" title="发布时间">
                <i class="el-icon-date"></i>
                {{item.updated_at}}
              </div>
              <div class="item-clicknumber" title="浏览量">
                <i class="el-icon-view"></i>
                {{item.looknumber ? item.looknumber : 0}}
              </div>
              <div class="item-reply" title="回复量">
                <i class="el-icon-chat-dot-round"></i>
                {{item.replynumber ? item.replynumber : 0}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from "../../static/js/global.js";
export default {
  name: "postlist",
  props: ["stickyList", "postList"],
  data() {
    return {
      stickyShow: true
    };
  },
  computed: {
    retracText: function() {
      return this.stickyShow ? "收起置顶" : "展开置顶";
    },
    posts: function() {
      return this.postList.map(this.handleList);
    },
    stickys: function() {
      return this.stickyList.map(this.handleList);
    }
  },
  methods: {
    stickyRetract: function() {
      this.stickyShow = !this.stickyShow;
    },
    handleList: function(item) {
      item.tags = item.tags.split(",").filter(tag => tag != 0);
      item.updated_at = API.utc2beijing(item.updated_at);
      return item;
    }
  }
};
</script>

<style lang="less" scoped>
.stickyRetract {
  margin-left: 20px;
  line-height: 30px;
  color: #606266;
}
.list-item {
  padding: 10px 20px;
  border-bottom: 1px #868686 solid;
  .manage {
    float: right;
    position: relative;
    .manage-list {
      display: none;
      position: absolute;
      top: 10px;
      border: solid;
      li {
        width: 50px;
        line-height: 20px;
        text-align: center;
        &:hover{
          background-color: #ffc343;
          color:#fff;
        }
      }
    }
    &:hover {
      .manage-list {
        display: block;
      }
    }
  }
}
.sticky-list {
  .list-item {
    background-color: #eeeeee;
    margin: 5px 10px 0 10px;
    border-radius: 20px;
    padding: 5px 20px;
    border-bottom: none;
  }
  .item-all {
    color: #c48600;
  }
}
.item-summary {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-head {
  display: flex;
  margin-top: 5px;
  font-size: 1.2rem;
}
.item-title {
  color: #4f4f4f;
  line-height: 30px;
  overflow: hidden;
  &:hover {
    color: #ffc343;
    position: relative;
    font-weight: bold;
    &::before {
      content: "";
      position: absolute;
      top: 23px;
      width: 200%;
      height: 5px;
      background: linear-gradient(
          135deg,
          transparent,
          transparent 35%,
          #ffc343,
          transparent 65%,
          transparent 100%
        ),
        linear-gradient(
          45deg,
          transparent,
          transparent 35%,
          #ffc343,
          transparent 65%,
          transparent 100%
        );
      background-size: 10px 10px;
      background-repeat: repeat-x;
      animation: waveline 2s infinite linear;
    }
  }
}
.tag {
  margin: 5px 0;
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
  margin-top: 5px;
  color: #868686;
  font-size: 0.8rem;
}
.item-img {
  width: 200px;
  height: 200px;
  overflow: hidden;
  margin-top: 5px;
  img {
    width: 100%;
  }
  .el-image {
    width: inherit;
    height: inherit;
  }
}
.item-all {
  display: flex;
  line-height: 20px;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #606266;
  .item-user,
  .item-time,
  .item-clicknumber,
  .item-reply {
    flex: 1;
  }
}
// 波浪线
@keyframes waveline {
  0% {
    left: 0px;
  }

  100% {
    left: -100%;
  }
}
// 列表移除过渡
.list-out-enter-active,
.list-out-leave-active {
  transition: all 0.3s;
  transform-origin: top;
}
.list-out-enter,
.list-out-leave-to {
  transform: scale(0, 0);
  opacity: 0;
}
</style>
