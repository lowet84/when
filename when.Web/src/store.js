import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'

Vue.use(Vuex)

const mutations = {
  setCurrentGame (state, currentGame) {
    state.currentGame = currentGame
  },
  setOngoingGames (state, ongoingGames) {
    state.ongoingGames = ongoingGames
  },
  setUsername (state, username) {
    state.username = username
  }
}

const actions = {
  async saveUsername (state) {
    await Api('setUsername', { username: state.username })
  },
  async startNewGame ({ dispatch }) {
    var newGame = await Api('startNewGame')
    let id = newGame.startNewStandardGame.result.id
    await dispatch('updateOngoingGames')
    dispatch('setCurrentGame', id)
  },
  async updateOngoingGames ({ commit }) {
    var games = await Api('ongoingGames')
    commit('setOngoingGames', games.standardGamesOngoing)
  },
  async setCurrentGame ({ commit }, id) {
    let data = await Api('currentGame', { id: id })
    commit('setCurrentGame', data.standardGame)
  },
  async removeAllStandardGames ({ dispatch }) {
    await Api('removeAllStandardGames')
    dispatch('updateOngoingGames')
  },
  async answerStandard ({ state, commit }, index) {
    let data = await Api('answerStandard', { id: state.currentGame.id, index: index })
    commit('setCurrentGame', data.answerStandard.result)
    return data.answerStandard.success
  },
  async getUser ({ state, commit }) {
    if (state.username === 'User') {
      let data = await Api('user')
      commit('setUsername', data.user.userName)
    }
  }
}

// getters are functions
const getters = {
  resumeGameId: state => {
    return state.ongoingGames[0].id
  },
  hasOngoingGameId: state => state.ongoingGames.length
}

export default new Vuex.Store({
  state: {
    username: 'User',
    ongoingGames: [],
    currentGame: null
  },
  getters,
  actions,
  mutations
})
