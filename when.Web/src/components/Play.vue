<template>
  <div v-if="game!==null" class="play">
    <play-header v-if="game.currentQuestion" :question="game.currentQuestion" :score="game.completedQuestions.length" :lives="game.lives"></play-header>
    <div class="play__container">
      <div class="play__field">
        <div class="q" v-for="(completedQuestion, i) in game.completedQuestions" :key="completedQuestion.year">
          <button @click="guess(i)" class="btn btn--big btn--cta" :style="'margin-top:'+completedQuestion.diff">{{i===0?'Före':'Mellan'}}</button>
          <div class="q__text" :style="'margin-top:'+completedQuestion.diff">
            <span class="q__text-year">{{completedQuestion.year}}</span>
            <span>{{completedQuestion.text}}</span>
          </div>
        </div>
        <div class="q">
          <button @click="guess(game.completedQuestions.length)" class="btn btn--big btn--cta" :style="'margin-top:'+game.completedQuestions[0].diff">Efter</button>
        </div>
      </div>
    </div>
    <play-modal :type="modal.type" v-if="modal.show"></play-modal>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import PlayModal from './PlayModal'
import PlayHeader from './PlayHeader'
const yearReducer = (acc, item) => {
  let minDiff = 0.5
  let diff = acc.length
    ? Math.max(Math.sqrt(item.year - acc[acc.length - 1].year) / 2, minDiff)
    : minDiff
  diff += 'rem'
  return [...acc, { ...item, diff }]
}

export default {
  name: 'Play',
  components: {
    'play-modal': PlayModal,
    'play-header': PlayHeader
  },
  data: function () {
    return {
      modal: {
        show: false,
        text: '',
        type: ''
      }
    }
  },
  methods: {
    ...mapActions(['answerStandard']),
    async guess (index) {
      let result = await this.answerStandard(index)
      if (this.game.lives === 0) {
        this.$router.push('/summary')
      } else {
        this.modal.show = true
        this.modal.text = result ? 'Correct' : 'Wrong'
        this.modal.type = result ? 'success' : 'fail'
        setTimeout(() => {
          this.modal.show = false
        }, 2000)
      }
    },
    back () {
      this.$router.push('/')
    }
  },
  created () {
    if (this.$store.state.currentGame === null) {
      this.$router.push('/')
    }
  },
  computed: {
    game: function () {
      let game = this.$store.state.currentGame
      if (!game) {
        return null
      }
      let completedQuestions = game.completedQuestions.sort((a, b) => a.year - b.year)
      completedQuestions = completedQuestions.reduce(yearReducer, [])
      let ret = {
        lives: game.lives,
        completedQuestions: completedQuestions,
        currentQuestion: game.currentQuestion
      }
      return ret
    },
    first: function () {
      console.warn('används den här?')
      return Math.min.apply(null, this.game.years)
    }
  }
}
</script>
<style scoped lang="scss">
.play {
  --width-timeline-area: 4.9375rem;

  display: flex;
  flex-direction: column;
  height: 100vh;

  header {
    flex-shrink: 0;
  }

  &__container {
    overflow: auto;
    flex-grow: 1;
    padding-left: 0.5em;
    background: -webkit-linear-gradient(
      to right,
      #1fddff,
      #ff4b1f
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #1fddff calc(var(--width-timeline-area) - 2rem),
      #ff6900 calc(var(--width-timeline-area) + 2rem),
      #ff4b00
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  &__field {
        
    --width-timeline: 0.5rem;
    margin-left: calc((var(--width-timeline-area) - var(--width-timeline)) / 2);
    border-left: var(--width-timeline) var(--color-timeline) solid;
    padding-left: calc(
       (var(--width-timeline-area) - var(--width-timeline)) / 2
    );
    height: 100%;
    
  }
}

.q {
  position: relative;
  padding-left: 1em;

  &__text {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &-year {
      --padding-top: 0.3em;
      --padding-left: 0.5em;

      font-size: 1.5rem;
      font-weight: bold;
      color: #eee;
      position: absolute;
      left: calc(-1 * var(--width-timeline-area));
      background-color: var(--color-timeline);
      border-radius: 30px;
      bottom: calc(-1 * var(--padding-top) - 0.25rem);
      padding: var(--padding-top) var(--padding-left);
    }
    &::before {
      --size: 1em;
      position: absolute;
      left: calc(-2.1em - var(--size)/2);
      content: " ";
      width: var(--size);
      height: var(--size);
      background-color: var(--color-timeline);
      border-radius: 50%;
      bottom: calc(-(var(--size) - 1em)/2);
    }
  }
}
</style>
