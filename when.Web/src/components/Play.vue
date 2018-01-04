<template>
  <div v-if="game!==null">
    <div class="flex question">
      <div v-if="game.currentQuestion!=null">{{game.currentQuestion.text}}</div>
      <div class="icon score">
        <div class="icon__border"></div>
        <span>{{game.completedQuestions.length}}</span>
      </div>
      <div class="icon heart">
        <img src="static/heart.svg" />
        <span>{{game.lives}}</span>
      </div>
    </div>
    <div class="play-field">
      
      <div class="q" v-for="(completedQuestion, i) in game.completedQuestions" :key="completedQuestion.year">
        <button @click="guess(i)" class="btn--small btn--cta q__button" :style="'margin-top:'+completedQuestion.diff">Välj</button>
        <span class="q__text" :style="'margin-top:'+completedQuestion.diff">{{completedQuestion.year}}: {{completedQuestion.text}}</span>

      </div>
      <div class="q">
        <button @click="guess(game.completedQuestions.length)" class="btn--small btn--cta" :style="'margin-top:1em'">Välj</button>
      </div>
    </div>
    <div class="modal" v-if="modal.show"> 
      <div class="modal-body">
        <div class="modal-body-content">
          <play-modal :type="modal.type"></play-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PlayModal from './Playmodal'
const yearReducer = (acc, item) => {
  let diff = acc.length
    ? Math.max((item.year - acc[acc.length - 1].year) * 0.08125, 1)
    : 1
  diff += 'rem'
  return [...acc, { ...item, diff }]
}

export default {
  name: 'Play',
  components: {
    'play-modal': PlayModal
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
      if (game === null) return null
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.question {
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
  padding: 1em;
  display: flex;
}

.icon {
  position: relative;
  margin-left: 1em;
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  text-align: center;

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
}

.play-field {
 
  margin: 1em;
  border-left: 0.2em var(--color-timeline) solid;
  padding-left: 1em;
}

.q {
  margin: 0 1em;
  position: relative;

  &__text {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &::before {
      position: absolute;
      left: -2.6em;
      content: " ";
      width: 1em;
      height: 1em;
      background-color: var(--color-timeline);
      border-radius: 50%;
    }
  }

  & &__button {
    margin-top: 1em;
  }
}

.modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);

  &-body {
    position: absolute;
    top: 20%;
    left: 10%;
    width: 80%;
    height: 16em;
    border-radius: 0.5em;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    &-content {
      flex-grow: 1;
      padding: 1em;
      display: flex;
      align-items: center;
    }
  }
}
</style>
