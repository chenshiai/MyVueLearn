import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  userinfo: {
    username: '',
    password: ''
  }
}

const getters = {
  isLogin: (state) => {
    state.userinfo.username != '' ? true : false
  }
}

const mutations = {
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
