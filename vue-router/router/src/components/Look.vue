<template>
  <div class="look">
    {{msg}}
    <!-- 路由入口 -->
    <router-link to="/look/lookone">one</router-link>
    <router-link to="/look/looktwo">two</router-link>
    {{$route.params.id}}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Look',
  data () {
    return {
      msg:'看一看'
    }
  }
}
</script>


