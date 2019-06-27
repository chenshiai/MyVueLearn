import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  userinfo: {
    user_id: '',
    nickname: '',
    power: 0
  },
  userDrafts: []
}

const getters = {
  isLogin: (state) => state.userinfo.user_id ? true : false
}

const mutations = {
  userLogin: (state, userinfo) => {
    let { nickname, user_id, power } = userinfo
    nickname = unescape(nickname)
    state.userinfo = { nickname, user_id, power }
  },
  cancelLogin: (state) => {
    state.userinfo = {
      user_id: '',
      nickname: '',
      power: 0
    }
    document.cookie = 'userinfo='
    document.cookie = 'token='
  },
  setUserDrafts: (state, drafts) => {
    state.userDrafts = drafts
  },
  deleteUserDrafts: (state, index)=>{
    state.userDrafts.splice(index, 1)
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
  },
  setUserDrafts: ({ commit }, drafts) => {
    // 将用户草稿暂存在本地
    if (drafts) {
      commit('setUserDrafts', drafts)
    }
  },
  deleteUserDrafts: ({commit}, index)=>{
    commit('deleteUserDrafts', index)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
