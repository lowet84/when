<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
:root {
  --color-timeline: #555;
}

body {
  height: 1vh;
  background-color: #fff;
  font-family: "Open Sans", sans-serif;
  color: #eee;
background: #ff4b00;


}

/* Reset `button` and button-style `input` default styles */
input[type="submit"],
input[type="reset"],
input[type="button"],
button {
  background: none;
  border: 0;
  color: inherit;
  /* cursor: default; */
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-appearance: button; /* for input */
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;
}
input::-moz-focus-inner,
button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

button {
  background-color: #333;
  color: #fff;
  padding: 0.6em;
  border-radius: 0.5em;
  outline: unset;
}
.btn--small {
  font-size: 0.75em;
}
.btn--big {
  font-size: 1.1em;
}
.btn--cta {
  /* background-color: #2196f3; */
}
body {
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
</style>
