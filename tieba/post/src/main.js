import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import store from './store'
import axios from "axios"
import vueAxios from 'vue-axios'
import mavonEditor from 'mavon-editor';     //markdownç¼–è¾‘å™¨
import 'mavon-editor/dist/css/index.css';

Vue.use(vueAxios, axios)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.directive('focus', {
  // ?????????? DOM ??……
  inserted: function (el) {
    // ????
    el.focus()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})
