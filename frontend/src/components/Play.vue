<template>
  <div class="board" v-if="playround.active" :class="playround.failed?'failed':''">
    <div class="question">
      <template v-if="!playround.life">
        <p>Där blev det tokigt :( </p>
        <p>Ditt resultat: {{playround.answeredQuestions.length - 1}}</p>
        <p>Ditt highScore: {{highScore}}</p> 
        <button @click="startNewRound">Spela igen</button>
      </template>
      <template v-if="playround.life">
        <h3>Nästa fråga:</h3>
        <p>{{playround.shuffledQuestions[0].question}}</p>
        <p>Din nuvarande poäng: {{playround.answeredQuestions.length}}</p>
        <p>Dina liv {{playround.life}}</p>
      </template>
  
    </div>
    <h3>Placera in de här:</h3>
    <ul>
      <li>
        <button @click="click(0)">Innan</button>
      </li>
      <template v-for="(answered,index) in playround.answeredQuestions">
        <li :key="answered.question">
          {{answered.year}} - {{answered.question}}
        </li>
        <li :key="answered.question">
          <button @click="click(index+1)">{{playround.answeredQuestions.length-1===index?'Efter':'Mellan'}}</button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import store from '../store'; // eslint-disable-line no-unused-vars
import types from '../types';
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'play',
  data() {
    return {
      year: '2016'
    }
  },
  computed: {
    ...mapState([
      'playround',
      'highScore'
    ]),
    ...mapGetters([
      'activeWikiQuestion'
    ])
  },
  methods: {
    getUnhandledQuestions() {
      store.dispatch(types.actions.getUnhandledQuestions);
    },
    getWikiQuestions() {
      store.dispatch(types.actions.getWikiQuestions, this.year);
    },
    ignoreWikiQuestion(item) {
      store.dispatch('addIgnoredWikiQuestion', item);
    },
    click(index) {
      store.commit('guessPlayround', index);
    },
    startNewRound() {
      store.dispatch('getPlayround')
    }
  },
  beforeMount: function () {
    if (!store.playround || !store.playround.active) {
      this.startNewRound();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}
</style>
