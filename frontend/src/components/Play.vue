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
        <div class="flex">
          <p>{{playround.shuffledQuestions[0].question}}</p>
          <div class="">
            <div class="icon score">
              <span>{{playround.answeredQuestions.length}}</span>
            </div>
            <div class="icon heart">
              <img src="static/heart.svg" />
              <span>{{playround.life}}</span>
            </div>
          </div>
        </div>
      </template>
  
    </div>
    <div class="answered">
      <button @click="click(0)">Innan</button>
      <template v-for="(answered,index) in playround.answeredQuestions">
        <div class="answered__item" :key="answered.question">
          {{answered.year}} - {{answered.question}}
        </div>
        <button :key="answered.question" @click="click(index+1)">{{playround.answeredQuestions.length-1===index?'Efter':'Mellan'}}</button>
      </template>
    </div>
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
<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.question {
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  flex-shrink: 0
}

.answered {
  flex-grow: 1;
  padding-top: 2rem;
  background-color: rgba(0, 255, 255, 0.3);
  &__item {
    font-size: 1rem;
    margin: 0.5em;
  }
}

button {
  border: 1px solid #ccc;
  padding: 1em;
  background-color: #eee
}

.icon {
  position: relative;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;

  img {
    width: 100%;
  }

  span {
    position: absolute;
    top: 0.2em;
    font-size: 1.5rem;
    left: 0;
    right: 0;
  }

  &.heart span {
    color: white;
  }
}

.score {
  border: 0.25rem solid #ccc;
  border-radius: 50%;
  width: 2.4rem;
  height: 2.4rem;
}
</style>
