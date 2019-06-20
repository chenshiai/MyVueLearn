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
  isLogin: (state) => state.userinfo.username != '' ? true : false
}

const mutations = {
  userLogin: (state, userinfo) => {

    state.userinfo = userinfo
    console.log(state.userinfo)
  },
  cancelLogin: (state) => {
    state.userinfo = {
      username: '',
      nickname: ''
    }
  }
}

const actions = {
  userLogin: ({ commit }, userinfo) => {
    // 设置登录信息
    commit('userLogin', userinfo)
  },
  cancelLogin: ({ commit }) => {
    // 注销登录
    commit('cancelLogin')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
