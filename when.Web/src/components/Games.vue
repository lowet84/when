<template>
  <div>
    <h1>when</h1>
    <div v-for="game in games" :key="game.id">
      <button @click="play(game.id)">
        <span v-for="year in game.years" :key="year">[{{year}}]</span>
        <span v-for="lives in game.lives" :key="lives">*</span>
      </button>
    </div>
    <button @click="newGame">New game</button>
    <button @click="clean">Remove all</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Games',
  methods: {
    ...mapActions([
      'startNewGame',
      'updateOngoingGames',
      'setCurrentGame',
      'removeAllStandardGames']),
    async newGame () {
      await this.startNewGame()
      this.$router.push('/play')
    },
    getGameView (game) {
      var ret = {
        id: game.id,
        lives: game.lives,
        years: game.completedQuestions.map(d => d.year).sort()
      }
      return ret
    },
    async play (id) {
      await this.setCurrentGame(id)
      this.$router.push('/play')
    },
    async clean () {
      await this.removeAllStandardGames()
    }
  },
  created () {
    this.updateOngoingGames()
  },
  computed: {
    games: function () {
      var games = this.$store.state.ongoingGames
      var mapped = games.map(d => this.getGameView(d))
      return mapped
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
