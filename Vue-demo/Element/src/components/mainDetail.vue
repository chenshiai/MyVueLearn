<template>
  <div class="main-detail">{{message}}</div>
</template>

<script>
export default {
  name: 'MainDetail',
  data () {
    return {
      message: '这里是默认首页'
    }
  }
}
</script>

<style scoped>
.main-detail{
  width: 300px;
  margin: 0 auto;
  background-color: #4f4f4f;
  text-align: center;
  color: #fff;
}
</style>
