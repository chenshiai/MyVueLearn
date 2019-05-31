<template>
  <div class="LookOne">{{msg}}
    <div class="go-two" @click="gotwo">去looktwo</div>
  </div>
</template>

<script>
export default {
  name: 'LookOne',
  data () {
    return {
      msg:'看一看之再看一看'
    }
  },
  methods: {
    gotwo() {
      this.$router.push({name: 'LookTwo', params:{id:852963741}})
    }
  },
  beforeRouteEnter(to ,from, next) {
    console.log(from, to);
    next();
  },
  beforeRouteLeave (to, from, next) {
    console.log(from, to);
    next();
  }
}
</script>