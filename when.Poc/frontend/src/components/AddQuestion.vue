<template>
  <div class="hello">
    <input v-model="year">
    <button @click="getWikiQuestions">Click</button>
    <div v-for="question in activeWikiQuestion" :key="question" class="questionList">
      {{question}}
      <button @click="ignoreWikiQuestion(question)">Ta bort</button>
    </div>
    {{activeWikiQuestion}}
  </div>
</template>

<script>
import store from '../store'; // eslint-disable-line no-unused-vars
import types from '../types';
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'hello',
  data() {
    return {
      year: '2016'
    }
  },
  computed: {
    ...mapState([]),
    ...mapGetters([
      'activeWikiQuestion'
    ])
  },
  methods: {
    getUnhandledQuestions() {
      store.dispatch(types.actions.getUnhandledQuestions);
    },
    getWikiQuestions() {
      store.dispatch(types.actions.getWikiQuestions, this.year);
    },
    ignoreWikiQuestion(item) {
      store.dispatch('addIgnoredWikiQuestion', item);
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
