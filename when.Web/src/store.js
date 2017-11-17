import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'

Vue.use(Vuex)

const state = {
  username: 'User',
  ongoingGames: [],
  currentGame: null
}

const mutations = {
  async saveUsername (state) {
    await Api('setUsername', { username: state.username })
  }
}

const actions = {
  async startNewGame (store) {
    var newGame = await Api('startNewGame')
    let id = newGame.startNewStandardGame.result.id
    await updateOngoingGames()
    await setCurrentGame(id)
  },
  async updateOngoingGames () {
    await updateOngoingGames()
  },
  async setCurrentGame (store, id) {
    await setCurrentGame(id)
  },
  async removeAllStandardGames () {
    await Api('removeAllStandardGames')
    await updateOngoingGames()
  },
  async answerStandard (store, index) {
    let data = await Api('answerStandard', { id: state.currentGame.id, index: index })
    Vue.set(state, 'currentGame', data.answerStandard.result)
    return data.answerStandard.success
  },
  async getUser () {
    if (state.username === 'User') {
      let data = await Api('user')
      Vue.set(state, 'username', data.user.userName)
    }
  }
}

let updateOngoingGames = async function () {
  var games = await Api('ongoingGames')
  Vue.set(state, 'ongoingGames', games.standardGamesOngoing)
}

let setCurrentGame = async function (id) {
  let data = await Api('currentGame', { id: id })
  Vue.set(state, 'currentGame', data.standardGame)
}

// getters are functions
const getters = {
  resumeGameId: () => {
    return state.ongoingGames[0].id
  },
  hasOngoingGameId: () => state.ongoingGames.length
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
