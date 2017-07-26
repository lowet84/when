const store = new Vuex.Store({
  state: {
    unhandleds: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})