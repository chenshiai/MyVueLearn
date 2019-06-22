import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  userinfo: {
    user_id: '',
    nickname: ''
  }
}

const getters = {
  isLogin: (state) => state.userinfo.user_id ? true : false
}

const mutations = {
  userLogin: (state, userinfo) => {
    let { nickname, user_id } = userinfo
    nickname = unescape(nickname)
    state.userinfo = { nickname, user_id }
  },
  cancelLogin: (state) => {
    state.userinfo = {
      user_id: '',
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
    document.cookie = 'userinfo='
  },
  getCookie: ({ commit }, cname) => {
    let name = cname + "="
    let ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim()
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
