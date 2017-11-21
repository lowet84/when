<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100" viewBox="-263.5 236.5 26 26">
    <g class="svg-success" v-if="type==='success'">
      <circle cx="-250.5" cy="249.5" r="12" />
      <path d="M-256.46 249.65l3.9 3.74 8.02-7.8" />
    </g>
    <g class="svg-fail" v-if="type==='fail'">
      <circle cx="-250.5" cy="249.5" r="12" />
      <line x1="-258.5" y1="258" x2="-242.5" y2="242" />
      <line x1="-242.5" y1="258" x2="-258.5" y2="242" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PlayModal',
  props: ['type']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.svg-success,
.svg-fail {
  stroke-width: 2px;

  fill: none;
}

.svg-success {
  stroke: #8EC343;
}

.svg-fail {
  stroke: #f44336
}

.svg-success path {
  stroke-dasharray: 17px, 17px;
  stroke-dashoffset: 0px;
  -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
  animation: checkmark 0.25s ease-in-out 0.7s backwards;
}

.svg-success circle,
.svg-fail circle {
  stroke-dasharray: 76px, 76px;
  stroke-dashoffset: 0px;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  -webkit-animation: checkmark-circle 0.6s ease-in-out forwards;
  animation: checkmark-circle 0.6s ease-in-out forwards;
}

@keyframes checkmark {
  0% {
    stroke-dashoffset: 17px;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes checkmark-circle {
  0% {
    stroke-dashoffset: 76px;
  }
  100% {
    stroke-dashoffset: 0px;
  }
}
</style>
