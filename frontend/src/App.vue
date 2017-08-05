
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}
.flex{
  display: flex;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  background: none;
  border: 0;
  color: inherit;
  /* cursor: default; */
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-appearance: button;
  /* for input */
  -webkit-user-select: none;
  /* for button */
  -moz-user-select: none;
  -ms-user-select: none;

  &::-moz-focus-inner,
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  color: inherit;
  cursor: default;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  white-space: pre;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

</style>
