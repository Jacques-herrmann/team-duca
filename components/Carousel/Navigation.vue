<template>
  <div class="carousel-navigation">
    <button
      class="carousel-navigation-btn carousel-navigation-btn--prev"
      :class="current === 0 ? 'carousel-navigation-btn--disable': ''"
      @click="onPrevious"
    >
      <Arrow/>
    </button>
    <button
      class="carousel-navigation-btn carousel-navigation-btn--next"
      :class="current === length - 1 ? 'carousel-navigation-btn--disable': ''"
      @click="onNext"
    >
      <Arrow/>
    </button>
  </div>
</template>
<script setup>

import Arrow from "~/components/Icon/Arrow";

const emits = defineEmits(['next', 'previous'])
const props = defineProps({
  current: {
    type: Number,
  },
  length: {
    type: Number,
  }
})

const onNext = (ev) => {
  ev.preventDefault()
  emits('next')
}

const onPrevious = (ev) => {
  ev.preventDefault()
  emits('previous')
}

</script>
<style lang="sass" scoped>
.carousel-navigation
  width: calc(100% + 80px)
  height: 50px
  display: flex
  justify-content: space-between
  @include lg
    width: calc(100% + 180px)


  &-btn
    height: 48px
    width: 48px
    display: flex
    justify-content: center
    align-items: center
    border-radius: 50%
    background: transparent
    opacity: 1
    transform: rotate(180deg)
    scale: 0.6
    cursor: pointer

    @include lg
      scale: 1

    &--disable
      opacity: 0.6

    &--prev
      transform: rotate(0deg)


</style>
