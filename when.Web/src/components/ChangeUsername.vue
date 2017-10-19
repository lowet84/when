<template>
  <div class="hello">
    <div>Set username</div>
    <div>
      <input v-model="$store.state.username" placeholder="enter a username">
    </div>
    <button @click="save">Save</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ChangeUsername',
  data () {
    return {}
  },
  computed: {
    book: function () {
      return this.$store.state.editingBook
    }
  },
  methods: {
    async save () {
      await this.saveUsername()
      this.$router.push('/')
    },
    ...mapMutations(['saveUsername'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
