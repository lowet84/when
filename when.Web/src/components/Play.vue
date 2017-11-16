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
      <div style="margin-left:1em">
        <button @click="guess(0)" class="btn--small btn--cta">Guess</button>
      </div>
      <div class="q" v-for="(completedQuestion, i) in game.completedQuestions" :key="completedQuestion.year">
         
        <span class="q__text">{{completedQuestion.year}}: {{completedQuestion.text}}</span>
        <button @click="guess(i+1)" class="btn--small btn--cta q__button">Guess</button>
      </div>
    </div>
    <!-- <button @click="back">Back</button> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Play',
  methods: {
    ...mapActions(['answerStandard']),
    async guess (index) {
      await this.answerStandard(index)
      if (this.game.lives === 0) {
        this.$router.push('/summary')
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
      let completedQuestions = game.completedQuestions.sort((a, b) => { return a.year - b.year })
      let ret = {
        lives: game.lives,
        completedQuestions: completedQuestions,
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
.q__text{
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.q__button{
  margin-top: 1em;
}
.q::before {
  position: absolute;
  left: -2.6em;
  content:' ';
  width: 1em;
  height: 1em;
  background-color: lime;
  border-radius: 50%;

}
</style>
