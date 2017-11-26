<template>
  <div v-if="game!==null">
    <div class="flex question">
      <div v-if="game.currentQuestion!=null">{{game.currentQuestion.text}}</div>
      <div class="icon score">
        <div class="icon__border"></div>
        <span>{{completedQuestions.length}}</span>
      </div>
      <div class="icon heart">
        <img src="static/heart.svg" />
        <span>{{game.lives}}</span>
      </div>
    </div>
    <div class="play-field">
      <div style="margin-left:1em">
      </div>
      <div class="q" v-for="(completedQuestion, i) in completedQuestions" :key="completedQuestion.year">
        <button @click="guess(i)" class="btn--small btn--cta q__button" :style="{marginTop:completedQuestion.marginTop}">Guess</button>
        <span class="q__text" :style="{marginTop:completedQuestion.marginTop}">{{completedQuestion.year}}: {{completedQuestion.text}}</span>
      </div>
      <button @click="guess(completedQuestions.length)" class="btn--small btn--cta">Guess</button>
      
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
import { mapActions, mapGetters } from 'vuex'
import PlayModal from './Playmodal'
export default {
  name: 'Play',
  components: {
    'play-modal': PlayModal
  },
  data: function () {
    return {
      modal: {
        show: false,
        text: ''
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
    ...mapGetters([
      'completedQuestions'
    ]),
    game: function () {
      let game = this.$store.state.currentGame
      if (game === null) return null
      let ret = {
        lives: game.lives,
        currentQuestion: game.currentQuestion
      }
      return ret
    },
    first: function () {
      return Math.min.apply(null, this.game.years)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}

.icon__border {
  border: 0.25rem solid #ccc;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
}

.icon span {
  position: absolute;
  top: 0.2em;
  font-size: 1.5rem;
  left: 0;
  right: 0;
}

.icon.heart span {
  color: white;
}

.play-field {
  margin: 1em;
  border-left: 0.2em lime solid;
  padding-left: 1em;
}

.q {
  margin: 1em;
  position: relative;
}

.q__text {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.q__button {
  margin-top: 1em;
}

.q::before {
  position: absolute;
  left: -2.6em;
  content: " ";
  width: 1em;
  height: 1em;
  background-color: lime;
  border-radius: 50%;
}

.modal{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3)
}
.modal-body{
  position: absolute;
  top: 20%;
  left: 10%;
  width: 80%;
  height: 16em;
  border-radius: 0.5em;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  
}
.modal-body-content{
  flex-grow: 1;
  padding: 1em;
  display: flex;
  align-items: center;
}
.modal-body-closer{
  border-top: 1px solid #eee;
  width:100%;
}
</style>
