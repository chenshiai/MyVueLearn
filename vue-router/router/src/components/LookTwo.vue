<template>
  <div class="lookTwo">{{msg}}
    {{$route.params.id}}
  </div>

</template>

<script>
export default {
  name: 'LookTwo',
  data () {
    return {
      msg:'看一看之再看二看'
    }
  }
}
</script>