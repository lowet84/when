<template>
  <div>
    <h4>Score: {{game.score}}</h4>
    <div v-for="completedQuestion in game.completedQuestions" :key="completedQuestion.year">
      <div>{{completedQuestion.year}}: {{completedQuestion.text}}</div>
    </div>
    <button @click="back">Back</button>
  </div>
</template>

<script>
export default {
  name: 'Summary',
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
        completedQuestions: completedQuestions,
        score: completedQuestions.length
      }
      return ret
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
