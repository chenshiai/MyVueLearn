import Vue from 'vue'
import VueRouter from 'vue-router'
import { home, login, register, postlist, editPost,myDrafts, lookPost ,allreply} from 'pages/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
  }, {
    path: '/editor/drafts',
    name: 'editPost',
    hidden: true,
    component: editPost
  }, {
    path: '/user/mydrafts',
    name: 'mydrafts',
    hidden: true,
    component: myDrafts
  }, {
    path: '/topic/:id',
    hidden: true,
    component: lookPost,
    children:[
      {
        path: '/',
        name: 'allreply',
        hidden: true,
        component: allreply
      }
    ]
  }
]

export default new VueRouter({
  routes
})