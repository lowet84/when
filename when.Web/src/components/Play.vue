<template>
  <div v-if="game!==null">
    <h3>
      <span v-for="life in game.lives" :key="life">*</span>
    </h3>
    <h4>{{game.currentQuestion.text}}</h4>
    <div>
      <button @click="guess(0)">Guess</button>
    </div>
    <div v-for="(completedQuestion, i) in game.completedQuestions" :key="completedQuestion.year">
      <div>{{completedQuestion.year}}: {{completedQuestion.text}}</div>
      <button @click="guess(i+1)">Guess</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Play',
  methods: {
    ...mapActions(['answerStandard']),
    async guess (index) {
      this.answerStandard(index)
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

</style>
