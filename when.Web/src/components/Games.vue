<template>
  <div>
    <div class="user">
      <img class="user__avatar" src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt="">
      <div class="user__text">
        <span>{{this.$store.state.username}}</span>
      </div>
    </div>
    <!-- <div v-for="game in games" :key="game.id">
      <button @click="play(game.id)">
        <span v-for="year in game.years" :key="year">[{{year}}]</span>
        <span v-for="lives in game.lives" :key="lives">*</span>
      </button>
    </div> -->
    <div class="actions">
      <button @click="newGame">Nytt spel</button>
      <button @click="resume" v-if="hasOngoingGameId">Fortsätt spel</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Games',
  methods: {
    ...mapActions([
      'startNewGame',
      'updateOngoingGames',
      'setCurrentGame',
      'removeAllStandardGames',
      'getUser'
    ]),
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
    async resume () {
      await this.setCurrentGame(this.$store.getters.resumeGameId)
      this.$router.push('/play')
    },
    async clean () {
      await this.removeAllStandardGames()
    }
  },
  created () {
    this.updateOngoingGames()
    this.getUser()
  },
  computed: {
    ...mapGetters([
      'hasOngoingGameId'
    ]),
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
.user {
  border-bottom: 1px solid black;
  display: flex;
  padding: 0.5em 1em;
  align-items: center;
}
.user__avatar {
  width: 3em;
  height: 3em;
}
.user__text {
  margin-left: 1em;
}
.actions {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.actions > * {
  margin-bottom: 1em;
}
</style>
