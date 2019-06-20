import Vue from 'vue'
import VueRouter from 'vue-router'
import { home, login } from 'pages/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    hidden: true,
    component: home
  }, {
    path: '/login',
    name: 'login',
    hidden: true,
    component: login
  }
]

export default new VueRouter({
  routes,
  // strict: process.env.NODE_ENV !== 'production'
})