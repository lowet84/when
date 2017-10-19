import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'

Vue.use(Vuex)

const state = {
  username: null,
  ongoingGames: []
}

const mutations = {
  async saveUsername (state) {
    await Api('setUsername', { username: state.username })
  }
}

const actions = {
  async startNewGame () {
    var newGame = await Api('startNewGame')
    console.log(newGame)
  },
  async updateOngoingGames () {
    var games = await Api('ongoingGames')
    Vue.set(state, 'ongoingGames', games.standardGamesOngoing)
  }
}

// getters are functions
const getters = {

}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
