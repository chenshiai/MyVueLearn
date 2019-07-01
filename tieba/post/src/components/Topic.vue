<template>
  <div class="topic-content" v-html="MDcontent"></div>
</template>

<script>
import marked from "marked";
export default {
  name: "topic",
  props: ["topic"],
  computed: {
    // MD转HTML
    MDcontent: function() {
      return marked(this.topic.content || "", {
        sanitize: true
      });
    }
  }
};
</script>

<style lang='less' scoped>
.topic-content {
  margin-top: 10px;
}
</style>
