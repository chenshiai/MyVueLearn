<template>
  <div>
    <!-- 置顶帖 -->
    <div class="post-sticky">
      <el-collapse v-model="activeNames" @change="stickyRetract">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="retracText">{{retracText}}</div>
          </template>
          <ul class="sticky-list">
            <li class="list-item" v-for="(item, index) in stickyList" :key="index">
              <!-- 帖子内容 -->
              <Postoprating :item="item" :index="index"/>
              <div class="item-detail">
                <!-- 帖子头 -->
                <div class="item-head">
                  <!-- 帖子标签 -->
                  <span
                    v-for="(tag, index) in item.tags"
                    :key="index"
                    class="tag"
                  >{{tag==1?'置顶':tag==2?'精华':tag==3?'禁言':''}}</span>
                  <span class="item-title cup" @click="lookPost(item)">{{item.title}}</span>
                  
                </div>
                
                <!-- 帖子内容缩略 -->
                <div class="item-summary">{{item.content}}</div>
                <!-- 帖子数据 -->
                <div class="item-all">
                  <!-- 楼主 -->
                  <div class="item-user">
                    <i class="el-icon-edit" title="发布者">{{item.nickname}}</i>
                  </div>
                  <div class="item-time" title="活跃时间">
                    <i class="el-icon-time"></i>
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
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 帖子列表 -->
    <div class="post-list">
      <ul class="normal-list">
        <li class="list-item" v-for="(item, index) in postList" :key="index">
          <!-- 帖子内容 -->
          <Postoprating :item="item" :index="index"/>
          <div class="item-detail">
            <!-- 楼主 -->
            <div class="item-user">
              <i class="el-icon-edit" title="发布者">{{item.nickname}}</i>

              
            </div>
            <!-- 帖子头 -->
            <div class="item-head">
              <!-- 帖子标签 -->
              <span
                v-for="(tag, index) in item.tags"
                :key="index"
                class="tag"
              >{{tag==1?'置顶':tag==2?'精华':tag==3?'禁言':''}}</span>
              <span class="item-title cup" @click="lookPost(item)">{{item.title}}</span>
            </div>
            <!-- 帖子内容缩略 -->
            <div class="item-summary">{{item.content}}</div>
            <!-- 镇楼图 -->
            <div class="item-img" v-show="item.imgurl">
              <el-image :src="item.postImg"></el-image>
            </div>
            <!-- 帖子数据 -->
            <div class="item-all">
              <div class="item-time" title="活跃时间">
                <i class="el-icon-time"></i>
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
export default {
  name: "postlist",
  props: ["stickyList", "postList"],
  data() {
    return {
      stickyShow: true,
      activeNames: ["1"]
    };
  },
  computed: {
    retracText: function() {
      return this.stickyShow ? "收起置顶" : "展开置顶";
    }
  },
  methods: {
    stickyRetract: function() {
      this.stickyShow = !this.stickyShow;
    },
    lookPost: function(item) {
      this.$router.push({ path: `/topic/${item.id}` });
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
.retracText{
  padding-left: 20px;
  font-weight: bold;
  font-size: 1.2rem;
}
.list-item {
  padding: 10px 20px;
  border-bottom: 1px #868686 solid;
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
<style>
.el-collapse-item__wrap{
  overflow:visible;
}
</style>
