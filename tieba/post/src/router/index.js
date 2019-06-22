import Vue from 'vue'
import VueRouter from 'vue-router'
import { home, login, register, postlist } from 'pages/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    hidden: true,
    component: home,
    children:[
      {
        path: '/',
        name: 'postlist',
        hidden: true,
        component: postlist
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    hidden: true,
    component: login
  }, {
    path: '/register',
    name: 'register',
    hidden: true,
    component: register
  }, 
]

export default new VueRouter({
  routes,
  // strict: process.env.NODE_ENV !== 'production'
})