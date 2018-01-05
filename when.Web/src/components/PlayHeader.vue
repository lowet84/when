<template>
  <header class="question">
    <div>{{question.text}}</div>
    <div class="icons">
      <div class="icon">
        <div class="icon__border"></div>
        <span class="icon__center-text">{{score}}</span>
      </div>
      <div class="icon icon--white-text">
        <img class="icon__heart" src="static/heart.svg" />
        <span class="icon__center-text">{{lives}}</span>
      </div>
    </div>
  </header>
</template>
<script>

export default {
  name: 'PlayHeader',
  props: [
    'question',
    'score',
    'lives'
  ]
}
</script>
<style scoped lang="scss">
.question {
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
  padding: 0.5em;
  display: flex;
  justify-content: space-between;

  z-index: 3;
}

.icon {
  position: relative;

  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  text-align: center;
  color: white;

  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }

  &s {
    margin-left: 0.5em
  }

  &__border {
    border: 0.25rem solid #ccc;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &__heart {
    width: 100%;
  }

  &__center-text {
    position: absolute;
    top: 0.2em;
    font-size: 1.5rem;
    left: 0;
    right: 0;
  }
}
</style>