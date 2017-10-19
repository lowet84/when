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
          <!-- <transition name="answer" mode="out-in"> -->
            <div>{{playround.shuffledQuestions[0].question}}</div>
          <!-- </transition> -->
          <div class="icon score">
            <div class="icon__border"></div>
            <span>{{playround.answeredQuestions.length}}</span>
          </div>
          <div class="icon heart">
            <img src="static/heart.svg" />
            <span>{{playround.life}}</span>
          </div>
        </div>
      </template>
  
    </div>
    <div class="answered">
      <transition-group name="answers" tag="div">
        <template v-for="(answered,index) in playround.answeredQuestions">
          <button v-if="!isSameYearAsLast(playround.answeredQuestions,index)" :key="answered.question" @click="click(index)">{{index===0?'Innan':'Mellan'}}</button>
          <div class="answered__item" :key="answered.question">
            <h3 v-if="!isSameYearAsLast(playround.answeredQuestions,index)">{{answered.year}}</h3>
            {{answered.question}}
          </div>
        </template>
      </transition-group>
      <button @click="click(playround.answeredQuestions.length)">Efter</button>
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
    isSameYearAsLast(list, index) {
      return list[index - 1] && list[index - 1].year === list[index].year
    },
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

$_question-padding: .5em;
.question {
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
  padding: $_question-padding;
  flex-shrink: 0;
  .icon {
    position: relative;
    margin-left: $_question-padding;
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;

    &__border {
      border: 0.25rem solid #ccc;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }

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
    &.score {}
  }
}

.answered {
  flex-grow: 1;
  overflow: auto;
  padding-top: 2rem; // background-color: rgba(0, 255, 255, 0.3);
  &__item {
    font-size: 1rem;
    margin: 0.5em;
  }
  h3 {
    margin: 1em 0 0.5em 0
  }
}

button {
  border: 1px solid #eee;
  padding: 0.5em 1em;
  color: white;
  background-color: #2490dc
}

.answers {
  &-enter-active,
  &-leave-active {
    transition: all 1s;
  }
  &-enter {
    opacity: 0
  }
}
</style>
