import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'

Vue.use(Vuex)

const state = {
  username: null
}

const mutations = {
  async saveUsername (state) {
    await Api('setUsername', { username: state.username })
  }
}

const actions = {}

// getters are functions
const getters = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
