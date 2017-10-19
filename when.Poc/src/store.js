import types from './types'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    unhandledQuestions: [],
    wikiQuestions: [],
    ignoredQuestionIndexes: [],
    activeYear: '2016',
    highScore: 0,
    playround: {}
  },
  getters: {
    activeWikiQuestion: state => {
      console.log('activeWikiQuestion', state.wikiQuestions.length, state.ignoredQuestionIndexes.length)
      return state.wikiQuestions.filter((_, index) => !state.ignoredQuestionIndexes.includes(index)) || [];
    }
  },
  mutations: {
    setWikiQuestions(state, wikiQuestions) {
      state.wikiQuestions = wikiQuestions;
    },
    setIgnoredWikiQuestion(state, array) {
      state.ignoredQuestionIndexes = array;
    },
    setActiveYear(state, year) {
      state.activeYear = year;
    },
    addIgnoredWikiQuestion(state, number) {
      console.log(number);
    },
    initPlayround(state, questions) {
      let shuffledQuestions = [];
      while (questions.length) {
        let index = Math.floor(Math.random() * questions.length);
        shuffledQuestions.push(questions.splice(index, 1)[0])
      }
      let answeredQuestions = shuffledQuestions.splice(0, 1);
      state.playround = {
        shuffledQuestions,
        answeredQuestions,
        active: true,
        life: 3
      }
    },
    guessPlayround(state, index) {
      state.playround.answeredQuestions.splice(index, 0, state.playround.shuffledQuestions[0]);
      state.playround.shuffledQuestions.splice(0, 1);
      let correct = true;
      let lastYear;
      state.playround.answeredQuestions.forEach(answeredQuestion => {
        if (lastYear > answeredQuestion.year) {
          correct = false;
        }
        lastYear = answeredQuestion.year;
      })
      if (correct) {

      } else {
        state.playround.answeredQuestions.sort((a, b) => a.year > b.year)
        state.playround.life--;
      }
      if (state.playround.life === 0) {
        state.highScore = Math.max(state.highScore, state.playround.answeredQuestions.length - 1)
      }
    }
  },
  actions: {
    async getWikiQuestions({ commit, state }, year) {
      commit('setActiveYear', year);
      let wikiQuestions = (await (await fetch('/api/wiki/' + state.activeYear)).json()).data
      console.log(wikiQuestions);
      let ignoredWikiQuestions = await (await fetch('/api/ignoredWiki/year=' + state.activeYear)).json()
      commit(types.mutations.setIgnoredWikiQuestion, ignoredWikiQuestions.map(item => item.number));
      commit(types.mutations.setWikiQuestions, wikiQuestions)
    },
    async addIgnoredWikiQuestion({ commit, state }, item) {
      let number = state.wikiQuestions.indexOf(item)
      let ignoredWikiQuestions = await (await fetch('/api/ignoredWiki', { method: 'post', body: { number, year: state.activeYear } })).json();
      commit(types.mutations.addIgnoredWikiQuestion, ignoredWikiQuestions)
    },
    async getIgnoredWikiQuestion({ commit, state }, item) {
      commit(types.mutations.setIgnoredWikiQuestion, await (await fetch('/api/ignoredWiki')).json())
    },
    async getPlayround({ commit, state }, item) {
      let questions = await (await fetch('/api/question')).json();
      commit('initPlayround', questions)
    }
  }
})

export default store;
